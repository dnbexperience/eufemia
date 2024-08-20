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
  const { toolbar, ...rest } = props
  return (
    <EditContainerWithoutToolbar
      toolbar={
        toolbar ?? (
          <Toolbar>
            <EditToolbarTools />
          </Toolbar>
        )
      }
      {...rest}
    />
  )
}

export function EditContainerWithoutToolbar(
  props: Props & FlexContainerProps & { toolbar?: React.ReactNode }
) {
  const iterateElementContext = useContext(IterateItemContext)
  const { containerMode, isNew } = iterateElementContext ?? {}

  const {
    children,
    className,
    title,
    titleWhenNew,
    toolbar,
    ...restProps
  } = props || {}

  const wasNew = useWasNew({ isNew, containerMode })
  const blockTitle = wasNew && titleWhenNew ? titleWhenNew : title
  const ariaLabel = useMemo(
    () => convertJsxToString(blockTitle),
    [blockTitle]
  )

  return (
    <ElementBlock
      mode="edit"
      className={classnames('dnb-forms-section-edit-block', className)}
      ariaLabel={ariaLabel}
      {...restProps}
    >
      {blockTitle && <Lead size="basis">{blockTitle}</Lead>}
      {children}
      {toolbar}
    </ElementBlock>
  )
}

EditContainer._supportsSpacingProps = true
EditContainerWithoutToolbar._supportsSpacingProps = true
