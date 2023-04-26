const ciVendors = ['CI', 'CODESANDBOX_SSE']

const isCI = ciVendors.some((name) => {
  const ci = String(process.env[name])
  return ci === 'true' || ci === '1'
})

exports.isCI = isCI
exports.CIName = isCI ? 'GitHub Actions' : null
