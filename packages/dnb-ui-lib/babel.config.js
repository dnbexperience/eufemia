/**
 * Main Babel config
 *
 */

// General presets
const presets =
  process.env.BABEL_ENV === 'es'
    ? []
    : [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 2, // also for IE testing with Storybook
            // use .browserslistrc instead
            // targets: {
            //   browsers: 'last 1 versions'
            // },
            modules: ['esm', 'umd'].includes(process.env.BABEL_ENV)
              ? false
              : 'cjs'
          }
        ]
      ]

// Produciton plugins
const plugins = [
  '@babel/plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  [
    'babel-plugin-react-remove-properties',
    {
      properties: ['data-dnb-test', 'data-dnb-test-wrapper']
    }
  ],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap'
    }
  ]
]

if (typeof process.env.BABEL_ENV !== 'undefined') {
  plugins.push([
    'babel-plugin-search-and-replace',
    {
      rules: [
        {
          search: /\/(.*)\.scss/g,
          replace: '/$1.min.css'
        }
      ]
    }
  ])
}

module.exports = {
  presets: presets.concat(['@babel/preset-react']),
  plugins: [
    // 'babel-plugin-optimize-clsx',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-object-assign' // for IE support
  ],
  sourceMaps: true,
  ignore: ['node_modules/**'],
  env: {
    cjs: {
      plugins: plugins.concat(['@babel/plugin-transform-modules-commonjs'])
    },
    esm: {
      plugins: [
        ...plugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    es: {
      plugins: [
        ...plugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    umd: {
      plugins: [
        ...plugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    production: {
      plugins: [
        ...plugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ]
    },
    development: {},
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
      // ignore: ['node_modules/**'],
      plugins: [...plugins, 'transform-dynamic-import']
    }
  }
}
