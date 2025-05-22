import { useCallback, useContext } from 'react'
import { convertJsxToString } from '../../../../shared/component-helper'
import WizardContext from '../Context/WizardContext'
import { useTranslation } from '../../hooks'

export function useCollectStepsData() {
  const {
    activeIndexRef,
    hasErrorInOtherStepRef,
    stepsRef,
    hasInvalidStepsState,
  } = useContext(WizardContext) || {}

  const translations = useTranslation()

  const collectStepsData = useCallback(
    ({ id, index, inactive, title, keepInDOM }) => {
      if (!hasInvalidStepsState) {
        return // stop here
      }

      let status = undefined
      let statusState = undefined
      if (index !== activeIndexRef.current && !inactive) {
        // - Never show the unknown state
        if (hasInvalidStepsState(index, ['error'])) {
          // Show FormStatus inside the StepIndicator
          status = translations.Step.stepHasError
          statusState = 'error'
        }
      }

      if (status) {
        hasErrorInOtherStepRef.current = true
      }

      const stringifiedTitle =
        title !== undefined ? convertJsxToString(title) : 'Title missing'
      stepsRef.current.set(index, {
        index,
        id,
        title,
        stringifiedTitle,
        inactive,
        status,
        statusState,
        keepInDOM,
      })

      return { title }
    },
    [
      activeIndexRef,
      hasErrorInOtherStepRef,
      hasInvalidStepsState,
      stepsRef,
      translations.Step.stepHasError,
    ]
  )

  return { collectStepsData }
}
