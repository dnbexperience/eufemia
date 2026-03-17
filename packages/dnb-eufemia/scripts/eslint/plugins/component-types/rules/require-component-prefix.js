/**
 * Converts a PascalCase name to kebab-case.
 * E.g. "DatePickerDateType" → "date-picker-date-type"
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Extracts the component directory name from a file path.
 * Looks for the pattern src/components/<name>/ or src/extensions/<name>/
 * and returns the <name> portion (in kebab-case, as-is from the filesystem).
 *
 * For nested paths like src/components/date-picker/hooks/useDates.ts,
 * the component name is "date-picker".
 */
function getComponentDirName(filePath) {
  const match = filePath.match(
    /\/src\/(?:components|extensions|fragments)\/([^/]+)\//
  )
  return match ? match[1] : null
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require exported type/interface names to be prefixed with the component directory name',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowlist: {
            type: 'array',
            items: { type: 'string' },
            description:
              'Type names that are exempt from the prefix requirement',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingPrefix:
        'Exported type "{{name}}" should be prefixed with its component name. Expected prefix "{{prefix}}" (kebab: "{{kebab}}").',
    },
  },

  create(context) {
    const filePath = context.filename || context.getFilename()
    const componentDir = getComponentDirName(filePath)

    if (!componentDir) {
      return {}
    }

    const options = context.options[0] || {}
    const allowlist = new Set(options.allowlist || [])

    function check(node, name) {
      if (!name || allowlist.has(name)) {
        return
      }

      const nameKebab = toKebabCase(name)

      if (!nameKebab.startsWith(componentDir + '-') && nameKebab !== componentDir) {
        context.report({
          node,
          messageId: 'missingPrefix',
          data: {
            name,
            prefix: componentDir,
            kebab: nameKebab,
          },
        })
      }
    }

    return {
      // export type Foo = ...
      ExportNamedDeclaration(node) {
        const decl = node.declaration

        if (!decl) {
          return
        }

        // TSTypeAliasDeclaration: export type Foo = ...
        if (decl.type === 'TSTypeAliasDeclaration' && decl.id) {
          check(decl.id, decl.id.name)
        }

        // TSInterfaceDeclaration: export interface Foo { ... }
        if (decl.type === 'TSInterfaceDeclaration' && decl.id) {
          check(decl.id, decl.id.name)
        }

        // TSEnumDeclaration: export enum Foo { ... }
        if (decl.type === 'TSEnumDeclaration' && decl.id) {
          check(decl.id, decl.id.name)
        }
      },
    }
  },
}
