const { test } = require('tap')

const Octokit = require('@octokit/rest')
  .plugin(require('../..'))

test('happy path', async t => {
  const fixtures = require('./fixtures/happy-path')
  const octokit = new Octokit()

  octokit.hook.wrap('request', (_, options) => {
    const currentFixtures = fixtures.shift()
    const { baseUrl, method, url, request, headers, ...params } = options

    t.equal(currentFixtures.request.method, options.method)
    t.equal(currentFixtures.request.url, options.url)

    Object.keys(params).forEach(paramName => {
      t.deepEqual(currentFixtures.request[paramName], params[paramName])
    })
    return currentFixtures.response
  })

  const owner = 'gr2m'
  const repo = 'octokit-pinned-issues-fixtures'

  // returns empty array
  await octokit.getPinnedIssues({
    owner,
    repo
  })

  // pin first issue
  await octokit.pinIssue({
    owner,
    repo,
    number: 1
  })

  // returns array with pinned issue
  await octokit.getPinnedIssues({
    owner,
    repo
  })

  // unpin issue
  await octokit.unpinIssue({
    owner,
    repo,
    number: 1
  })

  // returns empty array
  await octokit.getPinnedIssues({
    owner,
    repo
  })

  t.equal(fixtures.length, 0)
})
