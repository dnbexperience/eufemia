# DNB Design System

This is a mono repo and uses **yarn workspaces** to manage the sub packages/workspaces.
Some of the included packages/workspaces are `dnb-design-guide` and `dnb-ui-lib`. Read more about the purposes of them in the respective packages `readme.md` files.

## DNB Eufemia Portal

Find more information on how to use the Design System on the [Eufemia Portal](https://dnbexperience.github.io/eufemia/).

## Requirements

Install [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com).

## Setup Instructions

1.  Clone this repo to your local machine `git clone [repo]`
1.  cd into the main directory and run `yarn install`

### Use `develop` and the _GitHub Flow_

1.  Make sure You run `git checkout develop` - as **develop** is the working branch
1.  Make your own branch in case You are making a pull request into **develop**

## Releases

The CI will handle new releases once new changes gets merged into the `master` branch. Mainly though a Pull Request.
