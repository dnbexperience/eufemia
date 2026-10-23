import { useEffect } from 'react'
import type { JSX, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import AriaLive from '../aria-live/AriaLive'
import ToastStack from './ToastStack'
import { useToasterUI, useToasterEffects } from './useToasterState'
import { getToasterRefs } from './toasterRefs'
import type { SpacingProps } from '../../shared/types'
import type { ToasterPlacement } from './types'

export type ToasterHostProps = {
  /** A unique identifier for this Toaster instance. */
  id: string

  /** Where to position overlay toast messages. Default: `'bottom-center'` */
  placement?: ToasterPlacement

  /** Additional CSS class name. */
  className?: string

  /** Content to render inside the Toaster host. */
  children?: ReactNode
} & SpacingProps

function ToasterHost({
  id,
  placement = 'bottom-center',
  className,
  children,
  ...rest
}: ToasterHostProps): JSX.Element {
  const state = useToasterUI(id)
  useToasterEffects(id, state)

  const refs = getToasterRefs(id)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!refs.hasNotificationUI.current) {
        throw new Error(
          `Toaster.Host: No notification UI was found for id="${id}". ` +
            'Add a <Toaster.NotificationCenter /> or <Toaster.NotificationCenterList /> ' +
            'so users can access their messages.'
        )
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [id, refs])

  const rootProps = useSpacing(rest as ToasterHostProps, {
    className: clsx('dnb-toaster', className),
  })

  return (
    <div id={id} {...rootProps}>
      <AriaLive variant="text" priority={state.latestAnnouncementPriority}>
        {state.latestAnnouncement}
      </AriaLive>

      {children}

      {state.showToastStack && (
        <ToastStack
          placement={placement}
          messages={state.cappedStackMessages}
          entered={state.entered}
          dismissing={state.dismissing}
          stackExiting={state.stackExiting}
          onDismiss={state.handleStackHide}
          onVisible={state.handleVisible}
        />
      )}
    </div>
  )
}

export default ToasterHost
