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

    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('myToken');

    const octokit = github.getOctokit(myToken)

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    const { data: restrictions } = await octokit.interactions.getRestrictionsForRepo({
        owner: github.repository_owner,
        repo: github.repository_owner.split("/")[1],
    });

    console.log(restrictions);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();