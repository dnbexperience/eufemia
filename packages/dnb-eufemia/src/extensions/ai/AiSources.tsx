import { useState } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Anchor from '../../components/Anchor'
import useTranslation from '../../shared/useTranslation'
import AiCollapsible from './AiCollapsible'
import { sanitizeUrl } from './markdown/sanitizeUrl'
import type { AiMessageData, AiSource, AiSourcesProps } from './types'

function AiSources(props: AiSourcesProps) {
  const { sources: sourcesProp, message, className, ...rest } = props

  const translation = useTranslation().Ai
  const [open, setOpen] = useState(false)
  const sources = (sourcesProp ?? getSources(message))
    .map((source) => ({ ...source, url: sanitizeUrl(source.url) }))
    .filter((source) => source.url)

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-sources', className),
  })

  if (sources.length === 0) {
    return null
  }

  return (
    <div {...rootProps}>
      <AiCollapsible
        label={translation.sources.replace(
          '%count',
          String(sources.length)
        )}
        open={open}
        onToggle={() => setOpen((current) => !current)}
      >
        <ul className="dnb-ul dnb-ai-sources__list">
          {sources.map(({ url, title }, index) => (
            <li key={index}>
              <Anchor href={url} target="_blank" rel="noopener noreferrer">
                {title || url}
              </Anchor>
            </li>
          ))}
        </ul>
      </AiCollapsible>
    </div>
  )
}

function getSources(message?: AiMessageData): Array<AiSource> {
  return (message?.parts ?? []).flatMap((part) =>
    part.type === 'source-url' && typeof part.url === 'string'
      ? [{ url: part.url, title: part.title }]
      : []
  )
}

export default AiSources
