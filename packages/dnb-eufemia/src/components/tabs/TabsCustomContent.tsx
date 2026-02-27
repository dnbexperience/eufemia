import React from 'react'
import clsx from 'clsx'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../space/types'
import ContentWrapper, {
  type ContentWrapperProps,
} from './TabsContentWrapper'

export type CustomContentTitle =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)

export type CustomContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any)

export interface CustomContentProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'title' | 'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'
    >,
    SpacingProps {
  displayName?: string
  title?: CustomContentTitle
  hash?: string
  selected?: boolean
  disabled?: boolean
  id?: string
  key?: string | number
  children?: CustomContentChildren
  className?: string
}

// This component is only a dummy component to collect data
/**
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
function CustomContent(props: CustomContentProps) {
  const {
    displayName = 'CustomContent', // eslint-disable-line
    title = null, // eslint-disable-line
    hash = null, // eslint-disable-line
    selected = null, // eslint-disable-line
    disabled = null, // eslint-disable-line
    className = null,
    children = null,
    id,
    ...rest
  } = props

  if (id) {
    const contentWrapperProps = rest as unknown as Omit<
      ContentWrapperProps,
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
