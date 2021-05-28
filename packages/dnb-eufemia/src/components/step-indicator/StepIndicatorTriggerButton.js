/**
 * Web StepIndicator Component
 *
 */

import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'
import fullscreen_medium from '../../icons/fullscreen_medium'
import {
  validateDOMAttributes,
  combineDescribedBy,
  AnimateHeight,
  isTrue,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import FormLabel from '../form-label/FormLabel'
import StepIndicatorContext from './StepIndicatorContext'
import { StepItemWrapper } from './StepIndicatorItem'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

export default class StepIndicatorTriggerButton extends React.PureComponent {
  static contextType = StepIndicatorContext

  static propTypes = {
    sidebar_id: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps = {
    sidebar_id: null,
    className: null,
  }

  constructor(props, context) {
    super(props)
    this._heightAnim = new AnimateHeight({
      animate: !isTrue(context.no_animation),
    })
    this._ref = React.createRef()
  }

  getSnapshotBeforeUpdate() {
    return this._heightAnim.getOpenHeight()
  }

  componentDidMount() {
    this._heightAnim.setElem(this._ref.current)
  }

  componentWillUnmount() {
    this._heightAnim.remove()
  }

  componentDidUpdate(a, b, height) {
    const toHeight = this._heightAnim.getOpenHeight()
    if (
      this._prevStep !== this.context.activeStep &&
      height !== toHeight
    ) {
      this._heightAnim.adjustTo(height, toHeight)
    }
    this._prevStep = this.context.activeStep
  }

  render() {
    const item = this.context.data[this.context.activeStep || 0]
    const label = this.context.stepsLabel

    const triggerParams = {
      ...this.context,
      sidebar_id: null,
      className: classnames(
        'dnb-step-indicator__trigger',
        this.context.hasSidebar &&
          !this.context.hideSidebar &&
          'dnb-sr-only',
        createSkeletonClass('font', this.context.skeleton),
        createSpacingClasses(this.context)
      ),
      'aria-live': 'polite',
    }

    const buttonParams = {
      ...this.props,
      className: classnames(
        'dnb-step-indicator__trigger__button',
        this.props.className
      ),
    }

    buttonParams['aria-describedby'] = combineDescribedBy(
      buttonParams,
      this.context.sidebar_id + '-overview'
    )

    Object.keys(triggerParams).forEach((key) => {
      if (this.context.filterAttributes.includes(key)) {
        delete triggerParams[key]
      }
    })

    skeletonDOMAttributes(triggerParams, this.context.skeleton)

    // also used for code markup simulation
    validateDOMAttributes(this.context, triggerParams)

    return (
      <div {...triggerParams}>
        <span
          className="dnb-sr-only"
          id={this.context.sidebar_id + '-overview'}
        >
          {this.context.overview_title}
        </span>
        <FormLabel
          aria-describedby={this.context.sidebar_id}
          for_id={this.context.sidebar_id}
          className="dnb-step-indicator__label"
        >
          {label}
        </FormLabel>
        <Button
          {...buttonParams}
          id={this.context.sidebar_id}
          wrap
          stretch
          variant="secondary"
          icon={fullscreen_medium}
          icon_size="medium"
          icon_position="right"
          inner_ref={this._ref}
        >
          <StepItemWrapper
            number={this.context.activeStep + 1}
            hide_numbers={this.context.hide_numbers}
          >
            {(typeof item === 'string' ? item : item && item.title) || ''}
          </StepItemWrapper>
        </Button>
      </div>
    )
  }
}
