# octokit-pinned-issues

> Octokit plugin to manage pinned issues for a repository

[![@latest](https://img.shields.io/npm/v/octokit-pinned-issues.svg)](https://www.npmjs.com/package/octokit-pinned-issues)
[![Build Status](https://travis-ci.com/gr2m/octokit-pinned-issues.svg?branch=master)](https://travis-ci.com/gr2m/octokit-pinned-issues)
[![Coverage Status](https://coveralls.io/repos/github/gr2m/octokit-pinned-issues/badge.svg)](https://coveralls.io/github/gr2m/octokit-pinned-issues)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/octokit-pinned-issues.svg)](https://greenkeeper.io/)

There is no REST API for the new ["Pinned Issues"] feature. This Octokit plugin uses GraphQL under the hood to provide simple methods to manage a repository’s pinned issues.

## Usage

```js
const Octokit = require('@octokit/rest')
  .plugin(require('octokit-pinned-issues'))

const octokit = new Octokit()

octokit.getPinnedIssues({
  owner: 'repo-name',
  repo: 'repo-name'
}).then(issues => {})
octokit.pinIssue({
  owner: 'repo-name',
  repo: 'repo-name',
  number: 123
}).then(issue => {})
octokit.unpinIssue({
  owner: 'repo-name',
  repo: 'repo-name',
  number: 123
}).then(issue => {})
```

An `issue` object can have the following properties

```js
[
  {
    id: 'MDU6SXNzdWU...',
    number: 71,
    state: 'OPEN',
    title: 'issue title',
    body: 'issue description',
    locked: false,
    active_lock_reason: null,
    milestone: {
      id: 'MDk6TWlsZXN...',
      state: 'OPEN',
      title: 'Funk',
      description: 'Get Funky!'
    },
    labels: [
      {
        id: 'MDU6TGFiZWw...',
        name: 'foo',
        description: null,
        color: 'ededed'
      }
    ],
    assignees: [
      {
        login: 'gr2m',
        id: 'MDQ6VXNlcj...',
        avatar_url: 'https://avatars3.githubusercontent.com/u/39992?v=4'
      }
    ]
  }
]
```

## LICENSE

[MIT](LICENSE)
