/**
 * To showcase the usage of the dnb-ui-lib in Angular
 * This time we use the dnb-ui-lib Button directly
 */

import angular from 'angular';
import { react2angular } from 'react2angular';

// 1. Import the Button
import { Button } from 'dnb-ui-lib';
import { bell_medium as Bell } from 'dnb-ui-lib/icons';

const ngEufemiaButton = angular.module('eufemiaButton', []);

// 2. Bind the Button
ngEufemiaButton.component('eufemiaButton', react2angular(Button));

// 3. Use the Button
ngEufemiaButton.directive('eufemiaButtonDirective', () => {
  return {
    controller: $scope => {
      $scope.text = 'Button';
      $scope.icon = Bell;
      $scope.onClick = event => {
        console.log('onClick', event);
      };
    },
    template: /* @html */ `
  <eufemia-button
    text="text"
    icon="icon"
    on-click="onClick"
  ></eufemia-button>
`
  };
});
