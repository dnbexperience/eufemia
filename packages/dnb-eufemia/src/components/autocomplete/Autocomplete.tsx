/**
 * Web Autocomplete Component
 */

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import clsx from 'clsx'
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListOptionsRender,
  DrawerListSuffix,
  DrawerListDataArrayObject,
  DrawerListInternalData,
  DrawerListInternalItem,
} from '../../fragments/DrawerList'
import type { ButtonIconPosition, ButtonSize } from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import {
  warn,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getStatusState,
  combineDescribedBy,
  convertJsxToString,
  escapeRegexChars,
  getClosestParent,
} from '../../shared/component-helper'
import { IS_MAC, debounce, hasSelectedText } from '../../shared/helpers'
import useId from '../../shared/helpers/useId'
import useMountEffect from '../../shared/helpers/useMountEffect'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { createSpacingClasses } from '../space/SpacingHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import Suffix from '../../shared/helpers/Suffix'
import AriaLive from '../aria-live/AriaLive'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import Input, {
  SubmitButton,
  type InputSubmitButtonProps,
} from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import { ItemContent } from '../../fragments/drawer-list/DrawerListItem'
import type { DrawerListContextValue } from '../../fragments/drawer-list/DrawerListContext'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  parseContentTitle,
  getCurrentData,
  getCurrentIndex,
  normalizeData,
} from '../../fragments/drawer-list/DrawerListHelpers'

export type AutocompleteOnClearParams = {
  value: string
  previousValue: string | number | null
  event: React.SyntheticEvent | Event
}

type AutocompleteMode = 'sync' | 'async'
type AutocompleteAlign = 'left' | 'right'
type FormLabelLabelDirection = 'horizontal' | 'vertical'
type AutocompleteTitle = string | React.ReactNode
type AutocompletePlaceholder = string | React.ReactNode
type AutocompleteNoOptions = React.ReactNode
type AutocompleteShowAll = string | React.ReactNode
type AutocompleteAriaLiveOptions = string | React.ReactNode
type AutocompleteIndicatorLabel = string | React.ReactNode
type AutocompleteSubmitButtonIcon =
  | string
  | React.ReactNode
  | (() => React.ReactNode)
type AutocompleteInputRef =
  | ((element: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement | undefined>
type AutocompleteInputIcon =
  | string
  | React.ReactNode
  | (() => React.ReactNode)
type AutocompleteInputElement =
  | ((...args: any[]) => React.ReactNode)
  | React.ReactNode
type AutocompleteSearchInWordIndex = string | number
type AutocompleteSearchMatch = 'word' | 'starts-with'

export type AutocompleteData = DrawerListData
export type AutocompleteOptionsRender = DrawerListOptionsRender

export type AutocompleteEventMethods = {
  attributes: Record<string, unknown>
  dataList: DrawerListData
  updateData: (data: DrawerListData) => void
  revalidateSelectedItem: () => void
  revalidateInputValue: () => void
  resetSelectedItem: () => void
  clearInputValue: () => void
  showAllItems: () => void
  setVisible: () => void
  resetInputValue: () => void
  setHidden: () => void
  emptyData: () => void
  focusInput: () => void
  setInputValue: (value: string) => void
  showNoOptionsItem: () => void
  showIndicatorItem: () => void
  showIndicator: () => void
  hideIndicator: () => void
  setMode: (mode: 'sync' | 'async') => void
  debounce: (
    func: (...args: unknown[]) => void,
    props?: Record<string, unknown>,
    wait?: number
  ) => void
}
export type AutocompleteOnTypeParams = {
  value: string
  event: React.ChangeEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
} & AutocompleteEventMethods
export type AutocompleteOnFocusParams = {
  value: string
  event: React.FocusEvent<HTMLInputElement>
} & AutocompleteEventMethods
export type AutocompleteOnBlurParams = {
  value?: string
  event?: React.FocusEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods

export type AutocompleteOnChangeParams = {
  value?: string
  event?: React.FocusEvent<HTMLInputElement>
  data: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods
export type AutocompleteOnSelectParams = {
  activeItem: number | string
  selectedItem?: number | string | null
  value: string | number
  data: DrawerListDataArrayObject | string | null
  event: React.SyntheticEvent
} & AutocompleteEventMethods

export type AutocompleteProps = {
  /**
   * If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.
   */
  mode?: AutocompleteMode
  /**
   * Give a title to let the user know what they have to do.
   */
  title?: AutocompleteTitle
  /**
   * Pre-filled placeholder text in the input.
   */
  placeholder?: AutocompletePlaceholder
  /**
   * Text shown in the "no options" item. If set to `false`, the list will not be rendered when there are no options.
   */
  noOptions?: AutocompleteNoOptions
  /**
   * Text that lets a user unravel all the available options.
   */
  showAll?: AutocompleteShowAll
  /**
   * Text read out by screen readers to announce number of options.
   */
  ariaLiveOptions?: AutocompleteAriaLiveOptions
  /**
   * Text shown on indicator item.
   */
  indicatorLabel?: AutocompleteIndicatorLabel
  /**
   * Screen-reader title for the button that opens options.
   */
  showOptionsSr?: string
  /**
   * Label used to announce the selected item for screen readers.
   */
  selectedSr?: string
  /**
   * If set to `true`, the whole input value gets selected on focus.
   */
  selectAll?: boolean
  /**
   * Title on submit button.
   */
  submitButtonTitle?: string
  /**
   * The icon used in the submit button.
   */
  submitButtonIcon?: AutocompleteSubmitButtonIcon
  /**
   * React ref for access to the input DOM element.
   */
  inputRef?: AutocompleteInputRef
  /**
   * Icon to be included in the autocomplete input.
   */
  icon?: IconIcon
  /**
   * Change icon size.
   */
  iconSize?: IconSize
  /**
   * Icon position inside autocomplete.
   */
  iconPosition?: ButtonIconPosition
  /**
   * Same as `icon`.
   */
  inputIcon?: AutocompleteInputIcon
  /**
   * Prepends the form label.
   */
  label?: React.ReactNode
  /**
   * Set `vertical` to change label layout direction.
   */
  labelDirection?: FormLabelLabelDirection
  /**
   * Makes label readable by screen readers only.
   */
  labelSrOnly?: boolean
  /**
   * Keep typed value on blur even when invalid.
   */
  keepValue?: boolean
  /**
   * Keep selected item on blur when input value is empty.
   */
  keepSelection?: boolean
  /**
   * Keep typed value and selected item on blur.
   */
  keepValueAndSelection?: boolean
  /**
   * Show clear button inside input.
   */
  showClearButton?: boolean
  /**
   * Keep highlighting but disable filtering.
   */
  disableFilter?: boolean
  /**
   * Disable reordering of search results.
   */
  disableReorder?: boolean
  /**
   * Disable highlighting but keep filtering.
   */
  disableHighlighting?: boolean
  /**
   * Show autocomplete submit/toggle button.
   */
  showSubmitButton?: boolean
  /**
   * Replace submit button with a custom element.
   */
  submitElement?: React.ReactNode
  /**
   * Change options alignment.
   */
  align?: AutocompleteAlign
  /**
   * Provide a custom input element.
   */
  inputElement?: AutocompleteInputElement
  /**
   * Threshold deciding from which word to search inside words.
   */
  searchInWordIndex?: AutocompleteSearchInWordIndex
  /**
   * Search matching mode.
   */
  searchMatch?: AutocompleteSearchMatch
  /**
   * Better number searching/filtering behavior.
   */
  searchNumbers?: boolean
  /**
   * Auto-open list on focus.
   */
  openOnFocus?: boolean
  disabled?: boolean
  /**
   * Stretch to full available width.
   */
  stretch?: boolean
  /**
   * Show skeleton loading overlay.
   */
  skeleton?: SkeletonShow
  /**
   * Additional content rendered as suffix.
   */
  suffix?: DrawerListSuffix
  /**
   * Custom class for internal drawer list.
   */
  drawerClass?: string
  /**
   * Selected value.
   */
  value?: string | number
  /**
   * Initial selected value.
   */
  defaultValue?: string | number
  /**
   * Controlled input value.
   */
  inputValue?: string
  size?: DrawerListProps['size']
  data?: DrawerListData
  /**
   * Will be called once the Autocomplete shows up.
   */
  onOpen?: (event: AutocompleteOnTypeParams) => void
  /**
   * Will be called once the Autocomplete gets closed.
   */
  onClose?: (event: AutocompleteOnTypeParams) => void
  onType?: (event: AutocompleteOnTypeParams) => void
  onFocus?: (event: AutocompleteOnFocusParams) => void
  onBlur?: (event: AutocompleteOnBlurParams) => void
  onChange?: (event: AutocompleteOnChangeParams) => void
  onSelect?: (event: AutocompleteOnSelectParams) => void
  onClear?: (event: AutocompleteOnClearParams) => void
}

export type AutocompleteAllProps = AutocompleteProps &
  FormStatusBaseProps &
  Omit<DrawerListProps, 'onChange' | 'onSelect'> &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'title'
    | 'placeholder'
    | 'data'
    | 'children'
    | 'onChange'
    | 'onFocus'
    | 'onOpen'
    | 'onClose'
    | 'onSelect'
    | 'onResize'
    | 'onBlur'
  >

const autocompleteDefaultProps: Partial<AutocompleteAllProps> & {
  mode: AutocompleteMode
} = {
  id: null,
  mode: 'sync',
  title: 'Option Menu',
  placeholder: null,
  noOptions: null,
  showAll: null,
  ariaLiveOptions: null,
  indicatorLabel: null,
  showOptionsSr: null,
  selectedSr: null,
  submitButtonTitle: null,
  submitButtonIcon: 'chevron_down',
  inputRef: null,
  icon: null,
  iconSize: null,
  iconPosition: 'left',
  arrowPosition: null,
  inputIcon: 'loupe',
  label: null,
  labelDirection: null,
  labelSrOnly: null,
  keepValue: null,
  keepSelection: null,
  keepValueAndSelection: null,
  showClearButton: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  disableFilter: false,
  disableReorder: false,
  scrollable: true,
  focusable: false,
  disableHighlighting: false,
  maxHeight: null,
  direction: 'auto',
  skipPortal: null,
  noAnimation: false,
  noScrollAnimation: false,
  showSubmitButton: false,
  submitElement: null,
  preventSelection: false,
  size: 'default',
  align: null,
  optionsRender: null,
  data: null,
  searchInWordIndex: null,
  searchNumbers: null,
  defaultValue: null,
  value: 'initval',
  inputValue: 'initval',
  autoComplete: 'off',
  openOnFocus: false,
  preventClose: false,
  keepOpen: false,
  open: null,
  disabled: null,
  stretch: null,
  skeleton: null,
  portalClass: null,
  drawerClass: null,
  pageOffset: null,
  observerElement: null,
  enableBodyLock: false,

  className: null,
  children: null,

  onOpen: null,
  onClose: null,
  onType: null,
  onFocus: null,
  onBlur: null,
  onChange: null,
  onSelect: null,
  onClear: null,
  inputElement: null,
}

function Autocomplete(props: AutocompleteAllProps) {
  const _id = useId(props.id)

  const providerProps = {
    ...props,
    id: _id,
    data: props.data || props.children,
    open: null,
    tagName: 'dnb-autocomplete',
    ignoreEvents: false,
    preventFocus: true,
    skipKeysearch: true,
  } as unknown as Partial<DrawerListProps>

  return (
    <DrawerListProvider {...providerProps}>
      <AutocompleteInstance {...props} id={_id} />
    </DrawerListProvider>
  )
}

type SearchIndexItem = {
  dataItem: DrawerListDataArrayObject | DrawerListInternalItem
  contentChunk: string | null
}

type DebouncedEventFunction = (props?: Record<string, unknown>) => void

function parseDataItem(
  dataItem: DrawerListDataArrayObject | DrawerListInternalItem
): string | null {
  const searchWord = parseContentTitle(
    dataItem.searchContent || dataItem,
    {
      separator: ' ',
    }
  )
  if (typeof searchWord !== 'string' && Array.isArray(searchWord)) {
    return parseDataItem(searchWord)
  }
  return searchWord
}

function createSearchIndex(
  data: DrawerListInternalData
): SearchIndexItem[] {
  return data.map((dataItem) => {
    const contentChunk = parseDataItem(dataItem)
    return { dataItem, contentChunk }
  })
}

function getCurrentDataTitle(
  selectedItem: string | number,
  data: DrawerListInternalData
): string | null {
  const currentData = getCurrentData(selectedItem, data)
  return parseContentTitle(currentData, {
    separator: ' ',
    preferSelectedValue: true,
  })
}

function AutocompleteInstance(ownProps: AutocompleteAllProps) {
  const context = useContext<
    DrawerListContextValue & {
      Autocomplete: Record<string, unknown>
    }
    // @ts-expect-error -- strictFunctionTypes
  >(DrawerListContext)
  const drawerList = context.drawerList

  // Filter out undefined values to mimic React class component defaultProps behavior.
  // Without this, explicit undefined values (e.g. size={undefined}) would override
  // defaults and prevent context values from being merged.
  const filteredOwnProps = Object.fromEntries(
    Object.entries(ownProps).filter(([, v]) => v !== undefined)
  )

  // Merge props with context and defaults
  const props = extendPropsWithContext(
    filteredOwnProps,
    autocompleteDefaultProps,
    context.getTranslation?.(ownProps)?.Autocomplete,
    pickFormElementProps(context?.formElement),
    context?.Autocomplete
  )

  const {
    title,
    placeholder,
    label,
    labelDirection,
    labelSrOnly,
    icon,
    iconSize,
    inputIcon,
    size,
    align,
    fixedPosition,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    scrollable,
    focusable,
    keepOpen,
    keepValue,
    keepValueAndSelection,
    keepSelection,
    showClearButton,
    preventClose,
    noAnimation,
    noScrollAnimation,
    showSubmitButton,
    submitElement,
    inputElement: CustomInput,
    optionsRender,
    preventSelection,
    maxHeight,
    defaultValue,
    searchNumbers,
    searchInWordIndex,
    searchMatch,
    showOptionsSr,
    selectedSr,
    submitButtonTitle,
    submitButtonIcon,
    portalClass,
    drawerClass,
    inputRef,
    className,
    disabled,
    stretch,
    skeleton,
    arrowPosition,
    iconPosition,
    skipPortal,
    independentWidth,
    autoComplete,
    openOnFocus,
    disableFilter,
    disableReorder,
    onClear,
    selectAll,

    mode: _mode,
    data: _data,
    children: _children,
    direction: _direction,
    pageOffset: _pageOffset,
    observerElement: _observerElement,
    id: _id,
    open: _open,
    value: _value,
    inputValue: _inputValue,
    enableBodyLock: _enableBodyLock,
    listClass: _listClass,
    indicatorLabel: _indicatorLabel,
    noOptions: _noOptions,
    showAll: _showAll,
    ariaLiveOptions: _ariaLiveOptions,
    disableHighlighting: _disableHighlighting,

    onOpen: _onOpen,
    onType: _onType,
    onFocus: _onFocus,
    onBlur: _onBlur,
    onClose: _onClose,
    onChange: _onChange,
    onSelect: _onSelect,

    ...attributes
  } = props

  // State
  const [inputValue, setInputValueState] = useState<string | null>(() => {
    if (props.inputValue !== 'initval' && props.inputValue != null) {
      return props.inputValue
    }
    if (drawerList && drawerList.currentTitle) {
      return drawerList.currentTitle
    }
    return null
  })
  const [typedInputValue, setTypedInputValue] = useState<string | null>(
    null
  )
  const [mode, setModeState] = useState(props.mode)
  const [hasFocus, setHasFocus] = useState(false)
  const hasBlurRef = useRef(false)
  const setHasBlur = useCallback((v: boolean) => {
    hasBlurRef.current = v
  }, [])
  const [showAllNextTime, setShowAllNextTime] = useState(false)
  const [skipFocusDuringChange, setSkipFocusDuringChange] = useState(false)
  const [disableHighlightingState, setDisableHighlighting] = useState(
    props.disableHighlighting
  )
  const [visibleIndicator, setVisibleIndicator] = useState(false)
  const [searchIndex, setSearchIndexState] = useState<
    SearchIndexItem[] | null
  >(null)

  // Refs
  const _ref = useRef<HTMLElement>(null)
  const _refShell = useRef<HTMLSpanElement>(null)
  const _refInput = useRef<HTMLInputElement>(null)
  const _selectTimeout = useRef<NodeJS.Timeout>(null)
  const _blurTimeout = useRef<NodeJS.Timeout>(null)
  const _focusTimeout = useRef<NodeJS.Timeout>(null)
  const showAllTimeoutRef = useRef<NodeJS.Timeout>(null)
  const preventFiringBlurEvent = useRef<boolean | null>(null)
  const closingFromChangeRef = useRef(false)
  const suppressFocusHandlerRef = useRef(false)
  const selectAllActiveRef = useRef(false)
  const debouncedEventFnsRef = useRef<
    Record<string, DebouncedEventFunction>
  >({})
  const cacheMemoryRef = useRef<Record<string, unknown>>({})
  const attributesRef = useRef<Record<string, unknown>>({})
  const wasVisibleRef = useRef(false)
  const skipFilterRef = useRef(disableFilter)
  const skipReorderRef = useRef(disableReorder)
  const searchIndexRef = useRef(searchIndex)
  const prevDataRef = useRef(props.data)
  const dataChangedRef = useRef(false)
  const lastUpdateDataRef = useRef<DrawerListInternalData | null>(null)
  const prevValueRef = useRef(props.value)
  const prevInputValuePropRef = useRef(props.inputValue)
  const prevDisableHighlightingRef = useRef(props.disableHighlighting)
  const inputValueRef = useRef(inputValue)
  const typedInputValueRef = useRef(typedInputValue)
  const modeRef = useRef(mode)
  const hasFocusRef = useRef(hasFocus)

  // Keep refs in sync with state for use in callbacks
  searchIndexRef.current = searchIndex
  inputValueRef.current = inputValue
  typedInputValueRef.current = typedInputValue
  modeRef.current = mode
  hasFocusRef.current = hasFocus

  // Ref-based access to drawerList and props to avoid stale closures
  // and unnecessary callback re-creation when these objects change identity.
  const drawerListRef = useRef(drawerList)
  drawerListRef.current = drawerList
  const propsRef = useRef(props)
  propsRef.current = props

  // Helper functions (no deps on state that changes often)

  const hasInjectedDataItem = useCallback(
    (data = drawerList.data) => {
      const lastItem = data.slice(-1)[0]
      return lastItem
        ? lastItem.showAll || String(lastItem.__id) === 'noOptions'
        : false
    },
    [drawerList.data]
  )

  const countData = useCallback(
    (data = drawerList.data) => {
      const count = data.length
      return count > 0 && hasInjectedDataItem(data) ? count - 1 : count
    },
    [drawerList.data, hasInjectedDataItem]
  )

  const hasValidData = useCallback(
    (data = drawerList.data) => {
      if (countData(data) > 0) {
        const first = data[0]
        if (
          !first.showAll &&
          !['noOptions', 'indicator'].includes(String(first.__id))
        ) {
          return true
        }
      }
      return false
    },
    [drawerList.data, countData]
  )

  const hasSelectedItem = useCallback(() => {
    return parseFloat(String(drawerListRef.current.selectedItem)) > -1
  }, [])

  const hasActiveItem = useCallback(() => {
    return parseFloat(String(drawerList.activeItem)) > -1
  }, [drawerList.activeItem])

  const hasFilterActive = useCallback(
    (data = drawerListRef.current.data) => {
      const originalData = drawerListRef.current.originalData
      return !(originalData && originalData.length === countData(data))
    },
    [countData]
  )

  const focusDrawerList = useCallback(() => {
    try {
      drawerList._refUl.current.focus({
        preventScroll: true,
      })
    } catch (e) {
      // do nothing
    }
  }, [drawerList._refUl])

  const focusInput = useCallback(() => {
    try {
      if (_refInput.current) {
        _refInput.current.focus({
          preventScroll: true,
        })
      }
    } catch (e) {
      warn(e)
    }
  }, [])

  const setVisible = useCallback(
    (
      args: Record<string, unknown> | null = null,
      onStateComplete: (() => void) | null = null
    ) => {
      wasVisibleRef.current = true
      drawerListRef.current
        .setWrapperElement(_ref.current)
        .setVisible(args, onStateComplete)
    },
    []
  )

  const setHidden = useCallback(
    (
      args: unknown[] | null = null,
      onStateComplete: (() => void) | null = null
    ) => {
      drawerListRef.current.setHidden(args, onStateComplete)
      setHasFocus(false)
      setHasBlur(false)
    },
    [setHasBlur]
  )

  const resetActiveItem = useCallback(() => {
    drawerListRef.current.setState({
      activeItem: null,
    })
  }, [])

  const resetFilter = useCallback(() => {
    drawerListRef.current.setData(drawerListRef.current.originalData)
  }, [])

  const setInputValue = useCallback((val: string | null) => {
    setInputValueState(val)
  }, [])

  const clearInputValue = useCallback(() => {
    setInputValueState('')
    setTypedInputValue(null)
  }, [])

  const ignoreEvents = useCallback(() => {
    clearTimeout(showAllTimeoutRef.current)
    drawerListRef.current.setState(
      {
        ignoreEvents: true,
      },
      () => {
        showAllTimeoutRef.current = setTimeout(() => {
          drawerListRef.current.setState({
            ignoreEvents: false,
          })
        }, 10)
      }
    )
  }, [])

  const showAllItems = useCallback(() => {
    resetFilter()
    drawerListRef.current.setState({
      cacheHash: 'all',
    })
    drawerListRef.current.setActiveItemAndScrollToIt(
      drawerListRef.current.selectedItem,
      {
        scrollTo: false,
      }
    )
  }, [resetFilter])

  const setSearchIndex = useCallback(
    (
      {
        overwriteSearchIndex = false,
        data = drawerList.originalData,
      }: {
        overwriteSearchIndex?: boolean
        data?: DrawerListInternalData
      } = {},
      cb: (() => void) | null = null
    ) => {
      cacheMemoryRef.current = {}

      if (!overwriteSearchIndex && searchIndexRef.current) {
        return searchIndexRef.current
      }

      const newSearchIndex = createSearchIndex(data)

      setSearchIndexState(newSearchIndex)
      searchIndexRef.current = newSearchIndex

      if (cb) {
        cb()
      }

      return newSearchIndex
    },
    [drawerList.originalData]
  )

  const revalidateSelectedItem = useCallback(() => {
    const selectedItem = getCurrentIndex(
      props.value,
      drawerListRef.current.originalData
    )

    drawerListRef.current.setState({
      selectedItem,
    })
  }, [props.value])

  const revalidateInputValue = useCallback(() => {
    if (props.inputValue && props.inputValue !== 'initval') {
      return // stop here
    }
    const selectedItem = getCurrentIndex(
      props.value,
      drawerListRef.current.originalData
    )
    const usedInputValue = getCurrentDataTitle(
      selectedItem,
      drawerListRef.current.originalData
    )
    setInputValue(usedInputValue)
  }, [props.inputValue, props.value, setInputValue])

  const resetSelectedItem = useCallback(() => {
    const hadValue = hasSelectedItem()
    drawerListRef.current.setState(
      {
        selectedItem: null,
      },
      () => {
        if (hadValue) {
          dispatchCustomElementEvent(propsRef.current, 'onChange', {
            ...getEventObjects('onChange'),
          })
        }
      }
    )
  }, [hasSelectedItem])

  const totalReset = useCallback(() => {
    setInputValueState(null)
    setTypedInputValue(null)
    resetActiveItem()
    resetSelectedItem()
  }, [resetActiveItem, resetSelectedItem])

  const resetInputValue = useCallback(() => {
    if (
      keepValue ||
      keepValueAndSelection ||
      (props.inputValue !== 'initval' && props.inputValue?.length > 0)
    ) {
      return // stop here
    }

    clearTimeout(_selectTimeout.current)
    _selectTimeout.current = setTimeout(() => {
      if (hasSelectedItem()) {
        const val = getCurrentDataTitle(
          drawerListRef.current.selectedItem,
          drawerListRef.current.originalData
        )
        setInputValue(val)
      } else {
        clearInputValue()
      }
    }, 1)
  }, [
    keepValue,
    keepValueAndSelection,
    props.inputValue,
    hasSelectedItem,
    setInputValue,
    clearInputValue,
  ])

  const showNoOptionsItem = useCallback(() => {
    resetActiveItem()
    ignoreEvents()
    drawerListRef.current.setData(
      props.noOptions === false
        ? []
        : [
            {
              className: 'dnb-autocomplete__no-options',
              content: props.noOptions,
              ignoreEvents: true,
              __id: 'noOptions',
            },
          ]
    )
    drawerListRef.current.setState({
      cacheHash: 'noOptions',
    })
    setVisible()
  }, [resetActiveItem, ignoreEvents, props.noOptions, setVisible])

  const showIndicatorItem = useCallback(() => {
    resetActiveItem()
    ignoreEvents()
    drawerListRef.current.setData([
      {
        className: 'dnb-autocomplete__indicator',
        content: <ProgressIndicator label={props.indicatorLabel} />,
        ignoreEvents: true,
        __id: 'indicator',
      },
    ])
    drawerListRef.current.setState({
      cacheHash: 'indicator',
    })
    setVisible()
  }, [resetActiveItem, ignoreEvents, props.indicatorLabel, setVisible])

  const showIndicator = useCallback(() => {
    setVisibleIndicator(true)
  }, [])

  const hideIndicator = useCallback(() => {
    setVisibleIndicator(false)
  }, [])

  const setMode = useCallback((newMode: AutocompleteMode) => {
    setModeState(newMode)
  }, [])

  const wrapWithShowAll = useCallback(
    (data: DrawerListInternalData) => {
      if (!data || !hasFilterActive(data)) {
        return data
      }

      const lastItem = drawerListRef.current.originalData.slice(-1)[0]
      if (lastItem && !lastItem.showAll) {
        const lastActiveItem = data.slice(-1)[0]
        if (lastActiveItem) {
          data.push({
            __id: lastItem.__id + 1,
            lastActiveItem: lastActiveItem.__id,
            className: 'dnb-autocomplete__show-all',
            showAll: true,
            activeItem: false,
            selectedItem: false,
            content: (
              <>
                <IconPrimary icon="arrow_down" />
                {props.showAll}
              </>
            ),
          })
        }
      }

      return data
    },
    [hasFilterActive, props.showAll]
  )

  const runFilter = useCallback(
    (
      value: string | null,
      {
        data = null,
        searchIndex: siParam = searchIndexRef.current,
        searchNumbers: snParam = props.searchNumbers,
        inWordIndex = parseFloat(
          String(
            props.searchInWordIndex ?? (skipFilterRef.current ? 1 : 3)
          )
        ) - 1,
        disableHighlighting: disableHL = false,
        skipFilter = false,
        skipReorder = false,
      }: {
        data?: DrawerListInternalData | null
        searchIndex?: SearchIndexItem[] | null
        searchNumbers?: boolean
        inWordIndex?: number
        disableHighlighting?: boolean
        skipFilter?: boolean
        skipReorder?: boolean
      } = {}
    ) => {
      let currentSearchIndex = siParam

      if (data) {
        currentSearchIndex = setSearchIndex({ data })
      } else if (!currentSearchIndex) {
        currentSearchIndex = setSearchIndex()
      }

      if (typeof currentSearchIndex === 'undefined') {
        return []
      }

      const startsWithMatch = props.searchMatch === 'starts-with'
      const rawValue = value ?? ''
      let searchWords = rawValue.split(/\s+/g).filter(Boolean)

      if (startsWithMatch) {
        // @ts-expect-error Unicode property escapes are supported at runtime here
        const hasLetters = /[\p{L}]/u.test(rawValue)
        // @ts-expect-error Unicode property escapes are supported at runtime here
        const hasNumbers = /[\p{N}]/u.test(rawValue)
        if (startsWithMatch && snParam && hasNumbers && !hasLetters) {
          // @ts-expect-error Unicode property escapes are supported at runtime here
          const normalizedNumeric = rawValue.replace(/[^\p{N}]+/gu, '')
          searchWords = normalizedNumeric ? [normalizedNumeric] : []
        }
      }

      const getWordBoundary = (wordIndex: number) =>
        startsWithMatch && wordIndex === 0 ? '^' : snParam ? '' : '^|\\s'

      const searchWordsData = searchWords.map((word, wordIndex) => {
        const processedWord = snParam
          ? // @ts-expect-error Unicode property escapes are supported at runtime here
            word.replace(/[^\p{L}\p{N}]+/gu, '')
          : escapeRegexChars(word)
        const wordBoundary = getWordBoundary(wordIndex)

        return {
          originalWord: word,
          processedWord,
          wordIndex,
          filterRegex: new RegExp(
            wordIndex >= inWordIndex
              ? `${processedWord}`
              : `(${wordBoundary})${processedWord}`,
            'i'
          ),
          scoreRegex: new RegExp(
            `(${wordBoundary})${escapeRegexChars(word)}`,
            'ig'
          ),
        }
      })

      const firstWordRegex =
        searchWords.length > 0
          ? new RegExp(`^${escapeRegexChars(searchWords[0])}`, 'i')
          : null

      const findSearchWords = (contentChunk: string | null) => {
        if (typeof contentChunk !== 'string') {
          return []
        }

        return searchWordsData
          .filter(({ filterRegex }) => {
            if (filterRegex.test(contentChunk)) {
              return true
            }

            if (
              snParam &&
              filterRegex.test(contentChunk.replace(/[^0-9]/g, ''))
            ) {
              return true
            }

            return false
          })
          .map(({ originalWord, wordIndex, scoreRegex }) => {
            let wordScore = 0

            wordScore += (contentChunk.match(scoreRegex) || []).length

            if (wordIndex === 0 && firstWordRegex) {
              const isFirstWord = firstWordRegex.test(
                contentChunk.split(' ')[0]
              )

              if (isFirstWord) {
                wordScore += searchWords.length + 1
              }
            }

            return {
              word: originalWord,
              wordIndex,
              wordScore,
            }
          })
      }

      const strS = '\uFFFE'
      const strE = '\uFFFF'

      const mappedIndex: Array<
        | DrawerListDataArrayObject
        | { totalScore: number; item: SearchIndexItem }
      > = currentSearchIndex.map((item) => {
        const listOfFoundWords = findSearchWords(item.contentChunk)

        const allWordsAreNumeric = snParam
          ? // @ts-expect-error Unicode property escapes are supported at runtime here
            searchWords.every((word) => /^[\p{N}\s.,]+$/u.test(word))
          : false

        const hasMultipleNumericTerms =
          snParam &&
          searchWords &&
          searchWords.length > 1 &&
          allWordsAreNumeric
        if (
          hasMultipleNumericTerms &&
          listOfFoundWords.length !== searchWords.length
        ) {
          return { totalScore: 0, item }
        }

        if (typeof item.dataItem === 'string') {
          item.dataItem = { content: item.dataItem }
        }

        if (!item.dataItem.render) {
          item.dataItem = { ...item.dataItem }
        }

        item.dataItem.render = (
          children: React.ReactNode,
          id: string
        ): React.ReactNode => {
          if (disableHL || disableHighlightingState) {
            return children
          }

          const cacheHash = id + value
          cacheMemoryRef.current = cacheMemoryRef.current || {}
          if (cacheMemoryRef.current[cacheHash]) {
            return cacheMemoryRef.current[cacheHash] as React.ReactNode
          }

          const isComponent =
            typeof children !== 'string' && React.isValidElement(children)

          let childArray: Array<React.ReactNode>
          if (
            isComponent &&
            Array.isArray(
              (
                children as React.ReactElement<{
                  children?: React.ReactNode[]
                }>
              ).props?.children
            )
          ) {
            childArray = (
              children as React.ReactElement<{
                children: React.ReactNode[]
              }>
            ).props.children
          } else if (!Array.isArray(children)) {
            childArray = [children]
          } else {
            childArray = children
          }

          const segments = childArray.map((originalChild) => ({
            originalChild,
            segment: convertJsxToString(originalChild, ' '),
          }))

          const processed = segments.map(
            ({ originalChild, segment }, idx) => {
              searchWords.forEach((word, wordIndex) => {
                if (segment) {
                  word = escapeRegexChars(word)

                  if (snParam) {
                    const cleanedWord = word.replace(
                      // @ts-expect-error Unicode property escapes are supported at runtime here
                      /[^\p{L}\p{N}]+/gu,
                      ''
                    )
                    if (cleanedWord) {
                      const escapedWord = escapeRegexChars(cleanedWord)
                      segment = segment.replace(
                        new RegExp(`(${escapedWord})`, 'gi'),
                        (match) => {
                          if (match.includes(strS)) {
                            return match
                          }
                          return `${strS}${match}${strE}`
                        }
                      )
                    }
                  } else {
                    if (wordIndex >= inWordIndex) {
                      segment = segment.replace(
                        new RegExp(`(${word})`, 'gi'),
                        `${strS}$1${strE}`
                      )
                    } else {
                      segment = segment.replace(
                        new RegExp(
                          `(${getWordBoundary(wordIndex)})(${word})`,
                          'gi'
                        ),
                        `$1${strS}$2${strE}`
                      )
                    }
                  }
                }
              })

              let result: React.ReactNode = segment

              if (segment.includes(strS)) {
                const startRepeatRegex = new RegExp(`(${strS})+`, 'g')
                const endRepeatRegex = new RegExp(`(${strE})+`, 'g')
                const adjacentRegex = new RegExp(`(${strE}${strS})`, 'g')
                const splitRegex = new RegExp(`(${strS}|${strE})`, 'g')

                const normalized = segment
                  .replace(startRepeatRegex, strS)
                  .replace(endRepeatRegex, strE)
                  .replace(adjacentRegex, '')

                const tokens = normalized.split(splitRegex).filter(Boolean)

                let isHighlighted = false
                let highlightIndex = 0
                const parts = tokens.map((token) => {
                  if (token === strS) {
                    isHighlighted = true
                    return null
                  }
                  if (token === strE) {
                    isHighlighted = false
                    return null
                  }

                  if (isHighlighted) {
                    const key = `highlight-${cacheHash}-${idx}-${highlightIndex++}`
                    return (
                      <span
                        key={key}
                        className="dnb-drawer-list__option__item--highlight"
                      >
                        {token}
                      </span>
                    )
                  }

                  return token
                })

                result = <span key={cacheHash + idx}>{parts}</span>
              } else {
                result = <span key={cacheHash + idx}>{segment}</span>
              }

              if (isComponent) {
                const element = originalChild as React.ReactElement<{
                  children?: React.ReactNode | React.ReactNode[]
                }>
                if (Array.isArray(element?.props?.children)) {
                  result = element.props.children.map(
                    (Comp: React.ReactNode) => {
                      const compEl = Comp as React.ReactElement<{
                        children?: React.ReactNode
                      }>
                      return Comp === originalChild ||
                        (compEl.props &&
                          compEl.props.children === originalChild)
                        ? result
                        : Comp
                    }
                  )
                } else if (typeof originalChild === 'string') {
                  result = originalChild
                }

                if (
                  React.isValidElement<Record<string, unknown>>(
                    originalChild
                  )
                ) {
                  result = React.createElement(
                    originalChild.type as React.ComponentType<any>,
                    {
                      ...originalChild.props,
                      key: 'clone' + cacheHash + idx,
                    },
                    result
                  )
                }
              }

              return result
            }
          )

          return (cacheMemoryRef.current[cacheHash] = processed)
        }

        if (skipFilterRef.current || skipFilter) {
          return item.dataItem
        }

        let totalScore = listOfFoundWords.length
        for (const { wordScore } of listOfFoundWords) {
          totalScore += wordScore
        }

        return {
          totalScore,
          item,
        }
      })

      if (!skipFilterRef.current && !skipFilter) {
        type ScoredItem = { totalScore: number; item: SearchIndexItem }
        const scored = (mappedIndex as ScoredItem[]).filter(
          ({ totalScore }) => totalScore
        )

        if (!skipReorderRef.current && !skipReorder) {
          scored.sort(({ totalScore: a }, { totalScore: b }) => b - a)
        }

        return scored.map(
          ({ item }) => item.dataItem
        ) as DrawerListInternalData
      }

      return mappedIndex as DrawerListInternalData
    },
    [
      setSearchIndex,
      props.searchMatch,
      props.searchNumbers,
      props.searchInWordIndex,
      disableHighlightingState,
    ]
  )

  const runFilterToHighlight = useCallback(
    (
      {
        fillDataIfEmpty = false,
        ...options
      }: {
        fillDataIfEmpty?: boolean
        skipFilter?: boolean
        value?: string
      } = {},
      value: string | null = inputValueRef.current
    ) => {
      const possibleTitle = getCurrentDataTitle(
        drawerListRef.current.selectedItem,
        drawerListRef.current.originalData
      )

      if (value === possibleTitle) {
        return // stop here
      }

      value = String(value || '').trim()

      setDisableHighlighting(false)

      let data: DrawerListInternalData = runFilter(value, options)

      if (fillDataIfEmpty && data.length === 0 && value === '') {
        data = drawerListRef.current.originalData
      }

      drawerListRef.current.setData(wrapWithShowAll(data))
      drawerListRef.current.setState({
        cacheHash: value + countData(data),
      })

      return data
    },
    [runFilter, wrapWithShowAll, countData]
  )

  const runFilterWithSideEffects = useCallback(
    (
      value: string | null,
      options: {
        data?: DrawerListInternalData | null
        searchIndex?: SearchIndexItem[] | null
        searchNumbers?: boolean
        inWordIndex?: number
        disableHighlighting?: boolean
        skipFilter?: boolean
        skipReorder?: boolean
      } = {}
    ) => {
      const data: DrawerListInternalData = runFilter(value, options)
      const count = countData(data)

      if (value?.length > 0) {
        if (count === 0) {
          if (modeRef.current !== 'async') {
            showNoOptionsItem()
          }
        } else if (count > 0) {
          drawerListRef.current.setData(wrapWithShowAll(data))
          drawerListRef.current.setState({
            cacheHash: value + count,
          })

          if (count === 1) {
            drawerListRef.current.setState({
              activeItem: (data[0] as DrawerListInternalItem).__id,
            })
          }
        }
      } else {
        if (!keepValue && !keepSelection && !keepValueAndSelection) {
          totalReset()
        } else if (keepValue) {
          resetSelectedItem()
        }

        showAllItems()

        if (inputValueRef.current?.length > 0) {
          setVisible()
        }
      }

      if (hasFocusRef.current) {
        setVisible()
      }

      return data
    },
    [
      runFilter,
      countData,
      showNoOptionsItem,
      wrapWithShowAll,
      keepValue,
      keepSelection,
      keepValueAndSelection,
      totalReset,
      resetSelectedItem,
      showAllItems,
      setVisible,
    ]
  )

  const showAll = useCallback(() => {
    resetFilter()

    drawerListRef.current.setState({
      cacheHash: 'all',
    })

    runFilterToHighlight({
      skipFilter: true,
      fillDataIfEmpty: true,
    })
  }, [resetFilter, runFilterToHighlight])

  const setVisibleByContext = useCallback(
    (
      options: Record<string, unknown> | null = {},
      onStateComplete: (() => void) | null = null
    ) => {
      const skipFilter = showAllNextTime
      if (skipFilter) {
        setShowAllNextTime(false)
      }

      runFilterToHighlight({
        fillDataIfEmpty: true,
        skipFilter,
        ...options,
      })

      setVisible(null, onStateComplete)
    },
    [showAllNextTime, runFilterToHighlight, setVisible]
  )

  const toggleVisible = useCallback(
    (
      args: { hasFilter?: boolean } | null = null,
      onStateComplete: (() => void) | null = null
    ) => {
      args = args || {}
      if (typeof args.hasFilter === 'undefined') {
        args.hasFilter = false
      }
      if (disabled) {
        return // stop here
      }
      if (
        !args.hasFilter &&
        !preventClose &&
        !drawerList.hidden &&
        drawerList.isOpen
      ) {
        setHidden(null, onStateComplete)
      } else {
        setVisibleByContext(null, onStateComplete)
      }
    },
    [
      disabled,
      preventClose,
      drawerList.hidden,
      drawerList.isOpen,
      setHidden,
      setVisibleByContext,
    ]
  )

  const toggleVisibleAndFocusOptions = useCallback(() => {
    drawerListRef.current.toggleVisible(null, (isVisible) => {
      if (isVisible) {
        focusDrawerList()
      }
    })
  }, [focusDrawerList])

  const hasDatasetChanged = useCallback(
    (rawData: DrawerListInternalData) => {
      const { selectedItem } = drawerListRef.current
      if (parseFloat(String(selectedItem)) > -1) {
        const newItem = rawData?.[selectedItem]
        const oldItem = drawerListRef.current.originalData[selectedItem]
        if (newItem?.selectedKey !== oldItem?.selectedKey) {
          return true
        }
      }
      return false
    },
    []
  )

  const emptyData = useCallback(() => {
    cacheMemoryRef.current = {}

    clearInputValue()

    drawerListRef.current.setData(
      () => [],
      () => {
        setSearchIndex({ overwriteSearchIndex: true }, null)
        resetActiveItem()
        totalReset()
      },
      {
        overwriteOriginalData: true,
      }
    )
  }, [clearInputValue, setSearchIndex, resetActiveItem, totalReset])

  const updateData = useCallback(
    (rawData: DrawerListInternalData) => {
      if (rawData === lastUpdateDataRef.current) {
        return // Already updated with this data
      }
      lastUpdateDataRef.current = rawData

      const hasChanged = hasDatasetChanged(rawData)

      drawerListRef.current.setState(
        {
          cacheHash: 'updateData',
        },
        () => {
          if (hasChanged) {
            if (
              propsRef.current.value &&
              propsRef.current.value !== 'initval'
            ) {
              revalidateSelectedItem()
              revalidateInputValue()
            } else {
              resetSelectedItem()
            }
          }
        }
      )

      drawerListRef.current.setData(
        () => rawData,
        (newData) => {
          setSearchIndex(
            { overwriteSearchIndex: true, data: newData },
            () => {
              const typed = typedInputValueRef.current

              if (typed?.length > 0) {
                const filteredData: DrawerListInternalData =
                  runFilterWithSideEffects(typed)
                if (countData(filteredData) === 0) {
                  if (modeRef.current !== 'async') {
                    showNoOptionsItem()
                  }
                }
              } else {
                resetActiveItem()

                if (drawerListRef.current.open) {
                  showAllItems()
                }
              }
            }
          )
        },
        {
          overwriteOriginalData: true,
        }
      )
    },
    [
      hasDatasetChanged,
      revalidateSelectedItem,
      revalidateInputValue,
      resetSelectedItem,
      setSearchIndex,
      runFilterWithSideEffects,
      countData,
      showNoOptionsItem,
      resetActiveItem,
      showAllItems,
    ]
  )

  // Keep latest event helper functions in a ref so that getEventObjects
  // always returns the current versions, even when called from stale
  // useCallback closures (e.g. onSelectHandler with deps: []).
  const eventMethodsRef =
    useRef<
      Omit<
        AutocompleteEventMethods,
        'attributes' | 'dataList' | 'debounce'
      >
    >(null)
  eventMethodsRef.current = {
    // @ts-expect-error -- strictFunctionTypes
    updateData,
    revalidateSelectedItem,
    revalidateInputValue,
    resetSelectedItem,
    clearInputValue,
    showAllItems,
    setVisible,
    resetInputValue,
    setHidden,
    emptyData,
    focusInput,
    setInputValue,
    showNoOptionsItem,
    showIndicatorItem,
    showIndicator,
    hideIndicator,
    setMode,
  }

  // Build event objects for dispatching
  function getEventObjects(key: string): AutocompleteEventMethods {
    return {
      attributes: attributesRef.current,
      dataList: drawerListRef.current.data,
      ...eventMethodsRef.current,
      debounce: (func, cbProps = {}, wait = 250) => {
        const existingDebouncedFn = debouncedEventFnsRef.current[key]

        if (existingDebouncedFn) {
          return existingDebouncedFn(cbProps)
        }

        const newDebouncedFn = debounce(
          func,
          wait
        ) as DebouncedEventFunction
        debouncedEventFnsRef.current[key] = newDebouncedFn

        return newDebouncedFn(cbProps)
      },
    }
  }

  const setFocusOnInput = useCallback(() => {
    // Suppress onInputFocusHandler during programmatic refocus
    // to prevent double onFocus dispatch (matching class component behavior)
    suppressFocusHandlerRef.current = true
    focusInput()
    suppressFocusHandlerRef.current = false
  }, [focusInput])

  const setVisibleAndFocusOnInput = useCallback(() => {
    if (!hasFocusRef.current && !hasSelectedText()) {
      setFocusOnInput()
      setVisible()
    }
  }, [setFocusOnInput, setVisible])

  // Event handlers
  const onInputChangeHandler = useCallback(
    ({
      value: val,
      event,
    }: {
      value: string
      event: React.ChangeEvent<HTMLInputElement>
    }) => {
      selectAllActiveRef.current = false
      setTypedInputValue(val)
      setInputValueState(val)

      dispatchCustomElementEvent(propsRef.current, 'onType', {
        value: val,
        event,
        ...getEventObjects('onType'),
      })

      const trimmed = String(val).trim()
      if (trimmed !== inputValueRef.current) {
        runFilterWithSideEffects(trimmed)
      }
    },
    [runFilterWithSideEffects]
  )

  const onInputKeyDownHandler = useCallback(
    ({ event: e }: { event: React.KeyboardEvent }) => {
      const key = e.key

      switch (key) {
        case 'PageUp':
        case 'PageDown':
        case 'Home':
        case 'End':
          e.preventDefault()
          break

        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          if (!drawerList.open) {
            setVisible()
          }
          break

        case 'Escape':
          setShowAllNextTime(true)
          break

        case 'Enter':
          e.preventDefault()

          if (!drawerList.open && hasFilterActive()) {
            ignoreEvents()
            showAll()
          }

          if (
            (!hasValidData() || !hasSelectedItem()) &&
            !hasActiveItem()
          ) {
            toggleVisible()
          } else {
            setVisible()
          }

          break
      }
    },
    [
      drawerList.open,
      setVisible,
      hasFilterActive,
      ignoreEvents,
      showAll,
      hasValidData,
      hasSelectedItem,
      hasActiveItem,
      toggleVisible,
    ]
  )

  const onInputClickHandler = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (!drawerList.open && hasFilterActive()) {
        ignoreEvents()
        showAll()
      }

      const { value } = e.target as HTMLInputElement
      setVisibleByContext({ value })
    },
    [
      drawerList.open,
      hasFilterActive,
      ignoreEvents,
      showAll,
      setVisibleByContext,
    ]
  )

  const onInputFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (skipFocusDuringChange) {
        return // stop here
      }

      if (suppressFocusHandlerRef.current) {
        return // stop here
      }

      if (!hasFocusRef.current) {
        if (openOnFocus && hasValidData()) {
          const { value } = event.target
          setVisibleByContext({ value })
        } else {
          setSearchIndex({}, null)
        }

        if (keepValueAndSelection) {
          showAll()
        }

        if (selectAll) {
          selectAllActiveRef.current = true
        }

        setHasFocus(true)
        setHasBlur(false)

        dispatchCustomElementEvent(propsRef.current, 'onFocus', {
          event,
          ...getEventObjects('onFocus'),
        })
      }
    },
    [
      skipFocusDuringChange,
      openOnFocus,
      hasValidData,
      setVisibleByContext,
      setSearchIndex,
      keepValueAndSelection,
      showAll,
      selectAll,
      setHasBlur,
    ]
  )

  const reserveActivityHandler = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent) => {
      preventFiringBlurEvent.current = Boolean(
        ('key' in event && event.key === 'Enter') ||
          (event?.currentTarget
            ? getClosestParent('dnb-drawer-list', event.currentTarget) ||
              getClosestParent(
                'dnb-input__submit-button__button',
                event.currentTarget
              )
            : false)
      )

      if (preventFiringBlurEvent.current) {
        setTimeout(
          () => {
            preventFiringBlurEvent.current = false
          },
          noAnimation ? 1 : DrawerList.blurDelay
        )
      }
    },
    [noAnimation]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (
        preventFiringBlurEvent.current ||
        drawerList.hasFocusOnElement ||
        hasBlurRef.current
      ) {
        preventFiringBlurEvent.current = null
        return false
      }

      selectAllActiveRef.current = false
      setHasBlur(true)
      setHasFocus(false)

      if (!keepValue && !keepValueAndSelection) {
        setTypedInputValue(null)
      }

      if (!preventSelection) {
        const existingValue = inputValueRef.current

        resetInputValue()

        const resetAfterClose = () => {
          if (!keepValue || !existingValue || hasSelectedItem()) {
            resetActiveItem()
          }
          resetFilter()
        }

        if (noAnimation) {
          resetAfterClose()
        } else {
          clearTimeout(_blurTimeout.current)
          _blurTimeout.current = setTimeout(
            resetAfterClose,
            DrawerList.blurDelay
          )
        }
      }

      if (openOnFocus) {
        setHidden()
      }

      dispatchCustomElementEvent(propsRef.current, 'onBlur', {
        event,
        ...getEventObjects('onBlur'),
      })
    },
    [
      drawerList.hasFocusOnElement,
      keepValue,
      keepValueAndSelection,
      preventSelection,
      noAnimation,
      openOnFocus,
      resetInputValue,
      hasSelectedItem,
      resetActiveItem,
      resetFilter,
      setHidden,
      setHasBlur,
    ]
  )

  const onTriggerKeyDownHandler = useCallback(
    (e: React.KeyboardEvent) => {
      const key = e.key

      switch (key) {
        case ' ':
        case 'Enter':
          {
            setVisible()
          }
          break
      }

      switch (key) {
        case ' ':
        case 'Enter':
        case 'PageUp':
        case 'PageDown':
        case 'ArrowDown':
        case 'ArrowUp':
          {
            e.preventDefault()
            focusInput()
          }
          break
      }
    },
    [setVisible, focusInput]
  )

  const onCloseHandler = useCallback(
    (args: Record<string, unknown> = {}) => {
      const res = dispatchCustomElementEvent(propsRef.current, 'onClose', {
        ...args,
        ...getEventObjects('onClose'),
      })

      if (res !== false && !closingFromChangeRef.current) {
        setFocusOnInput()
      }

      return res
    },
    [setFocusOnInput]
  )

  const onSelectHandler = useCallback(
    (args: { activeItem: string | number; [key: string]: unknown }) => {
      if (parseFloat(String(args.activeItem)) > -1) {
        dispatchCustomElementEvent(propsRef.current, 'onSelect', {
          ...args,
          ...getEventObjects('onSelect'),
        })
      }
    },
    []
  )

  const onPreChangeHandler = useCallback(
    ({
      data,
    }: {
      data: DrawerListDataArrayObject & {
        showAll?: boolean
        lastActiveItem?: string | number
      }
    }) => {
      if (data && data.showAll) {
        showAll()

        const activeItem = data.lastActiveItem
        if (parseFloat(String(activeItem)) > -1) {
          drawerListRef.current.setActiveItemAndScrollToIt(activeItem, {
            scrollTo: false,
          })
        }

        setFocusOnInput()

        return false
      }
    },
    [showAll, setFocusOnInput]
  )

  const onChangeHandler = useCallback(
    (args: {
      selectedItem: string | number
      data?: DrawerListDataArrayObject
      [key: string]: unknown
    }) => {
      const selectedItem = args.selectedItem

      if (!preventSelection) {
        if (!keepOpen) {
          setSkipFocusDuringChange(true)
          setDisableHighlighting(true)

          // Note: closingFromChangeRef is set/reset synchronously here, before
          // onCloseHandler fires asynchronously after React re-renders.
          // This means onCloseHandler always sees `false` and calls setFocusOnInput.
          // This matches the class component behavior where onCloseHandler always
          // refocused the input, so the guard is intentionally ineffective.
          closingFromChangeRef.current = true
          setHidden()

          // Do this, so screen readers get a NEW focus later on
          // So we first need a blur of the input basically
          focusDrawerList()

          closingFromChangeRef.current = false
          setSkipFocusDuringChange(false)

          // Deferred refocus — matches class component's setState callback timing
          _focusTimeout.current = setTimeout(() => setFocusOnInput(), 0)
        }

        const val = getCurrentDataTitle(
          selectedItem,
          drawerListRef.current.data
        )
        setInputValue(val)
      }

      if (typeof args.data?.render === 'function') {
        delete args.data.render
      }

      dispatchCustomElementEvent(propsRef.current, 'onChange', {
        ...args,
        ...getEventObjects('onChange'),
      })
    },
    [
      preventSelection,
      keepOpen,
      setHidden,
      focusDrawerList,
      setFocusOnInput,
      setInputValue,
    ]
  )

  // Handle prop-driven state updates (replaces getDerivedStateFromProps)
  if (props.disableHighlighting !== prevDisableHighlightingRef.current) {
    prevDisableHighlightingRef.current = props.disableHighlighting
    setDisableHighlighting(props.disableHighlighting)
  }

  if (
    props.inputValue !== 'initval' &&
    props.inputValue !== prevInputValuePropRef.current
  ) {
    prevInputValuePropRef.current = props.inputValue
    setInputValueState(props.inputValue)
  }

  if (props.data !== prevDataRef.current) {
    // Handle the case where data transitions from empty to populated
    if (props.data?.length > 0 && prevDataRef.current?.length === 0) {
      let selectedItem = drawerList.selectedItem

      if (props.defaultValue) {
        selectedItem = props.defaultValue
      }

      if (
        !props.defaultValue &&
        props.value &&
        props.value !== 'initval'
      ) {
        selectedItem = props.value
      }

      const currentData = getCurrentData(
        selectedItem,
        normalizeData(props.data)
      )

      const newInputValue = parseContentTitle(currentData, {
        separator: ' ',
        preferSelectedValue: true,
      })
      setInputValueState(newInputValue)
    }

    prevDataRef.current = props.data
    dataChangedRef.current = true
  }

  // Forward inputRef (replaces componentDidMount inputRef handling)
  useEffect(() => {
    if (inputRef && _refInput.current) {
      if (typeof inputRef === 'function') {
        inputRef(_refInput.current)
      } else {
        inputRef.current = _refInput.current
      }
    }
  }, [inputRef])

  // Handle open prop on mount
  useMountEffect(() => {
    if (props.open) {
      runFilterToHighlight({ fillDataIfEmpty: true })
      setVisible()
    }
  })

  // Handle data changes (replaces getDerivedStateFromProps updateData + componentDidUpdate data check)
  useEffect(() => {
    if (dataChangedRef.current) {
      dataChangedRef.current = false

      // Reset the dedup guard so updateData always runs here,
      // matching the v11 class componentDidUpdate which had no guard.
      // Without this, updateData is skipped when it was already called
      // (e.g. from SelectCountry's onFocus handler) with the same data
      // reference, preventing the async setData callback chain from
      // restoring all items via showAllItems().
      lastUpdateDataRef.current = null

      updateData(props.data)
      if (drawerList.open || hasFocus) {
        // Match class componentDidUpdate: re-run filter after updating the
        // search index so highlight and visibility are handled consistently.
        setSearchIndex({ overwriteSearchIndex: true }, () => {
          runFilterWithSideEffects(inputValueRef.current)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data])

  // Handle value prop changes (replaces componentDidUpdate value check)
  useEffect(() => {
    if (props.value !== prevValueRef.current) {
      prevValueRef.current = props.value
      revalidateSelectedItem()
      revalidateInputValue()
    }
  }, [props.value, revalidateSelectedItem, revalidateInputValue])

  // Cleanup timeouts on unmount
  useMountEffect(() => {
    return () => {
      clearTimeout(_selectTimeout.current)
      clearTimeout(_blurTimeout.current)
      clearTimeout(_focusTimeout.current)
      clearTimeout(showAllTimeoutRef.current)
    }
  })

  // Handle selectAll: re-apply input text selection after each render
  // during the focus cascade. The Input's setTimeout-based selectAll
  // is insufficient because cascading re-renders in the functional
  // component reset the controlled input's selection.
  useIsomorphicLayoutEffect(() => {
    if (selectAllActiveRef.current && _refInput.current) {
      try {
        _refInput.current.select()
      } catch (e) {
        // ignore
      }
    }
  })

  // Render
  const showStatus = getStatusState(status)

  const { id, hidden, selectedItem, direction, open } = drawerList

  const isExpanded = Boolean(open) && hasValidData()

  attributesRef.current = validateDOMAttributes(null, attributes)
  Object.assign(drawerList.attributes, attributesRef.current)

  const mainParams = {
    className: clsx(
      'dnb-autocomplete',
      direction && `dnb-autocomplete--${direction}`,
      disabled && 'dnb-autocomplete--disabled',
      open && 'dnb-autocomplete--open',
      labelDirection && `dnb-autocomplete--${labelDirection}`,
      iconPosition && `dnb-autocomplete--icon-position-${iconPosition}`,
      align && `dnb-autocomplete--${align}`,
      visibleIndicator && 'dnb-autocomplete--show-indicator',
      size && `dnb-autocomplete--${size}`,
      stretch && `dnb-autocomplete--stretch`,
      status && `dnb-autocomplete__status--${statusState}`,
      showStatus && 'dnb-autocomplete__form-status',
      'dnb-form-component',
      createSpacingClasses(props),
      className
    ),
  }

  const shellParams = {
    className: 'dnb-autocomplete__shell dnb-no-focus',
    ref: _refShell,
  }

  const inputParams = {
    className: 'dnb-autocomplete__input',
    id,
    value: inputValue ?? '',
    placeholder: undefined,
    autoCapitalize: 'none',
    spellCheck: false,
    autoCorrect: 'off',
    autoComplete,

    role: 'combobox',
    'aria-autocomplete': 'both' as const,
    'aria-controls': isExpanded ? `${id}-ul` : undefined,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': isExpanded,

    onMouseDown: onInputClickHandler,
    onKeyDown: onInputKeyDownHandler,
    onChange: onInputChangeHandler,
    onFocus: onInputFocusHandler,
    onBlur: onBlurHandler,
    iconPosition: iconPosition,
    disabled,
    skeleton,
    ...attributes,
  }

  if (!(parseFloat(String(selectedItem)) > -1)) {
    inputParams.placeholder = placeholder || title
  }

  inputParams['aria-placeholder'] = undefined

  if (isExpanded) {
    inputParams['aria-activedescendant'] = drawerList.ariaActiveDescendant
  }

  if (showStatus || suffix) {
    inputParams['aria-describedby'] = combineDescribedBy(
      inputParams,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }

  const { iconPosition: _iconPosition, ...customInputParams } = inputParams

  let submitButton: React.ReactNode = false
  const triggerParams = {
    id: id + '-submit-button',
    disabled,
    status: status ? statusState : null,
    onKeyDown: onTriggerKeyDownHandler,
    onSubmit: toggleVisible as any as InputSubmitButtonProps['onSubmit'],
    onMouseDown: reserveActivityHandler,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': isExpanded,
    'aria-label': !hidden ? submitButtonTitle : undefined,
    tooltip: showSubmitButton ? submitButtonTitle : null,
    className: open ? 'dnb-button--active' : null,
  }

  if (
    submitElement &&
    React.isValidElement<Record<string, unknown>>(submitElement)
  ) {
    submitButton = React.createElement(
      submitElement.type as React.ComponentType<any>,
      {
        ...submitElement.props,
        ...triggerParams,
      }
    )
  } else if (showSubmitButton) {
    submitButton = (
      <SubmitButton
        icon={submitButtonIcon as IconIcon}
        iconSize={iconSize || (size === 'large' ? 'medium' : 'default')}
        variant="secondary"
        size={size === 'default' ? 'medium' : (size as ButtonSize)}
        type="button"
        status={status}
        statusState={statusState}
        statusProps={statusProps}
        {...triggerParams}
      />
    )
  }

  const currentDataItem = getCurrentData(
    selectedItem,
    drawerList.originalData
  )

  const innerId =
    showStatus || suffix || currentDataItem?.suffixValue
      ? `${id}-inner`
      : null

  validateDOMAttributes(null, mainParams)
  validateDOMAttributes(null, shellParams)

  // VoiceOver support helper
  const voiceOverActiveItem = (() => {
    const { activeItem, selectedItem } = drawerList
    const currentDataItemVO = getCurrentData(activeItem, drawerList.data)

    return (
      <AriaLive hidden={!IS_MAC} priority="high" delay={0}>
        {currentDataItemVO && (
          <>
            {activeItem === selectedItem ? <>{selectedSr} </> : null}
            <ItemContent>{currentDataItemVO}</ItemContent>
          </>
        )}
      </AriaLive>
    )
  })()

  // AriaLive update helper
  const ariaLiveUpdate = (() => {
    if (open) {
      const count = countData()

      let newString = null

      if (count > 0) {
        newString = String(props.ariaLiveOptions).replace(
          '%s',
          String(count)
        )
      } else {
        newString = props.noOptions
      }

      return newString
    }

    return ''
  })()

  return (
    <span {...mainParams}>
      {label && (
        <FormLabel
          id={id + '-label'}
          forId={id}
          text={label}
          labelDirection={labelDirection}
          srOnly={labelSrOnly}
          disabled={disabled}
          skeleton={skeleton}
          onClick={toggleVisible as unknown as React.MouseEventHandler}
        />
      )}

      <span className="dnb-autocomplete__inner" ref={_ref} id={innerId}>
        <AlignmentHelper />

        <FormStatus
          show={showStatus}
          id={id + '-form-status'}
          globalStatus={globalStatus}
          label={label}
          textId={id + '-status'}
          text={status}
          state={statusState}
          noAnimation={statusNoAnimation}
          skeleton={skeleton}
          widthSelector={innerId}
          {...statusProps}
        />

        <span className="dnb-autocomplete__row">
          <span {...shellParams}>
            {CustomInput ? (
              React.createElement(
                CustomInput as React.ElementType,
                customInputParams
              )
            ) : (
              <Input
                icon={
                  visibleIndicator ? (
                    <ProgressIndicator
                      size={size === 'large' ? 'medium' : 'small'}
                    />
                  ) : (
                    (inputIcon as IconIcon)
                  )
                }
                iconSize={
                  iconSize || (size === 'large' ? 'medium' : 'default')
                }
                size={size}
                status={status ? statusState : null}
                statusState={statusState}
                type={null}
                innerElement={
                  currentDataItem?.suffixValue && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <span
                      onClick={disabled ? null : setVisibleAndFocusOnInput}
                      className="dnb-autocomplete__suffixValue"
                    >
                      {currentDataItem?.suffixValue}
                    </span>
                  )
                }
                submitElement={submitButton}
                inputState={skipFocusDuringChange ? 'focus' : undefined}
                clear={showClearButton}
                onClear={onClear}
                ref={_refInput}
                {...inputParams}
                {...statusProps}
              />
            )}

            {!submitButton && (
              <span className="dnb-sr-only">
                <button
                  tabIndex={-1}
                  type="button"
                  onClick={toggleVisibleAndFocusOptions}
                >
                  {showOptionsSr}
                </button>
              </span>
            )}

            <DrawerList
              id={id}
              className={clsx('dnb-autocomplete__root', drawerClass)}
              portalClass={portalClass}
              listClass="dnb-autocomplete__list"
              value={selectedItem}
              defaultValue={defaultValue}
              scrollable={scrollable}
              focusable={focusable}
              noAnimation={noAnimation}
              noScrollAnimation={noScrollAnimation}
              skipPortal={skipPortal}
              preventSelection={preventSelection}
              arrowPosition={arrowPosition || iconPosition}
              keepOpen={keepOpen}
              preventClose={preventClose}
              alignDrawer={align}
              fixedPosition={fixedPosition}
              disabled={disabled}
              maxHeight={maxHeight}
              direction={direction}
              size={size}
              optionsRender={optionsRender}
              onChange={onChangeHandler}
              onSelect={onSelectHandler}
              onClose={onCloseHandler}
              onPreChange={onPreChangeHandler}
              onKeyDown={reserveActivityHandler}
              onMouseDown={reserveActivityHandler}
              independentWidth={independentWidth}
            />
          </span>

          {suffix && (
            <Suffix
              className="dnb-autocomplete__suffix"
              id={id + '-suffix'}
              context={props}
            >
              {suffix}
            </Suffix>
          )}
        </span>
      </span>

      {wasVisibleRef.current ? voiceOverActiveItem : null}

      {wasVisibleRef.current ? (
        <AriaLive priority="high">{ariaLiveUpdate}</AriaLive>
      ) : null}
    </span>
  )
}

Autocomplete.HorizontalItem = DrawerList.HorizontalItem

withComponentMarkers(Autocomplete, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Autocomplete
