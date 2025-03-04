import React, { useCallback, useContext, useMemo, useRef } from 'react'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps, Path } from '../../types'
import { getFormattedNumber } from '../../../../components/slider/SliderHelpers'
import Slider, { SliderProps } from '../../../../components/Slider'
import { pickSpacingProps } from '../../../../components/flex/utils'
import DataContext, { ContextState } from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import { useTranslation as useSharedTranslation } from '../../../../shared'

export type SliderVisibilityEvent = React.MouseEvent<HTMLButtonElement> & {
  value: string
}

export type SliderValue = number | Array<number>
export type Props = FieldProps<SliderValue> & {
  /**
   * Define an array with JSON Pointers for multiple thumb buttons.
   */
  paths?: Array<Path>
  step?: SliderProps['step'] | Path
  min?: SliderProps['min'] | Path
  max?: SliderProps['max'] | Path
  vertical?: SliderProps['vertical']
  reverse?: SliderProps['reverse']
  hideButtons?: SliderProps['hideButtons']
  multiThumbBehavior?: SliderProps['multiThumbBehavior']
  thumbTitle?: SliderProps['thumbTitle']
  subtractTitle?: SliderProps['subtractTitle']
  addTitle?: SliderProps['addTitle']
  numberFormat?: SliderProps['numberFormat']
  tooltip?: SliderProps['tooltip']
  alwaysShowTooltip?: SliderProps['alwaysShowTooltip']
  extensions?: SliderProps['extensions']

  /** Styling */
  width?: FieldBlockWidth
}

function SliderComponent(props: Props) {
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)
  const {
    Slider: { addTitle: addTitleLabel, subtractTitle: subtractTitleLabel },
  } = useSharedTranslation()

  const { getSourceValue } = useDataValue()
  const getValues = useCallback(
    (source: SliderValue | Path | Array<Path>) => {
      if (Array.isArray(source)) {
        return source.map((s) => getSourceValue(s) || 0)
      }

      return getSourceValue(source) || 0
    },
    [getSourceValue]
  )

  const value = getValues(
    props.paths ?? props.path ?? props.value ?? props.defaultValue
  )
  const preparedProps = {
    ...props,
    step: getSourceValue(props.step),
    min: getSourceValue(props.min),
    max: getSourceValue(props.max),
  }

  const {
    id,
    path,
    itemPath,
    step = 1,
    min = 0,
    max = 100,
    width = 'stretch',
    hasError,
    disabled,
    vertical,
    reverse,
    hideButtons,
    multiThumbBehavior = 'swap',
    thumbTitle,
    subtractTitle = subtractTitleLabel,
    addTitle = addTitleLabel,
    numberFormat,
    tooltip,
    alwaysShowTooltip,
    extensions,
    handleChange,
    handleFocus,
    handleBlur,
    setDisplayValue,
  } = useFieldProps(preparedProps, {
    omitMultiplePathWarning: true,
  })

  useMemo(() => {
    if ((path || itemPath) && numberFormat) {
      const { number } = getFormattedNumber(value, numberFormat)
      setDisplayValue(number)
    }
  }, [itemPath, numberFormat, path, setDisplayValue, value])

  const handleLocalChange = useCallback(
    ({ value }: { value: number | number[] }) => {
      if (Array.isArray(props.paths) && Array.isArray(value)) {
        value.forEach((value, i) => {
          dataContextRef.current.updateDataValue(props.paths[i], value)
        })
      }

      handleChange?.(value)
    },
    [handleChange, props.paths]
  )

  const fieldBlockProps: FieldBlockProps = {
    id: id,
    forId: `${id}-slider-thumb-0`,
    width,
    ...pickSpacingProps(props),
  }

  const sliderProps: SliderProps = {
    id: `${id}-slider`,
    value,
    step,
    min,
    max,
    disabled,
    status: hasError ? 'error' : undefined,
    on_change: handleLocalChange,
    on_drag_start: handleFocus,
    on_drag_end: handleBlur,
    vertical,
    reverse,
    hideButtons,
    multiThumbBehavior,
    thumbTitle,
    subtractTitle,
    addTitle,
    numberFormat,
    tooltip,
    alwaysShowTooltip,
    extensions,
    stretch: true,
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <Slider {...sliderProps} />
    </FieldBlock>
  )
}

export default SliderComponent

SliderComponent._supportsSpacingProps = true
