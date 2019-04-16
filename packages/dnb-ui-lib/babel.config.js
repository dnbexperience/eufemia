const production = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ],
  ignore: ['node_modules/**', '**/*.test.js'],
  plugins: [
    '@babel/plugin-transform-react-constant-elements',
    'transform-dev-warning',
    [
      'react-remove-properties',
      {
        properties: ['data-dnb-test', 'data-dnb-test-wrapper']
      }
    ],
    [
      'transform-react-remove-prop-types',
      {
        mode: 'wrap'
      }
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ]
}

module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '10.6'
            }
          }
        ],
        '@babel/preset-react'
      ],
      ignore: ['node_modules/**'],
      plugins: [
        'transform-dynamic-import',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties'
      ]
    },
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: 'last 1 versions'
            }
          }
        ],
        '@babel/preset-react'
      ],
      ignore: ['node_modules/**', '**/*.test.js'],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties'
      ]
    },
    production,
    'production-umd': {
      ...production,
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            modules: false
          }
        ],
        '@babel/preset-react'
      ]
    }
  }
}
