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

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Input, { SubmitButton } from '../input/Input'
import DrawerList, {
  grabStringFromReact
} from '../../fragments/drawer-list/DrawerList'

const renderProps = {
  on_show: null,
  on_hide: null,
  on_change: null,
  on_select: null,
  on_state_update: null,
  trigger_component: null
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
  // more_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  align_autocomplete: PropTypes.oneOf(['left', 'right']),
  trigger_component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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
  icon: null,
  icon_size: null,
  icon_position: 'right',
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
  size: null,
  align_autocomplete: null,
  trigger_component: null,
  data: null,
  default_value: null,
  value: 'initval',
  open_on_focus: false,
  prevent_close: false,
  keep_open: false,
  opened: false,
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
  static contextType = Context

  static blurDelay = 201 // some ms more than "autocompleteSlideDown 200ms"

  static enableWebComponent() {
    registerElement(Autocomplete.tagName, Autocomplete, defaultProps)
  }

  static parseDataItem(dataItem) {
    const toParse = DrawerList.parseContentTitle(dataItem, {
      separator: ' '
    })
    if (typeof toParse !== 'string' && Array.isArray(toParse)) {
      return Autocomplete.parseDataItem(toParse)
    }
    return toParse
  }

  static createSearchIndex(data) {
    return data.map(dataItem => {
      const searchChunk = Autocomplete.parseDataItem(dataItem)
      return { dataItem, searchChunk }
    })
  }

  static getInputValue(selected_item, data) {
    const currentData = DrawerList.getCurrentData(selected_item, data)
    return DrawerList.parseContentTitle(currentData, {
      separator: ' ',
      preferSelectedValue: true
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      // TODO: update search index if data prop has changed
      // state.searchIndex = Autocomplete.createSearchIndex(props.data)

      // TODO: update original_data if data prop has changed
      if (!state.original_data) {
        state.original_data = state.data
      }

      state.skip_highlight = isTrue(props.skip_highlight)

      if (props.value !== 'initval' && state._value !== props.value) {
        state._value = props.value

        state.input_value = Autocomplete.getInputValue(
          state.selected_item,
          state.data
        )
      }
    }

    const newState = DrawerList.prepareDerivedState(props, state)

    state._listenForPropChanges = true

    return newState
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.state = DrawerList.prepareStartupState(props)
    this.state._listenForPropChanges = true

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refInput = React.createRef()

    // deprecated, use value instad
    const dep = 'selected_item'
    if (typeof props[dep] !== 'undefined') {
      console.warn(`Autocomplete: Please use "value" instead of "${dep}".`)
    }
  }

  componentDidMount() {
    if (this.state.opened) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.setHidden()
    clearTimeout(this._hideTimeout)
    clearTimeout(this._selectTimeout)
  }

  setVisible = () => {
    if (this.state.opened && this.state.hidden === false) {
      return
    }

    clearTimeout(this._hideTimeout)

    this.setState({
      hidden: false,
      opened: true,
      _listenForPropChanges: false
    })

    const { selected_item } = this.state
    dispatchCustomElementEvent(this, 'on_show', {
      data: DrawerList.getCurrentData(selected_item, this.state.data),
      attributes: this.attributes || {}
    })
  }

  setHidden = () => {
    if (!this.state.opened) {
      return
    }

    this.setState(
      {
        opened: false,
        _listenForPropChanges: false
      },
      () => {
        const execState = () =>
          this.setState({
            hidden: true,
            _listenForPropChanges: false
          })
        clearTimeout(this._hideTimeout)
        if (isTrue(this.props.no_animation)) {
          execState()
        } else {
          this._hideTimeout = setTimeout(execState, Autocomplete.blurDelay) // wait until animation is over
        }
      }
    )
    if (typeof this.modalScrollLock === 'function') {
      this.modalScrollLock()
    }

    dispatchCustomElementEvent(this, 'on_hide', {
      data: DrawerList.getCurrentData(
        this.state.selected_item,
        this.state.data
      ),
      attributes: this.attributes || {}
    })
  }

  onInputChangeHandler = ({ value }, options) => {
    value = String(value).trim()

    if (value === this.state.value) {
      return
    }

    // run the filter also on invalid values, so we reset the highlight
    const data = this.runFilter(value, options)

    this.setState({
      _listenForPropChanges: false
    })

    if (value && value.length > 0) {
      // show the "no_options" message
      if (data.length === 0) {
        this.resetSelections()
        this.totalReset()
        this.setState({
          ignore_events: true,
          data: [{ content: this._props.no_options, ignore_events: true }]
        })
      } else if (data.length > 0) {
        const active_id = data.length === 1 ? data[0].__id : null
        this.setState({
          active_id,
          data,
          skip_highlight: false,
          ignore_events: false
        })
      }

      this.setVisible()
    } else {
      // this will not remove selected_item
      this.totalReset()
      this.showAll()
    }
  }
  onInputClickHandler = e => {
    const value = e.target.value.trim()
    if (value && value.length > 0) {
      this.setVisible()
    }
  }
  onInputFocusHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
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
  toggleVisible = () => {
    if (!this.state.hidden && this.state.opened) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }
  onSubmitHandler = () => {
    this.showAll()

    if (
      !this.hasFilterActive() &&
      !this.state.hidden &&
      this.state.opened
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }
  hasFilterActive = () => {
    return this.state.data.length !== this.state.original_data.length
  }
  // hasNoFilterOptions = () => {
  //   return (
  //     this.state.data &&
  //     ((this.state.data.length === 1 &&
  //       this.state.data[0].ignore_events) ||
  //       this.state.data.length === 0)
  //   )
  // }
  onTriggerKeyDownHandler = e => {
    const key = keycode(e)
    switch (key) {
      case 'up':
      case 'down':
        e.preventDefault()
        if (this.hasFilterActive()) {
          this.showAll()
        }
        this.setVisible()
        break

      case 'enter':
        e.preventDefault()
        this.setVisible()
        break
    }
  }

  setSearchIndex() {
    if (this.state.searchIndex) {
      return this.state.searchIndex
    }

    const searchIndex = Autocomplete.createSearchIndex(
      this.state.original_data
    )

    this.setState({
      searchIndex,
      _listenForPropChanges: false
    })

    return searchIndex
  }

  onSetActiveItemHandler = active_item => {
    this.setState({
      active_item,
      _listenForPropChanges: false
    })
  }

  showAll = () => {
    this.resetFilter()
    this.resetSelections()

    this.setState(
      {
        ignore_events: true, // to avoid a flicker, if it was the first one (because of the DrawerList arrow down event)
        _listenForPropChanges: false
      },
      () => {
        // but we reset it right after the rerender
        setTimeout(() => {
          this.setState({
            active_id: null,
            ignore_events: false, // we also have to reset this one
            _listenForPropChanges: false
          })
        }, 1) // make sure we reset one the rerender/show of DrawerList is done
      }
    )
  }

  totalReset = () => {
    this.setState({
      selected_item: null,
      _listenForPropChanges: false
    })
  }

  resetSelections = () => {
    this.setState({
      input_value: null,
      active_id: null,
      active_item: null,
      ignore_events: false,
      _listenForPropChanges: false
    })
  }

  resetFilter = () => {
    this.setState({
      data: this.state.original_data,
      _listenForPropChanges: false
    })
  }

  runFilter = (value, { skip_highlight } = {}) => {
    const words = value.split(/\s+/g).filter(Boolean)

    const findWords = item =>
      words.filter(
        word =>
          typeof item === 'string' &&
          new RegExp(`^${word}|\\s${word}`, 'i').test(item)
      )

    // get the search index
    let searchIndex = this.state.searchIndex
    if (!searchIndex) {
      searchIndex = this.setSearchIndex()
    }
    if (typeof searchIndex === 'undefined') {
      return []
    }

    return searchIndex
      .map((item, i) => {
        const foundWords = findWords(item.searchChunk)

        if (typeof item.dataItem === 'string') {
          item.dataItem = { content: item.dataItem }
        }

        item.dataItem.render = children => {
          // make string out of it
          if (React.isValidElement(children)) {
            children = grabStringFromReact(children)
          }
          if (typeof children === 'string') {
            children = children
              .split(' ')
              .map(child => {
                return foundWords
                  .map(word => {
                    const index = child
                      .toLowerCase()
                      .indexOf(word.toLowerCase())

                    if (index === -1) {
                      return null
                    }

                    return {
                      a: child.substring(index, word.length),
                      b: child.substring(index + word.length)
                    }
                  })
                  .filter(Boolean)
                  .reduce(
                    (acc, { a, b }) =>
                      skip_highlight || this.state.skip_highlight ? (
                        acc
                      ) : (
                        <React.Fragment key={`${i}-${acc}`}>
                          <span className="dnb-drawer-list__option__item--highlight">
                            {a}
                          </span>
                          {b}
                        </React.Fragment>
                      ),
                    child
                  )
              })
              .map((c, i, a) => (i < a.length - 1 ? [c, ' '] : c)) // add back the skiped spaces
          }

          return children
        }
        return {
          countFindings: foundWords.length,
          item
        }
      })
      .filter(({ countFindings }) => countFindings)
      .sort(({ countFindings: a }, { countFindings: b }) => b - a)
      .map(({ item }) => item.dataItem)
  }

  onSetDirectionHandler = props => {
    this.setState({
      ...props,
      _listenForPropChanges: false
    })
  }

  onSelectHandler = args => {
    const active_item = DrawerList.findCurrentIndex(
      args.active_item,
      this.state.original_data
    )
    this.setState({
      active_item,
      _listenForPropChanges: false
    })
    if (parseFloat(args.active_item) > -1) {
      const attributes = this.attributes || {}
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        attributes
      })
    }
  }

  onChangeHandler = args => {
    const selected_item = args.selected_item

    const input_value = Autocomplete.getInputValue(
      selected_item,
      this.state.data
    )

    this.setState({
      skip_highlight: true,
      input_value,
      selected_item,
      _listenForPropChanges: false
    })

    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      attributes
    })
    if (this._selectTimeout) {
      clearTimeout(this._selectTimeout)
    }
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
      trigger_component: CustomTrigger,
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

    const {
      data,
      input_value,
      direction,
      opened,
      active_id,
      selected_item,
      ignore_events
    } = this.state

    const mainParams = {
      className: classnames(
        'dnb-autocomplete',
        `dnb-autocomplete--direction-${direction}`,
        opened && 'dnb-autocomplete--opened',
        label_direction && `dnb-autocomplete--${label_direction}`,
        // icon_position &&
        //   `dnb-autocomplete--icon-position-${icon_position}`,
        size && `dnb-autocomplete__size--${size}`,
        align_autocomplete &&
          `dnb-autocomplete__align--${align_autocomplete}`,
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
              {CustomTrigger ? (
                <CustomTrigger {...inputParams} />
              ) : (
                <Input
                  icon={icon || 'search'}
                  // icon_position={icon_position}
                  icon_size={
                    icon_size || (size === 'large' ? 'medium' : 'default')
                  }
                  type="search" // gives us also autoComplete=off
                  submit_element={
                    <SubmitButton
                      // value={String(selected_item)}// is not needed for now
                      icon={icon || 'chevron-down'}
                      icon_size={
                        icon_size ||
                        (size === 'large' ? 'medium' : 'default')
                      }
                      status={!opened && status ? status_state : null}
                      title={'submit_button_title'}
                      variant="secondary"
                      disabled={disabled}
                      size={size}
                      on_submit={this.onSubmitHandler}
                      onKeyDown={this.onTriggerKeyDownHandler}
                      {...triggerParams}
                    />
                  }
                  ref={this._refInput}
                  onMouseDown={this.onInputClickHandler}
                  onKeyDown={this.onTriggerKeyDownHandler}
                  on_change={this.onInputChangeHandler}
                  on_focus={this.onInputFocusHandler}
                  on_blur={this.onBlurHandler}
                  {...inputParams}
                />
              )}

              <DrawerList
                id={id}
                inner_class="dnb-autocomplete__list"
                data={data}
                raw_data={_data}
                ignore_events={ignore_events}
                value={selected_item}
                default_value={default_value}
                active_id={active_id}
                on_set_active_item={this.onSetActiveItemHandler}
                scrollable={scrollable}
                focusable={focusable}
                prevent_focus={true}
                skip_keysearch={true}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                prevent_selection={prevent_selection}
                icon_position={icon_position}
                keep_open={keep_open}
                prevent_close={prevent_close}
                align_drawer={align_autocomplete}
                disabled={disabled}
                max_height={max_height}
                direction={_direction}
                opened={opened}
                on_change={this.onChangeHandler}
                on_select={this.onSelectHandler}
                on_resize={this.onSetDirectionHandler}
                on_show={this.setVisible}
                on_hide={this.setHidden}
                wrapper_element={this._refShell.current}
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
