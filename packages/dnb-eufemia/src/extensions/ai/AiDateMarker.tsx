import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import DateFormat from '../../components/DateFormat'
import Hr from '../../elements/Hr'
import type { AiDateMarkerProps } from './types'

function AiDateMarker(props: AiDateMarkerProps) {
  const { date, children, className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-date-marker', className),
  })

  return (
    <div {...rootProps}>
      <span className="dnb-ai-date-marker__date">
        {children ?? <DateFormat value={date} dateStyle="full" />}
      </span>
      <Hr className="dnb-ai-date-marker__line" space={0} />
    </div>
  )
}

export default AiDateMarker
