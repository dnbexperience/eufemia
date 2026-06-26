import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{i as r,n as i,r as a}from"./Examples-BBgrc856.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{VisibleWhenVisualTest:s}=t;return s||l(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Typography`}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=530-49`,children:`Figma`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/style`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/typography`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Typography components`}),`
`,(0,o.jsx)(t.p,{children:`The two main components used to set typography are:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`/uilib/elements/span`,children:`Span`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`/uilib/elements/paragraph`,children:`P`})}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`(`,(0,o.jsx)(t.a,{href:`/uilib/elements/lead`,children:`Lead`}),` and `,(0,o.jsx)(t.a,{href:`uilib/elements/ingress`,children:`Ingress`}),` also work in the same way)`]}),`
`,(0,o.jsx)(t.h2,{children:`Typography in general`}),`
`,(0,o.jsxs)(t.p,{children:[`Fonts are handled automatically once the CSS packages `,(0,o.jsx)(t.strong,{children:`dnb-ui-core`}),` or `,(0,o.jsx)(t.strong,{children:`dnb-ui-basis`}),` are loaded.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Every typography HTML element, like headings and paragraphs, has a defined `,(0,o.jsx)(t.code,{children:`height`}),` and `,(0,o.jsx)(t.code,{children:`line-height`}),` so everything falls exactly into the `,(0,o.jsx)(t.strong,{children:`8-pixel grid`}),`.`]}),`
`,(0,o.jsxs)(t.p,{children:[`You don't need to define the `,(0,o.jsx)(t.code,{children:`font-family`}),`, but rather use CSS Custom Properties for `,(0,o.jsx)(t.code,{children:`font-weight`}),`, `,(0,o.jsx)(t.code,{children:`font-size`}),`, and `,(0,o.jsx)(t.code,{children:`line-height`}),`.`]}),`
`,(0,o.jsx)(t.h3,{children:`Typography property tables`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`/uilib/typography/font-weight`,children:`font-weight`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`/uilib/typography/font-size`,children:`font-size`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`/uilib/typography/line-height`,children:`line-height`})}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Typography Examples`}),`
`,(0,o.jsx)(r,{}),`
`,(0,o.jsx)(t.h2,{children:`Line length`}),`
`,(0,o.jsx)(t.p,{children:`For readable paragraphs and inline help text, keep line length constrained to a comfortable character count.`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`Use `,(0,o.jsx)(t.code,{children:`var(--prose-max-width)`}),` as the canonical token for maximum text width. Default is `,(0,o.jsx)(t.code,{children:`60ch`}),`.`]}),`
`,(0,o.jsxs)(t.li,{children:[`Base styles and some components expose `,(0,o.jsx)(t.code,{children:`var(--prose-max-width)`}),`, which maps to `,(0,o.jsx)(t.code,{children:`var(--prose-max-width)`}),`.`]}),`
`]}),`
`,(0,o.jsxs)(t.h3,{children:[`Using the `,(0,o.jsx)(t.code,{children:`proseMaxWidth`}),` property (max width in characters)`]}),`
`,(0,o.jsxs)(t.p,{children:[`Prose refers to written text in its natural form, particularly paragraphs and other continuous writing. Typography components like `,(0,o.jsx)(t.code,{children:`H2`}),`, `,(0,o.jsx)(t.code,{children:`H3`}),`, and `,(0,o.jsx)(t.code,{children:`P`}),` support the `,(0,o.jsx)(t.code,{children:`proseMaxWidth`}),` property to limit text width based on character count:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
`})}),`
`,(0,o.jsxs)(t.h3,{children:[`Using `,(0,o.jsx)(t.code,{children:`Typography.Context`})]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Typography } from '@dnb/eufemia/elements'
`})}),`
`,(0,o.jsxs)(t.h4,{children:[`Setting `,(0,o.jsx)(t.code,{children:`proseMaxWidth`})]}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`Typography.Context`}),` to apply `,(0,o.jsx)(t.code,{children:`proseMaxWidth`}),` to multiple typography components at once:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<Typography.Context proseMaxWidth={60}>
  <P>This paragraph will be limited to approximately 60 characters wide</P>
  <P>
    This paragraph will also be limited to approximately 60 characters wide
  </P>
  <H2 proseMaxWidth={80}>This heading overrides with its own value</H2>
</Typography.Context>
`})}),`
`,(0,o.jsx)(t.p,{children:`CSS example:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`.prose {
  max-width: var(--prose-max-width); /* 60ch by default */
}
`})}),`
`,(0,o.jsxs)(t.h4,{children:[`Setting `,(0,o.jsx)(t.code,{children:`responsive`})]}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`Typography.Context`}),` to make typography components, or all components use responsive font size and line heights.`]}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(t.h2,{children:`Font Face`}),`
`,(0,o.jsxs)(t.p,{children:[`The default DNB font family is `,(0,o.jsx)(t.code,{children:`DNB`}),`, loaded via `,(0,o.jsx)(t.code,{children:`@font-face`}),` in `,(0,o.jsx)(t.code,{children:`@dnb/eufemia/src/style/themes/ui/fonts.scss`}),`.`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`Sbanken uses its own fonts, declared and loaded in `,(0,o.jsx)(t.code,{children:`@dnb/eufemia/src/style/themes/sbanken/fonts.scss`}),` and applied via Sbanken-specific properties.`]}),`
`,(0,o.jsxs)(t.li,{children:[`Carnegie uses the `,(0,o.jsx)(t.code,{children:`ArizonaFlare`}),` font family, declared and loaded in `,(0,o.jsx)(t.code,{children:`@dnb/eufemia/src/style/themes/carnegie/fonts.scss`}),`, and applied through the Carnegie theme’s typography variables.`]}),`
`,(0,o.jsx)(t.li,{children:`Eiendom uses the default DNB font family.`}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Spacing and margin collapsing`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.a,{href:`/uilib/layout/space/properties`,children:`Spacing properties`}),` inside every Eufemia React Element, but keep in mind that `,(0,o.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing`,children:`margin collapsing`}),` can sometimes be a little tricky to get right.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { H1, H2, ... } from '@dnb/eufemia'

<H1 bottom="x-large">Heading with bottom margin: x-large</H1>
<H2 top="x-large">Heading with top margin: x-large</H2>
`})}),`
`,(0,o.jsx)(t.h2,{children:`Anchor`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`.dnb-anchor`}),` -- `,(0,o.jsx)(`a`,{href:`/`,className:`dnb-anchor`,children:`Anchor with default style`})]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`.dnb-anchor--hover`}),` -- `,(0,o.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--hover`,children:`Hover style`})]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`.dnb-anchor--active`}),` -- `,(0,o.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--active`,children:`Active style`})]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`.dnb-anchor--focus`}),` -- `,(0,o.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--focus`,children:`Focus style`})]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`Read more about the `,(0,o.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor / Text Link`}),`.`]}),`
`,(0,o.jsx)(t.h2,{children:`DNB Mono (monospace)`}),`
`,(0,o.jsxs)(t.p,{children:[`DNB has its own monospace typeface (`,(0,o.jsx)(t.code,{children:`font-family`}),`).`]}),`
`,(0,o.jsxs)(t.p,{children:[`Use it either by a CSS class `,(0,o.jsx)(t.code,{children:`.dnb-t__family--monospace`}),` or define your own like so:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`.css-selector {
  font-family: var(--font-family-monospace);
  font-weight: normal;
  font-style: normal;
}
`})}),`
`,(0,o.jsx)(t.h2,{children:`Hosted Fonts (CDN)`}),`
`,(0,o.jsx)(t.p,{children:`The font files are hosted under the following URLs:`}),`
`,(0,o.jsx)(t.h3,{children:`DNB`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Regular.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Medium.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Bold.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Regular.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Medium.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Bold.woff2`})}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Sbanken`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/sbanken/MaisonNeue.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Regular.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Medium.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Bold.woff2`})}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`DNB Carnegie`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Regular.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Medium.woff2`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Bold.woff2`})}),`
`]}),`
`,(0,o.jsx)(s,{children:(0,o.jsx)(a,{})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};