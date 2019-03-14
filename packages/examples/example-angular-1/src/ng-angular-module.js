/**
 * To showcase the usage of the dnb-ui-lib in Angular
 *
 */

import angular from 'angular';
import ReactComponent from './ReactComponent.jsx';
import { react2angular } from 'react2angular';

import './App.css';
import { bell_medium as Bell } from 'dnb-ui-lib/icons';

const ngUIModule = angular.module('uiModule', []);

ngUIModule.component(
  'reactComponent', // is used by <react-component
  react2angular(ReactComponent, [
    'icon',
    'message',
    'onMessageChange',
    'onClick'
  ])
);

ngUIModule.directive('uiDirective', () => {
  return {
    controller: $scope => {
      $scope.icon = Bell;
      $scope.message = 'Input value';
      $scope.onReactMessageChange = ({ value: message }) => {
        $scope.message = message;
        $scope.$apply();
      };
      $scope.onReactClick = event => {
        console.log('onReactClick', event);
      };
    },
    template: /* @html */ `
<div>
  <div class="dnb-section dnb-section--spacing">
    <h1 class="dnb-h1">Angular v1.7.8</h1>
    <input type="text" ng-model="message" />
  </div>
  <hr class="dnb-hr"/>
  <div class="dnb-section dnb-section--spacing">
    <react-component
      icon="icon"
      message="message"
      on-message-change="onReactMessageChange"
      on-click="onReactClick" />
  </div>
</div>
`
  };
});
