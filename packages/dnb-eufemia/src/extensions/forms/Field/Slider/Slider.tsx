import React, { useCallback, useContext, useRef } from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import pointer from 'json-pointer'
import {
  FieldBlockWidth,
  FieldHelpProps,
  FieldProps,
  Path,
} from '../../types'
import Slider, { SliderProps } from '../../../../components/Slider'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { HelpButton } from '../../../../components'
import DataContext, { ContextState } from '../../DataContext/Context'

export type SliderVisibilityEvent = React.MouseEvent<HTMLButtonElement> & {
  value: string
}

export type SliderValue = number | Array<number>
export type Props = FieldHelpProps &
  FieldProps<SliderValue> & {
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

  const getValue = useCallback((source: Path | number) => {
    if (typeof source === 'number') {
      return source
    }

    return pointer.has(dataContextRef.current?.data, source)
      ? pointer.get(dataContextRef.current.data, source)
      : undefined
  }, [])

  const getValues = useCallback(
    (source: SliderValue | Path | Array<Path>) => {
      if (Array.isArray(source)) {
        return source.map((s) => getValue(s) || 0)
      }

      return getValue(source) || 0
    },
    [getValue]
  )

  const value = getValues(props.paths ?? props.path ?? props.value)
  const preparedProps = {
    ...props,
    step: getValue(props.step),
    min: getValue(props.min),
    max: getValue(props.max),
  }

  const {
    id,
    step = 1,
    min = 0,
    max = 100,
    width = 'stretch',
    layout,
    label,
    help,
    labelDescription,
    info,
    warning,
    error,
    hasError,
    disabled,
    handleChange,
    handleFocus,
    handleBlur,
  } = useFieldProps(preparedProps)

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
    forId: id,
    layout,
    label,
    labelDescription,
    info,
    warning,
    error,
    disabled,
    width,
    ...pickSpacingProps(props),
  }

  const sliderProps: SliderProps = {
    value,
    step,
    min,
    max,
    disabled,
    status: hasError ? 'error' : undefined,
    suffix: help ? (
      <HelpButton title={help.title}>{help.content}</HelpButton>
    ) : undefined,
    on_change: handleLocalChange,
    on_drag_start: handleFocus,
    on_drag_end: handleBlur,
    vertical: props.vertical,
    reverse: props.reverse,
    hideButtons: props.hideButtons,
    multiThumbBehavior: props.multiThumbBehavior,
    thumbTitle: props.thumbTitle,
    subtractTitle: props.subtractTitle,
    addTitle: props.addTitle,
    numberFormat: props.numberFormat,
    tooltip: props.tooltip,
    alwaysShowTooltip: props.alwaysShowTooltip,
    extensions: props.extensions,
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
