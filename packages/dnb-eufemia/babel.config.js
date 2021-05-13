/* stylelint-disable */
/**
 * Main Babel config
 *
 */

const presets =
  process.env.BABEL_ENV === 'es'
    ? ['@babel/preset-react']
    : [
        [
          // Using .browserslistrc for the targets
          '@babel/preset-env',
          {
            modules: ['esm', 'umd'].includes(process.env.BABEL_ENV)
              ? false
              : 'cjs',
          },
        ],
        '@babel/preset-react',
      ]

// also for IE testing with Storybook}
const legacy =
  process.env.BABEL_ENV === 'es'
    ? []
    : [
        [
          presets[0][0], // get preset id
          {
            ...presets[0][1], // get preset options
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
        presets[1],
      ]

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
]

if (typeof process.env.BABEL_ENV !== 'undefined') {
  productionPlugins.push([
    'babel-plugin-search-and-replace',
    {
      rules: [
        {
          search: /\/(.*)\.scss/g,
          replace: '/$1.min.css',
        },
      ],
    },
  ])
}

module.exports = {
  presets,
  plugins: [
    'babel-plugin-optimize-clsx',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-object-assign', // for IE support
  ],
  sourceMaps: true,
  comments: false,
  ignore: ['node_modules/**'],
  env: {
    cjs: {
      presets: legacy,
      plugins: productionPlugins.concat([
        '@babel/plugin-transform-modules-commonjs',
      ]),
    },
    esm: {
      presets: legacy,
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    es: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    umd: {
      presets: legacy,
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    production: {
      presets: legacy,
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    development: { presets: legacy },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '14.10',
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['transform-dynamic-import'],
    },
  },
}
