import { toCamelCase } from './component-helper'

export type PropertiesTableProps = Record<
  string,
  {
    type: string | string[]
    defaultValue?: string
    doc: string
    status: 'optional' | 'internal' | 'required' | 'deprecated'
  }
>

export function transformPropertiesToCamelCase<
  T = Record<string, unknown>,
>(
  obj: T,
  keysToSelect: Array<string> = undefined,
  keysToRemove: Array<string> = undefined
): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const camelCaseKey = toCamelCase(key)
    if (
      keysToSelect?.length
        ? keysToSelect?.includes(camelCaseKey)
        : true && !keysToRemove?.includes(camelCaseKey)
    ) {
      acc[camelCaseKey] = value
    }
    return acc
  }, {} as T)
}
