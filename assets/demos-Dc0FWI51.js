import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r,et as i,g as a,tt as o}from"./Anchor-CgDcBCwP.js";import{t as s}from"./Icon-GRk_rbit.js";import{s as c}from"./ToggleButton-DM984GyO.js";import{t as l}from"./globe_medium-Do2UVffA.js";import{t as u}from"./Button-XQwxqpWO.js";import{t as d}from"./H3-E108ZQIf.js";import{t as f}from"./Card-Db-Q1D3Y.js";import{t as p}from"./DateFormat-CxxkWYs1.js";import{t as m}from"./export-2D5FXfgs.js";import{U as h}from"./index-kfZVC31v.js";import{t as g}from"./ComponentBox-qLaLt9T0.js";import{t as _}from"./Stat-CutpGv0c.js";var v=e({BasicUsage:()=>b,CurrencyDefault:()=>w,CurrencyWithinTrend:()=>C,HiddenLabel:()=>S,NumberDefault:()=>T,PercentColorizeBySign:()=>O,PercentDefault:()=>D,RatingDefault:()=>k,RootAndLabel:()=>x,TextDefault:()=>E,WithAriaLive:()=>j,WithSubtleLabel:()=>A}),y=t(n()),b=()=>(0,y.jsx)(g,{"data-visual-test":`stat-amount-default`,stableName:`BasicUsage`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Revenue growth</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency value={1234} signDisplay="always" />
    <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
    <Stat.Info>Some additional information.</Stat.Info>
  </Stat.Content>
</Stat.Root>
`}),x=()=>(0,y.jsx)(g,{"data-visual-test":`stat-root-and-label`,stableName:`RootAndLabel`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_,H3:d},children:`<Stat.Root>
  <Stat.Label>
    <H3>Revenue growth</H3>
  </Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency
      value={1234}
      mainSize="x-large"
      auxiliarySize="x-small"
    />
    <Stat.Trend srLabel="Growth trend">+12.4%</Stat.Trend>
  </Stat.Content>

  <Stat.Label top>Monthly change</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency value={-1234} locale="en-GB" />
    <Stat.Inline>
      <Stat.Trend srLabel="Change trend">-2.1%</Stat.Trend>
      <Stat.Info>(some additional information)</Stat.Info>
    </Stat.Inline>
  </Stat.Content>
</Stat.Root>
`}),S=()=>(0,y.jsx)(g,{stableName:`HiddenLabel`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label srOnly>I'm a hidden label</Stat.Label>
  <Stat.Content>
    <Stat.Currency value={1234} />
  </Stat.Content>
</Stat.Root>
`}),C=()=>(0,y.jsx)(g,{"data-visual-test":`stat-currency-within-trend`,stableName:`CurrencyWithinTrend`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_,DateFormat:p},children:`<Stat.Root>
  <Stat.Label>
    <DateFormat value="P1Y" />
  </Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency value={350234} srLabel="Annual revenue" />
    <Stat.Inline>
      <Stat.Trend>
        <Stat.Currency
          value={46692}
          signDisplay="always"
          srLabel="Revenue delta"
        />
      </Stat.Trend>
      <Stat.Info>
        (
        <Stat.Percent
          value={16.79}
          decimals={2}
          srLabel="Relative change"
        />
        )
      </Stat.Info>
    </Stat.Inline>
  </Stat.Content>
</Stat.Root>
`}),w=()=>(0,y.jsx)(g,{"data-visual-test":`stat-currency-default`,stableName:`CurrencyDefault`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_,Code:i},children:`<Stat.Root>
  <Stat.Label>Always show sign</Stat.Label>
  <Stat.Content>
    <Stat.Currency
      value={1234}
      mainSize="x-large"
      signDisplay="always"
      auxiliarySize="x-small"
    />
  </Stat.Content>

  <Stat.Label top>With suffix</Stat.Label>
  <Stat.Content>
    <Stat.Currency
      value={1234}
      currency="USD"
      suffix="/mnd"
      mainSize="x-large"
      auxiliarySize="x-small"
    />
  </Stat.Content>

  <Stat.Label top>
    Colorized using <Code>en-GB</Code> locale
  </Stat.Label>
  <Stat.Content>
    <Stat.Currency
      value={-1234.5}
      decimals={2}
      currency="USD"
      signDisplay="always"
      fontSize="medium"
      colorizeBySign
      locale="en-GB"
    />
  </Stat.Content>
</Stat.Root>
`}),T=()=>(0,y.jsx)(g,{"data-visual-test":`stat-number-example`,stableName:`NumberDefault`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Number</Stat.Label>
  <Stat.Content>
    <Stat.Number
      value={1234}
      signDisplay="always"
      mainSize="x-large"
      auxiliarySize="x-small"
    />
  </Stat.Content>

  <Stat.Label top>Number in Trend and Info</Stat.Label>
  <Stat.Content>
    <Stat.Trend tone="negative" srLabel="Negative trend">
      <Stat.Number value={-1234} signDisplay="always" />
    </Stat.Trend>
    <Stat.Info>
      (
      <Stat.Number value={1234} srLabel="Signed amount with currency" />)
    </Stat.Info>
  </Stat.Content>
</Stat.Root>
`}),E=()=>(0,y.jsx)(g,{stableName:`TextDefault`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Label</Stat.Label>
  <Stat.Content>
    <Stat.Text colorizeBySign={-123}>Custom content</Stat.Text>
  </Stat.Content>

  <Stat.Label top>With medium font weight and size</Stat.Label>
  <Stat.Content>
    <Stat.Text
      srLabel="Screen reader label"
      colorizeBySign={123}
      fontWeight="medium"
      fontSize="medium"
    >
      Larger and bolder
    </Stat.Text>
  </Stat.Content>
</Stat.Root>
`}),D=()=>(0,y.jsx)(g,{"data-visual-test":`stat-percent-default`,stableName:`PercentDefault`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Percentage</Stat.Label>
  <Stat.Content>
    <Stat.Percent
      value={12.3}
      mainSize="x-large"
      auxiliarySize="x-small"
    />
  </Stat.Content>

  <Stat.Label top>Percentage colorized</Stat.Label>
  <Stat.Content>
    <Stat.Percent
      value={0.1234}
      decimals={2}
      signDisplay="always"
      fontSize="medium"
      colorizeBySign
    />
  </Stat.Content>
</Stat.Root>
`}),O=()=>(0,y.jsx)(g,{"data-visual-test":`stat-percent-colorize-by-sign`,stableName:`PercentColorizeBySign`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Positive without signDisplay</Stat.Label>
  <Stat.Content>
    <Stat.Percent value={12.3} fontSize="medium" colorizeBySign />
  </Stat.Content>

  <Stat.Label top>Negative without signDisplay</Stat.Label>
  <Stat.Content>
    <Stat.Percent value={-12.3} fontSize="medium" colorizeBySign />
  </Stat.Content>

  <Stat.Label top>Zero without signDisplay</Stat.Label>
  <Stat.Content>
    <Stat.Percent value={0} fontSize="medium" colorizeBySign />
  </Stat.Content>
</Stat.Root>
`}),k=()=>(0,y.jsx)(g,{"data-visual-test":`stat-rating-default`,stableName:`RatingDefault`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_},children:`<Stat.Root>
  <Stat.Label>Stars rating</Stat.Label>
  <Stat.Content>
    <Stat.Rating value={4} />
  </Stat.Content>

  <Stat.Label top>Progressive rating</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Rating variant="progressive" value={5} />
  </Stat.Content>
</Stat.Root>
`}),A=()=>(0,y.jsx)(g,{"data-visual-test":`stat-content-label-order-subtle-label`,scope:{useTranslation:o,globe_medium:l},stableName:`WithSubtleLabel`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Stat:_,Grid:m,Card:f,DateFormat:p,IconPrimary:a,Icon:s},noInline:!0,children:`function Example() {
  const { rating } = useTranslation().Stat
  return (
    <Grid.Container
      rowGap
      columnGap
      style={{
        gridAutoRows: '1fr',
      }}
    >
      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [1, 3],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
          <Stat.Root visualOrder="content-label">
            <Stat.Label variant="subtle">
              <DateFormat value="P1Y" />
            </Stat.Label>
            <Stat.Content direction="vertical">
              <IconPrimary icon="arrow_up" top="x-small" />
              <Stat.Percent
                top="small"
                value={5.21}
                decimals={2}
                fontSize="basis"
                srLabel="Revenue growth percentage"
              />
            </Stat.Content>
          </Stat.Root>
        </Card>
      </Grid.Item>

      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [4, 6],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
          <Stat.Root visualOrder="content-label">
            <Stat.Label variant="subtle">Yearly cost</Stat.Label>
            <Stat.Content direction="vertical">
              <Icon icon={globe_medium} />
              <Stat.Percent
                top="small"
                value={0.6}
                decimals={1}
                fontSize="basis"
              />
            </Stat.Content>
          </Stat.Root>
        </Card>
      </Grid.Item>

      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [7, 9],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
          <Stat.Root visualOrder="content-label">
            <Stat.Label variant="subtle">Risiko</Stat.Label>
            <Stat.Content direction="vertical">
              <Stat.Rating variant="progressive" value={2} />
              <Stat.Info top variant="prominent">
                Lav
              </Stat.Info>
            </Stat.Content>
          </Stat.Root>
        </Card>
      </Grid.Item>

      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [10, 12],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
          <Stat.Root visualOrder="content-label">
            <Stat.Label variant="subtle">Stars rating</Stat.Label>
            <Stat.Content direction="vertical">
              <Stat.Rating value={2} />
              <Stat.Info top variant="prominent">
                {rating.replace('%value', '2').replace('%max', '5')}
              </Stat.Info>
            </Stat.Content>
          </Stat.Root>
        </Card>
      </Grid.Item>
    </Grid.Container>
  )
}
render(<Example />)
`}),j=()=>(0,y.jsx)(g,{stableName:`WithAriaLive`,sourceImports:[`import { useState } from 'react'`,`import { useTranslation } from '@dnb/eufemia/shared'`,`import { AriaLive, Button, Card, Code, DateFormat, Flex, Grid, H3, Icon, IconPrimary } from '@dnb/eufemia'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import { globe_medium } from '@dnb/eufemia/icons'`],__buildScope:{Flex:c,AriaLive:r,Stat:_,Button:u},noInline:!0,children:`function Example() {
  const [value, setValue] = useState(1234)
  return (
    <Flex.Stack>
      <AriaLive variant="content">
        <Stat.Root>
          <Stat.Label>Revenue</Stat.Label>
          <Stat.Content>
            <Stat.Currency value={value} />
          </Stat.Content>
        </Stat.Root>
      </AriaLive>

      <Button
        text="Update value"
        variant="secondary"
        onClick={() => setValue((prev) => prev + 100)}
      />
    </Flex.Stack>
  )
}
render(<Example />)
`});function M(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...h(),...e.components};return v||P(`Examples`,!1),b||P(`Examples.BasicUsage`,!0),w||P(`Examples.CurrencyDefault`,!0),C||P(`Examples.CurrencyWithinTrend`,!0),S||P(`Examples.HiddenLabel`,!0),T||P(`Examples.NumberDefault`,!0),O||P(`Examples.PercentColorizeBySign`,!0),D||P(`Examples.PercentDefault`,!0),k||P(`Examples.RatingDefault`,!0),x||P(`Examples.RootAndLabel`,!0),E||P(`Examples.TextDefault`,!0),j||P(`Examples.WithAriaLive`,!0),A||P(`Examples.WithSubtleLabel`,!0),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(t.h2,{children:`Demos`}),`
`,(0,y.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,y.jsx)(b,{}),`
`,(0,y.jsx)(t.h3,{children:`Root and Label`}),`
`,(0,y.jsxs)(t.p,{children:[`If the label acts as a section heading, place a heading element inside `,(0,y.jsx)(t.code,{children:`Stat.Label`}),` (for example `,(0,y.jsx)(t.code,{children:`H3`}),`).`]}),`
`,(0,y.jsx)(x,{}),`
`,(0,y.jsx)(t.h4,{children:`Hidden Label`}),`
`,(0,y.jsxs)(t.p,{children:[`Use a visually hidden label (`,(0,y.jsx)(t.code,{children:`srOnly`}),`) when the visible UI context already describes the statistic.`]}),`
`,(0,y.jsx)(S,{}),`
`,(0,y.jsx)(t.h3,{children:`Currency`}),`
`,(0,y.jsxs)(t.p,{children:[`You can use `,(0,y.jsx)(t.code,{children:`mainSize`}),` and `,(0,y.jsx)(t.code,{children:`auxiliarySize`}),` to adjust the relative size of the currency symbol and the amount.`]}),`
`,(0,y.jsx)(w,{}),`
`,(0,y.jsx)(t.h3,{children:`Currency within a Trend`}),`
`,(0,y.jsx)(C,{}),`
`,(0,y.jsx)(t.h3,{children:`Number`}),`
`,(0,y.jsx)(T,{}),`
`,(0,y.jsx)(t.h3,{children:`Percent`}),`
`,(0,y.jsx)(D,{}),`
`,(0,y.jsx)(t.h3,{children:`Percent colorized by sign`}),`
`,(0,y.jsx)(O,{}),`
`,(0,y.jsx)(t.h3,{children:`Rating`}),`
`,(0,y.jsx)(k,{}),`
`,(0,y.jsx)(t.h3,{children:`Text`}),`
`,(0,y.jsx)(E,{}),`
`,(0,y.jsx)(t.h3,{children:`With Subtle Label`}),`
`,(0,y.jsxs)(t.p,{children:[`Also, the order of the content and label can be switched for visual users (not screen readers), and the label is styled with the `,(0,y.jsx)(t.code,{children:`subtle`}),` variant to further de-emphasize it.`]}),`
`,(0,y.jsx)(A,{}),`
`,(0,y.jsx)(t.h3,{children:`With AriaLive`}),`
`,(0,y.jsxs)(t.p,{children:[`Use the `,(0,y.jsx)(t.a,{href:`/uilib/components/aria-live/`,children:`AriaLive`}),` component to announce dynamic value updates to screen readers. Wrap `,(0,y.jsx)(t.code,{children:`Stat.Root`}),` with `,(0,y.jsx)(t.code,{children:`AriaLive`}),` so that changes are announced when the content updates.`]}),`
`,(0,y.jsx)(j,{})]})}function N(e={}){let{wrapper:t}={...h(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(M,{...e})}):M(e)}function P(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{N as default};