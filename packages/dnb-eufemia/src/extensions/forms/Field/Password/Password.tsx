import React, {
  useContext,
  useRef,
  useState,
  ElementRef,
  MutableRefObject,
  useCallback,
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
import { convertSnakeCaseProps } from '../../../../shared/helpers/withSnakeCaseProps'

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
   * ElememntRef passed on to the password input element.
   */
  innerRef?: MutableRefObject<HTMLInputElement>
  /**
   * @deprecated in v11, use use `locales`prop on `Provider` and override `passwordShowLabel` instead.
   */
  show_password?: string
  /**
   * @deprecated in v11, use use `locales`prop on `Provider` and override `passwordHideLabel` instead.
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
  const translations = sharedContext.translation.Forms

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.passwordRequired,
    pattern: translations.passwordErrorPattern,
  })

  const preparedProps: PasswordProps = {
    // deprecated – the convert can be removed in v12
    ...convertSnakeCaseProps(props),
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
  // const componentReference = {
  //   props,
  //   context: sharedContext,
  //   state: { hidden },
  //   ref,
  //   id,
  //   toggleVisibility,
  // }

  // Can be removed with v11, just used to make sure that the old show_password and hide_password are still backward compatible.
  const getAriaLabel = useCallback(() => {
    const { passwordShowLabel, passwordHideLabel } = translations

    const ariaLabels = {
      showPassword: passwordShowLabel,
      hidePassword: passwordHideLabel,
    }

    if (props.show_password) {
      ariaLabels['showPassword'] = props.show_password
    }

    if (props.hide_password) {
      ariaLabels['hidePassword'] = props.hide_password
    }

    return ariaLabels
  }, [props.show_password, props.hide_password, translations])

  const toggleVisibility = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setHidden((hidden) => {
        dispatchCustomElementEvent(
          { props, context: sharedContext, state: { hidden }, ref, id },
          hidden ? 'onShowPassword' : 'onHidePassword',
          { event, value }
        )

        return !hidden
      })

      if (ref.current) {
        ref.current.focus()
      }
    },
    [value, props, sharedContext, ref, id]
  )

  const ariaLabels = getAriaLabel()

  const ToggleVisibilityButton = useCallback(
    () => (
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
    ),
    [
      id,
      hidden,
      sharedContext.skeleton,
      hasError,
      disabled,
      props.size,
      toggleVisibility,
      ariaLabels,
    ]
  )

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
      submitElement={<ToggleVisibilityButton />}
    />
  )
}

export default Password

Password._supportsSpacingProps = true
