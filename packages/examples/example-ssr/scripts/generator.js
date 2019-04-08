/**
 * To showcase the usage of the dnb-ui-lib in React SSR
 *
 */

import React from 'react'

import path from 'path'
import fs from 'fs'

import App from '../src/App.jsx'
import {
  PrerenderedControler,
  thisIsServer
} from 'react-prerendered-component'
import { renderToString } from 'react-dom/server'

GenerateHtmlFile(App, '../index.html')

function GenerateHtmlFile(Component, file) {
  global.document = { getElementById: () => {} }
  thisIsServer(false)

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>React Example</title>
    <link rel="stylesheet" href="./bundle.css" />
  </head>
  <body>
    <div id="app">${renderToString(
      <PrerenderedControler isServer>
        <Component count={12} />
      </PrerenderedControler>
    )}</div>
    <script src="./main.js"></script>
  </body>
</html>
  `.trim()

  const exportedFilePath = path.resolve(__dirname, file)
  fs.writeFileSync(exportedFilePath, html)

  // console.log(html)
}
