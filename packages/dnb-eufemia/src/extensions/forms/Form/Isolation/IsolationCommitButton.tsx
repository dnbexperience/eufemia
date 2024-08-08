import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { useTranslation } from '../../hooks'
import DataContext from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'
import { check } from '../../../../icons'

export type Props = ButtonProps

function IsolationCommitButton(props: Props) {
  const translations = useTranslation().Isolation

  const { className, children, text, ...rest } = props

  const content = text || children || translations.commitButtonText

  const { handleSubmit, props: dataContextProps } =
    useContext(DataContext) || {}
  const { isolate } = dataContextProps || {}

  const onClickHandler = useCallback(() => {
    if (isolate) {
      handleSubmit?.()
    }
  }, [handleSubmit, isolate])

  return (
    <Button
      variant="secondary"
      className={classnames('dnb-forms-isolate-button', className)}
      icon={check}
      onClick={onClickHandler}
      {...rest}
    >
      {content}
    </Button>
  )
}

IsolationCommitButton._supportsSpacingProps = true
export default IsolationCommitButton
