import React, { useContext } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { LOCALE } from '../../../../shared/defaults'
import SharedContext, { InternalLocale } from '../../../../shared/Context'

export type Props = ValueProps<Array<number | string>> & {
  /**
   * Formatting options for the value.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
   */
  format?: Intl.ListFormatOptions
}

function ArraySelection(props: Props) {
  const { locale } = useContext(SharedContext)
  const { value, format, className, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {listFormat(value, { locale, format })}
    </ValueBlock>
  )
}

export function listFormat(
  value: Array<number | string>,
  {
    locale = LOCALE,
    format = {
      style: 'long',
      type: 'conjunction',
    },
    separator = ', ',
  }: {
    locale?: InternalLocale
    format?: Intl.ListFormatOptions
    separator?: string
  }
) {
  if (!Array.isArray(value)) {
    return value
  }
  try {
    const formatter = new Intl.ListFormat(locale, format)
    return formatter.format(value.map((v) => String(v)))
  } catch (error) {
    return value.join(separator)
  }
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
