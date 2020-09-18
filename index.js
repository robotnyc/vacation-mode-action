const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `limit-group` input defined in action metadata file
  const nameToGreet = core.getInput('limit-group');
  console.log(`Hello ${nameToGreet}!`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // assuming issue event
  const state = payload.issue.state;
  console.log(`The : ${state}`);
} catch (error) {
  core.setFailed(error.message);
}
