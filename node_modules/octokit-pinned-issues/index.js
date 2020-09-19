module.exports = octokitPinnedIssues

const getPinnedIssues = require('./lib/get-pinned-issues')
const pinIssue = require('./lib/pin-issues')
const unpinIssue = require('./lib/unpin-issues')

function octokitPinnedIssues (octokit) {
  octokit.getPinnedIssues = getPinnedIssues.bind(null, octokit)
  octokit.pinIssue = pinIssue.bind(null, octokit)
  octokit.unpinIssue = unpinIssue.bind(null, octokit)
}
