import React, { useContext, useRef } from 'react'
import { makeUniqueId, warn } from '../../../../shared/component-helper'
import SharedContext from '../../../../shared/Context'
import { FieldHelpProps, FieldProps, FormError } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useDataValue } from '../../hooks'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'

export type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldProps<string> & FieldHelpProps

function Expiry(props: ExpiryProps) {
  const sharedContext = useContext(SharedContext)
  const placeholders =
    sharedContext?.translation.DatePicker.placeholder_characters

  const {
    id: propsId,
    className,
    label = sharedContext?.translation.Forms.expiryLabel,
    error,
    info,
    warning,
    help,
    disabled,
    value = '',
    labelDescription,
    labelSecondary,
    layout,
    required,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue({
    ...props,
    validator: validateExpiry,
  })

  if (value.length > 4) {
    warn(
      'Expiry field value length should not exceed four, Only the first four characters will be used!'
    )
  }

  const expiry: ExpiryValue = {
    month: value.substring(0, 2) ?? '',
    year: value.substring(2, 4) ?? '',
  }

  const id = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  return (
    <FieldBlock
      className={classnames(className)}
      labelSecondary={labelSecondary}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <MultiInputMask
        id={`${id}__input`}
        label={label}
        labelDirection={layout}
        values={expiry}
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        required={required}
        onChange={(expiry) => handleChange(expiryToString(expiry))}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter="/"
        inputs={[
          {
            id: 'month',
            label: sharedContext?.translation.DatePicker['month'],
            mask: [/[0-1]/, /[0-9]/],
            placeholderCharacter: placeholders['month'],
          },
          {
            id: 'year',
            label: sharedContext?.translation.DatePicker['year'],
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
          },
        ]}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.contents}</HelpButton>
          ) : undefined
        }
      />
    </FieldBlock>
  )

  function validateExpiry(expiry: string) {
    if (!expiry) {
      return new FormError('The value is required', {
        validationRule: 'required',
      })
    }

    const month = expiry.substring(0, 2)
    const isValidMonth = /^(0[1-9]|1[0-2])$/g.test(month)

    if (month.length === 2 && !isValidMonth) {
      return new FormError(`${month} is not a valid month`)
    }
  }

  function expiryToString(values: ExpiryValue) {
    return Object.values(values).join('')
  }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
