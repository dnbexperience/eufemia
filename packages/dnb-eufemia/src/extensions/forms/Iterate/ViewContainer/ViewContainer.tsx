import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Flex } from '../../../../components'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { Lead } from '../../../../elements'
import ElementBlock, {
  ElementSectionProps,
} from '../AnimatedContainer/ElementBlock'
import IterateItemContext from '../IterateItemContext'
import Toolbar from '../Toolbar'
import ViewToolbarTools from './ViewToolbarTools'

export type Props = {
  /**
   * The title of the ViewContainer.
   */
  title?: React.ReactNode
  /**
   * An alternative toolbar to be shown in the ViewContainer.
   */
  toolbar?: React.ReactNode
}

export type AllProps = Props & FlexContainerProps & ElementSectionProps

function ViewContainer(props: AllProps) {
  const { children, className, title, toolbar, ...restProps } = props || {}
  const iterateItemContext = useContext(IterateItemContext)

  let itemTitle = title
  let ariaLabel = useMemo(() => convertJsxToString(itemTitle), [itemTitle])
  if (ariaLabel.includes('{itemNr}')) {
    itemTitle = ariaLabel = ariaLabel.replace(
      '{itemNr}',
      iterateItemContext.index + 1
    )
  }

  return (
    <ElementBlock
      mode="view"
      ariaLabel={ariaLabel}
      className={classnames('dnb-forms-section-view-block', className)}
      {...restProps}
    >
      <Flex.Stack>
        {itemTitle && <Lead size="basis">{itemTitle}</Lead>}
        {children}
        {toolbar ?? (
          <Toolbar>
            <ViewToolbarTools />
          </Toolbar>
        )}
      </Flex.Stack>
    </ElementBlock>
  )
}

ViewContainer._supportsSpacingProps = true
export default ViewContainer
