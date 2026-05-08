import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Send down component properties`}),`
`,(0,n.jsx)(r.p,{children:`You can use the Provider to send down component properties. And because providers can be nested, it's a really powerful tool to handle generally properties used often by a component.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'

render(
  <MyApp>
    ...
    <Provider Button={{ size: 'large' }}>
      ...
      <Button>Large button</Button>
    </Provider>
  </MyApp>
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`You can also use the `,(0,n.jsx)(r.code,{children:`value`}),` property to define the component properties:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Provider
  value={{
    Button: { size: 'large' },
  }}
>
  ...
  <Button>Large button</Button>
</Provider>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Using useSharedContext hook`}),`
`,(0,n.jsxs)(r.p,{children:[`If you want to pass custom values besides the built-in ones, the `,(0,n.jsx)(r.code,{children:`useSharedContext`}),` hook provides a type-safe way to access context values from the Provider.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import Provider, { useSharedContext } from '@dnb/eufemia/shared'

type MyData = { myValue: string }

function MyComponent() {
  const { myValue } = useSharedContext<MyData>()
  return <>{myValue}</>
}

function App() {
  return (
    <Provider value={{ myValue: 'Hello, World!' }}>
      <MyComponent />
    </Provider>
  )
}
`})}),`
`,(0,n.jsx)(r.h2,{children:`Changing locale or currency`}),`
`,(0,n.jsxs)(r.p,{children:[`You can either set the locale as a property e.g. `,(0,n.jsx)(r.code,{children:`<Provider locale="en-GB" ...`}),` and handle the change from the app root, or change it inside the app, respective Context:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import Provider from '@dnb/eufemia/shared/Provider'
import Context from '@dnb/eufemia/shared/Context'

const ChangeLocale = () => {
  const { setLocale, update, locale } = React.useContext(Context)

  React.useEffect(() => {
    // Change the locale
    update({ locale: 'en-GB' })

    // Change the default currency
    update({ currency: 'USD' })
  }, [])

  return (
    <Field.Selection value={locale} onChange={(value) => setLocale(value)}>
      <Field.Option value="nb-NO" title="Norsk" />
      <Field.Option value="sv-SE" title="Svenska" />
      <Field.Option value="da-DK" title="Dansk" />
      <Field.Option value="en-GB" title="English (GB)" />
    </Field.Selection>
  )
}

render(
  <Provider>
    <MyApp>
      <ChangeLocale />
      text <NumberFormat.Number>123</NumberFormat.Number> table etc.
    </MyApp>
  </Provider>
)
`})}),`
`,(0,n.jsx)(r.h2,{children:`Nested Providers`}),`
`,(0,n.jsx)(r.p,{children:`Yes, it's possible to have nested providers.`}),`
`,(0,n.jsx)(r.p,{children:`You have then to decide what you need to update.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import Provider from '@dnb/eufemia/shared/Provider'
import Context from '@dnb/eufemia/shared/Context'

const ChangeLocale = () => {
  const { setCurrentLocale, updateCurrent, locale } =
    React.useContext(Context)

  React.useEffect(() => {
    // Change the locale
    updateCurrent({ locale: 'en-GB' })

    // Change the default currency
    updateCurrent({ currency: 'USD' })
  }, [])

  return (
    <Field.Selection
      value={locale}
      onChange={(value) => setCurrentLocale(value)}
    >
      <Field.Option value="nb-NO" title="Norsk" />
      <Field.Option value="en-GB" title="English (GB)" />
    </Field.Selection>
  )
}

render(
  <Provider locale="en-GB">
    <MyApp>
      <Provider locale="nb-NO">
        Norsk <NumberFormat.Number>1234</NumberFormat.Number>
        <ChangeLocale />
      </Provider>
      English <NumberFormat.Number>1234</NumberFormat.Number>
    </MyApp>
  </Provider>
)
`})}),`
`,(0,n.jsx)(r.h2,{children:`Provider and context troubleshooting`}),`
`,(0,n.jsx)(r.p,{children:`If there is a module format deviation, components do not share anymore the same provider and context. So, make sure you have a consistent import routine, not like this:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// NB: Example of deviant module formats
import Provider from '@dnb/eufemia/shared/Provider' // like /esm
import { Button } from '@dnb/eufemia/es'
import { NumberFormat } from '@dnb/eufemia/cjs/components'
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};