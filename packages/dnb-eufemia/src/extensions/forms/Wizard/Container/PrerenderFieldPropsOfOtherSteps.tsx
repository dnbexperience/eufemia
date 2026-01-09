import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import ReactDOM from 'react-dom'
import DataContext, {
  defaultContextState,
} from '../../DataContext/Context'
import type { WizardContextState } from '../Context/WizardContext'
import WizardContext from '../Context/WizardContext'
import useEventListener from '../../DataContext/Provider/useEventListener'

export function PrerenderFieldPropsOfOtherSteps({
  prerenderFieldPropsRef,
  stepsRef,
}: Pick<WizardContextState, 'prerenderFieldPropsRef' | 'stepsRef'>) {
  const { activeIndex } = useContext(WizardContext) || {}
  const { renderContent, hasRenderedRef } = usePrerenderState()

  // Prevent submit when there is an error in the other steps
  usePreventSubmit()

  return (
    <PrerenderPortal>
      <PrerenderFieldPropsProvider
        showAllErrorsNow={hasRenderedRef.current === null}
      >
        <iframe title="Wizard Prerender" hidden>
          {renderContent &&
            Object.values(prerenderFieldPropsRef.current).map(
              ({ index, fn: Fn }) => {
                if (activeIndex === index) {
                  return null
                }
                const step = stepsRef.current.get(index)
                if (step?.keepInDOM === true) {
                  return null
                }
                return <Fn key={index} />
              }
            )}
        </iframe>
      </PrerenderFieldPropsProvider>
    </PrerenderPortal>
  )
}

function usePrerenderState() {
  const [, forceUpdate] = useReducer(() => ({}), {})

  // Keep track whether to render the content or not
  let renderContent = true

  // Tracks the rendering state: false (initial), null (show content), true (hide content)
  const hasRenderedRef = useRef(false)

  const handleBeforeSubmit = useCallback(() => {
    // Ensure we render the content and also force a re-render so it actually gets rendered
    hasRenderedRef.current = null
    forceUpdate()
  }, [])
  useEventListener('onBeforeSubmit', handleBeforeSubmit)

  // Track state changes to handle re-rendering
  const state = hasRenderedRef.current
  useEffect(() => {
    // Ensure whe don't render the content after the content has been rendered
    if (hasRenderedRef.current === null) {
      hasRenderedRef.current = true
      forceUpdate()
    }
  }, [state])

  // Don't render the content
  if (hasRenderedRef.current) {
    renderContent = false
  }

  // Ensure we don't render the content again on the next render
  if (hasRenderedRef.current !== null) {
    hasRenderedRef.current = true
  }

  return {
    renderContent,
    hasRenderedRef,
  }
}

function useEffectPromise() {
  const promiseRef = useRef<Promise<void>>()
  const resolveRef = useRef<() => void>()

  const effectPromise = useCallback(() => {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve
    })

    return promiseRef.current
  }, [])

  useEffect(() => {
    // Delay the promise to allow the prerendered steps to be rendered
    if (resolveRef.current) {
      resolveRef.current?.()
      resolveRef.current = null
    }
  }) // No deps, because we want to run this effect always

  return effectPromise
}

function usePreventSubmit() {
  const { setFieldEventListener } = useContext(DataContext)
  const { hasInvalidStepsState } = useContext(WizardContext) || {}

  const effectPromise = useEffectPromise()
  const hasUnknownSteps = hasInvalidStepsState(undefined, ['unknown'])

  const handleSubmit = useCallback(
    async ({ preventSubmit }) => {
      // - Wait for the prerendered steps to be rendered
      if (hasUnknownSteps) {
        await effectPromise()
      }

      // - If there is a step with an error state, we need to prevent the submit
      if (hasInvalidStepsState(undefined, ['error'])) {
        return preventSubmit()
      }
    },
    [hasUnknownSteps, hasInvalidStepsState, effectPromise]
  )

  // Only add the listener when there is an unknown step state
  if (hasUnknownSteps) {
    setFieldEventListener?.(undefined, 'onSubmit', handleSubmit)
  }

  useEffect(() => {
    return () => {
      setFieldEventListener?.(undefined, 'onSubmit', handleSubmit, {
        remove: true,
      })
    }
  }, [handleSubmit, setFieldEventListener])
}

function PrerenderPortal({ children }) {
  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(children, document.body)
  }
}

function PrerenderFieldPropsProvider({ showAllErrorsNow, children }) {
  const dataContext = useContext(DataContext)

  const {
    data,
    internalDataRef,
    setFieldInternals,
    updateDataValue,
    showAllErrors,
  } = dataContext || {}

  // Run validation of all fields
  if (showAllErrorsNow) {
    return (
      <DataContext.Provider
        value={{
          ...dataContext,
          hasContext: true,
          prerenderFieldProps: true,
          showAllErrors: showAllErrorsNow ? true : showAllErrors,
        }}
      >
        {children}
      </DataContext.Provider>
    )
  }

  // Pre-render field props
  return (
    <DataContext.Provider
      value={{
        ...defaultContextState,
        hasContext: true,
        prerenderFieldProps: true,

        // Essential methods to pre-render field props
        data,
        internalDataRef,
        setFieldInternals,
        updateDataValue,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
