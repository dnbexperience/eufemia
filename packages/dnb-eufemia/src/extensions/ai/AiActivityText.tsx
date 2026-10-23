import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { AiActivityTextProps } from './types'

function AiActivityText(props: AiActivityTextProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-activity-text', className),
  })

  return <span {...rootProps} />
}

export default AiActivityText
