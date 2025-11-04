/**
 * Web Autocomplete Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
  isTrue,
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
  keycode,
} from '../../shared/component-helper'
import {
  IS_MAC,
  IS_WIN,
  IS_EDGE,
  debounce,
  hasSelectedText,
} from '../../shared/helpers'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
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
  drawerListPropTypes,
  parseContentTitle,
  getCurrentData,
  getCurrentIndex,
  normalizeData,
} from '../../fragments/drawer-list/DrawerListHelpers'

export default class Autocomplete extends React.PureComponent {
  static propTypes = {
    ...spacingPropTypes,
    ...drawerListPropTypes,

    id: PropTypes.string,
    mode: PropTypes.oneOf(['sync', 'async']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    noOptions: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    showAll: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    ariaLiveOptions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    indicatorLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    showOptionsSr: PropTypes.string,
    selectedSr: PropTypes.string,
    submitButtonTitle: PropTypes.string,
    submitButtonIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    iconSize: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    trianglePosition: PropTypes.oneOf(['left', 'right']),
    inputIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    labelDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keepValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keepSelection: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keepValueAndSelection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    showClearButton: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    statusState: PropTypes.string,
    statusProps: PropTypes.object,
    statusNoAnimation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    disableFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disableReorder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disableHighlighting: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
    maxHeight: PropTypes.number,
    skipPortal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    noAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    noScrollAnimation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    showSubmitButton: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    submitElement: PropTypes.node,
    preventSelection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    alignAutocomplete: PropTypes.oneOf(['left', 'right']),
    optionsRender: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
      PropTypes.node,
    ]),
    inputElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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
            selectedValue: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.node,
            ]),
            suffixValue: PropTypes.oneOfType([
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
    searchInWordIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    searchMatch: PropTypes.oneOf(['word', 'starts-with']),
    searchNumbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputValue: PropTypes.string,
    openOnFocus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    preventClose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keepOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    portalClass: PropTypes.string,
    drawerClass: PropTypes.string,
    pageOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    observerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    enableBodyLock: PropTypes.bool,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array,
    ]),

    on_show: PropTypes.func,
    on_type: PropTypes.func,
    on_focus: PropTypes.func,
    on_blur: PropTypes.func,
    on_hide: PropTypes.func,
    on_change: PropTypes.func,
    on_select: PropTypes.func,
    on_state_update: PropTypes.func,
    onClear: PropTypes.func,
  }

  static defaultProps = {
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
    trianglePosition: null,
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
    alignAutocomplete: null,
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
    opened: null,
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

    on_show: null,
    on_hide: null,
    on_type: null,
    on_focus: null,
    on_blur: null,
    on_change: null,
    on_select: null,
    on_state_update: null,
    inputElement: null,
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()
  }
  render() {
    return (
      <DrawerListProvider
        {...this.props}
        id={this._id}
        data={this.props.data || this.props.children}
        opened={null}
        tagName="dnb-autocomplete"
        ignoreEvents={false}
        preventFocus
        skipKeysearch
      >
        <AutocompleteInstance {...this.props} id={this._id} />
      </DrawerListProvider>
    )
  }
}

class AutocompleteInstance extends React.PureComponent {
  static propTypes = Autocomplete.propTypes
  static defaultProps = Autocomplete.defaultProps
  static contextType = DrawerListContext

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

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.disableHighlighting = isTrue(props.disableHighlighting)

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

  constructor(props, context) {
    super(props)

    this.attributes = {}
    this.state = this.state || {}
    this.state._listenForPropChanges = true
    this.state.mode = props.mode
    this.state.prevData = props.data // only to compare against new data
    this.state.updateData = this.updateData // only so we can call setData

    if (context.drawerList && context.drawerList.currentTitle) {
      this.state.inputValue = context.drawerList.currentTitle
    }

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refInput = React.createRef()

    this.isTouchDevice = isTouchDevice()

    this.skipFilter = isTrue(props.disableFilter)
    this.skipReorder = isTrue(props.disableReorder)

    // Initialize wasVisible to track if component was previously open
    this.wasVisible = false
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.runFilterToHighlight({ fillDataIfEmpty: true })
      this.setVisible()
    }
  }

  componentDidUpdate(prevProps) {
    // Only recompute the search index when we actually need it:
    // while the drawer is open or the input has focus (about to open)
    if (
      (this.context.drawerList.opened || this.state.hasFocus) &&
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
    if (isTrue(this.props.disabled)) {
      return // stop here
    }
    if (
      !args.hasFilter &&
      !isTrue(this.props.preventClose) &&
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

  setVisibleByContext = (options = {}, onStateComplete = null) => {
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

    dispatchCustomElementEvent(this, 'on_type', {
      value,
      event,
      ...this.getEventObjects('on_type'),
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
        this.showNoOptionsItem()
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
      if (
        !isTrue(keepValue) &&
        !isTrue(keepSelection) &&
        !isTrue(keepValueAndSelection)
      ) {
        this.totalReset()
      } else if (isTrue(keepValue)) {
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
    { fillDataIfEmpty = false, ...options } = {},
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
          class_name: 'dnb-autocomplete__show-all',
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
        this.setSearchIndex({ overwriteSearchIndex: true })
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
      isTrue(keepValue) ||
      isTrue(keepValueAndSelection) ||
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
    if (this.state.mode === 'async') {
      return
    }
    this.resetActiveItem()
    this.ignoreEvents()
    this.context.drawerList.setData(
      this.props.noOptions === false
        ? []
        : [
            {
              class_name: 'dnb-autocomplete__no-options',
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
    if (parseFloat(selectedItem) > -1) {
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
                this.showNoOptionsItem()
              }
            } else {
              this.resetActiveItem()

              if (this.context.drawerList.opened) {
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
    const key = keycode(e)

    switch (key) {
      case 'page up':
      case 'page down':
      case 'home':
      case 'end':
      case 'down':
      case 'up':
        e.preventDefault() // has to be there for VO, one the drawer is closed
        break
    }

    switch (key) {
      case 'up':
      case 'down':
        if (!this.context.drawerList.opened) {
          this.setVisible()
        }

        break

      case 'escape':
      case 'esc':
        this.setState({
          showAllNextTime: true,
          _listenForPropChanges: false,
        })

        break

      case 'enter':
        e.preventDefault()

        if (!this.context.drawerList.opened && this.hasFilterActive()) {
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
    if (!this.context.drawerList.opened && this.hasFilterActive()) {
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
      if (isTrue(openOnFocus) && this.hasValidData()) {
        const { value } = event.target
        this.setVisibleByContext({ value })
      } else {
        this.setSearchIndex()
      }

      if (isTrue(keepValueAndSelection)) {
        this.showAll()
      }

      // Mark focus first so updateData (triggered in on_focus) can act on it
      this.setState({ hasFocus: true, hasBlur: false })

      dispatchCustomElementEvent(this, 'on_focus', {
        event,
        ...this.getEventObjects('on_focus'),
      })
    }
  }

  reserveActivityHandler = (event = null) => {
    this.__preventFiringBlurEvent = Boolean(
      event.key === 'enter' ||
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
        isTrue(this.props.noAnimation) ? 1 : DrawerList.blurDelay
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

    if (!isTrue(keepValue) && !isTrue(keepValueAndSelection)) {
      this.setState({
        typedInputValue: null,
        _listenForPropChanges: false,
      })
    }

    if (!isTrue(preventSelection)) {
      const existingValue = this.state.inputValue

      this.resetInputValue()

      const resetAfterClose = () => {
        if (
          !isTrue(keepValue) ||
          !existingValue ||
          this.hasSelectedItem()
        ) {
          this.resetActiveItem()
        }
        this.resetFilter()
      }

      if (isTrue(noAnimation)) {
        resetAfterClose()
      } else {
        clearTimeout(this._blurTimeout)
        this._blurTimeout = setTimeout(
          resetAfterClose,
          DrawerList.blurDelay
        ) // only to let the animation pass, before we make the effect. Else this would be a visible change
      }
    }

    if (isTrue(openOnFocus)) {
      this.setHidden()
    }

    dispatchCustomElementEvent(this, 'on_blur', {
      event,
      ...this.getEventObjects('on_blur'),
    })
  }

  onTriggerKeyDownHandler = (e) => {
    const key = keycode(e)

    switch (key) {
      case 'space':
      case 'enter':
        {
          this.setVisible()
        }
        break
    }

    switch (key) {
      case 'space':
      case 'enter':
      case 'page up':
      case 'page down':
      case 'down':
      case 'up':
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
          (this.dbf[key] = debounce(func, wait, { context: this }))
        )(props)
      },
    }
  }

  hasInjectedDataItem = (data = this.context.drawerList.data) => {
    const lastItem = data.slice(-1)[0]
    return lastItem
      ? lastItem.showAll || lastItem.__id === 'noOptions'
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
        !['noOptions', 'indicator'].includes(first.__id)
      ) {
        return true
      }
    }
    return false
  }

  hasSelectedItem = () => {
    return parseFloat(this.context.drawerList.selectedItem) > -1
  }

  hasActiveItem = () => {
    return parseFloat(this.context.drawerList.activeItem) > -1
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
    } = {},
    cb
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

    this.runFilterToHighlight({ skipFilter: true, fillDataIfEmpty: true })
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
          dispatchCustomElementEvent(this, 'on_change', {
            ...this.getEventObjects('on_change'),
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
      searchNumbers = isTrue(this.props.searchNumbers),
      inWordIndex = parseFloat(
        this.props.searchInWordIndex ?? (this.skipFilter ? 1 : 3)
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
      const hasLetters = /[\p{L}]/u.test(rawValue)
      const hasNumbers = /[\p{N}]/u.test(rawValue)
      if (startsWithMatch && searchNumbers && hasNumbers && !hasLetters) {
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

    const findSearchWords = (contentChunk) => {
      if (typeof contentChunk !== 'string') {
        return []
      }

      return searchWords
        .map((word, wordIndex) => ({ word, wordIndex }))
        .filter(({ word, wordIndex }) => {
          if (searchNumbers) {
            // Remove all other chars, except numbers, so we can compare
            word = word.replace(/[^\p{L}\p{N}]+/gu, '')
          } else {
            // To ensure we escape regex chars
            word = escapeRegexChars(word)
          }

          const wordBoundary = getWordBoundary(wordIndex)

          // if the uses reached word 3, then we go inside words as well
          const regexWord = new RegExp(
            wordIndex >= inWordIndex
              ? `${word}`
              : `(${wordBoundary})${word}`,
            'i'
          )

          if (regexWord.test(contentChunk)) {
            return true
          }

          if (
            searchNumbers &&
            regexWord.test(contentChunk.replace(/[^0-9]/g, ''))
          ) {
            return true
          }

          return false
        })
        .map(({ word, wordIndex }) => {
          // Use 1 to ensure we never have 0, because we filter out words with 0 later
          let wordScore = 0

          // Check how ofter the current written word is inside the content,
          // and give a score for each one
          wordScore += (
            contentChunk.match(
              new RegExp(
                `(${getWordBoundary(wordIndex)})${escapeRegexChars(word)}`,
                'ig'
              )
            ) || []
          ).length

          // Give the first word extra points
          if (wordIndex === 0) {
            // Check if the first chunk starts the first written word
            const isFirstWord = new RegExp(
              `^${escapeRegexChars(searchWords[0])}`,
              'i'
            ).test(contentChunk.split(' ')[0])

            // If yes, add the amount of possible words + 1
            if (isFirstWord) {
              wordScore += searchWords.length + 1
            }
          }

          return {
            word,
            wordIndex,
            wordScore,
          }
        })
    }

    const strS = '\uFFFE'
    const strE = '\uFFFF'

    searchIndex = searchIndex.map((item, i) => {
      const listOfFoundWords = findSearchWords(item.contentChunk, i)

      // Check if ALL search words are purely numeric (no letters)
      const allWordsAreNumeric = searchNumbers
        ? searchWords.every((word) => /^[\p{N}\s.,]+$/u.test(word))
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
            const normalized = segment
              .replace(new RegExp(`(${strS})+`, 'g'), strS)
              .replace(new RegExp(`(${strE})+`, 'g'), strE)
              .replace(new RegExp(`(${strE}${strS})`, 'g'), '')

            const tokens = normalized
              .split(new RegExp(`(${strS}|${strE})`, 'g'))
              .filter(Boolean)

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

  onHideHandler = (args = {}) => {
    const res = dispatchCustomElementEvent(this, 'on_hide', {
      ...args,
      ...this.getEventObjects('on_hide'),
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
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        ...this.getEventObjects('on_select'),
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

    if (!isTrue(preventSelection)) {
      if (!isTrue(keepOpen)) {
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

    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      ...this.getEventObjects('on_change'),
    })
  }

  getAriaLiveUpdate() {
    const { opened } = this.context.drawerList

    // this is only to make a better screen reader ux
    if (opened) {
      const { ariaLiveOptions, noOptions } = this._props
      const count = this.countData()

      let newString = null

      if (count > 0) {
        newString = String(ariaLiveOptions).replace('%s', count)
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
      this.context.getTranslation(this.props).Autocomplete,
      pickFormElementProps(this.context?.formElement),
      this.context.Autocomplete
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
      alignAutocomplete,
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
      keepSelection, // eslint-disable-line
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
      trianglePosition,
      iconPosition,
      skipPortal,
      independentWidth,
      autoComplete,

      mode: _mode, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      inputValue: _input_value, // eslint-disable-line
      enableBodyLock: _enableBodyLock, // eslint-disable-line
      listClass: _listClass, // eslint-disable-line
      openOnFocus: _openOnFocus, // eslint-disable-line
      disableReorder: _disableReorder, // eslint-disable-line
      disableFilter: _disableFilter, // eslint-disable-line

      indicator_label, // eslint-disable-line
      no_options, // eslint-disable-line
      show_all, // eslint-disable-line
      aria_live_options, // eslint-disable-line
      disable_highlighting, // eslint-disable-line
      indicatorLabel: _indicatorLabel, // eslint-disable-line
      noOptions: _noOptions, // eslint-disable-line
      showAll: _showAll, // eslint-disable-line
      ariaLiveOptions: _ariaLiveOptions, // eslint-disable-line
      disableHighlighting: _disableHighlighting, // eslint-disable-line
      onClear, // eslint-disable-line

      ...attributes
    } = props

    const showStatus = getStatusState(status)

    const { inputValue, visibleIndicator } = this.state

    const { id, hidden, selectedItem, direction, opened } =
      this.context.drawerList

    const isExpanded = Boolean(opened) && this.hasValidData()

    // In case a developer is using onBlur
    // it would blur uncontrolled – so we relay on "on_blur".
    // But the "onBlur" will still function, now just as expected.
    delete attributes.onBlur

    // make it possible to grab the rest attributes and return it with all events
    this.attributes = validateDOMAttributes(null, attributes)
    Object.assign(this.context.drawerList.attributes, this.attributes)

    const mainParams = {
      className: classnames(
        'dnb-autocomplete',
        direction && `dnb-autocomplete--${direction}`,
        disabled && 'dnb-autocomplete--disabled',
        opened && 'dnb-autocomplete--opened',
        labelDirection && `dnb-autocomplete--${labelDirection}`,
        iconPosition && `dnb-autocomplete--icon-position-${iconPosition}`,
        alignAutocomplete && `dnb-autocomplete--${alignAutocomplete}`,
        visibleIndicator && 'dnb-autocomplete--show-indicator',
        size && `dnb-autocomplete--${size}`,
        isTrue(stretch) && `dnb-autocomplete--stretch`,
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
      autoCapitalize: 'none',
      spellCheck: 'false',
      autoCorrect: 'off',
      autoComplete,

      // ARIA
      role: 'combobox', // we need combobox twice to make it properly work on VO
      'aria-autocomplete': 'both', // list, both
      'aria-controls': isExpanded ? `${id}-ul` : undefined,
      'aria-haspopup': 'listbox',
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

    if (!(parseFloat(selectedItem) > -1)) {
      inputParams.placeholder = placeholder || title
      if (!(IS_WIN && IS_EDGE)) {
        inputParams['aria-placeholder'] = undefined
      }
    }

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

    let submitButton = false
    const triggerParams = {
      id: id + '-submit-button',
      disabled,
      status: status ? statusState : null,
      onKeyDown: this.onTriggerKeyDownHandler,
      onSubmit: this.toggleVisible,
      onMouseDown: this.reserveActivityHandler,
      'aria-haspopup': 'listbox',
      'aria-expanded': isExpanded,
      'aria-label': !hidden ? submitButtonTitle : undefined,
      tooltip: showSubmitButton ? submitButtonTitle : null,
      className: opened ? 'dnb-button--active' : null,
    }

    if (submitElement && React.isValidElement(submitElement)) {
      submitButton = React.cloneElement(submitElement, triggerParams)
    } else if (isTrue(showSubmitButton)) {
      submitButton = (
        <SubmitButton
          icon={submitButtonIcon}
          iconSize={iconSize || (size === 'large' ? 'medium' : 'default')}
          variant="secondary"
          size={size === 'default' ? 'medium' : size}
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
                <CustomInput {...customInputParams} />
              ) : (
                <Input
                  icon={
                    visibleIndicator ? (
                      <ProgressIndicator
                        size={size === 'large' ? 'medium' : 'small'}
                      />
                    ) : (
                      inputIcon
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
                  clear={isTrue(showClearButton)}
                  onClear={onClear}
                  ref={this._refInput}
                  {...inputParams}
                  {...statusProps}
                />
              )}

              {!submitButton && (
                <span className="dnb-sr-only">
                  <button
                    tabIndex="-1"
                    type="button" // is needed, else a form will submit
                    onClick={this.toggleVisibleAndFocusOptions}
                  >
                    {showOptionsSr}
                  </button>
                </span>
              )}

              <DrawerList
                id={id}
                className={classnames(
                  'dnb-autocomplete__root',
                  drawerClass
                )}
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
                trianglePosition={trianglePosition || iconPosition}
                keepOpen={keepOpen}
                preventClose={preventClose}
                alignDrawer={alignAutocomplete}
                fixedPosition={fixedPosition}
                disabled={disabled}
                maxHeight={maxHeight}
                direction={direction}
                size={size}
                optionsRender={optionsRender}
                on_change={this.onChangeHandler}
                on_select={this.onSelectHandler}
                on_hide={this.onHideHandler}
                on_pre_change={this.onPreChangeHandler}
                on_key_down={this.reserveActivityHandler}
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
