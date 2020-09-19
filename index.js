const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    on_vacation = false;
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    const opts = {
      log: console, // debug
    };
    const octokit = github.getOctokit(core.getInput('personal-access-token'), opts);

    // Get recently updated open issues
    // TODO replace with octokit-pinned-issues plugin pinnedIssues query since it's limited to 3 issues max
    const { data: issues } = await octokit.issues.listForRepo({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      state: "open",
      sort: "updated",
    });
    console.log(JSON.stringify(issues, undefined, 2));

    console.log(issues.length);
    for (let issue of issues) {
      console.log(issue.title);
      console.log(issue.state);
      if (issue.title.startsWith(':palm_tree:') && issue.title.toLowerCase().includes('vacation')) {
        on_vacation = true;
      }
    }

    // Get current repo interaction restrictions
    const { data: restrictions } = await octokit.interactions.getRestrictionsForRepo({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      mediaType: {
        previews: [
          'sombra'
        ],
      }
    });
    console.log(JSON.stringify(restrictions, undefined, 2));

    if (on_vacation) {
      console.log(":palm_tree: Enjoy your vacation!");

      const limit_group = core.getInput('limit-group');

      // Set repo interaction restrictions
      await octokit.interactions.setRestrictionsForRepo({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        mediaType: {
          previews: [
            'sombra'
          ],
        },
        limit: limit_group,
      });
    } else {
      // Remove repo interaction restrictions
      await octokit.interactions.removeRestrictionsForRepo({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        mediaType: {
          previews: [
            'sombra'
          ],
        },
      });
    }

    // Get current repo interaction restrictions
    const { data: restrictions } = await octokit.interactions.getRestrictionsForRepo({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      mediaType: {
        previews: [
          'sombra'
        ],
      },
    });
    console.log(JSON.stringify(restrictions, undefined, 2));

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();