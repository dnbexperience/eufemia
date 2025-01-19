import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { Path, ValueProps } from '../types'
import useExternalValue from './useExternalValue'
import usePath from './usePath'
import DataContext from '../DataContext/Context'
import ValueProviderContext from '../Value/Provider/ValueProviderContext'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'

export type Props<Value> = ValueProps<Value>

export default function useValueProps<
  Value = unknown,
  Props extends ValueProps<Value> = ValueProps<Value>,
>(localProps: Props): Props & ValueProps<Value> {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const { extend } = useContext(ValueProviderContext)
  const props = extend(localProps)

  // Only to log a warning in the Value.SummaryList component
  const { verifyChild } = useContext(SummaryListContext) || {}
  verifyChild?.()

  const {
    path: pathProp,
    value: valueProp,
    itemPath,
    defaultValue,
    inheritVisibility,
    inheritLabel,
    transformIn = (external: unknown) => external as Value,
    toInput = (internal: Value) => internal,
    fromExternal = (external: Value) => external,
  } = props

  const transformers = useRef({
    transformIn,
    toInput,
    fromExternal,
  })

  const { path } = usePath({ path: pathProp, itemPath })

  const externalValue =
    useExternalValue<Value>({
      path,
      itemPath,
      value: valueProp,
      transformers,
    }) ?? defaultValue

  const {
    fieldInternalsRef,
    mountedFieldsRef,
    setValueInternals,
    setFieldEventListener,
  } = useContext(DataContext) || {}
  setValueInternals?.(path, props)

  useEffect(() => {
    if (inheritLabel || inheritVisibility) {
      setFieldEventListener?.(path, 'onMount', () => {
        // This is needed to make values, rendered before the field, to get the correct visibility state
        requestAnimationFrame(forceUpdate)
      })
    }
  }, [setFieldEventListener, path, inheritVisibility, inheritLabel])

  const shouldBeVisible = useCallback(
    (path: Path): boolean => {
      const item = mountedFieldsRef?.current?.[path]

      if (!item || !inheritVisibility) {
        return true
      }

      return (
        item.isVisible !== false &&
        (item.isPreMounted !== false || item.wasStepChange === true)
      )
    },
    [inheritVisibility, mountedFieldsRef]
  )

  const value = shouldBeVisible(path)
    ? transformIn(toInput(externalValue))
    : undefined

  const label =
    props.label ??
    (inheritLabel
      ? fieldInternalsRef?.current?.[path]?.props?.label
      : undefined)

  return { ...props, label, value }
}
