import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import CopyOnClick from '../../components/CopyOnClick'
import Theme from '../../shared/Theme'
import useTranslation from './hooks/useTranslation'

export type AiCodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  code: string
  language?: string
}

export default function AiCodeBlock({
  code,
  language,
  children,
  className,
  ...rest
}: AiCodeBlockProps) {
  const translation = useTranslation().Ai
  return (
    <div className="dnb-ai-response__code-block">
      <pre
        className={clsx('dnb-pre dnb-space__bottom--zero', className)}
        data-language={language || undefined}
        {...rest}
      >
        {children}
      </pre>

      <Theme surface="dark" element={false}>
        <CopyOnClick.Button
          className="dnb-ai-response__copy"
          variant="tertiary"
          size="small"
          copyContent={code}
          title={translation.copyCode}
          tooltipContent={translation.codeCopied}
        />
      </Theme>
    </div>
  )
}
