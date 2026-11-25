import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'

export function createChartColorsExtension(
  deps: Pick<SpecialMdxRendererDeps, 'loadModuleDefault'>
): SpecialMdxComponentRenderer {
  return {
    name: 'ChartColors',
    async replace(content) {
      const regex = /<(ChartColors|ChartRoleColors)\s*\/>/g

      if (!regex.test(content)) {
        return content
      }

      const properties = await deps.loadModuleDefault(
        '@dnb/eufemia/src/style/themes/ui/properties'
      )

      if (!properties || typeof properties !== 'object') {
        throw new Error('Unable to load chart color properties')
      }

      const colors = Object.entries(properties).filter(
        (entry): entry is [string, string] => {
          return (
            entry[0].startsWith('--chart-color-') &&
            typeof entry[1] === 'string'
          )
        }
      )

      if (colors.length === 0) {
        throw new Error('No chart color properties found')
      }

      regex.lastIndex = 0
      return content.replace(regex, (_, component: string) => {
        const roleTable = component === 'ChartRoleColors'
        const groups = new Map<string, string[]>()

        for (const [name, value] of colors) {
          const numbered = /-(\d+)$/.test(name)

          if (roleTable ? numbered : !numbered) {
            continue
          }

          const group = name
            .replace('--chart-color-', '')
            .replace(/-(\d+|solid|outline-fill|outline-stroke)$/, '')
          const label = group.charAt(0).toUpperCase() + group.slice(1)
          const rows = groups.get(label) || []
          rows.push(
            `| ${roleTable ? label + ' | ' : ''}\`${name}\` | \`${value.replace(/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3')}\` |`
          )
          groups.set(label, rows)
        }

        if (roleTable) {
          return [
            '\n| Role | CSS custom property | Hex value |',
            '| --- | --- | --- |',
            ...Array.from(groups.values()).flat(),
            '\n',
          ].join('\n')
        }

        return Array.from(groups, ([label, rows]) => {
          return [
            `\n#### ${label}\n`,
            '| CSS custom property | Hex value |',
            '| --- | --- |',
            ...rows,
            '\n',
          ].join('\n')
        }).join('\n')
      })
    },
  }
}
