import React from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import {
  convertJsxToString,
  validateDOMAttributes,
} from '../../shared/component-helper'
import StatValueContext from './StatValueContext'

export type TrendProps = {
  value?: number | string
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  srLabel?: React.ReactNode
  tone?: 'positive' | 'negative' | 'neutral'
} & SpacingProps

const Trend = React.forwardRef<HTMLElement, TrendProps>(
  (props, ref) => {
    const {
      value,
      children,
      element: Element = 'span' as React.ElementType,
      className = null,
      srLabel = null,
      tone = null,
      ...rest
    } = props

  const rawValue =
    typeof value !== 'undefined' ? value : getValueFromChildren(children)

  const hasCustomChildren =
    typeof value === 'undefined' &&
    children !== null &&
    children !== undefined &&
    typeof children !== 'string' &&
    typeof children !== 'number'

  const {
    tone: resolvedTone,
    sign,
    displayValue,
  }: {
    tone: 'positive' | 'negative' | 'neutral'
    sign: '+' | '-' | null
    displayValue: string
  } = resolveTrendValue(rawValue)

  const childText = hasCustomChildren ? convertJsxToString(children) : ''
  const visibleText = childText || `${sign || ''}${displayValue}`
  const usedTone = tone || resolvedTone
  const srText = srLabel
    ? `${convertJsxToString(srLabel)}${' '}${visibleText}`
    : visibleText

  const attributes = validateDOMAttributes(props, {
    ...rest,
    className: classnames(
      'dnb-stat',
      'dnb-stat__trend',
      `dnb-stat__trend--${usedTone}`,
      createSpacingClasses(props),
      className
    ),
  })

    return (
      <Element ref={ref} {...attributes}>
        <StatValueContext.Provider
          value={{ useBasisSize: true, defaultMainWeight: null }}
        >
          <span className="dnb-stat__trend-content" aria-hidden>
            {!hasCustomChildren && sign ? (
              <span className="dnb-stat__trend-sign">{sign}</span>
            ) : null}
            <span className="dnb-stat__trend-value">
              {hasCustomChildren ? children : displayValue}
            </span>
          </span>
        </StatValueContext.Provider>
        <span className="dnb-sr-only" data-text={srText} />
      </Element>
    )
  }
)

// @ts-expect-error - Adding custom property to component for spacing detection
Trend._supportsSpacingProps = true

function getValueFromChildren(children: React.ReactNode): number | string {
  if (typeof children === 'string' || typeof children === 'number') {
    return children
  }

  if (React.isValidElement(children)) {
    const childProps = children.props as {
      value?: number | string
      children?: React.ReactNode
    }

    if (
      typeof childProps?.value === 'number' ||
      typeof childProps?.value === 'string'
    ) {
      return childProps.value
    }

    if (
      typeof childProps?.children === 'string' ||
      typeof childProps?.children === 'number'
    ) {
      return childProps.children
    }
  }

  return convertJsxToString(children) || '0'
}

function resolveTrendValue(value: number | string) {
  if (typeof value === 'number') {
    if (value > 0) {
      return {
        tone: 'positive' as const,
        sign: '+' as const,
        displayValue: String(Math.abs(value)),
      }
    }

    if (value < 0) {
      return {
        tone: 'negative' as const,
        sign: '-' as const,
        displayValue: String(Math.abs(value)),
      }
    }

    return {
      tone: 'neutral' as const,
      sign: null,
      displayValue: '0',
    }
  }

  const normalized = String(value || '')
  const match = normalized.match(/^([+\-−])\s?(.*)$/)

  if (!match) {
    return {
      tone: 'neutral' as const,
      sign: null,
      displayValue: normalized,
    }
  }

  if (match[1] === '+') {
    return {
      tone: 'positive' as const,
      sign: '+' as const,
      displayValue: match[2],
    }
  }

  return {
    tone: 'negative' as const,
    sign: '-' as const,
    displayValue: match[2],
  }
}

export default Trend
