import React from 'react'
import { renderHook } from '@testing-library/react'
import useReportError from '../useReportError'
import { Context, ContextState } from '../../../DataContext'
import WizardContext from '../../../Wizard/Context'
import WizardStepContext from '../../../Wizard/Step/StepContext'

describe('useReportError', () => {
  it('should report error', () => {
    const setFieldErrorDataContext = jest.fn()
    const setFieldErrorWizard = jest.fn()
    const setMountedFieldState = jest.fn()

    const error = new Error('My error')
    const path = '/id-r0'

    const dataContextValue = {
      setFieldError: setFieldErrorDataContext,
      setMountedFieldState,
    } as unknown as ContextState
    const wizardContextValue = {
      setFieldError: setFieldErrorWizard,
    }
    const wizardStepContextValue = {
      index: 1,
    }

    const { rerender } = renderHook(useReportError, {
      initialProps: undefined,
      wrapper: ({ children }) => {
        return (
          <Context.Provider value={dataContextValue}>
            <WizardContext.Provider value={wizardContextValue}>
              <WizardStepContext.Provider value={wizardStepContextValue}>
                {children}
              </WizardStepContext.Provider>
            </WizardContext.Provider>
          </Context.Provider>
        )
      },
    })

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(1)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(1)
    expect(setMountedFieldState).toHaveBeenCalledTimes(0)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(
      path,
      undefined
    )
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(
      1,
      path,
      undefined
    )

    rerender(error)

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(3)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(3)
    expect(setMountedFieldState).toHaveBeenCalledTimes(2)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(path, error)
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(1, path, true)
    expect(setMountedFieldState).toHaveBeenLastCalledWith(path, {
      isMounted: true,
    })

    rerender(undefined)

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(5)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(5)
    expect(setMountedFieldState).toHaveBeenCalledTimes(3)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(
      path,
      undefined
    )
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(
      1,
      path,
      undefined
    )
    expect(setMountedFieldState).toHaveBeenLastCalledWith(path, {
      isMounted: false,
    })
  })

  it('should remove error when unmounted', () => {
    const setFieldErrorDataContext = jest.fn()
    const setFieldErrorWizard = jest.fn()
    const setMountedFieldState = jest.fn()

    const error = new Error('My error')
    const path = '/id-r1'

    const dataContextValue = {
      setFieldError: setFieldErrorDataContext,
      setMountedFieldState,
    } as unknown as ContextState
    const wizardContextValue = {
      setFieldError: setFieldErrorWizard,
    }
    const wizardStepContextValue = {
      index: 1,
    }

    const { unmount } = renderHook(useReportError, {
      initialProps: error,
      wrapper: ({ children }) => {
        return (
          <Context.Provider value={dataContextValue}>
            <WizardContext.Provider value={wizardContextValue}>
              <WizardStepContext.Provider value={wizardStepContextValue}>
                {children}
              </WizardStepContext.Provider>
            </WizardContext.Provider>
          </Context.Provider>
        )
      },
    })

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(1)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(1)
    expect(setMountedFieldState).toHaveBeenCalledTimes(1)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(path, error)
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(1, path, true)
    expect(setMountedFieldState).toHaveBeenLastCalledWith(path, {
      isMounted: true,
    })

    unmount()

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(2)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(2)
    expect(setMountedFieldState).toHaveBeenCalledTimes(2)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(
      path,
      undefined
    )
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(
      1,
      path,
      undefined
    )
    expect(setMountedFieldState).toHaveBeenLastCalledWith(path, {
      isMounted: false,
    })
  })

  it('should support dataContext given as the second argument', () => {
    const setFieldErrorDataContext = jest.fn()
    const setFieldErrorWizard = jest.fn()
    const setMountedFieldState = jest.fn()

    const error = new Error('My error')
    const path = '/id-r2'

    const dataContextValue = {
      setFieldError: setFieldErrorDataContext,
      setMountedFieldState,
    } as unknown as ContextState
    const wizardContextValue = {
      setFieldError: setFieldErrorWizard,
    }
    const wizardStepContextValue = {
      index: 1,
    }

    renderHook(() => useReportError(error, dataContextValue), {
      wrapper: ({ children }) => {
        return (
          <WizardContext.Provider value={wizardContextValue}>
            <WizardStepContext.Provider value={wizardStepContextValue}>
              {children}
            </WizardStepContext.Provider>
          </WizardContext.Provider>
        )
      },
    })

    expect(setFieldErrorDataContext).toHaveBeenCalledTimes(1)
    expect(setFieldErrorWizard).toHaveBeenCalledTimes(1)
    expect(setMountedFieldState).toHaveBeenCalledTimes(1)

    expect(setFieldErrorDataContext).toHaveBeenLastCalledWith(path, error)
    expect(setFieldErrorWizard).toHaveBeenLastCalledWith(1, path, true)
    expect(setMountedFieldState).toHaveBeenLastCalledWith(path, {
      isMounted: true,
    })
  })
})
