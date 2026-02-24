/**
 * Web Autocomplete Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListOptionsRender,
  DrawerListSuffix,
  DrawerListDataArrayObject,
} from '../../fragments/DrawerList'
import type { ButtonIconPosition } from '../Button'
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import {
  warn,
  isTouchDevice,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  getStatusState,
  combineDescribedBy,
  convertJsxToString,
  escapeRegexChars,
  getClosestParent,
} from '../../shared/component-helper'
import { IS_MAC, debounce, hasSelectedText } from '../../shared/helpers'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

import Suffix from '../../shared/helpers/Suffix'
import AriaLive from '../aria-live/AriaLive'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import Input, { SubmitButton } from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import { ItemContent } from '../../fragments/drawer-list/DrawerListItem'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  parseContentTitle,
  getCurrentData,
  getCurrentIndex,
  normalizeData,
} from '../../fragments/drawer-list/DrawerListHelpers'

export type AutocompleteClearEvent = {
  value: string
  previousValue: string
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
  | ((...args: any[]) => any)
type AutocompleteInputRef =
  | ((...args: any[]) => any)
  | React.RefObject<HTMLInputElement | undefined>
type AutocompleteInputIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
type AutocompleteInputElement = ((...args: any[]) => any) | React.ReactNode
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
    func: (...args: any[]) => any,
    props?: Record<string, unknown>,
    wait?: number
  ) => void
}
export type AutocompleteTypeEvent = {
  value: string
  event: React.ChangeEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
} & AutocompleteEventMethods
export type AutocompleteFocusEvent = {
  value: string
  event: React.FocusEvent<HTMLInputElement>
} & AutocompleteEventMethods
export type AutocompleteBlurEvent = {
  value?: string
  event?: React.FocusEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods

export type AutocompleteChangeEvent = {
  value?: string
  event?: React.FocusEvent<HTMLInputElement>
  data: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods
export type AutocompleteSelectEvent = {
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
   * Status message text.
   */
  status?: FormStatusText
  /**
   * Status variant.
   */
  statusState?: FormStatusState
  /**
   * Additional FormStatus props.
   */
  statusProps?: FormStatusProps
  statusNoAnimation?: boolean
  /**
   * GlobalStatus configuration object.
   */
  globalStatus?: GlobalStatusConfigObject
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
  data?: any
  /**
   * Will be called once the Autocomplete shows up.
   */
  onOpen?: (event: AutocompleteTypeEvent) => void
  /**
   * Will be called once the Autocomplete gets closed.
   */
  onClose?: (event: AutocompleteTypeEvent) => void
  onType?: (event: AutocompleteTypeEvent) => void
  onFocus?: (event: AutocompleteFocusEvent) => void
  onBlur?: (event: AutocompleteBlurEvent) => void
  onChange?: (event: AutocompleteChangeEvent) => void
  onSelect?: (event: AutocompleteSelectEvent) => void
  onClear?: (event: AutocompleteClearEvent) => void
}

export type AutocompleteAllProps = AutocompleteProps &
  DrawerListProps &
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

export default class Autocomplete extends React.PureComponent<AutocompleteAllProps> {
  static HorizontalItem: ({
    children,
  }: {
    children: React.ReactNode
  }) => React.JSX.Element
  static _formElement: boolean
  static _supportsSpacingProps: boolean

  _id: string

  static defaultProps: Partial<AutocompleteAllProps> & {
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

  constructor(props: AutocompleteAllProps) {
    super(props)

    this._id = props.id || makeUniqueId()
  }
  render() {
    const providerProps = {
      ...this.props,
      id: this._id,
      data: this.props.data || this.props.children,
      open: null,
      tagName: 'dnb-autocomplete',
      ignoreEvents: false,
      preventFocus: true,
      skipKeysearch: true,
    } as Partial<DrawerListProps>

    return (
      <DrawerListProvider {...providerProps}>
        <AutocompleteInstance {...this.props} id={this._id} />
      </DrawerListProvider>
    )
  }
}

class AutocompleteInstance extends React.PureComponent<
  AutocompleteAllProps,
  Record<string, any>
> {
  static defaultProps = Autocomplete.defaultProps
  static contextType = DrawerListContext

  context: React.ContextType<typeof DrawerListContext>
  attributes: Record<string, unknown>
  _cacheMemory: Record<string, unknown>
  _props: Record<string, any>
  _ref: React.RefObject<HTMLElement>
  _refShell: React.RefObject<HTMLSpanElement>
  _refInput: React.RefObject<any>
  _selectTimeout: ReturnType<typeof setTimeout>
  _focusTimeout: ReturnType<typeof setTimeout>
  _blurTimeout: ReturnType<typeof setTimeout>
  showAllTimeout: ReturnType<typeof setTimeout>
  __preventFiringBlurEvent: boolean | null
  dbf: Record<string, (...args: any[]) => any>
  isTouchDevice: boolean
  skipFilter: boolean
  skipReorder: boolean
  wasVisible: boolean

  static parseDataItem(dataItem) {
    const searchWord = parseContentTitle(
      dataItem.searchContent || dataItem,
      {
        separator: ' ',
      }
    )
    if (typeof searchWord !== 'string' && Array.isArray(searchWord)) {
      return AutocompleteInstance.parseDataItem(searchWord)
    }
    return searchWord
  }

  static createSearchIndex(data) {
    return data.map((dataItem) => {
      const contentChunk = AutocompleteInstance.parseDataItem(dataItem)
      return { dataItem, contentChunk }
    })
  }

  static getCurrentDataTitle(selectedItem, data) {
    const currentData = getCurrentData(selectedItem, data)
    return parseContentTitle(currentData, {
      separator: ' ',
      preferSelectedValue: true,
    })
  }

  static getDerivedStateFromProps(
    props: AutocompleteAllProps,
    state: Record<string, any>
  ) {
    if (state._listenForPropChanges) {
      state.disableHighlighting = props.disableHighlighting

      if (props.inputValue !== 'initval') {
        state.inputValue = props.inputValue
      }

      if (props?.data?.length > 0 && state?.prevData?.length === 0) {
        let selectedItem = state.selectedItem

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

        state.inputValue = parseContentTitle(currentData, {
          separator: ' ',
          preferSelectedValue: true,
        })
      }

      if (props.data !== state.prevData) {
        state.updateData(props.data)
        state.prevData = props.data
      }
    }

    state._listenForPropChanges = true

    return state
  }

  constructor(props: AutocompleteAllProps, context?: any) {
    super(props)

    this.attributes = {}
    this.state = this.state || {}
    const state = this.state as Record<string, any>
    state._listenForPropChanges = true
    state.mode = props.mode
    state.prevData = props.data // only to compare against new data
    state.updateData = this.updateData // only so we can call setData

    if (context.drawerList && context.drawerList.currentTitle) {
      state.inputValue = context.drawerList.currentTitle
    }

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refInput = React.createRef()

    this.isTouchDevice = isTouchDevice()

    this.skipFilter = props.disableFilter
    this.skipReorder = props.disableReorder

    // Initialize wasVisible to track if component was previously open
    this.wasVisible = false
  }

  componentDidMount() {
    if (this.props.open) {
      this.runFilterToHighlight({ fillDataIfEmpty: true })
      this.setVisible()
    }
  }

  componentDidUpdate(prevProps) {
    // Only recompute the search index when we actually need it:
    // while the drawer is open or the input has focus (about to open)
    if (
      (this.context.drawerList.open || this.state.hasFocus) &&
      prevProps.data !== this.props.data
    ) {
      this.setSearchIndex({ overwriteSearchIndex: true }, () => {
        this.runFilterWithSideEffects(this.state.inputValue)
      })
    }

    if (prevProps.value !== this.props.value) {
      this.revalidateSelectedItem()
      this.revalidateInputValue()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._selectTimeout)
    clearTimeout(this._focusTimeout)
    clearTimeout(this._blurTimeout)
  }

  setVisible = (args = null, onStateComplete = null) => {
    this.wasVisible = true
    this.context.drawerList
      .setWrapperElement(this._ref.current)
      .setVisible(args, onStateComplete)
  }

  setHidden = (args = null, onStateComplete = null) => {
    this.context.drawerList.setHidden(args, onStateComplete)
    this.setState({
      hasFocus: false,
      hasBlur: false,
    })
  }

  toggleVisible = (args = null, onStateComplete = null) => {
    args = args || {}
    if (typeof args.hasFilter === 'undefined') {
      args.hasFilter = false
    }
    if (this.props.disabled) {
      return // stop here
    }
    if (
      !args.hasFilter &&
      !this.props.preventClose &&
      !this.context.drawerList.hidden &&
      this.context.drawerList.isOpen
    ) {
      this.setHidden(null, onStateComplete)
    } else {
      this.setVisibleByContext(null, onStateComplete)
    }
  }

  toggleVisibleAndFocusOptions = () => {
    this.context.drawerList.toggleVisible(null, (isVisible) => {
      if (isVisible) {
        this.focusDrawerList()
      }
    })
  }

  setVisibleByContext = (options: any = {}, onStateComplete = null) => {
    const skipFilter = this.state.showAllNextTime
    if (skipFilter) {
      this.setState({
        showAllNextTime: false,
        _listenForPropChanges: false,
      })
    }

    this.runFilterToHighlight({
      fillDataIfEmpty: true,
      skipFilter,
      ...options,
    })

    this.setVisible(null, onStateComplete)
  }

  onInputChangeHandler = ({ value, event }) => {
    this.setState({
      typedInputValue: value,
      inputValue: value,
      _listenForPropChanges: false,
    })

    dispatchCustomElementEvent(this, 'onType', {
      value,
      event,
      ...this.getEventObjects('onType'),
    })

    value = String(value).trim()
    if (value !== this.state.inputValue) {
      this.runFilterWithSideEffects(value)
    }
  }

  runFilterWithSideEffects = (value, options = {}) => {
    // run the filter also on invalid values, so we reset the highlight
    const data = this.runFilter(value, options)
    const count = this.countData(data)

    const { keepValue, keepSelection, keepValueAndSelection } = this.props

    if (value?.length > 0) {
      // show the "noOptions" message
      if (count === 0) {
        if (this.state.mode !== 'async') {
          this.showNoOptionsItem()
        }
      } else if (count > 0) {
        this.context.drawerList.setData(this.wrapWithShowAll(data))
        this.context.drawerList.setState({
          cacheHash: value + count,
        })

        if (count === 1) {
          this.context.drawerList.setState({
            activeItem: data[0].__id,
          })
        }
      }
    } else {
      if (!keepValue && !keepSelection && !keepValueAndSelection) {
        this.totalReset()
      } else if (keepValue) {
        this.resetSelectedItem()
      }

      this.showAllItems()

      if (this.state.inputValue?.length > 0) {
        this.setVisible()
      }
    }

    // Opens the drawer, also when pressing on the clear button
    if (this.state.hasFocus) {
      this.setVisible()
    }

    return data
  }

  runFilterToHighlight = (
    { fillDataIfEmpty = false, ...options }: any = {},
    value = this.state.inputValue
  ) => {
    // do not filter or highlight if the current selected item is the same as the input value
    const possibleTitle = AutocompleteInstance.getCurrentDataTitle(
      this.context.drawerList.selectedItem,
      this.context.drawerList.originalData
    )

    if (value === possibleTitle) {
      return // stop here
    }

    value = String(value || '').trim()

    this.setState({
      disableHighlighting: false,
      _listenForPropChanges: false,
    })

    let data = this.runFilter(value, options) // do not skip the filter here

    // this is a backup, in case everything is empty, we fill the data
    if (fillDataIfEmpty && data.length === 0 && value === '') {
      data = this.context.drawerList.originalData
    }

    this.context.drawerList.setData(this.wrapWithShowAll(data))
    this.context.drawerList.setState({
      cacheHash: value + this.countData(data),
    })

    return data
  }

  wrapWithShowAll = (data) => {
    if (!data || !this.hasFilterActive(data)) {
      return data
    }

    const lastItem = this.context.drawerList.originalData.slice(-1)[0]
    if (lastItem && !lastItem.showAll) {
      const lastActiveItem = data.slice(-1)[0]
      if (lastActiveItem) {
        // NB: here we could use unshift, but this has to be implemented different places as well
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
              {this._props.showAll}
            </>
          ),
        })
      }
    }

    return data
  }

  setInputValue = (inputValue) => {
    this.setState({
      inputValue,
      _listenForPropChanges: false,
    })
  }

  emptyData = () => {
    this._cacheMemory = {}

    this.clearInputValue()

    this.context.drawerList.setData(
      () => [],
      () => {
        this.setSearchIndex({ overwriteSearchIndex: true }, null)
        this.resetActiveItem()
        this.totalReset()
      },
      {
        overwriteOriginalData: true,
      }
    )
  }

  clearInputValue = () => {
    this.setState({
      inputValue: '',
      typedInputValue: null,
      _listenForPropChanges: false,
    })
  }

  resetInputValue = () => {
    const { inputValue, keepValue, keepValueAndSelection } = this.props

    if (
      keepValue ||
      keepValueAndSelection ||
      (inputValue !== 'initval' && inputValue.length > 0)
    ) {
      return // stop here
    }

    clearTimeout(this._selectTimeout)
    this._selectTimeout = setTimeout(() => {
      if (this.hasSelectedItem()) {
        const inputValue = AutocompleteInstance.getCurrentDataTitle(
          this.context.drawerList.selectedItem,
          this.context.drawerList.originalData
        )
        this.setInputValue(inputValue)
      } else {
        this.clearInputValue()
      }
    }, 1) // to make sure we actually are after the Input state handling -> "input placeholder reset"
  }

  showNoOptionsItem = () => {
    this.resetActiveItem()
    this.ignoreEvents()
    this.context.drawerList.setData(
      this.props.noOptions === false
        ? []
        : [
            {
              className: 'dnb-autocomplete__no-options',
              content: this._props.noOptions,
              ignoreEvents: true,
              __id: 'noOptions',
            },
          ]
    )
    this.context.drawerList.setState({
      cacheHash: 'noOptions',
    })
    this.setVisible()
  }

  showIndicatorItem = () => {
    this.resetActiveItem()
    this.ignoreEvents()
    this.context.drawerList.setData([
      {
        className: 'dnb-autocomplete__indicator',
        content: <ProgressIndicator label={this._props.indicatorLabel} />,
        ignoreEvents: true,
        __id: 'indicator',
      },
    ])
    this.context.drawerList.setState({
      cacheHash: 'indicator',
    })
    this.setVisible()
  }

  showIndicator = () => {
    if (!this.state.visibleIndicator) {
      this.setState({
        visibleIndicator: true,
        _listenForPropChanges: false,
      })
    }
  }

  hideIndicator = () => {
    this.setState({
      visibleIndicator: false,
      _listenForPropChanges: false,
    })
  }

  setMode = (mode) => {
    this.setState({
      mode,
      _listenForPropChanges: false,
    })
  }

  revalidateInputValue = () => {
    const { inputValue, value } = this.props
    if (inputValue && inputValue !== 'initval') {
      return // stop here
    }
    const selectedItem = getCurrentIndex(
      value,
      this.context.drawerList.originalData
    )
    const usedInputValue = AutocompleteInstance.getCurrentDataTitle(
      selectedItem,
      this.context.drawerList.originalData
    )
    this.setInputValue(usedInputValue)
  }

  revalidateSelectedItem = () => {
    const selectedItem = getCurrentIndex(
      this.props.value,
      this.context.drawerList.originalData
    )

    this.context.drawerList.setState({
      selectedItem,
    })
  }

  hasDatasetChanged = (rawData) => {
    const { selectedItem } = this.context.drawerList
    if (parseFloat(String(selectedItem)) > -1) {
      const newItem = rawData?.[selectedItem]
      const oldItem = this.context.drawerList.originalData[selectedItem]
      if (newItem?.selectedKey !== oldItem?.selectedKey) {
        return true
      }
    }
    return false
  }

  updateData = (rawData) => {
    const hasChanged = this.hasDatasetChanged(rawData)

    // invalidate the local cache now,
    // because we get else the same after we show the new result
    this.context.drawerList.setState(
      {
        cacheHash: 'updateData',
      },
      () => {
        // If the "selectedKey" has changed in comparison to the existing data,
        // invalidated our selectedItem
        // Also, ensure to run it after a state update, because the "selectedItem" (value prop) can have changed,
        // and should match the new data
        if (hasChanged) {
          const { value } = this.props
          if (value && value !== 'initval') {
            this.revalidateSelectedItem()
            this.revalidateInputValue()
          } else {
            this.resetSelectedItem()
          }
        }
      }
    )

    this.context.drawerList.setData(
      () => rawData, // set data as a function, so it gets re-evaluated with normalizeData
      (newData) => {
        this.setSearchIndex(
          { overwriteSearchIndex: true, data: newData },
          () => {
            const { typedInputValue } = this.state

            if (typedInputValue?.length > 0) {
              // run with side effects, to get preselection of activeItem
              const filteredData =
                this.runFilterWithSideEffects(typedInputValue)
              if (this.countData(filteredData) === 0) {
                if (this.state.mode !== 'async') {
                  this.showNoOptionsItem()
                }
              }
            } else {
              this.resetActiveItem()

              if (this.context.drawerList.open) {
                this.showAllItems()
              }
            }
          }
        )
      },
      {
        overwriteOriginalData: true,
      }
    )

    return this
  }

  onInputKeyDownHandler = ({ event: e }) => {
    const key = e.key

    switch (key) {
      case 'PageUp':
      case 'PageDown':
      case 'Home':
      case 'End':
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault() // has to be there for VO, one the drawer is closed
        break
    }

    switch (key) {
      case 'ArrowUp':
      case 'ArrowDown':
        if (!this.context.drawerList.open) {
          this.setVisible()
        }

        break

      case 'Escape':
        this.setState({
          showAllNextTime: true,
          _listenForPropChanges: false,
        })

        break

      case 'Enter':
        e.preventDefault()

        if (!this.context.drawerList.open && this.hasFilterActive()) {
          this.ignoreEvents()
          this.showAll()
        }

        if (
          (!this.hasValidData() || !this.hasSelectedItem()) &&
          !this.hasActiveItem()
        ) {
          this.toggleVisible()
        } else {
          this.setVisible()
        }

        break
    }
  }

  onInputClickHandler = (e) => {
    // Show the entire list when an item is selected
    if (!this.context.drawerList.open && this.hasFilterActive()) {
      this.ignoreEvents()
      this.showAll()
    }

    const { value } = e.target
    this.setVisibleByContext({ value })
  }

  onInputFocusHandler = (event) => {
    if (this.state.skipFocusDuringChange) {
      return // stop here
    }

    const { openOnFocus, keepValueAndSelection } = this.props

    if (!this.state.hasFocus) {
      if (openOnFocus && this.hasValidData()) {
        const { value } = event.target
        this.setVisibleByContext({ value })
      } else {
        this.setSearchIndex({}, null)
      }

      if (keepValueAndSelection) {
        this.showAll()
      }

      // Mark focus first so updateData (triggered in onFocus) can act on it
      this.setState({ hasFocus: true, hasBlur: false })

      dispatchCustomElementEvent(this, 'onFocus', {
        event,
        ...this.getEventObjects('onFocus'),
      })
    }
  }

  reserveActivityHandler = (event = null) => {
    this.__preventFiringBlurEvent = Boolean(
      event.key === 'Enter' ||
        (event?.currentTarget
          ? getClosestParent('dnb-drawer-list', event.currentTarget) ||
            getClosestParent(
              'dnb-input__submit-button__button',
              event.currentTarget
            )
          : false)
    )

    if (this.__preventFiringBlurEvent) {
      setTimeout(
        () => {
          this.__preventFiringBlurEvent = false
        },
        this.props.noAnimation ? 1 : DrawerList.blurDelay
      )
    }
  }

  onBlurHandler = (event) => {
    if (
      this.__preventFiringBlurEvent ||
      this.context.drawerList.hasFocusOnElement ||
      this.state.hasBlur
    ) {
      this.__preventFiringBlurEvent = null
      return false
    }

    const {
      openOnFocus,
      keepValue,
      keepValueAndSelection,
      preventSelection,
      noAnimation,
    } = this.props

    this.setState({
      hasBlur: true,
      hasFocus: false,
    })

    if (!keepValue && !keepValueAndSelection) {
      this.setState({
        typedInputValue: null,
        _listenForPropChanges: false,
      })
    }

    if (!preventSelection) {
      const existingValue = this.state.inputValue

      this.resetInputValue()

      const resetAfterClose = () => {
        if (!keepValue || !existingValue || this.hasSelectedItem()) {
          this.resetActiveItem()
        }
        this.resetFilter()
      }

      if (noAnimation) {
        resetAfterClose()
      } else {
        clearTimeout(this._blurTimeout)
        this._blurTimeout = setTimeout(
          resetAfterClose,
          DrawerList.blurDelay
        ) // only to let the animation pass, before we make the effect. Else this would be a visible change
      }
    }

    if (openOnFocus) {
      this.setHidden()
    }

    dispatchCustomElementEvent(this, 'onBlur', {
      event,
      ...this.getEventObjects('onBlur'),
    })
  }

  onTriggerKeyDownHandler = (e) => {
    const key = e.key

    switch (key) {
      case ' ':
      case 'Enter':
        {
          this.setVisible()
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
          this.focusInput()
        }
        break
    }
  }

  focusDrawerList = () => {
    try {
      this.context.drawerList._refUl.current.focus({
        preventScroll: true,
      })
    } catch (e) {
      // do nothing
    }
  }

  focusInput = () => {
    try {
      this._refInput.current._ref.current.focus({
        preventScroll: true,
      })
    } catch (e) {
      warn(e)
    }
  }

  getEventObjects = (key) => {
    const attributes = this.attributes

    return {
      attributes,
      dataList: this.context.drawerList.data,
      updateData: this.updateData,
      revalidateSelectedItem: this.revalidateSelectedItem,
      revalidateInputValue: this.revalidateInputValue,
      resetSelectedItem: this.resetSelectedItem,
      clearInputValue: this.clearInputValue,
      showAllItems: this.showAllItems,
      setVisible: this.setVisible,
      resetInputValue: this.resetInputValue,
      setHidden: this.setHidden,
      emptyData: this.emptyData,
      focusInput: this.focusInput,
      setInputValue: this.setInputValue,
      showNoOptionsItem: this.showNoOptionsItem,
      showIndicatorItem: this.showIndicatorItem,
      showIndicator: this.showIndicator,
      hideIndicator: this.hideIndicator,
      setMode: this.setMode,
      debounce: (func, props = {}, wait = 250) => {
        this.dbf = this.dbf || {}
        return (
          this.dbf[key] ||
          (this.dbf[key] = debounce(func, wait, { context: this } as any))
        )(props)
      },
    }
  }

  hasInjectedDataItem = (data = this.context.drawerList.data) => {
    const lastItem = data.slice(-1)[0]
    return lastItem
      ? lastItem.showAll || String(lastItem.__id) === 'noOptions'
      : false
  }

  countData = (data = this.context.drawerList.data) => {
    const count = data.length
    return count > 0 && this.hasInjectedDataItem(data) ? count - 1 : count
  }

  hasValidData = (data = this.context.drawerList.data) => {
    if (this.countData(data) > 0) {
      const first = data[0]
      if (
        !first.showAll &&
        !['noOptions', 'indicator'].includes(String(first.__id))
      ) {
        return true
      }
    }
    return false
  }

  hasSelectedItem = () => {
    return parseFloat(String(this.context.drawerList.selectedItem)) > -1
  }

  hasActiveItem = () => {
    return parseFloat(String(this.context.drawerList.activeItem)) > -1
  }

  hasFilterActive = (data = this.context.drawerList.data) => {
    return !(
      this.context.drawerList.originalData &&
      this.context.drawerList.originalData.length === this.countData(data)
    )
  }

  setSearchIndex(
    {
      overwriteSearchIndex = false,
      data = this.context.drawerList.originalData,
    }: any = {},
    cb: ((...args: any[]) => void) | null = null
  ) {
    this._cacheMemory = {}

    if (!overwriteSearchIndex && this.state.searchIndex) {
      return this.state.searchIndex
    }

    const searchIndex = AutocompleteInstance.createSearchIndex(data)

    this.setState(
      {
        searchIndex,
        _listenForPropChanges: false,
      },
      cb
    )

    return searchIndex
  }

  ignoreEvents = () => {
    clearTimeout(this.showAllTimeout)
    this.context.drawerList.setState(
      {
        ignoreEvents: true, // we also have to reset this one
      },
      () => {
        // but we reset it right after the rerender
        this.showAllTimeout = setTimeout(() => {
          this.context &&
            this.context.drawerList &&
            this.context.drawerList.setState({
              ignoreEvents: false, // we also have to reset this one
            })
        }, 10) // make sure we reset once the rerender of DrawerList is done, because then we keep the activeItem at it's position by using key="down"
      }
    )
  }

  showAll = () => {
    this.resetFilter()

    this.context.drawerList.setState({
      cacheHash: 'all',
    })

    this.runFilterToHighlight({
      skipFilter: true,
      fillDataIfEmpty: true,
    } as any)
  }

  showAllItems = () => {
    this.resetFilter()
    this.context.drawerList.setState({
      cacheHash: 'all',
    })
    this.context.drawerList.setActiveItemAndScrollToIt(
      this.context.drawerList.selectedItem,
      {
        scrollTo: false,
      }
    )
  }

  totalReset = () => {
    this.setState({
      inputValue: null,
      typedInputValue: null,
      _listenForPropChanges: false,
    })
    this.resetActiveItem()
    this.resetSelectedItem()
  }

  resetActiveItem = () => {
    this.context.drawerList.setState({
      activeItem: null,
    })
  }

  resetSelectedItem = () => {
    const hasHadValue = this.hasSelectedItem()
    this.context.drawerList.setState(
      {
        selectedItem: null,
      },
      () => {
        if (hasHadValue) {
          dispatchCustomElementEvent(this, 'onChange', {
            ...this.getEventObjects('onChange'),
          })
        }
      }
    )
  }

  resetFilter = () => {
    this.context.drawerList.setData(this.context.drawerList.originalData)
  }

  runFilter = (
    value,
    {
      data = null, // rawData
      searchIndex = this.state.searchIndex,
      searchNumbers = this.props.searchNumbers,
      inWordIndex = parseFloat(
        String(this.props.searchInWordIndex ?? (this.skipFilter ? 1 : 3))
      ) - 1,
      disableHighlighting = false,
      skipFilter = false,
      skipReorder = false,
    } = {}
  ) => {
    if (data) {
      searchIndex = this.setSearchIndex({ data })
    }
    // get the search index
    else if (!searchIndex) {
      searchIndex = this.setSearchIndex()
    }

    if (typeof searchIndex === 'undefined') {
      return []
    }

    const startsWithMatch = this.props.searchMatch === 'starts-with'
    const rawValue = value ?? ''
    let searchWords = rawValue.split(/\s+/g).filter(Boolean)

    if (startsWithMatch) {
      // @ts-expect-error Unicode property escapes are supported at runtime here
      const hasLetters = /[\p{L}]/u.test(rawValue)
      // @ts-expect-error Unicode property escapes are supported at runtime here
      const hasNumbers = /[\p{N}]/u.test(rawValue)
      if (startsWithMatch && searchNumbers && hasNumbers && !hasLetters) {
        // @ts-expect-error Unicode property escapes are supported at runtime here
        const normalizedNumeric = rawValue.replace(/[^\p{N}]+/gu, '')
        searchWords = normalizedNumeric ? [normalizedNumeric] : []
      }
    }

    const getWordBoundary = (wordIndex) =>
      startsWithMatch && wordIndex === 0
        ? '^'
        : searchNumbers
        ? '' // when searching numbers, we don't care about word boundaries
        : '^|\\s'

    // Pre-compile regex patterns for performance
    const searchWordsData = searchWords.map((word, wordIndex) => {
      const processedWord = searchNumbers
        ? // @ts-expect-error Unicode property escapes are supported at runtime here
          word.replace(/[^\p{L}\p{N}]+/gu, '')
        : escapeRegexChars(word)
      const wordBoundary = getWordBoundary(wordIndex)

      return {
        originalWord: word,
        processedWord,
        wordIndex,
        // Pre-compile regex for filter phase
        filterRegex: new RegExp(
          wordIndex >= inWordIndex
            ? `${processedWord}`
            : `(${wordBoundary})${processedWord}`,
          'i'
        ),
        // Pre-compile regex for scoring phase
        scoreRegex: new RegExp(
          `(${wordBoundary})${escapeRegexChars(word)}`,
          'ig'
        ),
      }
    })

    // Pre-compile first word regex if needed
    const firstWordRegex =
      searchWords.length > 0
        ? new RegExp(`^${escapeRegexChars(searchWords[0])}`, 'i')
        : null

    const findSearchWords = (contentChunk) => {
      if (typeof contentChunk !== 'string') {
        return []
      }

      return searchWordsData
        .filter(({ filterRegex, processedWord }) => {
          if (filterRegex.test(contentChunk)) {
            return true
          }

          if (
            searchNumbers &&
            filterRegex.test(contentChunk.replace(/[^0-9]/g, ''))
          ) {
            return true
          }

          return false
        })
        .map(({ originalWord, wordIndex, scoreRegex }) => {
          // Use 1 to ensure we never have 0, because we filter out words with 0 later
          let wordScore = 0

          // Check how ofter the current written word is inside the content,
          // and give a score for each one
          wordScore += (contentChunk.match(scoreRegex) || []).length

          // Give the first word extra points
          if (wordIndex === 0 && firstWordRegex) {
            // Check if the first chunk starts the first written word
            const isFirstWord = firstWordRegex.test(
              contentChunk.split(' ')[0]
            )

            // If yes, add the amount of possible words + 1
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

    searchIndex = searchIndex.map((item, i) => {
      const listOfFoundWords = findSearchWords(item.contentChunk)

      // Check if ALL search words are purely numeric (no letters)
      const allWordsAreNumeric = searchNumbers
        ? // @ts-expect-error Unicode property escapes are supported at runtime here
          searchWords.every((word) => /^[\p{N}\s.,]+$/u.test(word))
        : false

      // When searching numbers with multiple numeric terms, ensure ALL search words are found (AND logic)
      // For text or mixed searches, keep existing behavior (OR logic)
      const hasMultipleNumericTerms =
        searchNumbers &&
        searchWords &&
        searchWords.length > 1 &&
        allWordsAreNumeric
      if (
        hasMultipleNumericTerms &&
        listOfFoundWords.length !== searchWords.length
      ) {
        return { totalScore: 0, item } // Will be filtered out later
      }

      if (typeof item.dataItem === 'string') {
        item.dataItem = { content: item.dataItem }
      }

      // Only make a copy if render is not set
      // If we don't make a copy of the item, we risk that we manipulate data outside
      if (!item.dataItem.render) {
        item.dataItem = { ...item.dataItem }
      }

      // this function gets called once the items are rendered / in view
      // this part is used for the highlighting
      item.dataItem.render = (children, id) => {
        if (disableHighlighting || this.state.disableHighlighting) {
          return children
        }

        // if the ID and the content is the same, use the cached version
        const cacheHash = id + value
        this._cacheMemory = this._cacheMemory || {}
        if (this._cacheMemory[cacheHash]) {
          return this._cacheMemory[cacheHash]
        }

        const isComponent =
          typeof children !== 'string' && React.isValidElement(children)

        if (isComponent && Array.isArray(children?.props?.children)) {
          children = children.props.children
        } else if (!Array.isArray(children)) {
          children = [children] // for a while we had split this into separate words children.split(' ') but this is not needed anymore
        }

        // make string out of it
        children = children.map((originalChild) => ({
          originalChild,
          segment: convertJsxToString(originalChild, ' '),
        }))

        children = children.map(({ originalChild, segment }, idx) => {
          // This way, the user can get highlights that do not match
          searchWords.forEach((word, wordIndex) => {
            // Can be empty string
            if (segment) {
              // To ensure we escape regex chars
              word = escapeRegexChars(word)

              if (searchNumbers) {
                // Remove all other chars, except numbers and letters, so we can match complete sequences
                // @ts-expect-error Unicode property escapes are supported at runtime here
                const cleanedWord = word.replace(/[^\p{L}\p{N}]+/gu, '')
                if (cleanedWord) {
                  // Highlight the complete sequence wherever it appears as a contiguous block
                  // This ensures "12 34" highlights "12" and "34" as separate sequences,
                  // not all individual "1", "2", "3", "4" characters
                  const escapedWord = escapeRegexChars(cleanedWord)
                  segment = segment.replace(
                    new RegExp(`(${escapedWord})`, 'gi'),
                    (match) => {
                      // Avoid double-highlighting
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

          let result = segment

          if (segment.includes(strS)) {
            // to make sure we don't have several in a row
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

          // If we get a component, replace the one we use as the string comparison
          // This way we can still have an icon before or after
          if (isComponent) {
            if (Array.isArray(originalChild?.props?.children)) {
              result = originalChild.props.children.map((Comp) => {
                return Comp === originalChild ||
                  (Comp.props && Comp.props.children === originalChild)
                  ? result
                  : Comp
              })
            } else if (typeof originalChild === 'string') {
              result = originalChild
            }

            if (React.isValidElement(originalChild)) {
              result = React.cloneElement(
                originalChild,
                { key: 'clone' + cacheHash + idx },
                result
              )
            }
          }

          return result
        })

        return (this._cacheMemory[cacheHash] = children)
      }

      if (this.skipFilter || skipFilter) {
        return item.dataItem
      }

      /**
       * This prioritizes the first written words (score)
       * along with who many matches are in the content item (listOfFoundWords)
       */
      let totalScore = listOfFoundWords.length // Include the found words
      for (const { wordScore } of listOfFoundWords) {
        totalScore += wordScore
      }

      return {
        totalScore,
        item,
      }
    })

    if (!this.skipFilter && !skipFilter) {
      // This removes items with 0 totalScore
      searchIndex = searchIndex.filter(({ totalScore }) => totalScore)

      if (!this.skipReorder && !skipReorder) {
        searchIndex = searchIndex.sort(
          ({ totalScore: a }, { totalScore: b }) => b - a
        )
      }

      searchIndex = searchIndex.map(({ item }) => item.dataItem)
    }

    return searchIndex
  }

  onCloseHandler = (args = {}) => {
    const res = dispatchCustomElementEvent(this, 'onClose', {
      ...args,
      ...this.getEventObjects('onClose'),
    })

    if (res !== false) {
      this.setFocusOnInput()
    }

    return res
  }

  setVisibleAndFocusOnInput = () => {
    if (!this.state.hasFocus && !hasSelectedText()) {
      this.setFocusOnInput()
      this.setVisible()
    }
  }

  setFocusOnInput() {
    this.setState(
      {
        hasFocus: true,
      },
      () => {
        this.focusInput()
        this.setState({
          hasFocus: false,
        })
      }
    )
  }

  onSelectHandler = (args) => {
    if (parseFloat(args.activeItem) > -1) {
      dispatchCustomElementEvent(this, 'onSelect', {
        ...args,
        ...this.getEventObjects('onSelect'),
      })
    }
  }

  onPreChangeHandler = ({ data }) => {
    if (data && data.showAll) {
      this.showAll()

      const activeItem = data.lastActiveItem
      if (parseFloat(activeItem) > -1) {
        this.context.drawerList.setActiveItemAndScrollToIt(activeItem, {
          scrollTo: false,
        })
      }

      this.setFocusOnInput()

      return false
    }
  }

  onChangeHandler = (args) => {
    const selectedItem = args.selectedItem

    const { preventSelection, keepOpen } = this.props

    if (!preventSelection) {
      if (!keepOpen) {
        this.setState({
          skipFocusDuringChange: true,
          disableHighlighting: true,
          _listenForPropChanges: false,
        })

        this.setHidden()

        // Do this, so screen readers get a NEW focus later on
        // So we first need a blur of the input basically
        this.focusDrawerList()

        this.setState(
          {
            skipFocusDuringChange: false,
            _listenForPropChanges: false,
          },
          () => this.setFocusOnInput()
        )
      }

      const inputValue = AutocompleteInstance.getCurrentDataTitle(
        selectedItem,
        this.context.drawerList.data
      )
      this.setInputValue(inputValue)
    }

    if (typeof args.data?.render === 'function') {
      delete args.data.render
    }

    dispatchCustomElementEvent(this, 'onChange', {
      ...args,
      ...this.getEventObjects('onChange'),
    })
  }

  getAriaLiveUpdate() {
    const { open } = this.context.drawerList

    // this is only to make a better screen reader ux
    if (open) {
      const { ariaLiveOptions, noOptions } = this._props
      const count = this.countData()

      let newString = null

      if (count > 0) {
        newString = String(ariaLiveOptions).replace('%s', String(count))
      } else {
        newString = noOptions
      }

      return newString
    }

    return ''
  }

  getVoiceOverActiveItem(selectedSr) {
    // Add VoiceOver support to read the "selected" item
    const { activeItem, selectedItem } = this.context.drawerList
    const currentDataItem = getCurrentData(
      activeItem,
      this.context.drawerList.data
    )

    return (
      <AriaLive hidden={!IS_MAC} priority="high" delay={0}>
        {currentDataItem && (
          <>
            {activeItem === selectedItem ? <>{selectedSr} </> : null}
            <ItemContent>{currentDataItem}</ItemContent>
          </>
        )}
      </AriaLive>
    )
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = (this._props = extendPropsWithContextInClassComponent(
      this.props,
      Autocomplete.defaultProps,
      (this.context as any).getTranslation(this.props as any).Autocomplete,
      pickFormElementProps((this.context as any)?.formElement),
      (this.context as any).Autocomplete
    ))

    const {
      title,
      placeholder,
      label,
      labelDirection,
      labelSrOnly,
      icon, // eslint-disable-line
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
      keepValue, // eslint-disable-line
      keepValueAndSelection, // eslint-disable-line
      keepSelection, // eslint-disable-line
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
      searchNumbers, // eslint-disable-line
      searchInWordIndex, // eslint-disable-line
      searchMatch, // eslint-disable-line
      showOptionsSr, // eslint-disable-line
      selectedSr,
      submitButtonTitle,
      submitButtonIcon,
      portalClass,
      drawerClass,
      inputRef, // eslint-disable-line
      className,
      disabled,
      stretch,
      skeleton,
      arrowPosition,
      iconPosition,
      skipPortal,
      independentWidth,
      autoComplete,

      mode: _mode, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      pageOffset: _pageOffset, // eslint-disable-line
      observerElement: _observerElement, // eslint-disable-line
      id: _id, // eslint-disable-line
      open: _open, // eslint-disable-line
      value: _value, // eslint-disable-line
      inputValue: _inputValue, // eslint-disable-line
      enableBodyLock: _enableBodyLock, // eslint-disable-line
      listClass: _listClass, // eslint-disable-line
      openOnFocus: _openOnFocus, // eslint-disable-line
      disableReorder: _disableReorder, // eslint-disable-line
      disableFilter: _disableFilter, // eslint-disable-line
      indicatorLabel: _indicatorLabel, // eslint-disable-line
      noOptions: _noOptions, // eslint-disable-line
      showAll: _showAll, // eslint-disable-line
      ariaLiveOptions: _ariaLiveOptions, // eslint-disable-line
      disableHighlighting: _disableHighlighting, // eslint-disable-line
      onClear, // eslint-disable-line

      onOpen: _onOpen, // eslint-disable-line
      onType: _onType, // eslint-disable-line
      onFocus: _onFocus, // eslint-disable-line
      onBlur: _onBlur, // eslint-disable-line
      onClose: _onClose, // eslint-disable-line
      onChange: _onChange, // eslint-disable-line
      onSelect: _onSelect, // eslint-disable-line

      ...attributes
    } = props

    const showStatus = getStatusState(status)

    const { inputValue, visibleIndicator } = this.state

    const { id, hidden, selectedItem, direction, open } =
      this.context.drawerList

    const isExpanded = Boolean(open) && this.hasValidData()

    this.attributes = validateDOMAttributes(null, attributes)
    Object.assign(this.context.drawerList.attributes, this.attributes)

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
      ref: this._refShell,
    }

    const inputParams = {
      className: 'dnb-autocomplete__input',
      id,
      value: inputValue,
      placeholder: undefined,
      autoCapitalize: 'none',
      spellCheck: false,
      autoCorrect: 'off',
      autoComplete,

      // ARIA
      role: 'combobox', // we need combobox twice to make it properly work on VO
      'aria-autocomplete': 'both' as const, // list, both
      'aria-controls': isExpanded ? `${id}-ul` : undefined,
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': isExpanded, // is needed for semantics
      // 'aria-roledescription': 'autocomplete', // is not needed by now

      onMouseDown: this.onInputClickHandler,
      onKeyDown: this.onInputKeyDownHandler,
      onChange: this.onInputChangeHandler,
      onFocus: this.onInputFocusHandler,
      onBlur: this.onBlurHandler,
      iconPosition: iconPosition,
      innerRef: inputRef,
      disabled,
      skeleton,
      ...attributes,
    }

    if (!(parseFloat(String(selectedItem)) > -1)) {
      inputParams.placeholder = placeholder || title
    }

    // aria-placeholder is not allowed on combobox role, clear it
    inputParams['aria-placeholder'] = undefined

    // Handling of activedescendant – required by NVDA
    if (isExpanded) {
      inputParams['aria-activedescendant'] =
        this.context.drawerList.ariaActiveDescendant
    }

    if (showStatus || suffix) {
      inputParams['aria-describedby'] = combineDescribedBy(
        inputParams,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }

    const {
      innerRef: _innerRef, //eslint-disable-line
      iconPosition: _iconPosition, //eslint-disable-line
      ...customInputParams
    } = inputParams

    let submitButton: React.ReactNode = false
    const triggerParams = {
      id: id + '-submit-button',
      disabled,
      status: status ? statusState : null,
      onKeyDown: this.onTriggerKeyDownHandler,
      onSubmit: this.toggleVisible,
      onMouseDown: this.reserveActivityHandler,
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': isExpanded,
      'aria-label': !hidden ? submitButtonTitle : undefined,
      tooltip: showSubmitButton ? submitButtonTitle : null,
      className: open ? 'dnb-button--active' : null,
    }

    if (submitElement && React.isValidElement(submitElement)) {
      submitButton = React.cloneElement(submitElement, triggerParams)
    } else if (showSubmitButton) {
      submitButton = (
        <SubmitButton
          icon={submitButtonIcon as any}
          iconSize={iconSize || (size === 'large' ? 'medium' : 'default')}
          variant="secondary"
          size={size === 'default' ? 'medium' : (size as any)}
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
      this.context.drawerList.originalData
    )

    const innerId =
      showStatus || suffix || currentDataItem?.suffixValue
        ? `${id}-inner`
        : null

    // also used for code markup simulation
    validateDOMAttributes(null, mainParams)
    validateDOMAttributes(null, shellParams)
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
            onClick={this.toggleVisible}
          />
        )}

        <span
          className="dnb-autocomplete__inner"
          ref={this._ref}
          id={innerId}
        >
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={label}
            textId={id + '-status'} // used for "aria-describedby"
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
                      (inputIcon as any)
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
                        onClick={
                          disabled ? null : this.setVisibleAndFocusOnInput
                        }
                        className="dnb-autocomplete__suffixValue"
                      >
                        {currentDataItem?.suffixValue}
                      </span>
                    )
                  }
                  submitElement={submitButton}
                  inputState={
                    this.state.skipFocusDuringChange ? 'focus' : undefined
                  } // because of the short blur / focus during select
                  clear={showClearButton}
                  onClear={onClear}
                  ref={this._refInput}
                  {...inputParams}
                  {...statusProps}
                />
              )}

              {!submitButton && (
                <span className="dnb-sr-only">
                  <button
                    tabIndex={-1}
                    type="button" // is needed, else a form will submit
                    onClick={this.toggleVisibleAndFocusOptions}
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
                onChange={this.onChangeHandler}
                onSelect={this.onSelectHandler}
                onClose={this.onCloseHandler}
                onPreChange={this.onPreChangeHandler}
                onKeyDown={this.reserveActivityHandler}
                onMouseDown={this.reserveActivityHandler}
                independentWidth={independentWidth}
              />
            </span>

            {suffix && (
              <Suffix
                className="dnb-autocomplete__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>

        {/* Add VoiceOver support to read the "selected" item */}
        {this.wasVisible ? this.getVoiceOverActiveItem(selectedSr) : null}

        {this.wasVisible ? (
          <AriaLive priority="high">{this.getAriaLiveUpdate()}</AriaLive>
        ) : null}
      </span>
    )
  }
}

Autocomplete.HorizontalItem = DrawerList.HorizontalItem
Autocomplete._formElement = true
Autocomplete._supportsSpacingProps = true
