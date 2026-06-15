import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v6`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#new-dnb-font`,children:`New DNB font`}),` `,(0,r.jsx)(t.strong,{children:`(major change)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#color-changes`,children:`Color changes`}),` `,(0,r.jsx)(t.strong,{children:`(feature and major change)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#localization`,children:`Localization`}),` `,(0,r.jsx)(t.strong,{children:`(feature)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#other-changes`,children:`Other changes`}),` `,(0,r.jsx)(t.strong,{children:`(major)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#other-features`,children:`Other features`}),` `,(0,r.jsx)(t.strong,{children:`(features)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#resources-package`,children:`Resources package`}),` `,(0,r.jsx)(t.strong,{children:`(feature)`})]}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`How to Install`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsx)(t.p,{children:`v6 contains a couple of breaking changes. As a migration process, you can simply search and replace:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`--color-signal-yellow`}),` or `,(0,r.jsx)(t.code,{children:`--color-signal-yellow-30`}),` and replace it with `,(0,r.jsx)(t.code,{children:`--color-accent-yellow`}),` and `,(0,r.jsx)(t.code,{children:`--color-accent-yellow-30`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`weight-book`}),` replace it with `,(0,r.jsx)(t.code,{children:`weight-regular`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`weight-default`}),` replace it with `,(0,r.jsx)(t.code,{children:`weight-basis`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`dnb-p--medium`}),` replace it with `,(0,r.jsx)(t.code,{children:`dnb-p--bold`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`weight-medium`}),` replace it with `,(0,r.jsx)(t.code,{children:`weight-bold`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`style_type="medium`}),` replace it with `,(0,r.jsx)(t.code,{children:`style_type="bold`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`dnb-p--demi`}),` replace it with `,(0,r.jsx)(t.code,{children:`dnb-p--medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`weight-demi`}),` replace it with `,(0,r.jsx)(t.code,{children:`weight-medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`style_type="demi`}),` replace it with `,(0,r.jsx)(t.code,{children:`style_type="medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`family-book`}),` replace it with `,(0,r.jsx)(t.code,{children:`family-default`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`family-medium`}),` replace it with `,(0,r.jsx)(t.code,{children:`family-default`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`dnb-typo-number`}),` remove it`]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`dnb-typo-std`}),` remove it`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`New DNB font`}),`
`,(0,r.jsxs)(t.p,{children:[`We have now our very own `,(0,r.jsx)(t.em,{children:`DNB font`}),`. As this font behaves very differently than Fedra Sans, the DNB UX has specified how we will use the `,(0,r.jsx)(t.em,{children:`DNB font`}),` on digital medium. Therefore `,(0,r.jsx)(t.code,{children:`font-family`}),`, `,(0,r.jsx)(t.code,{children:`font-size`}),`, `,(0,r.jsx)(t.code,{children:`font-weight`}),` and `,(0,r.jsx)(t.code,{children:`line-height`}),` properties have changed.`]}),`
`,(0,r.jsxs)(t.p,{children:[`In normal circumstances, you have to do `,(0,r.jsx)(t.strong,{children:`nothing`}),` regarding to this change.`]}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsx)(t.h3,{children:`Font's and typography are handled out of the box`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`More info and details in the respective documentation on:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/font-size`,children:`font-size`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/line-height`,children:`line-heigh`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/font-weight`,children:`font-weight`})}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Adjustments`}),`
`,(0,r.jsx)(t.p,{children:`A lot of small layout adjustments are made in v6 to fix alignment regarding new font and positioning styles.`}),`
`,(0,r.jsx)(t.h2,{children:`Color changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.em,{children:`Signal Yellow`}),` got replaced by `,(0,r.jsx)(t.em,{children:`Accent Yellow`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.em,{children:`Signal Yellow 30%`}),` got replaced by `,(0,r.jsx)(t.em,{children:`Accent Yellow 30%`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`You may check your application code and `,(0,r.jsx)(t.strong,{children:`replace`}),` `,(0,r.jsx)(t.code,{children:`signal-yellow`}),` with `,(0,r.jsx)(t.code,{children:`accent-yellow`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`/* New */
color: var(--color-accent-yellow);
color: var(--color-accent-yellow-30);

/* Deprecated */
color: var(--color-signal-yellow);
color: var(--color-signal-yellow-30);
`})}),`
`,(0,r.jsx)(t.h3,{children:`New colors`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`/* New */
color: var(--color-lavender);
color: var(--color-sand-yellow);
color: var(--color-pistachio);
color: var(--color-success-green);
`})}),`
`,(0,r.jsx)(t.h3,{children:`Section`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.a,{href:`/uilib/components/section`,children:`Section`}),` has reflected the color changes:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`style_type="signal-yellow"`}),` is now deprecated.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`style_type="cherry-red"`}),` got removed completely (v5 deprecation).`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`New types`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`style_type="lavender"`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`style_type="sand-yellow"`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`style_type="pistachio"`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`New Icons`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// new primary icons
import {
  reset,
  arrow_top,
  arrow_right,
  arrow_bottom,
  arrow_left,
} from 'dnb-ui-lib/icons/primary'

// new secondary icons
import {
  home,
  login,
  logout,
  settings,
  refresh,
  add_file,
  view_on,
  view_off,
} from 'dnb-ui-lib/icons/secondary'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Localization`}),`
`,(0,r.jsxs)(t.p,{children:[`With v6 the `,(0,r.jsx)(t.code,{children:`dnb-ui-lib`}),` has its own localization to be used both for component translation and your app strings. Read `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/localization`,children:`more about how to use localization`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Other changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`major change`}),` `,(0,r.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` got sizes. The height `,(0,r.jsx)(t.code,{children:`medium`}),` is now `,(0,r.jsx)(t.em,{children:`2.5rem`}),` and `,(0,r.jsx)(t.code,{children:`large`}),` is now `,(0,r.jsx)(t.em,{children:`2.5rem`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Other features`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/form-label`,children:`FormLabel`}),` got a new property `,(0,r.jsx)(t.code,{children:`sr_only`}),`. This way you still can provide a `,(0,r.jsx)(t.strong,{children:`label`}),`, but available only for screen readers.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/elements/blockquote`,children:`Blockquote`}),` is now up to date `,(0,r.jsx)(t.code,{children:`dnb-blockquote--no-background`}),` to display a quote without the contrast background, but rather a transparent.`]}),`
`,(0,r.jsxs)(t.li,{children:[`New helper class: `,(0,r.jsx)(t.code,{children:`dnb-responsive-component`}),` Makes some form components, like `,(0,r.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` react to mobile sized screens. But as this can have negative effects when enabled by default, you can enable this optionally by using this helper class.`]}),`
`,(0,r.jsxs)(t.li,{children:[`New helper class: `,(0,r.jsx)(t.code,{children:`dnb-sr-only--inline`}),` for `,(0,r.jsx)(t.a,{href:`/uilib/helpers`,children:`using in inline text contexts`}),`, to make a better NVDA user experience.`]}),`
`,(0,r.jsxs)(t.li,{children:[`New `,(0,r.jsx)(t.a,{href:`/uilib/components/table`,children:`Table`}),` style / icons on sorting buttons. Icon change: from `,(0,r.jsx)(t.code,{children:`chevron`}),` to `,(0,r.jsx)(t.code,{children:`arrow`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`All form components now have a `,(0,r.jsx)(t.code,{children:`suffix`}),` property e.g. `,(0,r.jsx)(t.a,{href:`/uilib/components/slider`,children:`Slider`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` now supports visual type of info: `,(0,r.jsx)(t.code,{children:`state="info"`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` has now their own icons. You can `,(0,r.jsx)(t.a,{href:`/uilib/components/form-status`,children:`import these icons separately`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Resources package`}),`
`,(0,r.jsxs)(t.p,{children:[`A new package only contains resources needed by the DNB DCE team. This package is provided as a `,(0,r.jsx)(t.code,{children:`tar`}),` file.`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`https://unpkg.com/browse/dnb-ui-lib@6/dist/dnb-ui-resources.tgz`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to v6 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@6
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`January, 30. 2020`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};