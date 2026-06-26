import { isValidElement, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { convertJsxToString } from '../../../../shared/component-helper'
import type { FlexContainerAllProps as FlexContainerProps } from '../../../../components/flex/Container'
import { Lead } from '../../../../elements'
import type { ArrayItemAreaProps } from '../Array/ArrayItemArea'
import ArrayItemArea from '../Array/ArrayItemArea'
import IterateItemContext from '../IterateItemContext'
import Toolbar from '../Toolbar'
import EditButton from './EditButton'
import RemoveButton from './RemoveButton'
import { replaceItemNo } from '../ItemNo'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type IterateViewContainerProps = {
  /**
   * The title of the container.
   */
  title?: ReactNode

  /**
   * An alternative toolbar to be shown in the container.
   */
  toolbar?: ReactNode

  /**
   * Use variants to render the toolbar differently. Currently there are the `minimumOneItem` and `custom` variants. See the info section for more info.
   */
  toolbarVariant?: ArrayItemAreaProps['toolbarVariant']
}

export type IterateViewContainerAllProps = IterateViewContainerProps &
  Omit<FlexContainerProps, 'onAnimationEnd'> &
  ArrayItemAreaProps

function ViewContainer(props: IterateViewContainerAllProps) {
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
    (Array.isArray(children) ? children : [children]).some(
      (child) => isValidElement(child) && child.type === Toolbar
    )

  return (
    <ArrayItemArea
      mode="view"
      ariaLabel={convertJsxToString(itemTitle)}
      className={clsx('dnb-forms-section-view-block', className)}
      toolbarVariant={toolbarVariant}
      {...restProps}
    >
      {itemTitle && <Lead size="basis">{itemTitle}</Lead>}
      {children}
      {hasToolbar
        ? null
        : (toolbarElement ??
          (toolbarVariant !== 'custom' && (
            <Toolbar>
              <EditButton />
              <RemoveButton />
            </Toolbar>
          )))}
    </ArrayItemArea>
  )
}

ViewContainer.EditButton = EditButton
ViewContainer.RemoveButton = RemoveButton

withComponentMarkers(ViewContainer, {
  _supportsSpacingProps: true,
})

export default ViewContainer
