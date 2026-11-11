import { useContext, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { clsx } from 'clsx'
import Checkbox from '../checkbox/Checkbox'
import Radio from '../radio/Radio'
import RadioGroupContext from '../radio/RadioGroupContext'
import CheckIcon from '../checkbox/CheckIcon'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import Space from '../space/Space'
import Suffix from '../../shared/helpers/Suffix'
import add from '../../icons/dnb/add'
import close from '../../icons/dnb/close'
import Context from '../../shared/Context'
import {
  combineDescribedBy,
  convertJsxToString,
  extendPropsWithContext,
  getStatusState,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ChipElement, ChipProps } from './types'
import ChipButton from './ChipButton'
import ChipGroup from './ChipGroup'
import ChipGroupContext from './ChipGroupContext'

export type * from './types'

function Chip(localProps: ChipProps) {
  const context = useContext(Context)
  const radioGroupContext = useContext(RadioGroupContext)
  const groupContext = useContext(ChipGroupContext)
  const {
    variant = groupContext?.variant ?? 'default',
    text,
    children,
    labelSrOnly,
    tooltip,
    suffix,
    icon,
    className,
    style,
    size = groupContext?.size ?? 'default',
    top,
    right,
    bottom,
    left,
    space,
    innerSpace,
    value = '',
    onChange,
    onKeyDown,
    ...props
  } = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context.skeleton },
    pickFormElementProps(context.formElement),
    context.Chip
  )

  const singleSelection =
    groupContext && groupContext.selectionMode === 'single'
  const isRadio = groupContext ? singleSelection : variant === 'radio'
  const isButton = variant === 'addable' && !isRadio
  const Control = isButton ? ChipButton : isRadio ? Radio : Checkbox
  const id = useId(props.id)
  const controlRef = useRef<ChipElement>(null)
  const combinedRef = useCombinedRef(controlRef, props.ref)
  const checked = groupContext
    ? singleSelection
      ? groupContext.value === value
      : groupContext.values.includes(value)
    : isRadio && radioGroupContext.value !== undefined
      ? radioGroupContext.value === value
      : props.checked
  const spacingProps = {
    top,
    right,
    bottom,
    left,
    space,
    ...(innerSpace !== undefined && { innerSpace }),
  }

  const control = (
    <Control
      {...props}
      {...(!suffix && spacingProps)}
      style={suffix ? undefined : style}
      ref={combinedRef}
      id={id}
      checked={checked}
      name={groupContext?.name ?? props.name}
      disabled={props.disabled ?? groupContext?.disabled}
      readOnly={props.readOnly ?? groupContext?.readOnly}
      skeleton={props.skeleton ?? groupContext?.skeleton}
      aria-invalid={
        props['aria-invalid'] ??
        (groupContext?.invalid ||
        (props.status && (props.statusState ?? 'error') === 'error')
          ? true
          : undefined)
      }
      aria-describedby={combineDescribedBy(
        props['aria-describedby'],
        groupContext?.describedBy,
        suffix ? `${id}-suffix` : undefined,
        getStatusState(props.status) ? `${id}-status` : undefined
      )}
      className={clsx(
        'dnb-chip',
        `dnb-chip--${variant}`,
        `dnb-chip--size-${size}`,
        groupContext?.invalid &&
          (isButton
            ? 'dnb-chip--status-error'
            : `dnb-${isRadio ? 'radio' : 'checkbox'}__status--error`),
        className
      )}
      value={String(value)}
      labelPosition="right"
      label={
        <>
          {isRadio && variant === 'checkbox' && (
            <span className="dnb-chip__check" aria-hidden>
              <CheckIcon size="default" />
            </span>
          )}
          {icon && (
            <Icon className="dnb-chip__icon" icon={icon} aria-hidden />
          )}
          <span
            className={clsx(
              'dnb-chip__text',
              labelSrOnly && 'dnb-sr-only'
            )}
          >
            {text ?? children}
          </span>
          {variant === 'addable' && (
            <span className="dnb-chip__action" aria-hidden>
              <Icon className="dnb-chip__add" icon={add} />
              <Icon className="dnb-chip__remove" icon={close} />
            </span>
          )}
        </>
      }
      onChange={({ checked, event }) => {
        const change = {
          checked: singleSelection ? true : checked,
          value,
          event,
        }
        groupContext?.onChange(change)
        onChange?.(change)
      }}
      onKeyDown={(
        keyEvent: KeyboardEvent<ChipElement> & {
          event?: KeyboardEvent<ChipElement>
        }
      ) => {
        const event = keyEvent.event ?? keyEvent
        onKeyDown?.(event)

        if (
          !isButton &&
          event.key === 'Enter' &&
          !event.defaultPrevented
        ) {
          event.preventDefault()

          if (!isRadio) {
            event.currentTarget.click()
          }
        }
      }}
    />
  )

  return (
    <>
      {suffix ? (
        <Space
          element="span"
          {...spacingProps}
          style={style}
          className="dnb-chip__wrapper"
        >
          {control}
          <Suffix
            className="dnb-chip__suffix"
            id={`${id}-suffix`}
            context={props}
            skeleton={props.skeleton ?? groupContext?.skeleton}
          >
            {suffix}
          </Suffix>
        </Space>
      ) : (
        control
      )}
      {tooltip && (
        <Tooltip
          key={isButton ? 'button' : isRadio ? 'radio' : 'checkbox'}
          id={`${id}-tooltip`}
          targetElement={controlRef}
          tooltip={tooltip}
          omitDescribedBy={
            convertJsxToString(tooltip) ===
            convertJsxToString(props['aria-label'] ?? text ?? children)
          }
        />
      )}
    </>
  )
}

Chip.Group = ChipGroup

withComponentMarkers(Chip, {
  _formElement: true,
})

export default Chip
