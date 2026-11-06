import { collectChangedEntityNames } from '../runScreenshotsConditionally/discovery'
import { isProtectedBranch } from '../vitest/runConditionalUnitTestsLib'

export const LIBRARY = 'packages/dnb-eufemia/'
export const PORTAL = 'packages/dnb-design-system-portal/'
const SMOKE_TESTS = new Set([
  PORTAL + 'src/e2e/pageNavigation.spec.ts',
  PORTAL + 'src/e2e/routeFocus.spec.ts',
  PORTAL + 'src/e2e/react-live-ssr-adapter.spec.ts',
])

export type SourceFile = { path: string; content: string }
export type E2ePlan = {
  mode: 'all' | 'partial' | 'skip'
  reason: string
  tests: string[]
  causes: Record<string, string[]>
}

// Forms are composed across Field, Value and Form, so keep the extension together.
export function getSourceOwner(file: string): string | undefined {
  const match = file.match(
    /^src\/(components|fragments|elements|extensions)\/([^/]+)\//
  )
  return match ? match[1] + '/' + match[2] : undefined
}

function getDocsOwner(file: string): string | undefined {
  return getRouteOwner(
    '/' + file.replace(/^.*\/src\/docs\//, '').replace(/[^/]+$/, '')
  )
}

function getRouteOwner(route: string): string | undefined {
  if (
    /^\/(?:web|uilib)\/(?:forms|extensions\/forms)(?:\/|$)/.test(route)
  ) {
    return 'extensions/forms'
  }
  const match = route.match(
    /^\/(?:web|uilib)\/(components|fragments|elements|extensions|patterns-and-extensions)\/([^/#?.'"\s]+)(?:\/|$)/
  )
  if (!match) {
    const section = route.split('/').filter(Boolean).slice(0, 2).join('/')
    return section ? 'portal/' + section : undefined
  }
  const category =
    match[1] === 'patterns-and-extensions' ? 'extensions' : match[1]
  return category + '/' + match[2]
}

function testOwners(file: SourceFile): Set<string> {
  const owners = new Set<string>()
  const owner = getSourceOwner(file.path.replace(LIBRARY, ''))
  if (owner) {
    owners.add(owner)
  }
  // Read every literal route, including routes used in loops or navigation assertions.
  for (const match of file.content.matchAll(
    /['"](\/(?:web|uilib)\/[^'"\s]*)['"]/g
  )) {
    const routeOwner = getRouteOwner(match[1])
    if (routeOwner) {
      owners.add(routeOwner)
    }
  }
  return owners
}

export function selectE2eTests({
  changedFiles,
  affectedFiles = [],
  tests,
  docs,
  branch,
  forceAll = false,
}: {
  changedFiles: string[]
  affectedFiles?: string[]
  tests: SourceFile[]
  docs: SourceFile[]
  branch?: string
  forceAll?: boolean
}): E2ePlan {
  const all = (reason: string): E2ePlan => ({
    mode: 'all',
    reason,
    tests: tests.map((test) => test.path).sort(),
    causes: {},
  })
  if (forceAll || isProtectedBranch(branch)) {
    return all('Full coverage requested by branch or environment.')
  }
  if (changedFiles.length === 0) {
    return all('No change scope was resolved.')
  }

  const owners = new Set<string>()
  const sourceChanges: string[] = []
  let hasProductChanges = false
  for (const file of changedFiles) {
    if (tests.some((test) => test.path === file)) {
      hasProductChanges = true
      continue
    }
    if (file.endsWith('.snap') || file.includes('/__image_snapshots__/')) {
      continue
    }
    if (file.includes('/__tests__/') && /\.test\.[jt]sx?$/.test(file)) {
      continue
    }
    if (file.startsWith(LIBRARY + 'src/')) {
      const relative = file.slice(LIBRARY.length)
      const owner = getSourceOwner(relative)
      if (!owner) {
        return all('Shared library source changed: ' + file)
      }
      hasProductChanges = true
      sourceChanges.push(relative)
      owners.add(owner)
      continue
    }
    if (file.startsWith(PORTAL + 'src/docs/')) {
      // A page can change generated navigation, headings and route metadata globally.
      return all('Portal documentation changed: ' + file)
    }
    if (file === 'AGENTS.md' || /^\.agents\//.test(file)) {
      continue
    }
    return all('Cross-cutting or unmapped input changed: ' + file)
  }
  if (!hasProductChanges) {
    return {
      mode: 'skip',
      reason: 'Only test expectations or agent guidance changed.',
      tests: [],
      causes: {},
    }
  }

  for (const file of affectedFiles) {
    if (/^src\/(?:core|shared|lib)\//.test(file)) {
      return all(
        'Affected dependency reaches shared library source: ' + file
      )
    }
    const owner = getSourceOwner(file)
    if (owner) {
      owners.add(owner)
    }
  }
  // Composition affects the fixture, not every consumer of its documented owner.
  const names = collectChangedEntityNames([
    ...sourceChanges,
    ...affectedFiles,
  ])
  for (const doc of docs) {
    const usesAffected = Array.from(names).some((name) => {
      const escaped = name.replace(/\./g, '\\.')
      return (
        new RegExp('<' + escaped + '(?:[\\s.>/])').test(doc.content) ||
        new RegExp(
          '^import\\s+[\\w\\s{},.*]*?\\b' +
            escaped +
            '\\b[\\w\\s{},.*]*?\\sfrom\\s',
          'm'
        ).test(doc.content)
      )
    })
    if (!usesAffected) {
      continue
    }
    const owner = getDocsOwner(doc.path)
    if (!owner) {
      return all(
        'Affected component is used by shared Portal content: ' + doc.path
      )
    }
    owners.add(owner)
  }

  const causes: Record<string, string[]> = {}
  for (const test of tests) {
    const scope = testOwners(test)
    const matches = Array.from(scope).filter((owner) => owners.has(owner))
    if (changedFiles.includes(test.path)) {
      causes[test.path] = ['Test changed directly.']
    } else if (
      SMOKE_TESTS.has(test.path) ||
      test.path.startsWith(LIBRARY + 'src/style/') ||
      test.path.startsWith(LIBRARY + 'src/__tests__/') ||
      Array.from(scope).some((owner) => owner.startsWith('portal/')) ||
      /['"]\/(?:web\/|uilib\/)?['"]/.test(test.content) ||
      test.content.includes('`/') ||
      scope.size === 0
    ) {
      // Unscoped tests include Portal bootstrap/navigation, source-driven style
      // matrices and font assets. Keep these until their inputs are mapped.
      causes[test.path] = [
        'Shared browser coverage or inputs without an owner.',
      ]
    } else if (matches.length > 0) {
      causes[test.path] = matches.map(
        (owner) => 'Affected component or fixture: ' + owner
      )
    }
  }
  const selected = Object.keys(causes).sort()
  if (selected.length === tests.length) {
    return all('All browser test files are affected.')
  }
  if (selected.length === 0) {
    return all('Product changes have no mapped browser coverage.')
  }
  return {
    mode: 'partial',
    reason:
      'Selected affected components, fixtures and shared browser coverage.',
    tests: selected,
    causes,
  }
}
