import type { SpecialMdxComponentRenderer } from './types.ts'
import { parseSimpleJsxStringAttributes } from './utils.ts'

export function createTokenExampleExtension(): SpecialMdxComponentRenderer {
  return {
    name: 'TokenExample',
    replace: replaceTokenExamples,
  }
}

function replaceTokenExamples(content: string) {
  const regex = /<TokenExample\b([^>]*)\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0

  return content.replace(regex, (_match, attrsSource) => {
    const attrs = parseSimpleJsxStringAttributes(String(attrsSource || ''))
    const name = attrs.name?.trim()

    if (!name) {
      return ''
    }

    return `\`${name}\``
  })
}
