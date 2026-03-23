import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Hr } from '../../../../elements'
import { Flex, FormStatus, Space } from '../../../../components'
import type { SpaceAllProps } from '../../../../components/Space'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from './ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import ArrayItemAreaContext from '../Array/ArrayItemAreaContext'
import { useTranslation } from '../../hooks'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ToolbarParams = {
  index: number
  items: Array<unknown>
  value: unknown
}
export type IterateToolbarProps = Omit<SpaceAllProps, 'children'> & {
  children?: React.ReactNode | ((params: ToolbarParams) => React.ReactNode)
}

export default function Toolbar({
  children,
  className,
  ...rest
}: IterateToolbarProps = {}) {
  const {
    index,
    value,
    arrayValue: items,
  } = useContext(IterateItemContext) || {}
  const { toolbarVariant, divider } =
    useContext(ArrayItemAreaContext) || {}
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
    return null
  }

  return (
    <Space
      top={toolbarVariant === 'custom' ? false : 'medium'}
      className={clsx('dnb-forms-iterate-toolbar', className)}
      {...rest}
    >
      {toolbarVariant !== 'custom' && divider !== 'line' && (
        <Hr space={0} />
      )}

      <ToolbarContext value={{ setShowError }}>
        <Flex.Horizontal
          top={toolbarVariant === 'custom' ? false : 'x-small'}
          gap="large"
        >
          {children}
        </Flex.Horizontal>
      </ToolbarContext>

      <FormStatus
        show={showError && hasVisibleError}
        shellSpace={{ top: 'x-small' }}
        noAnimation={false}
      >
        {errorInContainer}
      </FormStatus>
    </Space>
  )
}

withComponentMarkers(Toolbar, { _supportsSpacingProps: true })
