import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Lead } from '../../../../elements'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import IterateItemContext from '../IterateItemContext'
import ArrayItemArea, { ArrayItemAreaProps } from '../Array/ArrayItemArea'
import Toolbar from '../Toolbar'
import { useSwitchContainerMode } from '../hooks'
import DoneButton from './DoneButton'
import CancelButton, { useWasNew } from './CancelButton'

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
  /**
   * The variant of the toolbar.
   */
  toolbarVariant?: 'minimumOneItem'
}

export type AllProps = Props & FlexContainerProps & ArrayItemAreaProps

export default function EditContainer(props: AllProps) {
  const { toolbar, toolbarVariant, children, ...rest } = props
  const { arrayValue } = useContext(IterateItemContext)

  let toolbarElement = toolbar
  if (toolbarVariant === 'minimumOneItem' && arrayValue.length <= 1) {
    toolbarElement = <></>
  }

  const hasToolbar =
    !toolbarElement &&
    React.Children.toArray(children).some((child) => {
      return child?.['type'] === Toolbar
    })

  return (
    <EditContainerWithoutToolbar
      toolbar={
        hasToolbar
          ? null
          : toolbarElement ?? (
              <Toolbar>
                <DoneButton />
                <CancelButton />
              </Toolbar>
            )
      }
      {...rest}
    >
      {children}
    </EditContainerWithoutToolbar>
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
  if (ariaLabel.includes('{itemN')) {
    /**
     * {itemNr} is deprecated, and can be removed in v11 in favor of {itemNo}
     * So in v11 we can use '{itemNo}' instead of a regex
     */
    itemTitle = ariaLabel = ariaLabel.replace(
      /\{itemN(r|o)\}/g,
      String(index + 1)
    )
  }

  useSwitchContainerMode({ path })

  return (
    <ArrayItemArea
      mode="edit"
      className={classnames('dnb-forms-section-edit-block', className)}
      ariaLabel={ariaLabel}
      {...restProps}
    >
      {itemTitle && <Lead size="basis">{itemTitle}</Lead>}
      {children}
      {toolbar}
    </ArrayItemArea>
  )
}

EditContainer.DoneButton = DoneButton
EditContainer.CancelButton = CancelButton

EditContainer._supportsSpacingProps = true
EditContainerWithoutToolbar._supportsSpacingProps = true
