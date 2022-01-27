const isCI =
  String(process.env.CI || process.env.GITHUB_ACTIONS) === 'true'

exports.isCI = isCI
exports.CIName = isCI ? 'GitHub Actions' : null
