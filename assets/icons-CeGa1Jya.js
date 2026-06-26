import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Icons Library`}),`
`,(0,r.jsxs)(t.p,{children:[`Icons are getting added (more or less) automatically by extracting them from `,(0,r.jsx)(t.a,{href:`https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9`,children:`Figma Icons Library`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`What is the icons flow?`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`Icons are fetched as SVG files from an API.`}),`
`,(0,r.jsxs)(t.li,{children:[`The information about the new icons are stored in two data files:`,`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`icons-svg.lock`}),` contains API information, so we are able to compare it next time the API is called.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`icons-meta.json`}),` contains additional information such as the category it belongs to.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`They are then optimized with SVGO and stored in `,(0,r.jsx)(t.code,{children:`/assets/icons/`}),`. Each size in a different SVG.`]}),`
`,(0,r.jsxs)(t.li,{children:[`During build (`,(0,r.jsx)(t.code,{children:`yarn build`}),`) the SVG files get converted to JSX based React components and stored in `,(0,r.jsx)(t.code,{children:`/src/icons`}),`. Also several index files and fallbacks are automatically generated.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to sync new icons?`}),`
`,(0,r.jsxs)(t.p,{children:[`To fetch new icons from the `,(0,r.jsx)(t.a,{href:`https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9`,children:`Figma Icons Library`}),` file, you have to:`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Re-branch `,(0,r.jsx)(t.code,{children:`main`}),`, and name it `,(0,r.jsx)(t.code,{children:`icons/{your-branch-name}`}),` (it needs to include `,(0,r.jsx)(t.code,{children:`icons/`}),` in the name):`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git pull origin main
`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git checkout -b icons/{your-branch-name} && git push -u origin
`})}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsx)(t.p,{children:`After the CI/CD process has finished it should have made a commit back to the branch including the new optimized icons.`}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Pull the changes down locally, and run visual tests to `,(0,r.jsx)(t.a,{href:`/contribute/getting-started#running-tests-locally`,children:`update the snapshots`}),`. Ideally, all of that should be handled during the CI/CD process.`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Make a PR back to `,(0,r.jsx)(t.code,{children:`main`}),`, review, and (squash) merge it.`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The PR or commit needs an `,(0,r.jsx)(t.a,{href:`/contribute/style-guides/git`,children:`appropriate title`}),` e.g. `,(0,r.jsx)(t.code,{children:`feat(Icons): add [icon names]`}),` or `,(0,r.jsx)(t.code,{children:`fix(Icon): fix cropped [icon name]`}),`. You can either give the commit a good title during the squash merge of the PR or you may pull and rebase interactive `,(0,r.jsx)(t.code,{children:`git pull && git rebase -i`}),` or amend.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to fix icons?`}),`
`,(0,r.jsxs)(t.p,{children:[`If you need to re-fetch one or several icons that got updated or changed in the `,(0,r.jsx)(t.a,{href:`https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9`,children:`Figma Icons Library`}),` you can force the icons to get re-processed before the cache timeout of 30 days:`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find the icon in the `,(0,r.jsx)(t.code,{children:`icons-svg.lock`}),` file and change the `,(0,r.jsx)(t.code,{children:`updated`}),` field to `,(0,r.jsx)(t.code,{children:`0`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Commit the change – but ensure the git branch name starts with `,(0,r.jsx)(t.code,{children:`icon/`}),` (more details above).`]}),`
`,(0,r.jsxs)(t.li,{children:[`You may consider to run `,(0,r.jsx)(t.code,{children:`yarn workspace @dnb/eufemia figma:reset`}),` – it will delete everything and refetch the icons.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to convert icons only?`}),`
`,(0,r.jsxs)(t.p,{children:[`During development of the conversion script `,(0,r.jsx)(t.code,{children:`convertSvgToJsx`}),` you may consider to run `,(0,r.jsx)(t.code,{children:`yarn workspace @dnb/eufemia icons:dev`}),`. It's the same process, when calling `,(0,r.jsx)(t.code,{children:`yarn build`}),`. It will convert SVGs to JSXs and create all the needed index files in watch mode.`]}),`
`,(0,r.jsx)(t.h2,{children:`Icons CI/CD process description`}),`
`,(0,r.jsx)(t.p,{children:`This is a description of what happens during adding new icons to the icons library.`}),`
`,(0,r.jsx)(t.p,{children:`Icons are getting added (more or less) automatically by extracting them from Figma. Following is how the process is tied together.`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`The connection happens on CI.`}),`
`,(0,r.jsx)(t.li,{children:`Checks if a new Figma Icons library version is available.`}),`
`,(0,r.jsx)(t.li,{children:`Download the Figma file (JSON) by a stream basis, and cache that.`}),`
`,(0,r.jsx)(t.li,{children:`Store the new version, in a version file.`}),`
`,(0,r.jsx)(t.li,{children:`Parse the JSON Figma file for valid icon IDs.`}),`
`,(0,r.jsx)(t.li,{children:`Checks if an icon file (SVG) exists in the repo.`}),`
`,(0,r.jsx)(t.li,{children:`If no, download it.`}),`
`,(0,r.jsx)(t.li,{children:`Details about the icon file are getting stored in a "lock" file, so we can compare it next time against.`}),`
`,(0,r.jsx)(t.li,{children:`For XML only: Use Java and vd-tool to convert and pack the XML files to a zip (tgz) and delete the XML files.`}),`
`,(0,r.jsx)(t.li,{children:`For SVG only: store a metadata file, so the portal can display more relevant data about the icons.`}),`
`,(0,r.jsx)(t.li,{children:`For SVG only: optimize the SVG file for a lower size.`}),`
`,(0,r.jsx)(t.li,{children:`For SVG only: Create a JSX component.`}),`
`,(0,r.jsx)(t.li,{children:`For SVG only: run integration and visual tests.`}),`
`,(0,r.jsx)(t.li,{children:`Commit the extracted / generated files back to the repo.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Access denied`}),`
`,(0,r.jsxs)(t.p,{children:[`If you get an access denied request from the Figma API – while streaming down by the GET image endpoint, you may reset the URLs from inside the icons.lock file by running this command: `,(0,r.jsx)(t.code,{children:`yarn figma:reset`}),` and commit the re-generated files. Image URLs expire after 30 days.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};