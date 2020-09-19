module.exports = pinIssue

const { PIN_ISSUE } = require('./graphql')

const getIssueId = require('./get-issue-id')
const restifyIssueNode = require('./restify-issue-node')

async function pinIssue (octokit, { owner, repo, number }) {
  const {
    data: { data: { pinIssue: { issue } } }
  } = await octokit.request('POST /graphql', {
    headers: {
      Accept: 'application/vnd.github.elektra-preview+json'
    },
    query: PIN_ISSUE,
    variables: {
      id: await getIssueId(octokit, { owner, repo, number })
    }
  })

  return restifyIssueNode(issue)
}
