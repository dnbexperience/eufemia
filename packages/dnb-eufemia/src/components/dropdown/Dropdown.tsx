/**
 * Web Dropdown Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import {
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

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
  getCurrentData,
} from '../../fragments/drawer-list/DrawerListHelpers'
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
} from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListSuffix,
} from '../../fragments/DrawerList'

export type DropdownData = DrawerListData
type DropdownTitle = string | React.ReactNode
type DropdownAlign = 'left' | 'right'
type DropdownTriggerElement = ((...args: any[]) => any) | React.ReactNode

export interface DropdownProps {
  /**
   * Give a title to let the users know what they have to do. Defaults to `Valgmeny`.
   */
  title?: DropdownTitle
  /**
   * Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.
   */
  variant?: ButtonVariant
  /**
   * Icon to be included in the dropdown.
   */
  icon?: IconIcon
  /**
   * Change the size of the icon pragmatically.
   */
  iconSize?: IconSize
  /**
   * Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.
   */
  iconPosition?: ButtonIconPosition
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: React.ReactNode
  /**
   * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: 'vertical' | 'horizontal'
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * By providing a React.ref you can get the internally used main element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref<HTMLElement>
  /**
   * By providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  buttonRef?: React.Ref<HTMLElement>
  /**
   * Same as `preventSelection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.
   */
  moreMenu?: boolean
  /**
   * Use `right` to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `moreMenu`. Defaults to `left`.
   */
  align?: DropdownAlign
  /**
   * Lets you provide a custom React element as the trigger HTML element.
   */
  triggerElement?: DropdownTriggerElement
  /**
   * If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.
   */
  openOnFocus?: boolean
  disabled?: boolean
  /**
   * If set to `true`, then the dropdown will be 100% in available `width`.
   */
  stretch?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.
   */
  suffix?: DrawerListSuffix
  /**
   * Will be called once the Dropdown shows up.
   */
  onOpen?: (...args: any[]) => any
  /**
   * Will be called once the Dropdown gets closed.
   */
  onClose?: (...args: any[]) => any
  onOpenFocus?: (...args: any[]) => any
  onCloseFocus?: (...args: any[]) => any
}

export type DropdownAllProps = DropdownProps &
  FormStatusBaseProps &
  DrawerListProps &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'title'
    | 'placeholder'
    | 'data'
    | 'children'
    | 'onChange'
    | 'onFocus'
    | 'onOpen'
    | 'onClose'
    | 'onSelect'
    | 'onResize'
  >

class DropdownInstance extends React.PureComponent<DropdownAllProps> {
  static defaultProps = {
    id: null,
    title: 'Option Menu',
    variant: 'secondary',
    icon: null,
    iconSize: null,
    iconPosition: null,
    arrowPosition: null,
    label: null,
    labelDirection: null,
    labelSrOnly: null,
    status: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    ref: null,
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
    align: null,
    triggerElement: null,
    data: null,
    defaultValue: null,
    value: 'initval',
    openOnFocus: false,
    preventClose: false,
    keepOpen: false,
    open: false,
    disabled: null,
    stretch: null,
    skeleton: null,

    className: null,
    children: null,

    onOpen: null,
    onClose: null,

    onChange: null,
    onSelect: null,
  }

  static contextType = DrawerListContext
  context!: React.ContextType<typeof DrawerListContext>

  attributes: Record<string, unknown>
  _ref: React.RefObject<HTMLElement | null>
  _refWrapper: React.RefObject<HTMLElement | null>
  _refButton: React.RefObject<HTMLElement | null>
  _focusTimeout: ReturnType<typeof setTimeout>

  constructor(props: DropdownAllProps) {
    super(props)

    this.attributes = {}
    this.state = this.state || {}

    this._ref = React.createRef()
    this._refWrapper = React.createRef()
    this._refButton = React.createRef()
  }

  componentDidMount() {
    if (this.props.open) {
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
    if (this.props.openOnFocus) {
      this.setVisible()
    }
  }

  onBlurHandler = () => {
    if (this.props.openOnFocus) {
      this.setHidden()
    }
  }

  onClickHandler = () => {
    if (this.props.disabled) {
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
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.setVisible()
        break

      case 'ArrowUp':
      case 'ArrowDown':
        e.preventDefault()
        this.setVisible()

        break

      case 'Escape':
        this.setHidden()
        break

      case 'Home':
      case 'End':
      case 'PageDown':
      case 'PageUp':
        e.preventDefault()
        break
    }
  }

  onCloseHandler = (args = {}) => {
    const attributes = this.attributes || {}
    const res = dispatchCustomElementEvent(this, 'onClose', {
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
          dispatchCustomElementEvent(this, 'onCloseFocus', { element })
        }
      } catch (e) {
        // do noting
      }
    }, 1) // NVDA / Firefox needs a delay to set this focus
  }

  onSelectHandler = (args) => {
    if (parseFloat(args.activeItem) > -1) {
      const attributes = this.attributes || {}
      dispatchCustomElementEvent(this, 'onSelect', {
        ...args,
        attributes,
      })
    }
  }

  onChangeHandler = (args) => {
    const attributes = this.attributes || {}
    dispatchCustomElementEvent(this, 'onChange', {
      ...args,
      attributes,
    })
  }

  getTitle(title = null) {
    const { data } = this.context.drawerList
    if (data && data.length > 0) {
      const currentOptionData = getCurrentData(
        this.context.drawerList.selectedItem,
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
      DropdownInstance.defaultProps,
      { skeleton: this.context?.skeleton },
      (this.context as any).getTranslation(this.props).Dropdown,
      pickFormElementProps(this.context?.formElement),
      (this.context as any).Dropdown
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
      arrowPosition,
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
      icon: _icon,
      align: _align,
      iconPosition: _iconPosition,
      openOnFocus: _openOnFocus,
      data: _data,
      children: _children,
      direction: _direction,
      id: _id,
      open: _open,
      value: _value,
      pageOffset: _pageOffset,
      observerElement: _observerElement,
      enableBodyLock: _enableBodyLock,
      listClass: _listClass,
      buttonRef,
      ref: _ref,

      onOpen: _onOpen,
      onClose: _onClose,
      onFocus: _onFocus,
      onChange: _onChange,
      onSelect: _onSelect,
      onOpenFocus: _onOpenFocus,
      onCloseFocus: _onCloseFocus,

      ...attributes
    } = props as any

    let { icon, iconPosition, align } = props

    const handleAsMenu = actionMenu || moreMenu || preventSelection

    const title = this.getTitle(_title)
    const isPopupMenu = moreMenu || !title

    if (isPopupMenu) {
      icon = icon || (moreMenu ? 'more' : 'chevron_down')
    }
    if (isPopupMenu || actionMenu) {
      if (iconPosition !== 'right' && align !== 'right') {
        iconPosition = 'left'
        align = 'left'
      }
    }
    // TODO: This is an temporary fix for now.
    // We believe this can be removed and replaced by placing the triangle based on,
    // calculating the position based on the dropdowns width.
    if (independentWidth && iconPosition !== 'left' && !align) {
      align = 'right'
    }

    const { id, selectedItem, direction, open } = this.context.drawerList
    const showStatus = getStatusState(status)

    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const mainParams = {
      className: clsx(
        'dnb-dropdown',
        `dnb-dropdown--${direction}`,
        open && 'dnb-dropdown--open',
        labelDirection && `dnb-dropdown--${labelDirection}`,
        `dnb-dropdown--icon-position-${iconPosition || 'right'}`,
        isPopupMenu && 'dnb-dropdown--is-popup',
        actionMenu && `dnb-dropdown--action-menu`,
        (independentWidth || actionMenu) &&
          'dnb-dropdown--independent-width',
        size && `dnb-dropdown--${size}`,
        stretch && `dnb-dropdown--stretch`,
        `dnb-dropdown--${align || 'right'}`,
        status && `dnb-dropdown__status--${statusState}`,
        showStatus && 'dnb-dropdown__form-status',
        'dnb-form-component',
        createSpacingClasses(props),
        className
      ),
    }

    const triggerParams = {
      className: clsx(
        'dnb-dropdown__trigger',
        open && 'dnb-button--active'
      ),
      id,
      disabled,
      'aria-haspopup': handleAsMenu ? true : 'listbox',
      'aria-expanded': open,
      ...attributes,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      onClick: this.onClickHandler,
      onKeyDown: this.onTriggerKeyDownHandler,
    }

    if (open) {
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
                React.createElement(
                  CustomTrigger as React.ElementType,
                  triggerParams
                )
              ) : (
                <Button
                  variant={variant}
                  icon={false} // only to suppress the warning about the icon when tertiary variant is used
                  size={
                    (size === 'default' ? 'medium' : size) as ButtonSize
                  }
                  ref={this._refButton}
                  customContent={
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
                        className={clsx(
                          'dnb-dropdown__icon',
                          parseFloat(String(selectedItem)) === 0 &&
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
                listClass={clsx(
                  'dnb-dropdown__list',
                  variant === 'tertiary' && 'dnb-dropdown__list--tertiary'
                )}
                value={selectedItem}
                defaultValue={defaultValue}
                scrollable={scrollable}
                focusable={focusable}
                noAnimation={noAnimation}
                noScrollAnimation={noScrollAnimation}
                skipPortal={skipPortal}
                preventSelection={handleAsMenu}
                actionMenu={actionMenu}
                arrowPosition={arrowPosition || iconPosition || 'right'}
                keepOpen={keepOpen}
                preventClose={preventClose}
                independentWidth={
                  independentWidth || isPopupMenu || actionMenu
                }
                isPopup={isPopupMenu || actionMenu}
                alignDrawer={align || 'left'}
                fixedPosition={fixedPosition}
                enableBodyLock={enableBodyLock}
                disabled={disabled}
                maxHeight={maxHeight}
                direction={direction}
                size={size}
                onChange={this.onChangeHandler}
                onSelect={this.onSelectHandler}
                onClose={this.onCloseHandler}
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

;(DropdownInstance as any)._formElement = true
;(DropdownInstance as any)._supportsSpacingProps = true

/**
 * Function component wrapper that provides DrawerListProvider context
 * and forwards `ref` and `buttonRef` to the inner DOM elements.
 */
function Dropdown({ ref, buttonRef, ...props }: DropdownAllProps) {
  const id = React.useMemo(() => props.id || makeUniqueId(), [props.id])
  const { moreMenu, actionMenu, preventSelection, children, data } = props

  const instanceRef = React.useCallback(
    (instance) => {
      const el = instance?._ref?.current ?? null
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }

      const btnEl = instance?._refButton?.current ?? null
      if (typeof buttonRef === 'function') {
        buttonRef(btnEl)
      } else if (buttonRef) {
        buttonRef.current = btnEl
      }
    },
    [ref, buttonRef]
  )

  return (
    <DrawerListProvider
      {...(props as any)}
      id={id}
      data={(data || children) as any}
      open={false}
      tagName="dnb-dropdown"
      ignoreEvents={false}
      preventSelection={moreMenu || actionMenu || preventSelection}
    >
      <DropdownInstance
        ref={ref || buttonRef ? instanceRef : undefined}
        {...props}
        id={id}
      />
    </DrawerListProvider>
  )
}

Dropdown.defaultProps = DropdownInstance.defaultProps

Dropdown.HorizontalItem = DrawerList.HorizontalItem
Dropdown._formElement = true
Dropdown._supportsSpacingProps = true

export default Dropdown
