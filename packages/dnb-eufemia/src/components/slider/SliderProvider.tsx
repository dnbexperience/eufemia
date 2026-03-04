import React from 'react'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import {
  makeUniqueId,
  dispatchCustomElementEvent,
  getStatusState,
  extendPropsWithContext,
} from '../../shared/component-helper'

import Context from '../../shared/Context'
import {
  closestIndex,
  getFormattedNumber,
  getUpdatedValues,
  roundValue,
} from './SliderHelpers'

import type {
  ValueTypes,
  onChangeEventProps,
  SliderAllProps,
  SliderContextTypes,
  ThumbStateEnums,
} from './types'

const defaultProps: Partial<SliderAllProps> = {
  statusState: 'error',
  min: 0,
  max: 100,
  value: -1,
  multiThumbBehavior: 'swap',
}

export const SliderContext = React.createContext<SliderContextTypes>(null)

export function SliderProvider(localProps: SliderAllProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    pickFormElementProps(context?.formElement),
    context?.getTranslation(localProps).Slider,
    context?.Slider
  )

  const [_id] = React.useState(makeUniqueId)
  if (!allProps.id) {
    allProps.id = _id
  }

  const {
    step,
    label,
    labelDirection,
    labelSrOnly,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    stretch,
    suffix,
    thumbTitle: title,
    subtractTitle,
    addTitle,
    hideButtons,
    multiThumbBehavior,
    numberFormat,
    tooltip,
    alwaysShowTooltip,
    skeleton,
    max,
    min,
    extensions,
    disabled,
    className,
    id,
    onChange,
    onDragStart,
    onDragEnd,
    vertical: _vertical,
    reverse: _reverse,
    value: _value,
    children: _children,

    ...attributes // Find a DOM element to forwards props too when multi buttons are supported
  } = allProps

  const [value, setValue] = React.useState<ValueTypes>(_value)
  const [externValue, updateExternValue] =
    React.useState<ValueTypes>(_value)
  const realtimeValue = React.useRef<ValueTypes>(_value)
  const [thumbState, setThumbState] =
    React.useState<ThumbStateEnums>('initial')
  const thumbIndex = React.useRef<number>(-1)
  const [shouldAnimate, updateAnimateState] =
    React.useState<boolean>(false)
  const [isVertical] = React.useState(_vertical)
  const [isReverse] = React.useState(isVertical ? !_reverse : _reverse)
  const isMulti = Array.isArray(value)
  const setThumbIndex = (index: number) => {
    if (!isNaN(index)) {
      thumbIndex.current = index
    }
  }

  const getAndUpdateCurrentIndex = (currentValue: number) => {
    let currentIndex = null

    if (thumbIndex.current > -1) {
      currentIndex = thumbIndex.current
    } else {
      currentIndex = closestIndex(currentValue, value as Array<number>)
      setThumbIndex(currentIndex)
    }

    return currentIndex
  }

  const updateValue = (value: ValueTypes) => {
    setValue(value)
    realtimeValue.current = value
  }

  const emitChange = (
    event: MouseEvent | TouchEvent,
    rawValue: number
  ) => {
    if (disabled || skeleton) {
      return
    }

    let numberValue = roundValue(rawValue, { step, min, max })
    let multiValues: ValueTypes = numberValue

    if (numberValue >= min) {
      if (isMulti) {
        const currentIndex = getAndUpdateCurrentIndex(numberValue)
        const lower = realtimeValue.current[currentIndex - 1]
        const upper = realtimeValue.current[currentIndex + 1]

        if (multiThumbBehavior === 'omit') {
          if (numberValue < lower) {
            numberValue = lower
          }
          if (numberValue > upper) {
            numberValue = upper
          }
        }

        multiValues = getUpdatedValues(
          multiThumbBehavior === 'push'
            ? (realtimeValue.current as Array<number>)
            : value,
          currentIndex,
          numberValue
        )

        if (multiThumbBehavior === 'push') {
          if (typeof lower !== 'undefined' && numberValue < lower) {
            multiValues[currentIndex - 1] = numberValue
          }
          if (typeof upper !== 'undefined' && numberValue >= upper) {
            multiValues[currentIndex + 1] = numberValue
          }
        }

        if (numberValue === realtimeValue.current[currentIndex]) {
          return // stop here
        }
      } else if (numberValue === realtimeValue.current) {
        return // stop here
      }

      if (typeof onChange === 'function') {
        const obj: onChangeEventProps = {
          value: multiValues,
          rawValue,
          event,
          number: null,
        }

        if (numberFormat) {
          obj.number = getFormattedNumber(numberValue, numberFormat).number
        }

        dispatchCustomElementEvent(allProps, 'onChange', obj)
      }

      updateValue(multiValues)
    }
  }

  React.useEffect(() => {
    if (isMulti) {
      const hasChanged = (_value as Array<number>).some((val, i) => {
        return val !== externValue[i]
      })

      if (hasChanged) {
        updateValue(_value)
        updateExternValue(_value)
      }
    } else if (_value !== externValue) {
      updateValue(_value)
      updateExternValue(_value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value, isMulti])

  const trackRef = React.useRef<HTMLElement>(undefined)

  const animationTimeout = React.useRef<NodeJS.Timeout>(undefined)
  const setShouldAnimate = (state: boolean) => {
    updateAnimateState(state)
    clearTimeout(animationTimeout.current)
    if (state) {
      animationTimeout.current = setTimeout(
        () => updateAnimateState(false),
        250
      )
    }
  }

  const showStatus = getStatusState(status)
  const showButtons = !isMulti && !hideButtons
  const values = (isMulti ? value : [value]) as Array<number>

  return (
    <SliderContext
      value={{
        isMulti,
        isReverse,
        isVertical,
        shouldAnimate,
        value,
        values,
        setValue,
        attributes,
        showStatus,
        showButtons,
        thumbState,
        setThumbState,
        thumbIndex,
        setThumbIndex,
        emitChange,
        allProps,
        trackRef,
        setShouldAnimate,
        animationTimeout,
      }}
    >
      {localProps.children}
    </SliderContext>
  )
}
