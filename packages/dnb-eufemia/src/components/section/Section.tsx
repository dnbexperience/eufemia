/**
 * Web Section Component
 *
 */

import { useContext, useRef } from 'react'
import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type { ResponsiveProp } from '../../shared/types'
import Space from '../space/Space'
import Theme from '../../shared/Theme'
import { getColor } from '../../shared/helpers'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SectionAllProps, SectionReturnParams } from './types'

export * from './types'

const sectionDefaultProps: Partial<SectionAllProps> = {
  element: 'section',
}

function SectionComponent(localProps: SectionAllProps) {
  return <Space {...SectionParams(localProps)} />
}

export default function Section(props: SectionAllProps) {
  return <SectionComponent {...props} />
}

export function SectionParams(
  localProps: SectionAllProps
): SectionReturnParams {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    sectionDefaultProps,
    context.Section,
    { surface: localProps?.surface ?? context?.theme?.surface }
  )

  const {
    variant,
    breakout = !props.outset,
    outset,
    roundedCorner,
    textColor,
    backgroundColor,
    dropShadow,
    outline,
    outlineWidth = typeof props.outline === 'undefined' &&
    typeof props.outlineWidth === 'undefined'
      ? 'none'
      : props.outlineWidth,
    surface,
    ref: refProp,

    className,
    children,

    ...attributes
  } = props

  const internalRef = useRef<HTMLElement>(undefined)
  const elementRef = refProp || internalRef

  return Object.freeze({
    ...attributes,
    className: clsx(
      'dnb-section',
      `dnb-section--${variant ?? surface ?? 'default'}`,
      surface && `dnb-section--surface-${surface}`,
      className
    ),
    style: {
      ...computeStyle(
        breakout,
        'breakout',
        (value) => `var(--breakout--${value ? 'on' : 'off'})`
      ),
      ...computeStyle(outset, 'outset', (value) => (value ? '1' : '0')),
      ...computeStyle(roundedCorner, 'rounded-corner', (value) =>
        typeof value === 'boolean'
          ? value && 'var(--rounded-corner--value)'
          : value
              .map((v) => (v ? 'var(--rounded-corner--value)' : '0'))
              .join(' ')
      ),
      ...computeStyle(textColor, 'text-color', (value) => getColor(value)),
      ...computeStyle(backgroundColor, 'background-color', (value) =>
        getColor(value)
      ),
      ...computeStyle(
        dropShadow,
        'drop-shadow',
        (value) => value && 'var(--shadow-default)'
      ),
      ...computeStyle(outline, 'outline-color', (value) =>
        typeof value === 'boolean'
          ? value && 'var(--outline-color--value)'
          : getColor(value)
      ),
      ...computeStyle(outlineWidth, 'outline-width', (value) =>
        typeof value === 'number' ? `${value}px` : value
      ),
      ...attributes?.style,
    } as CSSProperties,
    ref: elementRef,
    children: surface ? (
      <Theme.Context surface={surface}>{children}</Theme.Context>
    ) : (
      children
    ),
  })
}

function computeStyle<T extends boolean | string | number | boolean[]>(
  property: T | ResponsiveProp<T>,
  name: string,
  valueCallback: (value: T) => string | undefined
) {
  let media = property as ResponsiveProp<T>

  if (
    media !== null &&
    (Array.isArray(media) || typeof media !== 'object')
  ) {
    media = {
      small: property,
      medium: property,
      large: property,
    } as ResponsiveProp<T>
  }

  const result = {}

  for (const size in media as ResponsiveProp<T>) {
    if (typeof media?.[size] !== 'undefined') {
      const value = valueCallback(media?.[size])
      if (typeof value === 'string') {
        result[`--${name}--${size}`] = value
      }
    }
  }

  return result
}

Section._name = 'Section'
withComponentMarkers(Section, { _supportsSpacingProps: true })
