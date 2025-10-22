/**
 * Web Dropdown Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
  keycode,
  convertJsxToString,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

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
    iconSize: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    trianglePosition: PropTypes.oneOf(['left', 'right']),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    labelDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    buttonRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    scrollable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    focusable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
    maxHeight: PropTypes.number,
    skipPortal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    portalClass: PropTypes.string,
    noAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    noScrollAnimation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    preventSelection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    moreMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    actionMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    independentWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    alignDropdown: PropTypes.oneOf(['left', 'right']),
    triggerElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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
            content: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.node,
              PropTypes.arrayOf(PropTypes.string),
            ]),
          }),
        ])
      ),
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    openOnFocus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    preventClose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    keepOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array,
    ]),

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
    iconSize: null,
    iconPosition: null,
    trianglePosition: null,
    label: null,
    labelDirection: null,
    labelSrOnly: null,
    status: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    innerRef: null,
    buttonRef: null,
    suffix: null,
    scrollable: true,
    focusable: false,
    maxHeight: null,
    direction: 'auto',
    skipPortal: null,
    portalClass: null,
    noAnimation: false,
    noScrollAnimation: false,
    preventSelection: false,
    moreMenu: false,
    actionMenu: false,
    independentWidth: false,
    size: 'default',
    alignDropdown: null,
    triggerElement: null,
    data: null,
    defaultValue: null,
    value: 'initval',
    openOnFocus: false,
    preventClose: false,
    keepOpen: false,
    opened: false,
    disabled: null,
    stretch: null,
    skeleton: null,

    className: null,
    children: null,

    on_show: null,
    on_hide: null,

    on_change: null,
    on_select: null,
    on_state_update: null,
  }

  render() {
    // generate ID here, so we can send it along the provider
    const id = this.props.id || makeUniqueId()
    const { moreMenu, actionMenu, preventSelection, children, data } =
      this.props

    return (
      <DrawerListProvider
        {...this.props}
        id={id}
        data={data || children}
        opened={false}
        tagName="dnb-dropdown"
        ignoreEvents={false}
        preventSelection={
          isTrue(moreMenu) ||
          isTrue(actionMenu) ||
          isTrue(preventSelection)
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

    this._ref = props.innerRef || React.createRef()
    this._refWrapper = React.createRef()
    this._refButton = props.buttonRef || React.createRef()
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
      .setWrapperElement(this._refWrapper.current)
      .setVisible()
  }

  setHidden = (...args) => {
    this.context.drawerList.setHidden(...args)
  }

  onFocusHandler = () => {
    if (isTrue(this.props.openOnFocus)) {
      this.setVisible()
    }
  }

  onBlurHandler = () => {
    if (isTrue(this.props.openOnFocus)) {
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
        const element = this._refButton.current
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
          currentOptionData.selectedValue ||
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
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.Dropdown
    )

    const {
      label,
      labelDirection,
      labelSrOnly,
      iconSize,
      size,
      fixedPosition,
      enableBodyLock,
      status,
      statusState,
      statusProps,
      statusNoAnimation,
      globalStatus,
      suffix,
      scrollable,
      focusable,
      keepOpen,
      preventClose,
      noAnimation,
      noScrollAnimation,
      trianglePosition,
      skipPortal,
      portalClass,
      triggerElement: CustomTrigger,
      moreMenu,
      actionMenu,
      independentWidth,
      preventSelection,
      maxHeight,
      defaultValue,
      className,
      disabled,
      stretch,
      skeleton,
      variant,

      title: _title,
      icon: _icon, // eslint-disable-line
      alignDropdown: _align_dropdown, // eslint-disable-line
      iconPosition: _iconPosition, // eslint-disable-line
      openOnFocus: _openOnFocus, // eslint-disable-line
      data: _data, // eslint-disable-line
      children: _children, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      enableBodyLock: _enableBodyLock, // eslint-disable-line
      listClass: _listClass, // eslint-disable-line
      buttonRef, // eslint-disable-line
      innerRef, // eslint-disable-line

      ...attributes
    } = props

    let { icon, iconPosition, alignDropdown } = props
    const id = this._id

    const handleAsMenu =
      isTrue(actionMenu) || isTrue(moreMenu) || isTrue(preventSelection)

    const title = this.getTitle(_title)
    const isPopupMenu = isTrue(moreMenu) || !title

    if (isPopupMenu) {
      icon = icon || (isTrue(moreMenu) ? 'more' : 'chevron_down')
    }
    if (isPopupMenu || isTrue(actionMenu)) {
      if (iconPosition !== 'right' && alignDropdown !== 'right') {
        iconPosition = 'left'
        alignDropdown = 'left'
      }
    }
    // TODO: This is an temporary fix for now.
    // We believe this can be removed and replaced by placing the triangle based on,
    // calculating the position based on the dropdowns width.
    if (
      isTrue(independentWidth) &&
      iconPosition !== 'left' &&
      !alignDropdown
    ) {
      alignDropdown = 'right'
    }

    const { selected_item, direction, opened } = this.context.drawerList
    const showStatus = getStatusState(status)

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
        labelDirection && `dnb-dropdown--${labelDirection}`,
        `dnb-dropdown--icon-position-${iconPosition || 'right'}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        isTrue(actionMenu) && `dnb-dropdown--action-menu`,
        (isTrue(independentWidth) || isTrue(actionMenu)) &&
          'dnb-dropdown--independent-width',
        size && `dnb-dropdown--${size}`,
        isTrue(stretch) && `dnb-dropdown--stretch`,
        `dnb-dropdown--${alignDropdown || 'right'}`,
        status && `dnb-dropdown__status--${statusState}`,
        showStatus && 'dnb-dropdown__form-status',
        'dnb-form-component',
        createSpacingClasses(props),
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
      ...attributes,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      onClick: this.onClickHandler,
      onKeyDown: this.onTriggerKeyDownHandler,
    }

    if (opened) {
      triggerParams['aria-controls'] = `${id}-ul`
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
      <span ref={this._ref} {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
            forId={id}
            text={label}
            labelDirection={labelDirection}
            srOnly={labelSrOnly}
            disabled={disabled}
            skeleton={skeleton}
            onClick={this.onClickHandler}
          />
        )}

        <span className="dnb-dropdown__inner" ref={this._refWrapper}>
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
            {...statusProps}
          />

          <span className="dnb-dropdown__row">
            <span className="dnb-dropdown__shell">
              {CustomTrigger ? (
                <CustomTrigger {...triggerParams} />
              ) : (
                <Button
                  variant={variant}
                  icon={false} // only to suppress the warning about the icon when tertiary variant is used
                  size={size === 'default' ? 'medium' : size}
                  innerRef={this._refButton}
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
                              iconSize ||
                              (size === 'large' ? 'medium' : 'default')
                            }
                          />
                        )}
                      </span>
                    </>
                  }
                  role="combobox"
                  title={convertJsxToString(title) || undefined}
                  {...triggerParams}
                />
              )}

              <DrawerList
                id={id}
                role={handleAsMenu ? 'menu' : 'listbox'}
                portalClass={portalClass}
                listClass={classnames(
                  'dnb-dropdown__list',
                  variant === 'tertiary' && 'dnb-dropdown__list--tertiary'
                )}
                value={selected_item}
                defaultValue={defaultValue}
                scrollable={scrollable}
                focusable={focusable}
                noAnimation={noAnimation}
                noScrollAnimation={noScrollAnimation}
                skipPortal={skipPortal}
                preventSelection={handleAsMenu}
                actionMenu={actionMenu}
                trianglePosition={
                  trianglePosition || iconPosition || 'right'
                }
                keepOpen={keepOpen}
                preventClose={preventClose}
                independentWidth={
                  isTrue(independentWidth) || isPopupMenu || actionMenu
                }
                isPopup={isPopupMenu || actionMenu}
                alignDrawer={alignDropdown || 'left'}
                fixedPosition={fixedPosition}
                enableBodyLock={enableBodyLock}
                disabled={disabled}
                maxHeight={maxHeight}
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
                onClick={this.setHidden}
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
Dropdown._formElement = true
Dropdown._supportsSpacingProps = true
