module.exports = pinIssue

const { UNPIN_ISSUE } = require('./graphql')

const getIssueId = require('./get-issue-id')
const restifyIssueNode = require('./restify-issue-node')

async function pinIssue (octokit, { owner, repo, number }) {
  const {
    data: { data: { unpinIssue: { issue } } }
  } = await octokit.request('POST /graphql', {
    headers: {
      Accept: 'application/vnd.github.elektra-preview+json'
    },
    query: UNPIN_ISSUE,
    variables: {
      id: await getIssueId(octokit, { owner, repo, number })
    }
  })

  return restifyIssueNode(issue)
}
