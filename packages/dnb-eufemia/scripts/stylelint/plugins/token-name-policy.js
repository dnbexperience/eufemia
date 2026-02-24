const stylelint = require('stylelint')
const fs = require('fs')
const path = require('path')

const DEFAULT_POLICY = {
  // Validates the 1st-segment prefix in declarations and references.
  tokenPrefix: '--token-',

  // Validates the 2nd-segment in --token-<segment>-... to avoid naming drift.
  allowedTokenCategories: ['color'],

  // Validates the 3rd segment in --token-color-<segment>-...
  allowedTokenColorCategories: [
    'background',
    'text',
    'icon',
    'stroke',
    'decorative',
    'component',
  ],

  // Enables 4th-segment checks for --token-color-<category>-<semantic>-...
  categoriesWithSemanticValidation: [
    'background',
    'text',
    'icon',
    'stroke',
  ],

  // Validates 4th-segment values for categories using semantic validation.
  allowedTokenColorSemantics: [
    'action',
    'neutral',
    'destructive',
    'marketing',
    'selected',
    'info',
    'positive',
    'warning',
    'error',
    'page',
  ],

  // Map theme folder names to their required foundation variable prefix.
  themePrefixes: {
    ui: 'dnb',
    sbanken: 'sbanken',
    carnegie: 'carnegie',
  },

  // Prevent temporary in-progress tokens from being committed as stable API.
  disallowedSuffixes: ['-wip'],

  // Token filename used when discovering brands dynamically.
  tokenFileName: 'tokens.scss',

  // Root directory that contains one subfolder per brand theme.
  themesDirRelativePath: 'src/style/themes',

  // Allowed foundation-like prefixes that are intentionally used outside tokens.scss.
  allowedFoundationReferencePrefixes: ['--dnb-payment-', '--dnb-forms-'],
}

const RULE_NAME = 'eufemia/token-name-policy'
const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const THEME_FROM_PATH_REGEX = /\/style\/themes\/([^/]+)\//
const TOKEN_DECLARATION_PATTERN = /(^|\s)(--token-[a-z0-9-]+)\s*:/gim
const FOUNDATION_REFERENCE_REGEX =
  /var\(\s*(--(?:dnb|sbanken|carnegie)-[a-z0-9-]+)\s*\)/gi
const TOKEN_REFERENCE_REGEX = /var\(\s*(--token-[a-z0-9-]+)\s*\)/gi
const GENERIC_VAR_REFERENCE_REGEX = /var\(\s*(--[a-z0-9-]+)\s*\)/gi
const SINGLE_VAR_REFERENCE_REGEX = /var\(\s*(--[a-z0-9-]+)\s*\)/i
const SINGLE_TOKEN_REFERENCE_REGEX = /var\(\s*(--token-[a-z0-9-]+)\s*\)/i
const escapeRegExp = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const createTokenDeclarationPattern = (tokenPrefix) => {
  return new RegExp(
    `(^|\\s)(${escapeRegExp(tokenPrefix)}[a-z0-9-]+)\\s*:`,
    'gim'
  )
}

const createTokenReferenceRegex = (tokenPrefix, flags = 'gi') => {
  return new RegExp(
    `var\\(\\s*(${escapeRegExp(tokenPrefix)}[a-z0-9-]+)\\s*\\)`,
    flags
  )
}

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  disallowedSuffix: (prop, suffix) =>
    `Unexpected token variable "${prop}". Suffix "${suffix}" is not allowed.`,
  wrongPrefix: (prop, expectedPrefix, theme) =>
    `Unexpected token variable "${prop}" in theme "${theme}". Expected prefix "--${expectedPrefix}-".`,
  wrongReferencePrefix: (ref, expectedPrefix, theme) =>
    `Unexpected token reference "${ref}" in theme "${theme}". Expected prefix "--${expectedPrefix}-".`,
  wrongTokenDeclarationPrefix: (prop, tokenPrefix) =>
    `Unexpected token variable "${prop}" in tokens file. Expected prefix "${tokenPrefix}".`,
  wrongTokenCategory: (prop, categories) =>
    `Unexpected token variable "${prop}" in tokens file. Expected "--token-" followed by one of: ${categories.join(
      ', '
    )}.`,
  wrongTokenColorCategory: (prop, categories) =>
    `Unexpected token variable "${prop}" in tokens file. Expected "--token-color-" followed by one of: ${categories.join(
      ', '
    )}.`,
  wrongTokenColorSemantic: (prop, semantics) =>
    `Unexpected token variable "${prop}" in tokens file. Expected the 4th segment to be one of: ${semantics.join(
      ', '
    )}.`,
  forbiddenFoundationReferenceOutsideTokens: (ref) =>
    `Unexpected foundation token reference "${ref}" outside tokens.scss. Foundation variables may only be used in tokens.scss.`,
  unknownTokenReferenceOutsideTokens: (ref) =>
    `Unexpected token reference "${ref}" outside tokens.scss. The token was not found in theme token files.`,
  missingTokenAcrossBrands: (prop, theme) =>
    `Missing token "${prop}" in "${theme}" tokens.scss. All brand tokens.scss files must contain the same tokens.`,
})

const normalizePath = (filePath) => {
  return (filePath || '').replace(/\\/g, '/')
}

const getThemeFromPath = (filePath) => {
  const normalizedPath = normalizePath(filePath)
  const match = normalizedPath.match(THEME_FROM_PATH_REGEX)

  return match?.[1] || null
}

const isFoundationFile = (filePath) => {
  const normalizedPath = normalizePath(filePath)
  return normalizedPath.endsWith('/foundation.scss')
}

const isTokensFile = (filePath) => {
  const normalizedPath = normalizePath(filePath)
  return normalizedPath.endsWith('/tokens.scss')
}

const resolveTokenFilePaths = ({
  projectRoot = PROJECT_ROOT,
  tokenFiles,
} = {}) => {
  if (tokenFiles?.length) {
    return tokenFiles
      .map((filePath) =>
        path.isAbsolute(filePath)
          ? filePath
          : path.resolve(projectRoot, filePath)
      )
      .filter((filePath) => fs.existsSync(filePath))
  }

  const themesDir = path.resolve(
    projectRoot,
    DEFAULT_POLICY.themesDirRelativePath
  )

  if (!fs.existsSync(themesDir)) {
    return []
  }

  return fs
    .readdirSync(themesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) =>
      path.join(themesDir, entry.name, DEFAULT_POLICY.tokenFileName)
    )
    .filter((filePath) => fs.existsSync(filePath))
}

const extractTokenDeclarations = (
  content,
  tokenPrefix = DEFAULT_POLICY.tokenPrefix
) => {
  const declarations = new Set()
  const declarationRegex =
    tokenPrefix === DEFAULT_POLICY.tokenPrefix
      ? new RegExp(TOKEN_DECLARATION_PATTERN)
      : createTokenDeclarationPattern(tokenPrefix)
  let match

  while ((match = declarationRegex.exec(content)) !== null) {
    const variable = match[2]

    if (variable) {
      declarations.add(variable)
    }
  }

  return declarations
}

const loadKnownTokenVariables = ({
  projectRoot = PROJECT_ROOT,
  tokenFiles,
  tokenPrefix = DEFAULT_POLICY.tokenPrefix,
} = {}) => {
  const knownVariables = new Set()
  const resolvedTokenFiles = resolveTokenFilePaths({
    projectRoot,
    tokenFiles,
  })

  for (const absolutePath of resolvedTokenFiles) {
    const fileContent = fs.readFileSync(absolutePath, 'utf-8')

    for (const variable of extractTokenDeclarations(
      fileContent,
      tokenPrefix
    )) {
      knownVariables.add(variable)
    }
  }

  return {
    knownVariables,
    hasTokenFiles: resolvedTokenFiles.length > 0,
  }
}

const loadTokenVariablesByFile = ({
  projectRoot = PROJECT_ROOT,
  tokenFiles,
  tokenPrefix = DEFAULT_POLICY.tokenPrefix,
} = {}) => {
  const variablesByFile = new Map()
  const resolvedTokenFiles = resolveTokenFilePaths({
    projectRoot,
    tokenFiles,
  })

  for (const absolutePath of resolvedTokenFiles) {
    const fileContent = fs.readFileSync(absolutePath, 'utf-8')
    variablesByFile.set(
      absolutePath,
      extractTokenDeclarations(fileContent, tokenPrefix)
    )
  }

  return variablesByFile
}

const ruleFunction = (primary, secondaryOptions = {}) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
        possible: [true],
      }
    )

    if (!validOptions) {
      return
    }

    const disallowedSuffixes =
      secondaryOptions.disallowedSuffixes ||
      DEFAULT_POLICY.disallowedSuffixes
    const tokenPrefix =
      secondaryOptions.tokenPrefix || DEFAULT_POLICY.tokenPrefix
    const allowedTokenCategories =
      secondaryOptions.allowedTokenCategories ||
      DEFAULT_POLICY.allowedTokenCategories
    const allowedTokenColorCategories =
      secondaryOptions.allowedTokenColorCategories ||
      DEFAULT_POLICY.allowedTokenColorCategories
    const categoriesWithSemanticValidation =
      secondaryOptions.categoriesWithSemanticValidation ||
      DEFAULT_POLICY.categoriesWithSemanticValidation
    const allowedTokenColorSemantics =
      secondaryOptions.allowedTokenColorSemantics ||
      DEFAULT_POLICY.allowedTokenColorSemantics
    const allowedFoundationReferencePrefixes =
      secondaryOptions.allowedFoundationReferencePrefixes ||
      DEFAULT_POLICY.allowedFoundationReferencePrefixes
    const themePrefixes = {
      ...DEFAULT_POLICY.themePrefixes,
      ...(secondaryOptions.themePrefixes || {}),
    }
    const { knownVariables, hasTokenFiles } = loadKnownTokenVariables({
      projectRoot: secondaryOptions.projectRoot,
      tokenFiles: secondaryOptions.tokenFiles,
      tokenPrefix,
    })
    const tokenVariablesByFile = loadTokenVariablesByFile({
      projectRoot: secondaryOptions.projectRoot,
      tokenFiles: secondaryOptions.tokenFiles,
      tokenPrefix,
    })

    const filePath = root.source?.input?.file || ''
    const theme = getThemeFromPath(filePath)
    const expectedPrefix = theme ? themePrefixes[theme] : null
    const shouldValidateThemePrefix =
      Boolean(expectedPrefix) && isFoundationFile(filePath)
    const shouldValidateTokenReferences =
      Boolean(expectedPrefix) && isTokensFile(filePath)
    const shouldValidateTokenDeclarationPrefix = isTokensFile(filePath)

    if (shouldValidateTokenDeclarationPrefix) {
      const normalizedFilePath = path.resolve(filePath)
      const hasCurrentTokenFile =
        tokenVariablesByFile.has(normalizedFilePath)

      if (hasCurrentTokenFile) {
        const currentFileVariables =
          tokenVariablesByFile.get(normalizedFilePath) || new Set()
        const allVariables = new Set()

        for (const variables of tokenVariablesByFile.values()) {
          for (const variable of variables) {
            allVariables.add(variable)
          }
        }

        for (const variable of allVariables) {
          if (!currentFileVariables.has(variable)) {
            stylelint.utils.report({
              result,
              RULE_NAME,
              node: root,
              message: messages.missingTokenAcrossBrands(variable, theme),
            })
          }
        }
      }
    }

    root.walkDecls((decl) => {
      if (decl.prop && decl.prop.startsWith('--')) {
        for (const suffix of disallowedSuffixes) {
          if (decl.prop.endsWith(suffix)) {
            stylelint.utils.report({
              result,
              RULE_NAME,
              node: decl,
              message: messages.disallowedSuffix(decl.prop, suffix),
            })
            return
          }
        }

        if (
          shouldValidateTokenDeclarationPrefix &&
          !decl.prop.startsWith(tokenPrefix)
        ) {
          stylelint.utils.report({
            result,
            RULE_NAME,
            node: decl,
            message: messages.wrongTokenDeclarationPrefix(
              decl.prop,
              tokenPrefix
            ),
          })
        }

        if (shouldValidateTokenDeclarationPrefix) {
          const tokenNameParts = decl.prop.split('-').filter(Boolean)
          const tokenCategory = tokenNameParts[1]

          if (!allowedTokenCategories.includes(tokenCategory)) {
            stylelint.utils.report({
              result,
              RULE_NAME,
              node: decl,
              message: messages.wrongTokenCategory(
                decl.prop,
                allowedTokenCategories
              ),
            })
          } else if (tokenCategory === 'color') {
            const tokenColorCategory = tokenNameParts[2]

            if (
              tokenColorCategory &&
              !allowedTokenColorCategories.includes(tokenColorCategory)
            ) {
              stylelint.utils.report({
                result,
                RULE_NAME,
                node: decl,
                message: messages.wrongTokenColorCategory(
                  decl.prop,
                  allowedTokenColorCategories
                ),
              })
            } else if (
              tokenColorCategory &&
              categoriesWithSemanticValidation.includes(tokenColorCategory)
            ) {
              const tokenColorSemantic = tokenNameParts[3]

              if (
                tokenColorSemantic &&
                !allowedTokenColorSemantics.includes(tokenColorSemantic)
              ) {
                stylelint.utils.report({
                  result,
                  RULE_NAME,
                  node: decl,
                  message: messages.wrongTokenColorSemantic(
                    decl.prop,
                    allowedTokenColorSemantics
                  ),
                })
              }
            }
          }
        }
      }

      const hasThemeReferenceValidation =
        shouldValidateThemePrefix || shouldValidateTokenReferences
      const expectedVariablePrefix = hasThemeReferenceValidation
        ? `--${expectedPrefix}-`
        : null

      if (
        shouldValidateThemePrefix &&
        expectedVariablePrefix &&
        !decl.prop.startsWith(expectedVariablePrefix)
      ) {
        stylelint.utils.report({
          result,
          RULE_NAME,
          node: decl,
          message: messages.wrongPrefix(decl.prop, expectedPrefix, theme),
        })
      }

      if (shouldValidateTokenReferences && expectedVariablePrefix) {
        const variableReferenceMatches =
          decl.value?.match(GENERIC_VAR_REFERENCE_REGEX) || []

        for (const match of variableReferenceMatches) {
          const referenceMatch = match.match(SINGLE_VAR_REFERENCE_REGEX)
          const variableReference = referenceMatch?.[1]

          if (
            variableReference &&
            !variableReference.startsWith(expectedVariablePrefix)
          ) {
            stylelint.utils.report({
              result,
              RULE_NAME,
              node: decl,
              message: messages.wrongReferencePrefix(
                variableReference,
                expectedPrefix,
                theme
              ),
            })
          }
        }
      }

      if (!shouldValidateTokenDeclarationPrefix) {
        const forbiddenReferences =
          decl.value?.match(FOUNDATION_REFERENCE_REGEX) || []

        for (const match of forbiddenReferences) {
          const referenceMatch = match.match(SINGLE_VAR_REFERENCE_REGEX)
          const variableReference = referenceMatch?.[1]

          if (
            variableReference &&
            !allowedFoundationReferencePrefixes.some((prefix) =>
              variableReference.startsWith(prefix)
            )
          ) {
            stylelint.utils.report({
              result,
              RULE_NAME,
              node: decl,
              message:
                messages.forbiddenFoundationReferenceOutsideTokens(
                  variableReference
                ),
            })
          }
        }

        if (hasTokenFiles) {
          const tokenReferenceRegex =
            tokenPrefix === DEFAULT_POLICY.tokenPrefix
              ? TOKEN_REFERENCE_REGEX
              : createTokenReferenceRegex(tokenPrefix)
          const singleTokenReferenceRegex =
            tokenPrefix === DEFAULT_POLICY.tokenPrefix
              ? SINGLE_TOKEN_REFERENCE_REGEX
              : createTokenReferenceRegex(tokenPrefix, 'i')
          const tokenReferences =
            decl.value?.match(tokenReferenceRegex) || []

          for (const match of tokenReferences) {
            const referenceMatch = match.match(singleTokenReferenceRegex)
            const variableReference = referenceMatch?.[1]

            if (
              variableReference &&
              !knownVariables.has(variableReference)
            ) {
              stylelint.utils.report({
                result,
                RULE_NAME,
                node: decl,
                message:
                  messages.unknownTokenReferenceOutsideTokens(
                    variableReference
                  ),
              })
            }
          }
        }
      }
    })
  }
}

ruleFunction.RULE_NAME = RULE_NAME
ruleFunction.messages = messages

module.exports = stylelint.createPlugin(RULE_NAME, ruleFunction)
module.exports.RULE_NAME = RULE_NAME
module.exports.messages = messages
