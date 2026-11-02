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
    doc: 'Defines the locale used for translations and number formatting. Eufemia includes `nb-NO` and `en-GB`, and you can [add other locales](/uilib/usage/customisation/localization/#how-to-add-eufemia-provided-locales), such as `sv-SE` or `da-DK`. Defaults to `nb-NO`.',
    type: 'string',
    status: 'optional',
  },
  currency: {
    doc: 'Defines the currency used by `NumberFormat` when its `currency` property is `true`, as with `NumberFormat.Currency`. Defaults to `NOK`.',
    type: 'string',
    status: 'optional',
  },
  translations: {
    doc: 'Overwrite existing translation strings or define new strings, per locale. See [Provide your own translations](/uilib/usage/customisation/localization/#provide-your-own-translations).',
    type: 'object',
    status: 'optional',
  },
  translationsLoader: {
    doc: 'Async function that loads translations for a given locale. It is called on mount and whenever the locale changes, and the loaded translations are merged with `translations`. See [Async translations with translationsLoader](/uilib/usage/customisation/localization/#async-translations-with-translationsloader).',
    type: 'function',
    status: 'optional',
  },
  messageFormatter: {
    doc: 'Message formatter for advanced message formatting, such as ICU MessageFormat. Import and pass `icu` from `@dnb/eufemia/shared` to enable pluralization, select and other ICU features in translation strings. See [ICU Message Format](/uilib/usage/customisation/localization/#icu-message-format).',
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
    doc: 'Optional SVG directory override for named icons. Defaults to the public asset CDN for the installed Eufemia version, or the unversioned CDN in development. Set `false` to disable remote icon loading. See [Icon assets](/uilib/usage/customisation/provider/#icon-assets).',
    type: ['string', 'false'],
    status: 'optional',
  },
  breakpoints: {
    doc: 'Custom breakpoints for the `MediaQuery` component and the `useMedia` and `useMediaQuery` hooks. See [Use different breakpoints](/uilib/layout/media-queries/#use-different-breakpoints).',
    type: 'object',
    status: 'optional',
  },
  'Component properties': {
    doc: 'Default properties for a component, given by the component name, such as `Button={{ size: "large" }}`. See [Send down component properties](/uilib/usage/customisation/provider/#send-down-component-properties).',
    type: 'object',
    status: 'optional',
  },
}
