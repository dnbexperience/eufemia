export type SelectionMode = 'skip' | 'partial' | 'all'

export type DepCruiserModule = {
  source: string
  dependents?: string[]
}

export type SelectionResult = {
  mode: SelectionMode
  reason: string
  tests: string[]
}

export type SelectionInput = {
  changedRepoFiles: string[]
  allScreenshotTests: string[]
  dependencyMap: Map<string, string[]>
  scssDependencyMap?: Map<string, string[]>
  compositionImpactedTests?: string[]
  portalDocsImpactedTests?: string[]
  impactedThreshold?: number
}

export type SelectionDetails = {
  changedFiles: string[]
  sourceChanges: string[]
  affectedTsFiles: string[]
  affectedScssFiles: string[]
  impactedTestsByTs: string[]
  impactedTestsByScss: string[]
  impactedTestsByComposition: string[]
  impactedTestsByPortalDocs: string[]
  testCauses: Record<string, string[]>
}

export type SelectionAnalysis = {
  selection: SelectionResult
  details: SelectionDetails
}

export type RunnerContext = {
  packageRoot: string
  packageJson: { scripts: Record<string, string> } | null
  portalDocsRoot: string
}
