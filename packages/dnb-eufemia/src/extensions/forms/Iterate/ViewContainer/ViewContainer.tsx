import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Flex } from '../../../../components'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { Lead } from '../../../../elements'
import ArrayItemArea, { ArrayItemAreaProps } from '../Array/ArrayItemArea'
import IterateItemContext from '../IterateItemContext'
import Toolbar from '../Toolbar'
import EditButton from './EditButton'
import RemoveButton from './RemoveButton'
import { replaceItemNo } from '../ItemNo'

export type Props = {
  /**
   * The title of the ViewContainer.
   */
  title?: React.ReactNode

  /**
   * An alternative toolbar to be shown in the ViewContainer.
   */
  toolbar?: React.ReactNode

  /**
   * The variant of the toolbar.
   */
  toolbarVariant?: ArrayItemAreaProps['toolbarVariant']
}

export type AllProps = Props & FlexContainerProps & ArrayItemAreaProps

function ViewContainer(props: AllProps) {
  const {
    children,
    className,
    title,
    toolbar,
    toolbarVariant,
    ...restProps
  } = props || {}
  const { index, arrayValue } = useContext(IterateItemContext)
  const itemTitle = useMemo(() => {
    return replaceItemNo(title, index)
  }, [index, title])

  let toolbarElement = toolbar
  if (toolbarVariant === 'minimumOneItem' && arrayValue.length <= 1) {
    toolbarElement = (
      <Toolbar>
        <EditButton />
      </Toolbar>
    )
  }

  const hasToolbar =
    !toolbarElement &&
    React.Children.toArray(children).some((child) => {
      return child?.['type'] === Toolbar
    })

  return (
    <ArrayItemArea
      mode="view"
      ariaLabel={convertJsxToString(itemTitle)}
      className={classnames('dnb-forms-section-view-block', className)}
      toolbarVariant={toolbarVariant}
      {...restProps}
    >
      <Flex.Stack>
        {itemTitle && <Lead size="basis">{itemTitle}</Lead>}
        {children}
        {hasToolbar
          ? null
          : toolbarElement ??
            (toolbarVariant !== 'custom' && (
              <Toolbar>
                <EditButton />
                <RemoveButton />
              </Toolbar>
            ))}
      </Flex.Stack>
    </ArrayItemArea>
  )
}

ViewContainer.EditButton = EditButton
ViewContainer.RemoveButton = RemoveButton

ViewContainer._supportsSpacingProps = true
export default ViewContainer
