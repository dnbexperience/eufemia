import React from 'react'
import clsx from 'clsx'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../space/types'
import ContentWrapper, {
  type TabsContentWrapperProps,
} from './TabsContentWrapper'

export type CustomContentTitle =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)

export type CustomContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any)

export type TabsCustomContentProps = {
  displayName?: string
  title?: CustomContentTitle
  hash?: string
  selected?: boolean
  disabled?: boolean
  id?: string
  key?: string | number
  children?: CustomContentChildren
  className?: string
} & Omit<
  React.HTMLProps<HTMLElement>,
  'title' | 'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'
> &
  SpacingProps

// This component is only a dummy component to collect data
/**
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
function CustomContent(props: TabsCustomContentProps) {
  const {
    displayName: _displayName = 'CustomContent',
    title: _title = null,
    hash: _hash = null,
    selected: _selected = null,
    disabled: _disabled = null,
    className = null,
    children = null,
    id,
    ...rest
  } = props

  if (id) {
    const contentWrapperProps = rest as unknown as Omit<
      TabsContentWrapperProps,
      'id'
    >
    return (
      <ContentWrapper {...contentWrapperProps} id={id}>
        {children as React.ReactNode}
      </ContentWrapper>
    )
  }

  return (
    <div
      className={clsx(
        'dnb-tabs__content__inner',
        createSpacingClasses(rest),
        className
      )}
    >
      {children as React.ReactNode}
    </div>
  )
}

export default CustomContent
