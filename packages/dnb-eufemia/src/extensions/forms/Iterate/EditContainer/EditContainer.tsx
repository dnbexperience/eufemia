import React, { useContext, useEffect, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Flex } from '../../../../components'
import { Lead } from '../../../../elements'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import IterateElementContext from '../IterateElementContext'
import EditToolbarTools from './EditToolbarTools'
import ElementBlock from '../AnimatedContainer/ElementBlock'
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
   * Used internally.
   */
  open?: boolean

  /**
   * The toolbar to be shown in the EditContainer.
   * Used internally.
   */
  toolbar?: React.ReactNode
}

export type AllProps = Props & FlexContainerProps

export default function EditContainer(props: AllProps) {
  return (
    <EditContainerWithoutToolbar
      toolbar={
        <Toolbar>
          <EditToolbarTools />
        </Toolbar>
      }
      {...props}
    />
  )
}

export function EditContainerWithoutToolbar(
  props: Props & FlexContainerProps & { toolbar?: React.ReactNode }
) {
  const iterateElementContext = useContext(IterateElementContext)
  const { containerMode, isNew } = iterateElementContext ?? {}

  const {
    children,
    className,
    title,
    titleWhenNew,
    toolbar,
    ...restProps
  } = props || {}

  const wasNewRef = useRef<unknown>(isNew)

  useEffect(() => {
    if (containerMode === 'view') {
      wasNewRef.current = false
    }
  }, [isNew, containerMode])

  const blockTitle =
    wasNewRef.current && titleWhenNew ? titleWhenNew : title
  const ariaLabel = useMemo(
    () => convertJsxToString(blockTitle),
    [blockTitle]
  )

  return (
    <ElementBlock
      mode="edit"
      className={classnames('dnb-form-iterate-edit-block', className)}
      ariaLabel={ariaLabel}
      {...restProps}
    >
      <Flex.Stack>
        {blockTitle && <Lead size="basis">{blockTitle}</Lead>}
        {children}
        {toolbar}
      </Flex.Stack>
    </ElementBlock>
  )
}

EditContainer._supportsSpacingProps = true
EditContainerWithoutToolbar._supportsSpacingProps = true
