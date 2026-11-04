import { useContext, useMemo } from 'react'
import Context from '../../../shared/Context'
import sharedUseTranslation from '../../../shared/useTranslation'
import { LOCALE } from '../../../shared/defaults'
import locales from '../constants/locales'

type AiTranslation = (typeof locales)[keyof typeof locales]

export default function useTranslation() {
  const { locale, translation } = useContext(Context)
  const base = useMemo(() => {
    const defaults =
      locale === 'en' || locale.startsWith('en-')
        ? locales['en-GB']
        : locales[LOCALE]

    return {
      ...translation,
      Ai: {
        ...defaults.Ai,
        ...(translation as Partial<AiTranslation>).Ai,
      },
    }
  }, [locale, translation])

  return sharedUseTranslation<AiTranslation>({
    base,
    fallbackLocale: LOCALE,
  })
}
