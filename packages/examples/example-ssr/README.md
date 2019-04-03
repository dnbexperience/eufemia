# DNB UI Library - React SSR Example

## How to run this Example App

1. Make sure You have installed the dependencies `yarn install`.
1. If You run this app inside the mono repo Eufemia, then make sure You build the `dnb-ui-lib` first. To do so, go to the `dnb-ui-lib` directory and run `yarn build`. This is because we consume the package content directly like: import `dnb-ui-lib/style` and not from the `src` folder, like: `dnb-ui-lib/src/style`.
1. To generate the static HTML file (as we don't use a dynamic backend server), run `yarn generate` inside this Example App.
1. Check out the new `/dist` folder with the static files (index.html).

**Why class-properties?**
We only use the Babel Plugin `transform-class-properties` to run the `handleClick` event like a class property.
