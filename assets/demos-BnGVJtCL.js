import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./globe_medium-DVtbfQ0d.js";import{t as i}from"./ComponentBox-geTEYZ7b.js";import{Gi as a,Rr as o}from"./index-CMgyXmp3.js";var s=e({BasicUsage:()=>l,CurrencyDefault:()=>p,CurrencyWithinTrend:()=>f,HiddenLabel:()=>d,NumberDefault:()=>m,PercentColorizeBySign:()=>_,PercentDefault:()=>g,RatingDefault:()=>v,RootAndLabel:()=>u,TextDefault:()=>h,WithAriaLive:()=>b,WithSubtleLabel:()=>y});t();var c=n(),l=()=>(0,c.jsx)(i,{"data-visual-test":`stat-amount-default`,children:`<Stat.Root>
  <Stat.Label>Revenue growth</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency value={1234} signDisplay="always" />
    <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
    <Stat.Info>Some additional information.</Stat.Info>
  </Stat.Content>
</Stat.Root>
`}),u=()=>(0,c.jsx)(i,{"data-visual-test":`stat-root-and-label`,children:`<Stat.Root>
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
`}),d=()=>(0,c.jsx)(i,{children:`<Stat.Root>
  <Stat.Label srOnly>I'm a hidden label</Stat.Label>
  <Stat.Content>
    <Stat.Currency value={1234} />
  </Stat.Content>
</Stat.Root>
`}),f=()=>(0,c.jsx)(i,{"data-visual-test":`stat-currency-within-trend`,children:`<Stat.Root>
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
`}),p=()=>(0,c.jsx)(i,{"data-visual-test":`stat-currency-default`,children:`<Stat.Root>
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
`}),m=()=>(0,c.jsx)(i,{"data-visual-test":`stat-number-example`,children:`<Stat.Root>
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
`}),h=()=>(0,c.jsx)(i,{children:`<Stat.Root>
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
`}),g=()=>(0,c.jsx)(i,{"data-visual-test":`stat-percent-default`,children:`<Stat.Root>
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
`}),_=()=>(0,c.jsx)(i,{"data-visual-test":`stat-percent-colorize-by-sign`,children:`<Stat.Root>
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
`}),v=()=>(0,c.jsx)(i,{"data-visual-test":`stat-rating-default`,children:`<Stat.Root>
  <Stat.Label>Stars rating</Stat.Label>
  <Stat.Content>
    <Stat.Rating value={4} />
  </Stat.Content>

  <Stat.Label top>Progressive rating</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Rating variant="progressive" value={5} />
  </Stat.Content>
</Stat.Root>
`}),y=()=>(0,c.jsx)(i,{"data-visual-test":`stat-content-label-order-subtle-label`,scope:{useTranslation:a,globe_medium:r},noInline:!0,children:`function Example() {
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
`}),b=()=>(0,c.jsx)(i,{noInline:!0,children:`function Example() {
  const [value, setValue] = React.useState(1234)
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
`});function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...o(),...e.components};return s||C(`Examples`,!1),l||C(`Examples.BasicUsage`,!0),p||C(`Examples.CurrencyDefault`,!0),f||C(`Examples.CurrencyWithinTrend`,!0),d||C(`Examples.HiddenLabel`,!0),m||C(`Examples.NumberDefault`,!0),_||C(`Examples.PercentColorizeBySign`,!0),g||C(`Examples.PercentDefault`,!0),v||C(`Examples.RatingDefault`,!0),u||C(`Examples.RootAndLabel`,!0),h||C(`Examples.TextDefault`,!0),b||C(`Examples.WithAriaLive`,!0),y||C(`Examples.WithSubtleLabel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Root and Label`}),`
`,(0,c.jsxs)(t.p,{children:[`If the label acts as a section heading, place a heading element inside `,(0,c.jsx)(t.code,{children:`Stat.Label`}),` (for example `,(0,c.jsx)(t.code,{children:`H3`}),`).`]}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h4,{children:`Hidden Label`}),`
`,(0,c.jsxs)(t.p,{children:[`Use a visually hidden label (`,(0,c.jsx)(t.code,{children:`srOnly`}),`) when the visible UI context already describes the statistic.`]}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Currency`}),`
`,(0,c.jsxs)(t.p,{children:[`You can use `,(0,c.jsx)(t.code,{children:`mainSize`}),` and `,(0,c.jsx)(t.code,{children:`auxiliarySize`}),` to adjust the relative size of the currency symbol and the amount.`]}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Currency within a Trend`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Number`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Percent`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`Percent colorized by sign`}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(t.h3,{children:`Rating`}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsx)(t.h3,{children:`Text`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`With Subtle Label`}),`
`,(0,c.jsxs)(t.p,{children:[`Also, the order of the content and label can be switched for visual users (not screen readers), and the label is styled with the `,(0,c.jsx)(t.code,{children:`subtle`}),` variant to further de-emphasize it.`]}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsx)(t.h3,{children:`With AriaLive`}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.a,{href:`/uilib/components/aria-live/`,children:`AriaLive`}),` component to announce dynamic value updates to screen readers. Wrap `,(0,c.jsx)(t.code,{children:`Stat.Root`}),` with `,(0,c.jsx)(t.code,{children:`AriaLive`}),` so that changes are announced when the content updates.`]}),`
`,(0,c.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};