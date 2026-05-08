import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{n}from"./Examples-D_TWB3RI.js";var r=e();function i(e){let i={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`Typography`}),`
`,(0,r.jsx)(i.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=530-49`,children:`Figma`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/style`,children:`Source code`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/typography`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`Typography components`}),`
`,(0,r.jsx)(i.p,{children:`The two main components used to set typography are:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`/uilib/elements/span`,children:`Span`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`/uilib/elements/paragraph`,children:`P`})}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`(`,(0,r.jsx)(i.a,{href:`/uilib/elements/lead`,children:`Lead`}),` and `,(0,r.jsx)(i.a,{href:`uilib/elements/ingress`,children:`Ingress`}),` also work in the same way)`]}),`
`,(0,r.jsx)(i.h2,{children:`Typography in general`}),`
`,(0,r.jsxs)(i.p,{children:[`Fonts are handled automatically once the CSS packages `,(0,r.jsx)(i.strong,{children:`dnb-ui-core`}),` or `,(0,r.jsx)(i.strong,{children:`dnb-ui-basis`}),` are loaded.`]}),`
`,(0,r.jsxs)(i.p,{children:[`Every typography HTML element, like headings and paragraphs, has a defined `,(0,r.jsx)(i.code,{children:`height`}),` and `,(0,r.jsx)(i.code,{children:`line-height`}),` so everything falls exactly into the `,(0,r.jsx)(i.strong,{children:`8-pixel grid`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`You don't need to define the `,(0,r.jsx)(i.code,{children:`font-family`}),`, but rather use CSS Custom Properties for `,(0,r.jsx)(i.code,{children:`font-weight`}),`, `,(0,r.jsx)(i.code,{children:`font-size`}),`, and `,(0,r.jsx)(i.code,{children:`line-height`}),`.`]}),`
`,(0,r.jsx)(i.h3,{children:`Typography property tables`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`/uilib/typography/font-weight`,children:`font-weight`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`/uilib/typography/font-size`,children:`font-size`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`/uilib/typography/line-height`,children:`line-height`})}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Typography Examples`}),`
`,(0,r.jsx)(n,{}),`
`,(0,r.jsx)(i.h2,{children:`Line length`}),`
`,(0,r.jsx)(i.p,{children:`For readable paragraphs and inline help text, keep line length constrained to a comfortable character count.`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Use `,(0,r.jsx)(i.code,{children:`var(--prose-max-width)`}),` as the canonical token for maximum text width. Default is `,(0,r.jsx)(i.code,{children:`60ch`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Base styles and some components expose `,(0,r.jsx)(i.code,{children:`var(--prose-max-width)`}),`, which maps to `,(0,r.jsx)(i.code,{children:`var(--prose-max-width)`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Using the `,(0,r.jsx)(i.code,{children:`proseMaxWidth`}),` property (max width in characters)`]}),`
`,(0,r.jsxs)(i.p,{children:[`Prose refers to written text in its natural form, particularly paragraphs and other continuous writing. Typography components like `,(0,r.jsx)(i.code,{children:`H2`}),`, `,(0,r.jsx)(i.code,{children:`H3`}),`, and `,(0,r.jsx)(i.code,{children:`P`}),` support the `,(0,r.jsx)(i.code,{children:`proseMaxWidth`}),` property to limit text width based on character count:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
`})}),`
`,(0,r.jsxs)(i.h3,{children:[`Using `,(0,r.jsx)(i.code,{children:`Typography.Provider`})]}),`
`,(0,r.jsxs)(i.p,{children:[`Use `,(0,r.jsx)(i.code,{children:`Typography.Provider`}),` to apply `,(0,r.jsx)(i.code,{children:`proseMaxWidth`}),` to multiple typography components at once:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Typography.Provider proseMaxWidth={60}>
  <P>This paragraph will be limited to approximately 60 characters wide</P>
  <P>
    This paragraph will also be limited to approximately 60 characters wide
  </P>
  <H2 proseMaxWidth={80}>This heading overrides with its own value</H2>
</Typography.Provider>
`})}),`
`,(0,r.jsx)(i.p,{children:`CSS example:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-css`,children:`.prose {
  max-width: var(--prose-max-width); /* 60ch by default */
}
`})}),`
`,(0,r.jsx)(i.h2,{children:`Font Face`}),`
`,(0,r.jsxs)(i.p,{children:[`The default DNB font family is `,(0,r.jsx)(i.code,{children:`DNB`}),`, loaded via `,(0,r.jsx)(i.code,{children:`@font-face`}),` in `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/src/style/themes/ui/fonts.scss`}),`.`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Sbanken uses its own fonts, declared and loaded in `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/src/style/themes/sbanken/fonts.scss`}),` and applied via Sbanken-specific properties.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Carnegie uses the `,(0,r.jsx)(i.code,{children:`ArizonaFlare`}),` font family, declared and loaded in `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/src/style/themes/carnegie/fonts.scss`}),`, and applied through the Carnegie theme’s typography variables.`]}),`
`,(0,r.jsx)(i.li,{children:`Eiendom uses the default DNB font family.`}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`Spacing and margin collapsing`}),`
`,(0,r.jsxs)(i.p,{children:[`You can use the `,(0,r.jsx)(i.a,{href:`/uilib/layout/space/properties`,children:`Spacing properties`}),` inside every Eufemia React Element, but keep in mind that `,(0,r.jsx)(i.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing`,children:`margin collapsing`}),` can sometimes be a little tricky to get right.`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-jsx`,children:`import { H1, H2, ... } from '@dnb/eufemia'

<H1 bottom="x-large">Heading with bottom margin: x-large</H1>
<H2 top="x-large">Heading with top margin: x-large</H2>
`})}),`
`,(0,r.jsx)(i.h2,{children:`Anchor`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`.dnb-anchor`}),` –\xA0`,(0,r.jsx)(`a`,{href:`/`,className:`dnb-anchor`,children:`Anchor with default style`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`.dnb-anchor--hover`}),` –\xA0`,(0,r.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--hover`,children:`Hover style`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`.dnb-anchor--active`}),` –\xA0`,(0,r.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--active`,children:`Active style`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`.dnb-anchor--focus`}),` –\xA0\xA0`,(0,r.jsx)(`a`,{href:`/`,className:`dnb-anchor dnb-anchor--focus`,children:`Focus style`})]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`Read more about the `,(0,r.jsx)(i.a,{href:`/uilib/components/anchor`,children:`Anchor / Text Link`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`DNB Mono (monospace)`}),`
`,(0,r.jsxs)(i.p,{children:[`DNB has its own monospace typeface (`,(0,r.jsx)(i.code,{children:`font-family`}),`).`]}),`
`,(0,r.jsxs)(i.p,{children:[`Use it either by a CSS class `,(0,r.jsx)(i.code,{children:`.dnb-t__family--monospace`}),` or define your own like so:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-css`,children:`.css-selector {
  font-family: var(--font-family-monospace);
  font-weight: normal;
  font-style: normal;
}
`})}),`
`,(0,r.jsx)(i.h2,{children:`Hosted Fonts (CDN)`}),`
`,(0,r.jsx)(i.p,{children:`The font files are hosted under the following URLs:`}),`
`,(0,r.jsx)(i.h3,{children:`DNB`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Regular.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Medium.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNB-Bold.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Regular.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Medium.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/dnb/DNBMono-Bold.woff2`})}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Sbanken`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/sbanken/MaisonNeue.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Regular.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Medium.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/sbanken/Roboto-Bold.woff2`})}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`DNB Carnegie`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Regular.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Medium.woff2`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Bold.woff2`})}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};