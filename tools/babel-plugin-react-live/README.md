# Babel Plugin to enhance React Live syntax

[React Live](https://github.com/FormidableLabs/react-live) only supports code as a string. This Babel Plugin uses AST to transform JavaScript and TypeScript code to a string.

This allows the given "source code" to be fully typed (TypeScript).

## How to use

Install `babel-plugin-react-live` and add it to your Babel config.

```json
{
  "plugins": [
    [
      "babel-plugin-react-live",
      {
        "componentName": "YourComponent",
        "filesToMatch": ["Examples.tsx"],
        "prettierPath": "./.prettierrc"
      }
    ]
  ]
}
```

## How it works

It uses AST to transform related code to a string.
