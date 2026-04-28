import React, { useContext } from 'react'
import clsx from 'clsx'
import { Drawer, Tooltip } from '@dnb/eufemia/src/components'
import { Anchor, Flex } from '@dnb/eufemia/src'
import ToggleGrid from './ToggleGrid'
import { Context } from '@dnb/eufemia/src/shared'
import PortalSkeleton from '../../core/PortalSkeleton'
import ToggleDarkMode from '../../core/ToggleDarkMode'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'
import { buttonStyle } from './PortalToolsMenu.module.scss'
import type { TooltipPlacement } from '@dnb/eufemia/src/components/tooltip/types'
import type { ButtonProps } from '@dnb/eufemia/src/components/Button'

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.GATSBY_IS_PREVIEW === 'true'

type Props = {
  className?: string
  tooltipPosition?: TooltipPlacement
  triggerAttributes?: ButtonProps
  hideWhenMediaLarge?: boolean
}

export default function PortalToolsMenu({
  className = null,
  tooltipPosition = 'left',
  triggerAttributes = null,
  hideWhenMediaLarge = false,
  ...props
}: Props) {
  const { skeleton } = useContext(Context)

  return (
    <Drawer
      id="portal-tools"
      title="Portal Tools"
      triggerAttributes={{
        className: clsx(
          className,
          buttonStyle,
          hideWhenMediaLarge && 'hideWhenMediaLarge'
        ),
        size: 'default',
        icon: 'more',
        iconSize: 'medium',
        skeleton: false,
        left: 'x-small',
        tooltip: (
          <Tooltip
            placement={tooltipPosition}
            // Use 4001 to be over header of 4000
            style={{ zIndex: 4001 }}
            fixedPosition
          >
            Open the portal tools
          </Tooltip>
        ),
        ...triggerAttributes,
      }}
      {...props}
    >
      <Drawer.Body innerSpace={{ block: 'large' }}>
        <Flex.Stack gap="large">
          <ChangeStyleTheme
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/uilib/usage/customisation/theming/">
                  theming
                </Anchor>
              </>
            }
          />
          <ChangeLocale
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/uilib/usage/customisation/localization/">
                  localization
                </Anchor>
              </>
            }
          />

          {isDev && (
            <ToggleDarkMode
              label="Dark mode"
              labelDescription={
                <>
                  Read more about{' '}
                  <Anchor href="/uilib/usage/customisation/theming/">
                    theming
                  </Anchor>
                </>
              }
            />
          )}

          <PortalSkeleton
            enabled={skeleton}
            label="Show everything behind skeletons"
            skeleton={false}
          />

          <ToggleGrid label="Show grid" />
        </Flex.Stack>
      </Drawer.Body>
    </Drawer>
  )
}
