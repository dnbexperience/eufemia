"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[85058],{96986:function(e,n,i){i.r(n);var s=i(52322),o=i(45392),t=i(24859);function r(e){const n=Object.assign({h1:"h1",h2:"h2",p:"p",ul:"ul",li:"li",a:"a",strong:"strong",code:"code",h3:"h3",pre:"pre"},(0,o.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{children:"Typography"}),"\n",(0,s.jsx)(n.h2,{children:"Typography components"}),"\n",(0,s.jsx)(n.p,{children:"The two main components used to set typography are:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"uilib/elements/span",children:"Span"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"uilib/elements/paragraph",children:"P"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["(",(0,s.jsx)(n.a,{href:"uilib/elements/lead",children:"Lead"})," and ",(0,s.jsx)(n.a,{href:"uilib/elements/ingress",children:"Ingress"})," also works in the same way)"]}),"\n",(0,s.jsx)(n.h2,{children:"Typography in general"}),"\n",(0,s.jsxs)(n.p,{children:["Fonts are handled automatically once the CSS packages ",(0,s.jsx)(n.strong,{children:"dnb-ui-core"})," or ",(0,s.jsx)(n.strong,{children:"dnb-ui-basis"})," are loaded."]}),"\n",(0,s.jsxs)(n.p,{children:["Every typography HTML element, like headings and paragraphs, have a defined ",(0,s.jsx)(n.code,{children:"height"}),", respective ",(0,s.jsx)(n.code,{children:"line-height"})," so everything falls exactly into the ",(0,s.jsx)(n.strong,{children:"8 pixel grid"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["You don't need to define the ",(0,s.jsx)(n.code,{children:"font-family"})," ever, but rather use CSS Custom Properties for ",(0,s.jsx)(n.code,{children:"font-weight"}),", ",(0,s.jsx)(n.code,{children:"font-size"})," and ",(0,s.jsx)(n.code,{children:"line-height"}),"."]}),"\n",(0,s.jsx)(n.h3,{children:"Typography property tables"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/uilib/typography/font-weight",children:"font-weight"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/uilib/typography/font-size",children:"font-size"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/uilib/typography/line-height",children:"line-height"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{children:"Typography Examples"}),"\n",(0,s.jsx)(t.s,{}),"\n",(0,s.jsx)(n.h2,{children:"Font Face"}),"\n",(0,s.jsxs)(n.p,{children:["The DNB default Font Family is ",(0,s.jsx)(n.code,{children:"DNB"}),". This font, together with it's weights is loaded and imported with ",(0,s.jsx)(n.code,{children:"@font-face"})," in ",(0,s.jsx)(n.code,{children:"/style/themes/theme-ui/ui-theme-fonts.scss"}),". The font family is included in the library package."]}),"\n",(0,s.jsx)(n.h2,{children:"Spacing and margin collapsing"}),"\n",(0,s.jsxs)(n.p,{children:["You can use the ",(0,s.jsx)(n.a,{href:"/uilib/layout/space/properties",children:"Spacing properties"})," inside every Eufemia React Element, but keep in mind, ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing",children:"margin collapsing"})," can some times a little tricky to get right."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'import { H1, H2, ... } from \'@dnb/eufemia\'\n\n<H1 bottom="x-large">Heading with bottom margin: x-large</H1>\n<H2 top="x-large">Heading with top margin: x-large</H2>\n'})}),"\n",(0,s.jsx)(n.h2,{children:"Anchor"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:".dnb-anchor"})," ",(0,s.jsx)("a",{href:"/",className:"dnb-anchor",children:"Anchor with default style"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:".dnb-anchor--hover"})," ",(0,s.jsx)("a",{href:"/",className:"dnb-anchor dnb-anchor--hover",children:"Hover Style"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:".dnb-anchor--active"})," ",(0,s.jsx)("a",{href:"/",className:"dnb-anchor dnb-anchor--active",children:"Active Style"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:".dnb-anchor--focus"})," ",(0,s.jsx)("a",{href:"/",className:"dnb-anchor dnb-anchor--focus",children:"Focus Style"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Read more about the ",(0,s.jsx)(n.a,{href:"/uilib/components/anchor",children:"Anchor / Text Link"})]}),"\n",(0,s.jsx)(n.h2,{children:"DNB Mono (monospace)"}),"\n",(0,s.jsxs)(n.p,{children:["DNB has its own monospace typeface (",(0,s.jsx)(n.code,{children:"font-family"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:["Use it either by a CSS class ",(0,s.jsx)(n.code,{children:".dnb-t__family--monospace"})," or define your own like so:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-css",children:".css-selector {\n  font-family: var(--font-family-monospace);\n  font-weight: normal;\n  font-style: normal;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{children:"Hosted Fonts (CDN)"}),"\n",(0,s.jsx)(n.p,{children:"The font files are hosted under the following URLs:"}),"\n",(0,s.jsx)(n.h3,{children:"DNB"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNB-Regular.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNB-Medium.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNB-Bold.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNBMono-Regular.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNBMono-Medium.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/dnb/DNBMono-Bold.woff2"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{children:"Sbanken"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/sbanken/MaisonNeue.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/sbanken/Roboto-Regular.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/sbanken/Roboto-Medium.woff2"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"https://eufemia.dnb.no/fonts/sbanken/Roboto-Bold.woff2"})}),"\n"]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(r,e)})):r(e)}},24859:function(e,n,i){i.d(n,{_:function(){return c},s:function(){return h}});var s=i(70894),o=(i(2784),i(46832)),t=i(88294),r=i(2380),a=i(52322);const l=(0,s.Z)("div",{target:"eebos460"})({name:"nyfdx3",styles:"margin-bottom:3rem"}),d=e=>{let{typo_class:n,font_family:i}=e;return(0,a.jsxs)(r.z,{children:[(0,a.jsx)("h3",{className:n,children:i}),(0,a.jsxs)("p",{className:n,children:["Here is a paragraph with some nonsense"," ",(0,a.jsx)("a",{href:"/",className:"dnb-anchor",children:"Lorem Ipsum"})," ","comes from ",(0,a.jsx)("b",{children:"sections"}),' 1.10.32 and 1.10.33 of "de',(0,a.jsx)("i",{children:"Finibus Bonorum"})," et ",(0,a.jsx)("u",{children:"Malorum"}),'" (',(0,a.jsx)("strong",{children:"The Extremes"})," of Good and Evil) by Cicero, written in 45 BC."]})]})};function c(){const e=(0,t.Z)();return"sbanken"===(null==e?void 0:e.name)?(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{font_family:"Roboto Regular",typo_class:"dnb-t__weight--regular"}),(0,a.jsx)(d,{font_family:"Roboto Medium",typo_class:"dnb-t__weight--medium"}),(0,a.jsx)(d,{font_family:"Roboto Bold",typo_class:"dnb-t__weight--bold"}),(0,a.jsx)(d,{font_family:"Monospace Regular",typo_class:"dnb-t__weight--regular dnb-t__family--monospace"})]}):(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{font_family:"DNB Regular",typo_class:"dnb-t__weight--regular"}),(0,a.jsx)(d,{font_family:"DNB Medium",typo_class:"dnb-t__weight--medium"}),(0,a.jsx)(d,{font_family:"DNB Bold",typo_class:"dnb-t__weight--bold"}),(0,a.jsx)(d,{font_family:"DNB Mono Regular",typo_class:"dnb-t__weight--regular dnb-t__family--monospace"})]})}function h(){return(0,a.jsx)(o.Z,{"data-visual-test":"typography-variants",hideCode:!0,children:'<div\n  style={{\n    maxWidth: \'30rem\',\n  }}\n>\n  <Code>Heading xx-large</Code>\n  <H4 size="xx-large" space={0}>\n    Dette er en heading på over to linjer\n  </H4>\n  <Code top="large">Heading x-large</Code>\n  <H4 size="x-large" space={0}>\n    Og dette er en heading small tittel som også går over to linjer, nei\n    vent, tre linjer.\n  </H4>\n  <Code top="large">Heading large</Code>\n  <H4 size="large" space={0}>\n    Hva har vi her, en liten heading som mot alle odds går over flere\n    linjer.\n  </H4>\n  <Code top="large">Text Lead</Code>\n  <Lead space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere\n    oporteat eam te.\n  </Lead>\n  <Code top="large">Text basis</Code>\n  <P space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere\n    oporteat eam te. Vel in deleniti sensibus, officiis menandri\n    efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax\n    ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint\n    vim.\n  </P>\n  <Code top="large">Text basis (Medium)</Code>\n  <P weight="medium" space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere\n    oporteat eam te. Vel in deleniti sensibus, officiis menandri\n    efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax\n    ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint\n    vim.\n  </P>\n  <Code top="large">Text small</Code>\n  <P size="small" space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere\n    oporteat eam te. Vel in deleniti sensibus, officiis menandri\n    efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax\n    ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint\n    vim.\n  </P>\n  <Code top="large">Text small (Medium)</Code>\n  <P size="small" weight="medium" space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere\n    oporteat eam te. Vel in deleniti sensibus, officiis menandri\n    efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax\n    ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint\n    vim.\n  </P>\n  <Code top="large">Text x-small</Code>\n  <P size="x-small" space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.\n  </P>\n  <Code top="large">Text x-small (Medium)</Code>\n  <P size="x-small" weight="medium" space={0}>\n    Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.\n  </P>\n</div>\n'})}}}]);
//# sourceMappingURL=component---src-docs-uilib-typography-mdx-58bc24150f06d4931963.js.map