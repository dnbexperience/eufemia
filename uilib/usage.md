---
title: 'Usage'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.356Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Usage

**Get started using the DNB user interface library**

The UI library's HTML elements and UI components are isolated, ready-to-use building blocks. They are self-contained and include the styles needed for proper display.

- **HTML elements** are styled HTML tags
- **UI components** are styled and custom-built HTML elements
- **UI extensions** are styled, functional additions to Eufemia

You can use any of the HTML elements and UI components as demonstrated in the documentation, with various customization properties available.

## The Eufemia Repository

The `@dnb/eufemia` is hosted as a sub package inside the [<Icon icon={EufemiaLogo} size="large" />**Eufemia Repository**](https://github.com/dnbexperience/eufemia) on GitHub.

You can also enable [<Icon icon={GithubLogo} size="default" />notification about upcoming releases](https://help.github.com/articles/watching-and-unwatching-releases-for-a-repository/).

## Installation

To install and save `@dnb/eufemia` in your **package.json** dependencies, run:

**Note:** [React](https://www.npmjs.com/package/react) and [React DOM](https://www.npmjs.com/package/react-dom) are also required.

```bash
# React version 16 is currently used
# You may want to specify react@16 and react-dom@16
$ npm i @dnb/eufemia react react-dom
```

Read more in the [First Steps](/uilib/usage/first-steps/) section.

## Supported Browsers and Platforms

```tsx
render(
  <Table size="small" outline>
    <thead>
      <Tr>
        <Th
          style={{
            width: '30%',
          }}
        >
          Browser
        </Th>
        <Th>Minimum version</Th>
      </Tr>
    </thead>

    <tbody>
      {supportedBrowsers.map((browser, key) => {
        return (
          <Tr key={key}>
            <Td>{browser.name}</Td>
            <Td>
              <Code>{browser.minimumVersion}</Code>
            </Td>
          </Tr>
        )
      })}
    </tbody>
  </Table>
)
```

### Configuration and Browserslist

Eufemia uses the [@dnb/browserslist-config](https://github.com/dnbexperience/browserslist-config) configuration for bundle output, defined in `.browserslistrc`:

- `extends @dnb/browserslist-config`

This configuration only affects the JavaScript bundle output, not the CSS bundle output.

To see which browsers this config supports, paste the following config into the [Check compatible browsers](https://browsersl.ist/#q=defaults+and+supports+es6-module) tool:

```tsx
render(
  <Space element="pre">
    <Code>
      <Space innerSpace>
        <CopyOnClick>
          {config
            .map((browser) => {
              return browser
            })
            .join(',\n')}
        </CopyOnClick>
      </Space>
    </Code>
  </Space>
)
```
