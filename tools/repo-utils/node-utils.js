const isCICheck = () => {
  const ci = String(process.env.CI)
  return ci === 'true' || ci === '1'
}

const splitVitestArgs = (args) => {
  const filters = []
  const vitestArgs = []

  for (const arg of args) {
    if (arg.startsWith('-')) {
      // Normalize bare --update/-u to --update=true so the flag
      // does not consume the next positional file argument.
      if (arg === '--update' || arg === '-u') {
        vitestArgs.push('--update=true')
      } else {
        vitestArgs.push(arg)
      }
    } else {
      filters.push(arg)
    }
  }

  return { filters, vitestArgs }
}

const matchFiltersToFiles = (filters, candidateFiles) => {
  return new Map(
    filters.map((filter) => {
      const lower = filter.toLowerCase()
      return [
        filter,
        candidateFiles.filter((f) => f.toLowerCase().includes(lower)),
      ]
    })
  )
}

const prepareVitestRun = (args, matchingFilesByFilter) => {
  const { filters, vitestArgs } = splitVitestArgs(args)
  const missingFilters = []
  const testFiles = new Set()

  for (const filter of filters) {
    const matchingFiles = matchingFilesByFilter.get(filter) || []

    if (matchingFiles.length === 0) {
      missingFilters.push(filter)
      continue
    }

    for (const file of matchingFiles) {
      testFiles.add(file)
    }
  }

  return {
    filters,
    vitestArgs,
    testFiles: Array.from(testFiles),
    missingFilters,
  }
}

exports.isCI = isCICheck()
exports.isCICheck = isCICheck
exports.matchFiltersToFiles = matchFiltersToFiles
exports.prepareVitestRun = prepareVitestRun
exports.splitVitestArgs = splitVitestArgs
