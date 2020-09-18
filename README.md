# Vacation Mode JavaScript Action

This action helps maintainers of open source projects go on vacation by limiting the interactions within a repository.

## Inputs

### `limit-group`

**Required** Must be one of: `existing_users`, `contributors_only`, or `collaborators_only`. Default `"collaborators_only"`.

## Example usage

```yaml
uses: actions/vacation-mode-action@main
with:
  limit-group: 'collaborators_only'
```
