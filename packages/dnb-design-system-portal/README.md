# DNB Eufemia Portal

The DNB Eufemia Design System Portal is the go to place for all who has to design, develop or create digital WEB applications with the DNB brand.

## Run the Portal locally

The DNB Eufemia Portal is built with the [Gatsby](https://www.gatsbyjs.com/).

1. To run the site locally you'll need [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com) or [Yarn](https://yarnpkg.com/)
1. Run the site: `yarn workspace dnb-design-system-portal start`
1. It should now be live at `http://localhost:8000/`

## Create local build

1. Run `yarn workspace dnb-design-system-portal build`
   - and if you need to create a IE11 (legacy browser build), use `yarn workspace dnb-design-system-portal build:legacy`.
1. This will generate a new folder called: `public`. You will find it in the root in this package.
   1. `public` contain all the generated static files inside
1. You may run `yarn serve` to view the site at `http://localhost:8000/`
1. You may delete all Browser Caches afterwards to remove the Service Worker
