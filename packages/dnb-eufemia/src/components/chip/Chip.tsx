import { useContext } from 'react'
import type { KeyboardEvent } from 'react'
import { clsx } from 'clsx'
import Checkbox from '../checkbox/Checkbox'
import Radio from '../radio/Radio'
import RadioGroupContext from '../radio/RadioGroupContext'
import CheckIcon from '../checkbox/CheckIcon'
import Icon from '../icon/Icon'
import add from '../../icons/dnb/add'
import close from '../../icons/dnb/close'
import Context from '../../shared/Context'
import {
  combineDescribedBy,
  extendPropsWithContext,
  getStatusState,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ChipProps } from './types'
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
    label,
    icon,
    className,
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

  const singleSelection = groupContext && !groupContext.multiselect
  const isRadio = groupContext ? singleSelection : variant === 'radio'
  const Control = isRadio ? Radio : Checkbox
  const id = useId(props.id)
  const checked = groupContext
    ? singleSelection
      ? groupContext.value === value
      : groupContext.values.includes(value)
    : isRadio && radioGroupContext.value !== undefined
      ? radioGroupContext.value === value
      : props.checked

  return (
    <Control
      {...props}
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
        getStatusState(props.status) ? `${id}-status` : undefined
      )}
      className={clsx(
        'dnb-chip',
        `dnb-chip--${variant}`,
        groupContext?.invalid &&
          `dnb-${isRadio ? 'radio' : 'checkbox'}__status--error`,
        className
      )}
      value={value}
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
          <span className="dnb-chip__text">
            {text ?? children ?? label}
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
        keyEvent: KeyboardEvent<HTMLInputElement> & {
          event?: KeyboardEvent<HTMLInputElement>
        }
      ) => {
        const event = keyEvent.event ?? keyEvent
        onKeyDown?.(event)

        if (event.key === 'Enter' && !event.defaultPrevented) {
          event.preventDefault()

          if (!isRadio) {
            event.currentTarget.click()
          }
        }
      }}
    />
  )
}

Chip.Group = ChipGroup

withComponentMarkers(Chip, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Chip
