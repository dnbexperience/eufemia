import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Deployment`}),`
`,(0,n.jsxs)(r.p,{children:[`Publishing new versions to the NPM Package (`,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),`) is handled by a Deploy Server.`]}),`
`,(0,n.jsx)(r.h2,{children:`Continuous Integration (CI)`}),`
`,(0,n.jsxs)(r.p,{children:[`The Portal (`,(0,n.jsx)(r.code,{children:`dnb-design-system-portal`}),`), all the `,(0,n.jsx)(r.a,{href:`/icons/`,children:`icons`}),` and the NPM Package (`,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),`) are built, deployed and released by a Continuous Integration (CI) server.`]}),`
`,(0,n.jsx)(r.h3,{children:`Release GitFlow`}),`
`,(0,n.jsx)(r.p,{children:`The steps, from code changes to production builds, are:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Make a `,(0,n.jsx)(r.em,{children:`Pull Request`}),` to the `,(0,n.jsx)(r.code,{children:`origin/main`}),` branch.`]}),`
`,(0,n.jsx)(r.li,{children:`Check the results of the CI tests and builds.`}),`
`,(0,n.jsxs)(r.li,{children:[`After the `,(0,n.jsx)(r.em,{children:`Pull Request`}),` gets approved by one of the authorized `,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/graphs/contributors`,children:`maintainers`}),`,`]}),`
`,(0,n.jsxs)(r.li,{children:[`You can merge your `,(0,n.jsx)(r.em,{children:`Pull Request`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`A maintainer will create a `,(0,n.jsx)(r.em,{children:`Pull Request`}),` into one of the release branches (`,(0,n.jsx)(r.code,{children:`next`}),`, `,(0,n.jsx)(r.code,{children:`alpha`}),`, `,(0,n.jsx)(r.code,{children:`beta`}),` or `,(0,n.jsx)(r.code,{children:`release`}),`).`]}),`
`,(0,n.jsxs)(r.li,{children:[`After a release `,(0,n.jsx)(r.em,{children:`Pull Request`}),` got merged, the CI Server will deploy the Portal and release a new version to NPM.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`How to make releases`}),`
`,(0,n.jsxs)(r.p,{children:[`Make sure you only make `,(0,n.jsx)(r.em,{children:`Pull Request`}),` from `,(0,n.jsx)(r.code,{children:`origin/main`}),` into `,(0,n.jsx)(r.code,{children:`origin/release`}),`.
The release branch (`,(0,n.jsx)(r.code,{children:`origin/release`}),`) is more like a `,(0,n.jsx)(r.em,{children:`secondary branch`}),`. It contains the state of the latest version as well as all the git tags – each containing a new version number.`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.em,{children:`NB:`}),` All example steps are for `,(0,n.jsx)(r.code,{children:`beta`}),` versions, but will apply for `,(0,n.jsx)(r.code,{children:`next`}),` or `,(0,n.jsx)(r.code,{children:`alpha`}),` versions as well.`]}),`
`,(0,n.jsxs)(r.h4,{children:[`How to release the first `,(0,n.jsx)(r.code,{children:`next`}),`, `,(0,n.jsx)(r.code,{children:`alpha`}),` or `,(0,n.jsx)(r.code,{children:`beta`}),`?`]}),`
`,(0,n.jsx)(r.p,{children:`First, we need to ensure our beta branch contains the latest git tags:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git fetch`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git switch origin/beta`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git reset --hard origin/release`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now, you may either merge/cherry-pick locally or via a `,(0,n.jsx)(r.em,{children:`Pull Request`}),`:`]}),`
`,(0,n.jsxs)(r.p,{children:[`In order to deal with rebasing and merging of several branches, it may be preferable to do it locally. You need git `,(0,n.jsx)(r.em,{children:`push to remote`}),` access (GitHub).`]}),`
`,(0,n.jsx)(r.p,{children:`We continue locally:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git merge {your-feature-branch}`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git push --force-with-lease`})}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Our beta version will now get released.`}),`
`,(0,n.jsxs)(r.h4,{children:[`How to release another `,(0,n.jsx)(r.code,{children:`next`}),`, `,(0,n.jsx)(r.code,{children:`alpha`}),` or `,(0,n.jsx)(r.code,{children:`beta`}),` version?`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git switch {your-feature-branch}`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git checkout -b {your-feature-branch}-beta`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git rebase origin/beta`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git switch beta`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git merge {your-feature-branch}-beta`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`git push --force-with-lease`})}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Our beta version will now get released.`}),`
`,(0,n.jsx)(r.h3,{children:`How to run a dry release locally`}),`
`,(0,n.jsx)(r.p,{children:`If you are unsure about what version will be released, you can run a so called dry-run locally.`}),`
`,(0,n.jsx)(r.p,{children:`Run the steps and prepare the git branches as above, but before you push to origin, you can run:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`yarn publish:dry`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`How to create a local package`}),`
`,(0,n.jsxs)(r.p,{children:[`Run `,(0,n.jsx)(r.code,{children:`yarn workspace @dnb/eufemia build:pack`}),` and you should get this file: `,(0,n.jsx)(r.code,{children:`/build/dnb-eufemia-v0.0.0-development`}),`.`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};