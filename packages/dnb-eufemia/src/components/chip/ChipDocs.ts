import type { PropertiesTableProps } from '../../shared/types'
import { CheckboxProperties } from '../checkbox/CheckboxDocs'
import { RadioGroupProperties } from '../radio/RadioDocs'

export const ChipProperties: PropertiesTableProps = {
  text: {
    doc: 'The visible name of the chip. Takes precedence over `children`. Use text and decorative content only.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'The visible name when `text` is not provided.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  variant: {
    doc: 'Choose the appearance. Chip.Group controls single or multiple selection independently of the appearance. Defaults to `default`. Addable chips use native toggle buttons with `aria-pressed`, except in single selection groups, which retain radio inputs. The icon switches between add and remove; the chip stays visible.',
    type: ['"default"', '"addable"', '"radio"', '"checkbox"'],
    status: 'optional',
  },
  size: {
    doc: 'The size of the chip. Inherits from Chip.Group. Defaults to `default`. Small, medium, default, and large have minimum heights of 1.5, 2, 2.5, and 3 rem respectively.',
    type: ['"default"', '"small"', '"medium"', '"large"'],
    status: 'optional',
  },
  suffix: {
    doc: 'Additional guidance or a help button outside the clickable pill. Associated with the control through `aria-describedby`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Optional decorative icon, flag, or logo before the text. Accepts an [Icon](/web/components/icon/) name or React element.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Hides the name visually while keeping it available to screen readers. Icons and selection indicators remain visible. Use a recognizable icon or indicator and provide a tooltip for the hidden name.',
    type: 'boolean',
    status: 'optional',
  },
  tooltip: {
    doc: 'Additional information shown on hover or keyboard focus. Accepts text, React content, or a [Tooltip](/web/components/tooltip/) component for configuration. A tooltip that repeats the chip name is not announced twice.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  checked: {
    doc: 'Whether the chip is selected. Defaults to `false`. User interaction updates the selection, and a changed `checked` property synchronizes it. Inside Chip.Group, use the group `value` or `values` instead.',
    type: 'boolean',
    status: 'optional',
  },
  value: {
    doc: 'The option identifier. Events preserve its string or number type; native form submission uses a string. Defaults to an empty string. Give every option in Chip.Group a unique value, including after conversion to a string.',
    type: ['string', 'number'],
    status: 'optional',
  },
  disabled: {
    doc: 'Prevents interaction, keyboard focus, and form submission.',
    type: 'boolean',
    status: 'optional',
  },
  readOnly: {
    doc: 'Prevents selection changes while keeping the chip focusable and included in form submission when selected. Read-only addable buttons expose `aria-disabled`.',
    type: 'boolean',
    status: 'optional',
  },
  status: CheckboxProperties.status,
  statusState: CheckboxProperties.statusState,
  statusProps: CheckboxProperties.statusProps,
  globalStatus: CheckboxProperties.globalStatus,
  skeleton: CheckboxProperties.skeleton,
  ref: {
    doc: 'The native input or, for addable chips outside single selection groups, the button.',
    type: 'React.Ref<HTMLInputElement | HTMLButtonElement>',
    status: 'optional',
  },
  '[Space](/web/layout-and-typography/layout/space/properties)':
    CheckboxProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}

export const ChipEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called once when the user changes the selection. Returns `{ checked, value, event }`. For single selection, use Chip.Group onChange to receive the selected value.',
    type: '({ checked: boolean; value: string | number; event: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement> }) => void',
    status: 'optional',
  },
}

export const ChipGroupProperties: PropertiesTableProps = {
  label: RadioGroupProperties.label,
  value: {
    doc: 'The selected chip value with `selectionMode="single"` (the default). Must match the value and type of a nested Chip. User interaction updates the selection, and a changed `value` property synchronizes it. Set it to `undefined` to clear the selection.',
    type: ['string', 'number'],
    status: 'optional',
  },
  values: {
    doc: 'The selected values with `selectionMode="multiple"`. User interaction updates the selection, and a new array synchronizes it. Keep the array in state and update it in `onChange`, because an inline array replaces the selection on every render. Use an empty array to clear the selection.',
    type: 'Array<string | number>',
    status: 'optional',
  },
  selectionMode: {
    doc: 'Select one option using `value`, or several options using `values`. Defaults to `single`.',
    type: ['"single"', '"multiple"'],
    status: 'optional',
  },
  variant: {
    doc: 'Shared appearance. Each Chip can override it. Defaults to `default`.',
    type: ChipProperties.variant.type,
    status: 'optional',
  },
  name: {
    doc: 'The shared form field name. Set it when the group is part of a form, so the submitted field has a predictable name. A unique name is generated when omitted.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'Shared size. Each Chip can override it. Defaults to `default`.',
    type: ChipProperties.size.type,
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
    type: '({ value: string | number; values: Array<string | number>; checked: boolean; event: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement> }) => void',
    status: 'optional',
  },
}
