/**
 * Web DrawerList Helpers
 *
 */

import React from 'react'
import {
  isTrue,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'

export const parseContentTitle = (
  dataItem,
  {
    separator = '\n',
    removeNumericOnlyValues = false,
    preferSelectedValue = false,
  } = {}
) => {
  let ret = ''
  const onlyNumericRegex = /[0-9.,-\s]+/
  if (Array.isArray(dataItem) && dataItem.length > 0) {
    dataItem = { content: dataItem }
  }

  const hasValue = dataItem?.selected_value

  if (
    !(preferSelectedValue && hasValue) &&
    dataItem &&
    Array.isArray(dataItem.content)
  ) {
    ret = dataItem.content
      .reduce((acc, cur) => {
        // check if we have React inside, with strings we can use
        cur = convertJsxToString(cur, ' ')
        if (cur === false) {
          return acc
        }
        // remove only numbers
        const found =
          removeNumericOnlyValues && cur && cur.match(onlyNumericRegex)
        if (!(found && found[0].length === cur.length)) {
          acc.push(cur)
        }
        return acc
      }, [])
      .join(separator)
  } else {
    ret = convertJsxToString(
      (dataItem && dataItem.content) || dataItem,
      ' '
    )
  }

  if (hasValue) {
    if (preferSelectedValue) {
      ret = String(convertJsxToString(dataItem.selected_value))
    } else if (!onlyNumericRegex.test(dataItem.selected_value)) {
      ret =
        String(convertJsxToString(dataItem.selected_value)) +
        separator +
        ret
    }
  }

  // make sure we don't return empty strings
  if (Array.isArray(dataItem) && dataItem.length === 0) {
    ret = null
  }

  if (ret && ret.length === 1 && ret[0].ignore_events) {
    return null
  }

  return ret
}

export const hasObjectKeyAsValue = (data) => {
  data = data?.raw_data || data
  return data && typeof data === 'object' && !Array.isArray(data)
}

export const preSelectData = (data) => {
  if (typeof data === 'string') {
    data = data[0] === '{' || data[0] === '[' ? JSON.parse(data) : null
  } else if (data && React.isValidElement(data)) {
    data = []
  } else if (typeof data === 'function') {
    data = data()
  }

  return data
}

// normalize data
export const normalizeData = (props) => {
  let data = preSelectData(props.data || props.children || props)

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const list = []
    for (let i in data) {
      list.push({
        selected_key: i,
        value: i,
        content: data[i],
        type: 'object',
      })
    }
    data = list
  }

  return (data || []).map((item, __id) => {
    if (
      typeof item === 'string' ||
      Array.isArray(item) ||
      React.isValidElement(item)
    ) {
      item = { content: item, __isTransformed: true }
    }

    return typeof item.__id !== 'undefined' ? item : { ...item, __id }
  })
}

export const getData = (props) => {
  if (props.prepared_data && Array.isArray(props.prepared_data)) {
    return props.prepared_data
  }

  return normalizeData(props)
}

// export const findCurrentIndex = (current_item, data) => {
//   return data.findIndex(({ __id }) => __id === current_item)
// }

export const getCurrentIndex = (value, data) => {
  // if a key is given as a not numeric value
  if (/[^0-9]/.test(String(value))) {
    return data?.findIndex((cur) => parseCurrentValue(cur) === value)
  }
  // is numeric
  else if (parseFloat(value) > -1) {
    return value
  }

  return null
}

export const getSelectedItemValue = (value, state) => {
  if (hasObjectKeyAsValue(state)) {
    return parseCurrentValue(
      state.data.filter((_, i) => i === parseFloat(value))[0]
    )
  }

  return value
}

export const parseCurrentValue = (current) => {
  if (typeof current?.selected_key !== 'undefined') {
    return current?.selected_key
  }
  if (typeof current?.content !== 'undefined') {
    return current?.content
  }
  return current
}

export const getEventData = (item_index, data) => {
  data = getCurrentData(item_index, data)

  // cleanup
  if (data && data.__id) {
    data = { ...data }
    delete data.__id
    delete data.__isTransformed
  }

  return data
}

export const getCurrentData = (item_index, data) => {
  if (typeof data === 'function') {
    data = normalizeData(data)
  }

  data = (data && data.find(({ __id }) => __id == item_index)) || null

  if (data && data.__isTransformed) {
    data = parseCurrentValue(data)
  }

  return data
}

export const prepareStartupState = (props) => {
  const raw_data = preSelectData(
    props.raw_data || props.data || props.children
  )

  const data = getData(props)
  const opened = props.opened !== null ? isTrue(props.opened) : null

  let selected_item = null

  if (
    props.value !== null &&
    typeof props.value !== 'undefined' &&
    props.value !== 'initval'
  ) {
    selected_item = getCurrentIndex(props.value, data)
  } else if (props.default_value !== null) {
    selected_item = getCurrentIndex(props.default_value, data)
  }

  return {
    opened,
    data,
    init_data: props.data,
    original_data: data, // used to reset in case we reorder data etc.
    raw_data, // to have a backup to look up what we got in the first place (array vs object)
    direction: props.direction,
    max_height: props.max_height,
    selected_item,
    active_item: selected_item,
    on_hide: props.on_hide,
    on_show: props.on_show,
    on_change: props.on_change,
    on_select: props.on_select,
  }
}

export const prepareDerivedState = (props, state) => {
  if (state.opened && !state.data && typeof props.data === 'function') {
    state.data = getData(props)
  }

  if (props.data && props.data !== state.init_data) {
    state.data = getData(props)
    state.init_data = props.data
  }

  state.usePortal =
    props.skip_portal !== null ? !isTrue(props.skip_portal) : true

  if (
    typeof props.wrapper_element === 'string' &&
    typeof document !== 'undefined'
  ) {
    const wrapper_element = document.querySelector(props.wrapper_element)
    if (wrapper_element) {
      state.wrapper_element = wrapper_element
    }
  } else if (props.wrapper_element) {
    state.wrapper_element = props.wrapper_element
  }

  if (
    typeof props.value !== 'undefined' &&
    props.value !== 'initval' &&
    state.selected_item !== props.value &&
    (state._value !== props.value || isTrue(props.prevent_selection))
  ) {
    state.selected_item = getCurrentIndex(props.value, state.data)

    if (typeof props.on_state_update === 'function') {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        selected_item: state.selected_item,
        value: getSelectedItemValue(state.selected_item, state),
        data: getEventData(state.selected_item, state.data),
      })
    }
  }

  if (
    !(parseFloat(state.active_item) > -1) ||
    state._value !== props.value
  ) {
    state.active_item = state.selected_item
  }

  if (props.direction !== 'auto' && props.direction !== state.direction) {
    state.direction = props.direction
  }

  if (parseFloat(state.selected_item) > -1) {
    state.current_title = getCurrentDataTitle(
      state.selected_item,
      state.data
    )
  }
  state._value = props.value

  return state
}

export const getCurrentDataTitle = (selected_item, data) => {
  const currentData = getCurrentData(selected_item, data)
  return parseContentTitle(currentData, {
    separator: ' ',
    preferSelectedValue: true,
  })
}

export const findClosest = (arr, val) =>
  Math.max.apply(
    null,
    arr.filter((v) => v <= val)
  )
