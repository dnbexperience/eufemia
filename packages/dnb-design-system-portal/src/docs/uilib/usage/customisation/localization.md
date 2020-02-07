---
title: 'Locale / Translation'

order: 8
---

# Localization

The default constants are defined in the `/shared/defaults.js` file.

- The default locale of all components texts is: `nb-NO`.
- The default currency is: `NOK`

## How set the locale

In React based apps, use the shared provider:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

render(
  <Provider locale="en-US">
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
```

## How change the locale

You can even change the locale during runtime.

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

const ChangeLocale = () => {
  const { setLocale, locale } = React.useContext(Context)

  React.useEffect(() => {
    setLocale('en-US')
  }, [])

  return <>{/* e.g. a Dropdown */}</>
}

render(
  <Provider ...>
    <MyApp>
      ...
      <ChangeLocale />
      ...
    </MyApp>
  </Provider>
)
```

## How add your own strings

It is possible to use the Eufemia shared Provider for your own project / App localization.

```js
import Provider from 'dnb-ui-lib/shared/Provider'
import enUS from 'dnb-ui-lib/shared/locales/en-US''

const myLocale = {
  ...enUS,

  // and extend the translation
  'en-US': {
    myString: 'Custom string'
    myGroup: {
      subString: 'Second string'
    }
  }
}

render(
  <Provider locales={myLocale} locale="en-US">
    <MyApp>
      <MyComponent />
    </MyApp>
  </Provider>
)
```

... and consume the strings in your components, like **MyComponent**:

```jsx
import Context from 'dnb-ui-lib/shared/Context'

export default function MyComponent() {
  const { translation } = React.useContext(Context)
  return <>{translation.myString}</>
}
```

## How to handle locales

Create a new file containing all the strings:

```js
export default {
  'sv-SE': {
    DatePicker: {
      submit_button_text: 'OK'
    },
    Modal: {
      close_title: 'Stänga'
    },
    Logo: {
      alt: 'DNB Logo'
    }
  }
}
```

And add the file, like so:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import myLocale from './locales/sv-SE'

render(
  <Provider locales={myLocale}>
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
```

or add it on the fly:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

import myLocale from './locales/sv-SE'

const ChangeLocale = () => {
  const { update, locale } = React.useContext(Context)

  // Add new locales
  update({ locales: myLocale, locale: 'sv-SE' })

  return locale
}

render(
  <Provider>
    <MyApp>
      ...
      <ChangeLocale />
      ...
    </MyApp>
  </Provider>
)
```
