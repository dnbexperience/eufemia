"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[17869],{23169:function(e,n,i){i.r(n);var s=i(52322),r=i(45392),l=i(84285);function t(e){const n=Object.assign({h1:"h1",p:"p",a:"a",code:"code",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",h3:"h3",ul:"ul",li:"li",pre:"pre",h4:"h4"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{children:"Media Queries and Breakpoints"}),"\n",(0,s.jsxs)(n.p,{children:["In order to make it as declarative and easy to handle media queries from JavaScript, you may be interested to ",(0,s.jsx)(n.a,{href:"/uilib/usage/layout/media-queries#mediaquery-component-and-the-usemediaquery-hook",children:"use both"})," the ",(0,s.jsx)(n.code,{children:"MediaQuery"})," React component and the ",(0,s.jsx)(n.code,{children:"useMediaQuery"})," React hook."]}),"\n",(0,s.jsx)(n.h2,{children:"Media Queries Properties Table"}),"\n",(0,s.jsx)(n.p,{children:"UX designers are using a 12 column system during their design processes."}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Pixel"}),(0,s.jsx)(n.th,{children:"Type"}),(0,s.jsx)(n.th,{children:"Rem"}),(0,s.jsx)(n.th,{children:"Custom Property"}),(0,s.jsx)(n.th,{children:"Comments"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"640"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"small"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"40em"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"--layout-small"})}),(0,s.jsx)(n.td,{children:"4 columns"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"960"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"medium"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"60em"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"--layout-medium"})}),(0,s.jsx)(n.td,{children:"6 columns"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"1152"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"large"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"72em"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"--layout-large"})}),(0,s.jsx)(n.td,{children:"12 columns"})]})]})]}),"\n",(0,s.jsx)(n.h3,{children:"Breakpoint ranges"}),"\n",(0,s.jsxs)(n.p,{children:["Application in DNB do actually break only twice (",(0,s.jsx)(n.code,{children:"small"})," and ",(0,s.jsx)(n.code,{children:"medium"}),"). But have a max-width of ",(0,s.jsx)(n.code,{children:"large"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["So when dealing with naming of breakpoint ranges (between breakpoints), we actually use the term ",(0,s.jsx)(n.code,{children:"large"})," when a media query breaks on ",(0,s.jsx)(n.code,{children:"medium"}),":"]}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Name"}),(0,s.jsx)(n.th,{children:"Range"}),(0,s.jsx)(n.th,{children:"Mixin"}),(0,s.jsx)(n.th,{children:"Columns"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"small"})}),(0,s.jsx)(n.td,{children:"from 0 to 40em"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"allBelow(small)"})}),(0,s.jsx)(n.td,{children:"4"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"medium"})}),(0,s.jsx)(n.td,{children:"from 40em to 60em"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"allBetween(small, medium)"})}),(0,s.jsx)(n.td,{children:"6"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"large"})}),(0,s.jsx)(n.td,{children:"from 60em"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"allAbove(medium)"})}),(0,s.jsx)(n.td,{children:"12"})]})]})]}),"\n",(0,s.jsxs)(n.p,{children:["An example is the ",(0,s.jsx)(n.code,{children:"innerSpace"})," property of the ",(0,s.jsx)(n.a,{href:"/uilib/layout/space/demos/#responsive-innerspace",children:"Space"}),"-component."]}),"\n",(0,s.jsx)(n.h3,{children:"Unknown sizes"}),"\n",(0,s.jsx)(n.p,{children:"When dealing with breakpoints; UX often designs only for two sizes. This leads is with a unknown size in between. So check with your UXer your applications should behave for when the screen size is in between."}),"\n",(0,s.jsx)(n.h2,{children:"MediaQuery component and React Hooks"}),"\n",(0,s.jsxs)(n.p,{children:["Both the component and the React Hooks uses the JavaScript API ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia",children:"matchMedia"}),"."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/uilib/usage/layout/media-queries/#usemedia-hook-usage",children:"useMedia"})})," React Hook for screen width only."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/uilib/usage/layout/media-queries/#usemediaquery-hook-usage",children:"useMediaQuery"})})," React Hook for all kinds of media queries."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/uilib/usage/layout/media-queries/#mediaquery-component",children:"MediaQuery"})})," Component for all kinds of media queries."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{children:"Re-render and performance"}),"\n",(0,s.jsxs)(n.p,{children:["By using ",(0,s.jsx)(n.code,{children:"matchMedia"})," we only render when the requested media query actually changes. So we do not need to listen to e.g. ",(0,s.jsx)(n.code,{children:"window.addEventListener('resize', ...)"})," which is a performance waste, even with a debounce helper."]}),"\n",(0,s.jsx)(n.h3,{children:"CSS similarity"}),"\n",(0,s.jsxs)(n.p,{children:["It uses the same query API as CSS uses. You are able to provide your query also raw, by using e.g. ",(0,s.jsx)(n.code,{children:'query="(min-width: 60em)"'}),". But your custom queries will quickly grow and mess up your application code unnecessarily."]}),"\n",(0,s.jsx)(n.h3,{children:"Properties"}),"\n",(0,s.jsxs)(n.p,{children:["You can both use ",(0,s.jsx)(n.code,{children:"min"})," and ",(0,s.jsx)(n.code,{children:"max"}),", they are equivalent to ",(0,s.jsx)(n.code,{children:"minWidth"})," and ",(0,s.jsx)(n.code,{children:"maxWidth"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"CamelCase properties will be converted to kebab-case."}),"\n",(0,s.jsx)(n.h3,{children:"SSR"}),"\n",(0,s.jsxs)(n.p,{children:["During a SSR (Server Side Render) we do not have the clients ",(0,s.jsx)(n.code,{children:"window.matchMedia"}),". In order to make the initial render to a positive match, you can set the ",(0,s.jsx)(n.code,{children:"matchOnSSR={true}"})," property."]}),"\n",(0,s.jsx)(n.h3,{children:"Units"}),"\n",(0,s.jsxs)(n.p,{children:["Numeric values will be handled as an ",(0,s.jsx)(n.code,{children:"em"})," unit."]}),"\n",(0,s.jsxs)(n.h3,{children:[(0,s.jsx)(n.code,{children:"useMedia"})," hook usage"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { useMedia } from '@dnb/eufemia/shared'\n\nfunction Component() {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n\n  return isSmall && <IsVisibleWhenSmall />\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To lower the possibility of CLS (Cumulative Layout Shift) on larger screens – you can make use of the ",(0,s.jsx)(n.code,{children:"isSSR"})," property. Try to use it in combination with ",(0,s.jsx)(n.code,{children:"isLarge"}),", because the negative CLS experience is most recognizable on larger screens:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { useMedia } from '@dnb/eufemia/shared'\n\nfunction Component() {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n\n  return (isLarge || isSSR) && <IsVisibleDuringSsrAndWhenLarge />\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["During SSR, when no ",(0,s.jsx)(n.code,{children:"window"})," object is available, all results are negative. But you can provide a ",(0,s.jsx)(n.code,{children:"initialValue"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { useMedia } from '@dnb/eufemia/shared'\n\nfunction Component() {\n  const { isSmall } = useMedia({\n    initialValue: {\n      isSmall: true,\n    },\n  })\n\n  return isSmall && <IsVisibleDuringSSR />\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Here are all the options:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { useMedia } from '@dnb/eufemia/shared'\n\nfunction Component() {\n  const { isSmall } = useMedia({\n    /**\n     * Give a initial value, that is used during SSR as well.\n     * Default: null\n     */\n    initialValue?: Partial<UseMediaResult>\n\n    /**\n     * If set to true, no MediaQuery will be used.\n     * Default: false\n     */\n    disabled?: boolean\n\n    /**\n     * Provide a custom breakpoint\n     * Default: defaultBreakpoints\n     */\n    breakpoints?: MediaQueryBreakpoints\n\n    /**\n     * Provide a custom query\n     * Default: defaultQueries\n     */\n    queries?: Record<string, MediaQueryCondition>\n\n    /**\n     * For debugging\n     */\n    log?: boolean\n  })\n\n  return isSmall\n}\n"})}),"\n",(0,s.jsx)(l.MediaQueryUseMedia,{}),"\n",(0,s.jsxs)(n.p,{children:["You can disable the usage of ",(0,s.jsx)(n.code,{children:"window.matchMedia"})," by providing ",(0,s.jsx)(n.code,{children:"useMedia({ disabled: true })"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["You can log the media query by providing ",(0,s.jsx)(n.code,{children:"useMedia({ log: true })"}),"."]}),"\n",(0,s.jsxs)(n.h3,{children:[(0,s.jsx)(n.code,{children:"useMediaQuery"})," hook usage"]}),"\n",(0,s.jsx)(n.p,{children:"This React Hook is a more extended version, where you can define all sorts of Media Queries."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { useMediaQuery } from '@dnb/eufemia/shared'\n// or\nimport useMediaQuery from '@dnb/eufemia/shared/useMediaQuery'\n\nfunction Component() {\n  const match = useMediaQuery({\n    matchOnSSR: true,\n    when: { min: 'medium' },\n  })\n\n  return match ? 'true' : 'false'\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["You can disable the usage of ",(0,s.jsx)(n.code,{children:"window.matchMedia"})," by providing ",(0,s.jsx)(n.code,{children:"useMedia({ disabled: true })"}),"."]}),"\n",(0,s.jsx)(n.h3,{children:"Live example"}),"\n",(0,s.jsxs)(n.p,{children:["This example uses the ",(0,s.jsx)(n.code,{children:"not"})," property to reverse the behavior."]}),"\n",(0,s.jsx)(l.MediaQueryLiveExample,{}),"\n",(0,s.jsxs)(n.h3,{children:[(0,s.jsx)(n.code,{children:"MediaQuery"})," component"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { MediaQuery } from '@dnb/eufemia/shared'\n// or\nimport MediaQuery from '@dnb/eufemia/shared/MediaQuery'\n"})}),"\n",(0,s.jsx)(n.p,{children:"You have plenty of possibilities to mix and match:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"<MediaQuery when={{ min: 'medium' }}>\n  matches all above medium screens\n</MediaQuery>\n\n<MediaQuery when={{ screen: true, orientation: 'landscape' }}>\n  matches orientation landscape screens\n</MediaQuery>\n\n<MediaQuery not when={{ min: 'large' }}>\n  matches all, but beneath large screens\n</MediaQuery>\n\n<MediaQuery matchOnSSR when={{ min: 'small', max: 'medium' }}>\n  matches small and medium screens and during SSR\n</MediaQuery>\n\n<MediaQuery when={[{ min: 'small', max: 'large' }, { print: true }]}>\n  matches all between small and large screens or all print media\n</MediaQuery>\n\n<MediaQuery when={{ max: '60em' }}>\n  matches screens to a max of 60em\n</MediaQuery>\n\n<MediaQuery query=\"(min-width: 40em) and (max-width: 72em)\">\n  matches screens between 40em and 72em\n</MediaQuery>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["you can find the ",(0,s.jsx)(n.a,{href:"/uilib/shared/media-query/properties",children:"properties on this page"}),"."]}),"\n",(0,s.jsx)(n.h4,{children:"Interceptor on change listener"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"import { onMediaQueryChange } from '@dnb/eufemia/shared/MediaQuery'\n\nconst remove = onMediaQueryChange({ min: 'medium' }, (match, event) => {\n  // callback\n})\n\n// Will remove the listeners\nremove()\n"})}),"\n",(0,s.jsx)(n.h3,{children:"Use different breakpoints"}),"\n",(0,s.jsx)(n.p,{children:"It is possible to change the used breakpoint types by providing them to the Eufemia Provider."}),"\n",(0,s.jsxs)(n.p,{children:["Both the ",(0,s.jsx)(n.code,{children:"MediaQuery"})," component and the hooks ",(0,s.jsx)(n.code,{children:"useMedia"})," and ",(0,s.jsx)(n.code,{children:"useMediaQuery"})," will merge and use these custom breakpoints."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"NB:"})," It should be done only temporary, because DNB should align on one set of breakpoints for best UX and consistency."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"import { Provider } from '@dnb/eufemia/shared'\n...\n<Provider\n  value={{\n    breakpoints: {\n      small: '40em',\n      medium: '60em',\n      large: '72em',\n    },\n  }}\n>\n  <App />\n</Provider>\n"})}),"\n",(0,s.jsx)(n.h3,{children:"Import breakpoints into JavaScript"}),"\n",(0,s.jsx)(n.p,{children:"You get an object with the values and the types as the keys."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'\n"})}),"\n",(0,s.jsx)(n.h2,{children:"SASS / SCSS mixins"}),"\n",(0,s.jsx)(n.p,{children:"You can re-use the SASS mixins from Eufemia:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scss",children:"// breakpoints.scss\n@import '@dnb/eufemia/style/core/utilities';\n$layout-small: map-get($breakpoints, 'small');\n$layout-medium: map-get($breakpoints, 'medium');\n$layout-large: map-get($breakpoints, 'large');\n"})}),"\n",(0,s.jsx)(n.p,{children:"or like this:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scss",children:"@import '@dnb/eufemia/style/core/utilities';\n\n@include allBelow(large) {\n  /* Your CSS */\n}\n\n@include allAbove(small) {\n  /* Your CSS */\n}\n"})}),"\n",(0,s.jsx)(n.h2,{children:"Media Queries Examples"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-css",children:"@media screen and (max-width: 40em) {\n  /* small */\n}\n@media screen and (max-width: 60em) {\n  /* medium */\n}\n@media screen and (max-width: 72em) {\n  /* large */\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Based of the findings of ",(0,s.jsx)(n.a,{href:"https://zellwk.com/blog/media-query-units/",children:"this article"})," and ",(0,s.jsx)(n.a,{href:"https://bugs.webkit.org/show_bug.cgi?id=156684",children:"this webkit bug"})," Eufemia recommends to use ",(0,s.jsx)(n.code,{children:"em"})," units for media query usage to meet the best overall browser support. Read ",(0,s.jsx)(n.a,{href:"/uilib/usage/best-practices/for-styling#units",children:"more about units"}),"."]}),"\n",(0,s.jsx)(n.h2,{children:"How to deal with Jest"}),"\n",(0,s.jsxs)(n.p,{children:["You can mock ",(0,s.jsx)(n.code,{children:"window.matchMedia"})," with e.g. ",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/jest-matchmedia-mock",children:"jest-matchmedia-mock"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import MatchMediaMock from 'jest-matchmedia-mock'\n\nconst matchMedia = new MatchMediaMock()\n\nit('your test', () => {\n  matchMedia.useMediaQuery('(min-width: 40em) and (max-width: 60em)')\n  ...\n})\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(t,e)})):t(e)}},84285:function(e,n,i){i.r(n),i.d(n,{AllComponentsHorizontalTestCase:function(){return D},AllComponentsVerticalLabelsTestCase:function(){return W},AllComponentsVerticalTestCase:function(){return G},FormSetAlternativeAfter:function(){return L},FormSetAlternativeBefore:function(){return N},FormSetAlternativeForms:function(){return P},HorizontalFlexItemResponsiveSize:function(){return T},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return z},LayoutComponents:function(){return Z},MediaQueryLiveExample:function(){return q},MediaQueryUseMedia:function(){return E},ResponsiveGridContainer:function(){return H},colors:function(){return R}});var s=i(2784),r=i(44464),l=i(35235),t=i(80215),a=i(3805),d=i(96844),o=i(75511),c=i(469),m=i(25807),h=i(71618),u=i(72151),x=i(20167),j=i(35944),p=i(55904),g=i(16353),b=i(65714),y=i(89751),f=i(38644),w=i(33232),S=i(86300),M=i(99210),v=i(67571),k=i(87682),F=i(81858),I=i(60131),C=i(44086),Q=i(52322);const Z=()=>(0,Q.jsx)(r.Z,{scope:{Field:w,Form:S},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),R=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],T=()=>(0,Q.jsx)(r.Z,{scope:{colors:R,TestElement:M.Z},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),z=()=>(0,Q.jsx)(r.Z,{hideCode:!0,scope:{colors:R,TestElement:M.Z,Field:w,defaultBreakpoints:v.R1,defaultQueries:k.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),B=()=>{const[e,n]=s.useState("undefined"!=typeof window?window.innerWidth:0);return s.useEffect((()=>{const e=()=>{n(window.innerWidth)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),{innerWidth:e}},E=()=>(0,Q.jsx)(r.Z,{scope:{useMedia:k.Z,useWindowWidth:B},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),q=()=>(0,Q.jsx)(r.Z,{scope:{MediaQuery:l.Z,useMediaQuery:F.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),H=()=>(0,Q.jsx)(r.Z,{hideCode:!0,scope:{TestElement:M.Z,colors:R},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),N=()=>(0,Q.jsx)(r.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),L=()=>(0,Q.jsx)(r.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),P=()=>(0,Q.jsx)(r.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),A=function(e){let{direction:n="vertical",showText:i=!1,hideLabel:s=!1}=void 0===e?{}:e;const r={left:"horizontal"===n?"small":null,top:"horizontal"!==n?"small":null};let l={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};s&&(l=Object.entries(l).reduce(((e,n)=>{let[i]=n;return e[i]="",e}),{}));const w=()=>(0,Q.jsxs)(Q.Fragment,{children:[i&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(t.Z,{...r,inline:!0,children:(0,Q.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,Q.jsx)(a.Z,{icon:"bell",size:"medium",...r,style:{margin:0}})]})}),"text"]}),(0,Q.jsx)(d.Z,{text:"Button",...r}),(0,Q.jsx)(d.Z,{icon:"add",...r}),(0,Q.jsx)(o.ZP,{label:l.input,...r}),(0,Q.jsx)(c.Z,{label:l.dropdown,data:["Item A","Item B","Item C"],...r}),(0,Q.jsx)(m.Z,{label:l.autocomplete,data:["Item A","Item B","Item C"],...r}),(0,Q.jsx)(h.Z,{label:l.datePicker,...r}),(0,Q.jsx)(a.Z,{icon:"bell",size:"medium",...r}),(0,Q.jsx)(u.Z,{label:l.checkbox,...r}),(0,Q.jsx)(x.Z,{label:l.radio,...r}),(0,Q.jsxs)(x.Z.Group,{label:l.radioGroup,...r,children:[(0,Q.jsx)(x.Z,{label:l.radio,value:"a"}),(0,Q.jsx)(x.Z,{label:l.radio,value:"b"})]}),(0,Q.jsx)(j.Z,{label:l.toggleButton,text:"Toggle",...r}),(0,Q.jsxs)(j.Z.Group,{label:l.toggleButtonGroup,...r,children:[(0,Q.jsx)(j.Z,{text:"Toggle A",value:"a"}),(0,Q.jsx)(j.Z,{text:"Toggle B",value:"b"})]}),(0,Q.jsx)(p.Z,{label:l.switch,...r}),(0,Q.jsx)(g.Z,{label:l.textarea,rows:"5",...r}),(0,Q.jsx)("div",{style:{display:"inline-flex"},children:(0,Q.jsx)(b.Z,{label:l.slider,value:50,...r})})]});return"horizontal"===n?(0,Q.jsx)(y.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,Q.jsx)(w,{})}):(w._supportsSpacingProps=!0,(0,Q.jsx)(f.Z,{style:{padding:"1rem"},children:(0,Q.jsx)(w,{})}))},G=e=>(0,Q.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...e,children:(0,Q.jsx)(A,{direction:"vertical"})}),W=e=>(0,Q.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...e,children:(0,Q.jsx)(I.Z,{formElement:{label_direction:"vertical"},children:(0,Q.jsx)(A,{direction:"vertical"})})}),D=e=>(0,Q.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...e,children:(0,Q.jsx)(C.Z,{children:(0,Q.jsx)(A,{direction:"horizontal"})})})},99210:function(e,n,i){i.d(n,{Z:function(){return a}});var s=i(72779),r=i.n(s),l=i(80215),t=i(52322);function a(e){let{className:n=null,...i}=e;return(0,t.jsx)(l.Z,{className:r()("dnb-forms-test-element",n),...i})}a._supportsSpacingProps=!0}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-media-queries-mdx-d9de2b745eccc27df610.js.map