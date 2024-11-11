import React, { Fragment, useContext, useMemo } from 'react'
import { LOCALE } from '../../shared/defaults'
import { extendPropsWithContext } from '../../shared/component-helper'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { Li, Ol, Ul } from '../../elements'
import { UlAllProps } from '../../elements/Ul'
import { OlAllProps } from '../../elements/Ol'
import classNames from 'classnames'

export type ListFormatProps = {
  /**
   * Formatting options for the value when variant is `text`.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat
   */
  format?: Intl.ListFormatOptions
  /**
   * Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line.
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
    | 'unstyled'
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

function ListFormat(
  localProps: Omit<UlAllProps, 'value'> &
    Omit<OlAllProps, 'value'> &
    ListFormatProps
) {
  const { locale, ListFormat } = useContext(SharedContext)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(localProps, {}, ListFormat)
  const {
    value,
    format,
    variant = 'text',
    listType,
    children,
    className,
    ...props
  } = allProps

  const list = useMemo(() => {
    const isListVariant = variant !== 'text'

    const valueToUse = replaceRootFragment(children) || value

    if (!Array.isArray(valueToUse)) {
      return [valueToUse]
    }

    return isListVariant
      ? React.Children.map(valueToUse, (child: React.ReactNode, index) => {
          return <Li key={index}>{child}</Li>
        })
      : valueToUse
  }, [value, children, variant, listType])

  const result = useMemo(() => {
    if (variant === 'text') {
      return listFormat(list, { locale, format })
    }

    const ListElement = variant.startsWith('ol') ? Ol : Ul

    return (
      <ListElement
        type={listType !== 'unstyled' ? listType : null}
        className={classNames(
          'dnb-list-format',
          listType === 'unstyled' && 'dnb-unstyled-list',
          className
        )}
        {...props}
      >
        {list}
      </ListElement>
    )
  }, [format, list, locale])

  return result
}

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
    format?: ListFormatProps['format']
  } = {}
) {
  if (!Array.isArray(list)) {
    return list
  }

  list = replaceRootFragment(list).filter(function (item) {
    const isNan = typeof item === 'number' && isNaN(item)
    return item !== undefined && item !== false && item !== null && !isNan
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

function replaceRootFragment(children) {
  if (children?.type === Fragment) {
    return React.Children.toArray(children?.props?.children)
  }
  if (Array.isArray(children)) {
    const firstChild = children[0]
    if (
      React.Children.count(children) === 1 &&
      firstChild?.type === Fragment
    ) {
      return React.Children.toArray(firstChild?.props?.children)
    }
    return children
  }

  return children
}

ListFormat._supportsSpacingProps = true

export default ListFormat
