import React, { useContext } from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'
import type {
  TypographySize,
  TypographyWeight,
} from '../../elements/typography/Typography'
import { validateDOMAttributes, warn } from '../../shared/component-helper'
import StatRootContext from './StatRootContext'

export type LabelProps = {
  children?: React.ReactNode
  element?: keyof JSX.IntrinsicElements
  className?: string
  fontSize?: TypographySize
  fontWeight?: TypographyWeight
  variant?: 'default' | 'subtle'
  style?: React.CSSProperties
} & SpacingProps

function Label(props: LabelProps) {
  const { inRoot } = useContext(StatRootContext)

  const {
    children,
    element: Element = 'dt',
    className = null,
    fontSize = 'small',
    fontWeight,
    variant = 'default',
    style = null,
    ...rest
  } = props
  const resolvedFontWeight =
    fontWeight ?? (variant === 'subtle' ? 'regular' : 'medium')
  const resolvedLineHeight = getLabelLineHeight(fontSize)

  if (!inRoot) {
    warn('Stat.Label should be used inside Stat.Root')
  }

  const attributes = validateDOMAttributes(props, {
    ...rest,
    style,
    className: classnames(
      'dnb-stat',
      'dnb-stat__label',
      `dnb-stat__label--${variant}`,
      `dnb-t__size--${fontSize}`,
      `dnb-t__line-height--${resolvedLineHeight}`,
      `dnb-t__weight--${resolvedFontWeight}`,
      createSpacingClasses(props),
      className
    ),
  })

  return <Element {...attributes}>{children}</Element>
}

Label._supportsSpacingProps = true
Label._statRole = 'label'

export default Label

const LINE_HEIGHT_MAP: Record<TypographySize, TypographySize> = {
  'x-small': 'basis',
  small: 'basis',
  basis: 'medium',
  medium: 'large',
  large: 'x-large',
  'x-large': 'xx-large',
  'xx-large': 'xx-large',
}

function getLabelLineHeight(fontSize: TypographySize): TypographySize {
  return LINE_HEIGHT_MAP[fontSize] || 'basis'
}
