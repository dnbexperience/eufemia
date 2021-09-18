module.exports = {
  name: 'plugin-ignore-install-options',
  factory: () => {
    if (process.argv.includes('install')) {
      // List all yarn v3 options
      const validOptions = [
        '-h',
        '--help',
        '--json',
        '--immutable',
        '--immutable-cache',
        '--check-cache',
        '--inline-builds',
        '--mode',
      ]

      process.argv = process.argv
        .map((arg, i) => {
          if (i === 0 || i === 1 || validOptions.includes(arg)) {
            return arg
          }

          return null
        })
        .filter(Boolean)
    }

    return {}
  },
}
