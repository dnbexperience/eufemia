import type { PropertiesTableProps } from '../../../shared/types'

/**
 * Documentation for the usePath hook parameters.
 *
 * The usePath hook handles path resolution for Fields and Values within
 * nested contexts like Form.Section and Iterate. It resolves relative paths,
 * section paths, and iterate item paths to absolute JSON Pointers.
 */
export const usePathParameters: PropertiesTableProps = {
  id: {
    doc: 'Unique identifier for the field. Auto-generated if not provided.',
    type: 'string',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer path to the data. Supports `//` prefix for root-relative paths and `../` for parent-relative paths.',
    type: 'string',
    status: 'optional',
  },
  itemPath: {
    doc: 'Path relative to the current Iterate element. Automatically combined with the iterate path and index.',
    type: 'string',
    status: 'optional',
  },
  omitSectionPath: {
    doc: 'When `true`, skips prepending the section path. Useful for fields that should reference data outside their section.',
    type: 'boolean',
    status: 'optional',
  },
}

/**
 * Documentation for the usePath hook return values.
 *
 * Returns resolved paths and utility functions for path manipulation.
 */
export const usePathReturns: PropertiesTableProps = {
  identifier: {
    doc: 'Unique identifier for the field. Uses itemPath, path, or auto-generated id.',
    type: 'string',
    status: 'required',
  },
  path: {
    doc: 'The fully resolved absolute JSON Pointer path, including section and iterate context.',
    type: ['string', 'undefined'],
    status: 'optional',
  },
  itemPath: {
    doc: 'The resolved item path when inside an Iterate context.',
    type: ['string', 'undefined'],
    status: 'optional',
  },
  joinPath: {
    doc: 'Utility to join multiple path segments into a single path.',
    type: '(paths: Array<string>) => string',
    status: 'required',
  },
  makePath: {
    doc: 'Resolves a path considering section context and relative path syntax (`//` and `../`).',
    type: '(path: string) => string',
    status: 'required',
  },
  makeIteratePath: {
    doc: 'Creates a full path including iterate context, element index, and item path.',
    type: '(itemPath?: string, iteratePath?: string, options?: { omitSectionPath?: boolean }) => string',
    status: 'required',
  },
  makeSectionPath: {
    doc: 'Prepends the current section path to the given path, handling `//` and `../` syntax.',
    type: '(path: string) => string',
    status: 'required',
  },
  cleanPath: {
    doc: 'Removes duplicate and trailing slashes from a path.',
    type: '(path: string) => string',
    status: 'required',
  },
}
