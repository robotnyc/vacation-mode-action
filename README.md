# Vacation Mode JavaScript Action

This action helps maintainers of open source projects go on vacation by limiting the interactions within a repository.

## Usage

1. Create an issue with a title that begins with 🌴 `:palm_tree:` and contains "vacation". For example, ":palm_tree: On vacation until 2020-09-19".
1. Pin the issue when it's ready so the GitHub action can pick it up and so your community can clearly see that you are on vacation.
1. Include a description/out-of-office note in the issue explaining to your users why their contributions will be limited. See below for an example.

_Dear community, as the maintainer of this project, I have put the repository in "vacation mode" so that I can take a much deserved break without worrying about tasks piling up while I'm recharging. I hope you can understand the need to take this action and not just "turn off notifications". Anyone who has experienced a company wide shutdown would understand, that it's much easier to disconnect from work when everyone does at the same time._

_Your contributions are very valuable so please subscribe to this issue and get notified I'm back and ready to resume actively maintaining this project._

## Inputs

### `limit-group`

**Required** Must be one of: `existing_users`, `contributors_only`, or `collaborators_only`. Default `"collaborators_only"`.

### `personal-access-token`

A personal access token is required because the GitHub API token generated for actions does not include the `repo` scope necessary to control the repository interaction limits.

1. Go to https://github.com/settings/tokens and create a `vacation-mode` personal access token with the `repo` scope.
1. Copy the token.
1. Go to the repository secrets settings https://github.com/{org}/{repo}/settings/secrets.
1. Add a secret with the name `PERSONAL_ACCESS_TOKEN` and value copied earlier.

For more information see the following documents
* GitHub API available scopes: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
* GitHub API Actions scopes: https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token

## Setup

```yaml
on:
  # Run on issue pinned/unpinned
  issues:
    types: [pinned, unpinned]
  # Run to reset the 24 hour interaction limit timer
  schedule:
    - cron: "0 0 * * *"

jobs:
  vacation_mode_job:
    runs-on: ubuntu-latest
    name: Update Vacation Mode
    steps:
    - uses: robotnyc/vacation-mode-action@v1
      with:
        limit-group: 'collaborators_only'
        personal-access-token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```
