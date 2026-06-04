import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{t as r}from"./Img-D4NvlEtI.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Git convention`}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsxs)(t.strong,{children:[`Make sure you follow `,(0,i.jsx)(t.a,{href:`https://semver.org`,children:`Semantic Versioning`})]})}),`
`,(0,i.jsxs)(t.p,{children:[`Version numbers are handled automatically by using `,(0,i.jsx)(t.a,{href:`https://github.com/semantic-release/semantic-release#readme`,children:`semantic-release`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Commit Messages`}),`
`,(0,i.jsxs)(t.p,{children:[`For consistency, please write commit messages in the `,(0,i.jsx)(t.strong,{children:`imperative mood`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`A clear and concise commit message helps others understand the purpose of the commit and makes it easier to search through the history for specific changes.`}),`
`,(0,i.jsx)(t.h3,{children:`Why the Imperative Mood?`}),`
`,(0,i.jsxs)(t.p,{children:[`The imperative mood matches the implied "command" to the codebase. Think of the message as completing the phrase: `,(0,i.jsx)(t.em,{children:`"This commit will..."`}),`. For example:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`"Fix bug"`}),` (instead of "Fixed bug")`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`"Add feature"`}),` (instead of "Added feature")`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`"Refactor code"`}),` (instead of "Refactored code")`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`This convention helps maintain consistency and clarity across the Eufemia codebase.`}),`
`,(0,i.jsx)(t.h3,{children:`Decorate your commit messages`}),`
`,(0,i.jsxs)(t.p,{children:[`Make sure to `,(0,i.jsx)(t.strong,{children:`decorate`}),` your commit messages with either `,(0,i.jsx)(t.a,{href:`https://www.conventionalcommits.org/en/v1.0.0/#summary`,children:`Conventional Commits`}),` or `,(0,i.jsx)(t.a,{href:`https://github.com/bahmutov/simple-commit-message`,children:`simple-commit-message`}),`:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`fix: fix message`}),` as the subject`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`feat: feature message`}),` as the subject`]}),`
`,(0,i.jsxs)(t.li,{children:[`For a major change: `,(0,i.jsx)(t.code,{children:`feat: message`}),` + `,(0,i.jsx)(t.code,{children:`BREAKING CHANGE:`}),` in the footer of the commit. See example below.`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`If you are working on a single component update, you can use a decoration and a scope in parenthesis:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`fix(ExampleComponent): an example fix message`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`feat(ExampleComponent): this is a new feature`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the following decorators – but keep in mind, they won't be included in the `,(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/releases`,children:`releases change log`}),`:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`chore:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`design:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`docs:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`style:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`build:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`ci:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`refactor:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`perf:`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`test:`})}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`Example of a breaking change commit message:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-text`,children:`feat: commit subject with optional decorator

Body with text
Several lines

BREAKING CHANGE:

Subject (will be a list item):

Markdown text over several lines.

Additional text such as:

1. List item
2. List item
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can find more info in the `,(0,i.jsx)(t.a,{href:`https://github.com/semantic-release/semantic-release#how-does-it-work`,children:`docs of semantic-release`}),` and `,(0,i.jsx)(t.a,{href:`https://www.conventionalcommits.org/`,children:`Conventional Commits`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Ignore CI run`}),`
`,(0,i.jsxs)(t.p,{children:[`You can either include `,(0,i.jsx)(t.code,{children:`[skip ci]`}),` in your `,(0,i.jsx)(t.a,{href:`https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/`,children:`commit message`}),` or let your branch name end with `,(0,i.jsx)(t.code,{children:`--skip-ci`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Rebasing`}),`
`,(0,i.jsx)(t.h4,{children:`Squash commits`}),`
`,(0,i.jsx)(t.p,{children:`If you have to make a small fix after you committed:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Make and commit the new change`}),`
`,(0,i.jsx)(t.li,{children:`Squash and rebase with the previous commit`}),`
`,(0,i.jsx)(t.li,{children:`Force push to your branch`}),`
`]}),`
`,(0,i.jsx)(t.h4,{children:`Rebase onto main`}),`
`,(0,i.jsx)(t.p,{children:`If you are working on a branch for a long period, it might be necessary to do a rebase on main once in a while:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-bash`,children:`git fetch origin && git rebase origin/main
`})}),`
`,(0,i.jsx)(t.h2,{children:`Pull Requests`}),`
`,(0,i.jsxs)(t.p,{children:[`When you have committed changes to your branch, go to `,(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/pulls`,children:`Github Pull Requests`}),` and open a `,(0,i.jsx)(t.code,{children:`New pull request`}),`.`]}),`
`,(0,i.jsx)(r,{src:`/images/pull-request.png`,width:`900`,alt:`Screenshot of the location of new pull request button on Github`,top:!0,bottom:!0}),`
`,(0,i.jsxs)(t.p,{children:[`You will most likely get the yellow notification bar mentioning that a branch had a recent push. Click on the `,(0,i.jsx)(t.code,{children:`Compare and pull request`}),` button. This will take you to the page for opening a pull request. Fill out the template under the `,(0,i.jsx)(t.code,{children:`Write tab`}),`.`]}),`
`,(0,i.jsx)(r,{src:`/images/pull-request-part-2.png`,width:`900`,alt:`Screenshot of opening a new pull request on Github`,top:!0,bottom:!0}),`
`,(0,i.jsx)(t.p,{children:`Request a reviewer, create the pull request and watch the results of the pipeline checks.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};