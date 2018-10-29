module.exports = {
  groupImports: true,
  sortImports: true,
  danglingCommas: false,
  stripFileExtensions: ['.jsx', '.js'],
  environments: ['jest', 'node'],
  excludes: ['/src/**/?(*.)(spec|test).{js,jsx}']
  // continue with the rest of your settings...
}
