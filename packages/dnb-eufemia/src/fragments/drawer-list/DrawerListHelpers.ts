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
  makeUniqueId,
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
  maxHeight: PropTypes.number,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  noScrollAnimation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),

  preventSelection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  action_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  is_popup: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  alignDrawer: PropTypes.oneOf(['left', 'right']),
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skipPortal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  portalClass: PropTypes.string,
  listClass: PropTypes.string,
  preventClose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  independentWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  fixedPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keepOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  maxHeight: null,
  direction: 'auto',
  size: 'default',
  no_animation: false,
  noScrollAnimation: false,
  preventSelection: false,
  action_menu: false,
  is_popup: false,
  alignDrawer: 'left',
  wrapper_element: null,
  defaultValue: null,
  value: 'initval',
  portalClass: null,
  listClass: null,
  skipPortal: null,
  preventClose: false,
  keepOpen: false,
  prevent_focus: false,
  fixedPosition: false,
  independentWidth: false,
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
  enableBodyLock: PropTypes.bool,
  page_offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  observerElement: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const drawerListProviderDefaultProps = {
  enableBodyLock: false,
  page_offset: null,
  observerElement: null,
  minHeight: 10, // 10rem = 10x16=160,
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

  data = (data && data.find(({ __id }) => __id === item_index)) || null

  if (data && data.__isTransformed) {
    return data.content
  }

  return data
}

function getFirstItemFromData(data: DrawerListInternalData): number {
  let firstItemIndex = data.length > 0 ? 0 : null
  let firstGroupIndex = -1

  data.forEach((item, index) => {
    if ((item.groupIndex ?? undefined) > -1) {
      if (firstGroupIndex === -1 || item.groupIndex < firstGroupIndex) {
        firstGroupIndex = item.groupIndex
        firstItemIndex = index
      }
      if (item.groupIndex === 0) {
        return
      }
    }
  })

  return firstItemIndex
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
    id: props.id || makeUniqueId(),
    opened,
    data,
    original_data: data, // used to reset in case we reorder data etc.
    raw_data,
    direction: props.direction,
    maxHeight: props.maxHeight,
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
  } else if (props.defaultValue !== null) {
    state.selected_item = state.active_item = getCurrentIndex(
      props.defaultValue,
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

  state.skipPortal = isTrue(props.skipPortal)

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
    (state._value !== props.value || isTrue(props.preventSelection))
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

  // set aria-activedescendant for screenreaders
  if (
    isNaN(parseFloat(state.active_item as string)) ||
    parseFloat(state.active_item as string) === -1 ||
    getCurrentData(parseFloat(state.active_item as string), state.data) ===
      null
  ) {
    // no valid active item
    // but screenreaders require an active item, so we point them to the first item
    const firstItem = getFirstItemFromData(state.data)
    state.ariaActiveDescendant =
      firstItem === null ? '' : `option-${state.id}-${firstItem}`

    state.active_item = -1
  } else {
    state.ariaActiveDescendant = `option-${state.id}-${state.active_item}`
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
