import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import AriaLive from '../../components/AriaLive'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import { ErrorIcon } from '../../components/form-status/FormStatus'
import { useSpacing } from '../../components/space/SpacingUtils'
import { aino, undo } from '../../icons'
import useId from '../../shared/helpers/useId'
import Context from '../../shared/Context'
import { formatDate } from '../../components/date-format/DateFormatUtils'
import useTranslation from './hooks/useTranslation'
import type { AiAgentActionProps } from './types'

const statusTranslations = {
  running: 'taskRunning',
  done: 'taskDone',
  error: 'taskError',
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
    announce = true,
    className,
    ...rest
  } = props
  const translation = useTranslation().Ai
  const { locale } = useContext(Context)
  const statusRef = useRef<HTMLDivElement>(null)
  const undoRef = useRef<HTMLButtonElement>(null)
  const undoHasFocusRef = useRef(false)
  const undoDescriptionId = useId() + '-undo-description'
  const [undoMessage, setUndoMessage] = useState({
    announcement: '',
    description: '',
  })
  const wasUndoAvailableRef = useRef(false)
  const running = status === 'running'
  const canUndo = status === 'done' && !!onUndo
  const remaining = useUndoCountdown(canUndo, undoUntil)
  const showUndo = canUndo && remaining !== 0
  const undoText = undoLabel ?? translation.undo
  const undoAvailable = translation.undoAvailable.replace(
    '%action',
    undoText
  )
  const undoAvailableFor = translation.undoAvailableFor.replace(
    '%action',
    undoText
  )
  const undoAvailableForOneSecond =
    translation.undoAvailableForOneSecond.replace('%action', undoText)
  const undoUnavailable = translation.undoUnavailable.replace(
    '%action',
    undoText
  )
  const undoAvailableUntil = translation.undoAvailableUntil.replace(
    '%action',
    undoText
  )

  useEffect(() => {
    if (!canUndo || undoDisabled) {
      setUndoMessage({ announcement: '', description: '' })
      wasUndoAvailableRef.current = false
      return
    }
    if (!showUndo) {
      setUndoMessage({
        announcement: wasUndoAvailableRef.current ? undoUnavailable : '',
        description: '',
      })
      wasUndoAvailableRef.current = false
      return
    }
    const seconds =
      undoUntil === undefined
        ? undefined
        : Math.max(0, Math.ceil((undoUntil - Date.now()) / 1000))
    if (seconds === 0) {
      setUndoMessage({ announcement: '', description: '' })
      wasUndoAvailableRef.current = false
      return
    }
    wasUndoAvailableRef.current = true
    setUndoMessage({
      announcement:
        seconds === undefined
          ? undoAvailable
          : seconds === 1
            ? undoAvailableForOneSecond
            : undoAvailableFor.replace('%seconds', String(seconds)),
      description:
        undoUntil === undefined
          ? undoAvailable
          : undoAvailableUntil.replace(
              '%time',
              formatDate(new Date(undoUntil), {
                locale,
                options: { timeStyle: 'medium' },
              })
            ),
    })
  }, [
    canUndo,
    undoDisabled,
    showUndo,
    undoUntil,
    undoAvailable,
    undoAvailableFor,
    undoAvailableForOneSecond,
    undoUnavailable,
    undoAvailableUntil,
    locale,
    children,
    announce,
  ])
  const value = Number.isFinite(progress)
    ? Math.min(100, Math.max(0, progress))
    : undefined
  const announcement =
    translation[statusTranslations[status]] +
    ': ' +
    [running && actionLabel, children].filter(Boolean).join(' ') +
    (canUndo && !undoDisabled && undoMessage.announcement
      ? (/[.!?…]$/.test(children) ? ' ' : '. ') + undoMessage.announcement
      : '')

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
                value === undefined ? translation.taskRunning : undefined
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
            <span className="dnb-ai-agent-action__result">
              {status === 'error' && (
                <Icon
                  className="dnb-ai-agent-action__error-icon"
                  icon={<ErrorIcon title={null} />}
                  size={16}
                  inheritColor={false}
                  aria-hidden
                />
              )}
              {status === 'error' ? <span>{children}</span> : children}
            </span>
          )}
        </div>
        {showUndo && (
          <span className="dnb-ai-agent-action__undo">
            <span id={undoDescriptionId} className="dnb-sr-only">
              {undoMessage.description}
            </span>
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
              aria-describedby={undoDescriptionId}
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
              {undoText}
            </Button>
          </span>
        )}
      </div>
      <AriaLive disabled={!announce}>{announcement}</AriaLive>
    </div>
  )
}

function useUndoCountdown(active: boolean, deadline?: number) {
  const [now, setNow] = useState<number>()
  const validDeadline =
    Number.isFinite(deadline) &&
    Number.isFinite(new Date(deadline).getTime())

  useEffect(() => {
    if (!active || !validDeadline) {
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
  }, [active, deadline, validDeadline])

  if (deadline === undefined) {
    return undefined
  }

  if (!validDeadline) {
    return 0
  }

  return now === undefined
    ? undefined
    : Math.max(0, Math.ceil((deadline - Math.max(now, Date.now())) / 1000))
}

export default AiAgentAction
