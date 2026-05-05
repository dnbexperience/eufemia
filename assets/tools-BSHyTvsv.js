import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Tools`}),`
`,(0,n.jsx)(r.h2,{children:`AI Assistance and MCP Server (beta)`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`NB:`}),` This feature is experimental and may change in the future. Please give us feedback on your experience with it!`]}),`
`,(0,n.jsxs)(r.p,{children:[`If your AI coding agent supports the Model Context Protocol (MCP), you can run a small local MCP server that exposes the packaged documentation from `,(0,n.jsx)(r.code,{children:`/docs`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`But first, make sure you have installed `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` and `,(0,n.jsx)(r.code,{children:`@modelcontextprotocol/sdk`}),` in your project:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`npm install @dnb/eufemia @modelcontextprotocol/sdk
# or
yarn add @dnb/eufemia @modelcontextprotocol/sdk
# or
pnpm add @dnb/eufemia @modelcontextprotocol/sdk
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Run the server from your project (where `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` is installed):`]}),`
`,(0,n.jsxs)(r.h3,{children:[`Example MCP config (e.g. `,(0,n.jsx)(r.code,{children:`.vscode/mcp.json`}),`):`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-json`,children:`{
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
`,(0,n.jsx)(r.h3,{children:`Using Claude CLI with MCP:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`claude mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
`})}),`
`,(0,n.jsx)(r.h3,{children:`Using raicode CLI with MCP (using Claude):`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`raicode mcp add --transport stdio eufemia -- node node_modules/@dnb/eufemia/mcp/mcp-docs-server.js
`})}),`
`,(0,n.jsx)(r.h3,{children:`How to use`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The MCP server helps AI apply Eufemia patterns more accurately in code, but results can still be imperfect. So always review the output carefully!`}),`
`,(0,n.jsx)(r.li,{children:`The MCP server provides documentation context only; it does not execute code or access the network.`}),`
`,(0,n.jsx)(r.li,{children:`Ask your AI tool to search or summarize Eufemia docs, e.g. "Find the spacing system rules in Eufemia."`}),`
`,(0,n.jsxs)(r.li,{children:[`If the server fails to start, confirm `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` is installed and the path points to `,(0,n.jsx)(r.code,{children:`node_modules/@dnb/eufemia/mcp/mcp-docs-server.js`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Code Editor Extensions`}),`
`,(0,n.jsx)(r.h3,{children:`The Visual Studio Code Extension`}),`
`,(0,n.jsx)(r.p,{children:`It supports:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`plain `,(0,n.jsx)(r.code,{children:`px`}),` to `,(0,n.jsx)(r.code,{children:`rem`}),` conversion.`]}),`
`,(0,n.jsxs)(r.li,{children:[`annotation for `,(0,n.jsx)(r.code,{children:`px`}),` and `,(0,n.jsx)(r.code,{children:`rem`}),` equivalent values.`]}),`
`,(0,n.jsxs)(r.li,{children:[`auto completion for the `,(0,n.jsx)(r.a,{href:`/uilib/usage/layout/spacing/`,children:`spacing system`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`auto completion for `,(0,n.jsx)(r.a,{href:`/uilib/typography/font-size/`,children:(0,n.jsx)(r.code,{children:`font-size`})}),` and `,(0,n.jsx)(r.a,{href:`/uilib/typography/line-height/`,children:(0,n.jsx)(r.code,{children:`line-height`})}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Install the `,(0,n.jsx)(r.a,{href:`https://marketplace.visualstudio.com/items?itemName=dnbexperience.vscode-eufemia`,children:`VSCode Extension`}),` or view the
`,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/vscode-eufemia`,children:`source code`}),`.`]}),`
`,(0,n.jsx)(r.h4,{children:`Screenshots`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Spacing System example`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`./assets/eufemia-vscode-extension-spacing.png`,alt:`Auto completion for px/rem spacing system`})}),`
`,(0,n.jsxs)(r.ol,{start:`2`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Equivalent to `,(0,n.jsx)(r.code,{children:`px`}),` or `,(0,n.jsx)(r.code,{children:`rem`}),` value example`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`./assets/eufemia-vscode-extension-hover.png`,alt:`Tooltip for px/rem equivalent`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`font-size`}),` example`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`./assets/eufemia-vscode-extension-font-size.png`,alt:`Auto completion for font-size`})}),`
`,(0,n.jsx)(r.h2,{children:`ESLint Plugin`}),`
`,(0,n.jsxs)(r.p,{children:[`You may have a look at the `,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eslint-plugin-eufemia`,children:`Eufemia ESLint Plugin`}),` it will over time extend with more rules that can help you detect issues or recommendations.`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};