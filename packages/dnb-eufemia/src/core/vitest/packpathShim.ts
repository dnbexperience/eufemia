/**
 * Shim for the `packpath` CJS module.
 *
 * packpath.self() uses module.parent.paths which doesn't exist in
 * vitest's ESM environment. This shim returns process.cwd() instead,
 * which is the package root when vitest runs.
 */

export function self() {
  return process.cwd()
}

export function parent() {
  return process.cwd()
}

export default { self, parent }
