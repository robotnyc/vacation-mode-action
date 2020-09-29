const core = require('@actions/core');
const { Octokit } = require("@octokit/action");
const MyOctokit = Octokit.plugin(
  require('octokit-pinned-issues')
);
const octokit = new MyOctokit();

async function run() {
  try {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const limit_group = core.getInput('limit-group');
    const vacation_mode_activated_comment = core.getInput('vacation-mode-activated');

    // Find open and pinned "vacation" issue
    vacation_on = false;
    vacation_issue_number = 0;
    await octokit.getPinnedIssues({
      owner: owner,
      repo: repo,
    }).then(issues => {
      for (let issue of issues) {
        if (issue.title.toLowerCase().includes('vacation')) {
          vacation_issue_number = issue.number;
          vacation_on = issue.state.toLowerCase() == "open";
          break;
        }
      }
    });

    // Check for existing vacation mode activated comment
    vacation_comment_id = 0;
    if (vacation_issue_number != 0) {
      await octokit.issues.listComments({
        owner: owner,
        repo: repo,
        issue_number: vacation_issue_number,
      }).then(comments => {
        for (let comment of comments.data) {
          if (comment.user.login == owner && comment.body.includes('vacation-mode-activated')) {
            vacation_comment_id = comment.id;
            break;
          }
        }
      });
    }

    // Always remove repository interaction restrictions first in order to reset the 24 hour timer
    // and to handle the case when the vacation issue is unpinned (#3)
    await octokit.interactions.removeRestrictionsForRepo({
      owner: owner,
      repo: repo,
    });

    if (vacation_on) {
      // Set repo interaction restrictions
      await octokit.interactions.setRestrictionsForRepo({
        owner: owner,
        repo: repo,
        limit: limit_group,
      });

      // Create new comment when activating vacation mode
      if (vacation_comment_id == 0) {
        await octokit.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: vacation_issue_number,
          body: vacation_mode_activated_comment,
        });
      }
    } else {
      // Remove comment when vacation mode is deactivated
      if (vacation_comment_id != 0) {
        await octokit.issues.deleteComment({
          owner: owner,
          repo: repo,
          comment_id: vacation_comment_id,
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
