/**
 * Web DrawerList Helpers
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import {
  makeUniqueId,
  convertJsxToString,
} from '../../shared/component-helper'
import type {
  DrawerListDataArrayItem,
  DrawerListDataArrayObject,
  DrawerListData,
  DrawerListDataAll,
  DrawerListDataArray,
  DrawerListInternalData,
  DrawerListInternalItem,
} from './DrawerList'
import type { DrawerListProviderProps } from './DrawerListProvider'
import type { DrawerListContextState } from './DrawerListContext'
import Icon from '../../components/icon/Icon'
import CountryFlag from '../../components/country-flag/CountryFlag'

export const drawerListDefaultProps = {
  id: null as string | null,
  role: 'listbox',
  cacheHash: null as string | null,
  arrowPosition: 'left',
  scrollable: true,
  focusable: false,
  maxHeight: null as (string | number) | null,
  direction: 'auto',
  size: 'default',
  noAnimation: false,
  noScrollAnimation: false,
  preventSelection: false,
  actionMenu: false,
  isPopup: false,
  alignDrawer: 'left',
  wrapperElement: null as (string | HTMLElement) | null,
  defaultValue: null as (string | number) | null,
  value: 'initval',
  portalClass: null as string | null,
  listClass: null as string | null,
  skipPortal: null as boolean | null,
  preventClose: false,
  keepOpen: false,
  preventFocus: false,
  fixedPosition: false,
  independentWidth: false,
  skipKeysearch: false,
  open: null as boolean | null,
  data: null as DrawerListData | null,
  rawData: null as DrawerListDataAll | null,
  ignoreEvents: null as boolean | null,

  className: null as string | null,
  children: null as React.ReactNode,

  onOpen: null as ((...args: never[]) => void) | null,
  onClose: null as ((...args: never[]) => void) | null,
  handleDismissFocus: null as (() => void) | null,
  onChange: null as ((...args: never[]) => void) | null,
  onPreChange: null as ((...args: never[]) => void) | null,
  onResize: null as ((...args: never[]) => void) | null,
  onSelect: null as ((...args: never[]) => void) | null,
  optionsRender: null as ((...args: never[]) => void) | null,
}

export const drawerListProviderDefaultProps = {
  enableBodyLock: false,
  pageOffset: null as (string | number) | null,
  observerElement: null as (string | React.ReactNode) | null,
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

  const hasValue = dataItem && dataItem.selectedValue

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
        convertJsxToString(dataItem.selectedValue, separator, (word) => {
          const element = word as React.ReactElement<any>
          const nestedChildren =
            !element.props.children &&
            element?.type !== Icon &&
            element?.type !== CountryFlag &&
            typeof element?.type === 'function' &&
            (element.type as () => React.ReactElement)()

          return (nestedChildren as React.ReactElement<any>)?.props
            ?.children
            ? nestedChildren
            : element
        })
      )
    } else if (!onlyNumericRegex.test(dataItem.selectedValue as string)) {
      ret = separator + ret
    }
  }

  return ret
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasObjectKeyAsValue = (data: any) => {
  data = data?.rawData || data
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeData(props: any): DrawerListInternalData {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getData = (props: any) => {
  return normalizeData(props)
}

export const getCurrentIndex = (
  value: string | number,
  data: DrawerListInternalData
) => {
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
  if (!isNaN(parseFloat(String(value)))) {
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

export const getSelectedItemValue = (
  value: string | number,
  state: DrawerListContextState
) => {
  if (hasObjectKeyAsValue(state)) {
    return parseCurrentValue(
      state.data.filter((_, i) => i === parseFloat(String(value)))[0]
    )
  }

  return value
}

export const parseCurrentValue = (current: DrawerListDataArrayObject) => {
  if (typeof current?.selectedKey !== 'undefined') {
    return current?.selectedKey
  }
  if (typeof current?.content !== 'undefined') {
    return current?.content
  }
  return current
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEventData = (itemIndex: string | number, data: any) => {
  data = getCurrentData(itemIndex, data)

  // cleanup
  if (data && data.__id) {
    data = { ...data }
    delete data.__id
    delete data.__isTransformed
  }

  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCurrentData = (itemIndex: string | number, data: any) => {
  if (typeof data === 'function') {
    data = normalizeData(data)
  }

  data =
    (data &&
      data.find(
        ({ __id }: DrawerListInternalItem) => __id === itemIndex
      )) ||
    null

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
  const selectedItem: number | null = null
  const rawData = preSelectData(
    props.data ||
      (!React.isValidElement(props.children)
        ? (props.children as DrawerListData)
        : undefined)
  )
  const data = getData(props)
  const open = props.open !== null ? props.open : null

  const state: DrawerListContextState = {
    id: props.id || makeUniqueId(),
    open,
    data,
    originalData: data, // used to reset in case we reorder data etc.
    rawData,
    direction: props.direction,
    maxHeight: props.maxHeight,
    selectedItem,
    activeItem: selectedItem,
    onClose: props.onClose,
    onOpen: props.onOpen,
    onChange: props.onChange,
    onSelect: props.onSelect,
  }

  if (
    props.value !== null &&
    typeof props.value !== 'undefined' &&
    props.value !== 'initval'
  ) {
    state.selectedItem = state.activeItem = getCurrentIndex(
      props.value,
      data
    )
  } else if (props.defaultValue !== null) {
    state.selectedItem = state.activeItem = getCurrentIndex(
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
  if (state.open && !state.data && typeof props.data === 'function') {
    state.data = getData(props)
  }

  if (props.data && props.data !== state._data) {
    if (state._data) {
      state.cacheHash = state.cacheHash + Date.now()
    }
    state.data = getData(props)
    state.originalData = getData(props)
  }

  state.skipPortal = props.skipPortal

  if (typeof props.wrapperElement === 'string') {
    if (typeof document !== 'undefined') {
      const wrapperElement = document.querySelector<HTMLElement>(
        props.wrapperElement
      )
      if (wrapperElement) {
        state.wrapperElement = wrapperElement
      }
    }
  } else if (props.wrapperElement) {
    state.wrapperElement = props.wrapperElement
  }

  if (
    state.selectedItem !== props.value &&
    (state._value !== props.value || props.preventSelection)
  ) {
    if (props.value === 'initval') {
      state.selectedItem = null
    } else {
      state.selectedItem = getCurrentIndex(props.value, state.originalData)
    }
  }

  // activeItem can be -1, so we check for -2
  if (
    !(
      state.activeItem !== null &&
      parseFloat(state.activeItem as string) > -2
    ) ||
    state._value !== props.value
  ) {
    state.activeItem = state.selectedItem
  }

  // set aria-activedescendant for screenreaders
  if (
    isNaN(parseFloat(state.activeItem as string)) ||
    parseFloat(state.activeItem as string) === -1 ||
    getCurrentData(parseFloat(state.activeItem as string), state.data) ===
      null
  ) {
    // no valid active item
    // but screenreaders require an active item, so we point them to the first item
    const firstItem = getFirstItemFromData(state.data)
    state.ariaActiveDescendant =
      firstItem === null ? '' : `option-${state.id}-${firstItem}`

    state.activeItem = -1
  } else {
    state.ariaActiveDescendant = `option-${state.id}-${state.activeItem}`
  }

  if (props.direction !== 'auto' && props.direction !== state.direction) {
    state.direction = props.direction
  }

  if (
    state.selectedItem !== null &&
    parseFloat(state.selectedItem as string) > -1
  ) {
    state.currentTitle = getCurrentDataTitle(
      state.selectedItem,
      state.data
    )
  }

  state._data = props.data
  state._value = props.value
  state.groups = props.groups

  return state
}

export const getCurrentDataTitle = (
  selectedItem: string | number,
  data: DrawerListInternalData
) => {
  const currentData = getCurrentData(selectedItem, data)
  return parseContentTitle(currentData, {
    separator: ' ',
    preferSelectedValue: true,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findClosest = (arr: any[], val: number) =>
  Math.max.apply(
    null,
    arr.filter((v: number) => v <= val)
  )
