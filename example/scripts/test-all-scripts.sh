#!/bin/bash

# Test 1: `npm run envtune:default-envtunerc`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 1: `npm run envtune:default-envtunerc` RUNNING\e[0m'
expected1="hushHushDev"
output1=$(npm run envtune:default-envtunerc 2>&1)
if [[ "$output1" == *"$expected1"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 1: `npm run envtune:default-envtunerc` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 1: `npm run envtune:default-envtunerc` FAILED\e[0m'
fi

# Test 2: `npm run envtune:ts-es6`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 2: `npm run envtune:ts-es6` RUNNING\e[0m'
expected2="hushHushDev"
output2=$(npm run envtune:ts-es6 2>&1)
if [[ "$output2" == *"$expected2"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 2: `npm run envtune:ts-es6` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 2: `npm run envtune:ts-es6` FAILED\e[0m'
fi

# Test 3: `npm run envtune:ts-module`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 3: `npm run envtune:ts-module` RUNNING\e[0m'
expected3="hushHushDev"
output3=$(npm run envtune:ts-module 2>&1)
if [[ "$output3" == *"$expected3"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 3: `npm run envtune:ts-module` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 3: `npm run envtune:ts-module` FAILED\e[0m'
fi

# Test 4: `npm run envtune:js-module`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 4: `npm run envtune:js-module` RUNNING\e[0m'
expected4="hushHushDev"
output4=$(npm run envtune:js-module 2>&1)
if [[ "$output4" == *"$expected4"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 4: `npm run envtune:js-module` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 4: `npm run envtune:js-module` FAILED\e[0m'
fi

# Test 5: `npm run envtune:invalid-child-command`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 5: `npm run envtune:invalid-child-command` RUNNING\e[0m'
expected5="Child process failed to execute"
output5=$(npm run envtune:invalid-child-command 2>&1)
if [[ "$output5" == *"$expected5"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 5: `npm run envtune:invalid-child-command` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 5: `npm run envtune:invalid-child-command` FAILED\e[0m'
fi

# Test 6: `npm run envtune:force-non-zero-exit`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 6: `npm run envtune:force-non-zero-exit` RUNNING\e[0m'
expected6="exited with code 1"
output6=$(npm run envtune:force-non-zero-exit 2>&1)
if [[ "$output6" == *"$expected6"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 6: `npm run envtune:force-non-zero-exit` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 6: `npm run envtune:force-non-zero-exit` FAILED\e[0m'
fi

# Test 7: `npm run envtune:invalid-env-file`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 7: `npm run envtune:invalid-env-file` RUNNING\e[0m'
expected7="Could not find '.envtunerc' file in custom path"
output7=$(npm run envtune:invalid-env-file 2>&1)
if [[ "$output7" == *"$expected7"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 7: `npm run envtune:invalid-env-file` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 7: `npm run envtune:invalid-env-file` FAILED\e[0m'
fi

# Test 8: `npm run envtune:missing-e-flag`
echo -e $'\e[33m\n[test-all-scripts.sh] - Test 8: `npm run envtune:missing-e-flag` RUNNING\e[0m'
expected8="is required to specify the environment name"
output8=$(npm run envtune:missing-e-flag 2>&1)
if [[ "$output8" == *"$expected8"* ]]; then
  echo -e $'\e[32m[test-all-scripts.sh] - Test 8: `npm run envtune:missing-e-flag` PASSED\e[0m'
else
  echo -e $'\e[31m[test-all-scripts.sh] - Test 8: `npm run envtune:missing-e-flag` FAILED\e[0m'
fi