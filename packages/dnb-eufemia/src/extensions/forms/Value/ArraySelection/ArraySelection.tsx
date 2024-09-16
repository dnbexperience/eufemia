import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { LOCALE } from '../../../../shared/defaults'
import { convertJsxToString } from '../../../../shared/component-helper'
import SharedContext, { InternalLocale } from '../../../../shared/Context'
import Context from '../../DataContext/Context'
import { Li, Ol, Ul } from '../../../../elements'

export type Props = ValueProps<Array<number | string>> & {
  /**
   * Formatting options for the value.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
   */
  format?: Intl.ListFormatOptions
  /**
   * Defines if the the value should be displayed in list format or reuglar text format on one line.
   * Default: `text`
   */
  variant?: 'ol' | 'ol-unstyled' | 'ul' | 'ul-unstyled' | 'text'
}

function ArraySelection(props: Props) {
  const { locale } = useContext(SharedContext)
  const { fieldPropsRef } = useContext(Context) || {}
  const {
    path,
    value,
    format,
    className,
    variant = 'text',
    ...rest
  } = useValueProps(props)

  const list = useMemo(() => {
    const isListVariant = variant !== 'text'
    if (path) {
      const data = fieldPropsRef?.current?.[
        path + '/arraySelectionData'
      ] as Array<{
        value: string
        title: string | React.ReactNode
      }>

      return (
        data?.map?.(({ title }, index) =>
          isListVariant ? (
            <Li key={index}>{convertJsxToString(title)}</Li>
          ) : (
            convertJsxToString(title)
          )
        ) || value
      )
    }

    return isListVariant
      ? value.map((value, index) => (
          <Li key={index}>{convertJsxToString(value)}</Li>
        ))
      : value
  }, [fieldPropsRef, path, value, variant])

  const listValue = useMemo(() => {
    if (variant === 'text') {
      return listFormat(list, { locale, format })
    }
    const ListElement = variant.startsWith('ol') ? Ol : Ul

    return (
      <ListElement
        className={classnames(
          variant.endsWith('unstyled') && 'dnb-unstyled-list'
        )}
      >
        {list}
      </ListElement>
    )
  }, [format, list, locale, variant])

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {listValue}
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
