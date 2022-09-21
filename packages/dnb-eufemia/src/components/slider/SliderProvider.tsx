import React from 'react'
import { includeValidProps } from '../../components/form-row/FormRowHelpers'
import {
  warn,
  isTrue,
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
  SliderProps,
  SliderContextTypes,
  ThumbStateEnums,
} from './types'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'

const defaultProps = {
  statusState: 'error',
  addTitle: '+',
  subtractTitle: '−',
  min: 0,
  max: 100,
  value: -1,
  multiThumbBehavior: 'swap',
}

export const SliderContext = React.createContext<SliderContextTypes>(null)

export function SliderProvider(localProps: SliderProps) {
  const context = React.useContext(Context)
  const allProps = convertSnakeCaseProps(
    extendPropsWithContext(
      localProps,
      defaultProps,
      { skeleton: context?.skeleton },
      context?.getTranslation(localProps).Slider,
      includeValidProps(
        context?.FormRow,

        /**
         * Exclude some props
         */
        {
          vertical: null,
        }
      ),
      context?.Slider
    )
  )

  const [_id] = React.useState(makeUniqueId)
  if (!allProps.id) {
    allProps.id = _id
  }

  const {
    step,
    label, // eslint-disable-line
    labelDirection, // eslint-disable-line
    labelSrOnly, // eslint-disable-line
    status, // eslint-disable-line
    statusState, // eslint-disable-line
    statusProps, // eslint-disable-line
    statusNoAnimation, // eslint-disable-line
    globalStatusId, // eslint-disable-line
    stretch, // eslint-disable-line
    suffix, // eslint-disable-line
    thumbTitle: title, // eslint-disable-line
    subtractTitle, // eslint-disable-line
    addTitle, // eslint-disable-line
    hideButtons, // eslint-disable-line
    multiThumbBehavior,
    numberFormat,
    tooltip, // eslint-disable-line
    alwaysShowTooltip, // eslint-disable-line
    skeleton,
    max, // eslint-disable-line
    min, // eslint-disable-line
    disabled,
    className, // eslint-disable-line
    id, // eslint-disable-line
    onInit, // eslint-disable-line
    onChange,
    onDragStart, // eslint-disable-line
    onDragEnd, // eslint-disable-line
    vertical: _vertical,
    reverse: _reverse,
    value: _value,
    children: _children, // eslint-disable-line

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
  const [isVertical] = React.useState(isTrue(_vertical))
  const [isReverse] = React.useState(
    isVertical ? !isTrue(_reverse) : isTrue(_reverse)
  )
  const isMulti = Array.isArray(value)
  const setThumbIndex = (index: number) => {
    if (!isNaN(index)) {
      thumbIndex.current = index
    }
  }

  /**
   * Deprecated
   */
  if (allProps.use_scrollwheel) {
    warn('use_scrollwheel is not supported anymore!')
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
    if (disabled || isTrue(skeleton)) {
      return
    }

    let numberValue = roundValue(rawValue, step)
    let multiValues: ValueTypes = numberValue

    if (numberValue > -1) {
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
          raw_value: rawValue, // deprecated
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

  const trackRef = React.useRef<HTMLElement>()

  const animationTimeout = React.useRef<NodeJS.Timeout>()
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
  const showButtons = !isMulti && !isTrue(hideButtons)
  const values = (isMulti ? value : [value]) as Array<number>

  return (
    <SliderContext.Provider
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
    </SliderContext.Provider>
  )
}
