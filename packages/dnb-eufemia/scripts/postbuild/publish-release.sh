#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Publish release started ...'

cd ./build

dotenv semantic-release

echo 'Publish release done!'
