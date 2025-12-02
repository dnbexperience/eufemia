import { PropertiesTableProps } from '../../shared/types'

export const multiInputMaskEvents: PropertiesTableProps = {
  onChange: {
    doc: "Runs when an input value changes. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: "Runs when an input gains focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: "Runs when an input lose focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
}

export const multiInputMaskProperties: PropertiesTableProps = {
  label: {
    doc: '`legend` element describing the group of inputs inside the components.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelDirection: {
    doc: 'Use to change the label layout direction. Defaults to `horizontal`.',
    type: ['horizontal', 'vertical'],
    status: 'optional',
  },
  inputs: {
    doc: "Array of [MultiInputMaskInput](/uilib/components/input-masked/properties/#multiinputmask-inputs-properties) that defines the inputs in the component. The id's defined here is used to map input value to correct property in `values` parameters used in `onChange`.",
    type: 'array',
    status: 'optional',
  },
  values: {
    doc: "Values used for the inputs in the component. Expects an object with keys matching the id's defined in `inputs`.",
    type: 'object',
    status: 'optional',
  },
  delimiter: {
    doc: 'Character that separates the input inputs.',
    type: 'string',
    status: 'optional',
  },
  stretch: {
    doc: 'Use `true` in order to stretch the input to the available space. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  statusState: {
    doc: "Defines the state of the status. It's two statuses [error, info]. Defaults to error.",
    type: ['error', 'info'],
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  overwriteMode: {
    doc: 'Control how Maskito handles overwriting characters; `shift` moves to the next slot while `replace` keeps the caret on the current slot.',
    type: ['string', 'function'],
    status: 'optional',
  },
}

export const multiInputMaskInputsProperties: PropertiesTableProps = {
  id: {
    doc: '(string) Defines input id. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` parameters.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Label used by the input. The label itself is hidden, but required to uphold accessibility standards for screen readers.',
    type: 'string',
    status: 'optional',
  },
  mask: {
    doc: 'Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The array length sets the inputs size/character limit.',
    type: 'array',
    status: 'optional',
  },
  placeholder: {
    doc: 'Sets the placeholder text shown in the input.',
    type: 'string',
    status: 'optional',
  },
}
