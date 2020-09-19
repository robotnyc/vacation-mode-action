// example issue node based on fragment below
// {
//   "issue": {
//     "id": "MDU6SXNzdWUzOTE0OTI4MTQ=",
//     "number": 71,
//     "state": "OPEN",
//     "title": "test 2",
//     "body": "",
//     "labels": {
//       "nodes": [
//         {
//           "id": "MDU6TGFiZWw3MTkyMjczOTg=",
//           "name": "foo",
//           "description": null,
//           "color": "ededed"
//         }
//       ]
//     },
//     "assignees": {
//       "nodes": [
//         {
//           "login": "gr2m",
//           "id": "MDQ6VXNlcjM5OTky",
//           "avatarUrl": "https://avatars3.githubusercontent.com/u/39992?v=4"
//         }
//       ]
//     },
//     "milestone": {
//       "id": "MDk6TWlsZXN0b25lMzkwNDcwMw==",
//       "state": "OPEN",
//       "title": "Funk",
//       "description": "Get Funky!"
//     },
//     "locked": false,
//     "activeLockReason": null
//   }
// }
const ISSUE_FRAGMENT = `fragment issueInfo on Issue {
  id
  number
  state
  title
  body
  labels(first: 100) {
    nodes {
      id
      name
      description
      color
    }
  }
  assignees(first: 100) {
    nodes {
      login
      id
      avatarUrl
    }
  }
  milestone {
    id
    state
    title
    description
  }
  locked
  activeLockReason
}`

const GET_ISSUE = `query getIssue($repo: String!, $owner: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    issue(number:$number) {
      id
    }
  }
}`

const GET_PINNED_ISSUES = `query getPinnedIssues($repo: String!, $owner: String!) {
  repository(owner: $owner, name: $repo) {
    pinnedIssues(first: 3) {
      nodes {
        issue {
          ...issueInfo
        }
      }
    }
  }
}

${ISSUE_FRAGMENT}`

const PIN_ISSUE = `mutation pinIssue($id: ID!) {
  pinIssue(input: {issueId: $id}) {
    issue {
      ...issueInfo
    }
  }
}

${ISSUE_FRAGMENT}`

const UNPIN_ISSUE = `mutation unpinIssue($id: ID!) {
  unpinIssue(input: {issueId: $id}) {
    issue {
      ...issueInfo
    }
  }
}

${ISSUE_FRAGMENT}`

module.exports = {
  GET_ISSUE,
  GET_PINNED_ISSUES,
  PIN_ISSUE,
  UNPIN_ISSUE
}
