import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Gt as n,Jt as r,Kt as i,Lr as a,Xt as o,Yt as s,qt as c,x as l}from"./index-DVm0MbGb.js";var u=e();function d(e){switch(e?.name){case`sbanken`:return s;case`carnegie`:return n;case`eiendom`:return c;default:return i}}var f=()=>(0,u.jsx)(t,{scope:{DnbDefault:i,SbankenCompact:r,SbankenDefault:s,SbankenHorizontal:o,CarnegieDefault:n,EiendomDefault:c},"data-visual-test":`logo-all`,children:`<Flex.Vertical>
  <Logo height="48" svg={DnbDefault} />
  <Logo height="48" svg={EiendomDefault} />
  <Logo height="48" svg={CarnegieDefault} />
  <Logo height="48" svg={SbankenDefault} />
  <Logo height="48" svg={SbankenHorizontal} />
  <Logo height="48" svg={SbankenCompact} />
</Flex.Vertical>
`}),p=()=>(0,u.jsx)(t,{"data-visual-test":`logo-default`,children:`<Logo height="96" />
`}),m=()=>(0,u.jsx)(t,{scope:{myLogoSelector:d},"data-visual-test":`logo-auto-size`,children:`<span
  style={{
    fontSize: '6rem',
  }}
>
  <Logo svg={myLogoSelector} />
</span>
`}),h=()=>(0,u.jsx)(t,{scope:{myLogoSelector:d},"data-visual-test":`logo-inherit-size`,children:`<span
  style={{
    height: '6rem',
  }}
>
  <Logo inheritSize svg={myLogoSelector} />
</span>
`}),g=()=>(0,u.jsx)(t,{scope:{myLogoSelector:d},"data-visual-test":`logo-color`,children:`<Flex.Vertical>
  <span
    style={{
      color: 'tomato',
    }}
  >
    <Logo height="96" inheritColor svg={myLogoSelector} />
  </span>

  <Logo height="96" color="hotpink" svg={myLogoSelector} />
</Flex.Vertical>
`}),_=()=>(0,u.jsx)(t,{scope:{MyThemeSelector:l,myLogoSelector:d,SbankenDefault:s,CarnegieDefault:n,EiendomDefault:c,DnbDefault:i},"data-visual-test":`logo-theme-change`,noInline:!0,children:`function myLogoSelector(theme: ThemeProps) {
  switch (theme?.name) {
    case 'sbanken':
      return SbankenDefault
    case 'carnegie':
      return CarnegieDefault
    case 'eiendom':
      return EiendomDefault
    default:
      return DnbDefault
  }
}
function MyApp() {
  return (
    <Card stack>
      <MyThemeSelector />
      <Logo height="96" svg={myLogoSelector} />
    </Card>
  )
}
render(<MyApp />)
`}),v=()=>(0,u.jsx)(t,{"data-visual-test":`logo-fixed`,scope:{myLogoSelector:d},children:`<Flex.Vertical>
  <Logo height="96" svg={myLogoSelector} />
  <Logo width="96" svg={myLogoSelector} />
</Flex.Vertical>
`}),y=()=>(0,u.jsx)(t,{"data-visual-test":`logo-in-text`,scope:{myLogoSelector:d},children:`<P>
  This logo is in the middle <Logo svg={myLogoSelector} /> of some text.
</P>
`});function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return n||S(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Importing a logo`}),`
`,(0,u.jsxs)(t.p,{children:[`To use a logo, the svg must be imported and handed to the `,(0,u.jsx)(t.code,{children:`Logo`}),` components through the `,(0,u.jsx)(t.code,{children:`svg`}),` property.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-jsx`,children:`import {
  DnbDefault,
  CarnegieDefault,
  EiendomDefault,
  SbankenDefault,
  SbankenHorizontal,
  SbankenCompact,
} from '@dnb/eufemia/components/Logo'
`})}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsxs)(t.p,{children:[`If no svg is provided, the `,(0,u.jsx)(t.code,{children:`DnbDefault`}),` logo is used by default:`]}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Change logo based on theme`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`svg`}),` property can also accept a function that returns a logo svg based on the current `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`theme`}),` props.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import type { ThemeProps } from '@dnb/eufemia/shared/Theme'
`})}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`Customization`}),`
`,(0,u.jsx)(t.h4,{children:`Default inherited height`}),`
`,(0,u.jsxs)(t.p,{children:[`By default the logo will use the inherited `,(0,u.jsx)(t.code,{children:`font-size`}),` to set its height.`]}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h4,{children:`Alternative inherited height`}),`
`,(0,u.jsxs)(t.p,{children:[`You can chose to let the height be set by the inherited `,(0,u.jsx)(t.code,{children:`height`}),` instead by setting the `,(0,u.jsx)(t.code,{children:`inheritSize`}),` property.`]}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h4,{children:`Fixed height and/or width`}),`
`,(0,u.jsxs)(t.p,{children:[`The logo's `,(0,u.jsx)(t.code,{children:`height`}),` and `,(0,u.jsx)(t.code,{children:`width`}),` can be fixed depending on your needs.`]}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h4,{children:`Color`}),`
`,(0,u.jsxs)(t.p,{children:[`You can choose to override the default colors by either inheriting the `,(0,u.jsx)(t.code,{children:`currentcolor`}),`, or set it directly.`]}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(n,{children:(0,u.jsx)(y,{})})]})}function x(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};