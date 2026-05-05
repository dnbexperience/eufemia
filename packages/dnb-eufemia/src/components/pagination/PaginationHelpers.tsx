/**
 * Web Pagination Helpers
 */
import { Fragment, isValidElement, useContext } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'

export type PaginationIndicatorElement =
  | Record<string, unknown>
  | ReactNode
  | (() => ReactNode)
  | string

export type PaginationIndicatorProps = {
  indicatorElement?: PaginationIndicatorElement
}

export const PaginationIndicator = ({
  indicatorElement = 'div',
  ...props
}: PaginationIndicatorProps) => {
  const context = useContext(Context)
  const Element = preparePageElement(indicatorElement)
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
  content: ReactNode | null
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

  insert(content: ReactNode) {
    this.hasContent = true
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert(this)
    }
    return this
  }

  update(content: ReactNode) {
    this.hasContent = true
    this.content = content
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(this)
    }
    return this
  }
}

export function isTrElement(Element) {
  let isTr = false

  if (Element === 'tr') {
    isTr = true
  } else if (
    Element &&
    (typeof Element === 'object' || isValidElement(Element))
  ) {
    if ((Element.__emotion_base || Element.target) === 'tr') {
      isTr = true
    }
  }

  return isTr
}

export function preparePageElement(
  Element,
  includeClassName = 'dnb-pagination__page'
) {
  if (Element === Fragment) {
    return Element
  }

  if (includeClassName) {
    const isTr = isTrElement(Element)

    return ({ className, children, ref, ...props }) => {
      const params = {
        ...props,
        className: clsx(includeClassName, className),
        ref,
      }
      return isTr ? (
        <td>
          <div {...params}>{children}</div>
        </td>
      ) : (
        <Element {...params}>{children}</Element>
      )
    }
  }

  return Element
}
