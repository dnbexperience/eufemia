import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{n as r,r as i}from"./Examples-Cou5FP0Z.js";var a=e(t());function o(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return r||c(`Examples`,!1),i||c(`Examples.FieldsetReset`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`SASS and mixins`}),`
`,(0,a.jsxs)(t.p,{children:[`All CSS helper classes are to be found in `,(0,a.jsx)(t.code,{children:`src/style/core/helper-classes/helper-classes.scss`}),`
Most helper classes are SCSS `,(0,a.jsx)(t.em,{children:`mixins`}),` which are then applied to the class when invoked.`]}),`
`,(0,a.jsxs)(t.p,{children:[`You can import Eufemia `,(0,a.jsx)(t.em,{children:`mixins`}),` directly into your SCSS styles:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

/** State handling */
@include utilities.hover {
}
@include utilities.focus {
}
@include utilities.active {
}

/** 
 * Media Queries and Breakpoints 
 * More info can be found in the sections below
 */
@include utilities.allBelow(large) {
}
@include utilities.allAbove(small) {
}
@include utilities.allBetween(small) {
}

/** Screen Reader Only */
@include utilities.srOnly() {
} // .dnb-sr-only

/** Browser Checks */
@include utilities.IS_CHROME {
}
@include utilities.IS_SAFARI_MOBILE {
}
@include utilities.IS_SAFARI_DESKTOP {
}

/** Eufemia DropShadow */
@include utilities.defaultDropShadow();

/** Eufemia Border helpers */
@include utilities.focusRing(
  /* $whatinput: 'keyboard', $color: var(--token-color-stroke-action-focus), $borderWidth: var(--focus-ring-width), $inset: inset */
);
@include utilities.fakeBorder(
  /* $color: null, $width: 0.0625rem, $inset: inset */
);

/** Scroll behavior */
@include utilities.scrollY(/* $mode: scroll */);
@include utilities.scrollX(/* $mode: scroll */);
@include utilities.hideScrollbar();
@include utilities.scrollbarAppearance();

/** Reset fieldset styles */
@include utilities.fieldsetReset();
`})}),`
`,(0,a.jsx)(t.h2,{children:`Media queries and Breakpoints`}),`
`,(0,a.jsxs)(t.p,{children:[`Use the `,(0,a.jsx)(t.code,{children:`allAbove`}),`, `,(0,a.jsx)(t.code,{children:`allBelow`}),` and `,(0,a.jsx)(t.code,{children:`allBetween`}),` mixins to add media queries to your CSS.`]}),`
`,(0,a.jsxs)(t.p,{children:[`To prevent overlapping media queries, `,(0,a.jsx)(t.code,{children:`0.00625em`}),` gets added to the minimum width. This results in an increment of approximately `,(0,a.jsx)(t.code,{children:`0.1px`}),` when using `,(0,a.jsx)(t.code,{children:`em`}),` units. If you're using a unit other than `,(0,a.jsx)(t.code,{children:`em`}),`, you may need to adjust this value accordingly, as `,(0,a.jsx)(t.code,{children:`0.00625px`}),` is typically too small to effectively prevent overlaps.`]}),`
`,(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:`mixin`}),(0,a.jsx)(t.th,{children:`actual interval (em)`}),(0,a.jsx)(t.th,{children:`actual interval (px)`})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`allBelow(40em)`})}),(0,a.jsx)(t.td,{children:`0 to 40em`}),(0,a.jsx)(t.td,{children:`0 to 640px`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`allBetween(40em,60em)`})}),(0,a.jsx)(t.td,{children:`40.00625em to 60em`}),(0,a.jsx)(t.td,{children:`640.1px to 960px`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`allAbove(60em)`})}),(0,a.jsx)(t.td,{children:`60.00625em to infinity`}),(0,a.jsx)(t.td,{children:`960.1px to infinity`})]})]})]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

@include utilities.allBelow(small) {
  // from 0px to 'small' (640px)
}

@include utilities.allBetween(small, medium) {
  // from 640.1px ('small' + 0.1px) to 960px ('medium')
}

@include utilities.allAbove(medium) {
  // from 960.1px ('medium' + 0.1px) and wider
}
`})}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`$breakpoints`}),` is a key-value map containing all the available sizes for media queries`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

// getting a size from $breakpoints
div {
  max-width: map-get(utilities.$breakpoints, medium);
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Custom offset`}),`
`,(0,a.jsxs)(t.p,{children:[`You can either change the default value `,(0,a.jsx)(t.code,{children:`$breakpoint-offset`}),` (default: 0) from `,(0,a.jsx)(t.code,{children:`utilities.scss`}),`, or send in a custom offset to the mixin.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

// Change the default offset (default: 0)
utilities.$breakpoint-offset: 10em;

// Will use the new default offset, adding 10em to the size
@include utilities.allBelow(large) {
}

// You can also simply send in a custom offset
@include utilities.allBelow(large, -5em) {
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Custom size`}),`
`,(0,a.jsxs)(t.p,{children:[`You can either change the default values in the `,(0,a.jsx)(t.code,{children:`$breakpoints`}),` array from `,(0,a.jsx)(t.code,{children:`utilities.scss`}),`, or send in a custom size to the mixin.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

// Change default sizes
utilities.$breakpoints: map-merge(
  utilities.$breakpoints,
  (
    // redefine a size
    'medium': 40em,

    // add an offset to the original value
    'large': map-get(utilities.$breakpoints, large) + 5em
  )
);

// Will use the new default 'large' size of 90em
@include utilities.allBelow(large) {
}

// You can also simply send in a custom size
@include utilities.allBelow(90em) {
}
`})}),`
`,(0,a.jsxs)(t.h2,{children:[(0,a.jsx)(t.code,{children:`<fieldset>`}),` CSS reset`]}),`
`,(0,a.jsxs)(t.p,{children:[`Removes default styling on a `,(0,a.jsx)(t.code,{children:`fieldset`}),` element.`]}),`
`,(0,a.jsx)(t.p,{children:(0,a.jsx)(t.code,{children:`@include utilities.fieldsetReset($checkSpaceProps: boolean)`})}),`
`,(0,a.jsxs)(t.p,{children:[`If true is given, it will handle margin gracefully by checking for e.g. `,(0,a.jsx)(t.code,{children:`dnb-space__top--`}),` and not reset if this class exists.`]}),`
`,(0,a.jsx)(i,{})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default};