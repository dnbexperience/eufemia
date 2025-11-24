import { useCallback, useContext, useMemo } from 'react'
import listOfTimeZones from '../../constants/timezones'
import { warn } from '../../../../shared/helpers'
import { LOCALE } from '../../../../shared/defaults'
import SharedContext, { InternalLocale } from '../../../../shared/Context'

export default function useTimeZones({
  translateAllLocales = false,
}: {
  /**
   * If set to `true`, all locales will be translated.
   * This is useful when you want to show the translated timezone name (e.g. sv or da) in the current locale (e.g. nb).
   */
  translateAllLocales?: boolean
} = {}) {
  const { locale, translations } = useContext(SharedContext)

  const translateTimeZones = useCallback(
    (locales: Array<InternalLocale>) => {
      const hasTranslations = locales.some((locale) => {
        return Boolean(translations?.[locale]?.timezones)
      })

      if (hasTranslations) {
        const missing = []
        const defaultLocale = LOCALE.split('-')[0]

        const result = listOfTimeZones.map((timezone) => {
          const translated = {}

          locales.forEach((locale) => {
            const { timezones } = translations?.[locale] || {}
            if (timezones) {
              const key = locale.split('-')[0]
              translated[key] = timezones[timezone.timezone]

              if (!translated[key]) {
                // Fall back to the default translation for this locale
                translated[key] = timezone.i18n[defaultLocale]
                missing.push(timezone.timezone)
              }
            }
          })

          return {
            // Ensure we don't mutate the original list
            ...timezone,
            i18n: { ...timezone.i18n, ...translated },
          }
        }) as unknown as typeof listOfTimeZones

        if (missing.length > 0) {
          warn('Missing timezone translation:', missing)
        }

        return result
      }

      return listOfTimeZones
    },
    [translations]
  )

  const timezones = useMemo(() => {
    if (translateAllLocales) {
      const allLocales = Object.keys(translations)
      return translateTimeZones(allLocales)
    }

    return translateTimeZones([locale])
  }, [locale, translateAllLocales, translateTimeZones, translations])

  return { timezones }
}

