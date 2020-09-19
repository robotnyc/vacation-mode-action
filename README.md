# Vacation Mode JavaScript Action

This action helps maintainers of open source projects go on vacation by limiting the interactions within a repository.

## Inputs

### `limit-group`

**Required** Must be one of: `existing_users`, `contributors_only`, or `collaborators_only`. Default `"collaborators_only"`.

## Example usage

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
        github-api-token: ${{ secrets.GITHUB_TOKEN }}
```
