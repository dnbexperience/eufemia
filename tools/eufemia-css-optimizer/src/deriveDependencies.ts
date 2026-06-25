import fs from 'node:fs'
import path from 'node:path'

/**
 * Matches a `dnb-*` class token up to the next non-class character. A token
 * keeps its `--modifier` suffix (so BEM boundaries can be checked) but stops at
 * the `__` element separator, which is enough to resolve the owning block.
 */
const CLASS_TOKEN = /dnb-[a-z0-9-]+/g

export type PrefixIndexEntry = {
  /** The BEM block prefix, e.g. `dnb-form-status`. */
  prefix: string

  /** The component directory name, e.g. `form-status`. */
  name: string
}

/**
 * Build a prefix lookup sorted longest-first so that the most specific block
 * wins (e.g. `dnb-form-status` is matched before `dnb-form`).
 */
export function buildPrefixIndex(
  names: Iterable<string>
): PrefixIndexEntry[] {
  return Array.from(names)
    .map((name) => ({ prefix: `dnb-${name}`, name }))
    .sort((a, b) => b.prefix.length - a.prefix.length)
}

/**
 * Map a single `dnb-*` class token to a component name, respecting BEM
 * boundaries so that `dnb-button` does not match `dnb-button-row`. The token
 * is already truncated at the `__` element separator by `CLASS_TOKEN`, so only
 * the exact block and its `--modifier` form need to be checked.
 */
function matchPrefix(
  token: string,
  index: PrefixIndexEntry[]
): string | null {
  for (const { prefix, name } of index) {
    if (token === prefix || token.startsWith(`${prefix}--`)) {
      return name
    }
  }

  return null
}

export type DeriveOptions = {
  /** Absolute path to the component's `style/` directory. */
  styleDir: string

  /** The component's own directory name. */
  name: string

  /** Prefix lookup for all known components. */
  prefixIndex: PrefixIndexEntry[]
}

/**
 * Derive a component's direct CSS dependencies by scanning the `dnb-*` class
 * selectors in its own `style/*.scss` files (excluding the legacy `deps.scss`)
 * and mapping them to the other components they belong to. This is the set of
 * components whose styles the component's own stylesheet reaches into.
 */
export function deriveDirectDependencies(
  options: DeriveOptions
): string[] {
  const { styleDir, name, prefixIndex } = options
  const deps = new Set<string>()

  if (!fs.existsSync(styleDir)) {
    return []
  }

  for (const file of fs.readdirSync(styleDir)) {
    if (!file.endsWith('.scss') || file === 'deps.scss') {
      continue
    }

    const content = fs.readFileSync(path.join(styleDir, file), 'utf-8')

    for (const match of content.matchAll(CLASS_TOKEN)) {
      const dependency = matchPrefix(match[0], prefixIndex)

      if (dependency && dependency !== name) {
        deps.add(dependency)
      }
    }
  }

  return Array.from(deps).sort()
}
