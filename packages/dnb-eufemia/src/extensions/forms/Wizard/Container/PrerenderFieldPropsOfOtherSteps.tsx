import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import DataContext, {
  defaultContextState,
} from '../../DataContext/Context'
import type { WizardContextState } from '../Context/WizardContext'
import WizardContext from '../Context/WizardContext'
import useEventListener from '../../DataContext/Provider/useEventListener'

type PrerenderProps = Pick<
  WizardContextState,
  'prerenderFieldPropsRef' | 'stepsRef'
>

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function PrerenderFieldPropsOfOtherSteps(props: PrerenderProps) {
  // The portal has no server markup, so it may only mount after hydration
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!isClient) {
    return null
  }

  return <PrerenderSteps {...props} />
}

function PrerenderSteps({
  prerenderFieldPropsRef,
  stepsRef,
}: PrerenderProps) {
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
    // Ensure we don't render the content after the content has been rendered
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
  const promiseRef = useRef<Promise<void> | undefined>(undefined)
  const resolveRef = useRef<(() => void) | null>(null)

  // Create the promise before the render it waits for is requested,
  // so that render's effect is guaranteed to resolve it
  const createEffectPromise = useCallback(() => {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve
    })
  }, [])

  const getEffectPromise = useCallback(() => promiseRef.current, [])

  useEffect(() => {
    // Delay the promise to allow the prerendered steps to be rendered
    if (resolveRef.current) {
      resolveRef.current?.()
      resolveRef.current = null
    }
  }) // No deps, because we want to run this effect always

  return { createEffectPromise, getEffectPromise }
}

function usePreventSubmit() {
  const { setFieldEventListener } = useContext(DataContext)
  const { hasInvalidStepsState } = useContext(WizardContext) || {}

  const { createEffectPromise, getEffectPromise } = useEffectPromise()

  // The submit always re-renders the form after onBeforeSubmit, and the
  // effect of that render resolves the promise
  useEventListener('onBeforeSubmit', createEffectPromise)

  const hasUnknownSteps = hasInvalidStepsState(undefined, ['unknown'])

  const handleSubmit = useCallback(
    async ({ preventSubmit }) => {
      // - Wait for the prerendered steps to be rendered
      if (hasUnknownSteps) {
        await getEffectPromise()
      }

      // - If there is a step with an error state, we need to prevent the submit
      if (hasInvalidStepsState(undefined, ['error'])) {
        return preventSubmit()
      }
    },
    [hasUnknownSteps, hasInvalidStepsState, getEffectPromise]
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

function PrerenderPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body)
}

function PrerenderFieldPropsProvider({ showAllErrorsNow, children }) {
  const dataContext = useContext(DataContext)

  const { data, internalDataRef, setFieldInternals, updateDataValue } =
    dataContext || {}

  // Run validation of all fields
  if (showAllErrorsNow) {
    return (
      <DataContext
        value={{
          ...dataContext,
          hasContext: true,
          prerenderFieldProps: true,
          showAllErrors: true,
        }}
      >
        {children}
      </DataContext>
    )
  }

  // Pre-render field props
  return (
    <DataContext
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
    </DataContext>
  )
}
