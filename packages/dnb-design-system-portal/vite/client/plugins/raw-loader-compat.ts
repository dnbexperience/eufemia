import path from 'node:path'
import type { Plugin } from 'vite'

const portalRoot = path.resolve(__dirname, '..', '..', '..')

export function resolveRawLoaderId(source: string): string | null {
  if (!source.startsWith('raw-loader!')) {
    return null
  }

  const raw = source.slice('raw-loader!'.length)

  if (raw.startsWith('dnb-design-system-portal/')) {
    const relative = raw.slice('dnb-design-system-portal/'.length)
    return path.resolve(portalRoot, relative) + '?raw'
  }

  return raw + '?raw'
}

export default function rawLoaderCompatPlugin(): Plugin {
  return {
    name: 'raw-loader-compat',
    enforce: 'pre',

    resolveId(source) {
      return resolveRawLoaderId(source)
    },
  }
}
