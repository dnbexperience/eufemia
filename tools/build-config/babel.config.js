/**
 * Base Babel configuration for DNB Eufemia
 * Can be extended by individual packages
 */

module.exports = (api) => {
  const isTest = api.env('test')
  const isDevelopment = api.env('development')
  
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          targets: {
            browsers: ['defaults'],
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: isDevelopment,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime',
    ],
    env: {
      test: {
        plugins: [
          'babel-plugin-dynamic-import-node',
        ],
      },
    },
  }
}
