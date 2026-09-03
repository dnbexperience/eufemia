import {
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { convertJsxToString } from '../../../../../shared/component-helper'
import { Flex, FormStatus } from '../../../../../components'
import type { FlexContainerAllProps as FlexContainerProps } from '../../../../../components/flex/Container'
import { Lead } from '../../../../../elements'
import FieldBoundaryProvider from '../../../DataContext/FieldBoundary/FieldBoundaryProvider'
import SectionContainerContext from '../containers/SectionContainerContext'
import Toolbar from '../Toolbar/Toolbar'
import DoneButton from './DoneButton'
import CancelButton from './CancelButton'
import type { SectionContainerProps } from '../containers/SectionContainer'
import SectionContainer from '../containers/SectionContainer'
import type { Path } from '../../../types'
import withComponentMarkers from '../../../../../shared/helpers/withComponentMarkers'
import DataContext from '../../../DataContext/Context'
import { useTranslation } from '../../../hooks'
import useReportError from '../../Isolation/useReportError'
import { useShowStatus } from '../../Isolation/useHandleStatus'
import useContainerDataStore from './useContainerDataStore'
import EditContainerContext from './EditContainerContext'
import FieldPropsProvider from '../../../Field/Provider'
import SectionContext from '../SectionContext'

export type FormSectionEditContainerProps = {
  title?: ReactNode
  onDone?: () => void
  onCancel?: () => void
  /**
   * Prevents form submission and Wizard navigation while the section is in edit mode, until the Done or Cancel button is selected. Requires Form.Section to have a path.
   */
  preventUncommittedChanges?: boolean
}

export type FormSectionEditContainerAllProps =
  FormSectionEditContainerProps &
    SectionContainerProps &
    FlexContainerProps

function EditContainer(props: FormSectionEditContainerAllProps) {
  const {
    children,
    className,
    title,
    onDone,
    onCancel,
    preventUncommittedChanges = false,
    ...restProps
  } = props || {}
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])
  const {
    containerMode,
    initialContainerMode,
    validateInitially,
    switchContainerMode,
    disableEditing,
  } = useContext(SectionContainerContext) || {}
  const omitFocusManagementRef = useRef(false)
  const dataContext = useContext(DataContext)
  const { path: sectionPath } = useContext(SectionContext) || {}
  const dataStore = useContainerDataStore({
    enabled: true,
  })
  const [isPending, setIsPending] = useState(false)
  const preventNavigation = preventUncommittedChanges
  const hasUncommittedChanges =
    preventNavigation && dataStore.hasUncommittedChanges
  const { preventUncommittedChangesText } =
    useTranslation().SectionEditContainer

  if (preventUncommittedChanges && !sectionPath) {
    throw new Error(
      'Form.Section.EditContainer requires its parent Form.Section to have a path when preventUncommittedChanges is enabled.'
    )
  }

  useReportError(
    hasUncommittedChanges ? uncommittedChangesError : undefined,
    dataContext,
    'section-edit-container'
  )
  const showUncommittedChangesStatus = useShowStatus({
    outerContext: dataContext,
    hasContentChanged: hasUncommittedChanges,
    preventUncommittedChanges: preventNavigation,
  })

  const onPathError = useCallback(
    (path: Path, error: Error) => {
      if (disableEditing) {
        return
      }
      if (
        initialContainerMode === 'auto' &&
        containerMode !== 'edit' &&
        error instanceof Error
      ) {
        omitFocusManagementRef.current = true
        switchContainerMode?.('edit')
      }
    },
    [
      containerMode,
      disableEditing,
      initialContainerMode,
      switchContainerMode,
    ]
  )

  const childArray = Array.isArray(children) ? children : [children]
  const hasToolbar = childArray.some(
    (child) => isValidElement(child) && child.type === Toolbar
  )

  return (
    <EditContainerContext
      value={{ ...dataStore, isPending, setIsPending }}
    >
      <FieldBoundaryProvider
        showErrors={validateInitially}
        onPathError={onPathError}
      >
        <SectionContainer
          mode="edit"
          ariaLabel={ariaLabel}
          omitFocusManagementRef={omitFocusManagementRef}
          className={clsx('dnb-forms-section-edit-block', className)}
          {...restProps}
        >
          <Flex.Stack
            layoutEngine="css"
            className="dnb-forms-section-block__content"
          >
            {title && <Lead size="basis">{title}</Lead>}
            <FieldPropsProvider
              formElement={isPending ? { disabled: true } : undefined}
            >
              {children}
            </FieldPropsProvider>
            {hasToolbar ? null : (
              <Toolbar onDone={onDone} onCancel={onCancel}>
                <DoneButton />
                <CancelButton />
              </Toolbar>
            )}
            {preventNavigation && (
              <FormStatus
                noAnimation={false}
                show={Boolean(showUncommittedChangesStatus)}
              >
                {preventUncommittedChangesText}
              </FormStatus>
            )}
          </Flex.Stack>
        </SectionContainer>
      </FieldBoundaryProvider>
    </EditContainerContext>
  )
}

const uncommittedChangesError = new Error(
  'Form.Section.EditContainer has uncommitted changes'
)

EditContainer.DoneButton = DoneButton
EditContainer.CancelButton = CancelButton

withComponentMarkers(EditContainer, {
  _supportsSpacingProps: true,
})

export default EditContainer
