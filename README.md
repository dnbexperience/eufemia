# DNB Design System

This is a mono repo and uses **yarn workspaces** to manage the sub packages/workspaces.
Some of the included packages/workspaces are `dnb-design-system-portal` and `dnb-eufemia`. Read more about the purposes of them in the respective packages `README.md` files.

## DNB Eufemia Portal

Find more information on how to use the Design System on the [Eufemia Portal](https://eufemia.dnb.no/).

## Contribution

Find more information about how to contribute in [the development](https://eufemia.dnb.no/uilib/development) section. But in short, follow along and read the rest of this short readme text.

### Requirements

Install [Node.js](https://nodejs.org) and [yarn](https://yarnpkg.com).

### Setup Instructions

1.  Clone this repo to your local machine `git clone [repo]`
1.  cd into the main directory and run `yarn install`

#### Use `main` and the _GitHub Flow_

1.  Make sure You run `git checkout main` - as **main** is the working branch
1.  Make your own branch in case You are making a pull request into **main**

### Releases

The CI will handle new releases once the changes (by a Pull Request) gets merged from `origin/main` into the `origin/release` branch.
