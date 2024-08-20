import React, { useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Flex } from '../../../../components'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { Lead } from '../../../../elements'
import ElementBlock, {
  ElementSectionProps,
} from '../AnimatedContainer/ElementBlock'
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
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])

  return (
    <ElementBlock
      mode="view"
      ariaLabel={ariaLabel}
      className={classnames('dnb-forms-section-view-block', className)}
      {...restProps}
    >
      <Flex.Stack>
        {title && <Lead size="basis">{title}</Lead>}
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
