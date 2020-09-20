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
    on_vacation = false;
    await octokit.getPinnedIssues({
      owner: owner,
      repo: repo,
    }).then(issues => {
      console.log(JSON.stringify(issues, undefined, 2))
      for (let issue of issues) {
        if (issue.state.toLowerCase() == "open" && issue.title.toLowerCase().includes('vacation')) {
          on_vacation = true;
          break;
        }
      }
    });

    // Always remove repo interaction restrictions first in order to reset the interaction limit 24 hour timer
    await octokit.interactions.removeRestrictionsForRepo({
      owner: owner,
      repo: repo,
    });

    if (on_vacation) {
      console.log("🌴 Enjoy your vacation!");

      // Set repo interaction restrictions
      await octokit.interactions.setRestrictionsForRepo({
        owner: owner,
        repo: repo,
        limit: limit_group,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();