/**
 * Web DrawerList Helpers
 *
 */

import React from 'react'
import {
  isTrue,
  dispatchCustomElementEvent
} from '../../shared/component-helper'

export const parseContentTitle = (
  dataItem,
  {
    separator = '\n',
    removeNumericOnlyValues = false,
    preferSelectedValue = false
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
        cur = grabStringFromReact(cur)
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
    ret = grabStringFromReact((dataItem && dataItem.content) || dataItem)
  }

  if (hasValue) {
    if (preferSelectedValue) {
      ret = String(dataItem.selected_value)
    } else if (!onlyNumericRegex.test(dataItem.selected_value)) {
      ret = String(dataItem.selected_value) + separator + ret
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
      list.push({ selected_key: i, content: data[i], type: 'object' })
    }
    data = list
  }

  return (data || []).map((item, i) => {
    if (typeof item === 'string') {
      item = { content: item, __isTransformed: true }
    }
    if (typeof item.__id !== 'undefined') {
      return item
    }
    if (Object.isExtensible(item)) {
      item.__id = i
      return item
    } else {
      return { ...item, __id: i }
    }
  })
}

export const getData = (props) => {
  if (props.prepared_data && Array.isArray(props.prepared_data)) {
    return props.prepared_data
  }

  return normalizeData(props)
}

export const findCurrentIndex = (current_item, data) => {
  return data.findIndex(({ __id }) => __id === current_item)
}

export const getCurrentIndex = (value, data) => {
  // is numeric
  if (parseFloat(value) > -1) {
    return value
  }

  // if a key is given as a string
  else if (typeof value === 'string') {
    return data?.findIndex((cur) => parseCurrentValue(cur) === value)
  }

  return null
}

export const getSelectedItemValue = (value, state) => {
  if (hasObjectKeyAsValue(state)) {
    return parseCurrentValue(
      state.data.filter((data, i) => i === parseFloat(value))[0]
    )
  }

  return value
}

export const parseCurrentValue = (current) => {
  return current?.selected_key || current?.content || current
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
    original_data: data, // used to reset in case we reorder data etc.
    raw_data, // to have a backup to look up what we got in the first place (array vs object)
    direction: props.direction,
    max_height: props.max_height,
    selected_item,
    active_item: selected_item,
    on_hide: props.on_hide,
    on_show: props.on_show,
    on_chnage: props.on_chnage,
    on_select: props.on_select,
    _listenForPropChanges: false
  }
}

export const prepareDerivedState = (props, state) => {
  if (state.opened && !state.data && typeof props.data === 'function') {
    state.data = getData(props)
  }

  if (state._listenForPropChanges) {
    if (
      (props.data && typeof props.data !== 'function') ||
      props.children
    ) {
      state.data = getData(props)
    }

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
      state.selected_item !== props.value
    ) {
      state.selected_item = getCurrentIndex(props.value, state.data)

      if (typeof props.on_state_update === 'function') {
        dispatchCustomElementEvent({ props }, 'on_state_update', {
          selected_item: state.selected_item,
          value: getSelectedItemValue(state.selected_item, state),
          data: getCurrentData(state.selected_item, state.data)
        })
      }
    }

    if (!(parseFloat(state.active_item) > -1)) {
      state.active_item = state.selected_item
    }

    if (
      props.direction !== 'auto' &&
      props.direction !== state.direction
    ) {
      state.direction = props.direction
    }

    if (parseFloat(state.selected_item) > -1) {
      state.current_title = getCurrentDataTitle(
        state.selected_item,
        state.data
      )
    }
  }
  state._listenForPropChanges = true

  return state
}

export const getCurrentDataTitle = (selected_item, data) => {
  const currentData = getCurrentData(selected_item, data)
  return parseContentTitle(currentData, {
    separator: ' ',
    preferSelectedValue: true
  })
}

export const grabStringFromReact = (cur) => {
  if (!Array.isArray(cur)) {
    cur = [cur]
  }

  return cur
    .map((word) => {
      if (React.isValidElement(word)) {
        if (typeof word.props.children === 'string') {
          word = word.props.children
        } else if (Array.isArray(word.props.children)) {
          word = word.props.children.reduce((acc, word) => {
            if (typeof word === 'string') {
              acc = acc + word
            }
            return acc
          }, '')
        } else {
          return null
        }
      }

      return word
    })
    .filter(Boolean)
    .join(' ')
}

export const findClosest = (arr, val) =>
  Math.max.apply(
    null,
    arr.filter((v) => v <= val)
  )
