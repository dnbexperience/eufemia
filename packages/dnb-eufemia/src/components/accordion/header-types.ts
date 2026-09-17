/**
 * Types for AccordionHeader
 *
 * Separate from `types.ts` so Accordion and AccordionHeader each export only
 * their own types.
 */

import type { HTMLProps, ReactNode } from 'react'
import type { HeadingLevel } from '../Heading'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'
import type {
  AccordionIcon,
  AccordionIconPosition,
  AccordionVariant,
} from './types'

export type AccordionHeaderTitleProps = SpacingProps & {
  children?: ReactNode
}

export type AccordionHeaderDescriptionProps = SpacingProps & {
  children?: ReactNode
}

export type AccordionHeaderContainerProps = SpacingProps & {
  children?: ReactNode
}

type AccordionHeaderIconIcon =
  | IconIcon
  | {
      closed?: IconIcon
      expanded?: IconIcon
    }

export type AccordionHeaderIconProps = {
  icon?: AccordionHeaderIconIcon
  size?: IconSize
  expanded?: boolean
  iconPosition?: AccordionIconPosition
}

export type AccordionHeaderTitle = string | ReactNode | (() => ReactNode)

export type AccordionHeaderDescription =
  | string
  | ReactNode
  | (() => ReactNode)

export type AccordionHeaderLeftComponent =
  | string
  | ReactNode
  | (() => ReactNode)

export type AccordionHeaderElement = string | ReactNode | (() => ReactNode)

export type AccordionHeaderHeading =
  | boolean
  | string
  | ReactNode
  | (() => ReactNode)

export type AccordionHeaderIcon =
  | ReactNode
  | (() => ReactNode)
  | {
      closed?: ReactNode | (() => ReactNode)
      expanded?: ReactNode | (() => ReactNode)
    }

export type AccordionHeaderProps = HTMLProps<HTMLElement> &
  SpacingProps & {
    title?: AccordionHeaderTitle
    expanded?: boolean
    description?: AccordionHeaderDescription
    leftComponent?: AccordionHeaderLeftComponent
    element?: AccordionHeaderElement
    heading?: AccordionHeaderHeading
    headingLevel?: HeadingLevel
    icon?: AccordionIcon
    iconPosition?: AccordionIconPosition
    iconSize?: IconSize
    disabled?: boolean
    skeleton?: SkeletonShow
    noAnimation?: boolean
    className?: string
    children?: string | ReactNode | (() => ReactNode)
    variant?: AccordionVariant
  }
