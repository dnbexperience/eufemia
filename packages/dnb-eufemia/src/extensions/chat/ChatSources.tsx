import { useState } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Anchor from '../../components/Anchor'
import Space from '../../components/Space'
import Ul from '../../elements/Ul'
import useTranslation from './hooks/useTranslation'
import ChatCollapsible from './ChatCollapsible'
import { sanitizeUrl } from './markdown/sanitizeUrl'
import type { ChatSourcesProps } from './types'

function ChatSources(props: ChatSourcesProps) {
  const { sources: sourcesProp = [], className, ...rest } = props

  const translation = useTranslation().Chat
  const [open, setOpen] = useState(false)
  const sources = sourcesProp
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
      <ChatCollapsible
        label={translation.sources.replace(
          '%count',
          String(sources.length)
        )}
        open={open}
        onToggle={() => setOpen((current) => !current)}
      >
        <Space innerSpace={{ top: 'x-small' }}>
          <Ul top={0} bottom={0} className="dnb-ai-sources__list">
            {sources.map(({ url, title }, index) => (
              <li key={index}>
                <Anchor
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title || url}
                </Anchor>
              </li>
            ))}
          </Ul>
        </Space>
      </ChatCollapsible>
    </div>
  )
}

export default ChatSources
