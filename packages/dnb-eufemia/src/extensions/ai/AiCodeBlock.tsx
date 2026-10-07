import { useCallback, useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import Button from '../../components/Button'
import Theme from '../../shared/Theme'
import useTranslation from './hooks/useTranslation'
import { copyToClipboard } from '../../shared/helpers'
import { check, copy } from '../../icons'

export type AiCodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  code: string
  language?: string
}

export default function AiCodeBlock({
  code,
  language,
  children,
  ...rest
}: AiCodeBlockProps) {
  const translation = useTranslation().Ai
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const onCopy = useCallback(async () => {
    if (await copyToClipboard(code)) {
      setCopied(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  return (
    <div className="dnb-ai-response__code-block">
      <pre
        className="dnb-pre dnb-space__bottom--zero"
        data-language={language || undefined}
        {...rest}
      >
        {children}
      </pre>

      <Theme surface="dark" element={false}>
        <Button
          className="dnb-ai-response__copy"
          variant="tertiary"
          size="small"
          icon={copied ? check : copy}
          title={copied ? translation.codeCopied : translation.copyCode}
          onClick={onCopy}
        />
      </Theme>
    </div>
  )
}
