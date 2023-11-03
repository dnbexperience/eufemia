"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[2593],{65227:function(e,n,s){s.r(n);var l=s(52322),i=s(45392),a=s(9417);function t(e){const n=Object.assign({h1:"h1",p:"p",code:"code",em:"em",pre:"pre",h2:"h2",h3:"h3"},(0,i.ah)(),e.components);return a||c("Examples",!1),a.FormsetReset||c("Examples.FormsetReset",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{children:"SASS and mixins"}),"\n",(0,l.jsxs)(n.p,{children:["All CSS helper classes are to be found in ",(0,l.jsx)(n.code,{children:"src/style/core/helper-classes/helper-classes.scss"}),"\nMost helper classes are SCSS ",(0,l.jsx)(n.em,{children:"mixins"})," which are then applied to the class when invoked."]}),"\n",(0,l.jsxs)(n.p,{children:["You can import Eufemia ",(0,l.jsx)(n.em,{children:"mixins"})," directly into your SCSS styles:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities.scss';\n\n/** State handling */\n@include hover {\n}\n@include focus {\n}\n@include active {\n}\n\n/** \n * Media Queries and Breakpoints \n * More info can be found in the sections below\n */\n@include allBelow(large) {\n}\n@include allAbove(small) {\n}\n@include allBetween(small) {\n}\n\n/** Screen Reader Only */\n@include srOnly() {\n} // .dnb-sr-only\n\n/** Browser Checks */\n@include IS_EDGE {\n}\n@include IS_FF {\n}\n@include IS_CHROME {\n}\n@include IS_SAFARI_MOBILE {\n}\n@include IS_SAFARI_DESKTOP {\n}\n\n/** Eufemia DropShadow */\n@include defaultDropShadow();\n\n/** Eufemia Border helpers */\n@include focusRing(\n  /* $whatinput: 'keyboard', $color: var(--color-emerald-green), $inset: inset */\n);\n@include extendFocusRing(\n  /* $first-color: null, $second-color: null, width: 0.0625rem */\n);\n@include fakeBorder(\n  /* $color: var(--color-emerald-green), $width: 0.0625rem, $inset: inset */\n);\n\n/** Scroll behavior */\n@include scrollY(/* $mode: scroll */);\n@include scrollX(/* $mode: scroll */);\n@include hideScrollbar();\n@include scrollbarAppearance();\n\n/** Reset fieldset styles */\n@include fieldsetReset();\n"})}),"\n",(0,l.jsx)(n.h2,{children:"Media queries and Breakpoints"}),"\n",(0,l.jsxs)(n.p,{children:["Use the ",(0,l.jsx)(n.code,{children:"allAbove"}),", ",(0,l.jsx)(n.code,{children:"allBelow"})," and ",(0,l.jsx)(n.code,{children:"allBetween"})," mixins to add media queries to your css."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities.scss';\n\n@include allBelow(small) {\n}\n\n@include allBetween(small, medium) {\n}\n\n@include allAbove(medium) {\n}\n"})}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"$breakpoints"})," is a key-value map containing all the available sizes for media queries"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities.scss';\n\n// getting a size from $breakpoints\ndiv {\n  max-width: map-get($breakpoints, medium);\n}\n"})}),"\n",(0,l.jsx)(n.h3,{children:"Custom offset"}),"\n",(0,l.jsxs)(n.p,{children:["You can either change the default value ",(0,l.jsx)(n.code,{children:"$breakpoint-offset"})," (default: 0) from ",(0,l.jsx)(n.code,{children:"utilities.scss"}),", or send in a custom offset to the mixin."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities.scss';\n\n// Change the default offset (default: 0)\n$breakpoint-offset: 10em;\n\n// Will use the new default offset, adding 10em to the size\n@include allBelow(large) {\n}\n\n// You can also simply send in a custom offset\n@include allBelow(large, -5em) {\n}\n"})}),"\n",(0,l.jsx)(n.h3,{children:"Custom size"}),"\n",(0,l.jsxs)(n.p,{children:["You can either change the default values in the ",(0,l.jsx)(n.code,{children:"$breakpoints"})," array from ",(0,l.jsx)(n.code,{children:"utilities.scss"}),", or send in a custom size to the mixin."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities.scss';\n\n// Change default sizes\n$breakpoints: map-merge(\n  $breakpints,\n  (\n    // redefine a size\n    'medium': 40em,\n\n    // add an offset to the original value\n    'large': map-get($breakpoints, large) + 5em\n  )\n);\n\n// Will use the new default 'large' size of 90em\n@include allBelow(large) {\n}\n\n// You can also simply send in a custom size\n@include allBelow(90em) {\n}\n"})}),"\n",(0,l.jsxs)(n.h2,{children:[(0,l.jsx)(n.code,{children:"<fieldset>"})," CSS reset"]}),"\n",(0,l.jsxs)(n.p,{children:["Removes default styling on a ",(0,l.jsx)(n.code,{children:"fieldset"})," element."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.code,{children:"@include fieldsetReset($checkSpaceProps: boolean)"})}),"\n",(0,l.jsxs)(n.p,{children:["If true is given, it will handle margin gracefully by checking for e.g. ",(0,l.jsx)(n.code,{children:"dnb-space__top--"})," and not reset if this class exists."]}),"\n",(0,l.jsx)(a.FormsetReset,{})]})}function c(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(t,e)})):t(e)}},9417:function(e,n,s){s.r(n),s.d(n,{CoreStyle:function(){return f},FormsetReset:function(){return j},MediaSizeOffset:function(){return y},ScreenReaderOnly:function(){return b},Selection:function(){return g},SkipLink:function(){return w},TabFocus:function(){return p},UnstyledList:function(){return x}});var l=s(70894),i=(s(2784),s(35823)),a="Examples-module--fieldsetReset--eacd1",t="Examples-module--showWhenLarge--af56a",c="Examples-module--showWhenLargeOffset--d8220",d="Examples-module--showWhenMedium--a125a",r="Examples-module--showWhenMediumOffset--1c6aa",o="Examples-module--showWhenSmall--f2178",h="Examples-module--showWhenSmallOffset--4485a",u=s(52322);const m=(0,l.Z)("div",{target:"e85emra0"})({name:"1jizsh7",styles:"max-width:40rem"});function f(){return(0,u.jsx)(m,{className:"dnb-spacing",children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-core-style",children:'<div className="dnb-core-style">\n  <h3 className="dnb-h--medium">\n    Wrapper with the DNB Body Style (CSS reset)\n  </h3>\n  <p className="dnb-p">\n    Read more about <code className="dnb-code">.dnb-core-style</code> and{\' \'}\n    <a\n      href="/uilib/usage/customisation/styling#core-style"\n      className="dnb-anchor"\n    >\n      Use Eufemia Styles elsewhere\n    </a>\n  </p>\n</div>\n'})})}function p(){return(0,u.jsx)(m,{className:"dnb-spacing",children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-tap-focus",children:'<details>\n  <summary className="dnb-tab-focus">\n    Try to focus me with the Tab key\n  </summary>\n  My main focus state has been removed and replaced by the helping class{\' \'}\n  <code className="dnb-code">.dnb-tab-focus</code>\n</details>\n'})})}function x(){return(0,u.jsx)(m,{className:"dnb-spacing",children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-unstyled-list",children:'\n<ul className="dnb-unstyled-list">\n  <li>I\'m an unstyled list item</li>\n  <li>Me too!</li>\n</ul>\n<hr className="dnb-hr" />\n<ul className="dnb-ul">\n  <li>But I\'m not.</li>\n</ul>\n\n'})})}function b(){return(0,u.jsx)(m,{className:"dnb-spacing",children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-sr-only",children:'<p className="dnb-p">\n  Hidden text\n  <span className="dnb-sr-only">\n    I am only visible to screen readers, so you probably can\'t see me.\n    Unless you\'re using a screen reader.\n  </span>\n  !\n</p>\n'})})}function g(){return(0,u.jsx)(m,{className:"dnb-spacing",children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-selection",children:'<p className="dnb-selection dnb-p__size--basis">\n  If you select a part of this text, you will see the selection highlight\n  is green.\n</p>\n'})})}function j(){return(0,u.jsx)(m,{className:a,children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-fieldset-reset",children:"<fieldset>I'm a fieldset without styling.</fieldset>\n"})})}function w(){return(0,u.jsx)(m,{className:a,children:(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"skip-link",children:'<a href="#something" className="dnb-skip-link">\n  I am a skip link\n</a>\n'})})}function y(){return(0,u.jsx)(i.Z,{hideCode:!0,"data-visual-test":"helper-media-offset",scope:{showWhenSmall:o,showWhenMedium:d,showWhenLarge:t,showWhenSmallOffset:h,showWhenMediumOffset:r,showWhenLargeOffset:c},children:"<Ul space={0}>\n  <Li className={showWhenSmall}>\n    Show me when \"small\"{' '}\n    <span className={showWhenSmallOffset}>+ offset is active</span>\n  </Li>\n  <Li className={showWhenMedium}>\n    Show me when \"medium\"{' '}\n    <span className={showWhenMediumOffset}>+ offset is active</span>\n  </Li>\n  <Li className={showWhenLarge}>\n    Show me when \"large\"{' '}\n    <span className={showWhenLargeOffset}>+ offset is active</span>\n  </Li>\n</Ul>\n"})}}}]);
//# sourceMappingURL=component---src-docs-uilib-helpers-sass-mdx-b760e0d963c49c2b0286.js.map