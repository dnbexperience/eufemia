import useChatTranslation from '../../chat/hooks/useTranslation'

export default function useTranslation() {
  const translation = useChatTranslation()
  return { ...translation, Ai: translation.Chat }
}
