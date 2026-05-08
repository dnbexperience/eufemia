import fs from 'fs-extra'
import path from 'path'

export function toPascalCase(s: string) {
  return s
    .split(/_/g)
    .reduce(
      (acc, cur) =>
        acc +
        cur.replace(
          /(\w)(\w*)/g,
          (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        ),
      ''
    )
}

export function findPackageRoot(pkgName: string) {
  const root = path.parse(process.cwd()).root
  let current = process.cwd()
  const workspaceName =
    pkgName === '@dnb/eufemia'
      ? 'dnb-eufemia'
      : pkgName.replace(/^@[^/]+\//, '')

  while (true) {
    const workspaceCandidate = path.join(
      current,
      'packages',
      workspaceName,
      'package.json'
    )

    if (fs.existsSync(workspaceCandidate)) {
      return path.dirname(workspaceCandidate)
    }

    const candidate = path.join(
      current,
      'node_modules',
      ...pkgName.split('/'),
      'package.json'
    )

    if (fs.existsSync(candidate)) {
      return path.dirname(candidate)
    }

    if (current === root) {
      break
    }

    current = path.dirname(current)
  }

  return null
}
