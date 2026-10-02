import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import useTranslation from '../../shared/useTranslation'
import AiCollapsible from './AiCollapsible'
import AiResponse from './AiResponse'
import AiShimmer from './AiShimmer'
import type { AiReasoningProps } from './types'

function AiReasoning(props: AiReasoningProps) {
  const {
    part,
    isStreaming = part?.state === 'streaming',
    children = part?.text,
    className,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const [open, setOpen] = useState(isStreaming)
  const hasToggledRef = useRef(false)

  // Open while streaming and close when done, until the user takes over
  useEffect(() => {
    if (!hasToggledRef.current) {
      setOpen(isStreaming)
    }
  }, [isStreaming])

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-reasoning', className),
  })

  return (
    <div {...rootProps}>
      <AiCollapsible
        label={
          isStreaming ? (
            <AiShimmer>{translation.thinking}</AiShimmer>
          ) : (
            translation.reasoning
          )
        }
        open={open}
        onToggle={() => {
          hasToggledRef.current = true
          setOpen((current) => !current)
        }}
      >
        <AiResponse
          className="dnb-ai-reasoning__content"
          parseIncompleteMarkdown={isStreaming}
        >
          {children}
        </AiResponse>
      </AiCollapsible>
    </div>
  )
}

export default AiReasoning
