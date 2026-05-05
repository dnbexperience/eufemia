import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-kFz4A4k3.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useTranslation
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.useTranslation`}),` is a hook that returns the translations for the current locale.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Additional utilities`}),`
`,(0,r.jsx)(n.p,{children:`In addition to all internal translations, you also get;`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`formatMessage`}),` - a function you can use to get a specific translation based on a key (flattened object with dot-notation).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`renderMessage`}),` - a function you can use to render a string with line-breaks. It converts `,(0,r.jsx)(n.code,{children:`{br}`}),` to a JSX line-break.`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Custom translations`}),`
`,(0,r.jsx)(n.p,{children:`You can also extend the translations with your own custom translations.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.h2,{children:[`Using the `,(0,r.jsx)(n.code,{children:`<Translation />`})]}),`
`,(0,r.jsxs)(n.p,{children:[`Instead of using the hook, you can also, use the `,(0,r.jsx)(n.code,{children:`<Translation />`}),` component to consume your translations:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`})}),`
`,(0,r.jsxs)(n.h3,{children:[`Formatting markers inside `,(0,r.jsx)(n.code,{children:`<Translation />`})]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`<Translation />`}),` automatically applies simple formatting markers in strings (using the shared `,(0,r.jsx)(n.code,{children:`renderWithFormatting`}),`):`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`{br}`}),` inserts a line break`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`**bold**`}),`, `,(0,r.jsx)(n.code,{children:`_italic_`}),`, `,(0,r.jsx)(n.code,{children:"`code`"})]}),`
`,(0,r.jsxs)(n.li,{children:[`links `,(0,r.jsx)(n.code,{children:`[label](https://…)`}),` and bare URLs `,(0,r.jsx)(n.code,{children:`https://…`})]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Use the shared Provider to customize translations`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.useTranslation`}),` also reads translations from the shared `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/provider/`,children:`Provider`}),`, so you can configure app-level translations once and consume them inside `,(0,r.jsx)(n.code,{children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For provider setup, merging shared and forms translations, and app-level localization examples, see the shared `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/localization/`,children:`Localization`}),` guide.`]}),`
`,(0,r.jsx)(n.h2,{children:`Fallback for missing or partial translations`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.useTranslation`}),` will output missing keys when:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Empty explicit locale: returns pointer strings (e.g. `,(0,r.jsx)(n.code,{children:`MyNamespace.label`}),`) derived from `,(0,r.jsx)(n.code,{children:`fallbackLocale="nb-NO"`}),`.`]}),`
`,(0,r.jsx)(n.li,{children:`Partial explicit locale: merges missing keys as pointer strings, preserving existing ones.`}),`
`,(0,r.jsx)(n.li,{children:`Non-existent current locale (no explicit entry in your translations): the hook preserves defaults (no pointers).`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Dynamically loaded translations`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.useTranslation`}),` works with translations loaded asynchronously via the `,(0,r.jsx)(n.code,{children:`translationsLoader`}),` prop on `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` or the shared `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/provider/`,children:`Provider`}),`. Components render with default translations first, and re-render when the loaded translations are available.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For loader setup examples on `,(0,r.jsx)(n.code,{children:`Form.Handler`}),`, see the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/getting-started/#load-translations-dynamically`,children:`Forms getting started guide`}),`. For app-level loading with the shared `,(0,r.jsx)(n.code,{children:`Provider`}),`, static-plus-async merging, and more advanced patterns, see the shared `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/localization/#load-translations-dynamically`,children:`Localization`}),` guide.`]}),`
`,(0,r.jsx)(n.h3,{children:`Formatted messages`}),`
`,(0,r.jsxs)(n.p,{children:[`For richer inline formatting inside form translations, use the `,(0,r.jsx)(n.code,{children:`renderWithFormatting`}),` helper from `,(0,r.jsx)(n.code,{children:`@dnb/eufemia/shared`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`More info about the supported formatting in the `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/localization/#formatted-messages`,children:`renderWithFormatting documentation`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};