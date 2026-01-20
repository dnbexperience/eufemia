/**
 * Web StepIndicator Component
 *
 */

import React, { useContext } from 'react'
import clsx from 'clsx'
import Space from '../space/Space'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import HeightAnimation from '../height-animation/HeightAnimation'
import StepIndicatorItem from './StepIndicatorItem'
import StepIndicatorContext from './StepIndicatorContext'

function StepIndicatorList() {
  const {
    mode,
    skeleton,
    openState,
    openHandler,
    closeHandler,
    countSteps,
    data,
    noAnimation,
  } = useContext(StepIndicatorContext)
  const Element = mode === 'static' ? 'div' : 'nav'

  const params = {}
  skeletonDOMAttributes(params, skeleton)
  return (
    <HeightAnimation
      animate={!noAnimation}
      open={openState}
      onOpen={(state) => {
        if (state) {
          openHandler()
        } else {
          closeHandler()
        }
      }}
    >
      <Space innerSpace={{ top: 'small' }}>
        <Element
          {...params}
          className={clsx(
            'dnb-step-indicator',
            createSkeletonClass('font', skeleton)
          )}
        >
          {countSteps > 0 && (
            <ol className="dnb-step-indicator__list">
              {data.map((itemData, i) => {
                const item =
                  typeof itemData === 'string'
                    ? { title: itemData }
                    : itemData

                return (
                  <StepIndicatorItem
                    key={i}
                    currentItemNum={i}
                    {...item}
                  />
                )
              })}
            </ol>
          )}
        </Element>
      </Space>
    </HeightAnimation>
  )
}

export default StepIndicatorList
