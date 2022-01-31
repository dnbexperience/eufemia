const ciVendors = ['CI', 'GITHUB_ACTIONS', 'CODESANDBOX_SSE']

const isCI = ciVendors.some((name) => {
  return String(process.env[name]) === 'true'
})

exports.isCI = isCI
exports.CIName = isCI ? 'GitHub Actions' : null
