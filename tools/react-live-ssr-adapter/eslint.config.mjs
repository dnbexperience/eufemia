// eslint-disable-next-line no-restricted-imports -- Share repository lint rules, not a runtime library import.
import parentConfig from '@dnb/eufemia/eslint.config.mjs'

export default [...parentConfig, { rules: { 'compat/compat': 'off' } }]
