import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
    actionLabel,
    children,
    agentAvatar = <Avatar size="small" icon={aino} hasLabel />,
    targetVisual,
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
  const undoRef = useRef<HTMLButtonElement>(null)
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
    [running && actionLabel, children].filter(Boolean).join(' ')

  useLayoutEffect(() => {
    const active = document.activeElement
    if (
      (!showUndo || undoDisabled) &&
      undoHasFocusRef.current &&
      (active === undoRef.current || active === document.body || !active)
    ) {
      statusRef.current?.focus()
    }
    undoHasFocusRef.current =
      showUndo &&
      !undoDisabled &&
      document.activeElement === undoRef.current
  }, [showUndo, undoDisabled])

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
      {agentAvatar && (
        <span className="dnb-ai-agent-action__avatar" aria-hidden>
          {agentAvatar}
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
              aria-label={[actionLabel, children]
                .filter(Boolean)
                .join(' ')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={
                value === undefined ? translation.toolRunning : undefined
              }
            >
              <span className="dnb-ai-agent-action__label">
                {actionLabel && (
                  <span className="dnb-ai-agent-action__text">
                    {actionLabel}
                  </span>
                )}
                <span
                  className={clsx(
                    'dnb-ai-agent-action__target',
                    targetVisual &&
                      'dnb-ai-agent-action__target--has-visual'
                  )}
                >
                  <span
                    className="dnb-ai-agent-action__fill"
                    style={
                      value === undefined
                        ? undefined
                        : {
                            width:
                              'calc(' +
                              value +
                              '% + ' +
                              2.3125 * (1 - value / 100) +
                              'rem)',
                          }
                    }
                    aria-hidden
                  />
                  {targetVisual && (
                    <span
                      className="dnb-ai-agent-action__target-visual"
                      aria-hidden
                    >
                      {targetVisual}
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
              ref={undoRef}
              variant="secondary"
              size="small"
              icon={undo}
              iconPosition="left"
              className="dnb-ai-agent-action__undo-button"
              disabled={undoDisabled}
              onFocus={() => {
                undoHasFocusRef.current = true
              }}
              onBlur={(event) => {
                // Disabling a focused button fires blur in some browsers only.
                if (!event.currentTarget.hasAttribute('disabled')) {
                  undoHasFocusRef.current = false
                }
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

  if (!Number.isFinite(deadline)) {
    return 0
  }

  return now === undefined
    ? undefined
    : Math.max(0, Math.ceil((deadline - Math.max(now, Date.now())) / 1000))
}

export default AiAgentAction
