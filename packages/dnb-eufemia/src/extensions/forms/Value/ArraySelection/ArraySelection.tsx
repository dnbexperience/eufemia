import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { LOCALE } from '../../../../shared/defaults'
import { convertJsxToString } from '../../../../shared/component-helper'
import SharedContext, { InternalLocale } from '../../../../shared/Context'
import Context from '../../DataContext/Context'

export type Props = ValueProps<Array<number | string>> & {
  /**
   * Formatting options for the value.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
   */
  format?: Intl.ListFormatOptions
}

function ArraySelection(props: Props) {
  const { locale } = useContext(SharedContext)
  const { fieldPropsRef } = useContext(Context) || {}
  const { path, value, format, className, ...rest } = useValueProps(props)

  const valueFromField = useMemo(() => {
    if (path && value) {
      const data = fieldPropsRef?.current?.[
        path + '/arraySelectionData'
      ] as Array<{
        value: string
        title: string | React.ReactNode
      }>
      return data?.map(({ title }) => convertJsxToString(title))
    }
  }, [fieldPropsRef, path, value])

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {listFormat(valueFromField ?? value, { locale, format })}
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
