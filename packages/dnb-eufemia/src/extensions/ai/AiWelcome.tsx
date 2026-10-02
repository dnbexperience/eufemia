import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import H from '../../elements/H'
import type { AiWelcomeProps } from './types'

function AiWelcome(props: AiWelcomeProps) {
  const { title, level = 2, children, className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-welcome', className),
  })

  return (
    <div {...rootProps}>
      <H
        element={`h${level}`}
        size="x-large"
        space={0}
        className="dnb-ai-welcome__title"
      >
        {title}
      </H>
      {children}
    </div>
  )
}

export default AiWelcome
