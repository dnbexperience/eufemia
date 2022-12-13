/**
 * Main Babel config
 *
 */

const basisPresets = [
  '@babel/preset-react',
  ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
]

const presetsGeneral =
  process.env.BABEL_ENV === 'es'
    ? basisPresets
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

        ...basisPresets,
      ]

// Used for legacy, IE11 builds
const legacyPresets =
  process.env.BABEL_ENV === 'es'
    ? []
    : [
        // Include the rest
        ...presetsGeneral,

        // Manipulate @babel/preset-env
        [
          presetsGeneral[0][0], // get preset id
          {
            ...presetsGeneral[0][1], // get preset options
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ]
        .slice(1) // remove the first "presetsGeneral"
        .reverse()

const testingPresets =
  process.env.BABEL_ENV === 'es'
    ? []
    : [
        // Include the rest
        ...presetsGeneral,

        // Manipulate @babel/preset-env
        [
          presetsGeneral[0][0], // get preset id
          {
            ...presetsGeneral[0][1], // get preset options
            targets: {
              node: 'current',
            },
          },
        ],
      ]
        .slice(1) // remove the first "presetsGeneral"
        .reverse()

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

const config = {
  presets: presetsGeneral,
  plugins: [
    'babel-plugin-optimize-clsx',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
  ],
  sourceMaps: true,
  comments: false,
  ignore: ['node_modules/**'],
  env: {
    cjs: {
      presets: legacyPresets,
      plugins: productionPlugins.concat([
        '@babel/plugin-transform-modules-commonjs',
      ]),
    },
    esm: {
      presets: legacyPresets,
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
      presets: legacyPresets,
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    production: {
      presets: legacyPresets,
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    development: { presets: presetsGeneral },
    test: {
      presets: testingPresets,
    },
  },
}

module.exports = config
