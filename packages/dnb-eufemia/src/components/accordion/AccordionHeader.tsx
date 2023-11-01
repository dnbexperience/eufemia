/**
 * Web Accordion Component
 *
 */

import React, { HTMLProps, useContext, useState } from 'react'
import type { SpacingProps } from '../space/types'

import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import IconPrimary from '../icon-primary/IconPrimary'
import classnames from 'classnames'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import type { HeadingLevel } from '../Heading'
import type { IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type {
  AccordionIcon,
  AccordionIconPosition,
  AccordionVariant,
} from './Accordion'

export type AccordionHeaderTitleProps = SpacingProps & {
  children?: React.ReactNode
}

function AccordionHeaderTitle({
  children = null,
  ...rest
}: AccordionHeaderTitleProps) {
  return (
    <span
      className={classnames(
        'dnb-accordion__header__title',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  )
}

export type AccordionHeaderDescriptionProps = SpacingProps & {
  children?: React.ReactNode
}

function AccordionHeaderDescription({
  children = null,
  ...rest
}: AccordionHeaderDescriptionProps) {
  return children ? (
    <span
      className={classnames(
        'dnb-accordion__header__description',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  ) : null
}

export type AccordionHeaderContainerProps = SpacingProps & {
  children?: React.ReactNode
}

function AccordionHeaderContainer({
  children = null,
  ...rest
}: AccordionHeaderContainerProps) {
  return children ? (
    <span
      className={classnames(
        'dnb-accordion__header__container',
        createSpacingClasses(rest)
      )}
    >
      {children}
    </span>
  ) : null
}

type AccordionHeaderIconIcon =
  | React.ReactNode
  | ((...args: any[]) => React.ReactNode)
  | {
      closed?: React.ReactNode | ((...args: any[]) => React.ReactNode)
      expanded?: React.ReactNode | ((...args: any[]) => React.ReactNode)
    }

export type AccordionHeaderIconProps = {
  icon?: AccordionHeaderIconIcon
  size?: IconSize
  expanded?: boolean
  icon_position?: AccordionIconPosition
}

function AccordionHeaderIcon({
  icon,
  expanded,
  size = 'medium',
  icon_position,
}: AccordionHeaderIconProps) {
  return (
    <span
      className={classnames(
        'dnb-accordion__header__icon',
        icon_position && `dnb-accordion__header__icon--${icon_position}`
      )}
    >
      <IconPrimary
        size={size}
        // There has to be a better way than to do so much casting
        icon={
          icon &&
          typeof icon === 'object' &&
          'expanded' in icon &&
          typeof icon?.expanded !== 'undefined'
            ? icon[expanded ? 'expanded' : 'closed']
            : (icon as React.ReactNode | ((...args: any[]) => any)) ||
              'chevron-down'
        }
        aria-hidden
      />
    </span>
  )
}

export type AccordionHeaderTitle =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type AccordionHeaderDescription =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type AccordionHeaderLeftComponent =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type AccordionHeaderElement =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type AccordionHeaderHeading =
  | boolean
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type AccordionHeaderIcon =
  | React.ReactNode
  | ((...args: any[]) => any)
  | {
      closed?: React.ReactNode | ((...args: any[]) => any)
      expanded?: React.ReactNode | ((...args: any[]) => any)
    }

export type AccordionHeaderProps = React.HTMLProps<HTMLElement> &
  SpacingProps & {
    title?: AccordionHeaderTitle
    expanded?: boolean
    description?: AccordionHeaderDescription
    left_component?: AccordionHeaderLeftComponent
    element?: AccordionHeaderElement
    heading?: AccordionHeaderHeading
    heading_level?: HeadingLevel
    icon?: AccordionIcon
    icon_position?: AccordionIconPosition
    icon_size?: IconSize
    disabled?: boolean
    skeleton?: SkeletonShow
    no_animation?: boolean
    className?: string
    children?: string | React.ReactNode | ((...args: any[]) => any)
    variant?: AccordionVariant
  }

const accordionHeaderDefaultProps = {
  icon_size: 'medium',
}

export const AccordionHeader = ({
  icon_size: icon_size_default = 'medium',
  ...restOfProps
}: AccordionHeaderProps) => {
  const props = { icon_size: icon_size_default, ...restOfProps }

  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [hasClicked, setHasClicked] = useState<boolean>(false)

  const context = useContext(AccordionContext)

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLElement>) {
    const keyPressed = event.key

    if (keyPressed === 'Enter' || keyPressed === ' ') {
      event.preventDefault()
      onClickHandler(event)
    }
  }

  function onClickHandler(
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) {
    const { id, group } = context

    if (canClick()) {
      const expanded = !context.expanded
      context.callOnChange({ id, group, expanded, event })

      setHasClicked(true)
    }
  }

  function onMouseOverHandler() {
    setIsHovering(true)
  }

  function onMouseOutHandler() {
    setIsHovering(false)
    setHasClicked(false)
  }

  function canClick() {
    const { expanded, allow_close_all, group } = context
    return !group || (group && !expanded) || allow_close_all
  }

  const extendedProps = extendPropsWithContext(
    props,
    accordionHeaderDefaultProps,
    context as Record<string, unknown>
  )

  const {
    id,

    // 1. these props should be the same as ...
    left_component,
    expanded, // eslint-disable-line
    title,
    description,
    element,
    heading,
    heading_level,
    icon,
    icon_size,
    disabled,
    skeleton,
    no_animation,
    variant,
  } = extendedProps

  let { icon_position } = extendedProps

  const {
    children,
    className,

    // 2. ... these
    left_component: _left_component, // eslint-disable-line
    expanded: _expanded, // eslint-disable-line
    title: _title, // eslint-disable-line
    description: _description, // eslint-disable-line
    icon: _icon, // eslint-disable-line
    icon_size: _icon_size, // eslint-disable-line
    disabled: _disabled, // eslint-disable-line

    ...rest
  } = props

  const defaultParts = [
    <AccordionHeaderIcon
      key="icon"
      icon={icon}
      size={icon_size}
      expanded={context.expanded}
      icon_position={icon_position}
    />,
    <AccordionHeaderContainer key="container">
      {left_component as React.ReactNode}
    </AccordionHeaderContainer>,
    <AccordionHeaderTitle key="title">
      {title ||
        (Array.isArray(children)
          ? children.filter((cur) => !React.isValidElement(cur))
          : children)}
    </AccordionHeaderTitle>,
    <AccordionHeaderDescription key="description">
      {description as React.ReactNode}
    </AccordionHeaderDescription>,
  ]

  if (Array.isArray(children)) {
    const removeParts = []
    children.forEach((cur) => {
      if (React.isValidElement(cur)) {
        const part = defaultParts.find((c) => c.type === cur.type)
        if (part) {
          removeParts.push(part)
        }

        // if (cur.type === AccordionHeaderTitle) {
        //   defaultParts.unshift(cur)
        // } else {
        //   defaultParts.push(cur)
        // }

        defaultParts.push(cur)
      }
    })
    removeParts.forEach((part) => {
      const index = defaultParts.findIndex((c) => c === part)
      if (index > -1) {
        defaultParts.splice(index, 1)
      }
    })
  }

  const partsToRender = []
  const wrapperParts = []
  const wrapperComp = (
    <span className="dnb-accordion__header__wrapper" key="wrapper">
      {wrapperParts}
    </span>
  )

  defaultParts.forEach((part) => {
    if (
      React.isValidElement(part) &&
      (part.type === AccordionHeaderTitle ||
        part.type === AccordionHeaderDescription)
    ) {
      wrapperParts.push(part)
      if (partsToRender.findIndex((c) => c === wrapperComp) === -1) {
        partsToRender.push(wrapperComp)
      }
    } else {
      partsToRender.push(part)
    }
  })

  // position the icon to the right, if the element is not in the beginning
  if (icon_position === undefined) {
    const iconIndex = partsToRender.findIndex(
      (c) => c.type === AccordionHeaderIcon
    )
    // because of the container at the beginning, we use 1
    if (iconIndex > 1) {
      icon_position = 'right'
    }

    if (left_component) {
      icon_position = 'right'
    }
  }

  const headerParams = {
    id: `${id}-header`,
    'aria-controls': `${id}-content`,
    'aria-expanded': context.expanded,
    role: 'button',
    tabIndex: 0,
    className: classnames(
      'dnb-accordion__header',
      variant && `dnb-accordion__header--${variant}`,
      context.expanded && 'dnb-accordion__header--expanded',
      icon_position && `dnb-accordion__header--icon-${icon_position}`,
      isHovering &&
        hasClicked &&
        context.expanded &&
        'dnb-accordion__header--after-click',
      !canClick() && 'dnb-accordion__header--prevent-click',
      description && 'dnb-accordion__header--description',
      no_animation && 'dnb-accordion__header--no-animation',
      createSkeletonClass('font', skeleton, context),
      createSpacingClasses(rest),
      className
    ),
    disabled,
    ...rest,
  } satisfies HTMLProps<HTMLElement>

  if (disabled || skeleton) {
    headerParams.tabIndex = -1
    headerParams.disabled = true
    headerParams['aria-disabled'] = true
  } else {
    headerParams.onClick = onClickHandler
    headerParams.onKeyDown = onKeyDownHandler
    headerParams.onMouseOver = onMouseOverHandler
    headerParams.onMouseOut = onMouseOutHandler
  }

  skeletonDOMAttributes(headerParams, skeleton, context)

  validateDOMAttributes(props, headerParams)

  let Element = 'div'

  // (String(heading) === 'true' || String(heading) === '1') extracted from isTrue function
  if (heading && (String(heading) === 'true' || String(heading) === '1')) {
    headerParams.role = 'heading'
    headerParams['aria-level'] = heading_level ? Number(heading_level) : 2
  } else if (heading) {
    headerParams.role = null
    Element = heading as string
  } else if (element) {
    headerParams.role = null
    Element = element as string
  }

  return <Element {...headerParams}>{partsToRender}</Element>
}

AccordionHeader.Container = AccordionHeaderContainer
AccordionHeader.Icon = AccordionHeaderIcon
AccordionHeader.Title = AccordionHeaderTitle
AccordionHeader.Description = AccordionHeaderDescription

AccordionHeader._supportsSpacingProps = true

export default AccordionHeader
