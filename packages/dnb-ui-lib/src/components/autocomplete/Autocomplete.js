/**
 * Web Autocomplete Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  warn,
  isTrue,
  isTouchDevice,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  convertJsxToString
} from '../../shared/component-helper'
import {
  IS_MAC,
  IS_WIN,
  IS_IE11,
  IS_EDGE,
  debounce
} from '../../shared/helpers'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import Input, { SubmitButton } from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  parseContentTitle,
  getCurrentData
} from '../../fragments/drawer-list/DrawerListHelpers'

export default class Autocomplete extends React.PureComponent {
  static tagName = 'dnb-autocomplete'

  static propTypes = {
    id: PropTypes.string,
    mode: PropTypes.oneOf(['sync', 'async']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    no_options: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    show_all: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    aria_live_options: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    indicator_label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    submit_button_title: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_size: PropTypes.string,
    icon_position: PropTypes.oneOf(['left', 'right']),
    triangle_position: PropTypes.oneOf(['left', 'right']),
    input_icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keep_value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    status_state: PropTypes.string,
    status_animation: PropTypes.string,
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    disable_filter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    disable_reorder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disable_highlighting: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
    max_height: PropTypes.number,
    skip_portal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_scroll_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    show_submit_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    prevent_selection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    align_autocomplete: PropTypes.oneOf(['left', 'right']),
    options_render: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
      PropTypes.node
    ]),
    input_component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    data: PropTypes.oneOfType([
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.node,
        PropTypes.object
      ]),
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
          PropTypes.shape({
            selected_value: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.node
            ]),
            content: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.node,
              PropTypes.arrayOf(PropTypes.string)
            ])
          })
        ])
      )
    ]),
    search_in_word_index: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    default_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    input_value: PropTypes.string,
    open_on_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    drawer_class: PropTypes.string,
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array
    ]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,

    on_show: PropTypes.func,
    on_hide: PropTypes.func,
    on_change: PropTypes.func,
    on_select: PropTypes.func,
    on_state_update: PropTypes.func
  }

  static defaultProps = {
    id: null,
    mode: 'sync',
    title: 'Option Menu',
    placeholder: null,
    no_options: null,
    show_all: null,
    aria_live_options: null,
    indicator_label: null,
    submit_button_title: null,
    icon: 'chevron_down',
    icon_size: null,
    icon_position: 'left',
    triangle_position: null,
    input_icon: 'search',
    label: null,
    label_direction: null,
    label_sr_only: null,
    keep_value: null,
    status: null,
    status_state: 'error',
    status_animation: null,
    global_status_id: null,
    suffix: null,
    disable_filter: false,
    disable_reorder: false,
    scrollable: true,
    focusable: false,
    disable_highlighting: false,
    max_height: null,
    direction: 'auto',
    skip_portal: null,
    no_animation: false,
    no_scroll_animation: false,
    show_submit_button: false,
    prevent_selection: false,
    size: 'default',
    align_autocomplete: null,
    data: null,
    search_in_word_index: 3,
    default_value: null,
    value: 'initval',
    input_value: 'initval',
    open_on_focus: false,
    prevent_close: false,
    keep_open: false,
    opened: null,
    disabled: null,
    skeleton: null,
    drawer_class: null,
    class: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_show: null,
    on_hide: null,
    on_change: null,
    on_select: null,
    on_state_update: null,
    input_component: null
  }

  static enableWebComponent() {
    registerElement(
      Autocomplete.tagName,
      Autocomplete,
      Autocomplete.defaultProps
    )
  }

  render() {
    return (
      <DrawerListProvider
        {...this.props}
        data={this.props.data || this.props.children}
        opened={null}
        tagName="dnb-autocomplete"
        ignore_events={false}
        prevent_focus
        skip_keysearch
      >
        <AutocompleteInstance {...this.props} />
      </DrawerListProvider>
    )
  }
}

class AutocompleteInstance extends React.PureComponent {
  static propTypes = Autocomplete.propTypes
  static defaultProps = Autocomplete.defaultProps
  static contextType = DrawerListContext

  static parseDataItem(dataItem) {
    const toParse = parseContentTitle(dataItem, {
      separator: ' '
    })
    if (typeof toParse !== 'string' && Array.isArray(toParse)) {
      return AutocompleteInstance.parseDataItem(toParse)
    }
    return toParse
  }

  static createSearchIndex(data) {
    return data.map((dataItem) => {
      const searchChunk = AutocompleteInstance.parseDataItem(dataItem)
      return { dataItem, searchChunk }
    })
  }

  static getCurrentDataTitle(selected_item, data) {
    const currentData = getCurrentData(selected_item, data)
    return parseContentTitle(currentData, {
      separator: ' ',
      preferSelectedValue: true
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.skipHighlight = isTrue(props.disable_highlighting)

      if (
        props.input_value !== 'initval' &&
        typeof state.inputValue === 'undefined' &&
        props.input_value &&
        props.input_value.length > 0
      ) {
        state.inputValue = props.input_value
      }

      if (props.data !== state.init_data) {
        state.updateData(props.data)
        state.init_data = props.data
      }
    }

    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.attributes = {}
    this.state = this.state || {}
    this.state._listenForPropChanges = true
    this.state.mode = props.mode
    this.state.init_data = props.data // only to compare agains new data
    this.state.updateData = this.updateData // only so we can call setData

    if (context.drawerList && context.drawerList.current_title) {
      this.state.inputValue = context.drawerList.current_title
    }

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refInput = React.createRef()

    this.isTouchDevice = isTouchDevice()

    this.skipFilter = isTrue(props.disable_filter)
    this.skipReorder = isTrue(props.disable_reorder)
    this.inWordIndex = (parseFloat(props.search_in_word_index) || 3) - 2
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.runFilterToHighlight({ fillDataIfEmpty: true })
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.setHidden()
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
    clearTimeout(this._ariaLiveUpdateTiemout)
    clearTimeout(this._focusTimeout)
    clearTimeout(this._toggleVisibleTimeout)
  }

  setVisible = () => {
    this.context.drawerList
      .setWrapperElement(this._refShell.current)
      .setVisible()
  }

  setHidden = () => {
    this.context.drawerList.setHidden()
  }

  toggleVisible = ({ hasFilter = false } = {}) => {
    if (
      !hasFilter &&
      !isTrue(this.props.prevent_close) &&
      !this.context.drawerList.hidden &&
      this.context.drawerList.opened
    ) {
      this.setHidden()
    } else {
      this.setVisibleByContext()
    }
  }

  setVisibleByContext = (options = {}) => {
    const skipFilter = this.state.showAllNextTime
    if (skipFilter) {
      this.setState({
        showAllNextTime: false,
        _listenForPropChanges: false
      })
    }

    this.runFilterToHighlight({
      fillDataIfEmpty: true,
      skipFilter,
      ...options
    })

    this.setVisible()
  }

  scrollToActiveItem = () => {
    this.context.drawerList.scrollToItem(
      this.context.drawerList.active_item,
      {
        scrollTo: false
      }
    )
  }

  scrollToSelectedItem = () => {
    this.context.drawerList.scrollToAndSetActiveItem(
      this.context.drawerList.selected_item,
      {
        scrollTo: false
      }
    )
  }

  onInputChangeHandler = ({ value, event }, options = {}) => {
    this.setState({
      typedInputValue: value,
      inputValue: value,
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this, 'on_type', {
      value,
      event,
      ...this.getEventObjects('on_type')
    })

    value = String(value).trim()
    if (value !== this.state.inputValue) {
      this.runFilterWithSideEffects(value, options)
    }
  }

  runFilterWithSideEffects = (value, options = {}) => {
    // run the filter also on invalid values, so we reset the highlight
    const data = this.runFilter(value, options)
    const count = this.countData(data)

    if (value && value.length > 0) {
      // show the "no_options" message
      if (count === 0) {
        if (this.state.mode !== 'async') {
          this.showNoOptionsItem()
        }
      } else if (count > 0) {
        this.context.drawerList.setData(this.wrapWithShowAll(data))
        this.context.drawerList.setState(
          {
            cache_hash: value + count
          }
          // () =>
          //   options &&
          //   typeof options.afterSetState === 'function' &&
          //   options.afterSetState(data)
        )

        if (count === 1) {
          this.context.drawerList.setState({
            active_item: data[0].__id
          })
        }
      }
    } else {
      // this will not remove selected_item
      this.totalReset()
      this.showAllItems()
    }

    this.setVisible()
    this.setAriaLiveUpdate()

    return data
  }

  runFilterToHighlight = (
    { fillDataIfEmpty = false, ...options } = {},
    value = this.state.inputValue
  ) => {
    // do not filter or highlight if the current selected item is the same as the input value
    const possibleTitle = AutocompleteInstance.getCurrentDataTitle(
      this.context.drawerList.selected_item,
      this.context.drawerList.original_data
    )

    if (value === possibleTitle) {
      return // stop here
    }

    value = String(value || '').trim()

    this.setState({
      skipHighlight: false,
      _listenForPropChanges: false
    })

    let data = this.runFilter(value, options) // do not skip the filter here

    // this is a backup, in case everything is empty, we fill the data
    if (fillDataIfEmpty && data.length === 0 && value === '') {
      data = this.context.drawerList.original_data
    }

    this.context.drawerList.setData(this.wrapWithShowAll(data))
    this.context.drawerList.setState({
      cache_hash: value + this.countData(data)
    })

    this.setAriaLiveUpdate()

    return data
  }

  wrapWithShowAll = (data) => {
    if (!this.hasFilterActive(data)) {
      return data
    }

    const lastItem = data.slice(-1)[0]
    if (lastItem && !lastItem.show_all) {
      const { show_all } = this._props

      // NB: here we could use unshift, but this has to be implemented different places as well
      data.push({
        __id: lastItem.__id + 1,
        class_name: 'dnb-autocomplete__show-all',
        show_all: true,
        active_item: false,
        selected_item: false,
        content: (
          <>
            <IconPrimary icon="arrow_down" />
            {show_all}
          </>
        )
      })
    }

    return data
  }

  setInputValue = (inputValue) => {
    this.setState({
      inputValue,
      _listenForPropChanges: false
    })
  }

  emptyData = () => {
    this._rC = {}

    this.setState({
      inputValue: '',
      typedInputValue: null,
      _listenForPropChanges: false
    })

    this.context.drawerList.setData(
      () => [],
      () => {
        this.setSearchIndex({ overwriteSearchIndex: true })
        this.resetSelections()
        this.totalReset()
      },
      {
        overwriteOriginalData: true
      }
    )
  }

  showNoOptionsItem = () => {
    this.resetSelections()
    this.ignoreEvents()
    this.context.drawerList.setData([
      {
        class_name: 'dnb-autocomplete__no-options',
        content: this._props.no_options,
        ignore_events: true,
        __id: 'no_options'
      }
    ])
    this.context.drawerList.setState({
      cache_hash: 'no_options'
    })
    this.setVisible()
  }

  showIndicatorItem = () => {
    this.resetSelections()
    this.ignoreEvents()
    this.context.drawerList.setData([
      {
        class_name: 'dnb-autocomplete__indicator',
        content: <ProgressIndicator label={this._props.indicator_label} />,
        ignore_events: true,
        __id: 'indicator'
      }
    ])
    this.context.drawerList.setState({
      cache_hash: 'indicator'
    })
    this.setVisible()
  }

  showIndicator = () => {
    if (!this.state.visibleIndicator) {
      this.setState({
        visibleIndicator: true,
        _listenForPropChanges: false
      })
    }
  }

  hideIndicator = () => {
    this.setState({
      visibleIndicator: false,
      _listenForPropChanges: false
    })
  }

  setMode = (mode) => {
    this.setState({
      mode,
      _listenForPropChanges: false
    })
  }

  updateData = (rawData) => {
    // invalidate the local cache now,
    // because we get else the same after we show the new result
    this.context.drawerList.setState({
      cache_hash: 'updateData'
    })

    this.context.drawerList.setData(
      () => rawData, // set data as a function, so it gets re-evaluated with normalizeData
      (newData) => {
        this.setSearchIndex(
          { overwriteSearchIndex: true, data: newData },
          () => {
            const { typedInputValue } = this.state

            if (typedInputValue && typedInputValue.length > 0) {
              // run with side effects, to get preselection of active_item
              const filteredData = this.runFilterWithSideEffects(
                typedInputValue
              )
              if (this.countData(filteredData) === 0) {
                this.showNoOptionsItem()
              }
            } else {
              this.resetSelections()
              if (this.context.drawerList.opened) {
                this.showAllItems()
              }
            }
          }
        )
      },
      {
        overwriteOriginalData: true
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
  }

  onInputClickHandler = (e) => {
    const { value } = e.target
    this.setVisibleByContext({ value })
  }

  onInputFocusHandler = (event) => {
    if (this.state.skipFocus) {
      return // stop here
    }

    if (isTrue(this.props.open_on_focus)) {
      const { value } = event.target
      this.setVisibleByContext({ value })
    } else {
      this.setSearchIndex()
    }

    dispatchCustomElementEvent(this, 'on_focus', {
      event,
      ...this.getEventObjects('on_focus')
    })
  }

  onBlurHandler = (event) => {
    const {
      input_value,
      open_on_focus,
      keep_value,
      prevent_selection
    } = this.props

    this.setState({
      typedInputValue: null,
      _listenForPropChanges: false
    })

    if (isTrue(open_on_focus)) {
      this.setHidden()
    }

    dispatchCustomElementEvent(this, 'on_blur', {
      event,
      ...this.getEventObjects('on_blur')
    })

    if (!isTrue(prevent_selection)) {
      const inputValue = AutocompleteInstance.getCurrentDataTitle(
        this.context.drawerList.selected_item,
        this.context.drawerList.original_data
      )

      clearTimeout(this._selectTimeout)
      this._selectTimeout = setTimeout(() => {
        if (parseFloat(this.context.drawerList.selected_item) > -1) {
          this.setState({
            inputValue,
            _listenForPropChanges: false
          })
        } else if (
          !(input_value !== 'initval' && input_value.length > 0) &&
          !isTrue(keep_value)
        ) {
          this.setState({
            inputValue: '',
            _listenForPropChanges: false
          })
        }
      }, 1) // to make sure we actually are after the Input state handling -> "input placeholder reset"
    }
  }

  onTriggerKeyDownHandler = (e) => {
    const key = keycode(e)

    switch (key) {
      case 'space':
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
          try {
            this._refInput.current._ref.current.focus()
          } catch (e) {
            warn(e)
          }
        }
        break
    }
  }

  onSubmit = () => {
    this.toggleVisible()
  }

  onShellKeyDownHandler = (e) => {
    const key = keycode(e)

    switch (key) {
      case 'up':
      case 'down':
        if (!this.context.drawerList.opened) {
          e.preventDefault()
          this.setVisible()
        }

        break

      case 'esc':
        this.setState({
          showAllNextTime: true,
          _listenForPropChanges: false
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
          clearTimeout(this._toggleVisibleTimeout)
          this._toggleVisibleTimeout = setTimeout(this.toggleVisible, 1) // to make sure we first handle the DrawerList key enter, before we update the state with a toggle/visible. Else the submit is not set properly
        } else {
          this.setVisible()
        }

        break
    }
  }

  getEventObjects = (key) => {
    const attributes = this.attributes

    return {
      attributes,
      dataList: this.context.drawerList.data,
      updateData: this.updateData,
      showAllItems: this.showAllItems,
      setVisible: this.setVisible,
      setHidden: this.setHidden,
      emptyData: this.emptyData,
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
      }
    }
  }

  hasShowMore = (data = this.context.drawerList.data) => {
    const lastItem = data.slice(-1)[0]
    return lastItem && lastItem.show_all === true
  }

  countData = (data = this.context.drawerList.data) => {
    const count = data.length
    return count > 0 && this.hasShowMore(data) ? count - 1 : count
  }

  hasValidData = (data = this.context.drawerList.data) => {
    if (this.countData(data) > 0) {
      const first = data[0]
      if (
        !first.show_all &&
        !['no_options', 'indicator'].includes(first.__id)
      ) {
        return true
      }
    }
    return false
  }

  hasSelectedItem = () => {
    return parseFloat(this.context.drawerList.selected_item) > -1
  }

  hasActiveItem = () => {
    return parseFloat(this.context.drawerList.active_item) > -1
  }

  hasFilterActive = (data = this.context.drawerList.data) => {
    return !(
      this.context.drawerList.original_data &&
      this.context.drawerList.original_data.length === this.countData(data)
    )
  }

  setSearchIndex(
    {
      overwriteSearchIndex = false,
      data = this.context.drawerList.original_data
    } = {},
    cb
  ) {
    this._rC = {}

    if (!overwriteSearchIndex && this.state.searchIndex) {
      return this.state.searchIndex
    }

    const searchIndex = AutocompleteInstance.createSearchIndex(data)

    this.setState(
      {
        searchIndex,
        _listenForPropChanges: false
      },
      cb
    )

    return searchIndex
  }

  ignoreEvents = () => {
    clearTimeout(this.showAllTimeout)
    this.context.drawerList.setState(
      {
        ignore_events: true // we also have to reset this one
      },
      () => {
        // but we reset it right after the rerender
        this.showAllTimeout = setTimeout(() => {
          this.context &&
            this.context.drawerList &&
            this.context.drawerList.setState({
              ignore_events: false // we also have to reset this one
            })
        }, 10) // make sure we reset once the rerender of DrawerList is done, because then we keep the active_item at it's position by using key="down"
      }
    )
  }

  showAll = () => {
    this.resetFilter()

    this.context.drawerList.setState({
      cache_hash: 'all'
    })

    this.runFilterToHighlight({ skipFilter: true, fillDataIfEmpty: true })
  }

  showAllItems = () => {
    this.resetFilter()
    this.context.drawerList.setState({
      cache_hash: 'all'
    })
    this.scrollToSelectedItem()
  }

  totalReset = () => {
    if (!isTrue(this.props.keep_value)) {
      this.setState({
        inputValue: null
      })
    }
    this.setState({
      typedInputValue: null,
      _listenForPropChanges: false
    })
    this.context.drawerList.setState({
      selected_item: null
    })
  }

  resetSelections = () => {
    this.context.drawerList.setState({
      active_item: null
    })
  }

  resetFilter = () => {
    this.context.drawerList.setData(this.context.drawerList.original_data)
  }

  runFilter = (
    value,
    {
      data = null, // rawData
      searchIndex = this.state.searchIndex,
      skipHighlight = false,
      skipFilter = false,
      skipReorder = false
    } = {}
  ) => {
    const words = value.split(/\s+/g).filter(Boolean)
    const wordsCount = words.length
    const wordCond = '^|\\s'

    const findWords = (item) =>
      words
        .map((word, wordIndex) => ({
          word,
          wordIndex,
          score: wordsCount - wordIndex
        }))
        .filter(
          ({ word, wordIndex }) =>
            // if the uses reached word 3, then we go inside words as well
            typeof item === 'string' &&
            new RegExp(
              wordIndex > this.inWordIndex
                ? `${word}`
                : `(${wordCond})${word}`,
              'i'
            ).test(item)
        )

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

    const S = '\uFFFE'
    const E = '\uFFFF'
    const tagS = '<span class="dnb-drawer-list__option__item--highlight">'
    const tagE = '</span>'

    searchIndex = searchIndex.map((item) => {
      const listOfFoundWords = findWords(item.searchChunk)

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
        // if the ID and the content is the same, use the cached version
        const cacheHash = id + value
        this._rC = this._rC || {}
        if (this._rC[cacheHash]) {
          return this._rC[cacheHash]
        }

        let Component = null

        // it can be an object, React element or an array
        if (typeof children !== 'string') {
          if (!Array.isArray(children)) {
            children = [children]
          }

          // keep the original for later
          Component = children

          // make string out of it
          children = children.map((child) => convertJsxToString(child))
        }

        if (typeof children === 'string') {
          children = [children] // for a while we had split this into seperate words children.split(' ') but this is not needed anymore
        }

        children = children
          .map((segment, sIndex) => {
            if (skipHighlight || this.state.skipHighlight) {
              return segment
            }

            listOfFoundWords.forEach(({ word, wordIndex }) => {
              if (wordIndex > this.inWordIndex) {
                segment = segment.replace(
                  new RegExp(`(${word})`, 'gi'),
                  `${S}$1${E}`
                )
              } else {
                segment = segment.replace(
                  new RegExp(`(${wordCond})(${word})`, 'gi'),
                  `$1${S}$2${E}`
                )
              }
            })

            if (segment.includes(S)) {
              // to make sure we don't have several in a row
              const __html = segment
                .replace(new RegExp(`(${S})+`, 'g'), S)
                .replace(new RegExp(`(${E})+`, 'g'), E)
                .replace(new RegExp(`(${E}${S})`, 'g'), '')
                .replace(new RegExp(S, 'g'), tagS)
                .replace(new RegExp(E, 'g'), tagE)

              return (
                <span
                  key={cacheHash + sIndex}
                  dangerouslySetInnerHTML={{
                    __html
                  }}
                />
              )
            }

            return segment
          })
          .map((c, i, a) => (i < a.length - 1 ? [c, ' '] : c)) // add back the skiped spaces

        if (Component) {
          children = Array.isArray(Component)
            ? Component.map((Comp, i) =>
                React.cloneElement(
                  Comp,
                  { key: 'clone' + cacheHash + i },
                  children[i]
                )
              )
            : React.cloneElement(
                Component,
                { key: 'clone' + cacheHash },
                children
              )
        }

        return (this._rC[cacheHash] = children)
      }

      // this prioritizes the first written words
      const totalScore = listOfFoundWords.reduce(
        (acc, { score }) => (acc += score),
        0
      )

      if (this.skipFilter || skipFilter) {
        return item.dataItem
      }

      return {
        countFindings: listOfFoundWords.length + totalScore,
        item
      }
    })

    if (!this.skipFilter && !skipFilter) {
      // This removes items with 0 findings
      searchIndex = searchIndex.filter(
        ({ countFindings }) => countFindings
      )

      if (!this.skipReorder && !skipReorder) {
        searchIndex = searchIndex.sort(
          ({ countFindings: a }, { countFindings: b }) => b - a
        )
      }

      searchIndex = searchIndex.map(({ item }) => item.dataItem)
    }

    return searchIndex
  }

  onHideHandler = () => {
    try {
      this._refInput.current._ref.current.focus({
        preventScroll: true
      })
    } catch (e) {
      // do nothing
    }
  }

  onSelectHandler = (args) => {
    if (parseFloat(args.active_item) > -1) {
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        ...this.getEventObjects('on_select')
      })
    }
  }

  onPreChangeHandler = ({ data, selected_item }) => {
    if (data && data.show_all) {
      this.showAll()

      if (parseFloat(selected_item) > -1) {
        const active_item = selected_item - 1
        clearTimeout(this._selectTimeout)
        this._selectTimeout = setTimeout(() => {
          this.context.drawerList.setState({
            active_item
          })
          this.scrollToActiveItem()
        }, 1)
      }

      return false
    }
  }

  onChangeHandler = (args) => {
    const selected_item = args.selected_item

    const { prevent_selection, keep_open } = this.props

    if (!isTrue(prevent_selection)) {
      if (!isTrue(keep_open)) {
        this.setState({
          skipFocus: true,
          skipHighlight: true,
          _listenForPropChanges: false
        })

        this.setHidden()

        // Do this, so screen readers get a NEW focus later on
        // So we first need a blur of the input basically
        try {
          this.context.drawerList._refUl.current.focus({
            preventScroll: true
          })
        } catch (e) {
          // do nothing
        }

        clearTimeout(this._selectTimeout)
        this._selectTimeout = setTimeout(() => {
          this.setState({
            inputValue: AutocompleteInstance.getCurrentDataTitle(
              selected_item,
              this.context.drawerList.data
            ),
            skipFocus: false,
            _listenForPropChanges: false
          })

          try {
            this._refInput.current._ref.current.focus({
              preventScroll: true
            })
          } catch (e) {
            // do nothing
          }
        }, 200) // so we properly can set the focus "again" we have to have this amount of delay
      } else {
        this.setState({
          inputValue: AutocompleteInstance.getCurrentDataTitle(
            selected_item,
            this.context.drawerList.data
          ),
          _listenForPropChanges: false
        })
      }
    }

    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      ...this.getEventObjects('on_change')
    })
  }

  setAriaLiveUpdate() {
    const { opened } = this.context.drawerList
    const { aria_live_options, no_options } = this._props

    // this is only to make a better screen reader ux
    clearTimeout(this._ariaLiveUpdateTiemout)
    this._ariaLiveUpdateTiemout = setTimeout(() => {
      if (opened) {
        let newString = null

        const count = this.countData()

        if (count > 0) {
          newString = String(aria_live_options).replace('%s', count)
        } else {
          newString = no_options
        }

        if (newString) {
          this.setState({
            ariaLiveUpdate: newString,
            _listenForPropChanges: false
          })
          this._ariaLiveUpdateTiemout = setTimeout(() => {
            this.setState({
              ariaLiveUpdate: null,
              _listenForPropChanges: false
            })
          }, 1e3)
        }
      }
    }, 1e3) // so that the input gets read out first, and then the results
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = (this._props = extendPropsWithContext(
      this.props,
      Autocomplete.defaultProps,
      this.context.formRow,
      this.context.translation.Autocomplete
    ))

    const {
      title,
      placeholder,
      label,
      label_direction,
      label_sr_only,
      icon,
      icon_size,
      input_icon,
      size,
      align_autocomplete,
      fixed_position,
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
      scrollable,
      focusable,
      keep_open,
      prevent_close,
      no_animation,
      no_scroll_animation,
      show_submit_button,
      input_component: CustomInput,
      options_render,
      prevent_selection,
      max_height,
      default_value,
      submit_button_title,
      drawer_class,
      className,
      class: _className,
      disabled,
      skeleton,
      triangle_position,
      icon_position,
      skip_portal,

      mode: _mode, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      input_value: _input_value, // eslint-disable-line

      indicator_label, // eslint-disable-line
      no_options, // eslint-disable-line
      show_all, // eslint-disable-line
      aria_live_options, // eslint-disable-line
      disable_highlighting, // eslint-disable-line

      ...attributes
    } = props

    // let { icon_position } = props
    // if (icon_position !== 'right' && align_autocomplete === 'right') {
    //   icon_position = 'right'
    // }

    const id = this._id
    const showStatus = status && status !== 'error'

    const { inputValue, visibleIndicator, ariaLiveUpdate } = this.state

    const {
      hidden,
      selected_item,
      active_item,
      direction,
      opened
    } = this.context.drawerList

    const isExpanded = Boolean(opened) && this.hasValidData()

    // make it possible to grab the rest attributes and return it with all events
    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const mainParams = {
      className: classnames(
        'dnb-autocomplete',
        `dnb-autocomplete--${direction}`,
        opened && 'dnb-autocomplete--opened',
        label_direction && `dnb-autocomplete--${label_direction}`,
        icon_position &&
          `dnb-autocomplete--icon-position-${icon_position}`,
        align_autocomplete && `dnb-autocomplete--${align_autocomplete}`,
        visibleIndicator && 'dnb-autocomplete--show-indicator',
        size && `dnb-autocomplete--${size}`,
        status && `dnb-autocomplete__status--${status_state}`,
        showStatus && 'dnb-autocomplete__form-status',
        'dnb-form-component',
        createSpacingClasses(props),
        _className,
        className
      )
    }

    const shellParams = {
      className: 'dnb-autocomplete__shell dnb-no-focus',
      ref: this._refShell,
      onKeyDown: this.onShellKeyDownHandler
    }

    const inputParams = {
      className: classnames(
        'dnb-autocomplete__input',
        opened && 'dnb-button--active'
      ),
      id,
      value: inputValue,
      autoCapitalize: 'none',
      spellCheck: 'false',

      // ARIA
      role: 'combobox', // we need combobox twice to make it properly work on VO
      'aria-autocomplete': 'both', // list, both
      'aria-controls': `${id}-ul`,
      'aria-haspopup': 'listbox',
      'aria-expanded': isExpanded, // is needed for semantics
      // 'aria-roledescription': 'autocomplete', // is not needed by now

      onMouseDown: this.onInputClickHandler,
      onTouchStart: this.onInputClickHandler,
      onKeyDown: this.onInputKeyDownHandler,
      onChange: this.onInputChangeHandler,
      onFocus: this.onInputFocusHandler,
      onBlur: this.onBlurHandler,
      icon_position,
      disabled,
      skeleton,
      ...attributes
    }

    if (!(parseFloat(selected_item) > -1)) {
      inputParams.placeholder = placeholder || title
      if (!(IS_WIN && (IS_IE11 || IS_EDGE))) {
        inputParams['aria-placeholder'] = undefined
      }
    }

    const triggerParams = isTrue(show_submit_button)
      ? {
          icon: icon,
          icon_size:
            icon_size || (size === 'large' ? 'medium' : 'default'),
          status: !opened && status ? status_state : null,
          title: submit_button_title,
          variant: 'secondary',
          disabled: disabled,
          size: size === 'default' ? 'medium' : size,
          onKeyDown: this.onTriggerKeyDownHandler,
          onSubmit: this.onSubmit,
          'aria-haspopup': 'listbox',
          'aria-expanded': isExpanded
        }
      : {}

    // Handling of activedescendant – required by NVDA
    if (!hidden) {
      if (parseFloat(active_item) > -1) {
        inputParams[
          'aria-activedescendant'
        ] = `option-${id}-${active_item}`
      } else if (
        !isTrue(prevent_selection) &&
        parseFloat(selected_item) > -1
      ) {
        inputParams[
          'aria-activedescendant'
        ] = `option-${id}-${selected_item}`
      }
    }

    if (showStatus || suffix) {
      inputParams['aria-describedby'] = [
        inputParams['aria-describedby'],
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      ]
        .filter(Boolean)
        .join(' ')
    }

    // also used for code markup simulation
    validateDOMAttributes(null, mainParams)
    validateDOMAttributes(null, shellParams)

    // make it possible to grab the rest attributes and return it with all events
    this.attributes = validateDOMAttributes(null, attributes)

    return (
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            label_direction={label_direction}
            sr_only={label_sr_only}
            disabled={disabled}
            skeleton={skeleton}
            onMouseDown={this.toggleVisible}
          />
        )}

        <span className="dnb-autocomplete__inner" ref={this._ref}>
          <AlignmentHelper />

          {showStatus && (
            <FormStatus
              id={id + '-form-status'}
              global_status_id={global_status_id}
              text_id={id + '-status'} // used for "aria-describedby"
              text={status}
              status={status_state}
              animation={status_animation}
              skeleton={skeleton}
            />
          )}

          <span className="dnb-autocomplete__row">
            <span {...shellParams}>
              {CustomInput ? (
                <CustomInput {...inputParams} />
              ) : (
                <Input
                  icon={
                    visibleIndicator ? (
                      <ProgressIndicator size="small" />
                    ) : (
                      input_icon
                    )
                  }
                  icon_size={
                    icon_size || (size === 'large' ? 'medium' : 'default')
                  }
                  size={size}
                  status={!opened && status ? status_state : null}
                  autoComplete="off"
                  type={null}
                  submit_element={
                    isTrue(show_submit_button) ? (
                      <SubmitButton
                        id={id + '-submit-button'}
                        {...triggerParams}
                      />
                    ) : (
                      false
                    )
                  }
                  input_state={this.state.skipFocus ? 'focus' : undefined} // because of the short blur / focus during select
                  ref={this._refInput}
                  {...inputParams}
                />
              )}

              <DrawerList
                id={id}
                className={classnames(
                  'dnb-autocomplete__root',
                  drawer_class
                )}
                inner_class="dnb-autocomplete__list"
                value={selected_item}
                default_value={default_value}
                scrollable={scrollable}
                focusable={focusable}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                skip_portal={skip_portal}
                prevent_selection={prevent_selection}
                triangle_position={triangle_position || icon_position}
                keep_open={keep_open}
                prevent_close={prevent_close}
                align_drawer={align_autocomplete}
                fixed_position={fixed_position}
                disabled={disabled}
                max_height={max_height}
                direction={direction}
                size={size}
                options_render={options_render}
                on_change={this.onChangeHandler}
                on_select={this.onSelectHandler}
                on_hide={this.onHideHandler}
                on_pre_change={this.onPreChangeHandler}
              />
            </span>

            {suffix && (
              <span
                className="dnb-autocomplete__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
              >
                <Suffix {...props}>{suffix}</Suffix>
              </span>
            )}
          </span>
        </span>

        {/* Help VO to read the list, as long as no input changes are made we need that (&& _input_value === inputValue) */}
        {IS_MAC && (
          <span className="dnb-sr-only" aria-live="assertive">
            {AutocompleteInstance.getCurrentDataTitle(
              active_item,
              this.context.drawerList.original_data
            )}
          </span>
        )}

        <span className="dnb-sr-only" aria-live="assertive">
          {ariaLiveUpdate}
        </span>
      </span>
    )
  }
}
