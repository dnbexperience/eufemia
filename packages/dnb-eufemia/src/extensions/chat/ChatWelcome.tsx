import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import H from '../../elements/H'
import type { ChatWelcomeProps } from './types'

function ChatWelcome(props: ChatWelcomeProps) {
  const {
    title,
    greeting,
    avatar,
    level = 2,
    children,
    className,
    ...rest
  } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-welcome', className),
  })

  return (
    <div {...rootProps}>
      {Boolean(greeting) && (
        <div className="dnb-ai-welcome__greeting">
          {avatar && (
            <span className="dnb-ai-welcome__avatar" aria-hidden>
              {avatar}
            </span>
          )}
          <div>{greeting}</div>
        </div>
      )}
      <H
        element={`h${level}`}
        size="large"
        space={0}
        className="dnb-ai-welcome__title"
      >
        {title}
      </H>
      {children}
    </div>
  )
}

export default ChatWelcome
