import fs from 'node:fs'
import type { SpecialMdxComponentRenderer } from './types.ts'

const homeData = JSON.parse(
  fs.readFileSync(
    new URL(
      '../../../../../packages/dnb-design-system-portal/src/shared/home/HomeData.json',
      import.meta.url
    ),
    'utf8'
  )
) as {
  title: string
  introduction: string
  actions: Array<{ title: string; description: string; url: string }>
  resources: Array<{ title: string; url: string }>
}

export function createHomeExtension(): SpecialMdxComponentRenderer {
  return {
    name: 'Home',
    replace: async (content) => {
      if (!content.includes('<Home')) {
        return content
      }

      const markdown = [
        `# ${homeData.title}`,
        '',
        homeData.introduction,
        '',
        ...homeData.actions.map(
          ({ title, description, url }) =>
            `- [${title}](${url}) – ${description}`
        ),
        '',
        '## Resources',
        '',
        ...homeData.resources.map(
          ({ title, url }) => `- [${title}](${url})`
        ),
      ].join('\n')

      return content.replace(/<Home\b[^>]*\/>/g, () => markdown)
    },
  }
}
