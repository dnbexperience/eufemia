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
    show_password?: string
    hide_password?: string
    on_show_password?: (...args: any[]) => any
    on_hide_password?: (...args: any[]) => any
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

  function toggleVisibility(event: React.MouseEvent<HTMLButtonElement>) {
    setHidden((hidden) => {
      dispatchCustomElementEvent(
        componentReference,
        hidden ? 'on_show_password' : 'on_hide_password',
        { event }
      )

      return !hidden
    })

    if (ref.current) {
      ref.current.focus()
    }
  }

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(props).Input,
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

  return (
    <Input
      {...props}
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
            hidden
              ? extendedProps.show_password
              : extendedProps.hide_password
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
}

export default Password

Password._formElement = true
Password._supportsSpacingProps = true
