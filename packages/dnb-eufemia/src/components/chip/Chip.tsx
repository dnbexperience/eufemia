/**
 * Web Chip Component
 */

import { useContext } from 'react'
import { clsx } from 'clsx'
import ToggleButton from '../toggle-button/ToggleButton'
import type { ToggleButtonProps } from '../toggle-button/ToggleButton'
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import { getCloseCircleIcon } from '../tag/CloseCircleIcon'
import ChipGroup from './ChipGroup'
import ChipGroupContext from './ChipGroupContext'

export type { ChipGroupProps } from './ChipGroup'

export type ChipVariant = 'default' | 'add-remove' | 'checkbox' | 'radio'

export type ChipProps = Omit<
  ToggleButtonProps,
  | 'variant'
  | 'label'
  | 'labelDirection'
  | 'labelSrOnly'
  | 'suffix'
  | 'size'
  | 'icon'
  | 'iconPosition'
  | 'iconSize'
> & {
  /**
   * Use `add-remove` to show an add icon that turns into a remove icon when checked, or `checkbox` or `radio` to show a checkbox or radio button in front of the text. Defaults to `default`.
   */
  variant?: ChipVariant

  /**
   * Icon shown in front of the text, when `variant` is `default` or `add-remove`.
   */
  icon?: IconIcon
}

function Chip({
  variant: variantProp,
  icon,
  leftComponent,
  status,
  className,
  ...props
}: ChipProps) {
  const groupContext = useContext(ChipGroupContext)
  const variant = variantProp ?? groupContext.variant ?? 'default'
  const isAddRemove = variant === 'add-remove'
  const role =
    variant === 'radio' || variant === 'checkbox' ? variant : undefined

  return (
    <ToggleButton
      className={clsx('dnb-chip', `dnb-chip--${variant}`, className)}
      variant={isAddRemove ? 'default' : variant}
      role={role}
      leftComponent={
        leftComponent ?? (icon ? <IconPrimary icon={icon} /> : undefined)
      }
      icon={isAddRemove ? getCloseCircleIcon() : undefined}
      status={status ?? groupContext.status}
      {...props}
    />
  )
}

Chip.Group = ChipGroup

export default Chip
