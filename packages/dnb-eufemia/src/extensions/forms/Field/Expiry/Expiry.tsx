import React, { useContext, useRef } from 'react'
import { makeUniqueId } from '../../../../shared/component-helper'
import SharedContext from '../../../../shared/Context'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useDataValue } from '../../hooks'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

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
    layout = 'vertical',
    required,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue({
    ...props,
    emptyValue: '',
  })

  const expiry: ExpiryValue = {
    month: value.substring(0, 2) ?? '',
    year: value.substring(2, 4) ?? '',
  }

  const idRef = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-expiry', className)}
      labelSecondary={labelSecondary}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <MultiInputMask
        stretch
        id={`${idRef}__input`}
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
        inputMode="numeric"
        inputs={[
          {
            id: 'month',
            label: sharedContext?.translation.DatePicker['month'],
            mask: [
              /[0-1]/,
              expiry.month.charAt(0) === '0' ||
              expiry.month.charAt(0) === ''
                ? /[1-9]/
                : /[0-2]/,
            ],
            placeholderCharacter: placeholders['month'],
            autoComplete: 'cc-exp-month',
          },
          {
            id: 'year',
            label: sharedContext?.translation.DatePicker['year'],
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
            autoComplete: 'cc-exp-year',
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

  function expiryToString(values: ExpiryValue) {
    return Object.values(values).join('')
  }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
