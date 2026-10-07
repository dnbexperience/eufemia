import { clsx } from 'clsx'
import useTranslation from './hooks/useTranslation'
import AiMessage from './AiMessage'
import type { AiLoaderProps } from './types'

function AiLoader({ label, className, ...rest }: AiLoaderProps) {
  const translation = useTranslation().Ai

  return (
    <AiMessage
      from="assistant"
      className={clsx('dnb-ai-loader', className)}
      {...rest}
    >
      <span className="dnb-ai-loader__status" role="status">
        <span className="dnb-ai-loader__dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="dnb-sr-only">{label ?? translation.loading}</span>
      </span>
    </AiMessage>
  )
}

export default AiLoader
