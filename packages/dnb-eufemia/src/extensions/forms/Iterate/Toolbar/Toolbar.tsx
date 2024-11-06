import React, { useContext, useEffect, useState } from 'react'
import classnames from 'classnames'
import { Hr } from '../../../../elements'
import { Flex, FormStatus, Space } from '../../../../components'
import { SpaceAllProps } from '../../../../components/Space'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from './ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { useTranslation } from '../../hooks'

type ToolbarProps = {
  hideDivider?: boolean
}

export type ToolbarParams = {
  index: number
  items: Array<unknown>
  value: unknown
}
export type Props = ToolbarProps &
  Omit<SpaceAllProps, 'children'> & {
    children?:
      | React.ReactNode
      | ((params: ToolbarParams) => React.ReactNode)
  }

export default function Toolbar({
  children,
  className,
  hideDivider,
  ...rest
}: Props = {}) {
  const {
    index,
    value,
    arrayValue: items,
  } = useContext(IterateItemContext) || {}
  const { errorInContainer } = useTranslation().IterateEditContainer
  const { hasError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (showError && !hasError) {
      setShowError(false)
    }
  }, [hasError, showError])

  if (typeof children === 'function') {
    children = children?.({ index, items, value })
  }

  if (React.Children.count(children) === 0) {
    return <></>
  }

  return (
    <Space
      top="large"
      className={classnames('dnb-forms-iterate-toolbar', className)}
      {...rest}
    >
      {!hideDivider && <Hr space={0} />}

      <ToolbarContext.Provider value={{ setShowError }}>
        <Flex.Horizontal gap="large">{children}</Flex.Horizontal>
      </ToolbarContext.Provider>

      <FormStatus
        show={showError && hasVisibleError}
        shellSpace={{ top: 'x-small' }}
        no_animation={false}
      >
        {errorInContainer}
      </FormStatus>
    </Space>
  )
}

Toolbar._supportsSpacingProps = true
