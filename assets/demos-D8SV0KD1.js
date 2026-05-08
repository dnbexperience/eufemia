import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n,Mt as r}from"./index-2AO2Cu5K.js";var i=e(),a=r.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`,o=()=>(0,i.jsx)(a,{children:(0,i.jsx)(t,{"data-visual-test":`heading-default`,children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>
  <Heading increase>h3</Heading>
  <Heading increase>h4</Heading>
  <Heading decrease>h3</Heading>
  <Heading level="2" size="x-large">
    h2
  </Heading>
  <Heading skipCorrection level={4}>
    h4
  </Heading>
</Heading.Level>
`})}),s=()=>(0,i.jsx)(a,{children:(0,i.jsx)(t,{"data-visual-test":`heading-context`,children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <Heading.Increase>
    <Heading>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Increase>

  <Heading inherit>h3</Heading>

  <Heading.Decrease inherit>
    <Heading>h2</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Decrease>
</Heading.Level>
`})}),c=()=>(0,i.jsx)(a,{children:(0,i.jsx)(t,{noInline:!0,children:`const App = () => {
  const [showHeading, setShowHeading] = useState(false)
  return (
    <Heading.Level debug reset={1}>
      <Heading>h1</Heading>
      <Heading>h2</Heading>

      <Heading.Increase>
        <ToggleButton
          text="Toggle h3"
          checked={showHeading}
          onChange={() => setShowHeading((c) => !c)}
        />
        {showHeading && (
          <>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
          </>
        )}
      </Heading.Increase>

      <Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </Heading.Level>
  )
}
render(<App />)
`})}),l=()=>(0,i.jsx)(a,{children:(0,i.jsx)(t,{"data-visual-test":`heading-mixin`,children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="use">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
`})}),u=()=>(0,i.jsx)(t,{hidePreview:!0,children:`<Heading.Level reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>
  <Heading increase>h3</Heading>
  <Heading>still h3</Heading>
  <Heading increase>h4</Heading>
  <Heading increase>h5</Heading>
  <Heading decrease>h4</Heading>
  <Heading level={2}>back to h2</Heading>
  <Heading increase>h3</Heading>
</Heading.Level>
`}),d=()=>(0,i.jsx)(t,{hidePreview:!0,children:`<Heading.Level reset={2}>
  <Heading increase size="xx-large">
    h3, but looks like h1
  </Heading>
</Heading.Level>
`}),f=()=>(0,i.jsx)(t,{hidePreview:!0,children:`<Heading.Level reset={1}>
  <Heading>h1</Heading>
  <Heading.Level level="2">
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>still h3</Heading>
    <Heading.Increase>
      <Heading>h4</Heading>
      <Heading>still h4</Heading>
    </Heading.Increase>
  </Heading.Level>
</Heading.Level>
`}),p=()=>(0,i.jsx)(t,{hidePreview:!0,children:`<article>
  <H1 size="large">h1</H1>
  <H2 size="xx-large">h2</H2>
</article>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` All the demos do use `,(0,i.jsx)(t.code,{children:`<Heading.Level reset={1} ...`}),`. This way every demo does reset the global level handling. You do not need that in your app.`]}),`
`,(0,i.jsx)(t.h3,{children:`Default headings`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Heading level context`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Level isolation`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`Combine with manual heading`}),`
`,(0,i.jsx)(l,{})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}export{h as default,d as i,p as n,f as r,u as t};