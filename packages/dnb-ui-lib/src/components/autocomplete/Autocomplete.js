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
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Input, { SubmitButton } from '../input/Input'
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  no_options: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_size: PropTypes.string,
  icon_position: PropTypes.string,
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
  title: 'Option Menu',
  no_options: 'No options',
  icon: 'chevron-down',
  icon_size: null,
  icon_position: 'right',
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
    const { children, ...props } = this.props

    return (
      <DrawerListProvider
        {...props}
        opened={null}
        tagName="dnb-autocomplete"
        ignore_events={false}
        prevent_focus
        skip_keysearch
      >
        <AutocompleteInstance {...props}>{children}</AutocompleteInstance>
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
    return data.map(dataItem => {
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
      state.skip_highlight = isTrue(props.skip_highlight)

      if (
        props.input_value !== 'initval' &&
        typeof state.input_value === 'undefined' &&
        props.input_value?.length > 0
      ) {
        state.input_value = props.input_value
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

    if (context.drawerList?.current_title) {
      this.state.input_value = context.drawerList.current_title
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
    if (parseFloat(this.state.local_active_item) > -1) {
      this.context.drawerList.scrollToItem(this.state.local_active_item, {
        scrollTo: false
      })
      this.setState({
        local_active_item: null,
        _listenForPropChanges: false
      })
    }
  }

  onInputChangeHandler = ({ value }, options) => {
    value = String(value).trim()

    if (value === this.state.input_value) {
      return
    }

    this.setState({
      input_value: value,
      _listenForPropChanges: false
    })
    this.context.drawerList.setState({
      cache_hash: value
    })

    // run the filter also on invalid values, so we reset the highlight
    const data = this.runFilter(value, options)

    if (value && value.length > 0) {
      // show the "no_options" message
      if (data.length === 0) {
        this.resetSelections()
        this.totalReset()
        this.context.drawerList.setState({
          ignore_events: true
        })
        this.context.drawerList.setData([
          {
            content: this._props.no_options,
            ignore_events: true,
            __id: 'no_options'
          }
        ])
      } else if (data.length > 0) {
        const active_item = data.length === 1 ? data[0].__id : null

        this.setState({
          local_active_item: active_item, // used later so we can scroll there
          skip_highlight: false,
          _listenForPropChanges: false
        })
        this.context.drawerList.setState({
          active_item,
          ignore_events: false
        })
        this.context.drawerList.setData(data)
      }

      this.setVisible()
    } else {
      // this will not remove selected_item
      this.totalReset()
      this.showAll()
    }
  }
  runFilterToHighlight = (value = null) => {
    if (value === null) {
      value = this.state.input_value
    }
    value = String(value || '').trim()

    if (value.length > 0) {
      const data = this.runFilter(value)
      this.setState({
        skip_highlight: false,
        _listenForPropChanges: false
      })
      this.context.drawerList.setState({
        cache_hash: value,
        ignore_events: false
      })
      this.context.drawerList.setData(data)
    }
  }
  onInputClickHandler = e => {
    const value = e.target.value
    this.runFilterToHighlight(value)
    this.showAll()
    this.setVisible()
    // setTimeout(() => {
    // }, 1) // because the input has no focus on first click, and we dismiss if we had it opened by start
  }
  onInputFocusHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
      this.showAll()
      this.setVisible()
    } else {
      this.setSearchIndex()
    }
  }
  onBlurHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
      this.setHidden()
    }
  }
  toggleVisible = ({ hasFilter = false } = {}) => {
    if (
      !hasFilter &&
      !this.hasFilterActive() &&
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
          this.showAll()
        }
        this.setVisible()
        this.scrollToActiveItem()

        break

      case 'enter':
        e.preventDefault()
        setTimeout(() => {
          // this.runFilterToHighlight()
          if (this.hasFilterActive()) {
            this.showAll()
          }
          this.toggleVisible()
        }, 1) // to make sure we first handle the DrawerList key enter, before we update the state with a toggle/visible. Else the submit is not set properly

        break
    }
  }

  setSearchIndex() {
    if (this.state.searchIndex) {
      return this.state.searchIndex
    }

    const searchIndex = AutocompleteInstance.createSearchIndex(
      this.context.drawerList.original_data
    )

    this.setState({
      searchIndex,
      _listenForPropChanges: false
    })

    return searchIndex
  }

  showAll = () => {
    this.resetFilter()

    clearTimeout(this.showAllTimeout)

    this.context.drawerList.setState(
      {
        cache_hash: 'all',
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

  totalReset = () => {
    this.context.drawerList.setState({
      selected_item: null
    })
  }

  resetSelections = () => {
    this.setState({
      input_value: null,
      _listenForPropChanges: false
    })
    this.context.drawerList.setState({
      active_item: null,
      ignore_events: false
    })
  }

  resetFilter = () => {
    this.context.drawerList.setData(this.context.drawerList.original_data)
  }

  runFilter = (value, { skip_highlight } = {}) => {
    const words = value.split(/\s+/g).filter(Boolean)
    const wordsCount = words.length

    const findWords = item =>
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

    return (
      searchIndex
        .map((item, itemIndex) => {
          const listOfFoundWords = findWords(item.searchChunk)

          if (typeof item.dataItem === 'string') {
            item.dataItem = { content: item.dataItem }
          }

          // this function gets called once the items are rendered / in view
          item.dataItem.render = children => {
            // make string out of it
            if (React.isValidElement(children)) {
              children = grabStringFromReact(children)
            }
            if (typeof children === 'string') {
              children = children
                .split(' ')
                .map(child => {
                  return listOfFoundWords
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
                    .reduce(
                      (acc, { a, b, c }) =>
                        skip_highlight || this.state.skip_highlight ? (
                          acc
                        ) : (
                          <React.Fragment key={`${itemIndex}-${acc}`}>
                            {a}
                            <span className="dnb-drawer-list__option__item--highlight">
                              {b}
                            </span>
                            {c}
                          </React.Fragment>
                        ),
                      child
                    )
                })
                .map((c, i, a) => (i < a.length - 1 ? [c, ' '] : c)) // add back the skiped spaces
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

  onSelectHandler = args => {
    if (parseFloat(args.active_item) > -1) {
      const attributes = this.attributes
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        attributes
      })
    }
  }

  onChangeHandler = args => {
    const selected_item = args.selected_item

    const input_value = AutocompleteInstance.getCurrentDataTitle(
      selected_item,
      this.context.drawerList.data
    )

    this.setState({
      skip_highlight: true,
      input_value,
      _listenForPropChanges: false
    })

    const attributes = this.attributes
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      attributes
    })

    clearTimeout(this._selectTimeout)
    this._selectTimeout = setTimeout(() => {
      if (!isTrue(this.props.keep_open)) {
        this.setHidden()
        try {
          this._refInput.current._ref.current.focus()
        } catch (e) {
          // do nothing
        }
      }
    }, 1) // because of state updates we need 1 tick delay here
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
      icon_position,
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
      input_component: CustomInput,
      prevent_selection,
      max_height,
      default_value,
      className,
      class: _className,
      disabled,

      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      skip_highlight: _skip_highlight, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      no_options: _no_options, // eslint-disable-line

      ...attributes
    } = props

    const id = this._id
    const showStatus = status && status !== 'error'

    const { input_value } = this.state

    const { selected_item, direction, opened } = this.context.drawerList

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
        // icon_position &&
        //   `dnb-autocomplete--icon-position-${icon_position}`,
        align_autocomplete && `dnb-autocomplete--${align_autocomplete}`,
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
      ['aria-haspopup']: true, //listbox
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
      ['aria-haspopup']: true, //listbox
      ...attributes
    }

    inputParams.value = input_value

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
                  icon={input_icon}
                  // icon_position={icon_position}
                  icon_size={
                    icon_size || (size === 'large' ? 'medium' : 'default')
                  }
                  size={size}
                  status={!opened && status ? status_state : null}
                  type="search" // gives us also autoComplete=off
                  submit_element={
                    <SubmitButton
                      // value={String(selected_item)}// is not needed for now
                      icon={icon}
                      icon_size={
                        icon_size ||
                        (size === 'large' ? 'medium' : 'default')
                      }
                      status={!opened && status ? status_state : null}
                      title={'submit_button_title'}
                      variant="secondary"
                      disabled={disabled}
                      size={size === 'default' ? 'medium' : size}
                      on_submit={this.onSubmitHandler}
                      onKeyDown={this.onTriggerKeyDownHandler}
                      {...triggerParams}
                    />
                  }
                  ref={this._refInput}
                  // onClick={this.onInputClickHandler}
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
                triangle_position={icon_position}
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
      </span>
    )
  }
}
