import React from 'react'
import classnames from 'classnames'
import { Drawer, Space, Tooltip } from '@dnb/eufemia/src/components'
import { H2 } from '@dnb/eufemia/src'
import ToggleGrid from './ToggleGrid'
import { Context } from '@dnb/eufemia/src/shared'
import PortalSkeleton from '../../core/PortalSkeleton'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'
import { buttonStyle } from './PortalToolsMenu.module.scss'
import { TooltipPosition } from '@dnb/eufemia/src/components/tooltip/types'
import { ButtonProps } from '@dnb/eufemia/src/components/Button'

type Props = {
  className?: string
  tooltipPosition?: TooltipPosition
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
  const { skeleton, theme } = React.useContext(Context)

  return (
    <Drawer
      id="portal-tools"
      title="Portal Tools"
      triggerAttributes={{
        className: classnames(
          className,
          buttonStyle,
          hideWhenMediaLarge && 'hideWhenMediaLarge',
        ),
        size: 'default',
        icon: 'more',
        icon_size: 'medium',
        skeleton: false,
        left: 'x-small',
        tooltip: (
          <Tooltip
            position={tooltipPosition}
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
      <Drawer.Body spacing>
        <Space>
          <H2 skeleton={false} size="small">
            Show everything behind skeletons
          </H2>
          <Space top>
            <PortalSkeleton top={false} enabled={skeleton} />
          </Space>
        </Space>

        <Space top="large">
          <H2 size="small">Change portal language</H2>
          <Space top>
            <ChangeLocale />
          </Space>
        </Space>

        <Space top="large">
          <H2 size="small">Change Brand</H2>
          <Space top>
            <ChangeStyleTheme />
          </Space>
        </Space>

        {theme.name === 'sbanken' && (
          <Space top="large">
            <H2 size="small">Map colors</H2>
            <ChangeStyleTheme.PropMapping enabled={theme.propMapping} />
          </Space>
        )}

        <Space top="large">
          <H2 size="small">Helper grid lines</H2>
          <Space top>
            <ToggleGrid />
          </Space>
        </Space>
      </Drawer.Body>
    </Drawer>
  )
}
