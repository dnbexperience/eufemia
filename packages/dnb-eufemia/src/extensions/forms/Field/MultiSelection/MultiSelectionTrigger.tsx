import clsx from 'clsx'
import { Button, IconPrimary } from '../../../../components'
import { combineDescribedBy } from '../../../../shared/component-helper'
import type { PopoverTriggerRenderProps } from '../../../../components/popover/types'

export type MultiSelectionTriggerProps = {
  id: string
  active: boolean
  disabled?: boolean
  displayCount: number
  totalCount: number
  formatSelectionCount: (count: number, total: number) => string
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
  triggerProps?: Omit<PopoverTriggerRenderProps, 'active'>
}

export function MultiSelectionTrigger({
  id,
  active,
  disabled,
  displayCount,
  totalCount,
  formatSelectionCount,
  onKeyDown,
  triggerProps = {} as Omit<PopoverTriggerRenderProps, 'active'>,
}: MultiSelectionTriggerProps) {
  const selectionCountId = `${id}-selection-count`
  const {
    className: triggerClassName,
    onKeyDown: triggerKeyDown,
    ...restTriggerProps
  } = triggerProps

  return (
    <span
      className={clsx(
        'dnb-dropdown',
        'dnb-dropdown--stretch',
        'dnb-dropdown--default',
        'dnb-dropdown--right',
        'dnb-dropdown--icon-position-right',
        'dnb-dropdown--vertical',
        'dnb-form-component',
        active && 'dnb-dropdown--open'
      )}
    >
      <span className="dnb-dropdown__inner">
        <span className="dnb-dropdown__row">
          <span className="dnb-dropdown__shell">
            <Button
              variant="secondary"
              size="medium"
              role="combobox"
              aria-haspopup="listbox"
              {...restTriggerProps}
              className={clsx('dnb-dropdown__trigger', triggerClassName)}
              disabled={disabled}
              customContent={
                <>
                  <span
                    aria-hidden="true"
                    className="dnb-dropdown__text dnb-button__text"
                  >
                    <span className="dnb-dropdown__text__inner">
                      {formatSelectionCount(displayCount, totalCount)}
                    </span>
                  </span>
                  <span id={selectionCountId} className="dnb-sr-only">
                    {formatSelectionCount(displayCount, totalCount)}
                  </span>
                  <span aria-hidden className="dnb-dropdown__icon">
                    <IconPrimary icon="chevron_down" />
                  </span>
                </>
              }
              aria-describedby={combineDescribedBy(
                restTriggerProps,
                selectionCountId
              )}
              onKeyDown={(event) => {
                onKeyDown?.(event)
                triggerKeyDown?.(event)
              }}
              id={id}
            />
          </span>
        </span>
      </span>
    </span>
  )
}
