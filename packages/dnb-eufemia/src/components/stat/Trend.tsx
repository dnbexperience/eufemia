import React from 'react'
import classnames from 'classnames'
import type { SpacingProps } from '../../shared/types'
import { convertJsxToString, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatValueContext from './StatValueContext'
import { TextInternal as Text } from './Text'

const trendContextValue = {
  useBasisSize: true,
  defaultMainWeight: null,
} as const

type TrendOwnProps = {
  value?: number | string
  element?: keyof JSX.IntrinsicElements
  srLabel?: React.ReactNode
  tone?: 'positive' | 'negative' | 'neutral'
  skeleton?: SkeletonShow
}

export type TrendProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof TrendOwnProps | 'ref'
> &
  TrendOwnProps &
  SpacingProps

function Trend(props: TrendProps) {
  const {
    value,
    children,
    id = null,
    element: Element = 'span',
    className = null,
    style = null,
    srLabel = null,
    tone = null,
    skeleton = null,
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

  return (
    <Text
      {...rest}
      id={id}
      element={Element}
      className={classnames(
        'dnb-stat',
        'dnb-stat__trend',
        `dnb-stat__trend--${usedTone}`,
        className
      )}
      style={style}
      skeleton={skeleton}
      textClassName={false}
    >
      <StatValueContext.Provider value={trendContextValue}>
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
    </Text>
  )
}

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

  const text = convertJsxToString(children)
  if (!text) {
    warn(
      'Stat.Trend could not resolve a value from the provided children. Falling back to "0".'
    )
  }

  return text || '0'
}

function resolveTrendValue(value: number | string) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return {
        tone: 'neutral' as const,
        sign: null,
        displayValue: '\u2013',
      }
    }

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
      displayValue: normalized || '0',
    }
  }

  // Sign-only strings like "-", "+", or "−" have no meaningful value
  if (!match[2]) {
    return {
      tone: 'neutral' as const,
      sign: null,
      displayValue: '0',
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
