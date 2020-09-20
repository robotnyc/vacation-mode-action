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

    // Find open and pinned "vacation" issue
    vacation_on = false;
    vacation_issue_number = 0;
    await octokit.getPinnedIssues({
      owner: owner,
      repo: repo,
    }).then(issues => {
      for (let issue of issues) {
        if (issue.state.toLowerCase() == "open" && issue.title.toLowerCase().includes('vacation')) {
          vacation_on = true;
          vacation_issue_number = issue.number;
          break;
        }
      }
    });

    // Always remove repo interaction restrictions first in order to reset the interaction limit 24 hour timer
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

      // Check for existing vacation mode comment
      vacation_comment_id = 0;
      const vacation_comment = '![vacation-mode-activated-dog](https://i.imgflip.com/18t5ch.jpg)'
      await octokit.issues.listComments({
        owner: owner,
        repo: repo,
        issue_number: vacation_issue_number,
      }).then(comments => {
        for (let comment of comments.data) {
          if (comment.user == owner.login && comment.body.includes(vacation-mode-activated)) {
            vacation_comment_id = comment.id;
            break;
          }
        }
      });

      // Create new comment when activating vacation mode
      if (vacation_comment_id == 0) {
        octokit.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: vacation_issue_number,
          body: vacation_comment,
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();