import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Make and run tests`}),`
`,(0,r.jsxs)(t.p,{children:[`Make tests for the new component (or for your current issue) and set up screenshot tests from the Eufemia portal. The tests should be located under `,(0,r.jsx)(t.code,{children:`__tests__`}),` in the component folder.`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Tip 1: Create tests for each `,(0,r.jsx)(t.em,{children:`prop`}),` that change your component.`]}),`
`,(0,r.jsx)(t.li,{children:`Tip 2: Always check and make the tests fail when you are writing tests.`}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`More on testing in the `,(0,r.jsx)(t.a,{href:`/uilib/usage/best-practices/for-testing#testing-frontend-code`,children:`UI Library`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Running tests locally`}),`
`,(0,r.jsxs)(t.p,{children:[`Run the commands from the repository's root folder. Replace `,(0,r.jsx)(t.code,{children:`breadcrumb`}),` with your component's name in the commands.`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`Run the integration tests:`}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Run all tests
yarn test
`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Execute the tests on file (git) changes
yarn test:watch

# Run all tests including the word 'breadcrumb'
yarn test breadcrumb

# Or be more specific
yarn test /breadcrumb.test.tsx

# Run several together
yarn test breadcrumb avatar button
`})}),`
`,(0,r.jsxs)(t.ol,{start:`2`,children:[`
`,(0,r.jsx)(t.li,{children:`Update the changed snapshots:`}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`yarn test:update

# More specific
yarn test:update breadcrumb avatar
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Integration tests use this naming convention: `,(0,r.jsx)(t.code,{children:`/__tests__/{ComponentName}.test.tsx`})]}),`
`,(0,r.jsxs)(t.p,{children:[`Vitest already loads `,(0,r.jsx)(t.a,{href:`https://github.com/testing-library/jest-dom#with-vitest`,children:`@testing-library/jest-dom`}),` through `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/src/core/vitest/setupVitest.ts`}),`, which imports `,(0,r.jsx)(t.code,{children:`@testing-library/jest-dom/vitest`}),`. DOM matchers such as `,(0,r.jsx)(t.code,{children:`toBeInTheDocument`}),`, `,(0,r.jsx)(t.code,{children:`toBeVisible`}),`, and `,(0,r.jsx)(t.code,{children:`toHaveTextContent`}),` are therefore available in tests without extra per-test setup.`]}),`
`,(0,r.jsxs)(t.ol,{start:`3`,children:[`
`,(0,r.jsx)(t.li,{children:`Run visual and end-to-end tests:`}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`NB:`}),` Make sure you have the portal running locally on port 8000.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Visual tests:`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# 1. First start the portal
yarn start

# 2. Then run screenshot tests for e.g. 'breadcrumb' or 'avatar'
yarn test:screenshots breadcrumb avatar

# You can also start it in watch mode
yarn test:screenshots:watch breadcrumb avatar

# To run against a portal on a different port, set the PORT (or port) env variable
PORT=8001 yarn test:screenshots breadcrumb
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Visual screenshot tests use this naming convention: `,(0,r.jsx)(t.code,{children:`/__tests__/{ComponentName}.screenshot.test.ts`})]}),`
`,(0,r.jsxs)(t.h3,{children:[`Run selected themes only on `,(0,r.jsx)(t.code,{children:`main`})]}),`
`,(0,r.jsx)(t.p,{children:`For screenshot tests, you can mark individual themes as main-only and keep the rest on all branches.`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`import {
  makeScreenshot,
  setupPageScreenshot,
  selectThemes,
  onMain,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(
  selectThemes({
    always: ['ui', 'sbanken'],
    onMain: ['eiendom'],
  })
)('Button for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos/',
  })

  it('matches default state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
  })
})
`})}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`selectThemes({ always, onMain })`}),` only applies branch filtering in CI. In CI, `,(0,r.jsx)(t.code,{children:`onMain`}),` runs on `,(0,r.jsx)(t.code,{children:`main`}),` and branches starting with `,(0,r.jsx)(t.code,{children:`v`}),` followed by a digit, such as `,(0,r.jsx)(t.code,{children:`v11`}),` or `,(0,r.jsx)(t.code,{children:`v11-fix`}),`. Outside CI, the guarded themes still run locally.`]}),`
`,(0,r.jsx)(t.p,{children:`You can also use callback mode for single tests:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`onMain(() =>
  it('matches default state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
  })
)
`})}),`
`,(0,r.jsx)(t.h3,{children:`Conditional screenshot testing`}),`
`,(0,r.jsx)(t.p,{children:`In CI, screenshot tests are selected from changed files instead of always running all screenshot suites.`}),`
`,(0,r.jsx)(t.p,{children:`Selection includes:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Direct screenshot owners of changed files.`}),`
`,(0,r.jsx)(t.li,{children:`Reverse TypeScript/JavaScript dependencies.`}),`
`,(0,r.jsx)(t.li,{children:`Reverse SCSS dependencies.`}),`
`,(0,r.jsx)(t.li,{children:`Demo/example composition usage from Portal docs.`}),`
`,(0,r.jsx)(t.li,{children:`Portal docs/demo path impact (changed docs can trigger only related screenshot tests).`}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Global impact still runs all screenshot tests when shared visual config/style paths are changed (for example `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/package.json`}),`, `,(0,r.jsx)(t.code,{children:`src/style/*`}),` or it runs on the `,(0,r.jsx)(t.code,{children:`main`}),` branch).`]}),`
`,(0,r.jsx)(t.p,{children:`You can run the same logic locally:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`yarn workspace @dnb/eufemia test:screenshots:ci:conditional
yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain
`})}),`
`,(0,r.jsx)(t.p,{children:`You can choose change scope explicitly if needed:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain --branch
yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain --uncommitted
`})}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`auto`}),` behavior:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Local: combines `,(0,r.jsx)(t.code,{children:`uncommitted`}),` + `,(0,r.jsx)(t.code,{children:`branch`}),` files (deduplicated).`]}),`
`,(0,r.jsxs)(t.li,{children:[`CI: uses `,(0,r.jsx)(t.code,{children:`VISUAL_TEST_CHANGED_FILES`}),` provided by GitHub Actions from `,(0,r.jsx)(t.code,{children:`pulls.listFiles`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`CI does not fallback to git history when `,(0,r.jsx)(t.code,{children:`VISUAL_TEST_CHANGED_FILES`}),` is missing.`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`In explain mode, each selected test includes one or more causes:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`TS/JS dependency impact`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`SCSS dependency impact`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`Component usage in demo/examples`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`Portal docs/demo impact`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`By default, CI still stops on the first failure (`,(0,r.jsx)(t.code,{children:`--bail`}),`). You can force a full run without `,(0,r.jsx)(t.code,{children:`--bail`}),` by including `,(0,r.jsx)(t.code,{children:`--run-all`}),` in your commit message.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Default behavior (stops on first failure):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git commit -m "feat: implement new feature"
# Runs: vitest run --config vitest.config.screenshots.ts
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Run all tests (continues on failures):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git commit -m "feat: implement new feature --run-all"
# Runs: vitest run --config vitest.config.screenshots.ts
`})}),`
`,(0,r.jsx)(t.p,{children:`This is useful when you want to see all visual test failures at once, rather than stopping at the first one. The CI/CD pipeline automatically detects this flag and adjusts test behavior accordingly.`}),`
`,(0,r.jsx)(t.h3,{children:`Skip dependency audit in CI`}),`
`,(0,r.jsxs)(t.p,{children:[`You can skip the dependency audit step in the Verify workflow by including `,(0,r.jsx)(t.code,{children:`--skip-audit`}),` in your commit message:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git commit -m "chore: update snapshots --skip-audit"
`})}),`
`,(0,r.jsxs)(t.p,{children:[`The CI will detect `,(0,r.jsx)(t.code,{children:`--skip-audit`}),` and skip the "Audit dependencies" step accordingly.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Playwright end-to-end tests:`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# 1. First start the portal
yarn start

# 2. Then run Playwright tests including 'Slider' or 'Button'
yarn test:e2e /Slider\\|Button/

# You can also start it in watch mode
yarn test:e2e:watch

# Or run the tests for the portal
yarn test:e2e:portal
yarn test:e2e:portal:watch
`})}),`
`,(0,r.jsxs)(t.ol,{start:`4`,children:[`
`,(0,r.jsx)(t.li,{children:`Update any new or changed visual PNG snapshots:`}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Update screenshot tests including 'breadcrumb'
yarn test:screenshots:update breadcrumb
`})}),`
`,(0,r.jsxs)(t.p,{children:[`You can also press the `,(0,r.jsx)(t.code,{children:`u`}),` during a watch mode to update outdated snapshots.`]}),`
`,(0,r.jsxs)(t.p,{children:[`To fully renew snapshots (delete all existing PNGs first, then regenerate from scratch), use `,(0,r.jsx)(t.code,{children:`test:screenshots:renew`}),`. This is useful when snapshots have drifted or you want a clean baseline:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Delete and regenerate all snapshots for 'phone' and 'radio'
yarn test:screenshots:renew phone radio
`})}),`
`,(0,r.jsxs)(t.ol,{start:`5`,children:[`
`,(0,r.jsx)(t.li,{children:`How to deal with failing visual tests?`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`When a visual test fails, a visual comparison file (diff) will be created. Its location and name will be:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`**/__tests__/__image_snapshots__/.diff/*.diff.png`}),` and `,(0,r.jsx)(t.code,{children:`*.actual.png`})]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`you can find a report entry (`,(0,r.jsx)(t.code,{children:`index.html`}),`), that lists all of the failed tests here:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`/packages/dnb-eufemia/visual-diff-report/index.html`})}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`You may check out the CI/CLI logs for more details.`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`GitHub Actions:`}),` If visual screenshot test is failing on the CI, you can navigate to the test "Summary" where you can find "Artifacts". There you can download the `,(0,r.jsx)(t.strong,{children:`visual-test-artifact`}),` zip file, containing the visual diff files as well as the report entry inside `,(0,r.jsx)(t.code,{children:`/visual-diff-report`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Support SCSS snapshot test`}),`
`,(0,r.jsx)(t.p,{children:`Add a similar code snippet to your tests for watching changes in the SCSS you just created.`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import { loadScss } from '../../../core/test-utils/testSetup'
describe('Button scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it.each(['ui', 'sbanken'])(
    'has to match theme css for %s',
    (themeName) => {
      const css = loadScss(
        require.resolve(
          \`../style/themes/dnb-button-theme-\${themeName}.scss\`
        )
      )
      expect(css).toMatchSnapshot()
    }
  )
})
`})}),`
`,(0,r.jsx)(t.h2,{children:`Support Axe test`}),`
`,(0,r.jsxs)(t.p,{children:[`Add a similar code snippet to your tests (as the last test). It will test the accessibility of your new component. Read more on `,(0,r.jsx)(t.a,{href:`https://github.com/nickcolley/jest-axe`,children:`Jest Axe`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`describe('Breadcrumb aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        variant="collapse"
        collapsed={false}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
`})}),`
`,(0,r.jsx)(t.h3,{children:`Bundle size checks`}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia uses `,(0,r.jsx)(t.a,{href:`https://bundlewatch.io/`,children:`BundleWatch`}),` to track selected build artifacts in CI.`]}),`
`,(0,r.jsx)(t.p,{children:`How it works:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The setup lives in `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/bundlewatch.config.js`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`CI runs the check in `,(0,r.jsx)(t.code,{children:`.github/workflows/verify.yml`}),` after `,(0,r.jsx)(t.code,{children:`postbuild:ci`}),`, so it measures the actual emitted build files.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Each watched file has its own `,(0,r.jsx)(t.code,{children:`maxSize`}),`, based on the current gzip-compressed output with some headroom for future changes.`]}),`
`,(0,r.jsx)(t.li,{children:`The check is meant to catch regressions in meaningful emitted bundles, not to report every generated file in the package.`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`What is included:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`UMD and ESM `,(0,r.jsx)(t.code,{children:`dnb-ui-*`}),` bundles, except icon entry bundles.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Core `,(0,r.jsx)(t.code,{children:`dnb-ui-*`}),` CSS bundles.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Non-isolated theme CSS bundles under `,(0,r.jsx)(t.code,{children:`build/style/themes/`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`What is excluded:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`dnb-ui-icons`}),` entry bundles are excluded on purpose because they are thin import/re-export wrappers and do not represent a meaningful payload by themselves.`]}),`
`,(0,r.jsx)(t.li,{children:`Isolated CSS bundles are excluded to keep the reporting focused on the primary outputs.`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`When updating limits:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`If a deliberate change increases a bundle size, update the matching limit in `,(0,r.jsx)(t.code,{children:`bundlewatch.config.js`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Prefer checking the local `,(0,r.jsx)(t.code,{children:`build:size`}),` output before changing limits, so the new threshold is based on the current emitted gzip size.`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`Run the commands locally if needed to emulate the CI checks:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Build the library outputs that BundleWatch measures
yarn workspace @dnb/eufemia build:ci

# Check the watched bundle sizes locally
yarn workspace @dnb/eufemia build:size
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};