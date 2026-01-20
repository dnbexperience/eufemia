import React, { useContext, useMemo } from 'react'
import clsx from 'clsx'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex } from '../../../../../components'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import Toolbar from '../Toolbar/Toolbar'
import SectionContainer, {
  SectionContainerProps,
} from '../containers/SectionContainer'
import EditButton from './EditButton'
import SectionContainerContext from '../containers/SectionContainerContext'

export type Props = {
  title?: React.ReactNode
  onEdit?: () => void
}

export type AllProps = Props & SectionContainerProps & FlexContainerProps

function ViewContainer(props: AllProps) {
  const { children, className, title, onEdit, ...restProps } = props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])
  const { disableEditing } = useContext(SectionContainerContext) || {}

  const hasToolbar = React.Children.toArray(children).some((child) => {
    return child?.['type'] === Toolbar
  })

  const showDefaultToolbar = !disableEditing && !hasToolbar

  return (
    <SectionContainer
      mode="view"
      ariaLabel={ariaLabel}
      className={clsx('dnb-forms-section-view-block', className)}
      {...restProps}
    >
      <Flex.Stack>
        {title && <Lead size="basis">{title}</Lead>}
        {children}
        {showDefaultToolbar ? (
          <Toolbar onEdit={onEdit}>
            <EditButton />
          </Toolbar>
        ) : null}
      </Flex.Stack>
    </SectionContainer>
  )
}
ViewContainer.EditButton = EditButton
ViewContainer._supportsSpacingProps = true
export default ViewContainer
