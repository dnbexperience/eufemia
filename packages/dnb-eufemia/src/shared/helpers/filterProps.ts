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
    remove = remove.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
  }
  if (Array.isArray(allowed)) {
    allowed = allowed.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
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
          : typeof remove?.[k] === 'undefined') ||
        (typeof allowed === 'function'
          ? allowed(k)
          : typeof allowed?.[k] !== 'undefined')
      ) {
        if (isArray) {
          acc.push(v)
        } else {
          acc[k] = v
        }
      }

      return acc
    },
    (isArray ? [] : {}) as Array<unknown>
  ) as Props
}
export type FilterProps = Record<string, unknown> | Array<string | number>
export type FilterPropsValidationTypes =
  | Record<string, unknown>
  | Array<string | number>
  | ((key: string) => boolean)
export type FilterPropsRemove = FilterPropsValidationTypes
export type FilterPropsAllowed = FilterPropsValidationTypes
