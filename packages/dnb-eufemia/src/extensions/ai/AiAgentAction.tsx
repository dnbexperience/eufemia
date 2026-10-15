import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import AriaLive from '../../components/AriaLive'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import { useSpacing } from '../../components/space/SpacingUtils'
import { aino, undo } from '../../icons'
import useTranslation from './hooks/useTranslation'
import type { AiAgentActionProps } from './types'

const statusTranslations = {
  running: 'toolRunning',
  done: 'toolDone',
  error: 'toolError',
  canceled: 'canceled',
} as const

function AiAgentAction(props: AiAgentActionProps) {
  const {
    status = 'running',
    action,
    children,
    avatar = <Avatar size="small" icon={aino} hasLabel />,
    icon,
    progress,
    onUndo,
    undoUntil,
    undoLabel,
    undoDisabled,
    className,
    ...rest
  } = props
  const translation = useTranslation().Ai
  const statusRef = useRef<HTMLDivElement>(null)
  const undoHasFocusRef = useRef(false)
  const running = status === 'running'
  const remaining = useUndoCountdown(
    status === 'done' && !!onUndo,
    undoUntil
  )
  const showUndo = status === 'done' && !!onUndo && remaining !== 0
  const value = Number.isFinite(progress)
    ? Math.min(100, Math.max(0, progress))
    : undefined
  const announcement =
    translation[statusTranslations[status]] +
    ': ' +
    [running && action, children].filter(Boolean).join(' ')

  useEffect(() => {
    if (!showUndo && undoHasFocusRef.current) {
      statusRef.current?.focus()
      undoHasFocusRef.current = false
    }
  }, [showUndo])

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-agent-action',
      'dnb-ai-agent-action--' + status,
      running &&
        value === undefined &&
        'dnb-ai-agent-action--indeterminate',
      className
    ),
  })

  return (
    <div {...rootProps}>
      {avatar && (
        <span className="dnb-ai-agent-action__avatar" aria-hidden>
          {avatar}
        </span>
      )}
      <div className="dnb-ai-agent-action__body">
        <div
          className="dnb-ai-agent-action__status"
          ref={statusRef}
          tabIndex={-1}
        >
          {running ? (
            <div
              className="dnb-ai-agent-action__processing"
              role="progressbar"
              aria-label={[action, children].filter(Boolean).join(' ')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={
                value === undefined ? translation.toolRunning : undefined
              }
            >
              <span className="dnb-ai-agent-action__label">
                {action && (
                  <span className="dnb-ai-agent-action__text">
                    {action}
                  </span>
                )}
                <span
                  className={clsx(
                    'dnb-ai-agent-action__target',
                    icon && 'dnb-ai-agent-action__target--has-icon'
                  )}
                >
                  <span
                    className="dnb-ai-agent-action__fill"
                    style={
                      value === undefined
                        ? undefined
                        : { width: String(value) + '%' }
                    }
                    aria-hidden
                  />
                  {icon && (
                    <span
                      className="dnb-ai-agent-action__icon"
                      aria-hidden
                    >
                      {icon}
                    </span>
                  )}
                  <span className="dnb-ai-agent-action__text">
                    {children}
                  </span>
                </span>
              </span>
            </div>
          ) : (
            <span className="dnb-ai-agent-action__result">{children}</span>
          )}
        </div>
        {showUndo && (
          <span className="dnb-ai-agent-action__undo">
            {remaining !== undefined && (
              <span
                className="dnb-ai-agent-action__countdown"
                role="timer"
                aria-live="off"
                aria-label={translation.undoTimeLeft}
              >
                {remaining}s
              </span>
            )}
            <Button
              variant="secondary"
              size="small"
              icon={undo}
              iconPosition="left"
              className="dnb-ai-agent-action__undo-button"
              disabled={undoDisabled}
              onFocus={() => {
                undoHasFocusRef.current = true
              }}
              onBlur={() => {
                undoHasFocusRef.current = false
              }}
              onClick={(event) => {
                if (undoUntil === undefined || Date.now() < undoUntil) {
                  onUndo(event)
                }
              }}
            >
              {undoLabel ?? translation.undo}
            </Button>
          </span>
        )}
      </div>
      <AriaLive>{announcement}</AriaLive>
    </div>
  )
}

function useUndoCountdown(active: boolean, deadline?: number) {
  const [now, setNow] = useState<number>()

  useEffect(() => {
    if (!active || !Number.isFinite(deadline)) {
      return undefined
    }

    let timeout: ReturnType<typeof setTimeout>
    const update = () => {
      const current = Date.now()
      setNow(current)
      if (deadline > current) {
        timeout = setTimeout(update, Math.min(1000, deadline - current))
      }
    }
    update()
    return () => clearTimeout(timeout)
  }, [active, deadline])

  if (deadline === undefined) {
    return undefined
  }

  return now !== undefined && Number.isFinite(deadline)
    ? Math.max(0, Math.ceil((deadline - Math.max(now, Date.now())) / 1000))
    : 0
}

export default AiAgentAction
