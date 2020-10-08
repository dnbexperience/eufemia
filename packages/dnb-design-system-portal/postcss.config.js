module.exports = () => ({
  plugins: require.resolve(
    'dnb-ui-lib/scripts/prepub/config/postcssConfig'
  )({
    IE11: true
  })
})
