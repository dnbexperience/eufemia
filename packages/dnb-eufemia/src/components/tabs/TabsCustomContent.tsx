// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import clsx from 'clsx'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SpacingProps } from '../space/types'
import ContentWrapper from './TabsContentWrapper'

export type CustomContentTitle =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)

export type CustomContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any)

export interface CustomContentProps
  extends Omit<React.HTMLProps<HTMLElement>, 'title' | 'children'>,
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
const CustomContent: React.FC<CustomContentProps> = (props) => {
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
    return <ContentWrapper {...rest} id={id} children={children} />
  }

  return (
    <div
      className={clsx(
        'dnb-tabs__content__inner',
        createSpacingClasses(rest),
        className
      )}
    >
      {children}
    </div>
  )
}

export default CustomContent
