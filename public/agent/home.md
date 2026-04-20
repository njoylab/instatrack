# InstaTrack

InstaTrack is a privacy-first web app for tracking Instagram followers and following snapshots over time.

## What agents can do here

- Explain how InstaTrack works and how to export the required Instagram files.
- Direct a user to the import flow for `followers_1.json` and `following.json`.
- Direct a user to the restore flow for a previous InstaTrack backup.
- Read the public static discovery metadata published by the site.

## Primary user flows

### Create a snapshot

1. Export Instagram data and collect `followers_1.json` and `following.json`.
2. Open the "New Snapshot" dialog.
3. Upload both JSON files.
4. Review the overview, analysis, and change tracking tabs.

### Restore a backup

1. Open the "Restore Backup Data" dialog.
2. Upload a previous InstaTrack backup JSON file.
3. Continue analysis from the restored local snapshot history.

## Public machine-readable resources

- API catalog: https://instatrack.njoylab.com/.well-known/api-catalog
- API docs: https://instatrack.njoylab.com/docs/api
- OpenAPI description: https://instatrack.njoylab.com/api/openapi.json
- Agent skills index: https://instatrack.njoylab.com/.well-known/agent-skills/index.json
