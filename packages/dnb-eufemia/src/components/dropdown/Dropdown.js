/**
 * Web Dropdown Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import { includeValidProps } from '../form-row/FormRowHelpers'

import Suffix from '../../shared/helpers/Suffix'
import Icon from '../icon-primary/IconPrimary'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import Button, { buttonVariantPropType } from '../button/Button'
import DrawerList from '../../fragments/drawer-list/DrawerList'
import DrawerListContext from '../../fragments/drawer-list/DrawerListContext'
import DrawerListProvider from '../../fragments/drawer-list/DrawerListProvider'
import {
  drawerListPropTypes,
  drawerListProviderPropTypes,
  parseContentTitle,
  getCurrentData,
} from '../../fragments/drawer-list/DrawerListHelpers'

export default class Dropdown extends React.PureComponent {
  static tagName = 'dnb-dropdown'

  static propTypes = {
    ...spacingPropTypes,
    ...drawerListPropTypes,
    ...drawerListProviderPropTypes,

    id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    variant: buttonVariantPropType.variant,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon_size: PropTypes.string,
    icon_position: PropTypes.oneOf(['left', 'right']),
    triangle_position: PropTypes.oneOf(['left', 'right']),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    status_state: PropTypes.string,
    status_props: PropTypes.object,
    status_no_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
    max_height: PropTypes.number,
    skip_portal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    portal_class: PropTypes.string,
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_scroll_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    prevent_selection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    more_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    action_menu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    independent_width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    align_dropdown: PropTypes.oneOf(['left', 'right']),
    trigger_element: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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
            selected_value: PropTypes.oneOfType([
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
    default_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    open_on_focus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keep_open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array,
    ]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,

    on_show: PropTypes.func,
    on_hide: PropTypes.func,
    on_change: PropTypes.func,
    on_select: PropTypes.func,
    on_state_update: PropTypes.func,
  }

  static defaultProps = {
    id: null,
    title: 'Option Menu',
    variant: 'secondary',
    icon: null,
    icon_size: null,
    icon_position: null,
    triangle_position: null,
    label: null,
    label_direction: null,
    label_sr_only: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    global_status_id: null,
    suffix: null,
    scrollable: true,
    focusable: false,
    max_height: null,
    direction: 'auto',
    skip_portal: null,
    portal_class: null,
    no_animation: false,
    no_scroll_animation: false,
    prevent_selection: false,
    more_menu: false,
    action_menu: false,
    independent_width: false,
    size: 'default',
    align_dropdown: null,
    trigger_element: null,
    data: null,
    default_value: null,
    value: 'initval',
    open_on_focus: false,
    prevent_close: false,
    keep_open: false,
    opened: false,
    disabled: null,
    stretch: null,
    skeleton: null,
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
  }

  render() {
    // generate ID here, so we can send it along the provider
    const id = this.props.id || makeUniqueId()
    const { more_menu, action_menu, prevent_selection, children, data } =
      this.props

    return (
      <DrawerListProvider
        {...this.props}
        id={id}
        data={data || children}
        opened={null}
        tagName="dnb-dropdown"
        ignore_events={false}
        prevent_selection={
          isTrue(more_menu) ||
          isTrue(action_menu) ||
          isTrue(prevent_selection)
        }
      >
        <DropdownInstance {...this.props} id={id} />
      </DrawerListProvider>
    )
  }
}

class DropdownInstance extends React.PureComponent {
  static propTypes = Dropdown.propTypes
  static defaultProps = Dropdown.defaultProps
  static contextType = DrawerListContext

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()

    this.attributes = {}
    this.state = this.state || {}

    this._ref = React.createRef()
    this._refShell = React.createRef()
    this._refButton = React.createRef()
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)
  }

  setVisible = () => {
    this.context.drawerList
      .setWrapperElement(this._ref.current)
      .setVisible()
  }

  setHidden = (...args) => {
    this.context.drawerList.setHidden(...args)
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

  onClickHandler = () => {
    if (isTrue(this.props.disabled)) {
      return // stop here
    }
    if (
      !this.context.drawerList.hidden &&
      this.context.drawerList.isOpen
    ) {
      this.setHidden()
    } else {
      this.setVisible()
    }
  }

  onTriggerKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'enter':
      case 'space':
        e.preventDefault()
        this.setVisible()
        break

      case 'up':
      case 'down':
        e.preventDefault()
        this.setVisible()

        break

      case 'esc':
        this.setHidden()
        break

      case 'home':
      case 'end':
      case 'page down':
      case 'page up':
        e.preventDefault()
        break
    }
  }

  onHideHandler = (args = {}) => {
    const attributes = this.attributes || {}
    const res = dispatchCustomElementEvent(this, 'on_hide', {
      ...args,
      attributes,
    })

    if (res !== false) {
      this.setFocus(args)
    }

    return res
  }

  setFocus = (args) => {
    clearTimeout(this._focusTimeout)
    this._focusTimeout = setTimeout(() => {
      try {
        const element = this._refButton.current._ref.current
        if (element && typeof element.focus === 'function') {
          if (args.preventHideFocus !== true) {
            element.focus({ preventScroll: true })
          }
          dispatchCustomElementEvent(this, 'on_hide_focus', { element })
        }
      } catch (e) {
        // do noting
      }
    }, 1) // NVDA / Firefox needs a delay to set this focus
  }

  onSelectHandler = (args) => {
    if (parseFloat(args.active_item) > -1) {
      const attributes = this.attributes || {}
      dispatchCustomElementEvent(this, 'on_select', {
        ...args,
        attributes,
      })
    }
  }

  onChangeHandler = (args) => {
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'on_change', {
      ...args,
      attributes,
    })
  }

  getTitle(title = null) {
    const { data } = this.context.drawerList
    if (data && data.length > 0) {
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
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Dropdown.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Dropdown,
      includeValidProps(this.context.FormRow),
      this.context.Dropdown
    )

    const {
      label,
      label_direction,
      label_sr_only,
      icon_size,
      size,
      fixed_position,
      enable_body_lock,
      status,
      status_state,
      status_props,
      status_no_animation,
      global_status_id,
      suffix,
      scrollable,
      focusable,
      keep_open,
      prevent_close,
      no_animation,
      no_scroll_animation,
      triangle_position,
      skip_portal,
      portal_class,
      trigger_element: CustomTrigger,
      more_menu,
      action_menu,
      independent_width,
      prevent_selection,
      max_height,
      default_value,
      className,
      class: _className,
      disabled,
      stretch,
      skeleton,
      variant,

      title: _title,
      icon: _icon, // eslint-disable-line
      align_dropdown: _align_dropdown, // eslint-disable-line
      icon_position: _icon_position, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line

      ...attributes
    } = props

    let { icon, icon_position, align_dropdown } = props
    const id = this._id

    const handleAsMenu =
      isTrue(action_menu) || isTrue(more_menu) || isTrue(prevent_selection)
    const isPopupMenu = isTrue(more_menu) || !(_title && _title.length > 0)
    if (isPopupMenu) {
      icon = icon || (isTrue(more_menu) ? 'more' : 'chevron_down')
    }
    if (isPopupMenu || isTrue(action_menu)) {
      if (icon_position !== 'right' && align_dropdown !== 'right') {
        icon_position = 'left'
        align_dropdown = 'left'
      }
    }

    const { selected_item, direction, opened } = this.context.drawerList
    const showStatus = getStatusState(status)
    const title = this.getTitle(_title)

    // make it possible to grab the rest attributes and return it with all events
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
        `dnb-dropdown--icon-position-${icon_position || 'right'}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        isTrue(action_menu) && `dnb-dropdown--action-menu`,
        (isTrue(independent_width) || isTrue(action_menu)) &&
          'dnb-dropdown--independent-width',
        size && `dnb-dropdown--${size}`,
        isTrue(stretch) && `dnb-dropdown--stretch`,
        `dnb-dropdown--${align_dropdown || 'right'}`,
        status && `dnb-dropdown__status--${status_state}`,
        showStatus && 'dnb-dropdown__form-status',
        'dnb-form-component',
        createSpacingClasses(props),
        _className,
        className
      ),
    }

    const triggerParams = {
      className: classnames(
        'dnb-dropdown__trigger',
        opened && 'dnb-button--active'
      ),
      id,
      disabled,
      'aria-haspopup': handleAsMenu ? true : 'listbox',
      'aria-expanded': opened,
      // 'aria-controls': `${id}-drawer-list`,
      ...attributes,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      onClick: this.onClickHandler,
      onKeyDown: this.onTriggerKeyDownHandler,
    }

    if (opened) {
      triggerParams['aria-controls'] = `${id}-drawer-list`
    }

    if (showStatus || suffix) {
      triggerParams['aria-describedby'] = combineDescribedBy(
        triggerParams,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }

    if (label) {
      triggerParams['aria-labelledby'] = combineLabelledBy(
        triggerParams,
        id + '-label',
        id // used to read the current value
      )
    }

    // also used for code markup simulation
    validateDOMAttributes(null, mainParams)
    validateDOMAttributes(this.props, triggerParams)

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
            onClick={this.onClickHandler}
          />
        )}

        <span className="dnb-dropdown__inner" ref={this._ref}>
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            global_status_id={global_status_id}
            label={label}
            text_id={id + '-status'} // used for "aria-describedby"
            text={status}
            state={status_state}
            no_animation={status_no_animation}
            skeleton={skeleton}
            {...status_props}
          />

          <span className="dnb-dropdown__row">
            <span className="dnb-dropdown__shell" ref={this._refShell}>
              {CustomTrigger ? (
                <CustomTrigger {...triggerParams} />
              ) : (
                <Button
                  variant={variant}
                  icon={false} // only to suppress the warning about the icon when tertiary variant is used
                  size={size === 'default' ? 'medium' : size}
                  ref={this._refButton}
                  custom_content={
                    <>
                      {!isPopupMenu && (
                        <span className="dnb-dropdown__text dnb-button__text">
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
                            icon={icon || 'chevron_down'}
                            size={
                              icon_size ||
                              (size === 'large' ? 'medium' : 'default')
                            }
                          />
                        )}
                      </span>
                    </>
                  }
                  {...triggerParams}
                />
              )}

              <DrawerList
                id={id}
                role={handleAsMenu ? 'menu' : 'listbox'}
                portal_class={portal_class}
                list_class="dnb-dropdown__list"
                value={selected_item}
                default_value={default_value}
                scrollable={scrollable}
                focusable={focusable}
                no_animation={no_animation}
                no_scroll_animation={no_scroll_animation}
                skip_portal={skip_portal}
                prevent_selection={handleAsMenu}
                action_menu={action_menu}
                triangle_position={
                  triangle_position || icon_position || 'right'
                }
                keep_open={keep_open}
                prevent_close={prevent_close}
                independent_width={
                  isTrue(independent_width) || isPopupMenu || action_menu
                }
                is_popup={isPopupMenu || action_menu}
                align_drawer={align_dropdown || 'left'}
                fixed_position={fixed_position}
                enable_body_lock={enable_body_lock}
                disabled={disabled}
                max_height={max_height}
                direction={direction}
                size={size}
                on_change={this.onChangeHandler}
                on_select={this.onSelectHandler}
                on_hide={this.onHideHandler}
              />
            </span>

            {suffix && (
              <Suffix
                className="dnb-dropdown__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    )
  }
}

Dropdown.HorizontalItem = DrawerList.HorizontalItem
