---
title: 'Angular'
order: 7
---

import Img from 'Tags/Img'
import AngularAppScreenshot from 'Pages/uilib/usage/first-steps/assets/example-angular-1-screenshot.png'

# Angular

## Angular v2 and above

Eufemia may have an example code soon of using this [React adapter solution, used by Microsoft](https://github.com/microsoft/angular-react/).

## Angular v1

Take a look at the [Example App on GitHub](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-angular-1) using the `dnb-ui-lib` React Components.
This is an Example App to demo the usage of `dnb-ui-lib` in Angular _version 1.7.9_. To power the React usage, You could use [react2angular on NPM](https://www.npmjs.com/package/react2angular).

The syntax looks a like:

```js
import { Button } from 'dnb-ui-lib'
import { bell_medium as Bell } from 'dnb-ui-lib/icons'

ngEufemiaButton.directive('eufemiaButtonDirective', () => {
  return {
    controller: ($scope) => {
      $scope.text = 'Button'
      $scope.icon = Bell
      $scope.onClick = (event) => console.log('onClick', event)
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

## Example

Have a look at [this Angular 1 example app](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-angular-1).

## Screenshot

<Img src={AngularAppScreenshot} caption="Screenshot of Angular Example App" width="80%" />
