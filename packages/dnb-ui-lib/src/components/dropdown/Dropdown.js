/**
 * Web Dropdown Component
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
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
// import { addScrollLock } from '../modal/Modal'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import Icon from '../icon-primary/IconPrimary'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Button from '../button/Button'
import DrawerList from '../drawer-list/DrawerList'

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
  more_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  align_dropdown: PropTypes.oneOf(['left', 'right']),
  trigger_component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  data: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
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
  ]).isRequired,
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  open_on_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  // React
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

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
  max_height: null,
  direction: 'auto',
  no_animation: false,
  no_scroll_animation: false,
  prevent_selection: false,
  more_menu: false,
  size: null,
  align_dropdown: null,
  default_value: null,
  value: 'initval',
  open_on_focus: false,
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

export default class Dropdown extends PureComponent {
  static tagName = 'dnb-dropdown'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"

  static enableWebComponent() {
    registerElement(Dropdown.tagName, Dropdown, defaultProps)
  }

  static parseContentTitle = (
    dataItem,
    { separator = '\n', removeNumericOnlyValues = false } = {}
  ) => {
    let ret = ''
    const onlyNumericRegex = /[0-9.,-\s]+/
    if (Array.isArray(dataItem) && dataItem.length > 0) {
      dataItem = { content: dataItem }
    }
    if (dataItem && Array.isArray(dataItem.content)) {
      ret = dataItem.content
        .reduce((acc, cur) => {
          // check if we have React inside, with strings we can use
          cur = grabStringFromReact(cur)
          if (cur === false) {
            return acc
          }
          // remove only numbers
          const found =
            removeNumericOnlyValues && cur && cur.match(onlyNumericRegex)
          if (!(found && found[0].length === cur.length)) {
            acc.push(cur)
          }
          return acc
        }, [])
        .join(separator)
    } else {
      ret = grabStringFromReact((dataItem && dataItem.content) || dataItem)
    }
    if (
      dataItem &&
      dataItem.selected_value &&
      !onlyNumericRegex.test(dataItem.selected_value)
    ) {
      ret = dataItem.selected_value + separator + ret
    }
    // make sure we don't return empty strings
    if (Array.isArray(dataItem) && dataItem.length === 0) {
      ret = null
    }
    return ret
  }

  static getData(props) {
    let res = []
    if (typeof props.data === 'function') {
      res = props.data()
    } else if (props.data) {
      res = props.data
    } else {
      res = processChildren(props)
    }
    if (typeof res === 'string') {
      return res[0] === '[' ? JSON.parse(res) : []
    }
    return res || []
  }

  static getOptionData(value, data) {
    if (typeof data === 'function') {
      data = data()
    }
    return (
      (data && data.filter((data, i) => i === parseFloat(value))[0]) || []
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state.opened && !state.data && typeof props.data === 'function') {
      state.data = Dropdown.getData(props)
    }
    if (state._listenForPropChanges) {
      if (props.data && typeof props.data !== 'function') {
        state.data = Dropdown.getData(props)
      }

      let hasChanged = false

      if (
        props.value !== 'initval' &&
        state.selected_item !== props.value
      ) {
        state.selected_item =
          parseFloat(props.value) > -1
            ? parseFloat(props.value)
            : props.value
        hasChanged = true
      }
      if (hasChanged && typeof props.on_state_update === 'function') {
        dispatchCustomElementEvent({ props }, 'on_state_update', {
          data: Dropdown.getOptionData(state.selected_item, state.data),
          value: state.selected_item,
          selected_item: state.selected_item // deprecated
        })
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    const opened = isTrue(props.opened)
    this.state = {
      _listenForPropChanges: true,
      opened,
      hidden: !opened, // used for the startup state
      direction: props.direction,
      active_item: props.value,
      // send selected_item in here, so we dont trigger on_state_update
      selected_item:
        parseFloat(props.default_value) > -1
          ? parseFloat(props.default_value)
          : parseFloat(props.value) > -1
          ? parseFloat(props.value)
          : props.value,
      selectedItemHasChanged: false
    }

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refUl = React.createRef()
    this._refButton = React.createRef()

    // deprecated, use value instad
    const dep = 'selected_item'
    if (typeof props[dep] !== 'undefined') {
      console.warn(`Dropdown: Please use "value" instead of "${dep}".`)
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
    const { selected_item } = this.state

    this.setState({
      hidden: false,
      opened: true,
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this, 'on_show', {
      data: Dropdown.getOptionData(selected_item, this.state.data),
      attributes: this.attributes || {}
    })
  }

  setHidden = ({ setFocus = false } = {}) => {
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
          this.setState(
            {
              hidden: true,
              _listenForPropChanges: false
            },
            () => {
              if (setFocus) {
                setTimeout(() => {
                  try {
                    const elem = this._refButton.current._ref.current
                    if (elem && elem.focus) {
                      elem.focus()
                    }
                  } catch (e) {
                    // do noting
                  }
                }, 1) // NVDA / Firefox needs a dealy to set this focus
              }
            }
          )
        clearTimeout(this._hideTimeout)
        if (isTrue(this.props.no_animation)) {
          execState()
        } else {
          this._hideTimeout = setTimeout(execState, Dropdown.blurDelay) // wait until animation is over
        }
      }
    )
    if (typeof this.modalScrollLock === 'function') {
      this.modalScrollLock()
    }

    dispatchCustomElementEvent(this, 'on_hide', {
      data: Dropdown.getOptionData(
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
  onMouseDownHandler = () => {
    if (
      !this.state.hidden &&
      this.state.opened
      // &&  !this.state.blockDoubleClick
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }

  onTriggerKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'enter':
      case 'space':
      case 'up':
      case 'down':
        if (this.state.hidden) {
          e.preventDefault()
          this.setVisible()
        }
        break
      case 'esc':
        this.setHidden()
        break
    }
  }

  onSetDirectionHandler = props => {
    this.setState({
      // set the state like:
      // direction:
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
    this.setState({
      selected_item: args.value,
      _listenForPropChanges: false
    })
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      selected_item: args.value, // deprecated
      attributes
    })
    if (this._selectTimeout) {
      clearTimeout(this._selectTimeout)
    }
    this._selectTimeout = setTimeout(
      () => this.setHidden({ setFocus: true }),
      1
    ) // because of state updates we need 1 tick delay here
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Dropdown
    )

    let { icon, icon_position } = props

    const {
      title: titleProp,
      label,
      label_direction,
      label_sr_only,
      icon: _icon, // eslint-disable-line
      icon_position: _icon_position, // eslint-disable-line
      icon_size,
      size,
      align_dropdown,
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
      more_menu,
      prevent_selection,
      data,
      max_height,
      children,
      className,
      class: _className,
      disabled,

      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line

      ...attributes
    } = props

    const id = this._id

    const isPopupMenu = isTrue(more_menu) || isTrue(prevent_selection)
    if (isPopupMenu) {
      if (icon === null && isTrue(more_menu)) {
        icon = 'more'
      }
      if (icon_position === 'right' && align_dropdown !== 'right') {
        icon_position = 'left'
      }
    }

    const { direction, opened, selected_item } = this.state
    const showStatus = status && status !== 'error'

    const currentOptionData = Dropdown.getOptionData(selected_item, data)
    const title =
      data && data.length > 0
        ? currentOptionData.selected_value ||
          Dropdown.parseContentTitle(currentOptionData) ||
          titleProp
        : titleProp

    const mainParams = {
      className: classnames(
        'dnb-dropdown',
        `dnb-dropdown--direction-${direction}`,
        opened && 'dnb-dropdown--opened',
        label_direction && `dnb-dropdown--${label_direction}`,
        icon_position && `dnb-dropdown--icon-position-${icon_position}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        isPopupMenu &&
          typeof more_menu === 'string' &&
          `dnb-dropdown__more_menu`,
        size && `dnb-dropdown__size--${size}`,
        align_dropdown && `dnb-dropdown__align--${align_dropdown}`,
        status && `dnb-dropdown__status--${status_state}`,
        showStatus && 'dnb-dropdown__form-status',
        'dnb-form-component',
        createSpacingClasses(props),
        _className,
        className
      )
    }

    const triggerParams = {
      className: classnames(
        'dnb-dropdown__trigger',
        opened && 'dnb-button--active'
      ),
      id,
      disabled,
      ['aria-haspopup']: true, //listbox
      ['aria-expanded']: opened,
      ...attributes,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      onMouseDown: this.onMouseDownHandler,
      onKeyDown: this.onTriggerKeyDownHandler
    }

    // reads out the current selected state
    if (typeof title === 'string') {
      triggerParams['aria-label'] = title
    }
    if (showStatus || suffix) {
      triggerParams['aria-describedby'] = `${
        showStatus ? id + '-status' : ''
      } ${suffix ? id + '-suffix' : ''}`
    }

    // also used for code markup simulation
    validateDOMAttributes(null, mainParams)
    validateDOMAttributes(this.props, triggerParams)

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

        <span className="dnb-dropdown__inner" ref={this._ref}>
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

          <span className="dnb-dropdown__row">
            <span className="dnb-dropdown__shell" ref={this._refShell}>
              {CustomTrigger ? (
                <CustomTrigger {...triggerParams} />
              ) : (
                <Button
                  variant="secondary"
                  size="medium"
                  ref={this._refButton}
                  {...triggerParams}
                >
                  {!isPopupMenu && (
                    <span className="dnb-dropdown__text">
                      <span className="dnb-dropdown__text__inner">
                        {title}
                      </span>
                    </span>
                  )}
                  <span
                    aria-hidden
                    className={classnames(
                      'dnb-dropdown__icon',
                      parseFloat(selected_item) === 0 &&
                        'dnb-dropdown__icon--first'
                    )}
                  >
                    {icon !== false && (
                      <Icon
                        aria-hidden
                        icon={icon || 'chevron-down'}
                        size={
                          icon_size ||
                          (size === 'large' ? 'medium' : 'default')
                        }
                      />
                    )}
                  </span>
                </Button>
              )}

              <DrawerList
                id={id}
                inner_class="dnb-dropdown__list"
                data={data}
                value={selected_item}
                scrollable={scrollable}
                focusable={focusable}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                prevent_selection={prevent_selection}
                icon_position={icon_position}
                align_drawer={align_dropdown}
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
              >
                {children}
              </DrawerList>
            </span>

            {suffix && (
              <span
                className="dnb-dropdown__suffix"
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

Dropdown.Drawer = DrawerList
Dropdown.List = DrawerList.List
Dropdown.Item = DrawerList.Item

function grabStringFromReact(cur) {
  if (React.isValidElement(cur)) {
    if (typeof cur.props.children === 'string') {
      cur = cur.props.children
    } else if (Array.isArray(cur.props.children)) {
      cur = cur.props.children.reduce((acc, cur) => {
        if (typeof cur === 'string') {
          acc = acc + cur
        }
        return acc
      }, '')
    } else {
      return false
    }
  }

  return cur
}
