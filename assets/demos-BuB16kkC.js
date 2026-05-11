import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{M as t,ot as n,t as r}from"./ComponentBox-xW2kV1s2.js";import{$n as i,Lr as a}from"./index-DVm0MbGb.js";var o=e(),s=()=>(0,o.jsx)(r,{"data-visual-test":`slider-default`,children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Default Slider"
  numberFormat={{
    currency: 'EUR',
  }}
  onChange={({ value }) => console.log('onChange:', value)}
/>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`slider-multi`,scope:{formatPercent:i},children:`<Flex.Vertical align="stretch">
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
`}),l=()=>(0,o.jsx)(r,{children:`<Flex.Vertical align="stretch">
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
`}),u=()=>(0,o.jsx)(r,{scope:{formatCurrency:n},noInline:!0,children:`const Component = () => {
  const [value, setValue] = useState(70)
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
`}),d=()=>(0,o.jsx)(r,{children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Slider with suffix"
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`slider-vertical`,noInline:!0,children:`const VerticalWrapper = styled.div\`
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
`}),p=()=>(0,o.jsx)(r,{"data-visual-test":`slider-marker`,scope:{SliderMarker:t},children:`<Slider
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
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...a(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Default Slider`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Slider with multiple thumb buttons`}),`
`,(0,o.jsxs)(t.p,{children:[`Provide the `,(0,o.jsx)(t.code,{children:`value`}),` property as an array with numbers. The `,(0,o.jsx)(t.code,{children:`onChange`}),` event will then also return the property `,(0,o.jsx)(t.code,{children:`value`}),` as an array. The `,(0,o.jsx)(t.code,{children:`+`}),` and `,(0,o.jsx)(t.code,{children:`-`}),` buttons will not be visible when when more than one thumb button is present.`]}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsxs)(t.p,{children:[`By default, the thumbs can swap positions. You can change that behavior with `,(0,o.jsx)(t.code,{children:`multiThumbBehavior`}),`.`]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Vertical slider with steps of 10`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal and vertical slider in sync with input field`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Slider with a suffix`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Slider with a marker`}),`
`,(0,o.jsxs)(t.p,{children:[`Marks a given point in the Slider with a small marker. If `,(0,o.jsx)(t.code,{children:`text`}),` property is provided to the `,(0,o.jsx)(t.code,{children:`marker`}),` object, it will be displayed in a tooltip.`]}),`
`,(0,o.jsx)(t.p,{children:`You can import the marker like so:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-ts`,children:`import { SliderMarker } from '@dnb/eufemia/components/Slider'
`})}),`
`,(0,o.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}export{h as default};