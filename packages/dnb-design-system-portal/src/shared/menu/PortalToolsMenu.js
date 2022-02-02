import React from 'react'
import { Modal, Space, Tooltip } from '@dnb/eufemia/src/components'
import { H2 } from '@dnb/eufemia/src/elements'
import ToggleGrid from './ToggleGrid'
import { Context } from '@dnb/eufemia/src/shared'
import PortalSkeleton from 'dnb-design-system-portal/src/shared/parts/uilib/PortalSkeleton'
import ChangeLocale from '../../core/ChangeLocale'

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
      trigger_size="default"
      trigger_icon="more"
      trigger_class={className}
      trigger_attributes={{
        skeleton: false,
        // Use 4001 to be over header of 4000
        tooltip: (
          <Tooltip
            position={tooltipPosition}
            style={{ zIndex: 4001 }}
            fixed_position
          >
            Open the portal tools
          </Tooltip>
        ),
      }}
      trigger_icon_size="default"
      close_button_attributes={{ skeleton: false }}
      left="x-small"
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
          <H2 size="small">Helper grid lines</H2>
          <Space top>
            <ToggleGrid />
          </Space>
        </Space>
      </Modal.Content>
    </Modal>
  )
}
