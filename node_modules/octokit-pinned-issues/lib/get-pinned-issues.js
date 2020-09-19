module.exports = getPinnedIssues

const { GET_PINNED_ISSUES } = require('./graphql')

const restifyIssueNode = require('./restify-issue-node')

async function getPinnedIssues (octokit, variables) {
  const {
    data: { data: { repository: { pinnedIssues: { nodes } } } }
  } = await octokit.request('POST /graphql', {
    headers: {
      Accept: 'application/vnd.github.elektra-preview+json'
    },
    query: GET_PINNED_ISSUES,
    variables
  })

  return nodes.map(node => restifyIssueNode(node.issue))
}
