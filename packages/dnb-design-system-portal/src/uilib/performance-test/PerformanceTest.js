/**
 * Web Components Performance Tests
 *
 */

import React, { Component, Fragment } from 'react'
import ReactTestUtils from 'react-dom/test-utils' // ES6
import PropTypes from 'prop-types'

// UI Style
import 'dnb-ui-lib/src/style/patterns' // import ony patterns
import 'dnb-ui-lib/src/style' // import both all components and the defualt theme

// UI Components
import dnb, {
  Button,
  Input,
  IconWithAllIcons as Icon,
  Switch,
  FormLabel
} from 'dnb-ui-lib/src'

// Content
import text from 'raw-loader!./lipsum.txt'

export default class PerformanceTest extends Component {
  state = {
    isActive: false,
    countToRender: 20,
    testSpeed: 100,
    webComponentsEnabled: false
  }
  componentDidMount() {
    if (this.state.webComponentsEnabled) {
      dnb.enableWebComponents()
    }
  }
  toggleActiveState = () => {
    const isActive = !this.state.isActive
    if (isActive && this.state.webComponentsEnabled) {
      dnb.enableWebComponents()
    }
    this.setState({
      isActive
    })
  }
  switchMode = () => {
    const webComponentsEnabled = !this.state.webComponentsEnabled
    if (webComponentsEnabled) {
      dnb.enableWebComponents()
    }
    this.setState({
      webComponentsEnabled
    })
  }
  onNewTestSpeed = ({ value: testSpeed }) => {
    testSpeed = parseFloat(testSpeed)
    if (testSpeed < 100) testSpeed = 100
    this.setState({
      testSpeed
    })
  }
  onNewCountToRender = ({ value: countToRender }) => {
    this.setState({
      countToRender
    })
  }
  render() {
    this.components = []
    const params = {
      isActive: this.state.isActive,
      testSpeed: this.state.testSpeed,
      webComponentsEnabled: this.state.webComponentsEnabled
    }
    for (let i = 0, l = this.state.countToRender; i < l; ++i) {
      this.components.push(<ButtonTest key={'button' + i} {...params} />)
    }
    for (let i = 0, l = this.state.countToRender; i < l; ++i) {
      this.components.push(<InputTest key={'input' + i} {...params} />)
    }
    for (let i = 0, l = this.state.countToRender; i < l; ++i) {
      this.components.push(<IconTest key={'icon' + i} {...params} />)
    }
    return (
      <div>
        <h2>Performance Test of Web Components</h2>
        <div>
          <FormLabel for_id="is_active" text="Active" />{' '}
          <Switch
            id="is_active"
            on_change={this.toggleActiveState}
            checked={this.state.isActive}
          />
        </div>
        <br />
        <div>
          <FormLabel for_id="swith_mode" text="Web Components" />{' '}
          <Switch
            id="swith_mode"
            on_change={this.switchMode}
            checked={this.state.webComponentsEnabled}
          />
        </div>
        <br />
        <div>
          <FormLabel for_id="count_to_render" text="Components Count" />{' '}
          <Input
            id="count_to_render"
            on_change={this.onNewCountToRender}
            value={this.state.countToRender}
            is_numeric={true}
          />
        </div>
        <br />

        <div>
          <FormLabel for_id="test_speed" text="Change interval" />{' '}
          <Input
            id="test_speed"
            on_change={this.onNewTestSpeed}
            value={this.state.testSpeed}
            is_numeric={true}
          />
        </div>
        <br />
        <h1>Rendered Components</h1>
        {this.components}
        <p>{text}</p>
      </div>
    )
  }
}

// all the components we use are below

const ButtonWrap = React.forwardRef(
  ({ webComponentsEnabled, ...props }, ref) =>
    webComponentsEnabled ? (
      <dnb-button title="Title" {...props} ref={ref} />
    ) : (
      <Button title="Title" {...props} ref={ref} />
    )
)
class ButtonTest extends Component {
  state = {
    icon: 'question',
    text: 'Custom Element with icon',
    disabled: false
  }
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    testSpeed: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  getRef() {
    // react variant
    try {
      if (this._ref.current._ref.current)
        return this._ref.current._ref.current
    } catch (e) {
      null
    }

    // custom element variant
    try {
      if (this._ref.current._elementRef.current._ref.current)
        return this._ref.current._elementRef.current._ref.current
    } catch (e) {
      null
    }
  }
  componentDidMount() {
    this.updateComponents()
    this.startup()
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.testSpeed !== this.props.testSpeed) {
      this.startup(nextProps.testSpeed)
      return false
    }
    return true
  }
  startup(testSpeed) {
    clearTimeout(this.timeout)
    this.timeout = setInterval(
      () => this.updateComponents(),
      testSpeed || this.props.testSpeed + Math.random() * 500
    )
  }
  updateComponents() {
    if (!this.props.isActive) return
    const elem = this.getRef()
    if (elem) {
      ReactTestUtils.Simulate.click(elem)
      if (Math.random() > 0.5) {
        ReactTestUtils.Simulate.focus(elem)
      } else {
        ReactTestUtils.Simulate.blur(elem)
      }
      // ReactTestUtils.Simulate.mouseLeave(elem)
    }
    this.setState({
      text: String(Math.random() * 1000000),
      icon: listOfIcons[Math.floor(Math.random() * listOfIcons.length)],
      disabled: Math.random() > 0.5
    })
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  onClick = () => {
    // console.log('onClick')
  }
  render() {
    return (
      <Fragment>
        <ButtonWrap
          ref={this._ref}
          text={this.state.text}
          icon={this.state.icon}
          disabled={this.state.disabled}
          on_click={this.onClick}
          {...this.props}
        />
      </Fragment>
    )
  }
}

const InputWrap = React.forwardRef(
  ({ webComponentsEnabled, ...props }, ref) =>
    webComponentsEnabled ? (
      <dnb-input {...props} ref={ref} />
    ) : (
      <Input {...props} ref={ref} />
    )
)
class InputTest extends Component {
  state = {
    value: '0',
    placeholder: 'Write someting',
    disabled: false
  }
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    testSpeed: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  getRef() {
    // react variant
    try {
      if (this._ref.current._ref.current)
        return this._ref.current._ref.current
    } catch (e) {
      null
    }

    // custom element variant
    try {
      if (this._ref.current._elementRef.current._ref.current)
        return this._ref.current._elementRef.current._ref.current
    } catch (e) {
      null
    }
  }
  componentDidMount() {
    this.updateComponents()
    this.startup()
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.testSpeed !== this.props.testSpeed) {
      this.startup(nextProps.testSpeed)
      return false
    }
    return true
  }
  startup(testSpeed) {
    clearTimeout(this.timeout)
    this.timeout = setInterval(
      () => this.updateComponents(),
      testSpeed || this.props.testSpeed + Math.random() * 500
    )
  }
  updateComponents() {
    if (!this.props.isActive) return
    const elem = this.getRef()
    if (elem) {
      ReactTestUtils.Simulate[Math.random() > 0.5 ? 'focus' : 'blur'](elem)
      if (Math.random() > 0.5) {
        ReactTestUtils.Simulate.keyDown(elem, {
          key: 'Enter',
          keyCode: 13,
          which: 13
        })
      }
    }
    this.setState({
      placeholder: 'Write someting New',
      value: String(Math.random() * 1000000),
      disabled: Math.random() > 0.5
    })
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  onChange = () => {
    // console.log('onChange')
  }
  onFocus = () => {
    // console.log('onFocus')
  }
  onBlur = () => {
    // console.log('onBlur')
  }
  render() {
    return (
      <Fragment>
        <InputWrap
          ref={this._ref}
          value={this.state.value}
          placeholder={this.state.placeholder}
          disabled={this.state.disabled}
          on_change={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.props}
        />
      </Fragment>
    )
  }
}

const IconWrap = ({ webComponentsEnabled, ...props }) =>
  webComponentsEnabled ? (
    <dnb-icon-with-all-icons {...props} />
  ) : (
    <Icon {...props} />
  )
const listOfIcons = ['chevron-right', 'question', 'chevron-left']
IconWrap.propTypes = {
  webComponentsEnabled: PropTypes.bool.isRequired
}
class IconTest extends Component {
  state = {
    icon: 'chevron-right',
    size: 200
  }
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    testSpeed: PropTypes.number.isRequired
  }
  componentDidMount() {
    this.updateComponents()
    this.startup()
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.testSpeed !== this.props.testSpeed) {
      this.startup(nextProps.testSpeed)
      return false
    }
    return true
  }
  startup(testSpeed) {
    clearTimeout(this.timeout)
    this.timeout = setInterval(
      () => this.updateComponents(),
      testSpeed || this.props.testSpeed + Math.random() * 500
    )
  }
  updateComponents() {
    if (!this.props.isActive) return
    this.setState({
      icon: listOfIcons[Math.floor(Math.random() * listOfIcons.length)],
      size: 200
    })
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  render() {
    return (
      <Fragment>
        <IconWrap
          icon={this.state.icon}
          size={this.state.size}
          {...this.props}
        />
      </Fragment>
    )
  }
}
