/**
 * Web Autocomplete Component
 */

import {
  createElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type {
  ChangeEvent,
  ComponentType,
  ElementType,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { clsx } from 'clsx'
import type {
  DrawerListProps,
  DrawerListSelectEvent,
  DrawerListDataArrayObject,
  DrawerListInternalData,
  DrawerListInternalItem,
} from '../../fragments/DrawerList'
import type { ButtonSize } from '../Button'
import type { IconIcon } from '../Icon'
import {
  prepareSearchWords,
  findMatchingWords,
  calculateTotalScore,
  passesNumericTermsCheck,
} from '../../shared/search'
import {
  warn,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getStatusState,
  combineDescribedBy,
  getClosestParent,
} from '../../shared/component-helper'
import { IS_MAC, debounce, hasSelectedText } from '../../shared/helpers'
import { highlightText } from '../../shared/helpers/highlightText'
import useId from '../../shared/helpers/useId'
import useMountEffect from '../../shared/helpers/useMountEffect'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import Context from '../../shared/Context'
import { useSpacing } from '../space/SpacingUtils'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import Suffix from '../../shared/helpers/Suffix'
import AriaLive from '../aria-live/AriaLive'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import Icon from '../icon/Icon'
import { chevron_down, chevron_up } from '../../icons'
import Input, { SubmitButton } from '../input/Input'
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
import type {
  AutocompleteAllProps,
  AutocompleteEventMethods,
} from './types'
import type { AutocompleteMode } from './internal-types'

export type * from './types'

const autocompleteChevron = Icon.transition({
  closed: chevron_down,
  open: chevron_up,
})

const autocompleteDefaultProps: Partial<AutocompleteAllProps> & {
  mode: AutocompleteMode
} = {
  id: null,
  mode: 'sync',
  placeholder: null,
  noOptions: null,
  showAll: null,
  ariaLiveOptions: null,
  indicatorLabel: null,
  showOptionsSr: null,
  selectedSr: null,
  submitButtonTitle: null,
  submitButtonIcon: autocompleteChevron,
  inputRef: null,
  icon: 'loupe',
  iconSize: null,
  iconPosition: 'left',
  label: null,
  labelDirection: 'vertical',
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
  inline: false,
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
  onSubmit: null,
  inputElement: null,
}

function Autocomplete(ownProps: AutocompleteAllProps) {
  const context = useContext(Context)
  const filteredOwnProps = Object.fromEntries(
    Object.entries(ownProps).filter(([, value]) => value !== undefined)
  )
  const { inline, disabled } = extendPropsWithContext(
    filteredOwnProps,
    autocompleteDefaultProps,
    context.getTranslation?.(ownProps)?.Autocomplete,
    pickFormElementProps(context.formElement),
    context.Autocomplete
  )

  const _id = useId(ownProps.id)

  const providerProps = {
    ...ownProps,
    id: _id,
    data: ownProps.data || ownProps.children,
    inline,
    open: inline ? true : null,
    noAnimation: inline || ownProps.noAnimation,
    preventClose: inline || ownProps.preventClose,
    skipPortal: inline || ownProps.skipPortal,
    tagName: 'dnb-autocomplete',
    ignoreEvents: inline && disabled,
    preventFocus: true,
    skipKeysearch: true,
  } as unknown as Partial<DrawerListProps>

  return (
    <DrawerListProvider {...providerProps}>
      <AutocompleteComponent {...ownProps} id={_id} />
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

function AutocompleteComponent(ownProps: AutocompleteAllProps) {
  const context = useContext(
    DrawerListContext
  ) as DrawerListContextValue & {
    Autocomplete: Record<string, unknown>
  }
  const drawerList = context.drawerList

  // Filter out undefined values so that explicit undefined (e.g. size={undefined})
  // does not override defaults or prevent context values from being merged.
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
    inline,
    submitElement,
    inputElement: CustomInput,
    optionsRender,
    listDriver,
    preventSelection,
    maxHeight,
    defaultValue,
    searchNumbers,
    searchInWordIndex,
    searchMatch,
    search,
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
    iconPosition,
    skipPortal,
    independentWidth,
    autoComplete,
    openOnFocus,
    disableFilter: _deprecatedDisableFilter,
    disableReorder: _deprecatedDisableReorder,
    onClear,
    selectAll,
    noDivider,

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
    disableHighlighting: _deprecatedDisableHighlighting,

    onOpen: _onOpen,
    onType: _onType,
    onFocus: _onFocus,
    onBlur: _onBlur,
    onClose: _onClose,
    onChange: _onChange,
    onSelect: _onSelect,
    onSubmit: _onSubmit,
    onItemMouseEnter,

    ...attributes
  } = props

  // Resolve search config: `search` prop takes precedence over deprecated props.
  // @deprecated - The fallbacks to deprecated props below ensure backward compatibility.
  // Remove these fallbacks when the deprecated props are removed.
  const disableFilter =
    search?.filter !== undefined
      ? !search.filter
      : _deprecatedDisableFilter // @deprecated fallback
  const disableReorder =
    search?.reorder !== undefined
      ? !search.reorder
      : _deprecatedDisableReorder // @deprecated fallback
  const _disableHighlighting =
    search?.highlight !== undefined
      ? !search.highlight
      : _deprecatedDisableHighlighting // @deprecated fallback
  const resolvedSearchNumbers =
    search?.numbers !== undefined ? search.numbers : searchNumbers // @deprecated fallback
  const resolvedSearchInWordIndex =
    search?.matchInsideWordsFrom !== undefined
      ? search.matchInsideWordsFrom
      : searchInWordIndex != null
        ? Number(searchInWordIndex)
        : undefined // @deprecated fallback
  const resolvedSearchMatch =
    search?.match !== undefined ? search.match : searchMatch // @deprecated fallback

  // Deprecation warnings for old search-related props (fire once per instance)
  const hasWarnedDeprecatedSearchRef = useRef(false)
  if (
    process.env.NODE_ENV !== 'production' &&
    !hasWarnedDeprecatedSearchRef.current
  ) {
    hasWarnedDeprecatedSearchRef.current = true
    if (_deprecatedDisableFilter) {
      warn(
        'Autocomplete: `disableFilter` is deprecated. Use `search={{ filter: false }}` instead.'
      )
    }
    if (_deprecatedDisableReorder) {
      warn(
        'Autocomplete: `disableReorder` is deprecated. Use `search={{ reorder: false }}` instead.'
      )
    }
    if (_deprecatedDisableHighlighting) {
      warn(
        'Autocomplete: `disableHighlighting` is deprecated. Use `search={{ highlight: false }}` instead.'
      )
    }
    if (searchNumbers != null) {
      warn(
        'Autocomplete: `searchNumbers` is deprecated. Use `search={{ numbers: true }}` instead.'
      )
    }
    if (searchInWordIndex != null) {
      warn(
        'Autocomplete: `searchInWordIndex` is deprecated. Use `search={{ matchInsideWordsFrom: number }}` instead.'
      )
    }
    if (searchMatch != null) {
      warn(
        'Autocomplete: `searchMatch` is deprecated. Use `search={{ match: "word" | "starts-with" }}` instead.'
      )
    }
  }

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
    _disableHighlighting
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
  const prevDisableHighlightingRef = useRef(_disableHighlighting)
  const prevInlineRef = useRef(inline)
  const inputValueRef = useRef(inputValue)
  const typedInputValueRef = useRef(typedInputValue)
  const modeRef = useRef(mode)
  const hasFocusRef = useRef(hasFocus)

  // Set when a selection closes the drawer, so a data-prop change caused by
  // that selection (e.g. a fetch in the parent) does not immediately reopen it.
  // Cleared when the user types or genuinely focuses the input again.
  const preventReopenRef = useRef(false)

  // Keep refs in sync with state for use in callbacks
  skipFilterRef.current = disableFilter
  skipReorderRef.current = disableReorder
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
      warn('Autocomplete: Failed to focus input element:', e)
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

    // Re-compute selectedItem from current value and data to avoid
    // reading stale state. When updateData triggers both
    // revalidateSelectedItem and showAllItems in the same callback
    // cycle, the selectedItem state update from revalidateSelectedItem
    // may not have been committed yet.
    const selectedItem =
      getCurrentIndex(
        propsRef.current.value,
        drawerListRef.current.originalData
      ) ?? drawerListRef.current.selectedItem

    drawerListRef.current.setState({
      cacheHash: 'all',
    })
    drawerListRef.current.setActiveItemAndScrollToIt(selectedItem, {
      scrollTo: false,
    })
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
      return undefined // stop here
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
      return undefined // stop here
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
        content: (
          <ProgressIndicator
            label={props.indicatorLabel}
            labelDirection="horizontal"
          />
        ),
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
        numbers: snParam = resolvedSearchNumbers,
        matchInsideWordsFrom = resolvedSearchInWordIndex ??
          (skipFilterRef.current ? 1 : 3),
        disableHighlighting: disableHL = false,
        skipFilter = false,
        skipReorder = false,
      }: {
        data?: DrawerListInternalData | null
        searchIndex?: SearchIndexItem[] | null
        numbers?: boolean
        matchInsideWordsFrom?: number
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

      const searchOptions = {
        numbers: snParam,
        matchInsideWordsFrom,
        match: resolvedSearchMatch,
      }

      const prepared = prepareSearchWords(value, searchOptions)
      const { searchWords, matchInsideWordsFromIndex } = prepared

      const mappedIndex: Array<
        | DrawerListDataArrayObject
        | {
            matchedWordCount: number
            totalScore: number
            item: SearchIndexItem
          }
      > = currentSearchIndex.map((item) => {
        const listOfFoundWords = findMatchingWords(
          item.contentChunk,
          prepared
        )

        if (
          !skipFilterRef.current &&
          !skipFilter &&
          !passesNumericTermsCheck(listOfFoundWords, prepared)
        ) {
          return { matchedWordCount: 0, totalScore: 0, item }
        }

        if (typeof item.dataItem === 'string') {
          item.dataItem = { content: item.dataItem }
        }

        if (!item.dataItem.render) {
          item.dataItem = { ...item.dataItem }
        }

        item.dataItem.render = (
          children: ReactNode,
          id: string
        ): ReactNode => {
          if (disableHL || disableHighlightingState) {
            return children
          }

          const cacheHash = id + value
          cacheMemoryRef.current = cacheMemoryRef.current || {}
          if (cacheMemoryRef.current[cacheHash]) {
            return cacheMemoryRef.current[cacheHash] as ReactNode
          }

          const processed = highlightText(children, {
            search: searchWords,
            className: 'dnb-drawer-list__option__item--highlight',
            tag: 'span',
            searchMatch:
              resolvedSearchMatch === 'starts-with'
                ? 'starts-with'
                : 'word',
            searchNumbers: snParam,
            searchInWordIndex: matchInsideWordsFromIndex,
            wrapInSpan: true,
            keyPrefix: cacheHash,
          })

          return (cacheMemoryRef.current[cacheHash] = processed)
        }

        if (skipFilterRef.current || skipFilter) {
          return item.dataItem
        }

        const totalScore = calculateTotalScore(listOfFoundWords)

        return {
          matchedWordCount: listOfFoundWords.length,
          totalScore,
          item,
        }
      })

      if (!skipFilterRef.current && !skipFilter) {
        type ScoredItem = {
          matchedWordCount: number
          totalScore: number
          item: SearchIndexItem
        }
        const scored = (mappedIndex as ScoredItem[]).filter(
          ({ totalScore }) => totalScore
        )

        if (!skipReorderRef.current && !skipReorder) {
          scored.sort(
            (
              { matchedWordCount: matchedWordsA, totalScore: scoreA },
              { matchedWordCount: matchedWordsB, totalScore: scoreB }
            ) => matchedWordsB - matchedWordsA || scoreB - scoreA
          )
        }

        return scored.map(
          ({ item }) => item.dataItem
        ) as DrawerListInternalData
      }

      return mappedIndex as DrawerListInternalData
    },
    [
      setSearchIndex,
      resolvedSearchMatch,
      resolvedSearchNumbers,
      resolvedSearchInWordIndex,
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
        return undefined // stop here
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
        numbers?: boolean
        matchInsideWordsFrom?: number
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
          } else if (propsRef.current.listDriver) {
            drawerListRef.current.setState({ activeItem: -1 })
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

      const selectedTitle = getCurrentDataTitle(
        drawerListRef.current.selectedItem,
        drawerListRef.current.originalData
      )
      const shouldShowAll =
        !skipFilter && inputValueRef.current === selectedTitle

      if (shouldShowAll) {
        showAllItems()
      } else {
        runFilterToHighlight({
          fillDataIfEmpty: true,
          skipFilter,
          ...options,
        })
      }

      setVisible(null, onStateComplete)
    },
    [showAllNextTime, showAllItems, runFilterToHighlight, setVisible]
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
        return undefined // stop here
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
                // Skip re-running the visible filter (which can reopen the
                // drawer) when the drawer is closed because of a just-made
                // selection. It still runs while typing or when already open.
                if (
                  drawerListRef.current.open ||
                  !preventReopenRef.current
                ) {
                  const filteredData: DrawerListInternalData =
                    runFilterWithSideEffects(typed)
                  if (countData(filteredData) === 0) {
                    if (modeRef.current !== 'async') {
                      showNoOptionsItem()
                    }
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
    // to prevent double onFocus dispatch
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
      event: ChangeEvent<HTMLInputElement>
    }) => {
      selectAllActiveRef.current = false
      setTypedInputValue(val)
      setInputValueState(val)

      // Typing is a clear intent to (re)open and filter the list.
      preventReopenRef.current = false

      dispatchCustomElementEvent(propsRef.current, 'onType', {
        value: val,
        event,
        ...getEventObjects('onType'),
      })

      const trimmed = String(val).trim()
      runFilterWithSideEffects(trimmed)
    },
    [runFilterWithSideEffects]
  )

  const onInputKeyDownHandler = useCallback(
    ({ event: e }: { event: KeyboardEvent }) => {
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
          // If the DrawerList's capture-phase keydown handler already
          // handled this Enter event (selecting an item and closing),
          // it will have called preventDefault. Skip to avoid reopening.
          if (e.defaultPrevented) {
            break
          }

          e.preventDefault()

          if (!drawerList.open && hasFilterActive()) {
            ignoreEvents()
            showAll()
          }

          if (
            (!hasValidData() || !hasSelectedItem()) &&
            !hasActiveItem()
          ) {
            dispatchCustomElementEvent(propsRef.current, 'onSubmit', {
              value: inputValueRef.current ?? '',
              event: e,
              ...getEventObjects('onSubmit'),
            })
            toggleVisible()
          } else if (!drawerList.open) {
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
    (e: MouseEvent<HTMLInputElement>) => {
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
    (event: FocusEvent<HTMLInputElement>) => {
      if (skipFocusDuringChange) {
        return undefined // stop here
      }

      if (suppressFocusHandlerRef.current) {
        return undefined // stop here
      }

      // A genuine focus (not the programmatic refocus after a selection, which
      // is suppressed above) should allow focus-driven data fill to open again.
      preventReopenRef.current = false

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
    (event: KeyboardEvent | MouseEvent) => {
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
    (event: FocusEvent<HTMLInputElement>) => {
      if (
        preventFiringBlurEvent.current ||
        drawerList._hasFocusOnElementRef?.current ||
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

      return undefined
    },
    [
      drawerList._hasFocusOnElementRef,
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
    (e: KeyboardEvent) => {
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

  const onSelectHandler = useCallback((args: DrawerListSelectEvent) => {
    if (parseFloat(String(args.activeItem)) > -1) {
      dispatchCustomElementEvent(propsRef.current, 'onSelect', {
        ...args,
        ...getEventObjects('onSelect'),
      })
    }
  }, [])

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

      return undefined
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
          // onCloseHandler always refocuses the input, so the guard
          // is intentionally ineffective.
          closingFromChangeRef.current = true
          setHidden()

          // Prevent a data-prop change triggered by this selection (e.g. a
          // fetch in the parent) from reopening the just-closed drawer.
          preventReopenRef.current = true

          // Do this, so screen readers get a NEW focus later on
          // So we first need a blur of the input basically
          focusDrawerList()

          closingFromChangeRef.current = false
          setSkipFocusDuringChange(false)

          // Deferred refocus after state commits
          _focusTimeout.current = setTimeout(() => {
            setFocusOnInput()

            // Sync internal focus state so subsequent typing
            // correctly reopens the dropdown via runFilterWithSideEffects.
            // setHidden() above set hasFocus=false/hasBlur=false, and
            // setFocusOnInput() suppresses onInputFocusHandler to avoid
            // double onFocus dispatch, so we restore these manually.
            setHasFocus(true)
            setHasBlur(false)
          }, 0)
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
      setHasBlur,
    ]
  )

  // Handle prop-driven state updates
  if (_disableHighlighting !== prevDisableHighlightingRef.current) {
    prevDisableHighlightingRef.current = _disableHighlighting
    setDisableHighlighting(_disableHighlighting)
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

  // Forward inputRef
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
    if (props.open || inline) {
      runFilterToHighlight({ fillDataIfEmpty: true })
      if (!inline) {
        setVisible()
      }
    }
  })

  useEffect(() => {
    if (inline === prevInlineRef.current) {
      return // stop here
    }

    prevInlineRef.current = inline

    if (inline) {
      runFilterToHighlight({ fillDataIfEmpty: true })
    } else {
      setHidden()
    }
  }, [inline, runFilterToHighlight, setHidden])

  // Handle data changes
  useEffect(() => {
    if (dataChangedRef.current) {
      dataChangedRef.current = false

      // Reset the dedup guard so updateData always runs here.
      // Without this, updateData is skipped when it was already called
      // (e.g. from SelectCountry's onFocus handler) with the same data
      // reference, preventing the async setData callback chain from
      // restoring all items via showAllItems().
      lastUpdateDataRef.current = null

      updateData(props.data)

      // Refresh the visible list when the drawer is open, or when the input is
      // focused and the data change is not the result of a just-made selection
      // (e.g. focus-driven data fill should open the list, but a fetch caused
      // by a selection should not reopen the just-closed drawer).
      if (drawerList.open || (hasFocus && !preventReopenRef.current)) {
        // Re-run filter after updating the search index so highlight
        // and visibility are handled consistently.
        setSearchIndex({ overwriteSearchIndex: true }, () => {
          runFilterWithSideEffects(inputValueRef.current)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data])

  // Handle value prop changes
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

  const hasVisibleListContent = drawerList.data.length > 0
  const isExpanded = Boolean(open) && hasVisibleListContent

  attributesRef.current = validateDOMAttributes(null, attributes)
  Object.assign(drawerList.attributes, attributesRef.current)

  const mainParams = useSpacing(props, {
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
      className
    ),
  })

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

  let submitButton: ReactNode = false
  const triggerParams = {
    id: id + '-submit-button',
    disabled,
    status: status ? statusState : null,
    onKeyDown: onTriggerKeyDownHandler,
    onSubmit: () => toggleVisible(),
    onMouseDown: reserveActivityHandler,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': isExpanded,
    'aria-label': !hidden ? submitButtonTitle : undefined,
    tooltip: showSubmitButton ? submitButtonTitle : null,
  }

  if (
    !inline &&
    submitElement &&
    isValidElement<Record<string, unknown>>(submitElement)
  ) {
    submitButton = createElement(
      submitElement.type as ComponentType<any>,
      {
        ...submitElement.props,
        ...triggerParams,
      }
    )
  } else if (!inline && showSubmitButton) {
    submitButton = (
      <SubmitButton
        icon={
          <IconPrimary
            icon={submitButtonIcon as IconIcon}
            transitionState={isExpanded ? 'open' : 'closed'}
          />
        }
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

      if (count > 0) {
        return String(props.ariaLiveOptions).replace('%s', String(count))
      } else {
        return props.noOptions
      }
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
          onClick={toggleVisible as unknown as MouseEventHandler}
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
              createElement(CustomInput as ElementType, customInputParams)
            ) : (
              <Input
                icon={
                  visibleIndicator && icon ? (
                    <ProgressIndicator
                      size={size === 'large' ? 'medium' : 'small'}
                    />
                  ) : (
                    (icon as IconIcon)
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
                      className="dnb-autocomplete__suffix-value"
                    >
                      {currentDataItem?.suffixValue}
                    </span>
                  )
                }
                submitElement={submitButton}
                inputState={skipFocusDuringChange ? 'focus' : undefined}
                showClearButton={showClearButton}
                onClear={onClear}
                ref={_refInput}
                {...inputParams}
                {...statusProps}
              />
            )}

            {!submitButton && !inline && (
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
              noAnimation={inline || noAnimation}
              noScrollAnimation={inline || noScrollAnimation}
              skipPortal={skipPortal}
              inline={inline}
              ignoreEvents={inline && disabled}
              preventSelection={preventSelection}
              keepOpen={keepOpen}
              preventClose={preventClose}
              alignDrawer={align}
              noDivider={noDivider}
              fixedPosition={fixedPosition}
              disabled={disabled}
              maxHeight={maxHeight}
              direction={direction}
              size={size}
              optionsRender={optionsRender}
              listDriver={listDriver}
              onChange={onChangeHandler}
              onSelect={onSelectHandler}
              onClose={onCloseHandler}
              onPreChange={onPreChangeHandler}
              onKeyDown={reserveActivityHandler}
              onMouseDown={reserveActivityHandler}
              onItemMouseEnter={onItemMouseEnter}
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
