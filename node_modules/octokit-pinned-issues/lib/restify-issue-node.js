/* eslint camelcase: "off" */

module.exports = restifyIssueNode

function restifyIssueNode ({ labels, assignees, milestone, activeLockReason: active_lock_reason, ...issue }) {
  return {
    ...issue,
    active_lock_reason,
    milestone,
    labels: labels.nodes,
    assignees: assignees.nodes.map(({ avatarUrl: avatar_url, ...assignee }) => {
      return { ...assignee, avatar_url }
    })
  }
}
