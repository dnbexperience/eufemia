import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-9saPtqqX.js";import{n as r,t as i}from"./Ul-CJ3LH_FQ.js";import{K as a,s as o}from"./index-Bx3ttow-.js";var s=e(t());function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{children:`Localization`}),`
`,(0,s.jsxs)(t.p,{children:[`The default constants are defined in the `,(0,s.jsx)(t.code,{children:`/shared/defaults.js`}),` file.`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[`The default locale of all components texts is: `,(0,s.jsx)(t.code,{children:`nb-NO`}),`.`]}),`
`,(0,s.jsxs)(t.li,{children:[`The default currency is: `,(0,s.jsx)(t.code,{children:`NOK`})]}),`
`]}),`
`,(0,s.jsx)(t.h2,{children:`Supported component translations`}),`
`,(0,s.jsx)(t.p,{children:`Eufemia components comes with a set of default translated strings for the following locales:`}),`
`,(0,s.jsx)(i,{children:Object.keys(o).map(e=>(0,s.jsx)(r,{children:(0,s.jsx)(n,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/shared/locales/${e}.ts`,children:e})},e))}),`
`,(0,s.jsx)(t.p,{children:`You can easily change one, some or all of them by using a React provider – the Eufemia Provider.`}),`
`,(0,s.jsx)(t.p,{children:`Here are the default strings located:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`// Included by default
import enGB from '@dnb/eufemia/shared/locales/en-GB'
import nbNO from '@dnb/eufemia/shared/locales/nb-NO'
import enGB_forms from '@dnb/eufemia/extensions/forms/constants/locales/en-GB'
import nbNO_forms from '@dnb/eufemia/extensions/forms/constants/locales/nb-NO'

// Additional locales you can add
import svSE from '@dnb/eufemia/shared/locales/sv-SE'
import svSE_forms from '@dnb/eufemia/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/sv-SE'

// Additional locales you can add
import daDK from '@dnb/eufemia/shared/locales/da-DK'
import daDK_forms from '@dnb/eufemia/extensions/forms/constants/locales/da-DK'
import daDK_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/da-DK'

Use \`mergeTranslations\` to combine the forms translations (and country translations when needed) before you pass them to \`Form.Handler\` or \`Provider\`.

import { mergeTranslations } from '@dnb/eufemia/shared'
import svSE_forms from '@dnb/eufemia/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/sv-SE'
import daDK_forms from '@dnb/eufemia/extensions/forms/constants/locales/da-DK'
import daDK_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/da-DK'

const translations = mergeTranslations(
  svSE,
  svSE_forms,
  svSE_forms_countries, // if needed
  // etc. for other locales you want to add
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to set the locale`}),`
`,(0,s.jsx)(t.p,{children:`In React based apps, use the shared Eufemia provider:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'

const myLocale = 'en-GB'

render(
  <Provider locale={myLocale}>
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`For component based locale, you can also make use of the `,(0,s.jsx)(t.code,{children:`lang`}),` attribute – if really needed:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'

render(
  <Provider locale="en-GB">
    <MyApp>
      <HelpButton lang="nb-NO" />
    </MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to set locale progressively`}),`
`,(0,s.jsx)(t.p,{children:`You can easily enhance or change translated strings progressively:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'

render(
  <Provider
    locale="nb-NO"
    translations={{
      'nb-NO': {
        Modal: { closeTitle: 'Something' },
      },
    }}
  >
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to change the locale during runtime`}),`
`,(0,s.jsxs)(t.p,{children:[`You can even change the locale during runtime. Find more info in the `,(0,s.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Provider docs`}),`.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import { Provider, Context } from '@dnb/eufemia/shared'

const ChangeLocale = () => {
  const { setLocale, locale } = React.useContext(Context)

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
    </MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Provide your own translations`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide your own translations by using the shared `,(0,s.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Provider`}),`. Translation strings with several levels of depth can be given as a flat object with dot-notation, or as a nested object (cascaded).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from '@dnb/eufemia/shared'

const nbNO = { myString: 'Min egendefinerte streng' }
const enGB = {
  // Cascaded translations
  Nested: {
    stringWithArgs: 'My custom string with an argument: {myKey}',
  },

  // Flat translations
  'Nested.stringWithArgs': 'My custom string with an argument: {myKey}',
}

const myTranslations = {
  'nb-NO': nbNO,
  'en-GB': enGB,
}

render(
  <Provider translations={myTranslations} locale="en-GB">
    <MyApp>
      <MyComponent />
    </MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Consume translations in your components`}),`
`,(0,s.jsxs)(t.p,{children:[`You can use the `,(0,s.jsx)(t.code,{children:`useTranslation`}),` hook to get the strings from the shared context. The hook returns an object with the strings and a `,(0,s.jsx)(t.code,{children:`formatMessage`}),` function you can use to get the translated strings with arguments.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { useTranslation } from '@dnb/eufemia/shared'

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

type Translation = (typeof myTranslations)[keyof typeof myTranslations]

const MyComponent = () => {
  const t = useTranslation<Translation>()

  // Internal translations
  const existingString = t.Dropdown.title

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
  <Provider translations={myTranslations} locale="en-GB">
    <MyApp>
      <MyComponent />
    </MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Good to know:`}),` You can consume the strings with a dot-notated key, directly from
the `,(0,s.jsx)(t.code,{children:`formatMessage`}),` function:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`formatMessage('myGroup.subString')
`})}),`
`,(0,s.jsx)(t.h3,{children:`Formatted messages`}),`
`,(0,s.jsxs)(t.p,{children:[`For richer inline formatting in your translated strings, you can use the `,(0,s.jsx)(t.code,{children:`renderWithFormatting`}),` helper from `,(0,s.jsx)(t.code,{children:`@dnb/eufemia/shared`}),`. It supports simple markup tokens inside your messages:`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`{br}`}),` inserts a line break (`,(0,s.jsx)(t.code,{children:`<br />`}),`).`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`**bold**`}),` wraps content in `,(0,s.jsx)(t.code,{children:`<strong>`}),` by default.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`_italic_`}),` wraps content in `,(0,s.jsx)(t.code,{children:`<em>`}),` by default.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`[label](url)`}),` renders an anchor link.`,`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[`Bare URLs (e.g. `,(0,s.jsx)(t.code,{children:`http://…`}),` or `,(0,s.jsx)(t.code,{children:`https://…`}),`) are automatically linked and use the URL as the label.`]}),`
`]}),`
`]}),`
`,(0,s.jsxs)(t.li,{children:[`Backticks render monospace literals. Useful for short, copy‑critical strings like reference IDs, promo codes etc. Example: `,(0,s.jsx)(t.code,{children:"`AB12-XYZ9`"}),`. You can customize the renderer via `,(0,s.jsx)(t.code,{children:`renderWithFormatting(text, { code: (c) => <span className="dnb-code">{c}</span> })`}),` if you prefer monospace styling without the semantic `,(0,s.jsx)(t.code,{children:`<code>`}),` tag.`]}),`
`]}),`
`,(0,s.jsx)(t.p,{children:`You can also customize the wrappers and the break token.`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import {
  useTranslation,
  renderWithFormatting,
  Provider,
} from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    'myGroup.subString':
      'Use **bold** and _italic_ with a {br}line-break.',
  },
}

type T = (typeof translations)['en-GB']

function MyComponent() {
  const t = useTranslation<T>()
  return <>{renderWithFormatting(t.myGroup.subString)}</>
}

function MyApp() {
  return (
    <Provider translations={translations} locale="en-GB">
      <MyComponent />
    </Provider>
  )
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Use without translations`}),`
`,(0,s.jsxs)(t.p,{children:[`You can also use `,(0,s.jsx)(t.code,{children:`renderWithFormatting`}),` directly, without the translation context. This is handy for static copy or small strings you build at runtime.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { renderWithFormatting } from '@dnb/eufemia/shared'

const text =
  'Use **bold**, _italic_, \`AB12-XYZ9\` and a link https://www.dnb.no{br}Next line'

export function InlineFormattingExample() {
  return <>{renderWithFormatting(text)}</>
}
`})}),`
`,(0,s.jsx)(t.p,{children:`Array input and dynamic strings are also supported:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { renderWithFormatting } from '@dnb/eufemia/shared'

function ArrayInputExample() {
  const parts = ['Hello', '{br}', 'world! See https://example.com']
  return <>{renderWithFormatting(parts)}</>
}

function DynamicExample({ refId }: { refId: string }) {
  const text = \`Keep your reference \\\`\${'\${refId}'}\\\` for support.\`
  return <>{renderWithFormatting(text)}</>
}
`})}),`
`,(0,s.jsx)(t.h3,{children:`Rich text (inline elements)`}),`
`,(0,s.jsx)(t.p,{children:`Translation strings can contain XML-like tags that map to React components. Pass a function for each tag name — it receives the tag content and returns a React node:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { useTranslation, Provider } from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    MyApp: {
      info: 'You can read more in <link>the documentation</link>.',
    },
  },
  'nb-NO': {
    MyApp: {
      info: 'Du kan lese mer i <link>dokumentasjonen</link>.',
    },
  },
}

type T = (typeof translations)['en-GB']

function MyComponent() {
  const { formatMessage } = useTranslation<T>()
  return (
    <P>
      {formatMessage('MyApp.info', {
        link: (chunks) => <Anchor href="/docs">{chunks}</Anchor>,
      })}
    </P>
  )
}

render(
  <Provider translations={translations} locale="en-GB">
    <MyComponent />
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`This also works with the `,(0,s.jsx)(t.code,{children:`Translation`}),` component:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`<Translation
  id="MyApp.info"
  link={(chunks) => <Anchor href="/docs">{chunks}</Anchor>}
/>
`})}),`
`,(0,s.jsxs)(t.p,{children:[`You can use multiple tags and combine them with simple `,(0,s.jsx)(t.code,{children:`{placeholder}`}),` values:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    MyApp: {
      welcome:
        'Hello {name}, see <bold>important</bold> updates in <link>the changelog</link>.',
    },
  },
}

formatMessage('MyApp.welcome', {
  name: 'Ola',
  bold: (chunks) => <strong>{chunks}</strong>,
  link: (chunks) => <Anchor href="/changelog">{chunks}</Anchor>,
})
`})}),`
`,(0,s.jsxs)(t.p,{children:[`When `,(0,s.jsx)(t.a,{href:`#icu-message-format`,children:`ICU Message Format`}),` is enabled, tags work inside ICU messages as well:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`formatMessage('MyApp.items', {
  count: 3,
  link: (chunks) => <Anchor href="/cart">{chunks}</Anchor>,
})
// translation: 'You have {count, plural, one {# item} other {# items}}. <link>View cart</link>'
`})}),`
`,(0,s.jsx)(t.h3,{children:`ICU Message Format`}),`
`,(0,s.jsxs)(t.p,{children:[`Eufemia supports `,(0,s.jsx)(t.a,{href:`https://unicode-org.github.io/icu/userguide/format_parse/messages/`,children:`ICU MessageFormat`}),` syntax in translation strings. This enables pluralization, gender selection, and other locale-aware formatting directly in your messages.`]}),`
`,(0,s.jsxs)(t.p,{children:[`ICU support is opt-in to keep your bundle size small. Enable it by importing the `,(0,s.jsx)(t.code,{children:`icu`}),` message formatter and passing it to the `,(0,s.jsx)(t.code,{children:`Provider`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { icu, Provider } from '@dnb/eufemia/shared'

render(
  <Provider messageFormatter={icu} locale="en-GB">
    <App />
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Once enabled, ICU syntax is detected automatically. If a translation string contains ICU patterns like `,(0,s.jsx)(t.code,{children:`{key, plural, ...}`}),` or `,(0,s.jsx)(t.code,{children:`{key, select, ...}`}),`, it will be processed through the ICU formatter. Simple `,(0,s.jsx)(t.code,{children:`{placeholder}`}),` strings continue to work as before.`]}),`
`,(0,s.jsx)(t.h4,{children:`How ICU syntax works`}),`
`,(0,s.jsx)(t.p,{children:`An ICU message is a plain string. The simplest form is just literal text:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`Hello everyone
`})}),`
`,(0,s.jsx)(t.p,{children:`To insert a dynamic value, wrap a key name in curly braces. The key is looked up in the values you pass and its value is placed into the output:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`Hello {name}
`})}),`
`,(0,s.jsx)(t.p,{children:`To format a value based on its type, add a type after the key:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`{key, type}
`})}),`
`,(0,s.jsx)(t.p,{children:`To further control the output, add a format or style:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`{key, type, format}
`})}),`
`,(0,s.jsxs)(t.p,{children:[`For example, `,(0,s.jsx)(t.code,{children:`{amount, number}`}),` formats a number with locale-aware grouping, and `,(0,s.jsx)(t.code,{children:`{d, date, long}`}),` formats a date in the long style for the current locale.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Some types like `,(0,s.jsx)(t.code,{children:`plural`}),` and `,(0,s.jsx)(t.code,{children:`select`}),` use a set of matches instead of a format string. Each match maps a value to an output message:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`{count, plural, one {# item} other {# items}}
`})}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`other`}),` match is always required — it acts as the fallback when no other match applies. Inside a `,(0,s.jsx)(t.code,{children:`plural`}),` match, `,(0,s.jsx)(t.code,{children:`#`}),` is replaced with the formatted number.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Messages can be nested — for example, combining `,(0,s.jsx)(t.code,{children:`select`}),` with `,(0,s.jsx)(t.code,{children:`plural`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`{gender, select,
  male {He has {count, plural, one {# item} other {# items}}}
  female {She has {count, plural, one {# item} other {# items}}}
  other {They have {count, plural, one {# item} other {# items}}}
}
`})}),`
`,(0,s.jsx)(t.p,{children:`To escape curly braces or other ICU syntax characters, wrap them in single quotes:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:`This is not a placeholder: '{value}'
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Two consecutive single quotes produce a literal single quote: `,(0,s.jsx)(t.code,{children:`This isn''t a placeholder`}),` → `,(0,s.jsx)(t.code,{children:`This isn't a placeholder`}),`. For human-readable strings, prefer curly quotes (`,(0,s.jsx)(t.code,{children:`'`}),`, U+2019) instead of the ASCII apostrophe.`]}),`
`,(0,s.jsx)(t.p,{children:`The following sections show each ICU feature in detail with Eufemia examples.`}),`
`,(0,s.jsx)(t.h4,{children:`Pluralization`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`plural`}),` to vary text based on a count. The `,(0,s.jsx)(t.code,{children:`#`}),` token inside the message is replaced with the formatted number. The `,(0,s.jsx)(t.code,{children:`other`}),` category is always required.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { useTranslation, Provider, icu } from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    Notifications: {
      summary:
        'You have {count, plural, =0 {no new notifications} one {# new notification} other {# new notifications}}.',
    },
  },
  'nb-NO': {
    Notifications: {
      summary:
        'Du har {count, plural, =0 {ingen nye varsler} one {# nytt varsel} other {# nye varsler}}.',
    },
  },
}

type T = (typeof translations)['en-GB']

function NotificationBanner() {
  const { formatMessage } = useTranslation<T>()
  return <P>{formatMessage('Notifications.summary', { count: 3 })}</P>
  // en-GB: "You have 3 new notifications."
  // nb-NO: "Du har 3 nye varsler."
}

render(
  <Provider
    messageFormatter={icu}
    translations={translations}
    locale="en-GB"
  >
    <NotificationBanner />
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Plural categories vary by locale. English uses `,(0,s.jsx)(t.code,{children:`one`}),` and `,(0,s.jsx)(t.code,{children:`other`}),`. Some languages (like Arabic) use `,(0,s.jsx)(t.code,{children:`zero`}),`, `,(0,s.jsx)(t.code,{children:`one`}),`, `,(0,s.jsx)(t.code,{children:`two`}),`, `,(0,s.jsx)(t.code,{children:`few`}),`, `,(0,s.jsx)(t.code,{children:`many`}),`, and `,(0,s.jsx)(t.code,{children:`other`}),`. Use exact matches like `,(0,s.jsx)(t.code,{children:`=0`}),` when you need specific wording for a particular number regardless of locale.`]}),`
`,(0,s.jsx)(t.h4,{children:`Select`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`select`}),` to choose between message variants based on a string value. This is commonly used for gendered text or category-based messages.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Status: {
      response:
        '{gender, select, male {He} female {She} other {They}} responded to your request.',
    },
  },
}

type T = (typeof translations)['en-GB']

function StatusMessage() {
  const { formatMessage } = useTranslation<T>()
  return <P>{formatMessage('Status.response', { gender: 'female' })}</P>
  // Output: "She responded to your request."
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Selectordinal`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`selectordinal`}),` for ordinal number formatting (1st, 2nd, 3rd, etc.):`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Ranking: {
      position:
        'You finished in {pos, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place!',
    },
  },
}

type T = (typeof translations)['en-GB']

function RankingMessage() {
  const { formatMessage } = useTranslation<T>()
  return <P>{formatMessage('Ranking.position', { pos: 3 })}</P>
  // Output: "You finished in 3rd place!"
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Number formatting`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`{value, number}`}),` to format numbers with locale-aware grouping and decimal separators. You can add `,(0,s.jsx)(t.a,{href:`https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html`,children:`ICU number skeletons`}),` for currency, percent, and compact notation.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Account: {
      // Basic number: "1,234.56"
      total: 'Total: {amount, number}',

      // Currency: "kr 1 234,00" (nb-NO) / "NOK 1,234.00" (en-GB)
      balance: 'Balance: {amount, number, ::currency/NOK}',

      // Percent: "25%"
      progress: 'Progress: {pct, number, ::percent}',

      // Compact: "1.5K"
      followers: '{count, number, ::compact-short} followers',
    },
  },
}

type T = (typeof translations)['en-GB']

function AccountInfo() {
  const { formatMessage } = useTranslation<T>()
  return (
    <>
      <P>{formatMessage('Account.total', { amount: 1234.56 })}</P>
      <P>{formatMessage('Account.balance', { amount: 1234 })}</P>
      <P>{formatMessage('Account.progress', { pct: 0.25 })}</P>
      <P>{formatMessage('Account.followers', { count: 1500 })}</P>
    </>
  )
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Date formatting`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`{value, date}`}),` with an optional style — `,(0,s.jsx)(t.code,{children:`short`}),`, `,(0,s.jsx)(t.code,{children:`medium`}),`, `,(0,s.jsx)(t.code,{children:`long`}),`, or `,(0,s.jsx)(t.code,{children:`full`}),` — to format dates according to the locale:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Events: {
      // Default: "15 Jan 2025"
      created: 'Created: {d, date}',

      // Short: "15/01/2025"
      shortDate: '{d, date, short}',

      // Medium: "15 Jan 2025"
      mediumDate: '{d, date, medium}',

      // Long: "15 January 2025"
      longDate: '{d, date, long}',

      // Full: "Wednesday, 15 January 2025"
      fullDate: '{d, date, full}',
    },
  },
}

type T = (typeof translations)['en-GB']

function EventDate() {
  const { formatMessage } = useTranslation<T>()
  const d = new Date(2025, 0, 15)
  return <P>{formatMessage('Events.longDate', { d })}</P>
  // en-GB: "15 January 2025"
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Time formatting`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`{value, time}`}),` with a style to format times:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Schedule: {
      // Short: "14:30"
      starts: 'Starts at {t, time, short}',

      // Medium: "14:30:45"
      precise: 'Logged at {t, time, medium}',
    },
  },
}

type T = (typeof translations)['en-GB']

function ScheduleInfo() {
  const { formatMessage } = useTranslation<T>()
  return (
    <P>
      {formatMessage('Schedule.starts', {
        t: new Date(2025, 0, 15, 14, 30),
      })}
    </P>
  )
  // en-GB: "Starts at 14:30"
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`Pre-formatted values`}),`
`,(0,s.jsxs)(t.p,{children:[`ICU does not cover all formatting needs — for example, bank account numbers or national identity numbers. For these, format the value before passing it in as a simple placeholder. You can use Eufemia's formatting utilities like `,(0,s.jsx)(t.code,{children:`formatBankAccountNumber`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { useTranslation } from '@dnb/eufemia/shared'
import { formatBankAccountNumber } from '@dnb/eufemia/components/NumberFormat'

const translations = {
  'en-GB': {
    Account: {
      info: 'Your account number is {account}.',
    },
  },
}

type T = (typeof translations)['en-GB']

function AccountInfo({ accountNumber }: { accountNumber: string }) {
  const { formatMessage } = useTranslation<T>()

  // Use Eufemia's formatter for bank account numbers
  const account = formatBankAccountNumber(accountNumber)

  return <P>{formatMessage('Account.info', { account })}</P>
  // Output: "Your account number is 2000 12 34567."
}
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Other formatting utilities like `,(0,s.jsx)(t.code,{children:`formatNationalIdentityNumber`}),`, `,(0,s.jsx)(t.code,{children:`formatOrganizationNumber`}),`, and `,(0,s.jsx)(t.code,{children:`formatPhoneNumber`}),` work the same way. See the `,(0,s.jsx)(t.a,{href:`/uilib/components/number-format/`,children:`NumberFormat`}),` docs for the full list.`]}),`
`,(0,s.jsx)(t.h4,{children:`Nested messages`}),`
`,(0,s.jsxs)(t.p,{children:[`ICU messages can be nested — for example, combining `,(0,s.jsx)(t.code,{children:`select`}),` with `,(0,s.jsx)(t.code,{children:`plural`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`const translations = {
  'en-GB': {
    Items: {
      summary:
        '{gender, select, male {He has {count, plural, one {# item} other {# items}}} female {She has {count, plural, one {# item} other {# items}}} other {They have {count, plural, one {# item} other {# items}}}}',
    },
  },
}

type T = (typeof translations)['en-GB']

function ItemSummary() {
  const { formatMessage } = useTranslation<T>()
  return (
    <P>{formatMessage('Items.summary', { gender: 'female', count: 3 })}</P>
  )
  // Output: "She has 3 items"
}
`})}),`
`,(0,s.jsx)(t.h4,{children:`With the Translation component`}),`
`,(0,s.jsxs)(t.p,{children:[`ICU messages also work with the `,(0,s.jsx)(t.code,{children:`<Translation />`}),` component. Pass values as props:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Translation, Provider, icu } from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    Cart: {
      items:
        'You have {count, plural, =0 {an empty cart} one {# item} other {# items}} in your cart.',
    },
  },
}

render(
  <Provider
    messageFormatter={icu}
    translations={translations}
    locale="en-GB"
  >
    <P>
      <Translation id="Cart.items" count={5} />
    </P>
    {/* Output: "You have 5 items in your cart." */}
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`For a full reference of ICU MessageFormat syntax, see the `,(0,s.jsx)(t.a,{href:`https://formatjs.github.io/docs/core-concepts/icu-syntax`,children:`FormatJS ICU syntax guide`}),` and the `,(0,s.jsx)(t.a,{href:`https://unicode-org.github.io/icu/userguide/format_parse/messages/`,children:`ICU User Guide`}),`.`]}),`
`,(0,s.jsx)(t.h3,{children:`Fallback for missing or partial translations`}),`
`,(0,s.jsxs)(t.p,{children:[`The shared `,(0,s.jsx)(t.code,{children:`useTranslation`}),` hook will output missing keys when:`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[`Empty explicit locale: returns pointer strings (e.g. `,(0,s.jsx)(t.code,{children:`MyNamespace.label`}),`) derived from `,(0,s.jsx)(t.code,{children:`fallbackLocale="nb-NO"`}),`.`]}),`
`,(0,s.jsx)(t.li,{children:`Partial explicit locale: merges missing keys as pointer strings, preserving existing ones.`}),`
`,(0,s.jsx)(t.li,{children:`Non-existent current locale (no explicit entry in your translations): the hook preserves defaults (no pointers).`}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { useTranslation, Provider } from '@dnb/eufemia/shared'

const translations = {
  'sv-SE': {}, // empty explicit current-locale
  'en-GB': { MyNamespace: { label: 'English label' } },
}

type T = (typeof translations)['en-GB']

function Example() {
  const t = useTranslation<T>({
    fallbackLocale: 'en-GB', // default: 'nb-NO'
  })
  return <>{t.MyNamespace.label /* 'MyNamespace.label' */}</>
}

render(
  <Provider locale="sv-SE" translations={translations}>
    <Example />
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Load translations dynamically`}),`
`,(0,s.jsxs)(t.p,{children:[`When you have many locales or large translation files, you can load them on demand using the `,(0,s.jsx)(t.code,{children:`translationsLoader`}),` prop on the `,(0,s.jsx)(t.a,{href:`/uilib/usage/customisation/provider/`,children:`Provider`}),`. It accepts an async function that receives the current locale and returns a translations object. The loader is called on mount and whenever the locale changes.`]}),`
`,(0,s.jsx)(t.p,{children:`Components render with default translations immediately. When the loader resolves, translations are merged in and components re-render with the updated strings.`}),`
`,(0,s.jsxs)(t.p,{children:[`The loader function can use any source — dynamic `,(0,s.jsx)(t.code,{children:`import()`}),` of `,(0,s.jsx)(t.code,{children:`.ts`}),`, `,(0,s.jsx)(t.code,{children:`.js`}),`, or `,(0,s.jsx)(t.code,{children:`.json`}),` files, `,(0,s.jsx)(t.code,{children:`fetch()`}),` calls, or any other async operation. As long as the function returns a translations object, it works.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from '@dnb/eufemia/shared'

const translationsLoader = async (locale) => {
  switch (locale) {
    case 'en-GB':
      return (await import('./locales/en-GB')).default
    case 'sv-SE':
      return (await import('./locales/sv-SE')).default
    default:
      return (await import('./locales/nb-NO')).default
  }
}

render(
  <Provider translationsLoader={translationsLoader} locale="en-GB">
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`You can combine `,(0,s.jsx)(t.code,{children:`translationsLoader`}),` with the static `,(0,s.jsx)(t.code,{children:`translations`}),` prop. Static translations are available immediately, and loaded translations are merged on top:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from '@dnb/eufemia/shared'

const staticTranslations = {
  'nb-NO': { Modal: { closeTitle: 'Lukk' } },
}

const translationsLoader = async (locale) => {
  const response = await fetch(\`/api/translations/\${locale}\`)
  return response.json()
}

render(
  <Provider
    translations={staticTranslations}
    translationsLoader={translationsLoader}
    locale="nb-NO"
  >
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`translationsLoader`}),` is also available on `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` for form-scoped translations. Read more in the `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#load-translations-dynamically`,children:`Forms getting started guide`}),`.`]}),`
`,(0,s.jsx)(t.h3,{children:`Async translations with translationsLoader`}),`
`,(0,s.jsxs)(t.p,{children:[`Use the `,(0,s.jsx)(t.code,{children:`translationsLoader`}),` prop to load translations asynchronously, for example from a CDN or a lazy import. The loader receives the current locale and should return a translations object.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from '@dnb/eufemia/shared'

const translationsLoader = async (locale) => {
  const response = await fetch(\`/translations/\${locale}.json\`)
  return response.json()
}

render(
  <Provider translationsLoader={translationsLoader}>
    <MyApp />
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.p,{children:`Because the consumer owns the loader function, you can handle loading state, errors, and retries directly inside it:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from '@dnb/eufemia/shared'

function App() {
  const [translationsLoading, setTranslationsLoading] =
    React.useState(true)

  const translationsLoader = React.useCallback(async (locale) => {
    setTranslationsLoading(true)

    try {
      const translations = await import(\`../translations/\${locale}.json\`)
      return translations.default
    } catch (error) {
      console.error('Failed to load translations', error)
      return null
    } finally {
      setTranslationsLoading(false)
    }
  }, [])

  return (
    <Provider
      translationsLoader={translationsLoader}
      skeleton={translationsLoading}
    >
      <MyApp />
    </Provider>
  )
}
`})}),`
`,(0,s.jsx)(t.p,{children:`You can also return fallback translations when an error occurs, so the UI still renders meaningful content in the correct language:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider, useTranslation } from '@dnb/eufemia/shared'

const fallbackTranslations = {
  'nb-NO': {
    errorMessage: 'Kunne ikke laste oversettelser',
  },
  'en-GB': {
    errorMessage: 'Could not load translations',
  },
}

const translationsLoader = async (locale) => {
  try {
    const response = await fetch(\`/api/translations/\${locale}\`)
    return response.json()
  } catch (error) {
    return fallbackTranslations
  }
}

type FallbackTranslation =
  (typeof fallbackTranslations)[keyof typeof fallbackTranslations]

function ErrorBanner() {
  const { errorMessage } = useTranslation<FallbackTranslation>()
  if (errorMessage) {
    return <FormStatus state="error" text={errorMessage} />
  }
  return null
}

render(
  <Provider translationsLoader={translationsLoader}>
    <ErrorBanner />
    <MyApp />
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`TypeScript support`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider, Locales } from '@dnb/eufemia/shared'

const nbNO = {
  myString: 'Min egendefinerte streng',
}
const enGB = {
  myString: 'My custom string',
} satisfies typeof nbNO // Ensure the types are compatible

const myTranslations = {
  'nb-NO': nbNO,
  'en-GB': enGB,
}

// Infer the type of the translations
type Translation = (typeof myTranslations)[keyof typeof myTranslations]
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to combine with other tools`}),`
`,(0,s.jsxs)(t.p,{children:[`You can easily combine the locales support it with other translation tools, like `,(0,s.jsx)(t.code,{children:`react-intl`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Like, having the Eufemia components strings inside a JSON object/file `,(0,s.jsx)(t.code,{children:`en.json`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-json`,children:`{
  "Modal.closeTitle": "Overwrite",
  "other.string": "{foo} ({bar} of {max})"
}
`})}),`
`,(0,s.jsx)(t.p,{children:`and use it like this:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Provider as EufemiaProvider } from '@dnb/eufemia/shared'
import nb from './nb.json' // Has to be a JavaScript object

render(
  <EufemiaProvider
    locale="nb-NO"
    translations={{
      'nb-NO': nb,
    }}
  >
    <MyApp>Eufemia components</MyApp>
  </EufemiaProvider>
)
`})}),`
`,(0,s.jsx)(t.h3,{children:`Cascaded object (flat object, dot-notated keys) support`}),`
`,(0,s.jsxs)(t.ol,{children:[`
`,(0,s.jsxs)(t.li,{children:[`Lets say you have your translation files as JSON object/files `,(0,s.jsx)(t.code,{children:`en.json`}),`:`]}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-json`,children:`{
  "Modal.closeTitle": "Overwrite",
  "my.string": "string {foo}"
}
`})}),`
`,(0,s.jsxs)(t.ol,{start:`2`,children:[`
`,(0,s.jsx)(t.li,{children:`and use it with a React hook like this:`}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import {
  useTranslation,
  Provider as EufemiaProvider,
} from '@dnb/eufemia/shared'

import nb from './nb.json'
import en from './en.json'

const MyComponent = () => {
  // Note: no TypeScript support when using an identifier.
  const str = useTranslation('my.string', {
    foo: 'bar',
  })

  return str
}

render(
  <EufemiaProvider
    locale="nb-NO"
    translations={{
      'nb-NO': nb,
      'en-GB': en,
    }}
  >
    <MyComponent />
  </EufemiaProvider>
)
`})}),`
`,(0,s.jsxs)(t.ol,{start:`3`,children:[`
`,(0,s.jsx)(t.li,{children:`or as a React component:`}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import {
  Translation,
  Provider as EufemiaProvider,
} from '@dnb/eufemia/shared'

import nb from './nb.json'
import en from './en.json'

render(
  <EufemiaProvider
    locale="nb-NO"
    translations={{
      'nb-NO': nb,
      'en-GB': en,
    }}
  >
    <Translation id="my.string" foo="bar" />
  </EufemiaProvider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`For TypeScript support, you can use the `,(0,s.jsx)(t.code,{children:`Translation`}),` component with a function. You may also want to make a wrapper, so you can use your own translation types:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import {
  Translation,
  TranslationProps,
  Provider as EufemiaProvider,
} from '@dnb/eufemia/shared'

const translations = {
  'nb-NO': { my: { string: 'streng {foo}' } },
  'en-GB': { my: { string: 'string {foo}' } },
}
type TranslationType = (typeof translations)[keyof typeof translations]

render(
  <EufemiaProvider locale="nb-NO" translations={translations}>
    <Translation<TranslationType> id={(t) => t.my.string} foo="bar" />
  </EufemiaProvider>
)
`})}),`
`,(0,s.jsxs)(t.h3,{children:[`Formatting markers inside `,(0,s.jsx)(t.code,{children:`<Translation />`})]}),`
`,(0,s.jsxs)(t.p,{children:[`When using `,(0,s.jsx)(t.code,{children:`<Translation />`}),`, simple inline formatting is applied automatically:`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`{br}`}),` → line break`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`**bold**`}),`, `,(0,s.jsx)(t.code,{children:`_italic_`}),`, `,(0,s.jsx)(t.code,{children:"`code`"})]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`[label](https://…)`}),` links, and bare URLs become anchors`]}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import {
  Translation,
  Provider as EufemiaProvider,
} from '@dnb/eufemia/shared'

const translations = {
  'en-GB': {
    info: 'Use **bold** and _italic_ with a {br}line-break.',
  },
}
type TranslationType = (typeof translations)[keyof typeof translations]

render(
  <EufemiaProvider translations={translations} locale="en-GB">
    <P>
      <Translation<TranslationType> id={(t) => t.info} />
    </P>
  </EufemiaProvider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to add Eufemia provided locales`}),`
`,(0,s.jsx)(t.h3,{children:`Eufemia components`}),`
`,(0,s.jsx)(t.p,{children:`Eufemia provides component translations for the following locales:`}),`
`,(0,s.jsx)(i,{children:Object.keys(o).map(e=>(0,s.jsx)(r,{children:(0,s.jsx)(n,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/shared/locales/${e}.ts`,children:e})},e))}),`
`,(0,s.jsxs)(t.p,{children:[`To include e.g. `,(0,s.jsx)(t.code,{children:`sv-SE`}),` you can use the following code:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`import { Provider } from '@dnb/eufemia/shared'
import svSE from '@dnb/eufemia/shared/locales/sv-SE'

render(
  <Provider translations={svSE} locale="sv-SE">
    Your app
  </Provider>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`To include e.g. `,(0,s.jsx)(t.code,{children:`da-DK`}),` you can use the following code:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`import { Provider } from '@dnb/eufemia/shared'
import daDK from '@dnb/eufemia/shared/locales/da-DK'

render(
  <Provider translations={daDK} locale="da-DK">
    Your app
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h3,{children:`Eufemia Forms`}),`
`,(0,s.jsx)(t.p,{children:`Eufemia provides forms translations for the following locales:`}),`
`,(0,s.jsx)(i,{children:Object.keys(o).map(e=>(0,s.jsx)(r,{children:(0,s.jsx)(n,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/extensions/forms/constants/locales/${e}.ts`,children:e})},e))}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Note:`}),` Only `,(0,s.jsx)(t.code,{children:`nb-NO`}),` and `,(0,s.jsx)(t.code,{children:`en-GB`}),` are included by default.`]}),`
`,(0,s.jsxs)(t.p,{children:[`To support other locales such as `,(0,s.jsx)(t.code,{children:`sv-SE`}),` or `,(0,s.jsx)(t.code,{children:`da-DK`}),`, you need to import and merge the locale translations yourself.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`mergeTranslations`}),` to combine the forms translations (and country translations when needed) before you pass them to `,(0,s.jsx)(t.code,{children:`Form.Handler`}),` or `,(0,s.jsx)(t.code,{children:`Provider`}),`.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`import { mergeTranslations } from '@dnb/eufemia/shared'
import svSE_forms from '@dnb/eufemia/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/sv-SE'
import daDK_forms from '@dnb/eufemia/extensions/forms/constants/locales/da-DK'
import daDK_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/da-DK'

const translations = mergeTranslations(
  svSE_forms,
  svSE_forms_countries, // if needed
  daDK_forms, // if needed
  daDK_forms_countries // if needed
)
`})}),`
`,(0,s.jsx)(t.p,{children:`You can provide the merged translations for fields and values in a few different ways.`}),`
`,(0,s.jsx)(t.h4,{children:`Form.Handler`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide forms translations to the `,(0,s.jsx)(t.code,{children:`translations`}),` property within the `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component like this:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`import { Form } from '@dnb/eufemia/src/extensions/forms'
import { mergeTranslations } from '@dnb/eufemia/shared'
import svSE_forms from '@dnb/eufemia/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/sv-SE'

const translations = mergeTranslations(svSE_forms, svSE_forms_countries)

render(
  <Form.Handler translations={translations} locale="sv-SE">
    Your form
  </Form.Handler>
)
`})}),`
`,(0,s.jsx)(t.h4,{children:`Global translations`}),`
`,(0,s.jsxs)(t.p,{children:[`However, instead of providing the forms translations per form, you can also provide them globally using the `,(0,s.jsx)(t.code,{children:`Provider`}),` component:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`import { Provider, mergeTranslations } from '@dnb/eufemia/shared'
import svSE from '@dnb/eufemia/shared/locales/sv-SE'
import svSE_forms from '@dnb/eufemia/extensions/forms/constants/locales/sv-SE'
import svSE_forms_countries from '@dnb/eufemia/extensions/forms/constants/locales/countries/sv-SE'

const translations = mergeTranslations(
  svSE,
  svSE_forms,
  svSE_forms_countries
)

render(
  <Provider translations={translations} locale="sv-SE">
    Your app, including Eufemia Forms
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`How to add new locales`}),`
`,(0,s.jsxs)(t.p,{children:[`Create a new file (`,(0,s.jsx)(t.code,{children:`nn-NO.js`}),`) containing all the strings:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`export default {
  'nn-NO': {
    GlobalError: {
      404: {
        title: 'Me finn ikkje sida du leitar etter …',
      },
    },
  },
}
`})}),`
`,(0,s.jsx)(t.p,{children:`And add the file, like so:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'
import myTranslations from './locales/nn-NO'

render(
  <Provider translations={myTranslations}>
    <MyApp>Eufemia components</MyApp>
  </Provider>
)
`})}),`
`,(0,s.jsx)(t.h3,{children:`Add or update the locales during runtime`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Provider, Context } from '@dnb/eufemia/shared'

import myTranslations from './locales/nn-NO'

const ChangeLocale = () => {
  const { update, locale } = React.useContext(Context)

  // Add new locales
  update({ locales: myTranslations, locale: 'nn-NO' })

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
`})}),`
`,(0,s.jsx)(t.h2,{children:`Error handling`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`formatMessage`}),` provides development warnings (`,(0,s.jsx)(t.code,{children:`console.log`}),`) to help catch translation bugs. These warnings are `,(0,s.jsx)(t.strong,{children:`silent in production`}),` (`,(0,s.jsx)(t.code,{children:`NODE_ENV=production`}),`).`]}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Scenario`}),(0,s.jsx)(t.th,{children:`Behavior`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Missing message id`})}),(0,s.jsxs)(t.td,{children:[`Returns the raw id as fallback. Warns in development when the id contains a dot (e.g. `,(0,s.jsx)(t.code,{children:`MyApp.key`}),`).`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Missing variable`})}),(0,s.jsxs)(t.td,{children:[`Leaves the `,(0,s.jsx)(t.code,{children:`{placeholder}`}),` in the output. Warns about unreplaced placeholders.`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Invalid ICU syntax`})}),(0,s.jsx)(t.td,{children:`Catches the parse error, returns the message id as fallback, and warns.`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Missing ICU variable`})}),(0,s.jsx)(t.td,{children:`Catches the runtime error, returns the message id as fallback, and warns.`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Missing locale bundle`})}),(0,s.jsxs)(t.td,{children:[`Falls back to the default locale (`,(0,s.jsx)(t.code,{children:`nb-NO`}),`) and warns.`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Fallback locale`})}),(0,s.jsxs)(t.td,{children:[`See `,(0,s.jsx)(t.a,{href:`#fallback-for-missing-or-partial-translations`,children:`Fallback for missing or partial translations`}),`.`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsxs)(t.strong,{children:[(0,s.jsx)(t.code,{children:`{br}`}),` in messages`]})}),(0,s.jsxs)(t.td,{children:[`Not treated as a missing variable. Handled by `,(0,s.jsx)(t.code,{children:`renderWithFormatting`}),`.`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.strong,{children:`Function args without tags`})}),(0,s.jsxs)(t.td,{children:[`When a function is passed as a replacement value but no matching `,(0,s.jsx)(t.code,{children:`<tag>`}),` exists, the function is called without arguments and its return value is used as the replacement.`]})]})]})]})]})}function l(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}export{l as default};