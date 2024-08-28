import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Lead } from '../../../../elements'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import IterateItemContext from '../IterateItemContext'
import EditToolbarTools, { useWasNew } from './EditToolbarTools'
import ElementBlock, {
  ElementSectionProps,
} from '../AnimatedContainer/ElementBlock'
import Toolbar from '../Toolbar'
import { useSwitchContainerMode } from '../hooks'

export type Props = {
  /**
   * The title of the EditContainer.
   */
  title?: React.ReactNode

  /**
   * The title for a new item show within the EditContainer.
   */
  titleWhenNew?: React.ReactNode

  /**
   * If the EditContainer is open or not.
   */
  open?: boolean

  /**
   * An alternative toolbar to be shown in the EditContainer.
   */
  toolbar?: React.ReactNode
}

export type AllProps = Props & FlexContainerProps & ElementSectionProps

export default function EditContainer(props: AllProps) {
  const iterateItemContext = useContext(IterateItemContext)
  const { index, arrayValue, hideToolbarWhen } = iterateItemContext || {}
  const { toolbar, ...rest } = props

  return (
    <EditContainerWithoutToolbar
      toolbar={
        toolbar ??
        (!hideToolbarWhen?.(index, arrayValue) && (
          <Toolbar>
            <EditToolbarTools />
          </Toolbar>
        ))
      }
      {...rest}
    />
  )
}

export function EditContainerWithoutToolbar(
  props: Props & FlexContainerProps & { toolbar?: React.ReactNode }
) {
  const { containerMode, isNew, index, path } =
    useContext(IterateItemContext)

  const {
    children,
    className,
    title,
    titleWhenNew,
    toolbar,
    ...restProps
  } = props || {}

  const wasNew = useWasNew({ isNew, containerMode })
  let itemTitle = wasNew && titleWhenNew ? titleWhenNew : title
  let ariaLabel = useMemo(() => convertJsxToString(itemTitle), [itemTitle])
  if (ariaLabel.includes('{itemNr}')) {
    itemTitle = ariaLabel = ariaLabel.replace('{itemNr}', index + 1)
  }

  useSwitchContainerMode({ path })

  return (
    <ElementBlock
      mode="edit"
      className={classnames('dnb-forms-section-edit-block', className)}
      ariaLabel={ariaLabel}
      {...restProps}
    >
      {itemTitle && <Lead size="basis">{itemTitle}</Lead>}
      {children}
      {toolbar}
    </ElementBlock>
  )
}

EditContainer._supportsSpacingProps = true
EditContainerWithoutToolbar._supportsSpacingProps = true
