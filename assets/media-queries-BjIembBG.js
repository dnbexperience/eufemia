import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{d as n,u as r}from"./Examples-oXTN84qZ.js";var i=e(),a=`/assets/breakpoint-ranges-B-jrHyuf.svg`;function o(e){let o={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.h1,{children:`Media Queries and Breakpoints`}),`
`,(0,i.jsxs)(o.p,{children:[`To make media queries more declarative and easier to handle from JavaScript, you may be interested in using both the `,(0,i.jsx)(o.code,{children:`MediaQuery`}),` React component and the `,(0,i.jsx)(o.code,{children:`useMediaQuery`}),` React hook.`]}),`
`,(0,i.jsx)(o.h2,{children:`Media Queries Properties Table`}),`
`,(0,i.jsx)(o.p,{children:`UX designers are using a 12 column system during their design processes.`}),`
`,(0,i.jsxs)(o.table,{children:[(0,i.jsx)(o.thead,{children:(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.th,{children:`Pixel`}),(0,i.jsx)(o.th,{children:`Type`}),(0,i.jsx)(o.th,{children:`Rem`}),(0,i.jsx)(o.th,{children:`Custom Property`}),(0,i.jsx)(o.th,{children:`Comments`})]})}),(0,i.jsxs)(o.tbody,{children:[(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:`640`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`small`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.strong,{children:`40em`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`--layout-small`})}),(0,i.jsx)(o.td,{children:`4 columns`})]}),(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:`960`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`medium`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.strong,{children:`60em`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`--layout-medium`})}),(0,i.jsx)(o.td,{children:`6 columns`})]}),(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:`1152`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`large`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.strong,{children:`72em`})}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`--layout-large`})}),(0,i.jsx)(o.td,{children:`12 columns`})]})]})]}),`
`,(0,i.jsx)(o.h3,{children:`Breakpoint ranges`}),`
`,(0,i.jsxs)(o.p,{children:[`Applications in DNB actually break only twice (`,(0,i.jsx)(o.code,{children:`small`}),` and `,(0,i.jsx)(o.code,{children:`medium`}),`), but have an HTML body max-width of `,(0,i.jsx)(o.code,{children:`large`}),`.`]}),`
`,(0,i.jsxs)(o.table,{children:[(0,i.jsx)(o.thead,{children:(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.th,{children:`React hook`}),(0,i.jsx)(o.th,{children:`Range`}),(0,i.jsx)(o.th,{children:`SASS mixin`}),(0,i.jsx)(o.th,{children:`Columns`})]})}),(0,i.jsxs)(o.tbody,{children:[(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`isSmall`})}),(0,i.jsx)(o.td,{children:`from 0 to 40em`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`allBelow(small)`})}),(0,i.jsx)(o.td,{children:`4`})]}),(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`isMedium`})}),(0,i.jsx)(o.td,{children:`from (not including) 40em to 60em`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`allBetween(small, medium)`})}),(0,i.jsx)(o.td,{children:`6`})]}),(0,i.jsxs)(o.tr,{children:[(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`isLarge`})}),(0,i.jsx)(o.td,{children:`from (not including) 60em`}),(0,i.jsx)(o.td,{children:(0,i.jsx)(o.code,{children:`allAbove(medium)`})}),(0,i.jsx)(o.td,{children:`12`})]})]})]}),`
`,(0,i.jsxs)(o.p,{children:[`Note: if you've set `,(0,i.jsx)(o.a,{href:`/uilib/helpers/sass/#custom-offset`,children:`custom sass breakpoints`}),` using `,(0,i.jsx)(o.code,{children:`$breakpoints`}),` or `,(0,i.jsx)(o.code,{children:`$breakpoint-offset`}),`, the sass mixins will be different.`]}),`
`,(0,i.jsxs)(o.p,{children:[`So when dealing with the naming of breakpoint ranges (between breakpoints), we use the term "large" when a media query exceeds `,(0,i.jsx)(o.code,{children:`medium`}),`:`]}),`
`,(0,i.jsx)(`img`,{width:`100%`,src:a,alt:`Breakpoint ranges clarification`}),`
`,(0,i.jsx)(`br`,{}),`
`,(0,i.jsx)(`br`,{}),`
`,(0,i.jsx)(o.p,{children:`Here is how ranges breaks down in pixels:`}),`
`,(0,i.jsxs)(o.ul,{children:[`
`,(0,i.jsx)(o.li,{children:`The small range goes from 0 to 640px`}),`
`,(0,i.jsx)(o.li,{children:`The medium range goes from 640.1px to 960px`}),`
`,(0,i.jsx)(o.li,{children:`The large range goes from 960.1px to infinity`}),`
`]}),`
`,(0,i.jsx)(o.h3,{children:`UX Design and Breakpoints`}),`
`,(0,i.jsx)(o.p,{children:`When dealing with breakpoints, UX often designs only for two sizes. This leads to an unknown size between breakpoints. Check with your UX designer how your application should behave when the screen size is in between.`}),`
`,(0,i.jsx)(o.h2,{children:`MediaQuery component and React Hooks`}),`
`,(0,i.jsxs)(o.p,{children:[`Both the component and the React Hooks uses the JavaScript API `,(0,i.jsx)(o.a,{href:`https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia`,children:`matchMedia`}),`.`]}),`
`,(0,i.jsxs)(o.ul,{children:[`
`,(0,i.jsxs)(o.li,{children:[`
`,(0,i.jsxs)(o.p,{children:[(0,i.jsx)(o.strong,{children:(0,i.jsx)(o.a,{href:`/uilib/usage/layout/media-queries/#usemedia-hook-usage`,children:`useMedia`})}),` React Hook for screen width only.`]}),`
`]}),`
`,(0,i.jsxs)(o.li,{children:[`
`,(0,i.jsxs)(o.p,{children:[(0,i.jsx)(o.strong,{children:(0,i.jsx)(o.a,{href:`/uilib/usage/layout/media-queries/#usemediaquery-hook-usage`,children:`useMediaQuery`})}),` React Hook for all kinds of media queries.`]}),`
`]}),`
`,(0,i.jsxs)(o.li,{children:[`
`,(0,i.jsxs)(o.p,{children:[(0,i.jsx)(o.strong,{children:(0,i.jsx)(o.a,{href:`/uilib/usage/layout/media-queries/#mediaquery-component`,children:`MediaQuery`})}),` Component for all kinds of media queries.`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(o.h3,{children:`Re-render and performance`}),`
`,(0,i.jsxs)(o.p,{children:[`By using `,(0,i.jsx)(o.code,{children:`matchMedia`}),`, we only render when the requested media query actually changes. This means we don't need to listen to `,(0,i.jsx)(o.code,{children:`window.addEventListener('resize', ...)`}),`, which is a performance waste, even with a debounce helper.`]}),`
`,(0,i.jsx)(o.h3,{children:`CSS similarity`}),`
`,(0,i.jsxs)(o.p,{children:[`It uses the same query API as CSS. You can also provide your query raw by using, for example, `,(0,i.jsx)(o.code,{children:`query="(min-width: 60em)"`}),`. However, custom queries can quickly grow and clutter your application code unnecessarily.`]}),`
`,(0,i.jsx)(o.h3,{children:`Properties`}),`
`,(0,i.jsxs)(o.p,{children:[`You can both use `,(0,i.jsx)(o.code,{children:`min`}),` and `,(0,i.jsx)(o.code,{children:`max`}),`, they are equivalent to `,(0,i.jsx)(o.code,{children:`minWidth`}),` and `,(0,i.jsx)(o.code,{children:`maxWidth`}),`.`]}),`
`,(0,i.jsx)(o.p,{children:`CamelCase properties will be converted to kebab-case.`}),`
`,(0,i.jsx)(o.h3,{children:`SSR`}),`
`,(0,i.jsxs)(o.p,{children:[`During SSR (Server Side Render), we don't have access to the client's `,(0,i.jsx)(o.code,{children:`window.matchMedia`}),`. To make the initial render result in a positive match, you can set the `,(0,i.jsx)(o.code,{children:`matchOnSSR={true}`}),` property.`]}),`
`,(0,i.jsx)(o.h3,{children:`Units`}),`
`,(0,i.jsxs)(o.p,{children:[`Numeric values will be handled as an `,(0,i.jsx)(o.code,{children:`em`}),` unit.`]}),`
`,(0,i.jsxs)(o.h3,{children:[(0,i.jsx)(o.code,{children:`useMedia`}),` hook usage`]}),`
`,(0,i.jsxs)(o.p,{children:[`The `,(0,i.jsx)(o.code,{children:`useMedia`}),` hook acts like a switch, where only one of the properties will be true at a time.`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-tsx`,children:`import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return isSmall && <IsVisibleWhenSmall />
}
`})}),`
`,(0,i.jsxs)(o.p,{children:[`The returned constants like `,(0,i.jsx)(o.code,{children:`isLarge`}),` etc. are within "breakpoint ranges" – likewise the SCSS mixins such as `,(0,i.jsx)(o.code,{children:`allAbove`}),` etc.`]}),`
`,(0,i.jsxs)(o.p,{children:[`See the `,(0,i.jsx)(o.a,{href:`#breakpoint-ranges`,children:`table above`}),` for the available breakpoints and their corresponding media queries.`]}),`
`,(0,i.jsx)(o.h4,{children:`SSR (Server Side Render) usage`}),`
`,(0,i.jsxs)(o.p,{children:[`To lower the possibility of CLS (Cumulative Layout Shift) on larger screens, you can use the `,(0,i.jsx)(o.code,{children:`isSSR`}),` property. Try to use it in combination with `,(0,i.jsx)(o.code,{children:`isLarge`}),` because the negative CLS experience is most noticeable on larger screens:`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-tsx`,children:`import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return (isLarge || isSSR) && <IsVisibleDuringSsrAndWhenLarge />
}
`})}),`
`,(0,i.jsxs)(o.p,{children:[`During SSR, when no `,(0,i.jsx)(o.code,{children:`window`}),` object is available, all results are negative. But you can provide a `,(0,i.jsx)(o.code,{children:`initialValue`}),`:`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-tsx`,children:`import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall } = useMedia({
    initialValue: {
      isSmall: true,
    },
  })

  return isSmall && <IsVisibleDuringSSR />
}
`})}),`
`,(0,i.jsx)(o.p,{children:`Here are all the options:`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-tsx`,children:`import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall } = useMedia({
    /**
     * Provide an initial value that is used during SSR as well.
     * Default: null
     */
    initialValue?: Partial<UseMediaResult>

    /**
     * If set to true, no MediaQuery will be used.
     * Default: false
     */
    disabled?: boolean

    /**
     * Provide a custom breakpoint
     * Default: defaultBreakpoints
     */
    breakpoints?: MediaQueryBreakpoints

    /**
     * Provide a custom query
     * Default: defaultQueries
     */
    queries?: Record<string, MediaQueryCondition>

    /**
     * For debugging
     */
    log?: boolean
  })

  return isSmall
}
`})}),`
`,(0,i.jsx)(n,{}),`
`,(0,i.jsxs)(o.p,{children:[`You can disable the usage of `,(0,i.jsx)(o.code,{children:`window.matchMedia`}),` by providing `,(0,i.jsx)(o.code,{children:`useMedia({ disabled: true })`}),`.`]}),`
`,(0,i.jsxs)(o.p,{children:[`You can log the media query by providing `,(0,i.jsx)(o.code,{children:`useMedia({ log: true })`}),`.`]}),`
`,(0,i.jsxs)(o.h3,{children:[(0,i.jsx)(o.code,{children:`useMediaQuery`}),` hook usage`]}),`
`,(0,i.jsx)(o.p,{children:`This React Hook is a more extended version where you can define all sorts of media queries.`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-js`,children:`import { useMediaQuery } from '@dnb/eufemia/shared'
// or
import useMediaQuery from '@dnb/eufemia/shared/useMediaQuery'

function Component() {
  const match = useMediaQuery({
    matchOnSSR: true,
    when: { min: 'medium' },
  })

  return match ? 'true' : 'false'
}
`})}),`
`,(0,i.jsxs)(o.p,{children:[`You can disable the usage of `,(0,i.jsx)(o.code,{children:`window.matchMedia`}),` by providing `,(0,i.jsx)(o.code,{children:`useMedia({ disabled: true })`}),`.`]}),`
`,(0,i.jsx)(o.h3,{children:`Live example`}),`
`,(0,i.jsxs)(o.p,{children:[`This example uses the `,(0,i.jsx)(o.code,{children:`not`}),` property to reverse the behavior.`]}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsxs)(o.h3,{children:[(0,i.jsx)(o.code,{children:`MediaQuery`}),` component`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-js`,children:`import { MediaQuery } from '@dnb/eufemia/shared'
// or
import MediaQuery from '@dnb/eufemia/shared/MediaQuery'
`})}),`
`,(0,i.jsx)(o.p,{children:`You have plenty of possibilities to mix and match:`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-jsx`,children:`<MediaQuery when={{ min: 'medium' }}>
  matches all above medium screens
</MediaQuery>

<MediaQuery when={{ screen: true, orientation: 'landscape' }}>
  matches orientation landscape screens
</MediaQuery>

<MediaQuery not when={{ min: 'large' }}>
  matches all, but beneath large screens
</MediaQuery>

<MediaQuery matchOnSSR when={{ min: 'small', max: 'medium' }}>
  matches small and medium screens and during SSR
</MediaQuery>

<MediaQuery when={[{ min: 'small', max: 'large' }, { print: true }]}>
  matches all between small and large screens or all print media
</MediaQuery>

<MediaQuery when={{ max: '60em' }}>
  matches screens to a max of 60em
</MediaQuery>

<MediaQuery query="(min-width: 40em) and (max-width: 72em)">
  matches screens between 40em and 72em
</MediaQuery>
`})}),`
`,(0,i.jsxs)(o.p,{children:[`you can find the `,(0,i.jsx)(o.a,{href:`/uilib/shared/media-query/properties`,children:`properties on this page`}),`.`]}),`
`,(0,i.jsx)(o.h4,{children:`Interceptor on change listener`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-jsx`,children:`import { onMediaQueryChange } from '@dnb/eufemia/shared/MediaQuery'

const remove = onMediaQueryChange({ min: 'medium' }, (match, event) => {
  // Callback
})

// Remove the listeners
remove()
`})}),`
`,(0,i.jsx)(o.h3,{children:`Use different breakpoints`}),`
`,(0,i.jsx)(o.p,{children:`It is possible to change the used breakpoint types by providing them to the Eufemia Provider.`}),`
`,(0,i.jsxs)(o.p,{children:[`Both the `,(0,i.jsx)(o.code,{children:`MediaQuery`}),` component and the hooks `,(0,i.jsx)(o.code,{children:`useMedia`}),` and `,(0,i.jsx)(o.code,{children:`useMediaQuery`}),` will merge and use these custom breakpoints.`]}),`
`,(0,i.jsxs)(o.p,{children:[(0,i.jsx)(o.strong,{children:`NB:`}),` This should only be done temporarily, because DNB should align on one set of breakpoints for the best UX and consistency.`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'
...
<Provider
  value={{
    breakpoints: {
      small: '40em',
      medium: '60em',
      large: '72em',
    },
  }}
>
  <App />
</Provider>
`})}),`
`,(0,i.jsx)(o.h3,{children:`Import breakpoints into JavaScript`}),`
`,(0,i.jsx)(o.p,{children:`You get an object with the values and the types as the keys.`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-js`,children:`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'
`})}),`
`,(0,i.jsx)(o.h2,{children:`SASS / SCSS mixins`}),`
`,(0,i.jsx)(o.p,{children:`You can re-use the SASS mixins from Eufemia:`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-scss`,children:`// breakpoints.scss
@use '@dnb/eufemia/style/core/utilities' as utilities;
$layout-small: map-get(utilities.$breakpoints, 'small');
$layout-medium: map-get(utilities.$breakpoints, 'medium');
$layout-large: map-get(utilities.$breakpoints, 'large');
`})}),`
`,(0,i.jsx)(o.p,{children:`or like this:`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities' as utilities;

@include utilities.allBelow(large) {
  /* Your CSS */
}

@include utilities.allAbove(small) {
  /* Your CSS */
}
`})}),`
`,(0,i.jsx)(o.h2,{children:`Media Queries Examples`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-css`,children:`@media screen and (max-width: 40em) {
  /* small */
}
@media screen and (max-width: 60em) {
  /* medium */
}
@media screen and (max-width: 72em) {
  /* large */
}
`})}),`
`,(0,i.jsxs)(o.p,{children:[`Based on the findings of `,(0,i.jsx)(o.a,{href:`https://zellwk.com/blog/media-query-units/`,children:`this article`}),` and `,(0,i.jsx)(o.a,{href:`https://bugs.webkit.org/show_bug.cgi?id=156684`,children:`this webkit bug`}),`, Eufemia recommends using `,(0,i.jsx)(o.code,{children:`em`}),` units for media queries to achieve the best overall browser support. Read `,(0,i.jsx)(o.a,{href:`/uilib/usage/best-practices/for-styling#css-units`,children:`more about units`}),`.`]}),`
`,(0,i.jsx)(o.h2,{children:`How to deal with Jest`}),`
`,(0,i.jsxs)(o.p,{children:[`You can mock `,(0,i.jsx)(o.code,{children:`window.matchMedia`}),` with e.g. `,(0,i.jsx)(o.a,{href:`https://www.npmjs.com/package/jest-matchmedia-mock`,children:`jest-matchmedia-mock`}),`.`]}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-js`,children:`import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

it('your test', () => {
  matchMedia.useMediaQuery('(min-width: 40em) and (max-width: 60em)')
  ...
})
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}export{s as default};