const fs = require('node:fs')
const path = require('node:path')

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

// Avoids a launch hang on macOS 27, see microsoft/playwright#42768
const isolateFirefoxAppData = (executablePath) => {
  if (process.platform !== 'darwin' || process.env.XUL_APP_FILE) {
    return
  }

  const resources = path.resolve(executablePath, '../../Resources')
  const appIni = path.join(resources, 'application.ini')
  const browserAppIni = path.join(resources, 'browser', 'application.ini')

  if (!fs.existsSync(appIni)) {
    return
  }

  const content = fs
    .readFileSync(appIni, 'utf-8')
    .replace(/^\[App\]$/m, '[App]\nProfile=PlaywrightFirefox')

  if (
    !fs.existsSync(browserAppIni) ||
    fs.readFileSync(browserAppIni, 'utf-8') !== content
  ) {
    fs.writeFileSync(browserAppIni, content)
  }

  process.env.XUL_APP_FILE = browserAppIni
}

exports.isCI = isCICheck()
exports.isCICheck = isCICheck
exports.isolateFirefoxAppData = isolateFirefoxAppData
exports.matchFiltersToFiles = matchFiltersToFiles
exports.prepareVitestRun = prepareVitestRun
exports.splitVitestArgs = splitVitestArgs
