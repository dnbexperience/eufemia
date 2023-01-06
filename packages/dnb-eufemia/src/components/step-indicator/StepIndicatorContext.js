/**
 * Web StepIndicator Context
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import {
  processChildren,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import { includeValidProps } from '../form-row/FormRowHelpers'
import { onMediaQueryChange } from '../../shared/MediaQueryUtils'

// We use this array to filter out unwanted
const filterAttributes = Object.keys(stepIndicatorDefaultProps)
  .filter((item) => {
    return !['class', 'className'].includes(item)
  })
  .concat([
    'internalId',
    'isSidebar',
    'hasSidebar',
    'hideSidebar',
    'sidebarIsVisible',
    'mainTitle',
    'stepsLabel',
    'stepsLabelExtended',
    'listOfReachedSteps',
    'setActiveStep',
    'activeStep',
    'countSteps',
    'openState',
    'onChangeState',
    'openHandler',
    'closeHandler',
    'innerRef',
    'hasSkeletonData',
    'filterAttributes',
    'onChangeState',
  ])

const StepIndicatorContext = React.createContext(null)

export default StepIndicatorContext

export class StepIndicatorProvider extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    sidebar_id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isSidebar: PropTypes.bool,
  }

  static defaultProps = {
    isSidebar: false,
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      state.data = StepIndicatorProvider.getData(props)
    }
    state.countSteps = state.data?.length

    if (
      parseFloat(props.current_step) > -1 &&
      props.current_step !== state._current_step
    ) {
      state.activeStep = parseFloat(props.current_step) || 0
    }

    if (!state.listOfReachedSteps.includes(state.activeStep)) {
      state.listOfReachedSteps.push(state.activeStep)
    }

    state.stepsLabel = state.step_title
      ?.replace('%step', (state.activeStep || 0) + 1)
      .replace('%count', state.data?.length || 1)
    state.stepsLabelExtended = state.step_title_extended
      ?.replace('%step', (state.activeStep || 0) + 1)
      .replace('%count', state.data?.length || 1)

    state._current_step = props.current_step

    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      hasSidebar: true,
      hideSidebar: false,
      activeStep: undefined,
      setActiveStep: this.setActiveStep,
      onChangeState: this.onChangeState,
      openHandler: this.openHandler,
      closeHandler: this.closeHandler,
    }

    if (!this.state.listOfReachedSteps) {
      this.state.listOfReachedSteps = []
    }
  }

  componentDidMount() {
    this._isMounted = true

    this._mediaQueryListener = onMediaQueryChange(
      {
        min: '0',
        max: 'medium',
      },
      (hideSidebar) => {
        this.setState({
          hideSidebar,
        })
      },
      { runOnInit: true }
    )

    const container = document?.getElementById(
      'sidebar__' + this.props.sidebar_id
    )
    this.setState({
      hasSidebar: Boolean(container),
    })
  }

  componentWillUnmount() {
    if (this._mediaQueryListener) {
      this._mediaQueryListener()
    }
  }

  componentDidUpdate() {
    this.setState(this.makeContextValue())
  }

  setActiveStep = (activeStep) => {
    this.setState({ activeStep })
  }

  onChangeState = () => {
    this.setState({ openState: false })
  }

  openHandler = () => {
    this.setState({ openState: true })
  }

  closeHandler = () => {
    this.setState({ openState: false })
  }

  getGlobalContext(context = this.context) {
    // use only the props from context, who are available here anyway
    const data = extendPropsWithContextInClassComponent(
      this.props,
      stepIndicatorDefaultProps,
      { skeleton: context?.skeleton },
      context.getTranslation(context).StepIndicator,
      includeValidProps(context.FormRow),
      context.StepIndicator
    )

    return data
  }

  makeContextValue({
    state = { ...this.state },
    props = this.props,
    context = this.context,
  } = {}) {
    const globalContext = this.getGlobalContext(context)

    const value = extendSafe(
      { filterAttributes },
      globalContext,
      {
        defaultProps: stepIndicatorDefaultProps,
        props,
      },
      state
    )

    value.sidebarIsVisible = value.hasSidebar && !value.hideSidebar

    return value
  }

  render() {
    const value = this.makeContextValue()

    if (typeof window !== 'undefined' && window.IS_TEST) {
      value.no_animation = true
    }

    // Filter out unwanted HTML attributes
    Object.keys(value).forEach((key) => {
      if (key.startsWith('_')) {
        delete value[key]
      }
    })

    return (
      <StepIndicatorContext.Provider value={value}>
        {this.props.children}
      </StepIndicatorContext.Provider>
    )
  }
}

/**
 * Like "Object.assign" – but safe
 * A new falsy value will not be used, if it exists already
 * Also,
 *
 * @param  {...object} objects
 * @returns object
 */
function extendSafe(...objects) {
  const obj = {}

  objects.forEach((itm) => {
    if (itm.defaultProps && itm.props) {
      itm = Object.entries(itm.props).reduce((acc, [k, v]) => {
        if (itm.defaultProps[k] !== v) {
          acc[k] = v
        }
        return acc
      }, {})
    }

    Object.entries(itm).forEach(([k, v]) => {
      if (!obj[k] || (obj[k] && v)) {
        obj[k] = v
      }
    })
  })

  return obj
}
