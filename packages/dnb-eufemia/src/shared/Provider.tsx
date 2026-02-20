/**
 * Lib Provider
 *
 */

import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import Context, {
  prepareContext,
  ContextProps,
  InternalLocale,
} from './Context'
import { prepareFormElementContext } from './helpers/filterValidProps'
import { mergeTranslations } from './Translation'

export type ProviderProps = {
  /**
   * Send in an object that gets spread as properties to the Provider
   */
  value?: ContextProps

  /**
   * The content
   */
  children: React.ReactNode
} & ContextProps

export default function Provider<Props>(
  localProps: ProviderProps & Props
) {
  const nestedContext = useContext(Context)
  const [localContext, setLocalContext] = useState(null)

  // Destructure children out so we can track only the context-relevant props.
  const {
    children,
    ...restProps
  } = localProps

  // Memoize restProps with a shallow comparison so the useMemo below
  // only recomputes when an actual prop value changes — not on every
  // parent render that creates a new props object reference.
  const stableRestProps = useShallowMemo(restProps)

  const updateCurrent = useCallback((props: ContextProps) => {
    setLocalContext({ __context__: props })
  }, [])

  const setCurrentLocale = useCallback((locale: InternalLocale) => {
    setLocalContext({ __context__: { locale } })
  }, [])

  const update = useCallback(
    (props: ContextProps) => {
      nestedContext.update?.(props)
      setLocalContext({ __context__: props })
    },
    [nestedContext]
  )

  const setLocale = useCallback(
    (locale: InternalLocale) => {
      update({ locale })
    },
    [update]
  )

  const value = useMemo(() => {
    const preparedContext = {
      // Make copy to avoid extending the root context
      ...prepareContext(
        mergeContextWithProps(nestedContext, {
          ...localContext,
          ...stableRestProps,
        })
      ),
    }

    preparedContext.update = update
    preparedContext.setLocale = setLocale
    preparedContext.updateCurrent = updateCurrent
    preparedContext.setCurrentLocale = setCurrentLocale

    nestedContext.updateTranslation(
      preparedContext.locale,
      preparedContext.translations
    )

    return preparedContext
  }, [
    stableRestProps,
    nestedContext,
    localContext,
    update,
    setLocale,
    updateCurrent,
    setCurrentLocale,
  ])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

/**
 * Returns a memoized version of `obj` that only changes its reference
 * when one of its own (shallow) values actually changes.
 * This prevents unnecessary useMemo recomputations when a parent
 * creates a new props object on every render.
 */
function useShallowMemo<T extends Record<string, unknown>>(obj: T): T {
  const ref = useRef(obj)

  if (!shallowEqual(ref.current, obj)) {
    ref.current = obj
  }

  return ref.current
}

function shallowEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  if (a === b) {
    return true
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || a[key] !== b[key]) {
      return false
    }
  }

  return true
}

type MergeContextProps = {
  value: ProviderProps
}

function mergeContextWithProps<ContextT, PropsT>(
  nestedContext: ContextT & ContextProps,
  localProps: PropsT & MergeContextProps
) {
  // When value is given as so: <Provider value={{}} />
  const { value, ...rest } = localProps

  // Make sure we create a copy, because we add some custom methods to it
  const props = { ...value, ...rest }

  // Merge our new values with an existing context
  const mergedContext = { ...nestedContext, ...props }

  const nestedTranslations = nestedContext?.translations
  const localTranslations = props.translations

  if (nestedTranslations && localTranslations) {
    const mergedTranslations = mergeTranslations(
      nestedTranslations as Record<string, any>,
      localTranslations as Record<string, any>
    )
    mergedContext.translations = mergedTranslations
  }

  // Because we don't want to deep merge, we merge formElement additionally
  if (nestedContext?.formElement && props.formElement) {
    mergedContext.formElement = {
      ...nestedContext.formElement,
      ...props.formElement,
    }
    mergedContext.formElement = prepareFormElementContext(
      mergedContext.formElement
    )
  }

  return mergedContext
}
