/**
 * Web Autocomplete Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { debounce } from '../../shared/helpers'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Input, { SubmitButton } from '../input/Input'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  parseContentTitle,
  getCurrentData,
  grabStringFromReact
} from '../../fragments/drawer-list/DrawerListHelpers'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_select: null,
  on_state_update: null,
  input_component: null
}

const propTypes = {
  id: PropTypes.string,
  mode: PropTypes.oneOf(['sync', 'async']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  no_options: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  aria_live_options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  indicator_label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  submit_button_title: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_size: PropTypes.string,
  icon_position: PropTypes.string,
  triangle_position: PropTypes.string,
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
  scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skip_highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  max_height: PropTypes.number,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_scroll_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_drawer_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  align_autocomplete: PropTypes.oneOf(['left', 'right']),
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
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  input_value: PropTypes.string,
  open_on_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  // React
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  on_change: PropTypes.func,
  on_select: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  id: null,
  mode: 'sync',
  title: 'Option Menu',
  no_options: null,
  aria_live_options: null,
  indicator_label: null,
  submit_button_title: null,
  icon: 'chevron-down',
  icon_size: null,
  icon_position: 'left',
  triangle_position: 'left',
  input_icon: 'search',
  label: null,
  label_direction: null,
  label_sr_only: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  suffix: null,
  scrollable: true,
  focusable: false,
  skip_highlight: false,
  max_height: null,
  direction: 'auto',
  no_animation: false,
  no_scroll_animation: false,
  show_drawer_button: false,
  prevent_selection: false,
  size: 'default',
  align_autocomplete: null,
  input_component: null,
  data: null,
  default_value: null,
  value: 'initval',
  input_value: 'initval',
  open_on_focus: false,
  prevent_close: false,
  keep_open: false,
  opened: null,
  disabled: null,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

export default class Autocomplete extends PureComponent {
  static tagName = 'dnb-autocomplete'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Autocomplete.tagName, Autocomplete, defaultProps)
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

class AutocompleteInstance extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
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
      state.skipHighlight = isTrue(props.skip_highlight)

      if (
        props.input_value !== 'initval' &&
        typeof state.inputValue === 'undefined' &&
        props.input_value?.length > 0
      ) {
        state.inputValue = props.input_value
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

    if (context.drawerList?.current_title) {
      this.state.inputValue = context.drawerList.current_title
    }

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refInput = React.createRef()
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.runFilterToHighlight()
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.setHidden()
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
    clearTimeout(this._ariaLiveUpdateTiemout)
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

  scrollToActiveItem = () => {
    if (
      // !(parseFloat(this.context.drawerList.selected_item) > -1) &&
      parseFloat(this.state.localActiveItem) > -1
    ) {
      this.context.drawerList.scrollToAndSetActiveItem(
        this.state.localActiveItem,
        {
          scrollTo: false
        }
      )
      this.setState({
        localActiveItem: null,
        _listenForPropChanges: false
      })
    }
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
    value = String(value).trim()

    if (value === this.state.inputValue) {
      return
    }

    this.setState({
      typedInputValue: value,
      _listenForPropChanges: false
    })

    this.runFilterWithSideEffects(value, options)

    dispatchCustomElementEvent(this, 'on_type', {
      value,
      event,
      ...this.getEventObjects('on_type')
    })
  }

  runFilterWithSideEffects = (value, options = {}) => {
    // run the filter also on invalid values, so we reset the highlight
    const data = this.runFilter(value, options)

    this.context.drawerList.setState(
      {
        cache_hash: value + data.length
      },
      () =>
        typeof options?.afterSetState === 'function' &&
        options?.afterSetState(data)
    )

    if (value && value.length > 0) {
      // show the "no_options" message
      if (data.length === 0) {
        if (this.state.mode !== 'async') {
          this.showNoOptionsItem()
        }
      } else if (data.length > 0) {
        this.context.drawerList.setData(data)

        const localActiveItem =
          data.length === 1 ||
          !parseFloat(this.context.drawerList.active_item > -1)
            ? data[0].__id
            : null

        this.setState(
          {
            localActiveItem, // used later so we can scroll there
            skipHighlight: false,
            _listenForPropChanges: false
          },
          () => {
            if (!localActiveItem) {
              this.context.drawerList.scrollToItem(data[0]?.__id, {
                scrollTo: false
              })
            }
          }
        )

        if (data.length === 1) {
          this.context.drawerList.setState({
            active_item: localActiveItem,
            ignore_events: false
          })
        }
      }
    } else {
      // this will not remove selected_item
      this.totalReset()
      this.showAll()
    }

    this.setVisible()
    this.setAriaLiveUpdate()

    return data
  }

  runFilterToHighlight = (value = null) => {
    if (value === null) {
      value = this.state.inputValue
    }
    value = String(value || '').trim()

    const data = this.runFilter(value)

    this.setState({
      skipHighlight: false,
      _listenForPropChanges: false
    })
    this.context.drawerList.setData(data)

    this.context.drawerList.setState({
      cache_hash: value + data.length,
      ignore_events: false
    })

    this.setAriaLiveUpdate()

    return data
  }

  emptyData = () => {
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

  showAllItems = () => {
    this.showAll()
    this.scrollToSelectedItem()
  }

  setMode = (mode) => {
    this.setState({
      mode,
      _listenForPropChanges: false
    })
  }

  updateData = (data) => {
    this.context.drawerList.setData(
      () => data, // set data as a function, so it gets re-evaluate
      () => {
        this.setSearchIndex({ overwriteSearchIndex: true }, () => {
          const { typedInputValue } = this.state

          if (typedInputValue?.length > 0) {
            // run with side effects, to get preselection of active_item
            const data = this.runFilterWithSideEffects(typedInputValue)
            if (data.length === 0) {
              this.showNoOptionsItem()
            }
          } else {
            this.resetSelections()
            this.context.drawerList.setState({
              active_item: -1,
              ignore_events: false
            })

            // Was used before to enhance UX, but looks like we now are good without
            // this.showAll()
            // this.scrollToSelectedItem()
          }
        })
      },
      {
        overwriteOriginalData: true
      }
    )

    return this
  }

  onInputClickHandler = (e) => {
    const value = e.target.value
    this.runFilterToHighlight(value)
    this.showAll()
    this.setVisible()
  }

  onInputFocusHandler = (event) => {
    if (this.state.skipFocus) {
      return // stop here
    }
    if (isTrue(this.props.open_on_focus)) {
      this.showAll()
      this.setVisible()
    } else {
      this.setSearchIndex()
    }

    dispatchCustomElementEvent(this, 'on_focus', {
      event,
      ...this.getEventObjects('on_focus')
    })
  }

  onBlurHandler = (event) => {
    this.setState({
      typedInputValue: null,
      _listenForPropChanges: false
    })

    if (isTrue(this.props.open_on_focus)) {
      this.setHidden()
    }

    dispatchCustomElementEvent(this, 'on_blur', {
      event,
      ...this.getEventObjects('on_blur')
    })

    if (parseFloat(this.context.drawerList.selected_item) > -1) {
      const inputValue = AutocompleteInstance.getCurrentDataTitle(
        this.context.drawerList.selected_item,
        this.context.drawerList.original_data
      )

      this.setState({
        skipHighlight: true,
        inputValue,
        _listenForPropChanges: false
      })
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

  toggleVisible = ({ hasFilter = false } = {}) => {
    if (
      !hasFilter &&
      !isTrue(this.props.prevent_close) &&
      !this.context.drawerList.hidden &&
      this.context.drawerList.opened
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }

  onSubmitHandler = () => {
    const hasFilter = this.hasFilterActive()
    this.showAll()
    this.toggleVisible({ hasFilter })
  }

  hasValidData = (data = this.context.drawerList.data) => {
    if (data.length > 0) {
      const first = data[0]
      if (!['no_options', 'indicator'].includes(first.__id)) {
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

  hasFilterActive = () => {
    return (
      this.context.drawerList.data.length !==
      this.context.drawerList.original_data?.length
    )
  }

  onTriggerKeyDownHandler = ({ event: e }) => {
    const key = keycode(e)
    switch (key) {
      case 'up':
      case 'down':
        e.preventDefault()

        if (this.hasFilterActive()) {
          this.ignoreEvents()
          this.showAll()
        }
        this.setVisible()
        this.scrollToActiveItem()

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

  setSearchIndex({ overwriteSearchIndex = false } = {}, cb) {
    if (!overwriteSearchIndex && this.state.searchIndex) {
      return this.state.searchIndex
    }

    const searchIndex = AutocompleteInstance.createSearchIndex(
      this.context.drawerList.original_data
    )

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
          this.context?.drawerList?.setState({
            ignore_events: false // we also have to reset this one
          })
        }, 10) // make sure we reset once the rerender of DrawerList is done, because then we keep the active_item at it's position by using key="down"
      }
    )
  }

  showAll = () => {
    this.resetFilter()
    this.setState({
      localActiveItem: null,
      _listenForPropChanges: false
    })
    this.context.drawerList.setState({
      cache_hash: 'all'
    })
  }

  totalReset = () => {
    this.setState({
      inputValue: undefined,
      typedInputValue: undefined,
      _listenForPropChanges: false
    })
    this.context.drawerList.setState({
      selected_item: null
    })
  }

  resetSelections = () => {
    this.context.drawerList.setState({
      active_item: null,
      ignore_events: false
    })
  }

  resetFilter = () => {
    this.context.drawerList.setData(this.context.drawerList.original_data)
  }

  runFilter = (value, { skipHighlight = false } = {}) => {
    const words = value.split(/\s+/g).filter(Boolean)
    const wordsCount = words.length

    const findWords = (item) =>
      words
        .map((word, wordIndex) => ({
          word,
          score: wordsCount - wordIndex
        }))
        .filter(
          ({ word }, wordIndex) =>
            // if the uses reached word 3, then we go inside words as well
            typeof item === 'string' &&
            (wordIndex > 1
              ? new RegExp(`${word}`, 'i').test(item)
              : new RegExp(`^${word}|\\s${word}`, 'i').test(item))
        )

    // get the search index
    let searchIndex = this.state.searchIndex
    if (!searchIndex) {
      searchIndex = this.setSearchIndex()
    }
    if (typeof searchIndex === 'undefined') {
      return []
    }

    const startTag =
      '<span class="dnb-drawer-list__option__item--highlight">'
    const endTag = '</span>'

    return (
      searchIndex
        .map((item, itemIndex) => {
          const listOfFoundWords = findWords(item.searchChunk)

          if (typeof item.dataItem === 'string') {
            item.dataItem = { content: item.dataItem }
          }

          // this function gets called once the items are rendered / in view
          item.dataItem.render = (children) => {
            let Component = null

            // it can be an object, React element or an array
            if (typeof children !== 'string') {
              if (!Array.isArray(children)) {
                children = [children]
              }

              // keep the original for later
              Component = children

              // make string out of it
              children = children.map((child) =>
                grabStringFromReact(child)
              )
            }

            if (typeof children === 'string') {
              children = [children] // for a while we had split this into seperate words children.split(' ') but this is not needed anymore
            }

            children = children
              .map((child) => {
                if (skipHighlight || this.state.skipHighlight) {
                  return child
                }

                const formatted = listOfFoundWords
                  .reverse()
                  .map(({ word }) => {
                    const charStart = child
                      .toLowerCase()
                      .indexOf(word.toLowerCase())
                    const charEnd = word.length + charStart

                    if (charStart === -1) {
                      return null
                    }

                    const ret = {
                      a: child.substring(0, charStart),
                      b: child.substring(charStart, charEnd),
                      c: child.substring(charEnd, child.length)
                    }

                    return ret
                  })
                  .filter(Boolean)
                  .reduce((acc, { a, b, c }) => {
                    if (acc.includes('TAG_START')) {
                      return acc.replace(
                        new RegExp(`(${b})`, 'gi'),
                        'TAG_START$1TAG_END'
                      )
                    }

                    return `${a}TAG_START${b}TAG_END${c}`
                  }, child)

                if (formatted.includes('TAG_START')) {
                  return (
                    <span
                      key={itemIndex + child}
                      dangerouslySetInnerHTML={{
                        __html: formatted
                          .replace(/TAG_START/g, startTag)
                          .replace(/TAG_END/g, endTag)
                      }}
                    />
                  )
                }

                return formatted
              })
              .map((c, i, a) => (i < a.length - 1 ? [c, ' '] : c)) // add back the skiped spaces

            if (Component) {
              children = Array.isArray(Component)
                ? Component.map((Comp, i) =>
                    React.cloneElement(
                      Comp,
                      { key: itemIndex + i },
                      children[i]
                    )
                  )
                : React.cloneElement(Component, null, children)
            }

            return children
          }

          // this prioritizes the first written words
          const totalScore = listOfFoundWords.reduce(
            (acc, { score }) => (acc += score),
            0
          )

          return {
            countFindings: listOfFoundWords.length + totalScore,
            item
          }
        })

        // This removes items with 0 findings
        .filter(({ countFindings }) => countFindings)
        .sort(({ countFindings: a }, { countFindings: b }) => b - a)
        .map(({ item }) => item.dataItem)
    )
  }

  onSelectHandler = (args) => {
    if (parseFloat(args.active_item) > -1) {
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        ...this.getEventObjects('on_select')
      })
    }
  }

  onChangeHandler = (args) => {
    const selected_item = args.selected_item

    const inputValue = AutocompleteInstance.getCurrentDataTitle(
      selected_item,
      this.context.drawerList.data
    )

    this.setState({
      skipFocus: true,
      skipHighlight: true,
      inputValue,
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      ...this.getEventObjects('on_change')
    })

    this.setHidden()

    clearTimeout(this._selectTimeout)
    this._selectTimeout = setTimeout(() => {
      if (!isTrue(this.props.keep_open)) {
        try {
          this._refInput.current._ref.current.focus()
          this.setState({
            skipFocus: false,
            _listenForPropChanges: false
          })
        } catch (e) {
          // do nothing
        }
      }
    }, 1) // because of state updates we need 1 tick delay here
  }

  setAriaLiveUpdate() {
    const { opened } = this.context.drawerList
    const { aria_live_options, no_options } = this._props

    // this is only to make a better screen reader ux
    if (opened) {
      clearTimeout(this._ariaLiveUpdateTiemout)
      this._ariaLiveUpdateTiemout = setTimeout(() => {
        let newString = null

        if (this.hasValidData()) {
          newString = String(aria_live_options).replace(
            '%s',
            this.context.drawerList.data.length
          )
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
      }, 1e3) // so that the input gets read out first, and then the results
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = (this._props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Autocomplete
    ))

    const {
      title,
      label,
      label_direction,
      label_sr_only,
      icon,
      icon_size,
      input_icon,
      size,
      align_autocomplete,
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
      show_drawer_button,
      input_component: CustomInput,
      prevent_selection,
      max_height,
      default_value,
      submit_button_title,
      className,
      class: _className,
      disabled,
      icon_position,

      mode: _mode, // eslint-disable-line
      data: _data, // eslint-disable-line
      no_options: _no_options, // eslint-disable-line
      aria_live_options: _aria_live_options, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      // icon_position: _icon_position, // eslint-disable-line
      skip_highlight: _skip_highlight, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      indicator_label: _indicator_label, // eslint-disable-line

      ...attributes
    } = props

    let { triangle_position } = props
    if (!triangle_position && align_autocomplete === 'right') {
      triangle_position = 'right'
    }

    const id = this._id
    const showStatus = status && status !== 'error'

    const { inputValue, visibleIndicator, ariaLiveUpdate } = this.state

    const {
      selected_item,
      direction,
      opened,
      hidden
    } = this.context.drawerList

    // make it pissible to grab the rest attributes and return it with all events
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

    const triggerParams = {
      ['aria-owns']: `${id}-ul`, // better would be "-ul" - but it is not in the DOM if hidden
      ['aria-haspopup']: 'listbox',
      ['aria-expanded']: opened
    }

    const inputParams = {
      className: classnames(
        'dnb-autocomplete__input',
        opened && 'dnb-button--active'
      ),
      id,
      disabled,
      placeholder: title,
      // role: 'combobox', // does not work nicely with VO (focus)
      ['aria-autocomplete']: 'list', // list, both
      ['aria-controls']: `${id}-ul`,
      ['aria-haspopup']: 'listbox', // true, listbox
      ['aria-expanded']: opened,
      ...attributes
    }
    if (
      !isTrue(prevent_selection) &&
      !hidden &&
      parseFloat(selected_item) > -1
    ) {
      inputParams[
        'aria-activedescendant'
      ] = `option-${id}-${selected_item}`
    }

    inputParams.value = inputValue

    if (showStatus || suffix) {
      inputParams['aria-describedby'] = `${
        showStatus ? id + '-status' : ''
      } ${suffix ? id + '-suffix' : ''}`
    }

    // also used for code markup simulation
    validateDOMAttributes(null, mainParams)
    validateDOMAttributes(this.props, inputParams)

    // make it pissible to grab the rest attributes and return it with all events
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
            />
          )}

          <span className="dnb-autocomplete__row">
            <span className="dnb-autocomplete__shell" ref={this._refShell}>
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
                  type="search" // gives us also autoComplete=off
                  submit_element={
                    isTrue(show_drawer_button) ? (
                      <SubmitButton
                        icon={icon}
                        icon_size={
                          icon_size ||
                          (size === 'large' ? 'medium' : 'default')
                        }
                        status={!opened && status ? status_state : null}
                        title={submit_button_title}
                        variant="secondary"
                        disabled={disabled}
                        size={size === 'default' ? 'medium' : size}
                        on_submit={this.onSubmitHandler}
                        onKeyDown={this.onTriggerKeyDownHandler}
                        {...triggerParams}
                      />
                    ) : (
                      false
                    )
                  }
                  ref={this._refInput}
                  onMouseDown={this.onInputClickHandler}
                  on_key_down={this.onTriggerKeyDownHandler}
                  on_change={this.onInputChangeHandler}
                  on_focus={this.onInputFocusHandler}
                  on_blur={this.onBlurHandler}
                  {...inputParams}
                />
              )}

              <DrawerList
                id={id}
                inner_class="dnb-autocomplete__list"
                value={selected_item}
                default_value={default_value}
                scrollable={scrollable}
                focusable={focusable}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                prevent_selection={prevent_selection}
                triangle_position={triangle_position}
                keep_open={keep_open}
                prevent_close={prevent_close}
                align_drawer={align_autocomplete}
                disabled={disabled}
                max_height={max_height}
                direction={direction}
                size={size}
                on_change={this.onChangeHandler}
                on_select={this.onSelectHandler}
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

        <span className="dnb-sr-only" aria-live="assertive">
          {ariaLiveUpdate}
        </span>
      </span>
    )
  }
}
