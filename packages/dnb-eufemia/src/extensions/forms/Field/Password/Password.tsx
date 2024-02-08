import React, {
  useContext,
  useRef,
  useState,
  ElementRef,
  MutableRefObject,
} from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import StringField, { Props as StringFieldProps } from '../String'

import { InputProps, SubmitButton } from '../../../../components/Input'
import { dispatchCustomElementEvent } from '../../../../shared/component-helper'
import IconView from '../../../../icons/view'
import IconViewOff from '../../../../icons/hide'
import IconViewMedium from '../../../../icons/view_medium'
import IconViewOffMedium from '../../../../icons/hide_medium'
import useErrorMessage from '../../hooks/useErrorMessage'
import useDataValue from '../../hooks/useDataValue'

export type PasswordProps = Omit<StringFieldProps, 'innerRef'> & {
  /**
   * Fires when the input toggles to show the password.
   */
  onShowPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Fires when the input toggles to hide the password.
   */
  onHidePassword?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute.
   */
  size?: InputProps['size']
  /**
   * Sets the language used for aria-label translations. Defaults to `Provider` `locale`.
   */
  lang?: InputProps['lang']
  /**
   * ElememntRef passed on to the password input element.
   */
  innerRef?: MutableRefObject<HTMLInputElement>
  /**
   * @deprecated in v11, use use `locales`prop on `Provider` and override `passwordShowPasswordLabel` instead.
   */
  show_password?: string
  /**
   * @deprecated in v11, use use `locales`prop on `Provider` and override `passwordHidePasswordLabel` instead.
   */
  hide_password?: string
  /**
   * @deprecated in v11, use `onShowPassword` instead.
   */
  on_show_password?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @deprecated in v11, use `onHidePassword` instead.
   */
  on_hide_password?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Password(props: PasswordProps) {
  const [hidden, setHidden] = useState<boolean>(true)

  const sharedContext = useContext(SharedContext)
  const translations = sharedContext.getTranslation(props).Forms

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.passwordRequired,
    pattern: translations.passwordErrorPattern,
  })

  const preparedProps: PasswordProps = {
    ...props,
    errorMessages,
  }

  const {
    id,
    label,
    className,
    hasError,
    disabled,
    value,
    ...dataValueProps
  } = useDataValue(preparedProps)

  const ref = useRef<ElementRef<'input'>>(props.innerRef?.current ?? null)

  // used in toggleVisibility, for dispatchCustomElementEvent.
  const componentReference = {
    props,
    context: sharedContext,
    state: { hidden },
    ref,
    id,
    toggleVisibility,
  }

  const ariaLabels = getAriaLabel()

  return (
    <StringField
      id={id}
      className={classnames('dnb-forms-field-password', className)}
      label={label ?? sharedContext?.translation.Forms.passwordLabel}
      type={hidden ? 'password' : 'text'}
      innerRef={ref}
      aria-describedby={id + '-submit-button'}
      value={value}
      hasError={hasError}
      disabled={disabled}
      {...dataValueProps}
      submitElement={
        <SubmitButton
          id={id + '-submit-button'}
          type="button"
          variant="secondary"
          aria-controls={id}
          aria-label={
            hidden ? ariaLabels.showPassword : ariaLabels.hidePassword
          }
          icon={
            props.size === 'large'
              ? hidden
                ? IconViewMedium
                : IconViewOffMedium
              : hidden
              ? IconView
              : IconViewOff
          }
          skeleton={sharedContext.skeleton}
          status={hasError ? 'error' : undefined}
          status_state={hasError ? 'error' : undefined}
          disabled={disabled}
          onClick={toggleVisibility}
        />
      }
    />
  )

  function toggleVisibility(event: React.MouseEvent<HTMLButtonElement>) {
    setHidden((hidden) => {
      dispatchCustomElementEvent(
        componentReference,
        hidden ? 'onShowPassword' : 'onHidePassword',
        { event, value }
      )

      return !hidden
    })

    if (ref.current) {
      ref.current.focus()
    }
  }

  // Can be removed with v11, just used to make sure that the old show_password and hide_password are still backward compatible.
  function getAriaLabel() {
    const { passwordShowLabel, passwordHideLabel } = translations

    const { show_password, hide_password } = props

    const ariaLabels = {
      showPassword: passwordShowLabel,
      hidePassword: passwordHideLabel,
    }

    if (show_password) {
      ariaLabels['showPassword'] = show_password
    }

    if (hide_password) {
      ariaLabels['hidePassword'] = hide_password
    }

    return ariaLabels
  }
}

export default Password

Password._supportsSpacingProps = true
