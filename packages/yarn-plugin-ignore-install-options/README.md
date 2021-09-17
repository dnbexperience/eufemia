# Yarn Plugin

This Yarn Plugin ensures we ignore legacy flags / supported options during install, without braking the initial command. Just ignore it silently please. Yes.

This way, CIs which by default run `yarn install --non-interactive --prefer-offline --network-timeout 600000` comands, will still function.

## Making changes?

If you make changes to the `/index.js` file? Run this command afterwards:

`yarn workspace yarn-plugin-ignore-install-options update`
