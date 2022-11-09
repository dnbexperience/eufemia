exports.onCreateBabelConfig = ({ actions, store }, pluginOptions) => {
  actions.setBabelPlugin({
    name: require.resolve('babel-plugin-react-live'),
    options: {
      ...(pluginOptions ? pluginOptions : {}),
    },
  })
}

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object({
    componentName: Joi.string()
      .required()
      .description(
        'Defines on what component the transformation should happen.'
      ),
    filesToMatch: Joi.array()
      .default([])
      .description(
        'Give a filename that should effect the Babel Plugin to process (optional).'
      ),
    prettierPath: Joi.string()
      .default(null)
      .description(
        'The Node.js File Path to a prettier JSON file with the configuration.'
      ),
  })
