import { warn } from '../helpers'

const warned = new Set<string>()

/**
 * Logs a deprecation warning when `innerRef` is used.
 * The warning is only shown once per component name.
 */
export function warnDeprecatedInnerRef(componentName: string) {
  if (!warned.has(componentName)) {
    warned.add(componentName)
    warn(
      `"${componentName}": the "innerRef" prop is deprecated and will be removed in a future major version. Use "ref" instead.`
    )
  }
}
