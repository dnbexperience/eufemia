import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { ChatActivityTextProps } from './types'

function ChatActivityText(props: ChatActivityTextProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-activity-text', className),
  })

  return <span {...rootProps} />
}

export default ChatActivityText
