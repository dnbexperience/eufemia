/**
 * To showcase the usage of the dnb-ui-lib in Angular
 *
 */

import React from 'react' // only used in here because of the usage of <Bell />
import angular from 'angular'
import ReactComponent from './ReactComponent.jsx'
import { react2angular } from 'react2angular'

import { bell_medium as Bell } from 'dnb-ui-lib/icons'
import { Icon } from 'dnb-ui-lib'

const ngUIModule = angular.module('uiModule', [])

ngUIModule.component(
  'reactComponent', // is used by <react-component
  react2angular(ReactComponent /* bindingNames, injectNames */)
  /*
    NB: bindingNames -> If you defined propTypes on your component, they will be used to compute component's bindings, and you can omit the 2nd argument:
    [
      'icon',
      'message',
      'onMessageChange',
      'onClick'
    ]
    NB: bindingNames -> Read more about the usage of injectNames
    https://github.com/coatue-oss/react2angular#dependency-injection
   */
)

ngUIModule.directive('uiDirective', () => {
  return {
    controller: $scope => {
      $scope.icon = Bell
      /** To show the flexibility */
      $scope.iconJsx = () => (
        <Icon icon={<Bell color="#e10076" />} size="medium" />
      )
      $scope.message = 'Input value'
      $scope.onReactMessageChange = ({ value: message }) => {
        $scope.message = message
        $scope.$apply()
        console.log('onReactMessageChange', message)
      }
      $scope.onReactClick = event => {
        console.log('onReactClick', event)
      }
    },
    template: /* @html */ `
<div>
  <div class="dnb-section dnb-section--spacing">
    <h2 class="dnb-h2">Angular v1.7.8</h2>
    <p class="dnb-p">(no Eufemia CSS Styles)</p>
    <input type="text" ng-model="message" />
  </div>
  <br />
  <div class="dnb-core-style dnb-spacing dnb-section dnb-section--spacing">
    <react-component
      icon="icon"
      icon-jsx="iconJsx"
      message="message"
      on-message-change="onReactMessageChange"
      on-click="onReactClick"
    ></react-component>
    <p class="dnb-p">Eufemia CSS Styles 👌</p>
    <div eufemia-button-directive></div>
  </div>
</div>
`
  }
})
