import { useId, useState } from 'react'
import { clsx } from 'clsx'
import type { UIMessage } from 'ai'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import HeightAnimation from '../../components/HeightAnimation'
import Anchor from '../../components/Anchor'
import useTranslation from '../../shared/useTranslation'
import { chevron_down } from '../../icons'
import { sanitizeUrl } from './markdown/sanitizeUrl'
import type { AiSource, AiSourcesProps } from './types'

function AiSources(props: AiSourcesProps) {
  const { sources: sourcesProp, message, className, ...rest } = props

  const translation = useTranslation().Ai
  const [open, setOpen] = useState(false)
  const id = useId()
  const sources = (sourcesProp ?? getSources(message))
    .map((source) => ({ ...source, url: sanitizeUrl(source.url) }))
    .filter((source) => source.url)

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-sources',
      open && 'dnb-ai-sources--open',
      className
    ),
  })

  if (sources.length === 0) {
    return null
  }

  return (
    <div {...rootProps}>
      <Button
        variant="tertiary"
        size="medium"
        icon={chevron_down}
        iconPosition="right"
        className="dnb-ai-sources__toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        {translation.sources.replace('%count', String(sources.length))}
      </Button>

      <HeightAnimation open={open} id={id}>
        <ul className="dnb-ul dnb-ai-sources__list">
          {sources.map(({ url, title }, index) => (
            <li key={index}>
              <Anchor href={url} target="_blank" rel="noopener noreferrer">
                {title || url}
              </Anchor>
            </li>
          ))}
        </ul>
      </HeightAnimation>
    </div>
  )
}

function getSources(message?: UIMessage): Array<AiSource> {
  return (message?.parts ?? [])
    .filter((part) => part.type === 'source-url')
    .map(({ url, title }) => ({ url, title }))
}

export default AiSources
