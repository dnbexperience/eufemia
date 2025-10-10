/**
 * Tailwind CSS Variable Transformation
 *
 * Converts Eufemia CSS variables to Tailwind-compatible format
 */

/**
 * CSS Variables object type
 */
export type CSSVariables = Record<string, string>

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Converts CSS variables from Eufemia format to Tailwind-compatible format
 *
 * @param variables - Object containing CSS variables (key: value pairs)
 * @returns Converted variables in Tailwind-compatible format
 *
 * @example
 * const input = {
 *   '--sb-color-black': '#000',
 *   '--sb-font-size-small': '0.875rem',
 *   '--font-size-large': 'var(--sb-font-size-large)'
 * }
 *
 * const result = convertVariablesToTailwindFormat(input)
 * // Returns:
 * // {
 * //   '--color-sb-black': '#000',
 * //   '--text-sb-small': '0.875rem',
 * //   '--font-size-large': 'var(--text-sb-large)'
 * // }
 */
/**
 * Converts a brand-prefixed variable to Tailwind format
 */
const convertBrandVariable = (key: string, brand: string): string => {
  const brandPrefix = `--${brand}-`
  if (!key.startsWith(brandPrefix)) {
    return key
  }

  // Remove brand prefix to get the namespace
  const withoutBrand = key.replace(brandPrefix, '--')

  // Find matching namespace and convert
  for (const namespace of TAILWIND_NAMESPACES) {
    const namespacePrefix = `--${namespace}-`
    if (withoutBrand.startsWith(namespacePrefix)) {
      // Get the target namespace (may be mapped to a different name)
      const targetNamespace = NAMESPACE_MAPPINGS[namespace] || namespace
      return withoutBrand.replace(
        namespacePrefix,
        `--${targetNamespace}-${brand}-`
      )
    }
  }

  // If no namespace matches, just remove the brand prefix
  return withoutBrand
}

/**
 * Converts var() references to brand-prefixed variables
 */
const convertVarReferences = (value: string, brand: string): string => {
  let convertedValue = value

  // Convert each namespace pattern for brand variables
  for (const namespace of TAILWIND_NAMESPACES) {
    const targetNamespace = NAMESPACE_MAPPINGS[namespace] || namespace
    const pattern = new RegExp(`var\\(--${brand}-${namespace}-`, 'g')
    convertedValue = convertedValue.replace(
      pattern,
      `var(--${targetNamespace}-${brand}-`
    )
  }

  // Handle any remaining brand patterns
  convertedValue = convertedValue.replace(
    new RegExp(`var\\(--${brand}-`, 'g'),
    'var(--'
  )

  return convertedValue
}

/**
 * Converts var() references to base variables (non-brand) - but keeps original names
 */
const convertBaseVarReferences = (value: string): string => {
  // Don't convert base variable references - keep them as original names
  // This is because var() references should point to the actual CSS variables
  // that exist in the base CSS files, not the transformed Tailwind names
  return value
}

export const convertVariablesToTailwindFormat = (
  variables: CSSVariables
): CSSVariables => {
  const convertedVariables: CSSVariables = {}

  Object.entries(variables).forEach(([key, value]) => {
    let convertedKey = key
    let convertedValue = value

    // Check if this variable starts with any supported brand prefix
    for (const brand of SUPPORTED_BRANDS) {
      if (key.startsWith(`--${brand}-`)) {
        convertedKey = convertBrandVariable(key, brand)
        break
      }
    }

    // If no brand prefix was found, check if this is a non-brand variable that needs namespace mapping
    if (convertedKey === key) {
      for (const namespace of TAILWIND_NAMESPACES) {
        const namespacePrefix = `--${namespace}-`
        if (key.startsWith(namespacePrefix)) {
          const targetNamespace =
            NAMESPACE_MAPPINGS[namespace] || namespace
          if (targetNamespace !== namespace) {
            convertedKey = key.replace(
              namespacePrefix,
              `--${targetNamespace}-`
            )
          }
          break
        }
      }
    }

    // Convert var() references for all supported brands
    for (const brand of SUPPORTED_BRANDS) {
      if (value.includes(`var(--${brand}-`)) {
        convertedValue = convertVarReferences(convertedValue, brand)
        break
      }
    }

    // Convert var() references for base variables (non-brand)
    convertedValue = convertBaseVarReferences(convertedValue)

    convertedVariables[convertedKey] = convertedValue
  })

  return convertedVariables
}

/**
 * Supported brand prefixes for CSS variable transformation
 */
export const SUPPORTED_BRANDS: readonly string[] = ['sb'] as const

/**
 * Tailwind CSS theme namespaces that can be transformed
 */
export const TAILWIND_NAMESPACES: readonly string[] = [
  'color',
  'font-family',
  'font-weight',
  'font-size',
  'line-height',
  'spacing',
  'shadow',
  'easing',
  'layout',
] as const

/**
 * Maps Tailwind namespace patterns to their target namespaces
 */
export const NAMESPACE_MAPPINGS: Record<string, string> = {
  'font-family': 'font',
  'font-size': 'text',
  'line-height': 'leading',
  easing: 'ease',
  layout: 'breakpoint',
  // font-weight stays as font-weight
  // color stays as color
  // spacing stays as spacing
  // shadow stays as shadow
}

/**
 * Generates valid Tailwind namespaces for all supported brands
 */
const generateValidNamespaces = (): readonly string[] => {
  const namespaces: string[] = []

  // Add brand-specific namespaces first (more specific)
  for (const brand of SUPPORTED_BRANDS) {
    for (const namespace of TAILWIND_NAMESPACES) {
      const targetNamespace = NAMESPACE_MAPPINGS[namespace] || namespace
      namespaces.push(`--${targetNamespace}-${brand}-`)
    }
  }

  // Add base namespaces (less specific)
  for (const namespace of TAILWIND_NAMESPACES) {
    const targetNamespace = NAMESPACE_MAPPINGS[namespace] || namespace
    namespaces.push(`--${targetNamespace}-`)
  }

  // Add other Tailwind namespaces that don't have brand variants
  const otherNamespaces = [
    '--radius-',
    '--breakpoint-',
    '--container-',
    '--blur-',
    '--perspective-',
    '--aspect-',
    '--animate-',
  ]

  namespaces.push(...otherNamespaces)

  return namespaces
}

/**
 * Valid Tailwind CSS theme namespaces
 */
export const VALID_TAILWIND_NAMESPACES: readonly string[] =
  generateValidNamespaces()

/**
 * Validates that converted variables follow Tailwind naming conventions
 *
 * @param variables - Converted variables to validate
 * @returns Validation result with isValid and errors
 */
export const validateTailwindVariables = (
  variables: CSSVariables
): ValidationResult => {
  const errors: string[] = []

  Object.keys(variables).forEach((key) => {
    // Check for remaining --sb- prefixes
    if (key.startsWith('--sb-')) {
      errors.push(`Variable ${key} still contains --sb- prefix`)
      return // Skip namespace check for --sb- variables
    }

    // Check for invalid Tailwind namespace patterns
    const hasValidNamespace = VALID_TAILWIND_NAMESPACES.some((namespace) =>
      key.startsWith(namespace)
    )

    if (!hasValidNamespace && key.startsWith('--')) {
      errors.push(
        `Variable ${key} doesn't follow Tailwind namespace conventions`
      )
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Checks if a variable key follows Tailwind naming conventions
 *
 * @param key - CSS variable key to check
 * @returns True if the key follows Tailwind conventions
 */
export const isValidTailwindVariable = (key: string): boolean => {
  if (!key.startsWith('--')) {
    return false
  }

  // Check for remaining --sb- prefixes
  if (key.startsWith('--sb-')) {
    return false
  }

  // Check for valid Tailwind namespace
  return VALID_TAILWIND_NAMESPACES.some((namespace) =>
    key.startsWith(namespace)
  )
}

/**
 * Gets the Tailwind namespace for a given variable key
 *
 * @param key - CSS variable key
 * @returns The Tailwind namespace or null if not found
 */
export const getTailwindNamespace = (key: string): string | null => {
  const namespace = VALID_TAILWIND_NAMESPACES.find((ns) =>
    key.startsWith(ns)
  )
  return namespace || null
}
