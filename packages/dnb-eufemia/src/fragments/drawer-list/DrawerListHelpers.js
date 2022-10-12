/**
 * Web DrawerList Helpers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import { spacingPropTypes } from '../../components/space/SpacingHelper'

export const drawerListPropTypes = {
  id: PropTypes.string,
  role: PropTypes.string,
  cache_hash: PropTypes.string,
  triangle_position: PropTypes.string,
  scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  max_height: PropTypes.number,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_scroll_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  use_drawer_on_mobile: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  action_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  is_popup: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  align_drawer: PropTypes.oneOf(['left', 'right']),
  options_render: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]),
  wrapper_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]),
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skip_portal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  portal_class: PropTypes.string,
  list_class: PropTypes.string,
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  independent_width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  fixed_position: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_keysearch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        PropTypes.shape({
          selected_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
          ]),
          suffix_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
          ]),
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.string),
          ]),
        }),
      ])
    ),
  ]),
  prepared_data: PropTypes.array,
  raw_data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  ignore_events: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]),

  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  handle_dismiss_focus: PropTypes.func,
  on_change: PropTypes.func,
  on_pre_change: PropTypes.func,
  on_resize: PropTypes.func,
  on_select: PropTypes.func,
  on_state_update: PropTypes.func,
}

export const drawerListDefaultProps = {
  id: null,
  role: 'listbox',
  cache_hash: null,
  triangle_position: 'left',
  scrollable: true,
  focusable: false,
  max_height: null,
  direction: 'auto',
  size: 'default',
  no_animation: false,
  no_scroll_animation: false,
  use_drawer_on_mobile: false,
  prevent_selection: false,
  action_menu: false,
  is_popup: false,
  align_drawer: 'left',
  wrapper_element: null,
  default_value: null,
  value: 'initval',
  portal_class: null,
  list_class: null,
  skip_portal: null,
  prevent_close: false,
  keep_open: false,
  prevent_focus: false,
  fixed_position: false,
  independent_width: false,
  skip_keysearch: false,
  opened: null,
  class: null,
  data: null,
  prepared_data: null,
  raw_data: null,
  ignore_events: null,

  className: null,
  children: null,

  custom_element: null,
  custom_method: null,

  on_show: null,
  on_hide: null,
  handle_dismiss_focus: null,
  on_change: null,
  on_pre_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  options_render: null,
}

export const drawerListProviderPropTypes = {
  enable_body_lock: PropTypes.bool,
  use_drawer_on_mobile: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  page_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  observer_element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  min_height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const drawerListProviderDefaultProps = {
  enable_body_lock: false,
  use_drawer_on_mobile: null,
  page_offset: null,
  observer_element: null,
  min_height: 10, // 10rem = 10x16=160,
}

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
      typeof item === 'number' ||
      typeof item === 'string' ||
      Array.isArray(item) ||
      React.isValidElement(item)
    ) {
      item = { content: item, __isTransformed: true }
    }

    return typeof item?.__id !== 'undefined' ? item : { ...item, __id }
  })
}

export const getData = (props) => {
  if (props.prepared_data && Array.isArray(props.prepared_data)) {
    return props.prepared_data
  }

  return normalizeData(props)
}

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
  const selected_item = null
  const raw_data = preSelectData(
    props.raw_data || props.data || props.children
  )
  const data = getData(props)
  const opened = props.opened !== null ? isTrue(props.opened) : null

  const state = {
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
    on_change: props.on_change,
    on_select: props.on_select,
  }

  if (
    props.value !== null &&
    typeof props.value !== 'undefined' &&
    props.value !== 'initval'
  ) {
    state.selected_item = state.active_item = getCurrentIndex(
      props.value,
      data
    )
  } else if (props.default_value !== null) {
    state.selected_item = state.active_item = getCurrentIndex(
      props.default_value,
      data
    )
    state._value = props.value
  }

  return state
}

export const prepareDerivedState = (props, state) => {
  if (state.opened && !state.data && typeof props.data === 'function') {
    state.data = getData(props)
  }

  if (props.data && props.data !== state._data) {
    if (state._data) {
      state.cache_hash = state.cache_hash + Date.now()
    }
    state.data = getData(props)
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
    // state.selected_item !== props.value &&
    state._value !== props.value ||
    state._data !== props.data ||
    isTrue(props.prevent_selection)
  ) {
    if (props.value === 'initval') {
      state.selected_item = null
    } else {
      state.selected_item = getCurrentIndex(props.value, state.data)
    }

    if (typeof props.on_state_update === 'function') {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        selected_item: state.selected_item,
        value: getSelectedItemValue(state.selected_item, state),
        data: getEventData(state.selected_item, state.data),
      })
    }
  }

  // active_item can be -1, so we check for -2
  if (
    !(parseFloat(state.active_item) > -2) ||
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

  state._data = props.data
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
