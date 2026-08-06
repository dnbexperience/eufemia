/**
 * Web StepIndicator Component
 *
 */

import { useContext } from 'react'
import { clsx } from 'clsx'
import StepIndicatorContext from './StepIndicatorContext'
import { getStepIndicatorBulletType } from './StepIndicatorItem'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

function StepIndicatorProgressBar() {
  const { data, activeStep, skeleton } = useContext(StepIndicatorContext)

  if (!data || data.length === 0) {
    return null
  }

  return (
    <ol className="dnb-step-indicator__progress-bar" aria-hidden="true">
      {data.map((itemData, i) => {
        const isString = typeof itemData === 'string'
        const bulletType = getStepIndicatorBulletType({
          index: i,
          activeStep,
          status: isString ? undefined : itemData.status,
          statusState: isString ? undefined : itemData.statusState,
        })

        return (
          <li
            key={i}
            className={clsx(
              'dnb-step-indicator__progress-bar__segment',
              `dnb-step-indicator__progress-bar__segment--${bulletType}`,
              createSkeletonClass('shape', skeleton)
            )}
          />
        )
      })}
    </ol>
  )
}

export default StepIndicatorProgressBar
