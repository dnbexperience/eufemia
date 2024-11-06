import React, { useCallback, useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex } from '../../../../../components'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import FieldBoundaryProvider from '../../../DataContext/FieldBoundary/FieldBoundaryProvider'
import SectionContainerContext from '../containers/SectionContainerContext'
import Toolbar from '../Toolbar/Toolbar'
import DoneButton from './DoneButton'
import CancelButton from './CancelButton'
import SectionContainer, {
  SectionContainerProps,
} from '../containers/SectionContainer'
import { Path } from '../../../types'

export type Props = {
  title?: React.ReactNode
  onDone?: () => void
  onCancel?: () => void
}

export type AllProps = Props & SectionContainerProps & FlexContainerProps

function EditContainer(props: AllProps) {
  const { children, className, title, onDone, onCancel, ...restProps } =
    props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])
  const {
    containerMode,
    initialContainerMode,
    validateInitially,
    switchContainerMode,
  } = useContext(SectionContainerContext) || {}
  const omitFocusManagementRef = useRef(false)

  const onPathError = useCallback(
    (path: Path, error: Error) => {
      if (
        initialContainerMode === 'auto' &&
        containerMode !== 'edit' &&
        error instanceof Error
      ) {
        omitFocusManagementRef.current = true
        switchContainerMode?.('edit')
      }
    },
    [containerMode, initialContainerMode, switchContainerMode]
  )

  const hasToolbar = React.Children.toArray(children).some((child) => {
    return child?.['type'] === Toolbar
  })

  return (
    <FieldBoundaryProvider
      showErrors={validateInitially}
      onPathError={onPathError}
    >
      <SectionContainer
        mode="edit"
        ariaLabel={ariaLabel}
        omitFocusManagementRef={omitFocusManagementRef}
        className={classnames('dnb-forms-section-edit-block', className)}
        {...restProps}
      >
        <Flex.Stack>
          {title && <Lead size="basis">{title}</Lead>}
          {children}
          {hasToolbar ? null : (
            <Toolbar onDone={onDone} onCancel={onCancel}>
              <DoneButton />
              <CancelButton />
            </Toolbar>
          )}
        </Flex.Stack>
      </SectionContainer>
    </FieldBoundaryProvider>
  )
}

EditContainer.DoneButton = DoneButton
EditContainer.CancelButton = CancelButton
EditContainer._supportsSpacingProps = true
export default EditContainer
