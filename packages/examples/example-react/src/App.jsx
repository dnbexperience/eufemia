/**
 * To showcase the usage of the dnb-ui-lib in React
 *
 */

import React, { PureComponent, Fragment } from 'react';
import './App.css';

// different mothodes of importing the dnb-ui-lib
// import Icon from 'dnb-ui-lib/components/icon' // alternative method to import dnb-ui-lib
// import Button from 'dnb-ui-lib/components/Button' // alternative method to import dnb-ui-lib
// import dnb from 'dnb-ui-lib/components' // alternative method to import dnb-ui-lib
// import 'dnb-ui-lib/components/Button/style' // Import only the button styles
// import 'dnb-ui-lib/components/Icon/style' // Import only the icon styles
// import 'dnb-ui-lib/components' // in case we only use web component version

import dnb, { Button, Input, Icon } from 'dnb-ui-lib/components'; // optional, import "dnb-ui-lib/components/web-components" to enable Web Components
import { bell } from 'dnb-ui-lib/components/icon/lib';
import 'dnb-ui-lib/style'; // Import the global DNB stylesheet

// to enable Web Components, cause we use both react and Web Components in here

export default class App extends PureComponent {
  state = { showWebComponents: false };
  constructor(props) {
    super(props);
    this._buttonRef = React.createRef();
    this._inputRef = React.createRef();
  }
  handleClick = e => {
    console.log('handleClick', e);
  };
  handleValueChange = e => {
    console.log(
      'handleValueChange',
      e.value || (e.detail && e.detail.value) || ''
    );
  };
  handleWebComponentsVisibility() {
    this.setState({ showWebComponents: true });
    dnb.enableWebComponents();

    // there are different ways to enable usage of WebComponents
    // Button.enableWebComponents()
    // Icon.enableWebComponents()
    //
    // bind the imperative (not declarative) event handlers
    this._inputRef.current.addEvent('on_change', this.handleValueChange);
    this._buttonRef.current.addEvent('on_click', this.handleClick);
  }
  componentDidMount() {
    setTimeout(this.handleWebComponentsVisibility.bind(this), 100);
  }
  render() {
    return (
      <div>
        <h1>React Components</h1>
        <Input
          placeholder="Type someting ..."
          on_change={this.handleValueChange}
        />
        <Button
          text="Custom Element with icon"
          icon="chevron-right"
          on_click={this.handleClick}
        />
        <Icon icon={bell} width={80} />
        {this.state.showWebComponents && (
          <Fragment>
            <h1>Web Component in React</h1>
            <small>
              This is not for real world usage. But only to show the
              functionality of the dnb-ui-lib
            </small>
            <dnb-input
              ref={this._inputRef}
              placeholder="Type someting ..."
              on_change={e => {
                console.log('e', e);
              }}
            />
            <dnb-button
              ref={this._buttonRef}
              text="Custom Element with icon"
              icon="chevron-right"
              on_click={this.handleClick}
            />
            <dnb-icon icon="bell" size="80" />
          </Fragment>
        )}
      </div>
    );
  }
}
