# Vacation Mode JavaScript Action

This GitHub Action helps maintainers of open source projects go on vacation and take mental health breaks by limiting community interactions within a repository. During this time, commenting, opening issues, or creating pull requests will be limited to a defined group.

This GitHub Action avoids the 24 hour limit of the GitHub repository [interactions limit](https://docs.github.com/en/github/building-a-strong-community/limiting-interactions-in-your-repository) feature. This makes it easier for the project maintainers and more transparent for the community.

This GitHub Action does not make any changes that would generate a commit.

Inspired by [@mrdoob's](https://github.com/mrdoob), maintainer of [three.js](https://github.com/mrdoob/three.js), feature request https://twitter.com/mrdoob/status/1305989856368234496 .

## Usage

1. Add the [setup code](#setup) to your repository workflow.
1. Create an issue with a title that contains "vacation". For example, "🌴 On Vacation Next Week".
1. Pin the issue to activate it and so your community can clearly see that you are on vacation.
1. Include an "out-of-office note" in the issue description explaining to your community why their interactions will be limited. See below for an example.
1. Close then issue when you are back from vacation to deactivate vacation mode.

_Dear community, as the maintainer of this project, I have put the repository in "vacation mode" so that I can take a much needed and deserved break without worrying about tasks piling up while I recharge. I hope you can understand the need to take this action and not just "turn off notifications". Anyone who has experienced a company-wide shutdown would understand, that it's much easier to disconnect from work when everyone does at the same time._

_Know that your contributions are valuable and appreciated, so please subscribe to this issue and get notified when I'm back and ready to resume actively maintaining this project._

## Inputs

### `limit-group`

**Required** Must be one of: `existing_users`, `contributors_only`, or `collaborators_only`. Default `"collaborators_only"`.

Groups are defined as follows:
* Limit to **existing users**: Limits activity for users with accounts that are less than 24 hours old who do not have prior contributions and are not collaborators.
* Limit to prior **contributors**: Limits activity for users who have not previously contributed and are not collaborators.
* Limit to repository **collaborators**: Limits activity for users who do not have write access or are not collaborators.

### `vacation-mode-activated`

**Required** The comment when vacation mode is activated. It must include `vacation-mode-activated` in the Markdown. The default is `![vacation-mode-activated](https://i.imgflip.com/18t5ch.jpg)` of this happy puppy.

![vacation-mode-activated](https://i.imgflip.com/18t5ch.jpg)

### `personal-access-token`

**Required** A personal access token is required because the GitHub API token generated for GitHub Actions does not include the `repo` scope necessary to control the repository interaction limits.

1. Go to https://github.com/settings/tokens and create a personal access token named `vacation-mode` (name is not important) with the `repo` scope.
1. Copy the token value.
1. Go to the repository secrets settings https://github.com/{org}/{repo}/settings/secrets.
1. Add a secret with the name `PERSONAL_ACCESS_TOKEN` and copied token value.

For more information see the following documents
* GitHub API available scopes: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
* GitHub API Actions scopes: https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token

## Setup

Add the following to `.github/workflows/vacation-mode.yml`.

```yaml
name: Vacation Mode

on:
  # Run on all issue activity
  issues:
  # Run daily to reset the 24 hour interaction limit timer as needed
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
        vacation-mode-activated: '![vacation-mode-activated](https://i.imgflip.com/18t5ch.jpg)'
        GITHUB_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```
