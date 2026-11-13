import type { Check, CheckOptions } from './report.ts'

// Records one check per probe: tries three times, then records the last error.
export function createProbe(
  checks: Check[],
  sleep: CheckOptions['sleep'] = (ms) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms))
) {
  return async function probe<T>(
    name: string,
    run: () => Promise<T>,
    url?: string
  ): Promise<T | undefined> {
    let error = ''
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const value = await run()
        checks.push({ name, ok: true, detail: url ?? 'OK' })
        return value
      } catch (caught) {
        error = caught instanceof Error ? caught.message : 'Request failed'
        if (attempt < 2) {
          await sleep(2000 * (attempt + 1))
        }
      }
    }
    checks.push({
      name,
      ok: false,
      detail: url ? `${url}: ${error}` : error,
    })
    return undefined
  }
}
