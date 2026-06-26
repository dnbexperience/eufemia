import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{s as n}from"./ToggleButton-DM984GyO.js";import{J as r,Vt as i,q as a}from"./forms-CFi5-4x5.js";import{F as o,p as s}from"./Autocomplete-CXBhPR3k.js";import{d as c,s as l}from"./Table-jVxPr22l.js";import{U as u}from"./index-kfZVC31v.js";import{t as d}from"./ComponentBox-qLaLt9T0.js";var f=e(t()),p=()=>(0,f.jsx)(d,{"data-visual-test":`slider-default`,stableName:`SliderExampleDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Slider:a},children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Default Slider"
  numberFormat={{
    currency: 'EUR',
  }}
  onChange={({ value }) => console.log('onChange:', value)}
/>
`}),m=()=>(0,f.jsx)(d,{"data-visual-test":`slider-multi`,scope:{formatPercent:s},stableName:`SliderExampleMultiButtons`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Flex:n,Slider:a},children:`<Flex.Vertical align="stretch">
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
`}),h=()=>(0,f.jsx)(d,{stableName:`SliderExampleMultiButtonsThumbBehavior`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Flex:n,Slider:a},children:`<Flex.Vertical align="stretch">
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
`}),g=()=>(0,f.jsx)(d,{scope:{formatCurrency:i},stableName:`SliderExampleHorizontalSync`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Slider:a,Input:o},noInline:!0,children:`const Component = () => {
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
`}),_=()=>(0,f.jsx)(d,{stableName:`SliderExampleSuffix`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Slider:a,HelpButton:l,Modal:c},children:`<Slider
  min={0}
  max={100}
  value={70}
  label="Slider with suffix"
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),v=()=>(0,f.jsx)(d,{"data-visual-test":`slider-vertical`,stableName:`SliderVerticalWithSteps`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Slider:a},noInline:!0,children:`const VerticalWrapper = styled.div\`
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
`}),y=()=>(0,f.jsx)(d,{"data-visual-test":`slider-marker`,scope:{SliderMarker:r},stableName:`SliderExampleMarker`,sourceImports:[`import styled from '@emotion/styled'`,`import { useState } from 'react'`,`import { formatCurrency, formatPercent } from '@dnb/eufemia/components/number-format/NumberUtils'`,`import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia'`,`import { SliderMarker } from '@dnb/eufemia/components/slider/Slider'`],__buildScope:{Slider:a},children:`<Slider
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
`});function b(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...u(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Default Slider`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Slider with multiple thumb buttons`}),`
`,(0,f.jsxs)(t.p,{children:[`Provide the `,(0,f.jsx)(t.code,{children:`value`}),` property as an array with numbers. The `,(0,f.jsx)(t.code,{children:`onChange`}),` event will then also return the property `,(0,f.jsx)(t.code,{children:`value`}),` as an array. The `,(0,f.jsx)(t.code,{children:`+`}),` and `,(0,f.jsx)(t.code,{children:`-`}),` buttons will not be visible when more than one thumb button is present.`]}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsxs)(t.p,{children:[`By default, the thumbs can swap positions. You can change that behavior with `,(0,f.jsx)(t.code,{children:`multiThumbBehavior`}),`.`]}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Vertical slider with steps of 10`}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(t.h3,{children:`Horizontal and vertical slider in sync with input field`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Slider with a suffix`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Slider with a marker`}),`
`,(0,f.jsxs)(t.p,{children:[`Marks a given point in the Slider with a small marker. If `,(0,f.jsx)(t.code,{children:`text`}),` property is provided to the `,(0,f.jsx)(t.code,{children:`marker`}),` object, it will be displayed in a tooltip.`]}),`
`,(0,f.jsx)(t.p,{children:`You can import the marker like so:`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-ts`,children:`import { SliderMarker } from '@dnb/eufemia/components/Slider'
`})}),`
`,(0,f.jsx)(y,{})]})}function x(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(b,{...e})}):b(e)}export{x as default};