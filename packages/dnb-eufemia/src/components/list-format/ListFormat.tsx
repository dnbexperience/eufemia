import React, { useContext, useMemo } from 'react'
import { LOCALE } from '../../shared/defaults'
import {
  convertJsxToString,
  extendPropsWithContext,
} from '../../shared/component-helper'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { Li, Ol, Ul } from '../../elements'

export type ListFormatProps = {
  /**
   * Formatting options for the value.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
   */
  format?: Intl.ListFormatOptions
  /**
   * Defines if the value should be displayed in list format or regular text format on one line.
   * Default: `text`
   */
  variant?: 'ol' | 'ul' | 'text'
  /**
   * Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`.
   * Variant `ol`: `a`, `A`, `i`, `I` and `1`.
   * Variant `ul`: `circle`, `disc` and `square`.
   * Default: `undefined`
   */
  listType?:
    | 'a'
    | 'A'
    | 'i'
    | 'I'
    | '1'
    | 'circle'
    | 'disc'
    | 'square'
    | undefined

  /**
   * The value to format as list.
   * Default: null
   */
  value?: Array<React.ReactNode>

  /**
   * The children to format as list.
   * Default: null
   */
  children?: React.ReactNode
}

function ListFormat(localProps: ListFormatProps) {
  const { locale, ListFormat } = useContext(SharedContext)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(localProps, {}, ListFormat)
  const { value, format, variant = 'text', listType, children } = allProps

  const list = useMemo(() => {
    const isListVariant = variant !== 'text'
    if (children) {
      return isListVariant
        ? React.Children.map(children, (child: React.ReactNode, index) => {
            return <Li key={index}>{child}</Li>
          })
        : children
    }
    return isListVariant
      ? value?.map((value, index) => (
          <Li key={index}>
            {React.isValidElement(value)
              ? value
              : convertJsxToString(value)}
          </Li>
        ))
      : value
  }, [value, children, variant])

  const result = useMemo(() => {
    if (variant === 'text') {
      return listFormat(list as Array<React.ReactNode>, { locale, format })
    }

    const ListElement = variant.startsWith('ol') ? Ol : Ul

    return <ListElement type={listType}>{list}</ListElement>
  }, [format, list, locale, variant, listType])

  return result
}

// Support for "ListFormat.format(list)" for non-React usage
ListFormat.format = listFormat

export function listFormat(
  list: Array<React.ReactNode>,
  {
    locale = LOCALE,
    format = {
      style: 'long',
      type: 'conjunction',
    },
  }: {
    locale?: InternalLocale
    format?: Intl.ListFormatOptions
  } = {}
) {
  if (!Array.isArray(list)) {
    return list
  }

  list = list.filter(function (item) {
    return item !== undefined && item !== false && item !== null
  })

  const buffer = new Map()
  const hasJSX = list.some((v) => typeof v === 'object')
  const shadow = list.map((v, i) => {
    if (hasJSX) {
      const id = `id-${i}`
      buffer.set(id, v)
      return `{${id}}`
    }

    return String(v)
  })

  try {
    const formatter = new Intl.ListFormat(locale, format)
    const formattedList = formatter.format(shadow)

    if (hasJSX) {
      return formattedList.split(/\{(id-[0-9]+)\}/).map((v, i) => {
        if (v.startsWith('id-')) {
          const element = buffer.get(v)

          return element.key
            ? element
            : // Support lists without a key
              React.createElement(React.Fragment, { key: i }, element)
        }

        return v
      })
    }

    return formattedList
  } catch (error) {
    if (hasJSX) {
      return list
    }

    return list.join(', ')
  }
}

ListFormat._supportsSpacingProps = true

export default ListFormat
