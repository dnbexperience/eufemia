import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{t as n}from"./Img-BZGL9LKx.js";var r=e();function i(e){let i={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`Git convention`}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsxs)(i.strong,{children:[`Make sure you follow `,(0,r.jsx)(i.a,{href:`https://semver.org`,children:`Semantic Versioning`})]})}),`
`,(0,r.jsxs)(i.p,{children:[`Version numbers are handled automatically by using `,(0,r.jsx)(i.a,{href:`https://github.com/semantic-release/semantic-release#readme`,children:`semantic-release`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`Commit Messages`}),`
`,(0,r.jsxs)(i.p,{children:[`For consistency, please write commit messages in the `,(0,r.jsx)(i.strong,{children:`imperative mood`}),`.`]}),`
`,(0,r.jsx)(i.p,{children:`A clear and concise commit message helps others understand the purpose of the commit and makes it easier to search through the history for specific changes.`}),`
`,(0,r.jsx)(i.h3,{children:`Why the Imperative Mood?`}),`
`,(0,r.jsxs)(i.p,{children:[`The imperative mood matches the implied "command" to the codebase. Think of the message as completing the phrase: `,(0,r.jsx)(i.em,{children:`"This commit will..."`}),`. For example:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`"Fix bug"`}),` (instead of "Fixed bug")`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`"Add feature"`}),` (instead of "Added feature")`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`"Refactor code"`}),` (instead of "Refactored code")`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`This convention helps maintain consistency and clarity across the Eufemia codebase.`}),`
`,(0,r.jsx)(i.h3,{children:`Decorate your commit messages`}),`
`,(0,r.jsxs)(i.p,{children:[`Make sure to `,(0,r.jsx)(i.strong,{children:`decorate`}),` your commit messages with either `,(0,r.jsx)(i.a,{href:`https://www.conventionalcommits.org/en/v1.0.0/#summary`,children:`Conventional Commits`}),` or `,(0,r.jsx)(i.a,{href:`https://github.com/bahmutov/simple-commit-message`,children:`simple-commit-message`}),`:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`fix: fix message`}),` as the subject`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`feat: feature message`}),` as the subject`]}),`
`,(0,r.jsxs)(i.li,{children:[`For a major change: `,(0,r.jsx)(i.code,{children:`feat: message`}),` + `,(0,r.jsx)(i.code,{children:`BREAKING CHANGE:`}),` in the footer of the commit. See example below.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`If you are working on a single component update, you can use a decoration and a scope in parenthesis:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`fix(ExampleComponent): an example fix message`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`feat(ExampleComponent): this is a new feature`})}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`You can also use the following decorators – but keep in mind, they won't be included in the `,(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/releases`,children:`releases change log`}),`:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`chore:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`docs:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`style:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`build:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`ci:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`refactor:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`perf:`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`test:`})}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`Example of a breaking change commit message:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-text`,children:`feat: commit subject with optional decorator

Body with text
Several lines

BREAKING CHANGE:

Subject (will be a list item):

Markdown text over several lines.

Additional text such as:

1. List item
2. List item
`})}),`
`,(0,r.jsxs)(i.p,{children:[`You can find more info in the `,(0,r.jsx)(i.a,{href:`https://github.com/semantic-release/semantic-release#how-does-it-work`,children:`docs of semantic-release`}),` and `,(0,r.jsx)(i.a,{href:`https://www.conventionalcommits.org/`,children:`Conventional Commits`}),`.`]}),`
`,(0,r.jsx)(i.h3,{children:`Ignore CI run`}),`
`,(0,r.jsxs)(i.p,{children:[`You can either include `,(0,r.jsx)(i.code,{children:`[skip ci]`}),` in your `,(0,r.jsx)(i.a,{href:`https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/`,children:`commit message`}),` or let your branch name end with `,(0,r.jsx)(i.code,{children:`--skip-ci`}),`.`]}),`
`,(0,r.jsx)(i.h3,{children:`Rebasing`}),`
`,(0,r.jsx)(i.h4,{children:`Squash commits`}),`
`,(0,r.jsx)(i.p,{children:`If you have to make a small fix after you committed:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`Make and commit the new change`}),`
`,(0,r.jsx)(i.li,{children:`Squash and rebase with the previous commit`}),`
`,(0,r.jsx)(i.li,{children:`Force push to your branch`}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Rebase onto main`}),`
`,(0,r.jsx)(i.p,{children:`If you are working on a branch for a long period, it might be necessary to do a rebase on main once in a while:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`git fetch origin && git rebase origin/main
`})}),`
`,(0,r.jsx)(i.h2,{children:`Pull Requests`}),`
`,(0,r.jsxs)(i.p,{children:[`When you have committed changes to your branch, go to `,(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/pulls`,children:`Github Pull Requests`}),` and open a `,(0,r.jsx)(i.code,{children:`New pull request`}),`.`]}),`
`,(0,r.jsx)(n,{src:`/images/pull-request.png`,width:`900`,alt:`Screenshot of the location of new pull request button on Github`,top:!0,bottom:!0}),`
`,(0,r.jsxs)(i.p,{children:[`You will most likely get the yellow notification bar mentioning that a branch had a recent push. Click on the `,(0,r.jsx)(i.code,{children:`Compare and pull request`}),` button. This will take you to the page for opening a pull request. Fill out the template under the `,(0,r.jsx)(i.code,{children:`Write tab`}),`.`]}),`
`,(0,r.jsx)(n,{src:`/images/pull-request-part-2.png`,width:`900`,alt:`Screenshot of opening a new pull request on Github`,top:!0,bottom:!0}),`
`,(0,r.jsx)(i.p,{children:`Request a reviewer, create the pull request and watch the results of the pipeline checks.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};