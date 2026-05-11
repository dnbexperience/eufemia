---
title: 'AI, MCP and Tools'
description: 'Code editor extensions, ESLint plugin, AI assistance and MCP server for Eufemia development.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.976Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Tools

## AI Assistance and MCP Server (beta)

**NB:** This feature is experimental and may change in the future. Please give us feedback on your experience with it!

If your AI coding agent supports the Model Context Protocol (MCP), you can run a small local MCP server that exposes the packaged documentation from `/docs`.

But first, make sure you have installed `@dnb/eufemia` and `@modelcontextprotocol/sdk` in your project:

```bash
npm install @dnb/eufemia @modelcontextprotocol/sdk
# or
yarn add @dnb/eufemia @modelcontextprotocol/sdk
# or
pnpm add @dnb/eufemia @modelcontextprotocol/sdk
```

Run the server from your project (where `@dnb/eufemia` is installed):

### Example MCP config (e.g. `.vscode/mcp.json`):

```json
{
  "servers": {
    "eufemia": {
      "command": "node",
      "args": [
        "${workspaceFolder}/node_modules/@dnb/eufemia/mcp/mcp-docs-server.js"
      ]
    }
  }
}
```

### Using Claude CLI with MCP:

```bash
claude mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
```

### Using raicode CLI with MCP (using Claude):

```bash
raicode mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
```

### How to use

- The MCP server helps AI apply Eufemia patterns more accurately in code, but results can still be imperfect. So always review the output carefully!
- The MCP server provides documentation context only; it does not execute code or access the network.
- Ask your AI tool to search or summarize Eufemia docs, e.g. "Find the spacing system rules in Eufemia."
- If the server fails to start, confirm `@dnb/eufemia` is installed and the path points to `node_modules/@dnb/eufemia/mcp/mcp-docs-server.js`.

## Code Editor Extensions

### The Visual Studio Code Extension

It supports:

- plain `px` to `rem` conversion.
- annotation for `px` and `rem` equivalent values.
- auto completion for the [spacing system](/uilib/usage/layout/spacing/).
- auto completion for [`font-size`](/uilib/typography/font-size/) and [`line-height`](/uilib/typography/line-height/).

Install the [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=dnbexperience.vscode-eufemia) or view the
[source code](https://github.com/dnbexperience/vscode-eufemia).

#### Screenshots

1. Spacing System example

![Auto completion for px/rem spacing system](./assets/eufemia-vscode-extension-spacing.png)

2. Equivalent to `px` or `rem` value example

![Tooltip for px/rem equivalent](./assets/eufemia-vscode-extension-hover.png)

3. `font-size` example

![Auto completion for font-size](./assets/eufemia-vscode-extension-font-size.png)

## Lint Plugins

Eufemia ships lint plugins as part of `@dnb/eufemia`, so you can import them directly from the main package.

Install `eslint` and/or `stylelint` in your application if you do not already use them.

### ESLint

Use the recommended flat config preset:

```js
import eufemiaEslint from '@dnb/eufemia/plugins/eslint.js'

export default [eufemiaEslint.recommended]
```

If you need full control, register the plugin and configure the rules yourself:

```js
import eufemiaEslint from '@dnb/eufemia/plugins/eslint.js'

export default [
  {
    plugins: {
      eufemia: eufemiaEslint,
    },
    rules: {
      // All rules
      ...eufemiaEslint.recommended.rules,

      // Or specific rules
      'eufemia/no-deprecated-color-variables': 'error',
    },
  },
]
```

### Stylelint

Use the recommended preset:

```js
import eufemiaStylelint from '@dnb/eufemia/plugins/stylelint.js'

export default eufemiaStylelint.recommended
```

If you need full control, register the plugin and configure the rules yourself:

```js
import eufemiaStylelint from '@dnb/eufemia/plugins/stylelint.js'

export default {
  plugins: [eufemiaStylelint],
  rules: {
    'eufemia/no-deprecated-color-variables': true,
  },
}
```

For SCSS files, configure Stylelint with [postcss-scss](https://www.npmjs.com/package/postcss-scss) as the custom syntax.

### PostCSS (Style Isolation)

If you use the [style isolation](/uilib/usage/customisation/styling/style-isolation/) PostCSS plugin, deprecation warnings for `--color-*` variables are enabled by default at build time:

```js
import styleScopePlugin from '@dnb/eufemia/plugins/postcss-isolated-style-scope.js'

export default {
  plugins: [styleScopePlugin()],
}
```

To disable the warnings, set `warnOnDeprecatedColorVariables: false`:

```js
export default {
  plugins: [styleScopePlugin({ warnOnDeprecatedColorVariables: false })],
}
```

Both plugins ship with one rule: `no-deprecated-color-variables`. It reports deprecated `--color-*` CSS variables and guides towards design tokens instead.
