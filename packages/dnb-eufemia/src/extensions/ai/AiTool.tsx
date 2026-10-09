import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Icon from '../../components/Icon'
import ProgressIndicator from '../../components/ProgressIndicator'
import useTranslation from './hooks/useTranslation'
import {
  check,
  close,
  exclamation_circled,
  information_circled,
} from '../../icons'
import type { AiToolProps } from './types'

const STATUS_ICONS = {
  awaiting: information_circled,
  done: check,
  error: exclamation_circled,
  canceled: close,
}

const STATUS_TEXTS = {
  running: 'toolRunning',
  awaiting: 'toolAwaitingApproval',
  done: 'toolDone',
  error: 'toolError',
  canceled: 'canceled',
} as const

function AiTool(props: AiToolProps) {
  const {
    title,
    status = 'running',
    errorText,
    children,
    className,
    ...rest
  } = props

  const translation = useTranslation().Ai

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-tool', `dnb-ai-tool--${status}`, className),
  })

  return (
    <div {...rootProps}>
      <div className="dnb-ai-tool__status">
        <span className="dnb-ai-tool__icon" aria-hidden>
          {status === 'running' ? (
            <ProgressIndicator size="small" />
          ) : (
            <Icon icon={STATUS_ICONS[status]} />
          )}
        </span>
        <span className="dnb-ai-tool__title">{title}</span>
        <span className="dnb-ai-tool__state">
          {translation[STATUS_TEXTS[status]]}
        </span>
      </div>

      {status === 'error' && errorText && (
        <div className="dnb-ai-tool__error">{errorText}</div>
      )}

      {children}
    </div>
  )
}

export default AiTool
