/**
 * Web StepIndicator Component
 *
 */

import { useContext } from 'react'
import { clsx } from 'clsx'
import Card from '../Card'
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
    open,
    openHandler,
    closeHandler,
    countSteps,
    data,
    noAnimation,
    outset,
  } = useContext(StepIndicatorContext)
  const Element = mode === 'static' ? 'div' : 'nav'

  const params = {}
  skeletonDOMAttributes(params, skeleton)
  return (
    <HeightAnimation
      animate={!noAnimation}
      open={open}
      onOpen={(state) => {
        if (state) {
          openHandler()
        } else {
          closeHandler()
        }
      }}
    >
      <Space innerSpace={{ top: 'x-small' }}>
        <Card
          className="dnb-step-indicator__card"
          backgroundColor="var(--step-indicator-trigger-content-background)"
          outset={outset}
          innerSpace="medium"
          responsive={false}
        >
          <Element
            {...params}
            className={clsx(createSkeletonClass('font', skeleton))}
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
        </Card>
      </Space>
    </HeightAnimation>
  )
}

export default StepIndicatorList
