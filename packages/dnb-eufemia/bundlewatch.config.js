const jsBundles = [
  // NB: Icon entry bundles are thin import/re-export wrappers and are excluded on purpose.

  { path: 'build/umd/dnb-ui-basis.min.js', maxSize: '5kB' },
  { path: 'build/umd/dnb-ui-components.min.js', maxSize: '250kB' },
  { path: 'build/umd/dnb-ui-elements.min.js', maxSize: '75kB' },
  { path: 'build/umd/dnb-ui-extensions.min.js', maxSize: '400kB' },
  { path: 'build/umd/dnb-ui-lib.min.js', maxSize: '250kB' },
  { path: 'build/esm/dnb-ui-basis.min.mjs', maxSize: '5kB' },
  { path: 'build/esm/dnb-ui-components.min.mjs', maxSize: '250kB' },
  { path: 'build/esm/dnb-ui-elements.min.mjs', maxSize: '75kB' },
  { path: 'build/esm/dnb-ui-extensions.min.mjs', maxSize: '400kB' },
  { path: 'build/esm/dnb-ui-lib.min.mjs', maxSize: '250kB' },
]

const cssBundles = [
  { path: 'build/style/dnb-ui-basis.min.css', maxSize: '5kB' },
  { path: 'build/style/dnb-ui-body.min.css', maxSize: '5kB' },
  { path: 'build/style/dnb-ui-components.min.css', maxSize: '50kB' },
  { path: 'build/style/dnb-ui-core.min.css', maxSize: '5kB' },
  { path: 'build/style/dnb-ui-elements.min.css', maxSize: '10kB' },
  { path: 'build/style/dnb-ui-extensions.min.css', maxSize: '10kB' },
  { path: 'build/style/dnb-ui-forms.min.css', maxSize: '10kB' },
  { path: 'build/style/dnb-ui-fragments.min.css', maxSize: '5kB' },

  // Themes
  {
    path: 'build/style/themes/theme-carnegie/carnegie-theme-basis.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-carnegie/carnegie-theme-components.min.css',
    maxSize: '65kB',
  },
  {
    path: 'build/style/themes/theme-carnegie/carnegie-theme-elements.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-carnegie/carnegie-theme-extensions.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-carnegie/carnegie-theme-forms.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-eiendom/eiendom-theme-basis.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-eiendom/eiendom-theme-components.min.css',
    maxSize: '65kB',
  },
  {
    path: 'build/style/themes/theme-eiendom/eiendom-theme-elements.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-eiendom/eiendom-theme-extensions.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-eiendom/eiendom-theme-forms.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-sbanken/sbanken-theme-basis.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-sbanken/sbanken-theme-components.min.css',
    maxSize: '65kB',
  },
  {
    path: 'build/style/themes/theme-sbanken/sbanken-theme-elements.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-sbanken/sbanken-theme-extensions.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-sbanken/sbanken-theme-forms.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-basis.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-components.min.css',
    maxSize: '65kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-elements.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-extensions.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-fonts.min.css',
    maxSize: '5kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-forms.min.css',
    maxSize: '10kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-properties.min.css',
    maxSize: '5kB',
  },
  {
    path: 'build/style/themes/theme-ui/ui-theme-tags.min.css',
    maxSize: '10kB',
  },
]

module.exports = {
  defaultCompression: 'gzip',
  files: [...jsBundles, ...cssBundles],
}
