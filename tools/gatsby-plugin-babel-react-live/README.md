# Gatsby Plugin to enhance React Live syntax

[React Live](https://github.com/FormidableLabs/react-live) only supports code as a string. This Gatsby Plugin uses Babel to transform JavaScript and TypeScript code to a string so related components do receive the syntax as a string.

This allows the given "source code" to be fully typed (TypeScript).

## Example

**Input**

```tsx
const YourComponent = () => {
  const foo = 'bar'
  return (
    <LiveProvider scope={{ foo }} data-your-attributes>
      <div>{foo}</div>
    </LiveProvider>
  )
}
```

**Output**

```tsx
const YourComponent = () => {
  const foo = 'bar'
  return (
    <LiveProvider scope={{ foo }} data-your-attributes>
      {`<div>{foo}</div>`}
    </LiveProvider>
  )
}
```

When used with a render callback, it is transformed to use ReactLive's `render` (noInline).

**Input**

```tsx
const YourComponent = () => {
  const foo = 'bar'
  return (
    <LiveProvider scope={{ foo, styled }}>
      {() => {
        const StyledDiv = styled.div`
          color: red;
        `
        return <StyledDiv>{foo}</StyledDiv>
      }}
    </LiveProvider>
  )
}
```

**Output**

```tsx
const YourComponent = () => {
  const foo = 'bar'
  return (
    <LiveProvider scope={{ foo, styled }} noInline>
      {`
        const StyledDiv = styled.div\`
          color: red;
        \`
        render(<StyledDiv>{foo}</StyledDiv>)
      `}
    </LiveProvider>
  )
}
```

## How to use

Install `yarn add gatsby-plugin-babel-react-live` and add it to your `gatsby-config.js` file:

```js
// gatsby-config.js
{
  plugins: [
    {
      resolve: 'gatsby-plugin-babel-react-live',
      options: {
        componentName: 'YourComponent',
        filesToMatch: [
          'Examples.tsx' /* for MDX we could use MDXLayout */,
        ],
        prettierPath: require.resolve('./.prettierrc'),
      },
    },
  ]
}
```

## How it works

It uses `babel-plugin-react-live` under the hood.

## Known issues

- For now, it only works with TypeScript (`.tsx`) and not JavaScript, because the Babel plugin replaces a node with an existing AST, and that runs some other Babel plugins. And if they do not check if an transform not already did happen, then we end up with double imports of the same, which breaks a build.
- For the same reason mentioned above, we need to use `gatsby-plugin-emotion` v5. Else also it will not work when used in TypeScript either.
- When making changes to the Babel Plugin, you need to clean the Gatsby cache, else Webpack/Babel will used a cached plugin version.
