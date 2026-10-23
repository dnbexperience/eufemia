import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  ComponentType,
  ComponentProps,
  PropsWithChildren,
} from 'react'
import {
  LiveContext,
  generateElement,
  renderElementAsync,
} from 'react-live'
import type { LiveProvider as UpstreamLiveProvider } from 'react-live'

type ProviderState = {
  element?: ComponentType | null
  error?: string
  newCode?: string
}

type TransformResult = string | PromiseLike<string>

type PendingTransform =
  | { status: 'fulfilled'; value: string }
  | { status: 'rejected'; reason: unknown }

type InitialPreview = {
  state: ProviderState
  subscribe?: (onState: (state: ProviderState) => void) => () => void
  pending?: Promise<PendingTransform>
  code?: string
  options?: TranspileOptions
}

export type LiveProviderProps = Omit<
  ComponentProps<typeof UpstreamLiveProvider>,
  'transformCode'
> & {
  ssr?: boolean
  transformCode?(code: string): TransformResult
}

type TranspileOptions = Pick<
  LiveProviderProps,
  'enableTypeScript' | 'noInline' | 'scope' | 'transformCode'
>

const DEFAULT_STATE: ProviderState = {
  error: undefined,
  element: undefined,
}

const EMPTY_PREVIEW: InitialPreview = { state: DEFAULT_STATE }

const isPromiseLike = (
  value: TransformResult
): value is PromiseLike<string> => {
  return typeof (value as PromiseLike<string>)?.then === 'function'
}

const getErrorState = (error: unknown): ProviderState => ({
  error: String(error),
  element: undefined,
})

const evaluateCode = (
  newCode: string,
  transformedCode: string,
  options: TranspileOptions,
  onState: (state: ProviderState) => void,
  onError: (error: Error) => void
) => {
  if (typeof transformedCode !== 'string') {
    throw new Error('Code failed to transform')
  }

  const input = {
    code: transformedCode,
    scope: options.scope,
    enableTypeScript: options.enableTypeScript ?? true,
  }
  const onElement = (element: ComponentType) =>
    onState({ error: undefined, element, newCode })

  if (options.noInline) {
    onState({
      error: undefined,
      element: null,
      newCode,
    })
    renderElementAsync(input, onElement, onError)
  } else {
    onElement(generateElement(input, onError))
  }
}

const getInitialPreview = (
  code: string,
  options: TranspileOptions
): InitialPreview => {
  try {
    const transformResult = options.transformCode
      ? options.transformCode(code)
      : code

    if (isPromiseLike(transformResult)) {
      return {
        state: DEFAULT_STATE,
        code,
        options,
        pending: Promise.resolve(transformResult).then<
          PendingTransform,
          PendingTransform
        >(
          (value) => ({ status: 'fulfilled', value }),
          (reason) => ({ status: 'rejected', reason })
        ),
      }
    }

    let state = DEFAULT_STATE
    let receiver: ((state: ProviderState) => void) | undefined
    const emit = (nextState: ProviderState) => {
      state = nextState
      receiver?.(nextState)
    }
    evaluateCode(code, transformResult, options, emit, (error) =>
      emit(getErrorState(error))
    )
    const initialState = state
    return {
      state: initialState,
      code,
      options,
      subscribe: (onState) => {
        receiver = onState
        // Delayed callbacks may finish before hydration's effect starts.
        if (state !== initialState) {
          onState(state)
        }
        return () => {
          receiver = undefined
        }
      },
    }
  } catch (error) {
    return { state: getErrorState(error as Error), code, options }
  }
}

export function LiveProvider({
  children,
  code = '',
  language = 'tsx',
  theme,
  enableTypeScript = true,
  disabled = false,
  scope,
  ssr = false,
  transformCode,
  noInline = false,
}: PropsWithChildren<LiveProviderProps>) {
  const options: TranspileOptions = useMemo(
    () => ({ enableTypeScript, noInline, scope, transformCode }),
    [enableTypeScript, noInline, scope, transformCode]
  )

  const [state, setState] = useState<ProviderState>(DEFAULT_STATE)
  const onError = useCallback(
    (error: Error) => setState(getErrorState(error)),
    []
  )
  const [initialPreview] = useState<InitialPreview>(() =>
    ssr ? getInitialPreview(code, options) : EMPTY_PREVIEW
  )
  const reusableInitialPreview = useRef(initialPreview)
  const latestTranspileId = useRef(0)

  const resolvedState =
    state === DEFAULT_STATE ? initialPreview.state : state

  const transpileAsync = useCallback(
    async (newCode: string, pending?: Promise<PendingTransform>) => {
      const transpileId = ++latestTranspileId.current

      try {
        const result = pending ? await pending : undefined
        if (result?.status === 'rejected') {
          throw result.reason
        }
        const transformedCode =
          result?.status === 'fulfilled'
            ? result.value
            : await Promise.resolve(
                transformCode ? transformCode(newCode) : newCode
              )

        if (transpileId !== latestTranspileId.current) {
          return
        }

        evaluateCode(
          newCode,
          transformedCode,
          options,
          (nextState) => {
            if (transpileId === latestTranspileId.current) {
              setState(nextState)
            }
          },
          (error) => {
            if (transpileId === latestTranspileId.current) {
              onError(error)
            }
          }
        )
      } catch (error) {
        if (transpileId === latestTranspileId.current) {
          onError(error as Error)
        }
      }
    },
    [onError, options, transformCode]
  )

  useEffect(() => {
    const canReuseInitialPreview =
      reusableInitialPreview.current === initialPreview &&
      initialPreview.code === code &&
      initialPreview.options === options
    if (!canReuseInitialPreview) {
      reusableInitialPreview.current = EMPTY_PREVIEW
    }
    const transpileId = ++latestTranspileId.current
    const unsubscribe = canReuseInitialPreview
      ? initialPreview.subscribe?.((nextState) => {
          if (transpileId === latestTranspileId.current) {
            setState(nextState)
          }
        })
      : undefined
    // Keep the snapshot and its callbacks through StrictMode effect replay.
    if (!canReuseInitialPreview || initialPreview.pending) {
      void transpileAsync(
        code,
        canReuseInitialPreview ? initialPreview.pending : undefined
      )
    }
    return () => {
      unsubscribe?.()
      latestTranspileId.current += 1
    }
  }, [code, initialPreview, options, transpileAsync])

  const onChange = useCallback(
    (newCode: string) => {
      reusableInitialPreview.current = EMPTY_PREVIEW
      void transpileAsync(newCode)
    },
    [transpileAsync]
  )

  const value = useMemo(
    () => ({
      ...resolvedState,
      code,
      language,
      theme,
      disabled,
      onError,
      onChange,
    }),
    [code, disabled, language, onChange, onError, resolvedState, theme]
  )

  return (
    <LiveContext.Provider value={value}>{children}</LiveContext.Provider>
  )
}
