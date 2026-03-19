/**
 * Filters out props from a given object/array
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object|array|function of component properties
 * @param remove object|array|function with keys that should be excluded
 * @param allowed object|array|function with keys that should be included
 * @returns filtered properties
 */
export function filterProps<Props = FilterProps>(
  props: Props,
  remove: FilterPropsRemove = null,
  allowed: FilterPropsAllowed = null
) {
  if (Array.isArray(remove)) {
    remove = Object.fromEntries(remove.map((key) => [key, true]))
  }
  if (Array.isArray(allowed)) {
    allowed = Object.fromEntries(allowed.map((key) => [key, true]))
  }

  const isArray = Array.isArray(props)

  return Object.entries(props).reduce(
    (acc, [k, v]) => {
      if (isArray) {
        k = v as string
      }

      if (
        (typeof remove === 'function'
          ? !remove(k)
          : typeof (remove as Record<string, unknown>)?.[k] ===
            'undefined') ||
        (typeof allowed === 'function'
          ? allowed(k)
          : typeof (allowed as Record<string, unknown>)?.[k] !==
            'undefined')
      ) {
        if (isArray) {
          ;(acc as unknown[]).push(v)
        } else {
          ;(acc as Record<string, unknown>)[k] = v
        }
      }

      return acc
    },
    (isArray ? [] : {}) as Props
  ) as Props
}
export type FilterProps = Record<string, unknown> | Array<string | number>
export type FilterPropsValidation =
  | Record<string, unknown>
  | Array<string | number>
  | ((key: string) => boolean)
export type FilterPropsRemove = FilterPropsValidation
export type FilterPropsAllowed = FilterPropsValidation
