# Consuming this action

From any repo owned by the same user/org as this (private) action repo, a single
step is all that is required — no checkout of this repo, no install, no build:

```yaml
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: ssilve1989/github-releases-to-discord-action@v2
        with:
          webhook-url: ${{ secrets.DISCORD_RELEASES_WEBHOOK_URL }}
```

## Rules

- Reference a **release tag** (`@v2`, or pin a SHA) that carries the bundled
  `dist/index.js`. `@master` intentionally contains **no** `dist/` (it's
  committed only at release time by the `Release Bundle` workflow), so a bare
  branch reference will not run.
- No PAT or `actions/checkout` of this repo is needed. GitHub grants private,
  same-owner, cross-repo action access automatically. (A checkout+install+build
  dance was previously required because the bundle was never committed — that is
  now unnecessary.)
- The action reads release details from the GitHub release event that triggered
  the workflow, so it must run on a `release: published` event.
- Input: `webhook-url` (required) — a Discord webhook URL, typically injected
  from a repository secret.

## What consumers no longer need

A reminder of the old, bloated pattern this replaces (checkout of the action
repo + its `.nvmrc` + pnpm install + build + running from a local path). None of
that belongs in a consumer workflow anymore.