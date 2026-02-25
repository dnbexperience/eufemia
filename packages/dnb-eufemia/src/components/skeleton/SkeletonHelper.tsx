/**
 * Web Skeleton Helpers
 *
 */

import React from 'react'
import clsx from 'clsx'
import { convertJsxToString } from '../../shared/component-helper'
import type { SkeletonShow } from './Skeleton'
import type { ContextProps } from '../../shared/Context'

export type SkeletonMethods = 'shape' | 'font' | 'code'

export type SkeletonContextProps = ContextProps & {
  translation?: {
    Skeleton?: {
      ariaBusy?: string
    }
  }
}

export type SkeletonDOMAttributesContext = {
  translation?: {
    Skeleton: {
      ariaBusy?: string
    }
  }
}

export const skeletonDOMAttributes = (
  params: React.HTMLProps<HTMLElement>,
  skeleton: SkeletonShow,
  context?: SkeletonContextProps
) => {
  if (skeleton || (skeleton !== false && context?.skeleton)) {
    params.disabled = true
    params['aria-disabled'] = true
    params['aria-label'] = context?.translation?.Skeleton?.ariaBusy
  }

  return params
}

export const createSkeletonClass = (
  method: SkeletonMethods,
  skeleton: SkeletonShow,
  context?: SkeletonContextProps,
  className = null
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

export type AutoSizeProps = {
  __element?: React.ElementType
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function AutoSize({
  __element: Comp = null,
  children = null,
  className = null,
  style = null,
  ...props
}: AutoSizeProps) {
  const string = convertJsxToString(children)

  if (typeof string === 'string') {
    const countChars = string.trim().length

    if (countChars > 0) {
      return React.createElement(
        Comp,
        {
          className: clsx(className, 'dnb-skeleton', 'dnb-skeleton--font'),
          'data-skeleton-chars': String(countChars),
          style: {
            ...(style || {}),
            '--skeleton-chars': `${countChars}ch`,
          },
          ...props,
        },
        children
      )
    }
  }

  return <Comp {...props} className={className} style={style} />
}
