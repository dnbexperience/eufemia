import type { PropertiesTableProps } from '../../../shared/types'

/**
 * Documentation for the useValueProps hook parameters.
 *
 * The useValueProps hook handles value display components (Value.*) that
 * show data in read-only format, connecting to DataContext and supporting
 * label/visibility inheritance from associated fields.
 */
export const useValuePropsParameters: PropertiesTableProps = {
  value: {
    doc: 'Direct value to display. Takes precedence over path-based data from DataContext.',
    type: '{valueType}',
    status: 'optional',
  },
  defaultValue: {
    doc: 'Default value when no value is available from DataContext or value prop.',
    type: '{valueType}',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer to the data location in DataContext. Links this Value component to its data source.',
    type: 'string',
    status: 'optional',
  },
  itemPath: {
    doc: 'Path relative to the current Iterate element. Used when inside an Iterate context.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Label to display with the value. Can be inherited from the associated Field component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  inheritLabel: {
    doc: 'When `true`, inherits the label from the Field component at the same path.',
    type: 'boolean',
    status: 'optional',
  },
  inheritVisibility: {
    doc: 'When `true`, inherits visibility state from the Field component at the same path.',
    type: 'boolean',
    status: 'optional',
  },
  transformIn: {
    doc: 'Transforms the external value before processing. Receives the raw data value.',
    type: '(external: Value) => Value',
    status: 'optional',
  },
  toInput: {
    doc: 'Transforms the internal value for display (after transformIn).',
    type: '(value: Value) => Value',
    status: 'optional',
  },
  fromExternal: {
    doc: 'Transforms value when reading from external data sources.',
    type: '(value: Value) => Value',
    status: 'optional',
  },
}

/**
 * Documentation for the useValueProps hook return values.
 *
 * Returns all input props plus computed `value` and `label` ready for display.
 */
export const useValuePropsReturns: PropertiesTableProps = {
  '...props': {
    doc: 'All input props are passed through in the return value.',
    type: 'object',
    status: 'required',
  },
  value: {
    doc: 'The transformed value ready for display, or `undefined` if the associated field is not visible.',
    type: ['{valueType}', 'undefined'],
    status: 'optional',
  },
  label: {
    doc: 'The label to display, either from props or inherited from the associated Field.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
