/**
 * Web Dropdown Component
 */

import React, { useContext, useRef, useCallback, useEffect } from 'react'
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
  removeUndefinedProps,
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
type DropdownTriggerElement =
  | ((props: Record<string, unknown>) => React.ReactNode)
  | React.ReactNode

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
  onOpen?: (args: Record<string, unknown>) => void
  /**
   * Will be called once the Dropdown gets closed.
   */
  onClose?: (args: Record<string, unknown>) => void
  onOpenFocus?: (args: { element: HTMLElement }) => void
  onCloseFocus?: (args: { element: HTMLElement }) => void
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

const dropdownDefaultProps = {
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

function DropdownInstance({
  externalRef,
  externalButtonRef,
  ...ownProps
}: DropdownAllProps & {
  externalRef?: React.Ref<HTMLElement>
  externalButtonRef?: React.Ref<HTMLElement>
}) {
  const context = useContext(DrawerListContext) as React.ContextType<
    typeof DrawerListContext
  >

  const elRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLElement>(null)
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const attributesRef = useRef<Record<string, unknown>>({})

  // Combine internal and external refs
  const setRootRef = useCallback(
    (el: HTMLElement | null) => {
      ;(elRef as React.MutableRefObject<HTMLElement | null>).current = el
      if (typeof externalRef === 'function') {
        externalRef(el)
      } else if (externalRef) {
        ;(
          externalRef as React.MutableRefObject<HTMLElement | null>
        ).current = el
      }
    },
    [externalRef]
  )

  const setButtonRef = useCallback(
    (el: HTMLElement | null) => {
      ;(buttonRef as React.MutableRefObject<HTMLElement | null>).current =
        el
      if (typeof externalButtonRef === 'function') {
        externalButtonRef(el)
      } else if (externalButtonRef) {
        ;(
          externalButtonRef as React.MutableRefObject<HTMLElement | null>
        ).current = el
      }
    },
    [externalButtonRef]
  )

  // Strip undefined values so they fall through to defaults,
  // preserving the legacy React defaultProps behavior.
  const propsWithDefaults = {
    ...dropdownDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  // Open on mount if props.open is set
  useEffect(() => {
    if (propsWithDefaults.open) {
      context.drawerList.setWrapperElement(wrapperRef.current).setVisible()
    }
    // Only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current)
      }
    }
  }, [])

  const setVisible = useCallback(() => {
    context.drawerList.setWrapperElement(wrapperRef.current).setVisible()
  }, [context.drawerList])

  const setHidden = useCallback(
    (...args: unknown[]) => {
      context.drawerList.setHidden(...(args as [unknown[], (() => void)?]))
    },
    [context.drawerList]
  )

  const setFocus = useCallback(
    (args: Record<string, unknown>) => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current)
      }
      focusTimeoutRef.current = setTimeout(() => {
        try {
          const element = buttonRef.current
          if (element && typeof element.focus === 'function') {
            if (args.preventHideFocus !== true) {
              element.focus({ preventScroll: true })
            }
            dispatchCustomElementEvent(
              { props: propsWithDefaults },
              'onCloseFocus',
              { element }
            )
          }
        } catch (e) {
          // do nothing
        }
      }, 1) // NVDA / Firefox needs a delay to set this focus
    },
    [propsWithDefaults]
  )

  const onFocusHandler = useCallback(() => {
    if (propsWithDefaults.openOnFocus) {
      setVisible()
    }
  }, [propsWithDefaults.openOnFocus, setVisible])

  const onBlurHandler = useCallback(() => {
    if (propsWithDefaults.openOnFocus) {
      setHidden()
    }
  }, [propsWithDefaults.openOnFocus, setHidden])

  const onClickHandler = useCallback(() => {
    if (propsWithDefaults.disabled) {
      return // stop here
    }
    if (!context.drawerList.hidden && context.drawerList.isOpen) {
      setHidden()
    } else {
      setVisible()
    }
  }, [
    propsWithDefaults.disabled,
    context.drawerList.hidden,
    context.drawerList.isOpen,
    setHidden,
    setVisible,
  ])

  const onTriggerKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          setVisible()
          break

        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          setVisible()
          break

        case 'Escape':
          setHidden()
          break

        case 'Home':
        case 'End':
        case 'PageDown':
        case 'PageUp':
          e.preventDefault()
          break
      }
    },
    [setVisible, setHidden]
  )

  const onCloseHandler = useCallback(
    (args: Record<string, unknown> = {}) => {
      const attributes = attributesRef.current || {}
      const res = dispatchCustomElementEvent(
        { props: propsWithDefaults },
        'onClose',
        {
          ...args,
          attributes,
        }
      )

      if (res !== false) {
        setFocus(args)
      }

      return res
    },
    [propsWithDefaults, setFocus]
  )

  const onSelectHandler = useCallback(
    (args: Record<string, unknown>) => {
      if (parseFloat(args.activeItem as string) > -1) {
        const attributes = attributesRef.current || {}
        dispatchCustomElementEvent(
          { props: propsWithDefaults },
          'onSelect',
          {
            ...args,
            attributes,
          }
        )
      }
    },
    [propsWithDefaults]
  )

  const onChangeHandler = useCallback(
    (args: Record<string, unknown>) => {
      const attributes = attributesRef.current || {}
      dispatchCustomElementEvent(
        { props: propsWithDefaults },
        'onChange',
        {
          ...args,
          attributes,
        }
      )
    },
    [propsWithDefaults]
  )

  const getTitle = (title: string | React.ReactNode = null) => {
    const { data } = context.drawerList
    if (data && data.length > 0) {
      const currentOptionData = getCurrentData(
        context.drawerList.selectedItem,
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

  // Render logic
  const props = extendPropsWithContextInClassComponent(
    propsWithDefaults,
    dropdownDefaultProps,
    { skeleton: context?.skeleton },
    (context as Record<string, any>).getTranslation(propsWithDefaults)
      .Dropdown,
    pickFormElementProps(context?.formElement),
    (context as Record<string, any>).Dropdown
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
    buttonRef: _buttonRef,
    ref: _ref,

    onOpen: _onOpen,
    onClose: _onClose,
    onFocus: _onFocus,
    onChange: _onChange,
    onSelect: _onSelect,
    onOpenFocus: _onOpenFocus,
    onCloseFocus: _onCloseFocus,

    externalRef: _externalRef,
    externalButtonRef: _externalButtonRef,

    ...attributes
  } = props as any

  let { icon, iconPosition, align } = props

  const handleAsMenu = actionMenu || moreMenu || preventSelection

  const title = getTitle(_title)
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

  const { id, selectedItem, direction, open } = context.drawerList
  const showStatus = getStatusState(status)

  Object.assign(
    context.drawerList.attributes,
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
    className: clsx('dnb-dropdown__trigger', open && 'dnb-button--active'),
    id,
    disabled,
    'aria-haspopup': handleAsMenu ? true : 'listbox',
    'aria-expanded': open,
    ...attributes,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onClick: onClickHandler,
    onKeyDown: onTriggerKeyDownHandler,
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
  validateDOMAttributes(ownProps, triggerParams)

  // make it possible to grab the rest attributes and return it with all events
  attributesRef.current = validateDOMAttributes(null, attributes)

  return (
    <span ref={setRootRef} {...mainParams}>
      {label && (
        <FormLabel
          id={id + '-label'}
          forId={id}
          text={label}
          labelDirection={labelDirection}
          srOnly={labelSrOnly}
          disabled={disabled}
          skeleton={skeleton}
          onClick={onClickHandler}
        />
      )}

      <span className="dnb-dropdown__inner" ref={wrapperRef}>
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
                size={(size === 'default' ? 'medium' : size) as ButtonSize}
                ref={setButtonRef}
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
              onChange={onChangeHandler}
              onSelect={onSelectHandler}
              onClose={onCloseHandler}
            />
          </span>

          {suffix && (
            <Suffix
              className="dnb-dropdown__suffix"
              id={id + '-suffix'} // used for "aria-describedby"
              context={props}
              onClick={setHidden}
            >
              {suffix}
            </Suffix>
          )}
        </span>
      </span>
    </span>
  )
}

/**
 * Function component wrapper that provides DrawerListProvider context
 * and forwards `ref` and `buttonRef` to the inner DOM elements.
 */
function Dropdown({ ref, buttonRef, ...props }: DropdownAllProps) {
  const id = React.useMemo(() => props.id || makeUniqueId(), [props.id])
  const { moreMenu, actionMenu, preventSelection, children, data } = props

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
        {...props}
        id={id}
        externalRef={ref}
        externalButtonRef={buttonRef}
      />
    </DrawerListProvider>
  )
}

Dropdown.defaultProps = dropdownDefaultProps

Dropdown.HorizontalItem = DrawerList.HorizontalItem
Dropdown._formElement = true
Dropdown._supportsSpacingProps = true

export default Dropdown
