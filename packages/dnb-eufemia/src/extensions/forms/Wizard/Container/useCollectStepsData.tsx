import { useCallback, useContext } from 'react'
import { convertJsxToString } from '../../../../shared/component-helper'
import WizardContext from '../Context/WizardContext'
import { useTranslation } from '../../hooks'

export function useCollectStepsData() {
  const {
    stepStatusRef,
    activeIndexRef,
    hasErrorInOtherStepRef,
    stepsRef,
  } = useContext(WizardContext) || {}

  const translations = useTranslation()

  const collectStepsData = useCallback(
    ({ id, index, inactive, titleProp }) => {
      if (!stepStatusRef) {
        return // stop here
      }

      const title =
        titleProp !== undefined
          ? convertJsxToString(titleProp)
          : 'Title missing'

      const state = stepStatusRef.current[index]
      const status =
        index !== activeIndexRef.current
          ? state === 'error'
            ? translations.Step.stepHasError
            : state === 'unknown'
            ? 'Unknown state'
            : undefined
          : undefined
      const statusState = state === 'error' ? 'error' : undefined // undefined shows 'warn' by default

      if (status) {
        hasErrorInOtherStepRef.current = true
      }

      stepsRef.current.set(String(index), {
        id,
        title,
        inactive,
        status,
        statusState,
      })

      return { title }
    },
    [
      activeIndexRef,
      hasErrorInOtherStepRef,
      stepStatusRef,
      stepsRef,
      translations.Step.stepHasError,
    ]
  )

  return { collectStepsData }
}
