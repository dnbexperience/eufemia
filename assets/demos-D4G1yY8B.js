import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./globe_medium-Dx5uyL56.js";import{t as r}from"./ComponentBox-xW2kV1s2.js";import{Lr as i,Wi as a}from"./index-DVm0MbGb.js";var o=e({BasicUsage:()=>c,CurrencyDefault:()=>f,CurrencyWithinTrend:()=>d,HiddenLabel:()=>u,NumberDefault:()=>p,PercentColorizeBySign:()=>g,PercentDefault:()=>h,RatingDefault:()=>_,RootAndLabel:()=>l,TextDefault:()=>m,WithAriaLive:()=>y,WithSubtleLabel:()=>v}),s=t(),c=()=>(0,s.jsx)(r,{"data-visual-test":`stat-amount-default`,children:`<Stat.Root>
  <Stat.Label>Revenue growth</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Currency value={1234} signDisplay="always" />
    <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
    <Stat.Info>Some additional information.</Stat.Info>
  </Stat.Content>
</Stat.Root>
`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`stat-root-and-label`,children:`<Stat.Root>
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
`}),u=()=>(0,s.jsx)(r,{children:`<Stat.Root>
  <Stat.Label srOnly>I'm a hidden label</Stat.Label>
  <Stat.Content>
    <Stat.Currency value={1234} />
  </Stat.Content>
</Stat.Root>
`}),d=()=>(0,s.jsx)(r,{"data-visual-test":`stat-currency-within-trend`,children:`<Stat.Root>
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
`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`stat-currency-default`,children:`<Stat.Root>
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
`}),p=()=>(0,s.jsx)(r,{"data-visual-test":`stat-number-example`,children:`<Stat.Root>
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
`}),m=()=>(0,s.jsx)(r,{children:`<Stat.Root>
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
`}),h=()=>(0,s.jsx)(r,{"data-visual-test":`stat-percent-default`,children:`<Stat.Root>
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
`}),g=()=>(0,s.jsx)(r,{"data-visual-test":`stat-percent-colorize-by-sign`,children:`<Stat.Root>
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
`}),_=()=>(0,s.jsx)(r,{"data-visual-test":`stat-rating-default`,children:`<Stat.Root>
  <Stat.Label>Stars rating</Stat.Label>
  <Stat.Content>
    <Stat.Rating value={4} />
  </Stat.Content>

  <Stat.Label top>Progressive rating</Stat.Label>
  <Stat.Content direction="vertical">
    <Stat.Rating variant="progressive" value={5} />
  </Stat.Content>
</Stat.Root>
`}),v=()=>(0,s.jsx)(r,{"data-visual-test":`stat-content-label-order-subtle-label`,scope:{useTranslation:a,globe_medium:n},noInline:!0,children:`function Example() {
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
`}),y=()=>(0,s.jsx)(r,{noInline:!0,children:`function Example() {
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
`});function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...i(),...e.components};return o||S(`Examples`,!1),c||S(`Examples.BasicUsage`,!0),f||S(`Examples.CurrencyDefault`,!0),d||S(`Examples.CurrencyWithinTrend`,!0),u||S(`Examples.HiddenLabel`,!0),p||S(`Examples.NumberDefault`,!0),g||S(`Examples.PercentColorizeBySign`,!0),h||S(`Examples.PercentDefault`,!0),_||S(`Examples.RatingDefault`,!0),l||S(`Examples.RootAndLabel`,!0),m||S(`Examples.TextDefault`,!0),y||S(`Examples.WithAriaLive`,!0),v||S(`Examples.WithSubtleLabel`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Root and Label`}),`
`,(0,s.jsxs)(t.p,{children:[`If the label acts as a section heading, place a heading element inside `,(0,s.jsx)(t.code,{children:`Stat.Label`}),` (for example `,(0,s.jsx)(t.code,{children:`H3`}),`).`]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h4,{children:`Hidden Label`}),`
`,(0,s.jsxs)(t.p,{children:[`Use a visually hidden label (`,(0,s.jsx)(t.code,{children:`srOnly`}),`) when the visible UI context already describes the statistic.`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Currency`}),`
`,(0,s.jsxs)(t.p,{children:[`You can use `,(0,s.jsx)(t.code,{children:`mainSize`}),` and `,(0,s.jsx)(t.code,{children:`auxiliarySize`}),` to adjust the relative size of the currency symbol and the amount.`]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Currency within a Trend`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Number`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Percent`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Percent colorized by sign`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Rating`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Text`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`With Subtle Label`}),`
`,(0,s.jsxs)(t.p,{children:[`Also, the order of the content and label can be switched for visual users (not screen readers), and the label is styled with the `,(0,s.jsx)(t.code,{children:`subtle`}),` variant to further de-emphasize it.`]}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`With AriaLive`}),`
`,(0,s.jsxs)(t.p,{children:[`Use the `,(0,s.jsx)(t.a,{href:`/uilib/components/aria-live/`,children:`AriaLive`}),` component to announce dynamic value updates to screen readers. Wrap `,(0,s.jsx)(t.code,{children:`Stat.Root`}),` with `,(0,s.jsx)(t.code,{children:`AriaLive`}),` so that changes are announced when the content updates.`]}),`
`,(0,s.jsx)(y,{})]})}function x(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};