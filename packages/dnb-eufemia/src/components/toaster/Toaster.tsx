import { useContext } from 'react'
import type { JSX } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import ToasterRenderer from './ToasterRenderer'
import type { ToasterProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useToaster, toasterManager } from './ToasterContext'
import ToasterHost from './ToasterHost'
import ToasterNotificationCenter from './ToasterNotificationCenter'
import ToasterNotificationCenterList from './ToasterNotificationCenterList'

export type ToasterAllProps = ToasterProps

const defaultProps: Partial<ToasterProps> = {
  inline: false,
}

function Toaster(localProps: ToasterAllProps): JSX.Element {
  const context = useContext(Context)

  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.Toaster
  )

  const {
    id = 'default',
    inline = false,
    placement = 'bottom-center',
    notificationButtonPlacement = 'floating',
    autoHideNotificationButton = false,
    showBadge = false,
    className,
    children,
    ...rest
  } = allProps

  return (
    <>
      {children}
      <ToasterRenderer
        id={id}
        inline={inline}
        placement={placement}
        notificationButtonPlacement={notificationButtonPlacement}
        autoHideNotificationButton={autoHideNotificationButton}
        showBadge={showBadge}
        className={className}
        {...rest}
      />
    </>
  )
}

Toaster.Host = ToasterHost
Toaster.NotificationCenter = ToasterNotificationCenter
Toaster.NotificationCenterList = ToasterNotificationCenterList
Toaster.useToaster = useToaster
Toaster.toasterManager = toasterManager

withComponentMarkers(Toaster, {
  _supportsSpacingProps: true,
})

export default Toaster
export { useToaster, toasterManager }
