import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import type { AiDisclaimerProps } from './types'

function AiDisclaimer(props: AiDisclaimerProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-disclaimer', className),
  })

  return <div {...rootProps} />
}

export default AiDisclaimer
