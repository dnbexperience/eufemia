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
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Suffix from '../../shared/helpers/Suffix'
import Icon from '../icon-primary/IconPrimary'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Button from '../button/Button'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  parseContentTitle,
  getCurrentData
} from '../../fragments/drawer-list/DrawerListHelpers'

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
  icon: 'chevron-down',
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
  size: 'default',
  align_dropdown: null,
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

export default class Dropdown extends PureComponent {
  static tagName = 'dnb-dropdown'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Dropdown.tagName, Dropdown, defaultProps)
  }

  render() {
    return (
      <DrawerListProvider
        {...this.props}
        data={this.props.data || this.props.children}
        opened={null}
        tagName="dnb-dropdown"
        ignore_events={false}
      >
        <DropdownInstance {...this.props} />
      </DrawerListProvider>
    )
  }
}

class DropdownInstance extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = DrawerListContext

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.attributes = {}
    this.state = this.state || {}

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refButton = React.createRef()

    // deprecated, use value instad
    const dep = 'selected_item'
    if (typeof props[dep] !== 'undefined') {
      console.warn(`Dropdown: Please use "value" instead of "${dep}".`)
    }
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
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

  setHidden = ({ setFocus = false } = {}) => {
    this.context.drawerList.setHidden(null, () => {
      if (setFocus) {
        setTimeout(() => {
          try {
            const elem = this._refButton.current._ref.current
            if (elem && typeof elem.focus === 'function') {
              elem.focus()
            }
          } catch (e) {
            // do noting
          }
        }, 1) // NVDA / Firefox needs a dealy to set this focus
      }
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
    if (
      !this.context.drawerList.hidden &&
      this.context.drawerList.opened
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }
  onMouseDownHandler = () => {
    if (
      !this.context.drawerList.hidden &&
      this.context.drawerList.opened
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
        e.preventDefault()
        this.setVisible()
        break
      case 'esc':
        this.setHidden()
        break
    }
  }

  onSelectHandler = args => {
    if (parseFloat(args.active_item) > -1) {
      const attributes = this.attributes || {}
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        // selected_item: args.value, // deprecated
        attributes
      })
    }
  }

  onChangeHandler = args => {
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      attributes
    })

    clearTimeout(this._selectTimeout)
    this._selectTimeout = setTimeout(() => {
      if (!isTrue(this.props.keep_open)) {
        this.setHidden({ setFocus: true })
      }
    }, 1) // because of state updates we need 1 tick delay here
  }

  getTitle(title = null) {
    const { data } = this.context.drawerList
    if (data?.length > 0) {
      const currentOptionData = getCurrentData(
        this.context.drawerList.selected_item,
        data
      )
      if (currentOptionData) {
        title =
          currentOptionData.selected_value ||
          parseContentTitle(currentOptionData)
      }
    }
    return title
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
      label,
      label_direction,
      label_sr_only,
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
      keep_open,
      prevent_close,
      no_animation,
      no_scroll_animation,
      trigger_component: CustomTrigger,
      more_menu,
      prevent_selection,
      max_height,
      default_value,
      className,
      class: _className,
      disabled,

      title: titleProp,
      icon: _icon, // eslint-disable-line
      icon_position: _icon_position, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line

      ...attributes
    } = props

    const id = this._id

    const isPopupMenu = isTrue(more_menu) || isTrue(prevent_selection)
    if (isPopupMenu) {
      if (icon !== 'chevron_down' && isTrue(more_menu)) {
        icon = 'more'
      }
      if (icon_position === 'right' && align_dropdown !== 'right') {
        icon_position = 'left'
      }
    }

    const { selected_item, direction, opened } = this.context.drawerList
    const showStatus = status && status !== 'error'
    const title = this.getTitle(titleProp)

    // make it pissible to grab the rest attributes and return it with all events
    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const mainParams = {
      className: classnames(
        'dnb-dropdown',
        `dnb-dropdown--${direction}`,
        opened && 'dnb-dropdown--opened',
        label_direction && `dnb-dropdown--${label_direction}`,
        icon_position && `dnb-dropdown--icon-position-${icon_position}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        isPopupMenu &&
          typeof more_menu === 'string' &&
          `dnb-dropdown--more_menu`,
        size && `dnb-dropdown--${size}`,
        align_dropdown && `dnb-drawer-list--${align_dropdown}`,
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
      ['aria-controls']: `${id}-drawer-list`,
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
                  // size={size === 'default' ? 'medium' : size}
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
                        icon={icon}
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
                button_only={isPopupMenu}
                align_drawer={align_dropdown}
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
