import type { PropertiesTableProps } from '../../../shared/types'

export const segmentedFieldProperties: PropertiesTableProps = {
  label: {
    doc: 'Optional `legend` describing the grouped sections.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelDirection: {
    doc: 'Controls the legend layout direction. Defaults to `horizontal`.',
    type: ['"horizontal"', '"vertical"'],
    status: 'optional',
  },
  inputs: {
    doc: 'Array of SegmentedField input definitions. E.g. for a month/year expiry field, you would define two inputs with ids "month" and "year".',
    type: 'array',
    status: 'required',
  },
  values: {
    doc: 'Values for the sections. Expects an object with keys matching the `id` values defined in `inputs`.',
    type: 'object',
    status: 'optional',
  },
  delimiter: {
    doc: 'String rendered between the sections.',
    type: 'string',
    status: 'optional',
  },
  overwriteMode: {
    doc: 'Controls how typed characters overwrite existing content. Defaults to `shift`.',
    type: ['"replace"', '"shift"'],
    status: 'optional',
  },
  status: {
    doc: 'Status message shown below the field. You can also use `true` to show only the state styling.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  statusState: {
    doc: 'Visual status state passed to the wrapped `Input` component.',
    type: ['"error"', '"info"', '"warn"', '"disabled"'],
    status: 'optional',
  },
  stretch: {
    doc: 'Set to `true` to stretch the wrapped `Input` to the available width.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Optional suffix content rendered by the wrapped `Input` component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  scopeRef: {
    doc: 'Custom ref used as the selection and keyboard navigation scope for the grouped sections.',
    type: 'React.RefObject<HTMLElement>',
    status: 'optional',
  },
  optionsEnhancer: {
    doc: 'Receives internal options currently used by the field, such as the resolved `overwriteMode`.',
    type: 'function',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  '[Input](/uilib/components/input/properties)': {
    doc: 'Most `Input` properties are supported, except controlled value/event props that are handled by `SegmentedField` itself.',
    type: 'Various',
    status: 'optional',
  },
}

export const segmentedFieldInputsProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique section id. This id is used as the key in `values`, `onChange`, `onFocus`, and `onBlur` payloads.',
    type: 'string',
    status: 'required',
  },
  label: {
    doc: 'Accessible label announced for the section.',
    type: 'React.ReactNode',
    status: 'required',
  },
  mask: {
    doc: 'Array of `RegExp` rules describing the allowed character per position. The array length defines the section length.',
    type: 'Array<RegExp>',
    status: 'required',
  },
  spinButton: {
    doc: 'Optional spinbutton configuration used for `ArrowUp` and `ArrowDown` stepping.',
    type: 'object',
    status: 'optional',
  },
  placeholder: {
    doc: 'Placeholder shown for the section when it has no typed value.',
    type: 'string',
    status: 'optional',
  },
  '[HTML input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)':
    {
      doc: 'Common input attributes like `autoComplete`, `inputMode`, `disabled`, `lang`, `required`, and `aria-*` are forwarded to each section.',
      type: 'Various',
      status: 'optional',
    },
}

export const segmentedFieldSpinButtonProperties: PropertiesTableProps = {
  min: {
    doc: 'Minimum numeric value for the section.',
    type: 'number',
    status: 'required',
  },
  max: {
    doc: 'Maximum numeric value for the section.',
    type: 'number',
    status: 'required',
  },
  step: {
    doc: 'Increment or decrement step size. Defaults to `1`.',
    type: 'number',
    status: 'optional',
  },
  wrap: {
    doc: 'Whether stepping past `max` or below `min` should wrap around.',
    type: 'boolean',
    status: 'optional',
  },
  getInitialValue: {
    doc: 'Returns the numeric value used when spinbutton stepping starts from an empty section.',
    type: 'function',
    status: 'optional',
  },
  formatValue: {
    doc: 'Formats the numeric value back to a display string after stepping.',
    type: 'function',
    status: 'optional',
  },
  parseValue: {
    doc: 'Parses the current section string into a numeric value before stepping.',
    type: 'function',
    status: 'optional',
  },
}

export const segmentedFieldEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Runs when a section value changes. Returns an object with keys matching the `id` values defined in `inputs`, for example `{ month: string, year: string }`.',
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: 'Runs when focus enters the segmented field group. Returns the current section values object.',
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: 'Runs when focus leaves the segmented field group. Returns the current section values object.',
    type: 'function',
    status: 'optional',
  },
}
