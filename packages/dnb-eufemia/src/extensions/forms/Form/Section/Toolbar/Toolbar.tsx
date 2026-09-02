import { useContext, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from '../../../hooks'
import ToolbarContext from './ToolbarContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import EditContainerContext from '../EditContainer/EditContainerContext'
import { Hr } from '../../../../../elements'
import { Flex, FormStatus } from '../../../../../components'
import type { SpaceAllProps } from '../../../../../components/Space'
import Space from '../../../../../components/Space'

export type FormSectionToolbarProps = SpaceAllProps & {
  onEdit?: () => void
  onDone?: () => void
  onCancel?: () => void
}

export default function Toolbar(props: FormSectionToolbarProps) {
  const { errorInSection } = useTranslation().SectionEditContainer
  const { children, className, onEdit, onDone, onCancel, ...rest } = props

  const { hasError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}
  const [showError, setShowError] = useState(false)

  // Inside an EditContainer the pending state is owned there, so the
  // container can also disable its fields while the save is in flight.
  // A standalone Form.Section.Toolbar keeps its own state.
  const editContainerContext = useContext(EditContainerContext)
  const [ownIsPending, setOwnIsPending] = useState(false)
  const isPending = editContainerContext?.isPending ?? ownIsPending
  const setIsPending =
    editContainerContext?.setIsPending ?? setOwnIsPending

  useEffect(() => {
    if (showError && !hasError) {
      setShowError(false)
    }
  }, [hasError, showError])

  return (
    <Space
      className={clsx('dnb-forms-section-toolbar', className)}
      {...rest}
    >
      <Hr space={0} />

      <ToolbarContext
        value={{
          setShowError,
          isPending,
          setIsPending,
          onEdit,
          onDone,
          onCancel,
        }}
      >
        <Flex.Horizontal layoutEngine="css" top="x-small" gap="large">
          {children}
        </Flex.Horizontal>
      </ToolbarContext>

      <FormStatus
        show={showError && hasVisibleError}
        shellSpace={{ top: 'x-small' }}
        noAnimation={false}
      >
        {errorInSection}
      </FormStatus>
    </Space>
  )
}
