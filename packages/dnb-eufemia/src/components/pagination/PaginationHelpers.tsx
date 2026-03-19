/**
 * Web Pagination Helpers
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'

export type PaginationIndicatorElement =
  | Record<string, unknown>
  | React.ReactNode
  | (() => React.ReactNode)
  | string

export type PaginationIndicatorProps = {
  indicatorElement?: PaginationIndicatorElement
}

export const PaginationIndicator = ({
  indicatorElement = 'div',
  ...props
}: PaginationIndicatorProps) => {
  const context = React.useContext(Context)
  const Element = preparePageElement(indicatorElement as React.ElementType) as React.ElementType
  const ElementChild = isTrElement(Element) ? 'td' : 'div'

  return (
    <Element>
      <ElementChild className="dnb-pagination__indicator">
        <div className="dnb-pagination__indicator__inner">
          <ProgressIndicator />
          {context.getTranslation(props).Pagination.isLoadingText}
        </div>
      </ElementChild>
    </Element>
  )
}

export class ContentObject {
  content: React.ReactNode | null
  pageNumber: number
  hasContent: boolean
  onInsert?: (obj: ContentObject) => void
  onUpdate?: (obj: ContentObject) => void;
  [key: string]: unknown

  constructor({
    pageNumber,
    ...props
  }: {
    pageNumber: number
    [key: string]: unknown
  }) {
    this.content = null
    this.pageNumber = pageNumber
    this.hasContent = false

    for (const k in props) {
      this[k] = props[k]
    }
  }

  insert(content: React.ReactNode) {
    this.hasContent = true
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert(this)
    }
    return this
  }

  update(content: React.ReactNode) {
    this.hasContent = true
    this.content = content
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(this)
    }
    return this
  }
}

export function isTrElement(Element: unknown) {
  let isTr = false

  if (Element === 'tr') {
    isTr = true
  } else if (
    Element &&
    (typeof Element === 'object' || React.isValidElement(Element))
  ) {
    if (((Element as Record<string, unknown>).__emotion_base || (Element as Record<string, unknown>).target) === 'tr') {
      isTr = true
    }
  }

  return isTr
}

export function preparePageElement(
  Element: React.ElementType | symbol,
  includeClassName = 'dnb-pagination__page'
): React.ElementType {
  if (String(Element) === 'Symbol(react.fragment)') {
    return Element as React.ElementType
  }

  if (includeClassName) {
    const isTr = isTrElement(Element)
    const Comp = Element as React.ElementType

    return ({ className, children, ref, ...props }: { className?: string; children?: React.ReactNode; ref?: React.Ref<unknown>; [key: string]: unknown }) => {
      const params = {
        ...props,
        className: clsx(includeClassName, className),
        ref,
      }
      return isTr ? (
        <td>
          <div {...(params as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
        </td>
      ) : (
        <Comp {...(params as Record<string, unknown>)}>{children}</Comp>
      )
    }
  }

  return Element as React.ElementType
}
