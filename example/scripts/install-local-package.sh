#!/bin/bash

cd ..
echo -e $'\e[33m\n[install-local-package.sh]\nBuilding current envtune version\n\e[0m'
npm run build

echo -e $'\e[33m\n[install-local-package.sh]\nGenerating tarball file for current envtune version\n\e[0m'
npm pack

TARBALL=$(ls *.tgz)
echo -e $'\e[33m\n[install-local-package.sh]\nGenerated tarball file \e[0m\e[33m'${TARBALL}$'\n\e[0m'

echo -e $'\e[33m\n[install-local-package.sh]\nMoving and renaming generated tarball file to `example` directory\n\e[0m'
mv "${TARBALL}" "example/envtune-latest.tgz"

cd example
echo -e $'\e[33m\n[install-local-package.sh]\nRemoving any existing envtune dependency from `example` repo\n\e[0m'
npm remove envtune

echo -e $'\e[33m\n[install-local-package.sh]\nInstalling generated tarball as dependency in `example` repo\n\e[0m'
npm install "./envtune-latest.tgz"
