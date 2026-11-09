import type { PropertiesTableProps } from '../../shared/types'
import { CheckboxProperties } from '../checkbox/CheckboxDocs'
import { RadioGroupProperties } from '../radio/RadioDocs'

export const ChipProperties: PropertiesTableProps = {
  text: {
    doc: 'The visible name of the chip. Takes precedence over `children` and `label`. Use text and decorative content only.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'The visible name when `text` is not provided.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  label: {
    doc: 'The visible name when neither `text` nor `children` is provided.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  variant: {
    doc: 'Choose the appearance. Chip.Group controls single or multiple selection independently of the appearance. Defaults to `default`. The addable icon switches between add and remove; the chip stays visible.',
    type: ['"default"', '"addable"', '"radio"', '"checkbox"'],
    status: 'optional',
  },
  icon: {
    doc: 'Optional decorative icon, flag, or logo before the text. Accepts an [Icon](/web/components/icon/) name or React element.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  checked: {
    doc: 'Whether the chip is selected. Defaults to `false`. User interaction updates the selection, and a changed `checked` property synchronizes it. Inside Chip.Group, use the group `value` or `values` instead.',
    type: 'boolean',
    status: 'optional',
  },
  value: {
    doc: 'The value returned by `onChange` and submitted with `name` when selected. Defaults to an empty string. Give every option in Chip.Group a unique value.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'Prevents interaction, keyboard focus, and form submission.',
    type: 'boolean',
    status: 'optional',
  },
  readOnly: {
    doc: 'Prevents selection changes while keeping the chip focusable and included in form submission when selected.',
    type: 'boolean',
    status: 'optional',
  },
  status: CheckboxProperties.status,
  statusState: CheckboxProperties.statusState,
  statusProps: CheckboxProperties.statusProps,
  globalStatus: CheckboxProperties.globalStatus,
  skeleton: CheckboxProperties.skeleton,
  ref: CheckboxProperties.ref,
  '[Space](/web/layout-and-typography/layout/space/properties)':
    CheckboxProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}

export const ChipEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called once when the user changes the selection. Returns `{ checked, value, event }`. For single selection, use Chip.Group onChange to receive the selected value.',
    type: '({ checked: boolean; value: string; event: React.SyntheticEvent<HTMLInputElement> }) => void',
    status: 'optional',
  },
}

export const ChipGroupProperties: PropertiesTableProps = {
  label: RadioGroupProperties.label,
  value: {
    doc: 'The selected chip value in single selection mode. Must match the unique `value` of a nested Chip. User interaction updates the selection, and a changed `value` property synchronizes it. Set it to `undefined` to clear the selection.',
    type: 'string',
    status: 'optional',
  },
  values: {
    doc: 'The selected values in multiselect mode. User interaction updates the selection, and a changed array synchronizes it. Use an empty array to clear the selection.',
    type: 'Array<string>',
    status: 'optional',
  },
  multiselect: {
    doc: 'Select several options using `values`. Defaults to false.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: 'Shared appearance. Each Chip can override it. Defaults to `default`.',
    type: ChipProperties.variant.type,
    status: 'optional',
  },
  name: {
    doc: 'The shared native input name. A unique name is generated when omitted.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'Disables the chips in the group. Each Chip can override it.',
    type: 'boolean',
    status: 'optional',
  },
  readOnly: {
    doc: 'Preserves the selection while keeping the chips focusable and included in form submission. Each Chip can override it.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: CheckboxProperties.skeleton,
  suffix: RadioGroupProperties.suffix,
  layoutDirection: {
    doc: 'The layout direction of the chips. Defaults to `row`.',
    type: ['"column"', '"row"'],
    status: 'optional',
  },
  labelDirection: RadioGroupProperties.labelDirection,
  labelSrOnly: RadioGroupProperties.labelSrOnly,
  vertical: {
    doc: 'Places both the label and the chips vertically.',
    type: 'boolean',
    status: 'optional',
  },
  status: RadioGroupProperties.status,
  statusState: RadioGroupProperties.statusState,
  statusProps: RadioGroupProperties.statusProps,
  globalStatus: RadioGroupProperties.globalStatus,
  '[Space](/web/layout-and-typography/layout/space/properties)':
    ChipProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}

export const ChipGroupEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called once when the user changes the selection. Returns `{ value, values, checked, event }`. `value` identifies the changed chip; `values` contains all selected values. In single selection mode, `checked` is always true.',
    type: '({ value: string; values: string[]; checked: boolean; event: React.SyntheticEvent<HTMLInputElement> }) => void',
    status: 'optional',
  },
}
