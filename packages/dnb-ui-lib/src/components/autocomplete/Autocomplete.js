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
  propTypes as DrawerPropTypes
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
  data: DrawerPropTypes.data,
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
  children: DrawerPropTypes.data,

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
  icon_position: 'left',
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

  static parseData(data) {
    const newData = data.map(dataItem => {
      const toParse = DrawerList.parseContentTitle(dataItem)
      if (typeof toParse === 'string') {
        return toParse
      }
      if (Array.isArray(toParse)) {
        return Autocomplete.parseData(toParse)
      }
    })

    return newData
  }

  static createSearchIndex(data) {
    return Autocomplete.parseData(data)
  }

  static getDerivedStateFromProps(props, state) {
    const newState = DrawerList.prepareDerivedState(props, state)

    // update search index if data has changed
    // newState.searchIndex = Autocomplete.createSearchIndex(newState.data)
    if (!newState.originalData) {
      newState.originalData = DrawerList.getData(props)
    }

    return newState
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.state = DrawerList.prepareStartupState(props)

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refButton = React.createRef()

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
    this.setSearchIndex()

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

    if (this.hasNoFilterOptions()) {
      this.resetFilter()
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

  onFocusHandler = () => {
    if (isTrue(this.props.open_on_focus)) {
      this.setVisible()
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
    // here we reset the "no options" state
    // because the user clicked on the submit button to open the whole list
    this.resetFilter({ showOriginalData: true })
    if (
      this.hasNoFilterOptions() ||
      (!this.state.hidden && this.state.opened)
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }
  hasNoFilterOptions = () => {
    return (
      this.state.data &&
      ((this.state.data.length === 1 &&
        this.state.data[0].ignore_events) ||
        this.state.data.length === 0)
    )
  }
  resetFilter = ({ showOriginalData } = {}) => {
    this.setState({
      value: null,
      ignore_events: false,
      selected_item: undefined,
      active_item: undefined,
      data: showOriginalData ? this.state.originalData : [],
      _listenForPropChanges: false
    })
  }
  onTriggerKeyDownHandler = ({ event: e }) => {
    switch (keycode(e)) {
      case 'up':
      case 'down':
        if (this.hasNoFilterOptions()) {
          this.resetFilter({ showOriginalData: true })
        }
        e.preventDefault()
        this.setVisible()
        break
    }
  }

  setSearchIndex() {
    if (!this.state.searchIndex) {
      const searchIndex = Autocomplete.createSearchIndex(
        this.state.originalData
      )

      this.setState({
        searchIndex,
        _listenForPropChanges: false
      })
    }
  }

  onFocusChangeHandler = () => {
    this.setSearchIndex()
  }

  onValueChangeHandler = ({ value }) => {
    if (value.length > 0) {
      let ignore_events = false
      const data = this.runFilter(value, this.state.searchIndex)

      if (data.length === 0) {
        this.resetFilter()
        ignore_events = true
        data.push({ content: this._props.no_options, ignore_events })
      }

      this.setState({
        data,
        ignore_events,
        _listenForPropChanges: false
      })

      this.setVisible()
    } else {
      this.resetFilter()
      this.setHidden()
    }
  }

  runFilter = (value, searchIndex) => {
    const words = value.split(/\s+/g).filter(Boolean)

    const findWords = item =>
      words.filter(
        word =>
          typeof item === 'string' && new RegExp(word, 'i').test(item)
      ).length

    return searchIndex
      .map(item => {
        const foundWords = findWords(item)
        if (foundWords > 0) {
          return { foundWords, item }
        }
      })
      .filter(Boolean)
      .sort(({ foundWords: a }, { foundWords: b }) => b - a)
      .map(({ item }) => item)
  }

  onSetDirectionHandler = props => {
    this.setState({
      ...props,
      _listenForPropChanges: false
    })
  }

  onSelectHandler = args => {
    this.setState({
      active_item: args.value,
      _listenForPropChanges: false
    })
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_select', {
      ...args,
      selected_item: args.value, // deprecated
      attributes
    })
  }

  onChangeHandler = args => {
    const selected_item = DrawerList.getCurrentIndex(
      args.value,
      this.state.data
    )
    this.setState({
      selected_item,
      _listenForPropChanges: false
    })
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      selected_item, // deprecated
      attributes
    })
    if (this._selectTimeout) {
      clearTimeout(this._selectTimeout)
    }
    this._selectTimeout = setTimeout(() => {
      if (!isTrue(this.props.keep_open)) {
        this.setHidden()
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
      title: titleProp,
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
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      no_options: _no_options, // eslint-disable-line

      ...attributes
    } = props

    const id = this._id

    const {
      data,
      direction,
      opened,
      selected_item,
      ignore_events
    } = this.state
    const showStatus = status && status !== 'error'

    const currentOptionData = DrawerList.getCurrentData(
      selected_item,
      data
    )
    const title =
      data && data.length > 0
        ? currentOptionData.selected_value ||
          DrawerList.parseContentTitle(currentOptionData) ||
          titleProp
        : titleProp
    const value =
      data && data.length > 0
        ? DrawerList.parseContentTitle(currentOptionData)
        : null

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

    const inputParams = {
      className: classnames(
        'dnb-autocomplete__trigger',
        opened && 'dnb-button--active'
      ),
      id,
      disabled,
      ['aria-haspopup']: true, //listbox
      ...attributes,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler
    }

    const triggerParams = {
      ['aria-haspopup']: true, //listbox
      ['aria-expanded']: opened
    }

    if (typeof value === 'string') {
      inputParams.value = value
    } else if (typeof title === 'string') {
      inputParams.placeholder = title
    }

    if (showStatus || suffix) {
      inputParams['aria-describedby'] = `${
        showStatus ? id + '-status' : ''
      } ${suffix ? id + '-suffix' : ''}`
    }

    if (this.hasNoFilterOptions()) {
      inputParams.value = ''
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
                  icon_position={icon_position}
                  icon_size={
                    icon_size || (size === 'large' ? 'medium' : 'default')
                  }
                  type="search" // gives us also autoComplete=off
                  submit_element={
                    <SubmitButton
                      // value={inputParams.value}
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
                      {...triggerParams}
                    />
                  }
                  on_change={this.onValueChangeHandler}
                  on_focus={this.onFocusChangeHandler}
                  onKeyDown={this.onTriggerKeyDownHandler}
                  ref={this._refButton}
                  {...inputParams}
                />
              )}

              <DrawerList
                id={id}
                inner_class="dnb-autocomplete__list"
                data={data}
                // preparedData={data}
                ignore_events={ignore_events}
                value={selected_item}
                default_value={default_value}
                scrollable={scrollable}
                focusable={focusable}
                prevent_focus={true}
                skip_keysearch={true}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                prevent_selection={prevent_selection}
                icon_position={icon_position}
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
