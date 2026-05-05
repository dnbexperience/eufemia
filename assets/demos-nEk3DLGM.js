import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i}from"./index-CMgyXmp3.js";e();var a=t(),o=i.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`,s=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`heading-default`,children:`<Heading.Level debug reset={1}>
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
`})}),c=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`heading-context`,children:`<Heading.Level debug reset={1}>
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
`})}),l=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{noInline:!0,children:`const App = () => {
  const [showHeading, setShowHeading] = React.useState(false)
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
`})}),u=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`heading-mixin`,children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="use">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
`})}),d=()=>(0,a.jsx)(n,{hidePreview:!0,children:`<Heading.Level reset={1}>
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
`}),f=()=>(0,a.jsx)(n,{hidePreview:!0,children:`<Heading.Level reset={2}>
  <Heading increase size="xx-large">
    h3, but looks like h1
  </Heading>
</Heading.Level>
`}),p=()=>(0,a.jsx)(n,{hidePreview:!0,children:`<Heading.Level reset={1}>
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
`}),m=()=>(0,a.jsx)(n,{hidePreview:!0,children:`<article>
  <H1 size="large">h1</H1>
  <H2 size="xx-large">h2</H2>
</article>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...r(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:`NB:`}),` All the demos do use `,(0,a.jsx)(t.code,{children:`<Heading.Level reset={1} ...`}),`. This way every demo does reset the global level handling. You do not need that in your app.`]}),`
`,(0,a.jsx)(t.h3,{children:`Default headings`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Heading level context`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Level isolation`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Combine with manual heading`}),`
`,(0,a.jsx)(u,{})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}export{g as default,f as i,m as n,p as r,d as t};