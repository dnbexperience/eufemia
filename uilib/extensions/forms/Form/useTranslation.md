---
title: 'Form.useTranslation'
description: '`Form.useTranslation` is a hook that returns the translations for the current locale.'
version: 11.6.0
generatedAt: 2026-06-12T08:43:36.630Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.useTranslation

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useTranslation
```

## Description

The `Form.useTranslation` is a hook that returns the translations for the current locale.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { Field } = Form.useTranslation()
  const { errorRequired } = Field

  return <>MyComponent</>
}

render(
  <Form.Handler locale="en-GB">
    <MyComponent />
  </Form.Handler>
)
```

## Additional utilities

In addition to all internal translations, you also get;

- `formatMessage` - a function you can use to get a specific translation based on a key (flattened object with dot-notation).
- `renderMessage` - a function you can use to render a string with line-breaks. It converts `{br}` to a JSX line-break.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { formatMessage, renderMessage } = Form.useTranslation()
  const errorRequired = formatMessage('Field.errorRequired')

  return <>MyComponent</>
}

render(
  <Form.Handler locale="en-GB">
    <MyComponent />
  </Form.Handler>
)
```

## Custom translations

You can also extend the translations with your own custom translations.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myTranslations = {
  'nb-NO': { myString: 'Min egendefinerte streng' },
  'en-GB': {
    // Cascaded translations
    Nested: {
      stringWithArgs: 'My custom string with an argument: {myKey}',
    },

    // Flat translations
    'Nested.stringWithLinebreaks':
      'My custom string with a {br}line-break',
  },
}

const MyComponent = () => {
  const t = Form.useTranslation<typeof myTranslations>()

  // Internal translations
  const existingString = t.Field.errorRequired

  // Your translations
  const myString = t.myString

  // Use the "formatMessage" function to handle strings with arguments
  const myStringWithArgsA = t.formatMessage(t.Nested.stringWithArgs, {
    myKey: 'myValue',
  })
  // You can also get the string with a key (dot-notation)
  const myStringWithArgsB = t.formatMessage('Nested.stringWithArgs', {
    myKey: 'myValue',
  })

  // Render line-breaks
  const jsxOutput = t.renderMessage(t.Nested.stringWithLinebreaks)

  return <>MyComponent</>
}

render(
  <Form.Handler translations={myTranslations}>
    <MyComponent />
  </Form.Handler>
)
```

## Using the `<Translation />`

Instead of using the hook, you can also, use the `<Translation />` component to consume your translations:

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { Translation, TranslationProps } from '@dnb/eufemia/shared'

const myTranslations = {
  'nb-NO': { 'custom.string': 'Min egendefinerte streng' },
  'en-GB': { 'custom.string': 'My custom string' },
}
type TranslationType = (typeof myTranslations)[keyof typeof myTranslations]

render(
  <Form.Handler translations={myTranslations}>
    <Form.MainHeading>
      <Translation<TranslationType> id="custom.string" />
    </Form.MainHeading>

    <Form.SubHeading>
      <Translation<TranslationType> id={(t) => t.custom.string} />
    </Form.SubHeading>
  </Form.Handler>
)
```

### Formatting markers inside `<Translation />`

`<Translation />` automatically applies simple formatting markers in strings (using the shared `renderWithFormatting`):

- `{br}` inserts a line break
- `**bold**`, `_italic_`, `` `code` ``
- links `[label](https://…)` and bare URLs `https://…`

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { Translation } from '@dnb/eufemia/shared'

const myTranslations = {
  'en-GB': {
    info: 'Use **bold** and _italic_ with a {br}line-break.',
  },
}
type TranslationType = (typeof myTranslations)[keyof typeof myTranslations]

render(
  <Form.Handler translations={myTranslations} locale="en-GB">
    <Translation<TranslationType> id={(t) => t.info} />
  </Form.Handler>
)
```

## Use the shared Provider to customize translations

`Form.useTranslation` also reads translations from the shared [Provider](/uilib/usage/customisation/provider/), so you can configure app-level translations once and consume them inside `Form.Handler`.

For provider setup, merging shared and forms translations, and app-level localization examples, see the shared [Localization](/uilib/usage/customisation/localization/) guide.

## Fallback for missing or partial translations

`Form.useTranslation` will output missing keys when:

- Empty explicit locale: returns pointer strings (e.g. `MyNamespace.label`) derived from `fallbackLocale="nb-NO"`.
- Partial explicit locale: merges missing keys as pointer strings, preserving existing ones.
- Non-existent current locale (no explicit entry in your translations): the hook preserves defaults (no pointers).

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const translations = {
  'sv-SE': {}, // empty explicit current-locale
  'en-GB': { MyNamespace: { label: 'English label' } },
}

type T = (typeof translations)['en-GB']

function MyField() {
  const t = Form.useTranslation<T>({
    fallbackLocale: 'en-GB', // default: 'nb-NO'
  })
  return <>{t.MyNamespace.label /* 'MyNamespace.label' */}</>
}

render(
  <Form.Handler locale="sv-SE" translations={translations}>
    <MyField />
  </Form.Handler>
)
```

## Dynamically loaded translations

`Form.useTranslation` works with translations loaded asynchronously via the `translationsLoader` prop on [Form.Handler](/uilib/extensions/forms/Form/Handler/) or the shared [Provider](/uilib/usage/customisation/provider/). Components render with default translations first, and re-render when the loaded translations are available.

For loader setup examples on `Form.Handler`, see the [Forms getting started guide](/uilib/extensions/forms/getting-started/#load-translations-dynamically). For app-level loading with the shared `Provider`, static-plus-async merging, and more advanced patterns, see the shared [Localization](/uilib/usage/customisation/localization/#load-translations-dynamically) guide.

### Formatted messages

For richer inline formatting inside form translations, use the `renderWithFormatting` helper from `@dnb/eufemia/shared`.

More info about the supported formatting in the [renderWithFormatting documentation](/uilib/usage/customisation/localization/#formatted-messages).

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { renderWithFormatting } from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    'Field.info': 'Fill out the **form** and _submit_ {br}when ready.',
  },
}

type T = (typeof translations)['en-GB']

function MyComponent() {
  const t = Form.useTranslation<T>()

  return <>{renderWithFormatting(t.Field.info)}</>
}

function MyApp() {
  return (
    <Form.Handler translations={translations} locale="en-GB">
      <MyComponent />
    </Form.Handler>
  )
}
```


## Demos

### Custom translations example


```tsx
const MyField = () => {
  type Translation = {
    Custom: {
      translation: string;
    };
  };
  const {
    Custom,
    formatMessage
  } = Form.useTranslation<Translation>();
  const myTranslation = formatMessage(Custom.translation, {
    myKey: 'value!'
  });
  console.log('Custom', myTranslation);
  return <>{myTranslation}</>;
};
const MyForm = () => {
  return <Form.Handler locale="en-GB" translations={{
    'en-GB': {
      Custom: {
        translation: 'My translation with a {myKey}'
      }
    }
  }}>
              <MyField />
            </Form.Handler>;
};
render(<MyForm />);
```


### Get translations with a key


```tsx
const MyField = () => {
  type Translation = {
    Custom: {
      translation: string;
    };
  };
  const {
    formatMessage
  } = Form.useTranslation<Translation>();
  const myTranslation = formatMessage('Custom.translation', {
    myKey: 'value!'
  });
  const errorRequired = formatMessage('Field.errorRequired');
  console.log(errorRequired);
  return <>{myTranslation}</>;
};
const MyForm = () => {
  return <Form.Handler locale="en-GB" translations={{
    'en-GB': {
      Custom: {
        translation: 'My translation with a {myKey}'
      }
    }
  }}>
              <MyField />
            </Form.Handler>;
};
render(<MyForm />);
```


## Parameters

Properties passed to the `Form.useTranslation` hook.


```json
{
  "props": {
    "messages": {
      "doc": "Custom translation messages to merge with built-in forms translations. Can be a flat object or locale-keyed object.",
      "type": [
        "FormsTranslation",
        "Record<locale, FormsTranslation>"
      ],
      "status": "optional"
    },
    "fallbackLocale": {
      "doc": "Locale to use when translations are missing in the current locale. Defaults to \"nb-NO\".",
      "type": "string",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties and methods returned from the `Form.useTranslation` hook.


```json
{
  "props": {
    "formatMessage": {
      "doc": "Formats a translation key with ICU MessageFormat syntax. Supports pluralization, select, and variable interpolation.",
      "type": "(id: string, values?: Record<string, unknown>) => string",
      "status": "required"
    },
    "renderMessage": {
      "doc": "Like formatMessage but returns React.ReactNode, allowing React elements in interpolated values.",
      "type": "(id: string, values?: Record<string, React.ReactNode>) => React.ReactNode",
      "status": "required"
    },
    "countries": {
      "doc": "Array of country names in the current locale, for use in country selection components.",
      "type": "Array<string>",
      "status": "required"
    },
    "Field": {
      "doc": "Translation string object for Field.* components. Contains keys such as `errorRequired`, `errorPattern`, and component-specific labels, error messages, and placeholders.",
      "type": "object",
      "status": "required"
    },
    "Section": {
      "doc": "Translation string object for Form.Section components.",
      "type": "object",
      "status": "required"
    },
    "Wizard": {
      "doc": "Translation string object for Wizard components (step labels, navigation).",
      "type": "object",
      "status": "required"
    },
    "Iterate": {
      "doc": "Translation string object for Iterate components (add/remove buttons).",
      "type": "object",
      "status": "required"
    }
  }
}
```

## Parameters

Properties passed to the `Form.useTranslation` hook.


```json
{
  "props": {
    "messages": {
      "doc": "Custom translation messages to merge with built-in forms translations. Can be a flat object or locale-keyed object.",
      "type": [
        "FormsTranslation",
        "Record<locale, FormsTranslation>"
      ],
      "status": "optional"
    },
    "fallbackLocale": {
      "doc": "Locale to use when translations are missing in the current locale. Defaults to \"nb-NO\".",
      "type": "string",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties and methods returned from the `Form.useTranslation` hook.


```json
{
  "props": {
    "formatMessage": {
      "doc": "Formats a translation key with ICU MessageFormat syntax. Supports pluralization, select, and variable interpolation.",
      "type": "(id: string, values?: Record<string, unknown>) => string",
      "status": "required"
    },
    "renderMessage": {
      "doc": "Like formatMessage but returns React.ReactNode, allowing React elements in interpolated values.",
      "type": "(id: string, values?: Record<string, React.ReactNode>) => React.ReactNode",
      "status": "required"
    },
    "countries": {
      "doc": "Array of country names in the current locale, for use in country selection components.",
      "type": "Array<string>",
      "status": "required"
    },
    "Field": {
      "doc": "Translation string object for Field.* components. Contains keys such as `errorRequired`, `errorPattern`, and component-specific labels, error messages, and placeholders.",
      "type": "object",
      "status": "required"
    },
    "Section": {
      "doc": "Translation string object for Form.Section components.",
      "type": "object",
      "status": "required"
    },
    "Wizard": {
      "doc": "Translation string object for Wizard components (step labels, navigation).",
      "type": "object",
      "status": "required"
    },
    "Iterate": {
      "doc": "Translation string object for Iterate components (add/remove buttons).",
      "type": "object",
      "status": "required"
    }
  }
}
```
