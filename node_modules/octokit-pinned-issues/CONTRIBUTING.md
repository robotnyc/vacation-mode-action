# Contributing

Please note that this project is released with a [Contributor Code of Conduct][coc].
By participating in this project you agree to abide by its terms.

## Update fixtures for testing

Create a new personal access token with `public_repo` & `delete_repo` scopes: https://github.com/settings/tokens/new?scopes=public_repo,delete_repo. Then run `GITHUB_TOKEN=<your token here> node test/fixtures/record.js`.

The script creates a temporary repository with an issue, then pins/unpins it to record its fixtures and write them to `./test/fixtures/happy-path.json`

[coc]: ./CODE_OF_CONDUCT.md
