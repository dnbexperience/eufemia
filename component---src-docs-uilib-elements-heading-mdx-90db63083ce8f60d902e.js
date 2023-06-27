"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[7488],{69894:function(e,n,s){s.r(n),s.d(n,{default:function(){return H}});var l=s(52322),a=s(45392),i=s(96568),d=(s(2784),s(92310)),r=s(81989),h=s(63577),c=s(80247);const t=()=>(0,l.jsx)(d.Z,{children:"\n<H1>Heading 1</H1>\n<H2>Heading 2</H2>\n<H3>Heading 3</H3>\n<H4>Heading 4</H4>\n<H5>Heading 5</H5>\n<H6>Heading 6</H6>\n<P>Regular text</P>\n\n"}),o=()=>(0,l.jsx)(d.Z,{children:"\n<H1>Heading 1 (default size 'xx-large')</H1>\n<H1 size=\"x-large\">Heading 1 style 'x-large'</H1>\n<H1 size=\"small\">Heading 1 style small</H1>\n\n"}),x=()=>(0,l.jsx)(d.Z,{children:"\n<H1 size=\"x-large\">Heading style x-large (using 'size')</H1>\n<H1>\n  <small>Heading style x-large (using &lt;small&gt;)</small>\n</H1>\n\n"}),g=()=>(0,l.jsx)(d.Z,{hideCode:!0,"data-visual-test":"heading-default",children:'\n<h1 className="dnb-h--xx-large">Heading style xx-large</h1>\n<h2 className="dnb-h--x-large">Heading style x-large</h2>\n<h5 className="dnb-h--large">Heading style large</h5>\n<h3 className="dnb-h--small">Heading style small</h3>\n<h3 className="dnb-h--basis">Heading style basis</h3>\n\n'}),m=()=>(0,l.jsx)(d.Z,{hideCode:!0,"data-visual-test":"heading-additional",children:'<article>\n  <h1 className="dnb-h--xx-large">\n    <small>dnb-h--x-large</small> Normal dnb-h--xx-large\n  </h1>\n  <h2 className="dnb-h--large">\n    Normal dnb-h--large <small>dnb-h--medium</small>\n  </h2>\n  <h3 className="dnb-h--medium">\n    Normal dnb-h--medium <small>dnb-h--basis</small>\n  </h3>\n  <h3 className="dnb-lead">\n    Normal dnb-lead <small>small</small>\n  </h3>\n</article>\n'}),j=()=>(0,l.jsx)(d.Z,{children:'\n<H1 size="small" top bottom="small">\n  Spacing with bottom margin: small\n</H1>\n<P top="large" bottom="small">\n  Spacing with top margin: large\n</P>\n\n'}),u=()=>{if(!globalThis.IS_TEST)return null;const e=(0,i.Z)("div",{target:"exru1x10"})({name:"1qmr6ab",styles:"overflow:auto"});return(0,l.jsx)(d.Z,{scope:{HWrap:n=>{let{...s}=n;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e,{children:(0,l.jsx)(r.Z,{...s,children:s.size})}),(0,l.jsx)(e,{children:(0,l.jsx)(h.Z,{...s,children:(0,l.jsxs)("small",{children:["<small>"," ",s.size," ","</small>"]})})}),(0,l.jsx)(e,{children:(0,l.jsxs)(c.Z,{...s,children:[(0,l.jsx)(l.Fragment,{children:"Text "}),(0,l.jsxs)("small",{children:["<small>"," ",s.size," ","</small>"]})]})}),(0,l.jsx)("hr",{})]})}},"data-visual-test":"heading-sizes",children:'\n<HWrap size="xx-large" />\n<HWrap size="x-large" />\n<HWrap size="large" />\n<HWrap size="medium" />\n<HWrap size="basis" />\n<HWrap size="small" />\n<HWrap size="x-small" />\n\n'})};function p(e){const n=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code",a:"a",h2:"h2",strong:"strong",pre:"pre",h3:"h3"},(0,a.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{children:"Heading"}),"\n",(0,l.jsx)(n.p,{children:"Eufemia comes with three levels of heading styles:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:".dnb-h--xx-large"})," (Heading xx-large)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:".dnb-h--x-large"})," (Heading x-large)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:".dnb-h--large"})," (Heading large)"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Additional, you can use these style modifiers if needed:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--medium"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--basis"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--small"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--x-small"})}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Optional, you could use ",(0,l.jsx)(n.code,{children:".dnb-lead"})," (equivalent to ",(0,l.jsx)(n.code,{children:".dnb-h--medium"}),") to style a heading as well. But only if that would make sense in the particular context."]}),"\n",(0,l.jsxs)(n.p,{children:["The sizes are aligned to the ",(0,l.jsx)(n.a,{href:"/uilib/typography/font-size",children:"font-size definitions"}),"."]}),"\n",(0,l.jsx)(n.h2,{children:"Think semantics first"}),"\n",(0,l.jsxs)(n.p,{children:["You should ",(0,l.jsx)(n.a,{href:"/uilib/usage/best-practices/for-typography#headings-and-styling",children:"think semantics first"})," once you choose what level of heading you use. Always try to start with an ",(0,l.jsx)(n.code,{children:"<h1>"}),". When the heading levels are properly defined, you can go ahead and define the sizes (styles)."]}),"\n",(0,l.jsxs)(n.p,{children:["If you have to use a paragraph (",(0,l.jsx)(n.code,{children:"<p>"}),") or a arbitrary heading, and it has to ",(0,l.jsx)(n.strong,{children:"look like"})," a specific heading, you can use these classes:"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--xx-large"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--x-large"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".dnb-h--large"})}),"\n",(0,l.jsx)(n.li,{children:"etc."}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Read more about ",(0,l.jsx)(n.a,{href:"/uilib/usage/best-practices/for-typography",children:"best practices for typography"}),"."]}),"\n",(0,l.jsx)(n.h2,{children:"Automated heading levels"}),"\n",(0,l.jsxs)(n.p,{children:["There is also ",(0,l.jsx)(n.a,{href:"/uilib/components/heading",children:"Heading"}),", a component to create automated semantic headings within a boundary of some rules."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { Heading } from '@dnb/eufemia/components'\n"})}),"\n",(0,l.jsx)(n.h2,{children:"Heading styles in React"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { H1, H2, ... } from '@dnb/eufemia'\n"})}),"\n",(0,l.jsx)(n.h3,{children:"The most basic use of headings"}),"\n",(0,l.jsxs)(n.p,{children:["Just using the ",(0,l.jsx)(n.code,{children:"H1, H2, etc."})," components will give you the basic headings."]}),"\n",(0,l.jsx)(t,{}),"\n",(0,l.jsx)(n.h3,{children:"Heading typography using React JSX"}),"\n",(0,l.jsxs)(n.p,{children:["The visual size of a heading can be customized using the ",(0,l.jsx)(n.code,{children:"size"})," prop with values: ",(0,l.jsx)(n.code,{children:"xx-large | x-large | large | medium | basis | small | x-small"})]}),"\n",(0,l.jsx)(o,{}),"\n",(0,l.jsxs)(n.p,{children:["By using the ",(0,l.jsx)(n.code,{children:"<small>"})," element, we decrease the size one level (default size is ",(0,l.jsx)(n.code,{children:"xx-large"}),"):"]}),"\n",(0,l.jsx)(x,{}),"\n",(0,l.jsx)(n.h2,{children:"Heading styles in vanilla HTML"}),"\n",(0,l.jsx)(g,{}),"\n",(0,l.jsx)(n.h3,{children:"Additional Heading modifiers"}),"\n",(0,l.jsx)(m,{}),"\n",(0,l.jsx)(n.h2,{children:"Example of margin collapsing"}),"\n",(0,l.jsx)(n.p,{children:"Only the largest margin takes effect."}),"\n",(0,l.jsx)(j,{}),"\n",(0,l.jsx)(u,{})]})}var H=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(p,e)})):p(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-elements-heading-mdx-90db63083ce8f60d902e.js.map