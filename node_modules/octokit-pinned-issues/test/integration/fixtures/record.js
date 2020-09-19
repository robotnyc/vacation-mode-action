if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN must be set. Create at https://github.com/settings/tokens/new?scopes=public_repo,delete_repo')
}
const token = process.env.GITHUB_TOKEN

const { resolve: resolvePath } = require('path')
const { writeFileSync } = require('fs')
const octokit = require('@octokit/rest')
  .plugin(require('../..'))()

const fixtures = []

octokit.hook.before('request', (options) => {
  const emoji = options.request.skipFixtures ? 'ℹ️' : '📼'
  console.log(`${emoji}  ${options.method} ${options.url}`)
  if (options.query) {
    console.log(options.query.split('\n').slice(0, 10).join('\n'))
  }
})

octokit.hook.after('request', (response, options) => {
  if (options.request.skipFixtures) {
    return
  }

  options.headers.authorization = 'token secret123'

  fixtures.push({
    request: options,
    response
  })
})

octokit.authenticate({
  type: 'token',
  token
})

recordFixtures()

  .then(() => {
    const path = resolvePath(__dirname, 'happy-path.json')
    const json = JSON.stringify(fixtures, null, 2)
      .replace(/octokit-pinned-issues-fixtures-\d+/g, 'octokit-pinned-issues-fixtures')
      .replace(/"owner": "[^"]+"+/g, '"owner": "gr2m"')
    writeFileSync(path, `${json}\n`)
    console.log(`✅  ${path} updated.`)
  })

  .catch(error => {
    console.log(error)
  })

async function recordFixtures () {
  let error
  const repo = 'octokit-pinned-issues-fixtures-' + Date.now()
  const skipFixtures = {
    request: {
      skipFixtures: true
    }
  }

  // --- SETUP REPOSITORY TO RECORD FIXTURES

  // create temporary repository and get authenticated user’s login
  const {
    data: {
      owner: {
        login: owner
      }
    }
  } = await octokit.repos.createForAuthenticatedUser({
    name: repo,
    ...skipFixtures
  })

  console.log(`created ${owner}/${repo}`)

  try {
    // create issue
    await octokit.issues.create({
      owner,
      repo,
      title: 'test issue',
      ...skipFixtures
    })

    // --- RECORD FIXTURES

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
  } catch (_error) {
    error = _error
  }

  // --- DELETE FIXTURES REPOSITORY
  await octokit.repos.delete({
    owner,
    repo,
    ...skipFixtures
  })

  if (error) {
    console.log('last fixture:', JSON.stringify(fixtures.pop(), null, 2))
    throw error
  }
}
