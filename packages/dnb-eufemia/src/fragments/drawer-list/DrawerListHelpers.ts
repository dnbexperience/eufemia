/**
 * Web DrawerList Helpers
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import { spacingPropTypes } from '../../components/space/SpacingHelper'
import {
  DrawerListDataArrayItem,
  DrawerListDataArrayObject,
  DrawerListData,
  DrawerListDataAll,
  DrawerListDataArray,
  DrawerListInternalData,
  DrawerListInternalItem,
} from './DrawerList'
import { DrawerListProviderProps } from './DrawerListProvider'
import { DrawerListContextState } from './DrawerListContext'
import Icon from '../../components/icon/Icon'
import CountryFlag from '../../components/country-flag/CountryFlag'

// legacy used by Autocomplete and Dropdown
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
          selectedKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          /** @deprecated use `selectedKey` */
          selected_key: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          selected_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
          ]),
          suffix_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
          ]),
          disabled: PropTypes.bool,
          content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.string),
          ]),
        }),
      ])
    ),
  ]),
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
  data: null,
  raw_data: null,
  ignore_events: null,

  className: null,
  children: null,

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

// legacy used by Dropdown
export const drawerListProviderPropTypes = {
  enable_body_lock: PropTypes.bool,
  page_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  observer_element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  min_height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const drawerListProviderDefaultProps = {
  enable_body_lock: false,
  page_offset: null,
  observer_element: null,
  min_height: 10, // 10rem = 10x16=160,
}

export function parseContentTitle(
  dataItem: DrawerListDataArrayItem,
  {
    separator = '\n',
    removeNumericOnlyValues = false,
    preferSelectedValue = false,
  } = {}
): string | null {
  dataItem = normalizeDataItem(dataItem)

  if (!dataItem) {
    return null
  }

  let ret = ''
  const onlyNumericRegex = /[0-9.,-\s]+/

  const hasValue = dataItem && dataItem.selected_value

  if (
    !(preferSelectedValue && hasValue) &&
    Array.isArray(dataItem.content)
  ) {
    ret = dataItem.content
      .reduce<string[]>((acc, cur) => {
        // check if we have React inside, with strings we can use
        const converted = convertJsxToString(cur, ' ')
        if (!converted) {
          return acc
        }
        // remove only numbers
        const found =
          removeNumericOnlyValues && converted.match(onlyNumericRegex)
        if (!(found && found[0].length === converted.length)) {
          acc.push(converted)
        }
        return acc
      }, [])
      .join(separator)
  } else {
    ret = convertJsxToString(dataItem.content, ' ')
  }

  if (hasValue) {
    if (preferSelectedValue) {
      ret = String(
        convertJsxToString(dataItem.selected_value, separator, (word) => {
          const nestedChildren =
            !word.props.children &&
            word?.type !== Icon &&
            word?.type !== CountryFlag &&
            typeof word?.type === 'function' &&
            (word.type as () => React.ReactElement)()

          return nestedChildren?.props?.children ? nestedChildren : word
        })
      )
    } else if (!onlyNumericRegex.test(dataItem.selected_value as string)) {
      ret = separator + ret
    }
  }

  return ret
}

export const hasObjectKeyAsValue = (data) => {
  data = data?.raw_data || data
  return data && typeof data === 'object' && !Array.isArray(data)
}

export function preSelectData(data: DrawerListData): DrawerListDataAll {
  if (typeof data === 'string') {
    data =
      data[0] === '{' || data[0] === '['
        ? (JSON.parse(data) as Array<any> | Record<string, any>)
        : undefined
  } else if (data && React.isValidElement(data)) {
    data = []
  } else if (typeof data === 'function') {
    data = data()
  }

  return data
}

/**
 * Takes any of the forms data can have and returns a normalized array representation of it.
 * If the data is a single React.ReactNode, it will return an empty list.
 * @param {*} props object containing the data in props.data or props.children, or the data itself
 * @returns an array representation of the data
 */
export function normalizeData(props): DrawerListInternalData {
  let data = preSelectData(props.data || props.children || props) ?? []

  if (typeof data === 'object' && !Array.isArray(data)) {
    const list: DrawerListDataArray = []
    for (const key in data) {
      list.push({
        selectedKey: key,
        selected_key: key,
        value: key,
        content: data[key],
        type: 'object',
      })
    }
    data = list
  }

  return data.map((dataItem, __id) => {
    const normalized = normalizeDataItem(dataItem, true)
    return typeof normalized?.__id !== 'undefined'
      ? (normalized as DrawerListInternalItem)
      : { ...normalized, __id }
  })
}

function normalizeDataItem(
  dataItem: DrawerListDataArrayItem,
  markAsTransformed = false
): DrawerListDataArrayObject {
  return dataItem === null
    ? undefined
    : typeof dataItem === 'object' && 'content' in dataItem
    ? dataItem
    : {
        content: dataItem,
        ...(markAsTransformed ? { __isTransformed: true } : {}),
      }
}

export const getData = (props) => {
  return normalizeData(props)
}

export const getCurrentIndex = (value, data) => {
  // 1. if a non-numeric value is given
  if (/[^0-9]/.test(String(value))) {
    return data?.findIndex((cur) => parseCurrentValue(cur) === value)
  }
  // 2. if "selectedKey" is given in data, we now handle it as a value, and not an index.
  if (selectedKeyExists()) {
    const index = data?.findIndex(
      (cur) => String(parseCurrentValue(cur)) === String(value)
    )
    if (index > -1) {
      return index
    }
  }
  // 3. if is numeric, and no matching "selectedKey", handle it as a index.
  if (!isNaN(parseFloat(value))) {
    return value
  }

  return null

  function selectedKeyExists() {
    for (let i = 0, l = data?.length; i < l; i++) {
      if (i > 10) {
        return false
      }
      if (
        typeof data[i]?.selectedKey !== 'undefined' ||
        typeof data[i]?.selected_key !== 'undefined' ||
        data[i]?.type === 'object'
      ) {
        return true
      }
    }
  }
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
  if (typeof current?.selectedKey !== 'undefined') {
    return current?.selectedKey
  }
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
    return data.content
  }

  return data
}

export function prepareStartupState(
  props: DrawerListProviderProps
): DrawerListContextState {
  const selected_item = null
  const raw_data = preSelectData(
    props.data ||
      (!React.isValidElement(props.children)
        ? (props.children as DrawerListData)
        : undefined)
  )
  const data = getData(props)
  const opened = props.opened !== null ? isTrue(props.opened) : null

  const state: DrawerListContextState = {
    opened,
    data,
    original_data: data, // used to reset in case we reorder data etc.
    raw_data,
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

export const prepareDerivedState = (
  props: DrawerListProviderProps,
  state: DrawerListContextState
) => {
  if (state.opened && !state.data && typeof props.data === 'function') {
    state.data = getData(props)
  }

  if (props.data && props.data !== state._data) {
    if (state._data) {
      state.cache_hash = state.cache_hash + Date.now()
    }
    state.data = getData(props)
    state.original_data = getData(props)
  }

  state.skipPortal = isTrue(props.skip_portal)

  if (typeof props.wrapper_element === 'string') {
    if (typeof document !== 'undefined') {
      const wrapper_element = document.querySelector<HTMLElement>(
        props.wrapper_element
      )
      if (wrapper_element) {
        state.wrapper_element = wrapper_element
      }
    }
  } else if (props.wrapper_element) {
    state.wrapper_element = props.wrapper_element
  }

  if (
    state.selected_item !== props.value &&
    (state._value !== props.value || isTrue(props.prevent_selection))
  ) {
    if (props.value === 'initval') {
      state.selected_item = null
    } else {
      state.selected_item = getCurrentIndex(
        props.value,
        state.original_data
      )
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
    !(
      state.active_item !== null &&
      parseFloat(state.active_item as string) > -2
    ) ||
    state._value !== props.value
  ) {
    state.active_item = state.selected_item
  }

  if (props.direction !== 'auto' && props.direction !== state.direction) {
    state.direction = props.direction
  }

  if (
    state.selected_item !== null &&
    parseFloat(state.selected_item as string) > -1
  ) {
    state.current_title = getCurrentDataTitle(
      state.selected_item,
      state.data
    )
  }

  state._data = props.data
  state._value = props.value
  state.groups = props.groups

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
