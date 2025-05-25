import { useContext, useEffect } from 'react'
import useId from '../../../../shared/helpers/useId'
import { ContextState } from '../../DataContext'
import DataContext from '../../DataContext/Context'
import WizardStepContext from '../../Wizard/Step/StepContext'
import WizardContext from '../../Wizard/Context'
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

  const { setFieldError: setFieldErrorDataContext, setMountedFieldState } =
    customDataContext || dataContext
  const { setFieldError: setFieldErrorWizard } = wizardContext || {}
  const { index: wizardIndex } = wizardStepContext || {}

  const id = useId()
  useEffect(() => {
    const path = joinPath(['internal', name, id])
    if (error) {
      setMountedFieldState?.(path, {
        isMounted: true,
      })
    }

    setFieldErrorWizard?.(wizardIndex, path, error ? true : undefined)
    setFieldErrorDataContext?.(path, error)

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
    id,
    joinPath,
    name,
    setFieldErrorDataContext,
    setFieldErrorWizard,
    setMountedFieldState,
    wizardIndex,
  ])
}
