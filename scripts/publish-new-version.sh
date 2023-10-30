#!/bin/bash
source ./scripts/log-to-terminal.sh

log "Executing" "" "standout"

# Exit script if any command fails
set -e

# Prompt user to enter semantic versioning type
log "Current version: "v$(node -p "require('./package.json').version")""
log "Enter new semantic version type (major, minor, patch):"
read version_type

# Validate user input
if [[ "$version_type" != "major" && "$version_type" != "minor" && "$version_type" != "patch" ]]; then
  log "Invalid version type. Exiting." "error"
  exit 1
fi

# Run tests
log "Running tests"
npm run test-jest
npm run example-repo-run-test-scripts

# Build the package
log "Running build"
npm run build

# Update package.json version without committing and tagging
log "Updating npm version"
npm version $version_type --no-git-tag-version --force

# Commit the version change (affects package and package-lock jsons)
log "Committing version change"
git add .
new_version_tag="v$(node -p "require('./package.json').version")"
git commit -m "Bump version to $new_version_tag"

# Push the new tag to GitHub
log "Ready to push all files and new version tag to GitHub: "$new_version_tag""
log "WARNING! Pushing a new version tag to GitHub will activate the 'publish-to-npm' automated workflow. Are you certain you want to proceed? (yes, no):"
read is_certain

# Validate user input
if [[ "$is_certain" == "yes" ]]; then
  log "Tagging new version"
  git tag "$new_version_tag"
  log "Pushing files to GitHub"
  git push
  log "Pushing new version tag to GitHub: "$new_version_tag""
  git push origin "$new_version_tag"
else
  log "Publishing new version aborted" "error"
  log "Reverting changes"
  git reset HEAD~1 --hard
  exit 1
fi

log "Execution completed" "" "standout"