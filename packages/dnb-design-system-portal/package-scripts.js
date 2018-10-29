/**
 * This is a script runner for more independet scripts
 * witch we dont want to have in the package.json
 * But it requires also that some aditional and
 * not listes packages are globally installed. Like:
 * - yarn
 * - yalc
 * - react-autocomplete-cli
 *
 * With nps You can run commands like this: $ nps b.s # like npx build.serve
 *
 */

module.exports = {
  scripts: {
    start: {
      default: 'rc-autocomplete && yarn start'
    },
    // dev: 'yarn dev',
    build: {
      default: 'yarn build',
      deploy: 'yarn deploy',
      serve: 'yarn serve',
      prod: 'yarn build'
    },
    sb: {
      default: 'yarn story'
    },
    deploy: {
      default: 'yarn deploy',
      fast: 'yarn deploy:fast'
    },
    generate: {
      default: 'yarn make-ui-lib-pages',
      dev: 'yarn make-ui-lib-pages:dev'
    },
    test: {
      default: 'yarn test'
    }
  }
}
