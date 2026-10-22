/**
 * Lib Provider
 *
 */

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { ContextProps, InternalLocale } from './Context'
import Context, { prepareContext } from './Context'
import { LOCALE } from './defaults'
import { prepareFormElementContext } from './helpers/filterValidProps'
import { mergeTranslations } from './Translation'
import { warn } from './component-helper'
import useIsomorphicLayoutEffect from './helpers/useIsomorphicLayoutEffect'

export type ProviderProps = {
  /**
   * Send in an object that gets spread as properties to the Provider
   */
  value?: ContextProps

  /**
   * The content
   */
  children: ReactNode
} & ContextProps

export default function Provider<Props>(
  localProps: ProviderProps & Props
) {
  const nestedContext = useContext(Context)
  const [localContext, setLocalContext] = useState(null)

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

  const { translationsLoader, translations: propTranslations } = localProps

  const propTranslationsRef = useRef(propTranslations)
  propTranslationsRef.current = propTranslations

  const translationsLoaderRef = useRef(translationsLoader)
  translationsLoaderRef.current = translationsLoader

  const effectiveLocale =
    localContext?.__context__?.locale ||
    localProps.locale ||
    nestedContext.locale ||
    LOCALE

  useEffect(() => {
    const loader = translationsLoaderRef.current
    if (!loader) {
      return undefined // stop here
    }

    let cancelled = false

    loader(effectiveLocale)
      .then((loaded) => {
        if (!cancelled && loaded) {
          const base = propTranslationsRef.current || {}
          const merged = mergeTranslations(
            base as Record<string, unknown>,
            loaded as Record<string, unknown>
          )

          setLocalContext((prev) => ({
            __context__: {
              ...prev?.__context__,
              translations: merged,
            },
          }))
        }
      })
      .catch((error) => {
        if (!cancelled) {
          warn('Provider: translationsLoader failed:', error)
        }
      })

    return () => {
      cancelled = true
    }
  }, [effectiveLocale])

  const value = useMemo(() => {
    const { children, ...rest } = localProps

    const preparedContext = {
      // Make copy to avoid extending the root context
      ...prepareContext(
        mergeContextWithProps(nestedContext, {
          ...localContext,
          ...rest,
        })
      ),
    }

    preparedContext.update = update
    preparedContext.setLocale = setLocale
    preparedContext.updateCurrent = updateCurrent
    preparedContext.setCurrentLocale = setCurrentLocale

    return preparedContext
  }, [
    localProps,
    nestedContext,
    localContext,
    update,
    setLocale,
    updateCurrent,
    setCurrentLocale,
  ])

  const [containerTarget, setContainerTarget] = useState<HTMLElement>(null)
  const syncContainerTarget = () => {
    const target =
      value.responsive?.target === 'container'
        ? value.responsive.containerRef.current
        : null
    if (target !== containerTarget) {
      setContainerTarget(target)
    }
  }
  // Finds a container rendered inside this Provider before paint.
  useIsomorphicLayoutEffect(syncContainerTarget)
  // A container that wraps this Provider gets its ref only after the
  // layout effects inside it have run, so check again after the commit.
  useEffect(syncContainerTarget)
  // A ref can change during commit without changing its own identity.
  const responsive = useMemo(
    () =>
      value.responsive?.target === 'container'
        ? { ...value.responsive }
        : value.responsive,
    [value.responsive, containerTarget]
  )
  const contextValue = useMemo(
    () =>
      responsive === value.responsive ? value : { ...value, responsive },
    [value, responsive]
  )

  return <Context value={contextValue}>{localProps.children}</Context>
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
