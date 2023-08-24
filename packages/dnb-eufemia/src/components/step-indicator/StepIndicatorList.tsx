/**
 * Web StepIndicator Component
 *
 */

import React, { useContext } from 'react'
import classnames from 'classnames'
import {
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

function StepIndicatorList() {
  const context = useContext(StepIndicatorContext)

  const {
    mode,
    filterAttributes,
    skeleton,
    data,
    countSteps,
    sidebar_id,
    ...rest
  } = context

  const params = {
    sidebar_id,
    className: classnames(
      'dnb-step-indicator',
      createSkeletonClass('font', skeleton),
      context.hasSidebar && createSpacingClasses(context),
      context.className
    ),
  }

  const listParams = {
    className: 'dnb-step-indicator__list',
  }

  const Element = mode === 'static' || !context.hasSidebar ? 'div' : 'nav'

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

  validateDOMAttributes(context, params)

  return (
    <Element {...params}>
      {countSteps > 0 && (
        <ol {...listParams}>
          {data.map((itemData, i) => {
            const item =
              typeof itemData === 'string' ? { title: itemData } : itemData

            return (
              <StepIndicatorItem key={i} currentItemNum={i} {...item} />
            )
          })}
        </ol>
      )}
    </Element>
  )
}

export default StepIndicatorList
