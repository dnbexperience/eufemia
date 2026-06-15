import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{Q as r}from"./Anchor-Djq5YQEM.js";import{c as i,s as a}from"./SpacingUtils-Bm89tB4W.js";import{n as o,r as s,t as c}from"./withComponentMarkers-MtpU7Mly.js";import{t as l}from"./Element-BSZkZfrj.js";import{t as u}from"./Space-DPPzdYJF.js";import{t as d}from"./Button-DwQUlfj-.js";import{M as f}from"./Autocomplete-Bbkxjf2i.js";import{t as p}from"./P-C9wBv35m.js";import{t as m}from"./H2-Dw1W-git.js";import{t as h}from"./Paragraph-4LlB0HbK.js";import{t as g}from"./ToggleButton-_NsXxiTa.js";import{K as _,M as v,N as y,c as b}from"./index-ppRu2ktv.js";import{t as x}from"./ComponentBox-R2c6Bo76.js";import{n as S,t as C}from"./Examples-CFBFmyvK.js";var w=t(n());function T({ref:e,...t}){return(0,w.jsx)(l,{as:`div`,skeletonMethod:`shape`,ref:e,...t})}c(T,{_supportsSpacingProps:!0});var E=T,D=t(e());function O({rows:e=3,children:t=null,...n}){let r=(0,D.useMemo)(()=>{let t=[70,80,60,40,50,20,0];return Array.from({length:Number(e)},(e,n)=>{let r=n%t.length;return r===t.length-1&&t.reverse(),t[r]})},[e]);return(0,w.jsxs)(`div`,{className:a(`dnb-skeleton__figure`,`dnb-skeleton__figure--show`),"aria-busy":!0,...n,children:[(0,w.jsx)(u,{element:`div`,bottom:`large`,className:a(`dnb-h--xx-large`,`dnb-skeleton`,`dnb-skeleton--shape`),"aria-hidden":!0,style:{width:`50%`},children:`‌`}),r.map((e,t)=>(0,w.jsx)(u,{element:`div`,top:`x-small`,className:a(`dnb-p`,`dnb-skeleton`,`dnb-skeleton--shape`),style:{width:`${e}%`},children:`‌`},t)),typeof t==`function`?t():t]})}var k=()=>(0,w.jsx)(x,{stableName:`SkeletonInputExample`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Input:f},children:`<Input label="Input" skeleton />
`}),A=()=>(0,w.jsx)(x,{"data-visual-test":`skeleton-exclude`,stableName:`SkeletonToggleExample`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Skeleton:y,H2:m,Heading:v,P:p,Paragraph:h,Input:f,ToggleButton:g},noInline:!0,children:`const UserData = () => {
  const [state, setState] = useState(true)
  return (
    <Skeleton show={state}>
      <H2 top bottom>
        Heading
      </H2>
      <P top bottom>
        Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
      </P>
      <Input label="Input" />
      <Skeleton.Exclude>
        <ToggleButton
          checked={state}
          onChange={({ checked }) => setState(checked)}
          top="large"
        >
          Toggle
        </ToggleButton>
      </Skeleton.Exclude>
    </Skeleton>
  )
}
render(<UserData />)
`}),j=()=>(0,w.jsx)(x,{stableName:`SkeletonWrapperExample`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Skeleton:y,H2:m,Heading:v,P:p,Paragraph:h,Button:d},children:`<Skeleton show>
  <H2 top bottom>
    Heading
  </H2>
  <P top bottom>
    Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
  </P>
  <Button>Button</Button>
</Skeleton>
`}),M=()=>(0,w.jsx)(x,{stableName:`SkeletonEufemiaProviderExample`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Provider:r,H2:m,Heading:v,P:p,Paragraph:h,Button:d},children:`<Provider skeleton={true}>
  <H2 top bottom>
    Heading
  </H2>
  <P top bottom>
    Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
  </P>
  <Button>Button</Button>
</Provider>
`}),N=()=>(0,w.jsx)(x,{scope:{Article:O},"data-visual-test":`skeleton-figure-article`,stableName:`SkeletonFiguresExample`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Skeleton:y},children:`<Skeleton show figure={<Article rows={5} />}>
  hidden content
</Skeleton>
`}),P=()=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(y,{show:!0,noAnimation:!0,children:(0,w.jsx)(C,{"data-visual-test":`skeleton-all-horizontal`})}),(0,w.jsx)(y,{show:!0,noAnimation:!0,children:(0,w.jsx)(S,{"data-visual-test":`skeleton-all-vertical`})})]}),F=()=>(0,w.jsx)(x,{hidePreview:!0,stableName:`SkeletonInfoProvider`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Div:E,Skeleton:y,Input:f},children:`<Div id="your-app">
  <Skeleton show={true}>
    <Input>I'm hidden behind the skeleton</Input>
    <Input>I'm hidden behind the skeleton</Input>
  </Skeleton>
</Div>
`}),I=()=>(0,w.jsx)(x,{hidePreview:!0,stableName:`SkeletonInfoGlobalProvider`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Provider:r,Div:E,Input:f},children:`<Provider locale="nb-NO">
  <Div id="your-app">
    <Provider skeleton={true}>
      <Input>I'm hidden behind the skeleton</Input>
      <Input>I'm hidden behind the skeleton</Input>
    </Provider>
  </Div>
</Provider>
`}),L=()=>(0,w.jsx)(x,{hidePreview:!0,stableName:`SkeletonInfoExclude`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Skeleton:y,Input:f},children:`<Skeleton show={true}>
  <Input>I'm hidden behind the skeleton</Input>

  <Skeleton.Exclude>
    <Input>I'm NOT hidden</Input>
  </Skeleton.Exclude>
</Skeleton>
`}),R=()=>(0,w.jsx)(x,{scope:{Suspense:D.Suspense},hidePreview:!0,hideToolbar:!0,stableName:`SkeletonInfoSuspense`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],__buildScope:{Skeleton:y,Div:E},children:`<Suspense
  fallback={
    <Skeleton show={true}>
      <Div id="user-data" />
    </Skeleton>
  }
>
  <Div id="user-data" />
</Suspense>
`}),z=()=>(0,w.jsx)(x,{hidePreview:!0,hideToolbar:!0,scope:{skeletonDOMAttributes:s,createSkeletonClass:o,Context:i},stableName:`SkeletonInfoCustom`,sourceImports:[`import { Suspense, useContext, useState } from 'react'`,`import Context from '@dnb/eufemia/shared/Context'`,`import { Input, H2, P, Button, Skeleton, ToggleButton, Div } from '@dnb/eufemia'`,`import { AllComponentsHorizontalTestCase, AllComponentsVerticalLabelsTestCase } from '../../layout/Examples'`,`import Provider from '@dnb/eufemia/shared/Provider'`,`import { Article } from '@dnb/eufemia/components/skeleton/figures'`,`import { createSkeletonClass, skeletonDOMAttributes } from '@dnb/eufemia/components/skeleton/SkeletonHelper'`],noInline:!0,children:`function Component({ skeleton = false, ...params } = {}) {
  const context = useContext(Context)

  // Handle accessibility features
  skeletonDOMAttributes(params, skeleton, context)

  // Handle CSS classes – use either "shape" or "font"
  const className = createSkeletonClass('font', skeleton, context)
  return (
    <div {...params} id="my-component" className={className}>
      Hello World
    </div>
  )
}
render(<Component />)
`});function B(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,..._(),...e.components},{VisibleWhenVisualTest:n}=t;return n||H(`VisibleWhenVisualTest`,!0),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(t.h2,{children:`Demos`}),`
`,(0,w.jsx)(b,{}),`
`,(0,w.jsx)(t.h2,{children:`Input with Skeleton`}),`
`,(0,w.jsx)(k,{}),`
`,(0,w.jsx)(t.h2,{children:`Toggle skeleton on/off`}),`
`,(0,w.jsx)(A,{}),`
`,(0,w.jsx)(t.h2,{children:`Skeleton wrapper`}),`
`,(0,w.jsx)(j,{}),`
`,(0,w.jsx)(t.h2,{children:`Skeleton using Eufemia Provider`}),`
`,(0,w.jsxs)(t.p,{children:[`You can also use `,(0,w.jsx)(t.code,{children:`formElement={{ skeleton: true }}`}),`.`]}),`
`,(0,w.jsx)(M,{}),`
`,(0,w.jsx)(t.h2,{children:`Skeleton figures`}),`
`,(0,w.jsx)(t.p,{children:`You may import a given figure, or create your own.`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Article } from '@dnb/eufemia/components/skeleton/figures'
`})}),`
`,(0,w.jsx)(N,{}),`
`,(0,w.jsx)(n,{children:(0,w.jsx)(P,{})})]})}function V(e={}){let{wrapper:t}={..._(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(B,{...e})}):B(e)}function H(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{R as a,V as default,F as i,L as n,I as r,z as t};