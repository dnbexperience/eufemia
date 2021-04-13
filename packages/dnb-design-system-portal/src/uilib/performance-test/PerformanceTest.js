/**
 * Web Components Performance Tests
 *
 */

import React from 'react'
import ReactTestUtils from 'react-dom/test-utils' // ES6
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// UI Components
import {
  enableWebComponents,
  Button,
  Input,
  IconPrimary as Icon,
  Switch,
  FormLabel
} from '@dnb/eufemia/src/components/lib'
import { H2, P, Hr } from '@dnb/eufemia/src/elements'

// Content
import text from 'raw-loader!./lipsum.txt'

const FormRow = styled.div`
  margin-bottom: 1.5rem;
`

export default class PerformanceTest extends React.Component {
  state = {
    isActive: false,
    countToRender: 20,
    testSpeed: 100,
    webComponentsEnabled: false
  }
  componentDidMount() {
    if (this.state.webComponentsEnabled) {
      enableWebComponents()
    }
  }
  toggleActiveState = () => {
    const isActive = !this.state.isActive
    if (isActive && this.state.webComponentsEnabled) {
      enableWebComponents()
    }
    this.setState({
      isActive
    })
  }
  switchMode = () => {
    const webComponentsEnabled = !this.state.webComponentsEnabled
    if (webComponentsEnabled) {
      enableWebComponents()
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
      <>
        <div className="dnb-section dnb-section--spacing dnb-section--white">
          <H2>Change testing conditions</H2>

          <FormRow>
            <FormLabel for_id="is_active" text="Active" />{' '}
            <Switch
              id="is_active"
              on_change={this.toggleActiveState}
              checked={this.state.isActive}
            />
          </FormRow>

          <FormRow>
            <FormLabel for_id="switch_mode" text="Web Components" />{' '}
            <Switch
              id="switch_mode"
              on_change={this.switchMode}
              checked={this.state.webComponentsEnabled}
            />
          </FormRow>

          <FormRow>
            <FormLabel for_id="count_to_render" text="Components Count" />{' '}
            <Input
              id="count_to_render"
              on_change={this.onNewCountToRender}
              value={this.state.countToRender}
              is_numeric={true}
            />
          </FormRow>

          <FormRow>
            <FormLabel for_id="test_speed" text="Change interval" />{' '}
            <Input
              id="test_speed"
              on_change={this.onNewTestSpeed}
              value={this.state.testSpeed}
              is_numeric={true}
            />
          </FormRow>
        </div>
        <br />
        <H2>Rendered Components</H2>
        <Hr />
        {this.components}
        <P>{text}</P>
      </>
    )
  }
}

// all the components we use are below

const ButtonWrap = React.forwardRef(
  (
    {
      webComponentsEnabled,
      isActive /* eslint-disable-line */,
      testSpeed /* eslint-disable-line */,
      ...props
    },
    ref
  ) =>
    webComponentsEnabled ? (
      <dnb-button title="Title" {...props} ref={ref} />
    ) : (
      <Button title="Title" {...props} ref={ref} />
    )
)
class ButtonTest extends React.Component {
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
      <React.Fragment>
        <ButtonWrap
          ref={this._ref}
          text={this.state.text}
          icon={this.state.icon}
          disabled={this.state.disabled}
          on_click={this.onClick}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

const InputWrap = React.forwardRef(
  (
    {
      webComponentsEnabled,
      isActive /* eslint-disable-line */,
      testSpeed /* eslint-disable-line */,
      ...props
    },
    ref
  ) =>
    webComponentsEnabled ? (
      <dnb-input {...props} ref={ref} />
    ) : (
      <Input {...props} ref={ref} />
    )
)
class InputTest extends React.Component {
  state = {
    value: '0',
    placeholder: 'Write something',
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
      placeholder: 'Write something New',
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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

const IconWrap = ({
  webComponentsEnabled,
  isActive /* eslint-disable-line */,
  testSpeed /* eslint-disable-line */,
  ...props
}) =>
  webComponentsEnabled ? (
    <dnb-icon-primary {...props} />
  ) : (
    <Icon {...props} />
  )
const listOfIcons = ['chevron-right', 'question', 'chevron-left']
IconWrap.propTypes = {
  webComponentsEnabled: PropTypes.bool.isRequired
}
class IconTest extends React.Component {
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
      <React.Fragment>
        <IconWrap
          icon={this.state.icon}
          size={this.state.size}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}
