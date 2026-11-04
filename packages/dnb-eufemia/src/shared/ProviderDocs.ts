import type { PropertiesTableProps } from './types'

export const ProviderProperties: PropertiesTableProps = {
  children: {
    doc: 'The content.',
    type: 'React.ReactNode',
    status: 'required',
  },
  value: {
    doc: 'Send in an object that gets spread as properties to the Provider.',
    type: 'object',
    status: 'optional',
  },
  locale: {
    doc: 'Defines the locale used for translations and number formatting. Eufemia includes `nb-NO` and `en-GB`, and you can [add other locales](/web/styling-and-themes/configuration/localization/#how-to-add-eufemia-provided-locales), such as `sv-SE` or `da-DK`. Defaults to `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
  currency: {
    doc: 'Defines the default currency. It is used by `NumberFormat.Currency`, by `Field.Currency` and `Value.Currency` when they have no `currency` of their own, and when `currency` or `asCurrency` is `true` on `NumberFormat`, `Field.Number` or `InputMasked`. Defaults to `NOK`.',
    type: 'string',
    status: 'optional',
  },
  currencyDisplay: {
    doc: "Deprecated. Has no effect. Use `NumberFormat={{ currencyDisplay: 'code' }}` instead.",
    type: 'string',
    status: 'deprecated',
  },
  translations: {
    doc: 'Overwrite existing translation strings or define new strings, per locale. See [Provide your own translations](/web/styling-and-themes/configuration/localization/#provide-your-own-translations).',
    type: 'object',
    status: 'optional',
  },
  translationsLoader: {
    doc: 'Async function that loads translations for a given locale. It is called on mount and whenever the locale changes, and the loaded translations are merged with `translations`. See [Async translations with translationsLoader](/web/styling-and-themes/configuration/localization/#async-translations-with-translationsloader).',
    type: 'function',
    status: 'optional',
  },
  messageFormatter: {
    doc: 'Message formatter for advanced message formatting, such as ICU MessageFormat. Import and pass `icu` from `@dnb/eufemia/shared` to enable pluralization, select and other ICU features in translation strings. See [ICU Message Format](/web/styling-and-themes/configuration/localization/#icu-message-format).',
    type: 'function',
    status: 'optional',
  },
  skeleton: {
    doc: 'Enables the skeleton on all components inside the Provider that support it.',
    type: 'boolean',
    status: 'optional',
  },
  formElement: {
    doc: 'Properties for all form components inside the Provider: `disabled`, `skeleton`, `vertical`, `labelDirection` and `translate`.',
    type: 'object',
    status: 'optional',
  },
  iconBaseUrl: {
    doc: 'Optional SVG directory override for named icons. Defaults to the public asset CDN for the installed Eufemia version, or the unversioned CDN in development. Set `false` to disable remote icon loading. See [Icon assets](/web/styling-and-themes/configuration/provider/#icon-assets).',
    type: ['string', 'false'],
    status: 'optional',
  },
  breakpoints: {
    doc: 'Custom breakpoints for the `MediaQuery` component and the `useMedia` and `useMediaQuery` hooks. See [Use different breakpoints](/web/layout-and-typography/breakpoints/#use-different-breakpoints).',
    type: 'object',
    status: 'optional',
  },
  'Component properties': {
    doc: 'Default properties for a component, given by the component name, such as `Button={{ size: "large" }}`. See [Send down component properties](/web/styling-and-themes/configuration/provider/#send-down-component-properties).',
    type: 'object',
    status: 'optional',
  },
}
