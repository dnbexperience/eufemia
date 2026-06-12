import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./P-D0SeNBSG.js";import{c as r}from"./ToggleButton-T4E3Coih.js";import{t as i}from"./Card-Dsou21Li.js";import{C as a,D as o,E as s,K as c,O as l,T as u,g as d,k as f,w as p}from"./index-CsG353ar.js";import{t as m}from"./ComponentBox-Cb1rLw_D.js";var h=e(t());function g(e){switch(e?.name){case`sbanken`:return l;case`carnegie`:return p;case`eiendom`:return s;default:return u}}var _=()=>(0,h.jsx)(m,{scope:{DnbDefault:u,SbankenCompact:o,SbankenDefault:l,SbankenHorizontal:f,CarnegieDefault:p,EiendomDefault:s},"data-visual-test":`logo-all`,stableName:`LogoAllExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Flex:r,Logo:a},children:`<Flex.Vertical>
  <Logo height="48" svg={DnbDefault} />
  <Logo height="48" svg={EiendomDefault} />
  <Logo height="48" svg={CarnegieDefault} />
  <Logo height="48" svg={SbankenDefault} />
  <Logo height="48" svg={SbankenHorizontal} />
  <Logo height="48" svg={SbankenCompact} />
</Flex.Vertical>
`}),v=()=>(0,h.jsx)(m,{"data-visual-test":`logo-default`,stableName:`LogoDefaultExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Logo:a},children:`<Logo height="96" />
`}),y=()=>(0,h.jsx)(m,{scope:{myLogoSelector:g},"data-visual-test":`logo-auto-size`,stableName:`LogoInheritFontSizeExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Logo:a},children:`<span
  style={{
    fontSize: '6rem',
  }}
>
  <Logo svg={myLogoSelector} />
</span>
`}),b=()=>(0,h.jsx)(m,{scope:{myLogoSelector:g},"data-visual-test":`logo-inherit-size`,stableName:`LogoInheritHeightExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Logo:a},children:`<span
  style={{
    height: '6rem',
  }}
>
  <Logo inheritSize svg={myLogoSelector} />
</span>
`}),x=()=>(0,h.jsx)(m,{scope:{myLogoSelector:g},"data-visual-test":`logo-color`,stableName:`LogoColorExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Flex:r,Logo:a},children:`<Flex.Vertical>
  <span
    style={{
      color: 'tomato',
    }}
  >
    <Logo height="96" inheritColor svg={myLogoSelector} />
  </span>

  <Logo height="96" color="hotpink" svg={myLogoSelector} />
</Flex.Vertical>
`}),S=()=>(0,h.jsx)(m,{scope:{MyThemeSelector:d,myLogoSelector:g,SbankenDefault:l,CarnegieDefault:p,EiendomDefault:s,DnbDefault:u},"data-visual-test":`logo-theme-change`,stableName:`LogoChangeExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Card:i,Logo:a},noInline:!0,children:`function myLogoSelector(theme: ThemeProps) {
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
`}),C=()=>(0,h.jsx)(m,{"data-visual-test":`logo-fixed`,scope:{myLogoSelector:g},stableName:`LogoFixedSizeExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{Flex:r,Logo:a},children:`<Flex.Vertical>
  <Logo height="96" svg={myLogoSelector} />
  <Logo width="96" svg={myLogoSelector} />
</Flex.Vertical>
`}),w=()=>(0,h.jsx)(m,{"data-visual-test":`logo-in-text`,scope:{myLogoSelector:g},stableName:`LogoInTextExample`,sourceImports:[`import { Card, Logo, Flex, P } from '@dnb/eufemia'`,`import { DnbDefault, SbankenCompact, SbankenDefault, SbankenHorizontal, CarnegieDefault, EiendomDefault } from '@dnb/eufemia/components/Logo'`,`import MyThemeSelector from '../../../../core/ChangeStyleTheme'`,`import { ThemeProps } from '@dnb/eufemia/shared/Theme'`],__buildScope:{P:n,Logo:a},children:`<P>
  This logo is in the middle <Logo svg={myLogoSelector} /> of some text.
</P>
`});function T(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...c(),...e.components},{VisibleWhenVisualTest:n}=t;return n||D(`VisibleWhenVisualTest`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Importing a logo`}),`
`,(0,h.jsxs)(t.p,{children:[`To use a logo, the svg must be imported and handed to the `,(0,h.jsx)(t.code,{children:`Logo`}),` components through the `,(0,h.jsx)(t.code,{children:`svg`}),` property.`]}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-jsx`,children:`import {
  DnbDefault,
  CarnegieDefault,
  EiendomDefault,
  SbankenDefault,
  SbankenHorizontal,
  SbankenCompact,
} from '@dnb/eufemia/components/Logo'
`})}),`
`,(0,h.jsx)(_,{}),`
`,(0,h.jsxs)(t.p,{children:[`If no svg is provided, the `,(0,h.jsx)(t.code,{children:`DnbDefault`}),` logo is used by default:`]}),`
`,(0,h.jsx)(v,{}),`
`,(0,h.jsx)(t.h3,{children:`Change logo based on theme`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`svg`}),` property can also accept a function that returns a logo svg based on the current `,(0,h.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`theme`}),` props.`]}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`import type { ThemeProps } from '@dnb/eufemia/shared/Theme'
`})}),`
`,(0,h.jsx)(S,{}),`
`,(0,h.jsx)(t.h3,{children:`Customization`}),`
`,(0,h.jsx)(t.h4,{children:`Default inherited height`}),`
`,(0,h.jsxs)(t.p,{children:[`By default the logo will use the inherited `,(0,h.jsx)(t.code,{children:`font-size`}),` to set its height.`]}),`
`,(0,h.jsx)(y,{}),`
`,(0,h.jsx)(t.h4,{children:`Alternative inherited height`}),`
`,(0,h.jsxs)(t.p,{children:[`You can chose to let the height be set by the inherited `,(0,h.jsx)(t.code,{children:`height`}),` instead by setting the `,(0,h.jsx)(t.code,{children:`inheritSize`}),` property.`]}),`
`,(0,h.jsx)(b,{}),`
`,(0,h.jsx)(t.h4,{children:`Fixed height and/or width`}),`
`,(0,h.jsxs)(t.p,{children:[`The logo's `,(0,h.jsx)(t.code,{children:`height`}),` and `,(0,h.jsx)(t.code,{children:`width`}),` can be fixed depending on your needs.`]}),`
`,(0,h.jsx)(C,{}),`
`,(0,h.jsx)(t.h4,{children:`Color`}),`
`,(0,h.jsxs)(t.p,{children:[`You can choose to override the default colors by either inheriting the `,(0,h.jsx)(t.code,{children:`currentcolor`}),`, or set it directly.`]}),`
`,(0,h.jsx)(x,{}),`
`,(0,h.jsx)(n,{children:(0,h.jsx)(w,{})})]})}function E(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(T,{...e})}):T(e)}function D(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{E as default};