const isCICheck = () => {
  const ci = String(process.env.CI) || String(process.env.CODESANDBOX_SSE)
  return ci === 'true' || ci === '1'
}

exports.isCI = isCICheck()
exports.isCICheck = isCICheck
