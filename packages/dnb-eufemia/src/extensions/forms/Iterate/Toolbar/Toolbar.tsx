import React from 'react'
import classnames from 'classnames'
import { Hr } from '../../../../elements'
import { Flex, Space } from '../../../../components'
import { SpaceAllProps } from '../../../../components/Space'

export type Props = SpaceAllProps

export default function Toolbar(props: Props) {
  const { children, className, ...rest } = props || {}

  return (
    <Space
      top="medium"
      className={classnames('dnb-forms-iterate-toolbar', className)}
      {...rest}
    >
      <Hr space={0} />

      <Flex.Horizontal top="x-small" spacing="large">
        {children}
      </Flex.Horizontal>
    </Space>
  )
}

Toolbar._supportsSpacingProps = true
