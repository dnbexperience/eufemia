# DNB Eufemia Portal

The DNB Eufemia Design System Portal is the go to place for all who has to design, develop or create digital WEB applications with the DNB brand.

## Run the Portal locally

The DNB Eufemia Portal is built with the [Gatsby](https://www.gatsbyjs.org/).

1. To run the site locally you'll need [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com) or [Yarn](https://yarnpkg.com/)
1. Run the site: `yarn start`
1. It should now be live at `http://localhost:8000/`

## Build the pages

1. Run `yarn build`
1. This will generate all pages and necessary linking

## Build static locally

1. Run `yarn build-portal`
1. This will generate a new folder called: `public`. You will find it in the root in this package.
   1. `public` contain all the generated static files inside
1. You may run `yarn serve` to view the site at `http://localhost:8000/`
1. You may delete all Browser Caches afterwards to remove the Service Worker
