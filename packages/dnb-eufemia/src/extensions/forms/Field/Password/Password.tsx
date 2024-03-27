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
import IconView from '../../../../icons/view'
import IconViewOff from '../../../../icons/hide'
import IconViewMedium from '../../../../icons/view_medium'
import IconViewOffMedium from '../../../../icons/hide_medium'
import { convertSnakeCaseProps } from '../../../../shared/helpers/withSnakeCaseProps'
import useLocale from '../../hooks/useLocale'

export type PasswordVisibilityEvent =
  React.MouseEvent<HTMLButtonElement> & {
    value: string
  }

export type PasswordProps = Omit<StringFieldProps, 'innerRef'> & {
  /**
   * Fires when the input toggles to show the password.
   */
  onShowPassword?: (event: PasswordVisibilityEvent) => void
  /**
   * Fires when the input toggles to hide the password.
   */
  onHidePassword?: (event: PasswordVisibilityEvent) => void
  /**
   * The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute.
   */
  size?: InputProps['size']
  /**
   * ElementRef passed on to the password input element.
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
  on_show_password?: (event: PasswordVisibilityEvent) => void
  /**
   * @deprecated in v11, use `onHidePassword` instead.
   */
  on_hide_password?: (event: PasswordVisibilityEvent) => void
}

function Password({
  id,
  className,
  innerRef,
  value,
  label,
  disabled,
  size,
  ...externalProps
}: PasswordProps) {
  // Object freeze used to prevent mutation of show_password and hide_password props. Freeze and convertToSnakeCase can be removed in v11.
  const props = convertSnakeCaseProps(Object.freeze(externalProps))

  const [hidden, setHidden] = useState<boolean>(true)

  const sharedContext = useContext(SharedContext)
  const translations = useLocale().Password

  const ref = useRef<ElementRef<'input'>>(innerRef?.current ?? null)

  const toggleVisibility = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { onShowPassword, onHidePassword } =
        convertSnakeCaseProps(props)

      const value = ref.current.value

      setHidden((hidden) => {
        hidden
          ? onShowPassword?.({ ...event, value })
          : onHidePassword?.({ ...event, value })

        return !hidden
      })

      if (ref.current) {
        ref.current.focus()
      }
    },
    [props]
  )

  // Can be removed with v11, just used to make sure that the old show_password and hide_password are still backward compatible.
  const getAriaLabel = useCallback(() => {
    const ariaLabels = {
      showPassword: translations.ariaLabelShow,
      hidePassword: translations.ariaLabelHide,
    }

    if (externalProps.show_password) {
      ariaLabels['showPassword'] = externalProps.show_password
    }

    if (externalProps.hide_password) {
      ariaLabels['hidePassword'] = externalProps.hide_password
    }

    return ariaLabels
  }, [
    externalProps.show_password,
    externalProps.hide_password,
    translations,
  ])

  const ariaLabels = getAriaLabel()

  const ToggleVisibilityButton = useCallback(() => {
    return (
      <SubmitButton
        id={id + '-submit-button'}
        type="button"
        variant="secondary"
        aria-controls={id}
        aria-label={
          hidden ? ariaLabels.showPassword : ariaLabels.hidePassword
        }
        icon={
          size === 'large'
            ? hidden
              ? IconViewMedium
              : IconViewOffMedium
            : hidden
            ? IconView
            : IconViewOff
        }
        // status={hasError ? 'error' : undefined}
        disabled={disabled}
        skeleton={sharedContext.skeleton}
        onClick={toggleVisibility}
      />
    )
  }, [
    id,
    hidden,
    sharedContext.skeleton,
    disabled,
    size,
    toggleVisibility,
    ariaLabels,
  ])

  return (
    <StringField
      id={id}
      className={classnames('dnb-forms-field-password', className)}
      label={label ?? translations.label}
      type={hidden ? 'password' : 'text'}
      value={value}
      innerRef={ref}
      aria-describedby={id + '-submit-button'}
      submitElement={<ToggleVisibilityButton />}
      disabled={disabled}
      {...props}
    />
  )
}

export default Password

Password._supportsSpacingProps = true
