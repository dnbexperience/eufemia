import { useContext, useEffect } from 'react'
import { Button, Drawer } from '@dnb/eufemia/src/components'
import { Anchor, Flex, Hr } from '@dnb/eufemia/src'
import type { DrawerAllProps } from '@dnb/eufemia/src/components/drawer/Drawer'
import { Context } from '@dnb/eufemia/src/shared'
import ToggleGrid from './ToggleGrid'
import PortalSkeleton from '../../core/PortalSkeleton'
import ToggleDarkMode from '../../core/ToggleDarkMode'
import ToggleNativeTypography from '../../core/ToggleNativeTypography'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'

export default function PortalToolsDrawer({
  onReady,
  ...props
}: DrawerAllProps & { onReady: () => void }) {
  const { skeleton } = useContext(Context)
  useEffect(onReady, [onReady])

  return (
    <Drawer
      id="portal-tools-modal"
      omitTriggerButton
      focusSelector="#change-theme"
      restoreFocusTo={() => document.getElementById('portal-tools')}
      title="Settings"
      closeTitle="Close"
      {...props}
    >
      <Drawer.Body innerSpace={{ block: 'large' }}>
        <Flex.Stack gap="large">
          <ChangeStyleTheme
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/styling-and-themes/brands-and-dark-mode/">
                  theming
                </Anchor>
              </>
            }
          />
          <ToggleDarkMode
            label="Dark mode"
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/styling-and-themes/brands-and-dark-mode/">
                  theming
                </Anchor>
              </>
            }
          />
          <ChangeLocale
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/styling-and-themes/configuration/localization/">
                  localization
                </Anchor>
              </>
            }
          />

          <Hr />

          <Flex.Stack gap="small">
            <ToggleNativeTypography />
            <PortalSkeleton
              enabled={skeleton}
              label="Show everything behind skeletons"
              skeleton={false}
            />
            <ToggleGrid label="Show grid" />
          </Flex.Stack>

          <Hr />

          <Flex.Stack align="flex-start">
            <Button
              text="Clear saved settings"
              variant="secondary"
              onClick={() => {
                window.localStorage.clear()
                window.sessionStorage.clear()
                window.location.reload()
              }}
            />
          </Flex.Stack>
        </Flex.Stack>
      </Drawer.Body>
    </Drawer>
  )
}
