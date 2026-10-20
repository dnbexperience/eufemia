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
import type { AiTaskProps } from './types'

const STATUS_ICONS = {
  awaiting: information_circled,
  done: check,
  error: exclamation_circled,
  canceled: close,
}

const STATUS_TEXTS = {
  running: 'taskRunning',
  awaiting: 'taskAwaitingConfirmation',
  done: 'taskDone',
  error: 'taskError',
  canceled: 'canceled',
} as const

function AiTask(props: AiTaskProps) {
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
    className: clsx('dnb-ai-task', `dnb-ai-task--${status}`, className),
  })

  return (
    <div {...rootProps}>
      <div className="dnb-ai-task__status">
        <span className="dnb-ai-task__icon" aria-hidden>
          {status === 'running' ? (
            <ProgressIndicator size="small" />
          ) : (
            <Icon icon={STATUS_ICONS[status]} />
          )}
        </span>
        <span className="dnb-ai-task__title">{title}</span>
        <span className="dnb-ai-task__state">
          {translation[STATUS_TEXTS[status]]}
        </span>
      </div>

      {status === 'error' && errorText && (
        <div className="dnb-ai-task__error">{errorText}</div>
      )}

      {children}
    </div>
  )
}

export default AiTask
