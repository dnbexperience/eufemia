/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  isTrue,
  combineLabelledBy,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import StepIndicatorItem from './StepIndicatorItem'
import StepIndicatorContext from './StepIndicatorContext'

export default class StepIndicatorList extends React.PureComponent {
  static contextType = StepIndicatorContext

  render() {
    const {
      mode,
      filterAttributes,
      skeleton,
      data,
      countSteps,
      sidebar_id,
      ...rest
    } = this.context

    const params = {
      sidebar_id,
      className: classnames(
        'dnb-step-indicator',
        createSkeletonClass('font', skeleton),
        this.context.hasSidebar && createSpacingClasses(this.context),
        this.context.className,
        this.context.class
      ),
    }

    const listParams = {
      className: 'dnb-step-indicator__list',
    }

    const Element =
      mode === 'static' ||
      !this.context.hasSidebar ||
      isTrue(this.context.use_navigation)
        ? 'div'
        : 'nav'

    const ariaLabelledbyValue = combineLabelledBy(rest, params.sidebar_id)

    if (Element === 'nav') {
      params['aria-labelledby'] = ariaLabelledbyValue
    } else {
      listParams['aria-labelledby'] = ariaLabelledbyValue
    }

    Object.keys(params).forEach((key) => {
      if (filterAttributes.includes(key)) {
        delete params[key]
      }
    })

    skeletonDOMAttributes(params, skeleton)

    validateDOMAttributes(this.context, params)

    return (
      <Element {...params}>
        {countSteps > 0 && (
          <ol {...listParams}>
            {data.map((itemData, i) => {
              if (typeof itemData === 'string') {
                itemData = { title: itemData }
              }

              return (
                <StepIndicatorItem
                  key={i}
                  currentItemNum={i}
                  {...itemData}
                />
              )
            })}
          </ol>
        )}
      </Element>
    )
  }
}
