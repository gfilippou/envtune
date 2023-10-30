#!/bin/bash
source ../scripts/log-to-terminal.sh

log "Executing" "" "standout"

(
  cd ..
  log "Building current envtune version"
  npm run build

  log "Generating tarball file for current envtune version"
  npm pack

  TARBALL=$(ls *.tgz)
  log "Generated tarball file $TARBALL"

  log "Moving and renaming generated tarball file to 'example' directory"
  mv "${TARBALL}" "example/envtune-latest.tgz"

  cd example
  log "Removing any existing envtune dependency from 'example' repo"
  npm remove envtune

  log "Installing generated tarball as dependency in 'example' repo"
  npm install "./envtune-latest.tgz"
)

if [ $? -eq 0 ]; then
  log "Installation completed successfully" "success"
else
  log "Installation failed" "error"
fi

log "Execution completed" "" "standout"