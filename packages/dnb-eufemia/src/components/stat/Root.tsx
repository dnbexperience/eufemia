import React from 'react'
import clsx from 'clsx'
import toChildArray from '../../shared/helpers/toChildArray'
import Space from '../space/Space'
import type { SpacingProps } from '../../shared/types'
import { warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'

type RootOwnProps = {
  visualOrder?: 'label-content' | 'content-label'
  skeleton?: SkeletonShow
}

export type RootProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof RootOwnProps | 'ref'
> &
  RootOwnProps &
  SpacingProps

function Root(props: RootProps) {
  const {
    children,
    id = null,
    className = null,
    style = null,
    visualOrder = 'label-content',
    skeleton = null,
    ...rest
  } = props

  if (!hasOnlySupportedChildren(children)) {
    warn('Stat.Root should only contain Stat.Label and Stat.Content.')
  }
  const hasLabel = hasRequiredLabel(children)
  if (!hasLabel) {
    warn('Stat.Root should contain a Stat.Label.')
  }
  if (hasLabel && !hasValidLabelContentOrder(children)) {
    warn(
      'Stat.Root: every Stat.Content should be preceded by a Stat.Label for valid dt/dd pairing.'
    )
  }

  return (
    <StatRootContext value={{ inRoot: true, skeleton }}>
      <Space
        element="dl"
        id={id}
        style={style}
        className={clsx(
          'dnb-stat',
          'dnb-stat__root',
          `dnb-stat__root--${visualOrder}`,
          className
        )}
        {...rest}
      >
        {children}
      </Space>
    </StatRootContext>
  )
}

Root._supportsSpacingProps = true

export default Root

function hasOnlySupportedChildren(children: React.ReactNode): boolean {
  return toChildArray(children).every((child) => isSupportedChild(child))
}

function isSupportedChild(child: React.ReactNode): boolean {
  if (!React.isValidElement<Record<string, any>>(child)) {
    // allow null/boolean and whitespace-only text nodes
    if (typeof child === 'string') {
      return child.trim().length === 0
    }
    return true
  }

  if (child.type === React.Fragment) {
    return hasOnlySupportedChildren(
      (child as React.ReactElement<any>).props.children
    )
  }

  const role = (child.type as { _statRole?: string })?._statRole
  return role === 'label' || role === 'content'
}

function hasRequiredLabel(children: React.ReactNode): boolean {
  return toChildArray(children).some((child) => hasLabelChild(child))
}

function hasLabelChild(child: React.ReactNode): boolean {
  if (!React.isValidElement<Record<string, any>>(child)) {
    return false
  }

  if (child.type === React.Fragment) {
    return hasRequiredLabel(
      (child as React.ReactElement<any>).props.children
    )
  }

  const role = (child.type as { _statRole?: string })?._statRole
  return role === 'label'
}

function flattenRoles(
  children: React.ReactNode
): Array<'label' | 'content'> {
  const roles: Array<'label' | 'content'> = []

  for (const child of toChildArray(children)) {
    if (!React.isValidElement<Record<string, any>>(child)) {
      continue
    }

    if (child.type === React.Fragment) {
      roles.push(
        ...flattenRoles((child as React.ReactElement<any>).props.children)
      )
      continue
    }

    const role = (child.type as { _statRole?: string })?._statRole
    if (role === 'label' || role === 'content') {
      roles.push(role)
    }
  }

  return roles
}

function hasValidLabelContentOrder(children: React.ReactNode): boolean {
  const roles = flattenRoles(children)
  let hasSeenLabel = false

  for (const role of roles) {
    if (role === 'label') {
      hasSeenLabel = true
    } else if (role === 'content') {
      if (!hasSeenLabel) {
        return false
      }
    }
  }

  return true
}
