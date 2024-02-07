/**
 * Web Input Component
 *
 */

import React, { useContext, useRef, useState, ElementRef } from 'react'
import classnames from 'classnames'
import Context from '../../../../shared/Context'

import type { InputProps } from '../../../../components/Input'

import Input, { SubmitButton } from '../../../../components/Input'
import { pickFormElementProps } from '../../../../shared/helpers/filterValidProps'
import {
  makeUniqueId,
  extendPropsWithContext,
  convertStatusToStateOnly,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../../../shared/component-helper'
import IconView from '../../../../icons/view'
import IconViewOff from '../../../../icons/hide'
import IconViewMedium from '../../../../icons/view_medium'
import IconViewOffMedium from '../../../../icons/hide_medium'

export type PasswordProps = Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'size'
> &
  InputProps & {
    /**
     * Fires when the input toggles to show the password.
     */
    onShowPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void
    /**
     * Fires when the input toggles to hide the password.
     */
    onHidePassword?: (event: React.MouseEvent<HTMLButtonElement>) => void
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

const defaultProps = {
  ...Input.defaultProps,
}

function Password(externalProps: PasswordProps) {
  const props = { ...defaultProps, ...externalProps }

  const [hidden, setHidden] = useState<boolean>(true)

  const context = useContext(Context)

  const ref = useRef<ElementRef<'input'>>(props.inner_ref?.current ?? null)
  const id = props.id || makeUniqueId() // cause we need an id anyway

  const componentReference = {
    props,
    context,
    state: { hidden },
    ref,
    id,
    toggleVisibility,
  }

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(props).Forms,
    // Deprecated – can be removed in v11
    pickFormElementProps(context?.FormRow),
    pickFormElementProps(context?.formElement),
    context.Input
  )

  const params = { id }

  params['aria-describedby'] = combineDescribedBy(
    props,
    id + '-submit-button'
  )

  // Filter out password visibility handlers to prevent console warning about unknown event handler property .
  const { onShowPassword, onHidePassword, ...forwardedProps } = props

  const ariaLabels = getAriaLabel()

  return (
    <Input
      {...forwardedProps}
      {...params}
      className={classnames('dnb-input--password', props.className)}
      type={hidden ? 'password' : 'text'}
      inner_ref={ref}
      submit_element={
        <SubmitButton
          id={id + '-submit-button'}
          type="button"
          variant="secondary"
          aria-controls={id}
          aria-label={
            hidden ? ariaLabels.showPassword : ariaLabels.hidePassword
          }
          icon={
            extendedProps.size === 'large'
              ? hidden
                ? IconViewMedium
                : IconViewOffMedium
              : hidden
              ? IconView
              : IconViewOff
          }
          skeleton={extendedProps.skeleton}
          status={convertStatusToStateOnly(
            extendedProps.status,
            extendedProps.status_state
          )}
          status_state={extendedProps.status_state}
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
        { event }
      )

      return !hidden
    })

    if (ref.current) {
      ref.current.focus()
    }
  }

  // Can be removed with v11, just used to make sure that the old show_password and hide_password are still backward compatible
  function getAriaLabel() {
    const { passwordShowPasswordLabel, passwordHidePasswordLabel } =
      context.getTranslation(props).Forms

    const { show_password, hide_password } = props

    const ariaLabels = {
      showPassword: passwordShowPasswordLabel,
      hidePassword: passwordHidePasswordLabel,
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

Password._formElement = true
Password._supportsSpacingProps = true
