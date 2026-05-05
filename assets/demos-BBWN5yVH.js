import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{M as n,t as r,tt as i}from"./ComponentBox-geTEYZ7b.js";import{En as a,Rr as o}from"./index-CMgyXmp3.js";e();var s=t(),c=()=>(0,s.jsx)(r,{"data-visual-test":`slider-default`,children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Default Slider"
  numberFormat={{
    currency: 'EUR',
  }}
  onChange={({ value }) => console.log('onChange:', value)}
/>
`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`slider-multi`,scope:{formatPercent:a},children:`<Flex.Vertical align="stretch">
  <Slider
    min={0}
    max={100}
    value={[30, 70]}
    step={5}
    label="Range with steps"
    numberFormat={{
      currency: 'USD',
    }}
    tooltip
    onChange={({ value }) => console.log('onChange:', value)}
  />
  <Slider
    min={0}
    max={100}
    value={[10, 30, 50, 70]}
    label="Multi thumbs"
    numberFormat={(value) =>
      formatPercent(value, {
        decimals: 0,
      })
    }
    tooltip
    onChange={({ value, number }) =>
      console.log('onChange:', value, number)
    }
  />
</Flex.Vertical>
`}),u=()=>(0,s.jsx)(r,{children:`<Flex.Vertical align="stretch">
  <Slider
    multiThumbBehavior="omit"
    value={[30, 70]}
    label="Omit behavior"
    numberFormat={{
      currency: 'EUR',
    }}
    tooltip={true}
    onChange={({ value }) => console.log('onChange:', value)}
  />
  <Slider
    multiThumbBehavior="push"
    min={-40}
    value={[-10, 50, 70]}
    step={1}
    label="Push behavior"
    numberFormat={{
      currency: true,
    }}
    tooltip={true}
    onChange={({ value, number }) =>
      console.log('onChange:', value, number)
    }
  />
</Flex.Vertical>
`}),d=()=>(0,s.jsx)(r,{scope:{formatCurrency:i},noInline:!0,children:`const Component = () => {
  const [value, setValue] = React.useState(70)
  return (
    <>
      <Slider
        value={value}
        step={1}
        hideButtons
        label="Slider A"
        numberFormat={{
          currency: 'EUR',
        }}
        tooltip={true}
        onChange={({ value }) => setValue(parseFloat(String(value)))}
      />
      <VerticalWrapper>
        <Slider
          value={value}
          vertical={true}
          hideButtons={true}
          step={10}
          label="Slider B"
          numberFormat={(value) =>
            formatCurrency(value, {
              currency: 'NOK',
            })
          }
          tooltip
          alwaysShowTooltip
          onChange={({ value }) => setValue(Number(value))}
        />
        <Input
          align="center"
          selectAll
          value={String(value)}
          onChange={({ value }) => setValue(Number(value))}
        />
      </VerticalWrapper>
    </>
  )
}
const VerticalWrapper = styled.div\`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 20rem; /* max-height works fine except in Safari */
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-lavender);
  border: 1px solid var(--color-black-20);
  .dnb-input {
    width: 4rem;
    margin-top: 1rem;
  }
\`
render(<Component />)
`}),f=()=>(0,s.jsx)(r,{children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Slider with suffix"
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),p=()=>(0,s.jsx)(r,{"data-visual-test":`slider-vertical`,noInline:!0,children:`const VerticalWrapper = styled.div\`
  display: inline-flex;
  flex-direction: column;
  height: 12rem; /* max-height works fine except in Safari */
\`
render(
  <VerticalWrapper>
    <Slider
      min={0}
      max={100}
      value={20}
      step={10}
      vertical={true}
      label="Vertical slider"
      onChange={({ value }) => console.log('onChange:', value)}
    />
  </VerticalWrapper>
)
`}),m=()=>(0,s.jsx)(r,{"data-visual-test":`slider-marker`,scope:{SliderMarker:n},children:`<Slider
  min={0}
  max={100}
  value={50}
  extensions={{
    marker: {
      instance: SliderMarker,
      value: 20,
      text: 'Default value',
    },
  }}
  label="Slider with marker"
/>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...o(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Default Slider`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Slider with multiple thumb buttons`}),`
`,(0,s.jsxs)(t.p,{children:[`Provide the `,(0,s.jsx)(t.code,{children:`value`}),` property as an array with numbers. The `,(0,s.jsx)(t.code,{children:`onChange`}),` event will then also return the property `,(0,s.jsx)(t.code,{children:`value`}),` as an array. The `,(0,s.jsx)(t.code,{children:`+`}),` and `,(0,s.jsx)(t.code,{children:`-`}),` buttons will not be visible when when more than one thumb button is present.`]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsxs)(t.p,{children:[`By default, the thumbs can swap positions. You can change that behavior with `,(0,s.jsx)(t.code,{children:`multiThumbBehavior`}),`.`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Vertical slider with steps of 10`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal and vertical slider in sync with input field`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Slider with a suffix`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Slider with a marker`}),`
`,(0,s.jsxs)(t.p,{children:[`Marks a given point in the Slider with a small marker. If `,(0,s.jsx)(t.code,{children:`text`}),` property is provided to the `,(0,s.jsx)(t.code,{children:`marker`}),` object, it will be displayed in a tooltip.`]}),`
`,(0,s.jsx)(t.p,{children:`You can import the marker like so:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-ts`,children:`import { SliderMarker } from '@dnb/eufemia/components/Slider'
`})}),`
`,(0,s.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}export{g as default};