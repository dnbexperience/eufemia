/**
 * Web ChipGroup Component
 */

import { useMemo } from 'react'
import { clsx } from 'clsx'
import ToggleButtonGroup from '../toggle-button/ToggleButtonGroup'
import type { ToggleButtonGroupProps } from '../toggle-button/ToggleButtonGroup'
import ChipGroupContext from './ChipGroupContext'
import type { ChipVariant } from './Chip'

export type ChipGroupProps = Omit<
  ToggleButtonGroupProps,
  'variant' | 'size' | 'leftComponent'
> & {
  /**
   * Defines the `variant` of every Chip in the group. With `radio`, the group gets the `radiogroup` role. Defaults to `default`.
   */
  variant?: ChipVariant
}

function ChipGroup({
  variant,
  multiselect,
  className,
  ...props
}: ChipGroupProps) {
  const context = useMemo(() => ({ variant }), [variant])

  return (
    <ChipGroupContext value={context}>
      <ToggleButtonGroup
        className={clsx('dnb-chip-group', className)}
        variant={variant === 'add-remove' ? 'default' : variant}
        multiselect={multiselect ?? variant !== 'radio'}
        {...props}
      />
    </ChipGroupContext>
  )
}

export default ChipGroup
