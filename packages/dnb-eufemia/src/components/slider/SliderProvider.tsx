import React from 'react'
import { includeValidProps } from '../../components/form-row/FormRowHelpers'
import { usePropsWithContext } from '../../shared/hooks'
import {
  warn,
  isTrue,
  makeUniqueId,
  dispatchCustomElementEvent,
  getStatusState,
} from '../../shared/component-helper'

import Context from '../../shared/Context'
import {
  closestIndex,
  formatNumber,
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
}

export const SliderContext = React.createContext<SliderContextTypes>(null)

export function SliderProvider(localProps: SliderProps) {
  const context = React.useContext(Context)
  const allProps = convertSnakeCaseProps(
    usePropsWithContext(
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
    numberFormat,
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

  const [value, setValue] = React.useState(_value)
  const [thumbState, setThumbState] =
    React.useState<ThumbStateEnums>('initial')
  const thumbIndex = React.useRef<number>(-1)
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

  const emitChange = (
    event: MouseEvent | TouchEvent,
    rawValue: number
  ) => {
    if (disabled || isTrue(skeleton)) {
      return
    }

    const currentValue = roundValue(rawValue, step)

    if (currentValue > -1 && rawValue !== value) {
      let newValue: ValueTypes = currentValue

      if (isMulti) {
        const currentIndex = getAndUpdateCurrentIndex(currentValue)

        newValue = getUpdatedValues(value, currentIndex, currentValue)
      }

      if (typeof onChange === 'function') {
        const obj: onChangeEventProps = {
          value: newValue,
          rawValue,
          raw_value: rawValue, // deprecated
          event,
          number: null,
        }

        if (numberFormat) {
          obj.number = formatNumber(currentValue, numberFormat)
        }

        dispatchCustomElementEvent(allProps, 'onChange', obj)
      }

      setValue(newValue)
    }
  }

  React.useEffect(() => {
    if (isMulti) {
      const hasChanged = (_value as Array<number>).some((val, i) => {
        return val !== value[i]
      })

      if (hasChanged) {
        setValue(_value)
      }
    } else {
      setValue(_value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value, isMulti])

  const trackRef = React.useRef<HTMLElement>()

  const jumpedTimeout = React.useRef<NodeJS.Timeout>()
  const setJumpedState = () => {
    setThumbState('jumped')
    clearTimeout(jumpedTimeout.current)
    jumpedTimeout.current = setTimeout(() => setThumbState('normal'), 100)
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
        setJumpedState,
        jumpedTimeout,
      }}
    >
      {localProps.children}
    </SliderContext.Provider>
  )
}
