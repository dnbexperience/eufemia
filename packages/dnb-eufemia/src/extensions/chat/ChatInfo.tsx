import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { ChatInfoProps } from './types'

function ChatInfo(props: ChatInfoProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-info', className),
  })

  return <div {...rootProps} />
}

export default ChatInfo
