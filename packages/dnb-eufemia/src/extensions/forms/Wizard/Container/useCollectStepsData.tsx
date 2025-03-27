import { useCallback, useContext } from 'react'
import { convertJsxToString } from '../../../../shared/component-helper'
import WizardContext from '../Context/WizardContext'
import { useTranslation } from '../../hooks'

export function useCollectStepsData() {
  const {
    activeIndexRef,
    hasErrorInOtherStepRef,
    stepsRef,
    writeStepsState,
    hasInvalidStepsState,
  } = useContext(WizardContext) || {}

  const translations = useTranslation()

  const collectStepsData = useCallback(
    ({ id, index, inactive, title }) => {
      if (!hasInvalidStepsState) {
        return // stop here
      }

      writeStepsState(index)

      const stringifiedTitle =
        title !== undefined ? convertJsxToString(title) : 'Title missing'

      let status = undefined
      let statusState = undefined
      if (index !== activeIndexRef.current) {
        if (hasInvalidStepsState(index, ['error'])) {
          status = translations.Step.stepHasError
          statusState = 'error'
        } else if (hasInvalidStepsState(index, ['unknown'])) {
          status = 'Unknown state'
          statusState = 'warn'
        }
      }

      if (status) {
        hasErrorInOtherStepRef.current = true
      }

      stepsRef.current.set(index, {
        index,
        id,
        title,
        stringifiedTitle,
        inactive,
        status,
        statusState,
      })

      return { title }
    },
    [
      activeIndexRef,
      hasErrorInOtherStepRef,
      hasInvalidStepsState,
      stepsRef,
      translations.Step.stepHasError,
      writeStepsState,
    ]
  )

  return { collectStepsData }
}
