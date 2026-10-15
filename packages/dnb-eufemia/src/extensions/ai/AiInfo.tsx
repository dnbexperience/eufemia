import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { AiInfoProps } from './types'

function AiInfo(props: AiInfoProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-info', className),
  })

  return <div {...rootProps} />
}

export default AiInfo
