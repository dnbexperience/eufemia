export const isCI: boolean
export const isCICheck: () => boolean
export type PreparedVitestRun = {
  filters: string[]
  vitestArgs: string[]
  testFiles: string[]
  missingFilters: string[]
}
export const matchFiltersToFiles: (
  filters: string[],
  candidateFiles: readonly string[]
) => Map<string, string[]>
export const splitVitestArgs: (args: string[]) => {
  filters: string[]
  vitestArgs: string[]
}
export const prepareVitestRun: (
  args: string[],
  matchingFilesByFilter: ReadonlyMap<string, readonly string[]>
) => PreparedVitestRun
