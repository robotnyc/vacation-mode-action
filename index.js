const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log(`Hello ${github.context.repo.owner}!`);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    // assume issue event
    const state = github.context.payload.issue.state;
    console.log(`The issue state is: ${state}`);
    if (state === "open") {
      console.log("The issue state is open");
    }

    const opts = {
      log: console, // debug
    };
    const octokit = github.getOctokit(core.getInput('personal-access-token'), opts);


    // Get recently updated open issues
    const { data: issues } = await octokit.issues.list({
      filter: "all",
      state: "open",
      sort: "updated",
    });
    console.log(JSON.stringify(issues, undefined, 2));

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

    // if the pinned issue is open update the repository interaction restrictions
    const limit_group = core.getInput('limit-group');

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();