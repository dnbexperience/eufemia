import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Tools`}),`
`,(0,r.jsx)(t.h2,{children:`AI Assistance and MCP Server`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`NB:`}),` This feature is experimental and may change in the future. Please give us feedback on your experience with it!`]}),`
`,(0,r.jsx)(t.p,{children:`If your AI coding agent supports the Model Context Protocol (MCP), you have two options:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Use the hosted MCP server`}),` at `,(0,r.jsx)(t.code,{children:`https://eufemia-mcp.eufemia.workers.dev/mcp`}),` — no installation needed, always serves the latest released docs.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Run a local MCP server`}),` that exposes the packaged documentation from `,(0,r.jsx)(t.code,{children:`/docs`}),` — useful for offline / air-gapped work, and pinned to the exact `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` version installed in your project (so the docs the AI sees match the components you actually consume).`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Hosted MCP server`}),`
`,(0,r.jsx)(t.p,{children:`Point your MCP-aware client at the public Streamable HTTP endpoint:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-txt`,children:`https://eufemia-mcp.eufemia.workers.dev/mcp
`})}),`
`,(0,r.jsxs)(t.p,{children:[`It is hosted on Cloudflare Workers, supports the modern Streamable HTTP transport, and serves the same documentation tools (`,(0,r.jsx)(t.code,{children:`docs_entry`}),`, `,(0,r.jsx)(t.code,{children:`docs_search`}),`, `,(0,r.jsx)(t.code,{children:`component_find`}),`, etc.) as the local server below. A health endpoint is available at `,(0,r.jsx)(t.code,{children:`https://eufemia-mcp.eufemia.workers.dev/healthz`}),`.`]}),`
`,(0,r.jsx)(t.h4,{children:`Example: Claude CLI / raicode CLI`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`claude mcp add --transport http eufemia https://eufemia-mcp.eufemia.workers.dev/mcp
# or
raicode mcp add --transport http eufemia https://eufemia-mcp.eufemia.workers.dev/mcp
`})}),`
`,(0,r.jsx)(t.h3,{children:`Local MCP server (pinned to your installed Eufemia version)`}),`
`,(0,r.jsxs)(t.p,{children:[`Run the local MCP server when you want the docs the AI sees to match the exact `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` version you have installed — for example to avoid suggestions that reference components or props from a newer release than your project consumes — or when the hosted Worker is unreachable (offline / air-gapped environments).`]}),`
`,(0,r.jsxs)(t.p,{children:[`But first, make sure you have installed `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` and `,(0,r.jsx)(t.code,{children:`@modelcontextprotocol/sdk`}),` in your project:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`npm install @dnb/eufemia @modelcontextprotocol/sdk
# or
yarn add @dnb/eufemia @modelcontextprotocol/sdk
# or
pnpm add @dnb/eufemia @modelcontextprotocol/sdk
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Run the server from your project (where `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` is installed):`]}),`
`,(0,r.jsxs)(t.h3,{children:[`Example MCP config (e.g. `,(0,r.jsx)(t.code,{children:`.vscode/mcp.json`}),`):`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-json`,children:`{
  "servers": {
    "eufemia": {
      "command": "node",
      "args": [
        "\${workspaceFolder}/node_modules/@dnb/eufemia/mcp/mcp-docs-server.js"
      ]
    }
  }
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`Using Claude CLI with MCP:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`claude mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
`})}),`
`,(0,r.jsx)(t.h3,{children:`Using raicode CLI with MCP (using Claude):`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`raicode mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
`})}),`
`,(0,r.jsx)(t.h3,{children:`How to use`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`The MCP server helps AI apply Eufemia patterns more accurately in code, but results can still be imperfect. So always review the output carefully!`}),`
`,(0,r.jsx)(t.li,{children:`The MCP server provides documentation context only; it does not execute code or access the network.`}),`
`,(0,r.jsx)(t.li,{children:`Ask your AI tool to search or summarize Eufemia docs, e.g. "Find the spacing system rules in Eufemia."`}),`
`,(0,r.jsxs)(t.li,{children:[`If the server fails to start, confirm `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` is installed and the path points to `,(0,r.jsx)(t.code,{children:`node_modules/@dnb/eufemia/mcp/mcp-docs-server.js`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Code Editor Extensions`}),`
`,(0,r.jsx)(t.h3,{children:`The Visual Studio Code Extension`}),`
`,(0,r.jsx)(t.p,{children:`It supports:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`plain `,(0,r.jsx)(t.code,{children:`px`}),` to `,(0,r.jsx)(t.code,{children:`rem`}),` conversion.`]}),`
`,(0,r.jsxs)(t.li,{children:[`annotation for `,(0,r.jsx)(t.code,{children:`px`}),` and `,(0,r.jsx)(t.code,{children:`rem`}),` equivalent values.`]}),`
`,(0,r.jsxs)(t.li,{children:[`auto completion for the `,(0,r.jsx)(t.a,{href:`/uilib/layout/spacing/`,children:`spacing system`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`auto completion for `,(0,r.jsx)(t.a,{href:`/uilib/typography/font-size/`,children:(0,r.jsx)(t.code,{children:`font-size`})}),` and `,(0,r.jsx)(t.a,{href:`/uilib/typography/line-height/`,children:(0,r.jsx)(t.code,{children:`line-height`})}),`.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Install the `,(0,r.jsx)(t.a,{href:`https://marketplace.visualstudio.com/items?itemName=dnbexperience.vscode-eufemia`,children:`VSCode Extension`}),` or view the
`,(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/vscode-eufemia`,children:`source code`}),`.`]}),`
`,(0,r.jsx)(t.h4,{children:`Screenshots`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`Spacing System example`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:`./assets/eufemia-vscode-extension-spacing.png`,alt:`Auto completion for px/rem spacing system`})}),`
`,(0,r.jsxs)(t.ol,{start:`2`,children:[`
`,(0,r.jsxs)(t.li,{children:[`Equivalent to `,(0,r.jsx)(t.code,{children:`px`}),` or `,(0,r.jsx)(t.code,{children:`rem`}),` value example`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:`./assets/eufemia-vscode-extension-hover.png`,alt:`Tooltip for px/rem equivalent`})}),`
`,(0,r.jsxs)(t.ol,{start:`3`,children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`font-size`}),` example`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:`./assets/eufemia-vscode-extension-font-size.png`,alt:`Auto completion for font-size`})}),`
`,(0,r.jsx)(t.h2,{children:`Lint Plugins`}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia ships lint plugins as part of `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`, so you can import them directly from the main package.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Install `,(0,r.jsx)(t.code,{children:`eslint`}),` and/or `,(0,r.jsx)(t.code,{children:`stylelint`}),` in your application if you do not already use them.`]}),`
`,(0,r.jsx)(t.h3,{children:`ESLint`}),`
`,(0,r.jsx)(t.p,{children:`Use the recommended flat config preset:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import eufemiaEslint from '@dnb/eufemia/plugins/eslint.js'

export default [eufemiaEslint.recommended]
`})}),`
`,(0,r.jsx)(t.p,{children:`If you need full control, register the plugin and configure the rules yourself:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import eufemiaEslint from '@dnb/eufemia/plugins/eslint.js'

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
`})}),`
`,(0,r.jsx)(t.h3,{children:`Stylelint`}),`
`,(0,r.jsx)(t.p,{children:`Use the recommended preset to enable all rules:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import eufemiaStylelint from '@dnb/eufemia/plugins/stylelint.js'

export default eufemiaStylelint.recommended
`})}),`
`,(0,r.jsx)(t.p,{children:`If you need full control, register individual plugins and configure the rules yourself:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import eufemiaStylelint from '@dnb/eufemia/plugins/stylelint.js'

export default {
  plugins: [eufemiaStylelint],
  rules: {
    'eufemia/no-deprecated-color-variables': true,
    'eufemia/token-name-policy': [true, { themePrefixes: { ui: 'dnb' } }],
  },
}
`})}),`
`,(0,r.jsx)(t.p,{children:`Available rules:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`eufemia/no-deprecated-color-variables`})}),` — Warns when deprecated `,(0,r.jsx)(t.code,{children:`--color-*`}),` CSS variables are used. Suggests design tokens instead.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`eufemia/token-name-policy`})}),` — Validates `,(0,r.jsx)(t.code,{children:`--token-*`}),` naming conventions: prefix, category, color semantics, theme prefixes, cross-brand parity, and more. Accepts a `,(0,r.jsx)(t.code,{children:`themePrefixes`}),` option to map brand names to their CSS variable prefixes.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`For SCSS files, configure Stylelint with `,(0,r.jsx)(t.a,{href:`https://www.npmjs.com/package/postcss-scss`,children:`postcss-scss`}),` as the custom syntax.`]}),`
`,(0,r.jsx)(t.h3,{children:`PostCSS (Style Isolation)`}),`
`,(0,r.jsxs)(t.p,{children:[`If you use the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/style-isolation/`,children:`style isolation`}),` PostCSS plugin, deprecation warnings for `,(0,r.jsx)(t.code,{children:`--color-*`}),` variables are enabled by default at build time:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import styleScopePlugin from '@dnb/eufemia/plugins/postcss-isolated-style-scope.js'

export default {
  plugins: [styleScopePlugin()],
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`To disable the warnings, set `,(0,r.jsx)(t.code,{children:`warnOnDeprecatedColorVariables: false`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`export default {
  plugins: [styleScopePlugin({ warnOnDeprecatedColorVariables: false })],
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Both plugins ship with one rule: `,(0,r.jsx)(t.code,{children:`no-deprecated-color-variables`}),`. It reports deprecated `,(0,r.jsx)(t.code,{children:`--color-*`}),` CSS variables and guides towards design tokens instead.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};