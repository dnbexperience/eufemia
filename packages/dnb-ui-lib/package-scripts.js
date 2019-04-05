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
    default: 'node index.js',
    serve: 'yarn cdn',
    cdn: 'yarn cdn',
    publish: {
      default: 'yarn prebuild:local',
      local: 'yarn prebuild:local',
      dev: 'yarn dev',
      update: 'yarn prebuild:update',
      release: 'yarn prebuildOnly'
    },
    generate: {
      default: 'yarn build',
      dev: 'yarn dev'
    },
    figma: {
      default: 'yarn figma',
      dev: 'yarn figma:dev'
    },
    sb: 'yarn story',
    test: {
      default: 'yarn test',
      s: {
        default: 'yarn test:screenshots',
        update: 'yarn test:screenshots:update'
      },
      update: 'yarn test:update',
      oneFile: 'yarn test --testPathPattern Icon'
    }
  }
}
