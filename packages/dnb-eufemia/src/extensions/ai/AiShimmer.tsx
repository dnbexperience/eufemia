import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { AiShimmerProps } from './types'

function AiShimmer(props: AiShimmerProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-shimmer', className),
  })

  return <span {...rootProps} />
}

export default AiShimmer
