module.exports = getIssueId

const { GET_ISSUE } = require('./graphql')

async function getIssueId (octokit, { owner, repo, number }) {
  const variables = { owner, repo, number }
  const {
    data: { data: { repository: { issue: { id } } } }
  } = await octokit.request('POST /graphql', { query: GET_ISSUE, variables })
  return id
}
