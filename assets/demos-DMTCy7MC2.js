import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-C64JNWnl.js";import{n as i}from"./GlobalError-C9YQlCvR.js";import{Bi as a,Ir as o,Ki as s,Lr as c,Ui as l,xt as u,zi as d}from"./index-2AO2Cu5K.js";import{n as f,t as p}from"./Examples-BhV6cAY2.js";var m=e(t()),h=n();function g({rows:e=3,children:t=null,...n}){let r=(0,m.useMemo)(()=>{let t=[70,80,60,40,50,20,0];return Array(Number(e)).fill(!0).map((e,n)=>{let r=n%t.length;return r===t.length-1&&t.concat(t.reverse()),t[r]})},[e]);return(0,h.jsxs)(`div`,{className:l(`dnb-skeleton__figure`,`dnb-skeleton__figure--show`),"aria-busy":!0,...n,children:[(0,h.jsx)(o,{element:`div`,bottom:`large`,className:l(`dnb-h--xx-large`,`dnb-skeleton`,`dnb-skeleton--shape`),"aria-hidden":!0,style:{width:`50%`},children:`‌`}),r.map((e,t)=>(0,h.jsx)(o,{element:`div`,top:`x-small`,className:l(`dnb-p`,`dnb-skeleton`,`dnb-skeleton--shape`),style:{width:`${e}%`},children:`‌`},t)),typeof t==`function`?t():t]})}var _=()=>(0,h.jsx)(r,{children:`<Input label="Input" skeleton />
`}),v=()=>(0,h.jsx)(r,{"data-visual-test":`skeleton-exclude`,noInline:!0,children:`const UserData = () => {
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
`}),y=()=>(0,h.jsx)(r,{children:`<Skeleton show>
  <H2 top bottom>
    Heading
  </H2>
  <P top bottom>
    Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
  </P>
  <Button>Button</Button>
</Skeleton>
`}),b=()=>(0,h.jsx)(r,{children:`<Provider skeleton={true}>
  <H2 top bottom>
    Heading
  </H2>
  <P top bottom>
    Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
  </P>
  <Button>Button</Button>
</Provider>
`}),x=()=>(0,h.jsx)(r,{scope:{Article:g},"data-visual-test":`skeleton-figure-article`,children:`<Skeleton show figure={<Article rows={5} />}>
  hidden content
</Skeleton>
`}),S=()=>(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{show:!0,noAnimation:!0,children:(0,h.jsx)(p,{"data-visual-test":`skeleton-all-horizontal`})}),(0,h.jsx)(i,{show:!0,noAnimation:!0,children:(0,h.jsx)(f,{"data-visual-test":`skeleton-all-vertical`})})]}),C=()=>(0,h.jsx)(r,{hidePreview:!0,children:`<Div id="your-app">
  <Skeleton show={true}>
    <Input>I'm hidden behind the skeleton</Input>
    <Input>I'm hidden behind the skeleton</Input>
  </Skeleton>
</Div>
`}),w=()=>(0,h.jsx)(r,{hidePreview:!0,children:`<Provider locale="nb-NO">
  <Div id="your-app">
    <Provider skeleton={true}>
      <Input>I'm hidden behind the skeleton</Input>
      <Input>I'm hidden behind the skeleton</Input>
    </Provider>
  </Div>
</Provider>
`}),T=()=>(0,h.jsx)(r,{hidePreview:!0,children:`<Skeleton show={true}>
  <Input>I'm hidden behind the skeleton</Input>

  <Skeleton.Exclude>
    <Input>I'm NOT hidden</Input>
  </Skeleton.Exclude>
</Skeleton>
`}),E=()=>(0,h.jsx)(r,{scope:{Suspense:m.Suspense},hidePreview:!0,hideToolbar:!0,children:`<Suspense
  fallback={
    <Skeleton show={true}>
      <Div id="user-data" />
    </Skeleton>
  }
>
  <Div id="user-data" />
</Suspense>
`}),D=()=>(0,h.jsx)(r,{hidePreview:!0,hideToolbar:!0,scope:{skeletonDOMAttributes:a,createSkeletonClass:d,Context:s},noInline:!0,children:`function Component({ skeleton = false, ...params } = {}) {
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
`});function O(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...c(),...e.components},{VisibleWhenVisualTest:n}=t;return n||A(`VisibleWhenVisualTest`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(u,{}),`
`,(0,h.jsx)(t.h2,{children:`Input with Skeleton`}),`
`,(0,h.jsx)(_,{}),`
`,(0,h.jsx)(t.h2,{children:`Toggle skeleton on/off`}),`
`,(0,h.jsx)(v,{}),`
`,(0,h.jsx)(t.h2,{children:`Skeleton wrapper`}),`
`,(0,h.jsx)(y,{}),`
`,(0,h.jsx)(t.h2,{children:`Skeleton using Eufemia Provider`}),`
`,(0,h.jsxs)(t.p,{children:[`You can also use `,(0,h.jsx)(t.code,{children:`formElement={{ skeleton: true }}`}),`.`]}),`
`,(0,h.jsx)(b,{}),`
`,(0,h.jsx)(t.h2,{children:`Skeleton figures`}),`
`,(0,h.jsx)(t.p,{children:`You may import a given figure, or create your own.`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-jsx`,children:`import { Article } from '@dnb/eufemia/components/skeleton/figures'
`})}),`
`,(0,h.jsx)(x,{}),`
`,(0,h.jsx)(n,{children:(0,h.jsx)(S,{})})]})}function k(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{E as a,k as default,C as i,T as n,w as r,D as t};