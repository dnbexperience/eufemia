import React, { useContext } from 'react'
import DataContext from '../DataContext/Context'
import Section, { SectionAllProps } from '../../../components/Section'
import { FormLabel } from '../../../components'

function Log({
  placeholder,
  label,
  data: logData,
  ...props
}: Omit<SectionAllProps, 'data' | 'label'> & {
  data?: unknown
  label?: React.ReactNode
  placeholder?: React.ReactNode
}) {
  const { data } = useContext(DataContext)

  return (
    <Section
      element="output"
      backgroundColor="sand-yellow"
      style={{ maxWidth: '80vw' }}
      innerSpace
      {...props}
    >
      {label && (
        <FormLabel bottom>
          <b>{label}</b>
        </FormLabel>
      )}
      <pre>
        {placeholder && Object.keys((logData ?? data) || {}).length === 0
          ? placeholder
          : JSON.stringify(
              replaceUndefinedValues(logData ?? data),
              null,
              2
            )}
        {' ' /* Ensure one line of spacing */}
      </pre>
    </Section>
  )
}

/**
 * Replaces undefined values in an object with a specified replacement value.
 * @param value - The value to check for undefined values.
 * @param replaceWith - The value to replace undefined values with. Default is null.
 * @returns The object with undefined values replaced.
 */
function replaceUndefinedValues(
  value: unknown,
  replaceWith = 'undefined' as unknown
): unknown {
  if (typeof value === 'undefined') {
    return replaceWith
  } else if (Array.isArray(value)) {
    return value.map((item) => replaceUndefinedValues(item, replaceWith))
  } else if (value && typeof value === 'object' && value !== replaceWith) {
    return {
      ...value,
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          replaceUndefinedValues(v, replaceWith),
        ])
      ),
    }
  } else {
    return value
  }
}

Log._supportsSpacingProps = true
export default Log
