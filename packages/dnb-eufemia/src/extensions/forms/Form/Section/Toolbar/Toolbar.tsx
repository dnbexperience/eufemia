import React, { useContext, useEffect, useState } from 'react'
import classnames from 'classnames'
import { useTranslation } from '../../../hooks'
import ToolbarContext from './ToolbarContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { Hr } from '../../../../../elements'
import { Flex, FormStatus } from '../../../../../components'
import Space, { SpaceAllProps } from '../../../../../components/Space'

export type Props = SpaceAllProps & {
  onEdit?: () => void
  onDone?: () => void
  onCancel?: () => void
}

export default function Toolbar(props: Props) {
  const { errorInSection } = useTranslation().SectionEditContainer
  const { children, className, onEdit, onDone, onCancel, ...rest } = props

  const { hasError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (showError && !hasError) {
      setShowError(false)
    }
  }, [hasError, showError])

  return (
    <Space
      className={classnames('dnb-forms-section-toolbar', className)}
      {...rest}
    >
      <Hr space={0} />

      <ToolbarContext.Provider
        value={{ setShowError, onEdit, onDone, onCancel }}
      >
        <Flex.Horizontal top="x-small" gap="large">
          {children}
        </Flex.Horizontal>
      </ToolbarContext.Provider>

      <FormStatus
        show={showError && hasVisibleError}
        shellSpace={{ top: 'x-small' }}
        no_animation={false}
      >
        {errorInSection}
      </FormStatus>
    </Space>
  )
}
