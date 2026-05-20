import type { PropertiesTableProps } from '../../../shared/types'

/**
 * Documentation for the useExternalValue hook parameters.
 *
 * The useExternalValue hook retrieves data from DataContext or direct props,
 * handling the priority between value prop, iterate item data, and context data.
 */
export const useExternalValueParameters: PropertiesTableProps = {
  path: {
    doc: 'JSON Pointer path to retrieve data from DataContext.',
    type: 'string',
    status: 'optional',
  },
  itemPath: {
    doc: 'Path relative to the current Iterate element value.',
    type: 'string',
    status: 'optional',
  },
  value: {
    doc: 'Direct value that takes highest priority, overriding DataContext values.',
    type: '{valueType}',
    status: 'optional',
  },
  transformers: {
    doc: 'Ref containing transformer functions, specifically `fromExternal` for transforming retrieved values.',
    type: 'RefObject<{ fromExternal: (value) => value }>',
    status: 'optional',
  },
  emptyValue: {
    doc: 'Value considered as "empty". Used to determine when to apply transformers.',
    type: '{valueType}',
    status: 'optional',
  },
}

/**
 * Documentation for the useExternalValue hook return value.
 *
 * Returns the resolved and transformed value from the appropriate source.
 */
export const useExternalValueReturns: PropertiesTableProps = {
  value: {
    doc: 'The resolved value, transformed via `fromExternal`. Priority: value prop > itemPath data > path data.',
    type: ['{valueType}', 'undefined'],
    status: 'required',
  },
}
