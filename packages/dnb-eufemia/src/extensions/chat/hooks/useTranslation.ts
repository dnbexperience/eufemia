import { useContext, useMemo } from 'react'
import Context from '../../../shared/Context'
import sharedUseTranslation from '../../../shared/useTranslation'
import { LOCALE } from '../../../shared/defaults'
import locales from '../constants/locales'

type ChatTranslation = (typeof locales)[keyof typeof locales]
type CompatibleTranslation = Partial<ChatTranslation> & {
  Ai?: Partial<ChatTranslation['Chat']>
}

export default function useTranslation() {
  const { locale, translation } = useContext(Context)
  const base = useMemo(() => {
    const defaults =
      locale === 'en' || locale.startsWith('en-')
        ? locales['en-GB']
        : locales[LOCALE]
    const overrides = translation as CompatibleTranslation

    return {
      ...translation,
      Chat: {
        ...defaults.Chat,
        ...overrides.Ai,
        ...overrides.Chat,
      },
    }
  }, [locale, translation])

  return sharedUseTranslation<ChatTranslation>({
    base,
    fallbackLocale: LOCALE,
  })
}
