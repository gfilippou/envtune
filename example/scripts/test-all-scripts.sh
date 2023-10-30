#!/bin/bash
source ../scripts/log-to-terminal.sh

log "Executing" "" "standout"

run_test() {
  local test_number=$1
  local test_command=$2
  local expected_output=$3
  
  log "Test $test_number: '$test_command' RUNNING"
  
  actual_output=$(npm run $test_command 2>&1)
  
  if [[ "$actual_output" == *"$expected_output"* ]]; then
    log "Test $test_number: '$test_command' PASSED" "success"
  else
    log "Test $test_number: '$test_command' FAILED" "error"
  fi
}

# Run tests
run_test 1 "envtune:default-envtunerc" "hushHushDev"
run_test 2 "envtune:ts-es6" "hushHushDev"
run_test 3 "envtune:ts-module" "hushHushDev"
run_test 4 "envtune:js-module" "hushHushDev"
run_test 5 "envtune:invalid-child-command" "Child process failed to execute"
run_test 6 "envtune:force-non-zero-exit" "exited with code 1"
run_test 7 "envtune:invalid-env-file" "Could not find '.envtunerc' file in custom path"
run_test 8 "envtune:missing-e-flag" "is required to specify the environment name"

log "Execution completed" "" "standout"