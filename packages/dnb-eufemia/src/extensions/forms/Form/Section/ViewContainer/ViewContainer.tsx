import React, { useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex } from '../../../../../components'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import ViewToolbarTools from './ViewToolbarTools'
import SectionContainer, {
  SectionContainerProps,
} from '../containers/SectionContainer'
import Toolbar from '../containers/Toolbar'

export type Props = {
  title?: React.ReactNode
  onEdit?: () => void
}

export type AllProps = Props & SectionContainerProps & FlexContainerProps

function ViewContainer(props: AllProps) {
  const { children, className, title, onEdit, ...restProps } = props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])

  return (
    <SectionContainer
      mode="view"
      ariaLabel={ariaLabel}
      className={classnames('dnb-forms-section-view-block', className)}
      {...restProps}
    >
      <Flex.Stack>
        {title && <Lead size="basis">{title}</Lead>}
        {children}
        <Toolbar>
          <ViewToolbarTools onEdit={onEdit} />
        </Toolbar>
      </Flex.Stack>
    </SectionContainer>
  )
}

ViewContainer._supportsSpacingProps = true
export default ViewContainer
