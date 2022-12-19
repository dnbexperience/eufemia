module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        stage:
          process.env.NODE_ENV === 'development'
            ? 'develop'
            : 'build-javascript',
        reactRuntime: 'automatic',
      },
    ],
  ],
}
