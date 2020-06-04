---
draft: true
---

## Changing locale or currency

You can either set the locale as a properly e.g. `<Provider locale="en-US" ...` and handle the change from the app root, or change it inside the app, respective Context:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

const ChangeLocale = () => {
  const { setLocale, update, locale } = React.useContext(Context)

  React.useEffect(() => {
    // Change the locale
    update({ locale: 'en-US' })

    // Change the default currency
    update({ currency: 'USD' })
  }, [])

  return (
    <Dropdown
      value={locale}
      data={{ 'en-US': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { selected_key } }) => {
        setLocale(selected_key)
      }}
    />
  )
}

render(
  <Provider>
    <MyApp>
      <ChangeLocale />
      text <Number>123</Number> table etc.
    </MyApp>
  </Provider>
)
```

## Nested Providers

Yes, it's possible to have nested providers.

You have then to decide what you need to update.

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

const ChangeLocale = () => {
  const { setCurrentLocale, updateCurrent, locale } = React.useContext(
    Context
  )

  React.useEffect(() => {
    // Change the locale
    updateCurrent({ locale: 'en-US' })

    // Change the default currency
    updateCurrent({ currency: 'USD' })
  }, [])

  return (
    <Dropdown
      value={locale}
      data={{ 'en-US': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { selected_key } }) => {
        setCurrentLocale(selected_key)
      }}
    />
  )
}

render(
  <Provider locale="en-US">
    <MyApp>
      <Provider locale="nb-NO">
        Norsk <Number>1234</Number>
        <ChangeLocale />
      </Provider>
      English <Number>1234</Number>
    </MyApp>
  </Provider>
)
```
