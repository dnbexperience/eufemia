const isCICheck = () => {
  const ci = String(process.env.CI) || String(process.env.CODESANDBOX_SSE)
  return ci === 'true' || ci === '1'
}

export const isCI = isCICheck()
export { isCICheck }
