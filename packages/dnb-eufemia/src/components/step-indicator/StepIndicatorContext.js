/**
 * Web StepIndicator Context
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import EventEmitter from '../../shared/EventEmitter'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'

// We use this array to filter out unwanted
const filterAttributes = Object.keys(stepIndicatorDefaultProps)
  .filter((item) => {
    return !['class', 'className'].includes(item)
  })
  .concat([
    'internalId',
    'hasSidebar',
    'hideSidebar',
    'mainTitle',
    'stepsLabel',
    'stepsLabelExtended',
    'listOfReachedSteps',
    'setActiveStep',
    'activeStep',
    'countSteps',
    'innerRef',
    'filterAttributes',
    'listAttributes',
    'onChangeState',
    'isV1', // deprecated
    'activeUrl', // deprecated
  ])

const StepIndicatorContext = React.createContext(null)

export default StepIndicatorContext

export class StepIndicatorProvider extends React.PureComponent {
  static propTypes = {
    sidebar_id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)

    this._eventEmitter = EventEmitter.createInstance(props.sidebar_id)

    this.state = this._eventEmitter.get()
  }

  componentDidMount() {
    this._eventEmitter.listen((state) => {
      this.setState(state)
    })
  }

  componentWillUnmount() {
    if (this._eventEmitter) {
      this._eventEmitter.remove()
      this._eventEmitter = null
    }
  }

  componentDidUpdate() {
    this._eventEmitter.update({
      ...this.props,
    })
  }

  render() {
    const value = {
      filterAttributes,
      ...this.props,
      ...this.state,
    }

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
