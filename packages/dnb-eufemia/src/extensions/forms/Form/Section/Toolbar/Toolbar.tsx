import { useContext, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from '../../../hooks'
import ToolbarContext from './ToolbarContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { Hr } from '../../../../../elements'
import { Flex, FormStatus } from '../../../../../components'
import type { SpaceAllProps } from '../../../../../components/Space'
import Space from '../../../../../components/Space'

export type FormSectionToolbarProps = SpaceAllProps & {
  onEdit?: () => void
  /**
   * Callback for the done button.
   * Return a Promise to keep the section in edit mode until it settles:
   * it switches to view mode when the Promise resolves,
   * and stays in edit mode when it rejects.
   * Any other return value is ignored.
   */
  onDone?: () => unknown
  onCancel?: () => void
}

export default function Toolbar(props: FormSectionToolbarProps) {
  const { errorInSection } = useTranslation().SectionEditContainer
  const { children, className, onEdit, onDone, onCancel, ...rest } = props

  const { hasError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}
  const [showError, setShowError] = useState(false)
  const [isPending, setIsPending] = useState(false)

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
