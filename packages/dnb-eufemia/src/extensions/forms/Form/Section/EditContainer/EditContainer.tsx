import React, { useCallback, useContext, useMemo } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex } from '../../../../../components'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import FieldBoundaryProvider from '../../../DataContext/FieldBoundary/FieldBoundaryProvider'
import EditToolbarTools from './EditToolbarTools'
import SectionContainer, {
  SectionContainerProps,
} from '../containers/SectionContainer'
import Toolbar from '../containers/Toolbar'
import { Path } from '../../../types'
import SectionContainerContext from '../containers/SectionContainerContext'

export type Props = {
  title?: React.ReactNode
}

export type AllProps = Props & SectionContainerProps & FlexContainerProps

function EditContainer(props: AllProps) {
  const { children, className, title, ...restProps } = props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])
  const { switchContainerMode, validateFieldsInitially } =
    useContext(SectionContainerContext) || {}

  const onPathError = useCallback(
    (path: Path, error: Error) => {
      if (validateFieldsInitially && error instanceof Error) {
        switchContainerMode?.('edit')
      }
    },
    [switchContainerMode, validateFieldsInitially]
  )

  return (
    <FieldBoundaryProvider
      showErrors={validateFieldsInitially}
      onPathError={onPathError}
    >
      <SectionContainer
        mode="edit"
        ariaLabel={ariaLabel}
        className={classnames('dnb-forms-section-edit-block', className)}
        {...restProps}
      >
        <Flex.Stack>
          {title && <Lead size="basis">{title}</Lead>}
          {children}
          <Toolbar>
            <EditToolbarTools />
          </Toolbar>
        </Flex.Stack>
      </SectionContainer>
    </FieldBoundaryProvider>
  )
}

EditContainer._supportsSpacingProps = true
export default EditContainer
