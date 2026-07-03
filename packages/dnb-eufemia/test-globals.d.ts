/**
 * Ambient declarations for the test-only globals injected by the Eufemia test
 * harness (Vitest / screenshot setup):
 *
 * - `IS_TEST` — set to disable animations and time-based delays during tests.
 * - `readjustTime` / `bypassTime` — control height-animation timing in tests.
 *
 * Production code reads these (e.g. `globalThis.IS_TEST`) as an escape hatch for
 * deterministic test behaviour. They are declared here so that access type-checks
 * under `noImplicitAny` without per-call casts.
 *
 * Kept at the package root on purpose: it is picked up by `tsconfig.json` for
 * type-checking, but excluded from the published type definitions
 * (`tsconfig.definitions.json` only includes `src/**`), so these test globals do
 * not leak into consumers' global types.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    IS_TEST?: boolean
    readjustTime?: number
    bypassTime?: number
  }

  // eslint-disable-next-line no-var
  var IS_TEST: boolean | undefined
  // eslint-disable-next-line no-var
  var readjustTime: number | undefined
  // eslint-disable-next-line no-var
  var bypassTime: number | undefined
}

export {}
