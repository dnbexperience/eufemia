import React, { useContext } from 'react'
import classnames from 'classnames'
import { Hr } from '../../../../elements'
import { Flex, Space } from '../../../../components'
import { SpaceAllProps } from '../../../../components/Space'
import IterateItemContext from '../IterateItemContext'

export type ToolbarParams = {
  index: number
  items: Array<unknown>
  value: unknown
}
export type Props = Omit<SpaceAllProps, 'children'> & {
  children?: React.ReactNode | ((params: ToolbarParams) => React.ReactNode)
}

export default function Toolbar({
  children,
  className,
  ...rest
}: Props = {}) {
  const {
    index,
    value,
    arrayValue: items,
  } = useContext(IterateItemContext)

  if (typeof children === 'function') {
    children = children?.({ index, items, value })
  }

  if (React.Children.count(children) === 0) {
    return <></>
  }

  return (
    <Space
      top="medium"
      className={classnames('dnb-forms-iterate-toolbar', className)}
      {...rest}
    >
      <Hr space={0} />

      <Flex.Horizontal top="x-small" gap="large">
        {children}
      </Flex.Horizontal>
    </Space>
  )
}

Toolbar._supportsSpacingProps = true
