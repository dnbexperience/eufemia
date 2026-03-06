import { useContext, useEffect } from 'react'
import useId from '../../../../shared/helpers/useId'
import type { ContextState } from '../../DataContext'
import DataContext from '../../DataContext/Context'
import WizardStepContext from '../../Wizard/Step/StepContext'
import WizardContext from '../../Wizard/Context'
import VisibilityContext from '../Visibility/VisibilityContext'
import { usePath } from '../../hooks'

export default function useReportError(
  error: Error,
  customDataContext?: ContextState,
  name?: string
) {
  const { joinPath } = usePath()
  const dataContext = useContext(DataContext)
  const wizardContext = useContext(WizardContext)
  const wizardStepContext = useContext(WizardStepContext)
  const visibilityContext = useContext(VisibilityContext)

  const {
    setFieldError: setFieldErrorDataContext,
    setMountedFieldState,
    prerenderFieldProps,
  } = customDataContext || dataContext
  const { setFieldError: setFieldErrorWizard } = wizardContext || {}
  const { index: wizardIndex } = wizardStepContext || {}
  const { isVisible } = visibilityContext || {}
  const handleFieldAsVisible = isVisible

  const id = useId()
  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here
    }

    const path = joinPath(['internal', name, id])
    const currentError = handleFieldAsVisible !== false ? error : undefined

    if (currentError) {
      setMountedFieldState?.(path, {
        isMounted: true,
      })
    }

    setFieldErrorWizard?.(
      wizardIndex,
      path,
      currentError ? true : undefined
    )

    setFieldErrorDataContext?.(path, currentError)

    // Unmount procedure
    return () => {
      setMountedFieldState?.(path, {
        isMounted: false,
      })

      setFieldErrorWizard?.(wizardIndex, path, undefined)
      setFieldErrorDataContext?.(path, undefined)
    }
  }, [
    error,
    handleFieldAsVisible,
    id,
    joinPath,
    name,
    prerenderFieldProps,
    setFieldErrorDataContext,
    setFieldErrorWizard,
    setMountedFieldState,
    wizardIndex,
  ])
}
