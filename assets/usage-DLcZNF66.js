import{a as e,t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{n as i,r as a,t as o}from"./Tr-BoYP63eF.js";import{Ft as s,Ir as c,Li as l,Rr as u,nn as d}from"./index-CMgyXmp3.js";import f from"./about-watching-releases-CKE625CC.js";var p=t(((e,t)=>{t.exports=[`chrome >= 109`,`firefox >= 115`,`edge >= 109`,`opera >= 95`,`safari >= 13.1`,`ChromeAndroid >= 106`,`FirefoxAndroid >= 115`,`samsung >= 17`,`iOS >= 13.1`]}));n();var m=r(),h=e(p()),g=[{name:`Chrome`,minimumVersion:`109`},{name:`Chrome Android`,minimumVersion:`106`},{name:`Edge`,minimumVersion:`109`},{name:`Firefox`,minimumVersion:`115`},{name:`Firefox Android`,minimumVersion:`115`},{name:`iOS Safari`,minimumVersion:`13.1`},{name:`Opera`,minimumVersion:`95`},{name:`Safari`,minimumVersion:`13.1`},{name:`Samsung Browser`,minimumVersion:`17`}];function _(){return(0,m.jsx)(c,{element:`pre`,children:(0,m.jsx)(l,{children:(0,m.jsx)(c,{innerSpace:!0,children:(0,m.jsx)(d,{children:h.default.map(e=>e).join(`,
`)})})})})}function v(){return(0,m.jsxs)(s,{size:`small`,outline:!0,children:[(0,m.jsx)(`thead`,{children:(0,m.jsxs)(o,{children:[(0,m.jsx)(i,{style:{width:`30%`},children:`Browser`}),(0,m.jsx)(i,{children:`Minimum version`})]})}),(0,m.jsx)(`tbody`,{children:g.map((e,t)=>(0,m.jsxs)(o,{children:[(0,m.jsx)(a,{children:e.name}),(0,m.jsx)(a,{children:(0,m.jsx)(l,{children:e.minimumVersion})})]},t))})]})}function y(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...u(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h1,{children:`Usage`}),`
`,(0,m.jsx)(t.p,{children:(0,m.jsx)(t.strong,{children:`Get started using the DNB user interface library`})}),`
`,(0,m.jsx)(t.p,{children:`The UI library's HTML elements and UI components are isolated, ready-to-use building blocks. They are self-contained and include the styles needed for proper display.`}),`
`,(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsxs)(t.li,{children:[(0,m.jsx)(t.strong,{children:`HTML elements`}),` are styled HTML tags`]}),`
`,(0,m.jsxs)(t.li,{children:[(0,m.jsx)(t.strong,{children:`UI components`}),` are styled and custom-built HTML elements`]}),`
`,(0,m.jsxs)(t.li,{children:[(0,m.jsx)(t.strong,{children:`UI extensions`}),` are styled, functional additions to Eufemia`]}),`
`]}),`
`,(0,m.jsx)(t.p,{children:`You can use any of the HTML elements and UI components as demonstrated in the documentation, with various customization properties available.`}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(t.h2,{children:`Installation`}),`
`,(0,m.jsxs)(t.p,{children:[`To install and save `,(0,m.jsx)(t.code,{children:`@dnb/eufemia`}),` in your `,(0,m.jsx)(t.strong,{children:`package.json`}),` dependencies, run:`]}),`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Note:`}),` `,(0,m.jsx)(t.a,{href:`https://www.npmjs.com/package/react`,children:`React`}),` and `,(0,m.jsx)(t.a,{href:`https://www.npmjs.com/package/react-dom`,children:`React DOM`}),` are also required.`]}),`
`,(0,m.jsx)(t.pre,{children:(0,m.jsx)(t.code,{className:`language-bash`,children:`# React version 16 is currently used
# You may want to specify react@16 and react-dom@16
$ npm i @dnb/eufemia react react-dom
`})}),`
`,(0,m.jsxs)(t.p,{children:[`Read more in the `,(0,m.jsx)(t.a,{href:`/uilib/usage/first-steps/`,children:`First Steps`}),` section.`]}),`
`,(0,m.jsx)(t.h2,{children:`Supported Browsers and Platforms`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Configuration and Browserslist`}),`
`,(0,m.jsxs)(t.p,{children:[`Eufemia uses the `,(0,m.jsx)(t.a,{href:`https://github.com/dnbexperience/browserslist-config`,children:`@dnb/browserslist-config`}),` configuration for bundle output, defined in `,(0,m.jsx)(t.code,{children:`.browserslistrc`}),`:`]}),`
`,(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.code,{children:`extends @dnb/browserslist-config`})}),`
`]}),`
`,(0,m.jsx)(t.p,{children:`This configuration only affects the JavaScript bundle output, not the CSS bundle output.`}),`
`,(0,m.jsxs)(t.p,{children:[`To see which browsers this config supports, paste the following config into the `,(0,m.jsx)(t.a,{href:`https://browsersl.ist/#q=defaults+and+supports+es6-module`,children:`Check compatible browsers`}),` tool:`]}),`
`,(0,m.jsx)(_,{})]})}function b(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(y,{...e})}):y(e)}export{b as default};