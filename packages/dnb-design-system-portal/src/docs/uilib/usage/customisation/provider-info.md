---
draft: true
---

## Send down component props

You can use the Provider to send down component props. And because providers can be nested, it's a really powerful tool to handle generally properties used often by a component.

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <MyApp>
    ...
    <Provider Button={{ size: 'large' }}>
      ...
      <Button>Large button</Button>
    </Provider>
  </MyApp>
)
```

**NB:** If you use TypeScript, you may rather use the `value` prop to spread the component properties along:

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

## Changing locale or currency

You can either set the locale as a properly e.g. `<Provider locale="en-GB" ...` and handle the change from the app root, or change it inside the app, respective Context:

```jsx
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
    <Dropdown
      value={locale}
      data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { value } }) => {
        setLocale(value)
      }}
    />
  )
}

render(
  <Provider>
    <MyApp>
      <ChangeLocale />
      text <NumberFormat>123</NumberFormat> table etc.
    </MyApp>
  </Provider>
)
```

## Nested Providers

Yes, it's possible to have nested providers.

You have then to decide what you need to update.

```jsx
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
    <Dropdown
      value={locale}
      data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data }) => data && setCurrentLocale(data.selected_key)}
    />
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
  </Provider>
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
