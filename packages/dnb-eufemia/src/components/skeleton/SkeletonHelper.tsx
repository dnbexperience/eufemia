/**
 * Web Skeleton Helpers
 *
 */

import type {
  CSSProperties,
  ElementType,
  HTMLProps,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import { convertJsxToString } from '../../shared/component-helper'
import type { SkeletonShow } from './Skeleton'
import type { ContextProps } from '../../shared/Context'

export type SkeletonMethods = 'shape' | 'font' | 'code'

export type SkeletonContextValue = ContextProps & {
  translation?: {
    Skeleton?: {
      ariaBusy?: string
    }
  }
}

// Elements whose role (or lack of one) does not allow a name, so screen readers can ignore an aria-label on them
const elementsWithoutName = new Set([
  'abbr',
  'b',
  'bdi',
  'bdo',
  'caption',
  'cite',
  'code',
  'data',
  'dd',
  'del',
  'dfn',
  'div',
  'dt',
  'em',
  'figcaption',
  'i',
  'ins',
  'kbd',
  'label',
  'legend',
  'mark',
  'p',
  'pre',
  'q',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
])

export const skeletonDOMAttributes = (
  params: HTMLProps<HTMLElement>,
  skeleton: SkeletonShow,
  context?: SkeletonContextValue,
  /** The rendered element. When it can't have a name, no aria-label is set. */
  element?: ElementType | string
) => {
  if (skeleton || (skeleton !== false && context?.skeleton)) {
    params.disabled = true
    params['aria-disabled'] = true

    const canHaveName =
      Boolean(params.role) ||
      typeof element !== 'string' ||
      (!elementsWithoutName.has(element) &&
        // An "a" without href has no role either
        !(element === 'a' && !params.href))
    if (canHaveName) {
      params['aria-label'] = context?.translation?.Skeleton?.ariaBusy
    }
  }

  return params
}

export const createSkeletonClass = (
  method: SkeletonMethods,
  skeleton: SkeletonShow,
  context?: SkeletonContextValue,
  className: string = null
) => {
  if (skeleton || (skeleton !== false && context?.skeleton)) {
    return clsx(
      className,
      'dnb-skeleton',
      method && `dnb-skeleton--${method}`
    )
  }

  return className
}

export type SkeletonAutoSizeProps = {
  __element?: ElementType
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export function AutoSize({
  __element: Comp = null,
  children = null,
  className = null,
  style = null,
  ...props
}: SkeletonAutoSizeProps) {
  const string = convertJsxToString(children)

  if (typeof string === 'string') {
    const countChars = string.trim().length

    if (countChars > 0) {
      return (
        <Comp
          className={clsx(className, 'dnb-skeleton', 'dnb-skeleton--font')}
          data-skeleton-chars={String(countChars)}
          style={{
            ...(style || {}),
            '--skeleton-chars': `${countChars}ch`,
          }}
          {...props}
        >
          {children}
        </Comp>
      )
    }
  }

  return <Comp {...props} className={className} style={style} />
}
