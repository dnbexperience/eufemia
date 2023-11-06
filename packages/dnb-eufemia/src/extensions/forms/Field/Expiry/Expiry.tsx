import React, { useContext, useEffect, useRef, useState } from 'react'
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

export type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

type ExpiryProps = FieldProps<ExpiryValue, undefined> & FieldHelpProps

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
    value,
    labelDescription,
    labelSecondary,
    layout,
    required,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(props)
  const [internalValues, setInternalValues] = useState<ExpiryValue>({
    month: value.month ?? '',
    year: value.year ?? '',
  })

  const id = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  useEffect(() => {
    const { month, year } = internalValues

    const isInputEmpty = month === '' && year === ''
    const isMonthFilledOut = month.length === 2
    const isYearFilledOut = year.length === 2

    if (isInputEmpty || (isMonthFilledOut && isYearFilledOut)) {
      return handleChange(internalValues)
    }
  }, [internalValues, handleChange, placeholders])

  return (
    <FieldBlock
      className={classnames(className)}
      layout={layout}
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
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
        // suffix={
        //   help ? (
        //     <HelpButton title={help.title}>{help.contents}</HelpButton>
        //   ) : undefined
        // }
        values={internalValues}
        onChange={setInternalValues}
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
      />
    </FieldBlock>
  )
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
