import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{Jt as r,Qt as i,Xt as a,Yt as o,Zt as s,qt as c,x as l,zr as u}from"./index-DqqByKA2.js";var d=e(t());function f(e){switch(e?.name){case`sbanken`:return s;case`carnegie`:return c;case`eiendom`:return o;default:return r}}var p=()=>(0,d.jsx)(n,{scope:{DnbDefault:r,SbankenCompact:a,SbankenDefault:s,SbankenHorizontal:i,CarnegieDefault:c,EiendomDefault:o},"data-visual-test":`logo-all`,stableName:`LogoAllExample`,children:`<Flex.Vertical>
  <Logo height="48" svg={DnbDefault} />
  <Logo height="48" svg={EiendomDefault} />
  <Logo height="48" svg={CarnegieDefault} />
  <Logo height="48" svg={SbankenDefault} />
  <Logo height="48" svg={SbankenHorizontal} />
  <Logo height="48" svg={SbankenCompact} />
</Flex.Vertical>
`}),m=()=>(0,d.jsx)(n,{"data-visual-test":`logo-default`,stableName:`LogoDefaultExample`,children:`<Logo height="96" />
`}),h=()=>(0,d.jsx)(n,{scope:{myLogoSelector:f},"data-visual-test":`logo-auto-size`,stableName:`LogoInheritFontSizeExample`,children:`<span
  style={{
    fontSize: '6rem',
  }}
>
  <Logo svg={myLogoSelector} />
</span>
`}),g=()=>(0,d.jsx)(n,{scope:{myLogoSelector:f},"data-visual-test":`logo-inherit-size`,stableName:`LogoInheritHeightExample`,children:`<span
  style={{
    height: '6rem',
  }}
>
  <Logo inheritSize svg={myLogoSelector} />
</span>
`}),_=()=>(0,d.jsx)(n,{scope:{myLogoSelector:f},"data-visual-test":`logo-color`,stableName:`LogoColorExample`,children:`<Flex.Vertical>
  <span
    style={{
      color: 'tomato',
    }}
  >
    <Logo height="96" inheritColor svg={myLogoSelector} />
  </span>

  <Logo height="96" color="hotpink" svg={myLogoSelector} />
</Flex.Vertical>
`}),v=()=>(0,d.jsx)(n,{scope:{MyThemeSelector:l,myLogoSelector:f,SbankenDefault:s,CarnegieDefault:c,EiendomDefault:o,DnbDefault:r},"data-visual-test":`logo-theme-change`,stableName:`LogoChangeExample`,noInline:!0,children:`function myLogoSelector(theme: ThemeProps) {
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
`}),y=()=>(0,d.jsx)(n,{"data-visual-test":`logo-fixed`,scope:{myLogoSelector:f},stableName:`LogoFixedSizeExample`,children:`<Flex.Vertical>
  <Logo height="96" svg={myLogoSelector} />
  <Logo width="96" svg={myLogoSelector} />
</Flex.Vertical>
`}),b=()=>(0,d.jsx)(n,{"data-visual-test":`logo-in-text`,scope:{myLogoSelector:f},stableName:`LogoInTextExample`,children:`<P>
  This logo is in the middle <Logo svg={myLogoSelector} /> of some text.
</P>
`});function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return n||C(`VisibleWhenVisualTest`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Importing a logo`}),`
`,(0,d.jsxs)(t.p,{children:[`To use a logo, the svg must be imported and handed to the `,(0,d.jsx)(t.code,{children:`Logo`}),` components through the `,(0,d.jsx)(t.code,{children:`svg`}),` property.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-jsx`,children:`import {
  DnbDefault,
  CarnegieDefault,
  EiendomDefault,
  SbankenDefault,
  SbankenHorizontal,
  SbankenCompact,
} from '@dnb/eufemia/components/Logo'
`})}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsxs)(t.p,{children:[`If no svg is provided, the `,(0,d.jsx)(t.code,{children:`DnbDefault`}),` logo is used by default:`]}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Change logo based on theme`}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`svg`}),` property can also accept a function that returns a logo svg based on the current `,(0,d.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`theme`}),` props.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import type { ThemeProps } from '@dnb/eufemia/shared/Theme'
`})}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`Customization`}),`
`,(0,d.jsx)(t.h4,{children:`Default inherited height`}),`
`,(0,d.jsxs)(t.p,{children:[`By default the logo will use the inherited `,(0,d.jsx)(t.code,{children:`font-size`}),` to set its height.`]}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h4,{children:`Alternative inherited height`}),`
`,(0,d.jsxs)(t.p,{children:[`You can chose to let the height be set by the inherited `,(0,d.jsx)(t.code,{children:`height`}),` instead by setting the `,(0,d.jsx)(t.code,{children:`inheritSize`}),` property.`]}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h4,{children:`Fixed height and/or width`}),`
`,(0,d.jsxs)(t.p,{children:[`The logo's `,(0,d.jsx)(t.code,{children:`height`}),` and `,(0,d.jsx)(t.code,{children:`width`}),` can be fixed depending on your needs.`]}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h4,{children:`Color`}),`
`,(0,d.jsxs)(t.p,{children:[`You can choose to override the default colors by either inheriting the `,(0,d.jsx)(t.code,{children:`currentcolor`}),`, or set it directly.`]}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(n,{children:(0,d.jsx)(b,{})})]})}function S(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};