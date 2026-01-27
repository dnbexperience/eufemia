---
title: 'AI and Tools'
description: 'Code editor extensions, ESLint plugin, AI assistance and MCP server for Eufemia development.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.373Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Tools

## AI Assistance and MCP Server (beta)

**NB:** This feature is experimental and may change in the future. Please give us feedback on your experience with it!

If your AI coding agent supports the Model Context Protocol (MCP), you can run a small local MCP server that exposes the packaged documentation from `/docs`.

Run the server from your project (where `@dnb/eufemia` is installed):

Example MCP config (e.g. `.vscode/mcp.json`):

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

CLI (Claude MCP):

```bash
claude mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
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

![Auto completion for px/rem spacing system](./tools/eufemia-vscode-extension-spacing.png)

2. Equivalent to `px` or `rem` value example

![Tooltip for px/rem equivalent](./tools/eufemia-vscode-extension-hover.png)

3. `font-size` example

![Auto completion for font-size](./tools/eufemia-vscode-extension-font-size.png)

## ESLint Plugin

You may have a look at the [Eufemia ESLint Plugin](https://github.com/dnbexperience/eslint-plugin-eufemia) it will over time extend with more rules that can help you detect issues or recommendations.
