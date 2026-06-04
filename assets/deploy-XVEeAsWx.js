import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Deployment`}),`
`,(0,r.jsxs)(t.p,{children:[`Publishing new versions to the NPM Package (`,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`) is handled by a Deploy Server.`]}),`
`,(0,r.jsx)(t.h2,{children:`Continuous Integration (CI)`}),`
`,(0,r.jsxs)(t.p,{children:[`The Portal (`,(0,r.jsx)(t.code,{children:`dnb-design-system-portal`}),`), all the `,(0,r.jsx)(t.a,{href:`/icons/`,children:`icons`}),` and the NPM Package (`,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`) are built, deployed and released by a Continuous Integration (CI) server.`]}),`
`,(0,r.jsx)(t.h3,{children:`Release GitFlow`}),`
`,(0,r.jsx)(t.p,{children:`The steps, from code changes to production builds, are:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Make a `,(0,r.jsx)(t.em,{children:`Pull Request`}),` to the `,(0,r.jsx)(t.code,{children:`origin/main`}),` branch.`]}),`
`,(0,r.jsx)(t.li,{children:`Check the results of the CI tests and builds.`}),`
`,(0,r.jsxs)(t.li,{children:[`After the `,(0,r.jsx)(t.em,{children:`Pull Request`}),` gets approved by one of the authorized `,(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/graphs/contributors`,children:`maintainers`}),`,`]}),`
`,(0,r.jsxs)(t.li,{children:[`You can merge your `,(0,r.jsx)(t.em,{children:`Pull Request`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`A maintainer will create a `,(0,r.jsx)(t.em,{children:`Pull Request`}),` into one of the release branches (`,(0,r.jsx)(t.code,{children:`next`}),`, `,(0,r.jsx)(t.code,{children:`alpha`}),`, `,(0,r.jsx)(t.code,{children:`beta`}),` or `,(0,r.jsx)(t.code,{children:`release`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`After a release `,(0,r.jsx)(t.em,{children:`Pull Request`}),` got merged, the CI Server will deploy the Portal and release a new version to NPM.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`How to make releases`}),`
`,(0,r.jsxs)(t.p,{children:[`Make sure you only make `,(0,r.jsx)(t.em,{children:`Pull Request`}),` from `,(0,r.jsx)(t.code,{children:`origin/main`}),` into `,(0,r.jsx)(t.code,{children:`origin/release`}),` when you release the latest stable version.
The release branch (`,(0,r.jsx)(t.code,{children:`origin/release`}),`) is more like a `,(0,r.jsx)(t.em,{children:`secondary branch`}),`. It contains the state of the latest version as well as all the git tags – each containing a new version number.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Older major versions are released from maintenance branches named `,(0,r.jsx)(t.code,{children:`<major>.x`}),`, for example `,(0,r.jsx)(t.code,{children:`10.x`}),`.
Both the release workflow and `,(0,r.jsx)(t.code,{children:`semantic-release`}),` are configured to publish maintenance releases from branches matching `,(0,r.jsx)(t.code,{children:`*.x`}),`, not from branches named `,(0,r.jsx)(t.code,{children:`v10`}),`, `,(0,r.jsx)(t.code,{children:`v11`}),`, and so on.`]}),`
`,(0,r.jsx)(t.h4,{children:`How to release an older major version?`}),`
`,(0,r.jsx)(t.p,{children:`Prepare the fix on the maintenance line locally, then push it to the matching maintenance branch on origin.`}),`
`,(0,r.jsx)(t.p,{children:`Example for a v10 patch release:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git fetch origin 10.x`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git switch 10.x`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git push origin 10.x`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`This push triggers the release workflow on `,(0,r.jsx)(t.code,{children:`origin/10.x`}),`, and `,(0,r.jsx)(t.code,{children:`semantic-release`}),` will publish the next version for that major line.`]}),`
`,(0,r.jsxs)(t.p,{children:[`If you want to run a dry release locally for an older major version, do it from a local `,(0,r.jsx)(t.code,{children:`<major>.x`}),` branch that tracks the matching remote branch.`]}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.em,{children:`NB:`}),` All example steps are for `,(0,r.jsx)(t.code,{children:`beta`}),` versions, but will apply for `,(0,r.jsx)(t.code,{children:`next`}),` or `,(0,r.jsx)(t.code,{children:`alpha`}),` versions as well.`]}),`
`,(0,r.jsxs)(t.h4,{children:[`How to release the first `,(0,r.jsx)(t.code,{children:`next`}),`, `,(0,r.jsx)(t.code,{children:`alpha`}),` or `,(0,r.jsx)(t.code,{children:`beta`}),`?`]}),`
`,(0,r.jsx)(t.p,{children:`First, we need to ensure our beta branch contains the latest git tags:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git fetch`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git switch origin/beta`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git reset --hard origin/release`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Now, you may either merge/cherry-pick locally or via a `,(0,r.jsx)(t.em,{children:`Pull Request`}),`:`]}),`
`,(0,r.jsxs)(t.p,{children:[`In order to deal with rebasing and merging of several branches, it may be preferable to do it locally. You need git `,(0,r.jsx)(t.em,{children:`push to remote`}),` access (GitHub).`]}),`
`,(0,r.jsx)(t.p,{children:`We continue locally:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git merge {your-feature-branch}`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git push --force-with-lease`})}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`Our beta version will now get released.`}),`
`,(0,r.jsxs)(t.h4,{children:[`How to release another `,(0,r.jsx)(t.code,{children:`next`}),`, `,(0,r.jsx)(t.code,{children:`alpha`}),` or `,(0,r.jsx)(t.code,{children:`beta`}),` version?`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git switch {your-feature-branch}`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git checkout -b {your-feature-branch}-beta`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git rebase origin/beta`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git switch beta`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git merge {your-feature-branch}-beta`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`git push --force-with-lease`})}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`Our beta version will now get released.`}),`
`,(0,r.jsx)(t.h3,{children:`How to run a dry release locally`}),`
`,(0,r.jsx)(t.p,{children:`If you are unsure about what version will be released, you can run a so called dry-run locally.`}),`
`,(0,r.jsx)(t.p,{children:`Run the steps and prepare the git branches as above, but before you push to origin, you can run:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`yarn publish:dry`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to create a local package`}),`
`,(0,r.jsxs)(t.p,{children:[`Run `,(0,r.jsx)(t.code,{children:`yarn workspace @dnb/eufemia build:pack`}),` and you should get this file: `,(0,r.jsx)(t.code,{children:`/build/dnb-eufemia-v0.0.0-development`}),`.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};