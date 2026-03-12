import React from 'react'
import classnames from 'classnames'
import Space from '../space/Space'
import type { SpacingProps } from '../../shared/types'
import { warn } from '../../shared/component-helper'
import StatRootContext from './StatRootContext'

export type RootProps = {
  children?: React.ReactNode
  className?: string
  innerRef?: React.RefObject<HTMLElement>
  visualOrder?: 'label-content' | 'content-label'
} & SpacingProps

function Root(props: RootProps) {
  const {
    children,
    className = null,
    innerRef,
    visualOrder = 'label-content',
    ...rest
  } = props

  if (!hasOnlySupportedChildren(children)) {
    warn('Stat.Root should only contain Stat.Label and Stat.Content.')
  }
  if (!hasRequiredLabel(children)) {
    warn('Stat.Root should contain a Stat.Label.')
  }

  return (
    <StatRootContext.Provider value={{ inRoot: true }}>
      <Space
        element="dl"
        innerRef={innerRef}
        className={classnames(
          'dnb-stat',
          'dnb-stat__root',
          `dnb-stat__root--${visualOrder}`,
          className
        )}
        {...rest}
      >
        {children}
      </Space>
    </StatRootContext.Provider>
  )
}

Root._supportsSpacingProps = true

export default Root

function hasOnlySupportedChildren(children: React.ReactNode): boolean {
  return React.Children.toArray(children).every((child) =>
    isSupportedChild(child)
  )
}

function isSupportedChild(child: React.ReactNode): boolean {
  if (!React.isValidElement(child)) {
    // allow null/boolean and whitespace-only text nodes
    if (typeof child === 'string') {
      return child.trim().length === 0
    }
    return true
  }

  if (child.type === React.Fragment) {
    return hasOnlySupportedChildren(child.props.children)
  }

  const role = (child.type as { _statRole?: string })?._statRole
  return role === 'label' || role === 'content'
}

function hasRequiredLabel(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some((child) =>
    hasLabelChild(child)
  )
}

function hasLabelChild(child: React.ReactNode): boolean {
  if (!React.isValidElement(child)) {
    return false
  }

  if (child.type === React.Fragment) {
    return hasRequiredLabel(child.props.children)
  }

  const role = (child.type as { _statRole?: string })?._statRole
  return role === 'label'
}
