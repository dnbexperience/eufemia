import React from 'react'
import { Modal, Space, Tooltip } from '@dnb/eufemia/src/components'
import { H2 } from '@dnb/eufemia/src/elements'
import ToggleGrid from './ToggleGrid'
import { Context } from '@dnb/eufemia/src/shared'
import PortalSkeleton from 'dnb-design-system-portal/src/shared/parts/uilib/PortalSkeleton'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'

export default function PortalToolsMenu({
  className,
  tooltipPosition = 'left',
  ...props
}) {
  const { skeleton } = React.useContext(Context)
  return (
    <Modal
      id="portal-tools"
      mode="drawer"
      title="Portal Tools"
      triggerAttributes={{
        size: 'default',
        icon: 'more',
        icon_size: 'medium',
        class: className,
        title: 'Portal Tools',
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
      }}
      {...props}
    >
      <Modal.Content spacing>
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
          <H2 size="small">Change style theme</H2>
          <Space top>
            <ChangeStyleTheme />
          </Space>
        </Space>

        <Space top="large">
          <H2 size="small">Helper grid lines</H2>
          <Space top>
            <ToggleGrid />
          </Space>
        </Space>
      </Modal.Content>
    </Modal>
  )
}
