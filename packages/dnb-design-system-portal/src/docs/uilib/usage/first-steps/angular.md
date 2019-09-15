---
title: 'Angular'
draft: false
order: 7
---

import Img from 'Tags/Img'
import AngularAppScreenshot from 'Pages/uilib/usage/first-steps/assets/example-angular-1-screenshot.png'

# Angular

## How to

Take a look at the [Example App on GitHub](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-angular-1) using the `dnb-ui-lib` React Components.
This is an Example App to demo the usage of `dnb-ui-lib` in Angular _version 1.7.9_. To power the React usage, You could use [react2angular on NPM](https://www.npmjs.com/package/react2angular).

The syntax looks a like:

```js
import { Button } from 'dnb-ui-lib'
import { bell_medium as Bell } from 'dnb-ui-lib/icons'

ngEufemiaButton.directive('eufemiaButtonDirective', () => {
  return {
    controller: $scope => {
      $scope.text = 'Button'
      $scope.icon = Bell
      $scope.onClick = event => console.log('onClick', event)
    },
    template: /* @html */ `
  <eufemia-button
    text="text"
    icon="icon"
    on-click="onClick"
  ></eufemia-button>
`
  }
})
```

## Build

If You run this app inside the mono repo Eufemia, then make sure You build the `dnb-ui-lib` first. To do so, go to the `dnb-ui-lib` directory and run `yarn build`. This is because we consume the package content directly like: import `dnb-ui-lib/components` and not from the `src` folder, like: `dnb-ui-lib/src/components`.

## Screenshot

<Img src={AngularAppScreenshot} caption="Screenshot of Angular Example App" width="80%" />
