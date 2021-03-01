---
title: 'NPM Library'
draft: true
order: 4
---

# NPM Library

These folders/files will be a part of the NPM [package](https://unpkg.com/@dnb/eufemia@latest/):

- /assets
- /components
- /elements
- /extensions
- /fragments
- /icons
- /style
- /cjs
- /es
- /esm
- /umd
- /shared
- web-components.js
- lib.js
- index.js
- package.json

## Important aspects

- PropTypes are getting [wrapped with]([this babel plugin](babel-plugin-transform-react-remove-prop-types)) `process.env.NODE_ENV !== "production"`. This way applications in production, will not include `propTypes`. If a component depends to check `propTypes` during runtime, consider to export them, so they not getting removed – or simply use `defaultProps` for the operation.
- As for now, we use React Class Components, because there may happen the case, where two React instances are used, and that does not work with Hooks. Also performance is a key factor. But we may considder a rewrite at some point of time.
