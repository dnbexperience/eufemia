/**
 * Web StepIndicator Component
 *
 */

import { useContext } from 'react'
import { clsx } from 'clsx'
import StepIndicatorContext from './StepIndicatorContext'
import { getStepIndicatorBulletType } from './StepIndicatorItem'

function StepIndicatorProgressBar() {
  const { data, activeStep } = useContext(StepIndicatorContext)

  if (!data || data.length === 0) {
    return null
  }

  return (
    <ol className="dnb-step-indicator__progress-bar" aria-hidden="true">
      {data.map((itemData, i) => {
        const item =
          typeof itemData === 'string' ? { title: itemData } : itemData
        const bulletType = getStepIndicatorBulletType({
          index: i,
          activeStep,
          status: item.status,
          statusState: item.statusState,
        })

        return (
          <li
            key={i}
            className={clsx(
              'dnb-step-indicator__progress-bar__segment',
              `dnb-step-indicator__progress-bar__segment--${bulletType}`
            )}
          />
        )
      })}
    </ol>
  )
}

export default StepIndicatorProgressBar
