"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[47423],{93160:function(e,n,s){s.r(n);var t=s(52322),a=s(45392);function r(e){const n=Object.assign({h1:"h1",p:"p",code:"code",ul:"ul",li:"li",em:"em",a:"a",h2:"h2",ol:"ol",pre:"pre",strong:"strong"},(0,a.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:"Make and run tests"}),"\n",(0,t.jsxs)(n.p,{children:["Make tests for the new component (or for your current issue) and set up screenshot tests from the Eufemia portal. The tests should be located under ",(0,t.jsx)(n.code,{children:"__tests__"})," in the component folder."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Tip 1: Create tests for each ",(0,t.jsx)(n.em,{children:"prop"})," that change your component."]}),"\n",(0,t.jsx)(n.li,{children:"Tip 2: Always check and make the tests fail when you are writing tests."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["More on testing in the ",(0,t.jsx)(n.a,{href:"/uilib/usage/best-practices/for-testing#testing-frontend-code",children:"UI Library"}),"."]}),"\n",(0,t.jsx)(n.h2,{children:"Running tests locally"}),"\n",(0,t.jsxs)(n.p,{children:["Run the commands from the repository's root folder. Replace ",(0,t.jsx)(n.code,{children:"breadcrumb"})," with your component's name in the commands."]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Run the integration tests:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Run all tests\nyarn test\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Execute the tests on file (git) changes\nyarn test:watch\n\n# Run all tests including the word 'breadcrumb'\nyarn test breadcrumb\n\n# Or be more specific\nyarn test /breadcrumb.test.tsx\n\n# Run several together\nyarn test breadcrumb avatar button\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"2",children:["\n",(0,t.jsx)(n.li,{children:"Update the changed snapshots:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn test:update\n\n# More specific\nyarn test:update breadcrumb avatar\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Jest integration tests uses this naming convention: ",(0,t.jsx)(n.code,{children:"/__tests__/{ComponentName}.test.tsx"})]}),"\n",(0,t.jsxs)(n.ol,{start:"3",children:["\n",(0,t.jsx)(n.li,{children:"Run visual and end-to-end test:"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"NB:"})," Make sure you have the portal running locally on port 8000."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Visual tests:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# 1. First start the portal\nyarn start\n\n# 2. Then run screenshot tests for e.g. 'breadcrumb' or 'avatar'\nyarn test:screenshots breadcrumb avatar\n\n# You can also start it in watch mode\nyarn test:screenshots:watch breadcrumb avatar\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Visual tests uses this naming convention: ",(0,t.jsx)(n.code,{children:"/__tests__/{ComponentName}.e2e.spec.ts"})]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Playwright end-to-end tests:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# 1. First start the portal\nyarn start\n\n# 2. Then run Playwright tests including 'Slider' or 'Button'\nyarn test:e2e /Slider\\|Button/\n\n# You can also start it in watch mode\nyarn test:e2e:watch\n\n# Or run the tests for the portal\nyarn test:e2e:portal\nyarn test:e2e:portal:watch\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Playwright uses this naming convention: ",(0,t.jsx)(n.code,{children:"/__tests__/{ComponentName}.screenshot.test.ts"})]}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsx)(n.li,{children:"Update eventually new or valid visual PNG snapshots:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Update screenshot tests including 'breadcrumb'\nyarn test:screenshots:update breadcrumb\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You can also press the ",(0,t.jsx)(n.code,{children:"u"})," during a watch mode to update outdated snapshots."]}),"\n",(0,t.jsxs)(n.ol,{start:"5",children:["\n",(0,t.jsx)(n.li,{children:"How to deal with failing visual tests?"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"When a visual test fails, a visual comparison file (diff) will be created. Its location and name will be:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"**/__tests__/__image_snapshots__/__diff_output__/*.snap-diff.png"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["you can find a report entry (",(0,t.jsx)(n.code,{children:"index.html"}),"), that lists all of the failed tests here:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"/packages/dnb-eufemia/jest-visual-diff-report/index.html"})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"You may check out the CI/CLI logs for more details."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"GitHub Actions:"}),' If visual screenshot test is failing on the CI, you can navigate to the test "Summary" where you can find "Artifacts". There you can download the ',(0,t.jsx)(n.strong,{children:"visual-test-artifact"})," zip file, containing the visual diff files as well as the report entry inside ",(0,t.jsx)(n.code,{children:"/jest-visual-diff-report"}),"."]}),"\n",(0,t.jsx)(n.h2,{children:"Support SCSS snapshot test"}),"\n",(0,t.jsx)(n.p,{children:"Add a similar code snippet to your tests for watching changes in the SCSS you just created."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { loadScss } from '../../../core/jest/jestSetup'\ndescribe('Button scss', () => {\n  it('has to match style dependencies css', () => {\n    const css = loadScss(require.resolve('../style/deps.scss'))\n    expect(css).toMatchSnapshot()\n  })\n\n  it.each(['ui', 'sbanken'])(\n    'has to match theme css for %s',\n    (themeName) => {\n      const css = loadScss(\n        require.resolve(\n          `../style/themes/dnb-button-theme-${themeName}.scss`,\n        ),\n      )\n      expect(css).toMatchSnapshot()\n    },\n  )\n})\n"})}),"\n",(0,t.jsx)(n.h2,{children:"Support Axe test"}),"\n",(0,t.jsxs)(n.p,{children:["Add a similar code snippet to your tests (as the last test). It will test the accessibility of your new component. Read more on ",(0,t.jsx)(n.a,{href:"https://github.com/nickcolley/jest-axe",children:"Jest Axe"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"describe('Breadcrumb aria', () => {\n  it('should validate', async () => {\n    const Component = render(\n      <Breadcrumb\n        data={[\n          { href: '/' },\n          { href: '/page1', text: 'Page 1' },\n          { href: '/page1/page2', text: 'Page 2' },\n        ]}\n        variant=\"collapse\"\n        isCollapsed={false}\n      />,\n    )\n    expect(await axeComponent(Component)).toHaveNoViolations()\n  })\n})\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(r,e)})):r(e)}}}]);
//# sourceMappingURL=component---src-docs-contribute-getting-started-make-and-run-tests-mdx-934cfdc6c78548acc06d.js.map