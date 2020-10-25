---
title: 'Locale / Translation'
order: 8
---

# Localization

The default constants are defined in the `/shared/defaults.js` file.

- The default locale of all components texts is: `nb-NO`.
- The default currency is: `NOK`

## Supported component translations

Eufemia components comes with a set of default translated strings.

You can easily change one, some or all of them by using a React provider – the Eufemia Provider.

Here are the default strings located:

```js
import enUS from 'dnb-ui-lib/shared/locales/en-US'
import nbNO from 'dnb-ui-lib/shared/locales/nb-NO'
```

## How set the locale

In React based apps, use the shared Eufemia provider:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

const myLocale = 'en-US'

render(
  <Provider locale={myLocale}>
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
```

## How set locale progressively

You can easily enhance or change translated strings progressively:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

render(
  <Provider
    locale="nb-NO"
    locales={{
      'nb-NO': {
        Modal: { close_title: 'Someting' }
      }
    }}
  >
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
```

## How change the locale during runtime

You can even change the locale during runtime. Find more info in the [Provider docs](/uilib/usage/customisation/provider).

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'
import Context from 'dnb-ui-lib/shared/Context'

const ChangeLocale = () => {
  const { setLocale, locale } = React.useContext(Context)

  return <Dropdown
    value={locale}
    data={{ 'en-US': 'English', 'nb-NO': 'Norsk' }}
    on_change={({ data: { selected_key } }) => {
      setLocale(selected_key)
    }}
  />
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

## How to combine with other tools

You can easily combine the locales support it with other translation tools, like `react-intl`.

Like, having the Eufemia components strings inside a JSON object/file `en.json`:

```json
{
  "Modal.close_title": "Overwrite",
  "other.string": "{foo} ({bar} of {max})"
}
```

and use it like this:

```jsx
import EufemiaProvider from 'dnb-ui-lib/shared/Provider'
import nb from './nb.json' // Has to be an JavaScript object

render(
  <EufemiaProvider
    locale="nb-NO"
    locales={{
      'nb-NO': nb
    }}
  >
    <MyApp>Eufemia components</MyApp>
  </EufemiaProvider>
)
```

## How to use your own translation strings

You have even the option to extend the strings with your own and use it as an internationalization tool replacement for e.g. `react-intl`.

### The useTranslation Hook

Now, lets say you have your translation files as JSON object/files `en.json`:

```json
{
  "Modal.close_title": "Overwrite",
  "my.string": "string {foo}"
}
```

and use it like this:

```jsx
import EufemiaProvider from 'dnb-ui-lib/shared/Provider'
import useTranslation, {
  Translation
} from 'dnb-ui-lib/shared/useTranslation'
import nb from './nb.json'
import en from './en.json'

const Component = () => {
  const str = useTranslation('my.string', {
    foo: 'bar'
  })

  return str
}

render(
  <EufemiaProvider
    locale="nb-NO"
    locales={{
      'nb-NO': nb,
      'en-US': en
    }}
  >
    <Component />
    <Translation id="my.string" foo="bar" />
  </EufemiaProvider>
)
```

## Get the strings from Context

It is possible to use the Eufemia shared Provider for your own project / App localization.

```js
import Provider from 'dnb-ui-lib/shared/Provider'

const myLocale = {
  // extend the translation
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

## How add new locales

Create a new file (`sv-SE.js`) containing all the strings:

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

or add/update the locales during runtime:

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
