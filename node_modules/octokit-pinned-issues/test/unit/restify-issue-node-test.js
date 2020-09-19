const { test } = require('tap')

const restifyIssueNode = require('../../lib/restify-issue-node')

test('restifyIssueNode', t => {
  const issue = restifyIssueNode({
    id: 'MDU6SXNzdWUzOTE0OTI4MTQ=',
    number: 71,
    state: 'OPEN',
    title: 'test 2',
    body: '',
    labels: {
      nodes: [
        {
          id: 'MDU6TGFiZWw3MTkyMjczOTg=',
          name: 'foo',
          description: null,
          color: 'ededed'
        }
      ]
    },
    assignees: {
      nodes: [
        {
          login: 'gr2m',
          id: 'MDQ6VXNlcjM5OTky',
          avatarUrl: 'https://avatars3.githubusercontent.com/u/39992?v=4'
        }
      ]
    },
    milestone: {
      id: 'MDk6TWlsZXN0b25lMzkwNDcwMw==',
      state: 'OPEN',
      title: 'Funk',
      description: 'Get Funky!'
    },
    locked: false,
    activeLockReason: null
  })

  t.deepEqual(issue, {
    id: 'MDU6SXNzdWUzOTE0OTI4MTQ=',
    number: 71,
    state: 'OPEN',
    title: 'test 2',
    body: '',
    locked: false,
    active_lock_reason: null,
    milestone: {
      id: 'MDk6TWlsZXN0b25lMzkwNDcwMw==',
      state: 'OPEN',
      title: 'Funk',
      description: 'Get Funky!' },
    labels: [
      {
        id: 'MDU6TGFiZWw3MTkyMjczOTg=',
        name: 'foo',
        description: null,
        color: 'ededed'
      }
    ],
    assignees: [
      {
        login: 'gr2m',
        id: 'MDQ6VXNlcjM5OTky',
        avatar_url: 'https://avatars3.githubusercontent.com/u/39992?v=4'
      }
    ]
  })

  t.end()
})
