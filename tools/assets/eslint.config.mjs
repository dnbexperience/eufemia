import parentConfig from 'dnb-design-system-portal/eslint.config.mjs'

export default parentConfig.map((config) =>
  config.ignores
    ? {
        ...config,
        ignores: config.ignores.filter(
          (pattern) => pattern !== '**/assets/**'
        ),
      }
    : config
)
