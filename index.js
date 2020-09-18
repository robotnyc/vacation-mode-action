const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // `limit-group` input defined in action metadata file
    const nameToGreet = core.getInput('limit-group');
    console.log(`Hello ${github.context.repo.owner}!`);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    // assume issue event
    const state = github.context.payload.issue.state;
    console.log(`The : ${state}`);
    if (state === "open") {

    }

    const { data: restrictions } = await github.interactions.getRestrictionsForRepo({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
    });

    console.log(restrictions);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();