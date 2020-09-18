const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    // `limit-group` input defined in action metadata file
    const nameToGreet = core.getInput('limit-group');
    console.log(`Hello ${nameToGreet}!`);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    // assume issue event
    const state = github.context.payload.issue.state;
    console.log(`The : ${state}`);
    if (state === "open") {

    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();