---
metadata: https://eufemia.dnb.no/uilib/usage/customisation/provider-info/metadata.json
---

## Send down component properties

You can use the Provider to send down component properties. And because providers can be nested, it's a really powerful tool to handle generally properties used often by a component.

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <MyApp>
    ...
    <Provider Button={{ size: 'large' }}>
      ...
      <Button>Large button</Button>
    </Provider>
  </MyApp>,
)
```

You can also use the `value` property to define the component properties:

```jsx
<Provider
  value={{
    Button: { size: 'large' },
  }}
>
  ...
  <Button>Large button</Button>
</Provider>
```

## Using useSharedContext hook

If you want to pass custom values besides the built-in ones, the `useSharedContext` hook provides a type-safe way to access context values from the Provider.

```tsx
import Provider, { useSharedContext } from '@dnb/eufemia/shared'

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
```

## Changing locale or currency

You can either set the locale as a properly e.g. `<Provider locale="en-GB" ...` and handle the change from the app root, or change it inside the app, respective Context:

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
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
      text <NumberFormat>123</NumberFormat> table etc.
    </MyApp>
  </Provider>,
)
```

## Nested Providers

Yes, it's possible to have nested providers.

You have then to decide what you need to update.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
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
        Norsk <NumberFormat>1234</NumberFormat>
        <ChangeLocale />
      </Provider>
      English <NumberFormat>1234</NumberFormat>
    </MyApp>
  </Provider>,
)
```

## Provider and context troubleshooting

If there is a module format deviation, components do not share anymore the same provider and context. So, make sure you have a consistent import routine, not like this:

```js
// NB: Example of deviant module formats
import Provider from '@dnb/eufemia/shared/Provider' // like /esm
import { Button } from '@dnb/eufemia/es'
import { NumberFormat } from '@dnb/eufemia/cjs/components'
```
