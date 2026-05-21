/**
 * Shared forms exports for ComponentBox code block scope.
 *
 * The exports are dynamically derived from @dnb/eufemia/src/extensions/forms
 * by filtering for capitalized exports (components/namespaces) and excluding
 * types, hooks, and utility functions.
 */

import * as Forms from '@dnb/eufemia/src/extensions/forms'

/**
 * Checks if an export name represents a component/namespace (PascalCase)
 * vs a type, hook, or utility function.
 */
function isComponentExport(name: string): boolean {
  // Must start with uppercase letter (PascalCase for components)
  if (!/^[A-Z]/.test(name)) {
    return false
  }

  // Exclude type-related exports
  if (
    name.endsWith('Props') ||
    name.endsWith('Type') ||
    name.endsWith('Context')
  ) {
    return false
  }

  return true
}

/**
 * Forms namespace exports to be included in code block scope.
 * Dynamically extracted from @dnb/eufemia/src/extensions/forms.
 */
export const formsScope = Object.fromEntries(
  Object.entries(Forms).filter(([name, value]) => {
    // Only include if it's a component export and has a value (not just a type)
    return isComponentExport(name) && value !== undefined
  })
) as Record<string, unknown>
