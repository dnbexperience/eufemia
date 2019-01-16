/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

module.exports = ({ IE11 = false, ...options } = {}) => {
  return [
    // preset-env processes the most of our old legacy browsers
    require('postcss-preset-env')({
      stage: IE11 ? 0 : 2,
      preserve: true, // so we get the calc from vars, to process for IE11 later with "postcss-calc"
      browsers: ['last 2 versions', IE11 ? 'explorer >= 11' : null].filter(
        i => i
      ),
      // importFrom: ['path/to/file.css'],
      ...options
    }),

    // but for IE11, we also calculate all left over calc, and remove the originals
    IE11
      ? require('postcss-calc')({
          // "preserve: true" will keep both the calculation version, the calc() and the variable (if available)
          // but as we only use postcss-calc on IE11, it is kind of not needed, so we remove then the calc()
          /*
            border-radius: 1.25rem;
            border-radius: calc(2.5rem / 2);
            border-radius: var(--button-border-radius);
           */
          preserve: false,
          warnWhenCannotResolve: false
        })
      : null

    // In case we want to have all the plugins by their self
    // IE11
    //   ? require('postcss-custom-properties')({
    //       preserve: true,
    //       // importFrom: ['path/to/file.css'],
    //       ...options
    //     })
    //   : null,
    // require('autoprefixer')({
    //   browsers: ['last 2 versions', IE11 ? 'explorer >= 11' : null].filter(
    //     i => i
    //   )
    // })
  ].filter(i => i)
}
