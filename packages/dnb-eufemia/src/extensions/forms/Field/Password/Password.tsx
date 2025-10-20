import React, {
  useContext,
  useRef,
  useState,
  ElementRef,
  MutableRefObject,
  useCallback,
  useMemo,
} from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import StringField, { Props as StringFieldProps } from '../String'
import useId from '../../../../shared/helpers/useId'

import { InputProps, SubmitButton } from '../../../../components/Input'
import IconView from '../../../../icons/view'
import IconViewOff from '../../../../icons/hide'
import IconViewMedium from '../../../../icons/view_medium'
import IconViewOffMedium from '../../../../icons/hide_medium'
import { convertSnakeCaseProps } from '../../../../shared/helpers/withSnakeCaseProps'
import useTranslation from '../../hooks/useTranslation'

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
  const generatedId = useId()
  const idToUse = id || generatedId

  // Object freeze used to prevent mutation of show_password and hide_password props. Freeze and convertToSnakeCase can be removed in v11.
  const props = convertSnakeCaseProps(Object.freeze(externalProps))

  const [hidden, setHidden] = useState<boolean>(true)

  const sharedContext = useContext(SharedContext)
  const translations = useTranslation().Password

  const ref = useRef<ElementRef<'input'>>(innerRef?.current ?? null)

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      ...props.errorMessages,
    }
  }, [translations.errorRequired, props.errorMessages])

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

  const ToggleVisibilityButton = useCallback(() => {
    return (
      <SubmitButton
        id={idToUse + '-submit-button'}
        type="button"
        variant="secondary"
        aria-controls={idToUse}
        aria-label={
          hidden ? translations.ariaLabelShow : translations.ariaLabelHide
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
        disabled={disabled}
        skeleton={sharedContext.skeleton}
        onClick={toggleVisibility}
      />
    )
  }, [
    idToUse,
    hidden,
    sharedContext.skeleton,
    disabled,
    size,
    toggleVisibility,
  ])

  return (
    <StringField
      id={idToUse}
      className={classnames('dnb-forms-field-password', className)}
      label={label ?? translations.label}
      type={hidden ? 'password' : 'text'}
      value={value}
      innerRef={ref}
      aria-describedby={idToUse + '-submit-button'}
      submitElement={<ToggleVisibilityButton />}
      disabled={disabled}
      size={size}
      autoComplete="current-password"
      errorMessages={errorMessages}
      {...props}
    />
  )
}

export default Password

Password._supportsSpacingProps = true
