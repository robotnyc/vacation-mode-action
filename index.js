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
      console.log(JSON.stringify(issues, undefined, 2))
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
      await octokit.issues.listComments({
        owner: owner,
        repo: repo,
        issue_number: vacation_issue_number,
      }).then(comments => {
        console.log(JSON.stringify(comments, undefined, 2))
        for (let comment of comments.data) {
          // if (issue.state.toLowerCase() == "open" && issue.title.toLowerCase().includes('vacation')) {
          //   vacation_on = true;
          //   vacation_issue_number = issue.number;
          //   break;
          // }
        }
      });

      // Update existing comment when going on vacation
      // octokit.issues.updateComment({
      //   owner,
      //   repo,
      //   comment_id,
      //   body,
      // });

      // Create new comment when going on vacation
      octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: vacation_issue_number,
        body: "![dog-vacation-mode-activated](https://i.imgflip.com/18t5ch.jpg)",
      });

    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();