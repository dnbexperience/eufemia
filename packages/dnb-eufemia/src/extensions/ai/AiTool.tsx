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
import type { AiToolPart, AiToolProps, AiToolState } from './types'

type AiToolStatus = 'running' | 'awaiting' | 'done' | 'error' | 'canceled'

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
    part,
    title,
    state = part?.state ?? 'input-available',
    errorText = part?.errorText,
    children,
    className,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const status = getStatus(state, part?.approval?.approved)

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
        <span className="dnb-ai-tool__title">
          {title ?? part?.title ?? (part && getToolName(part))}
        </span>
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

function getStatus(state: AiToolState, approved?: boolean): AiToolStatus {
  switch (state) {
    case 'approval-requested':
      return 'awaiting'
    case 'approval-responded':
      return approved === false ? 'canceled' : 'running'
    case 'output-available':
      return 'done'
    case 'output-error':
      return 'error'
    case 'output-denied':
      return 'canceled'
    default:
      return 'running'
  }
}

function getToolName(part: AiToolPart) {
  return part.type === 'dynamic-tool'
    ? part.toolName
    : part.type.slice('tool-'.length)
}

export default AiTool
