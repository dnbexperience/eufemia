import { useContext, useEffect } from 'react'
import { Drawer } from '@dnb/eufemia/src/components'
import { Anchor, Flex } from '@dnb/eufemia/src'
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
  open,
  noAnimation,
  onOpen,
  onClose,
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
      title="Portal Tools"
      open={open}
      noAnimation={noAnimation}
      onOpen={onOpen}
      onClose={onClose}
      {...props}
    >
      <Drawer.Body innerSpace={{ block: 'large' }}>
        <Flex.Stack gap="large">
          <ChangeStyleTheme
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/usage/customisation/theming/">
                  theming
                </Anchor>
              </>
            }
          />
          <ChangeLocale
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/usage/customisation/localization/">
                  localization
                </Anchor>
              </>
            }
          />

          <ToggleDarkMode
            label="Dark mode"
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/web/usage/customisation/theming/">
                  theming
                </Anchor>
              </>
            }
          />

          <Flex.Stack gap="small">
            <ToggleNativeTypography />
            <PortalSkeleton
              enabled={skeleton}
              label="Show everything behind skeletons"
              skeleton={false}
            />
            <ToggleGrid label="Show grid" />
          </Flex.Stack>
        </Flex.Stack>
      </Drawer.Body>
    </Drawer>
  )
}
