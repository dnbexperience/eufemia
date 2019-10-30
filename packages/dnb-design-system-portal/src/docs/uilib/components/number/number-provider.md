---
draft: true
---

## Changing locale or currency

You can either set the locale as a properly e.g. `<Provider locale="en" ...` and handle the change from the app root, or change it inside the app, respective Context:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

const ChangeLocale = () => {
  const { update, locale } = React.useContext(Context)

  // Change the locale
  update({ locale: 'en' })

  // Change the default currency
  update({ currency: 'USD' })

  return <>{/* e.g. a Dropdown */}</>
}

render(
  <Provider>
    <YourApp>
      <ChangeLocale />
      text <Number>123</Number> table etc.
    </YourApp>
  </Provider>
)
```
