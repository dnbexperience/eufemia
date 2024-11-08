import React, { useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex } from '../../../../../components'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import Toolbar from '../Toolbar/Toolbar'
import SectionContainer, {
  SectionContainerProps,
} from '../containers/SectionContainer'
import EditButton from './EditButton'

export type Props = {
  title?: React.ReactNode
  onEdit?: () => void
}

export type AllProps = Props & SectionContainerProps & FlexContainerProps

function ViewContainer(props: AllProps) {
  const { children, className, title, onEdit, ...restProps } = props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])

  const hasToolbar = React.Children.toArray(children).some((child) => {
    return child?.['type'] === Toolbar
  })

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
        {hasToolbar ? null : (
          <Toolbar onEdit={onEdit}>
            <EditButton />
          </Toolbar>
        )}
      </Flex.Stack>
    </SectionContainer>
  )
}
ViewContainer.EditButton = EditButton
ViewContainer._supportsSpacingProps = true
export default ViewContainer
