# DNB Style Guide

The DNB Style Guide is the go to place for all who has to design, develop or create visuals with the DNB brand.

## Run the Style Guide locally

The DNB Style Guide is built with the [static site generator React Static](https://react-static.js.org/).

1.  To run the site locally you'll need to [Node](https://node.io/). macOS users, use: `brew install node`
1.  Run the site: `yarn start`
1.  It should now be live at `http://localhost:3000/`

## Environment Variables

1.  You have to create a **.env** file in this package to set correct environment variables.
1.  Add the following content to it: `BASE_PATH=/dnb-design-system` - this may change in the future, depending of where the production site is deployed to.

## Export locally

1.  run `yarn build:local`
1.  This will generate a new folder called: `docs`. You will find it in the root if this package.
1.  You may run `yarn serve` to view the site at `http://localhost:3001/`

## Export for publishing

1.  run `yarn build`
1.  This will generate a new folder called: `docs`. You will find it in the root if this package. It contains a **static** site with only html, js and css files.
1.  This will be the content You can push to a deploying server or copy it manually into a git branch called `gh-pages`.
