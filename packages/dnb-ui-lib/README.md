# DNB UI Library

The DNB UI Library has three main functions:

- It's a place to showcase DNB's latest UI components and how they are built
- With displaying the code behind each component the UI Library will be the go-to place for any developer in DNB to grab the code for the component.
- If the component doesn't exist in the UI Library it should be easy to add a new component to it.

## Getting started

To start using the UI components in your project do the following steps:

1.  Add the [dnb.ui.library.js](https://raw.githubusercontent.com/dnbexperience/eufemia/master/docs/scripts/dnb.ui.library.js) right before the closing `</body>` tag
2.  Add the [dnb.ui.library.css](https://raw.githubusercontent.com/dnbexperience/eufemia/master/docs/css/dnb.ui.library.css) file to your `<head>` tag
3.  Add the [/assets](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/dnbexperience/eufemia/tree/master/docs/assets) directory to your project to get the fonts and images
4.  Copy the `HTML`for the component you want to use and paste it into your project

Example of implementation:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Example Project</title>
  <link rel="stylesheet" href="css/dnb.ui.library.css">
</head>
<body class="dnb-style">

  <button class="dnb-button dnb-button--primary dnb-button--has-text">
    <span class="dnb-button__text">
      Primary button with text only
    </span>
  </button>

  <script src="js/dnb.ui.library.js"></script>
</body>
</html>
```

## Build the UI Library

The DNB UI Library uses Gulp, Babel among other tools to make a develop or production built.

## Create a Pre-Publish Build

1.  run: `yarn publish:pre`.
1.  It should now generate a couple of folders like `lib`, `assets` and `style`. These folders contains the NPM publish package content.

## Publish the Build to NPM

1.  make first a build locally: `yarn publish:pre` then run: `yarn publish:release`.

## Use the Figma API

To use the Figma API together with the `dnb-ui-lib` as the `Source of Truth`, is for now a more experimental approach. The Figma file has to be made carefully and accurate to match the defined rules and definitions. This way a designer can change either the production CSS thou the production build.
In more technical terms, there are three main methods make this possible.

- The most safe, but least flexible method is to pick up the SCSS/SASS variables and replace them and save them into a new file.
- Another variant is to actually replace the variables in the source SCSS/SASS file.
- The third and most powerful method (in eyes of an designer) is to create a new style sheet file. This will be included after the main component style. This we we can define styles witch are not set before.

## Figma API Token

1.  You need to get Your Figma Token
1.  Create a **.env** file in the root of your directory and copy the token into this file:

```
FIGMA_TOKEN="your token"
FIGMA_MAIN_FILE="your file"
FIGMA_STYLES_FRAME="dnb-ui-components"
FIGMA_ICONS_FRAME="dnb-ui-icons"
FIGMA_ICONS_SELECTOR="icon--"
```

# Requirements

As the stage of writing, You may include the [Babel](https://babeljs.io) plugins `transform-class-properties`, `transform-decorators-legacy` and `transform-object-rest-spread`. This will most likely change in future, as these proposals will be included in future ECMAScript versions.
