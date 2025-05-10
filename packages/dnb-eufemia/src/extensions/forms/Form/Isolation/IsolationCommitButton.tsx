import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { useTranslation } from '../../hooks'
import DataContext from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'
import { check } from '../../../../icons'
import useDataContextSnapshot from './useDataContextSnapshot'

export type Props = ButtonProps & {
  resetAfterCommit?: boolean
}

function IsolationCommitButton(props: Props) {
  const translations = useTranslation().Isolation

  const { resetAfterCommit, className, children, text, ...rest } = props

  const content = text || children || translations.commitButtonText

  const { handleSubmit, props: dataContextProps } =
    useContext(DataContext) || {}
  const { isolate } = dataContextProps || {}

  const { handleReset } = useDataContextSnapshot({
    enabled: resetAfterCommit,
  })

  const onClickHandler = useCallback(() => {
    if (isolate) {
      handleSubmit?.()

      if (resetAfterCommit) {
        handleReset()
      }
    }
  }, [handleSubmit, isolate, handleReset, resetAfterCommit])

  return (
    <Button
      variant="secondary"
      className={classnames('dnb-forms-isolate__commit-button', className)}
      icon={check}
      icon_position="left"
      onClick={onClickHandler}
      {...rest}
    >
      {content}
    </Button>
  )
}

IsolationCommitButton._supportsSpacingProps = true
export default IsolationCommitButton
