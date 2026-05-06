import { mergeTranslations } from '@dnb/eufemia/src/shared'
import coreTranslations from '@dnb/eufemia/src/shared/locales'
import type { InternalLocale } from '@dnb/eufemia/src/shared/Context'

export { coreTranslations as translations }

export async function loadTranslations(locale: string) {
  switch (locale) {
    case 'en-US': {
      const enUS = (await import('@dnb/eufemia/src/shared/locales/en-US'))
        .default
      return enUS
    }
    case 'sv-SE': {
      const [svSE, svSEForms, svSECountries] = await Promise.all([
        import('@dnb/eufemia/src/shared/locales/sv-SE'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/sv-SE'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/countries/sv-SE'),
      ])
      return mergeTranslations(
        svSE.default,
        svSEForms.default,
        svSECountries.default
      )
    }
    case 'da-DK': {
      const [daDK, daDKForms, daDKCountries] = await Promise.all([
        import('@dnb/eufemia/src/shared/locales/da-DK'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/da-DK'),
        import('@dnb/eufemia/src/extensions/forms/constants/locales/countries/da-DK'),
      ])
      return mergeTranslations(
        daDK.default,
        daDKForms.default,
        daDKCountries.default
      )
    }
    default:
      return null
  }
}

export const supportedTranslationsKey = [
  ...Object.keys(coreTranslations),
  'en-US',
  'sv-SE',
  'da-DK',
]

export function getLang(locale: InternalLocale = 'nb-NO'): InternalLocale {
  try {
    const storedLocale = window.localStorage.getItem(
      'locale'
    ) as InternalLocale
    if (storedLocale) {
      locale = storedLocale
    }
  } catch {
    // stop here
  }

  return locale
}

export function setLang(locale: string) {
  try {
    window.localStorage.setItem('locale', locale)
  } catch {
    // stop here
  }
}

export function getSkeletonEnabled() {
  try {
    return window.localStorage.getItem('skeleton-enabled') === 'true'
  } catch {
    return false
  }
}
