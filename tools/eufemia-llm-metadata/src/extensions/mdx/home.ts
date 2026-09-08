import type { SpecialMdxComponentRenderer } from './types.ts'

export function createHomeExtension(): SpecialMdxComponentRenderer {
  return {
    name: 'Home',
    replace: async (content) => {
      if (!content.includes('<Home')) {
        return content
      }

      const markdown = [
        '# Welcome to Eufemia',
        '',
        "Eufemia is DNB's design system, providing resources for designers and developers to create consistent and efficient experiences across web and native platforms.",
        '',
        '- [Design](/quickguide-designer) – Figma UI kits and more',
        '- [Develop](/uilib/getting-started) – Get started with installation guides',
        '',
        '## Resources',
        '',
        '- [Images](/uilib/usage/best-practices)',
        '- [Animations](/uilib/components/height-animation)',
        '- [Icons](/icons)',
        '- [Theming](/uilib/usage/customisation/theming)',
        '- [Grid](/uilib/layout/grid)',
        '- [Tokens](/uilib/usage/customisation/theming/design-tokens)',
      ].join('\n')

      return content.replace(/<Home\b[^>]*\/>/g, markdown)
    },
  }
}
