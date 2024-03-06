import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import SharedContext from '../../../../shared/Context'
import DataContext from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'
import SubmitIndicator from '../SubmitIndicator'

export type Props = {
  /**
   * Show the submit indicator
   */
  showIndicator?: boolean
} & ComponentProps &
  ButtonProps &
  Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>

function SubmitButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    showIndicator,
    children = sharedContext?.translation.Forms.contextSubmit,
    ...rest
  } = props
  const {
    // formState, // will be enabled in a follow-up PR
    handleSubmit,
    _isInsideFormElement,
  } = useContext(DataContext) || {}

  const onClickHandler = useCallback(() => {
    if (!_isInsideFormElement) {
      handleSubmit?.()
    }
  }, [_isInsideFormElement, handleSubmit])

  return (
    <Button
      className={classnames('dnb-forms-submit-button', className)}
      onClick={onClickHandler}
      type="submit"
      {...rest}
    >
      {children}

      <SubmitIndicator
        state={
          showIndicator ? 'pending' : undefined
          // showIndicator ? 'pending' : formState // will be enabled in a follow-up PR
        }
      />
    </Button>
  )
}

SubmitButton._supportsSpacingProps = true
export default SubmitButton
