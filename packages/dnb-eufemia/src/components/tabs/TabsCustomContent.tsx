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
export default class CustomContent extends React.PureComponent<CustomContentProps> {
  static defaultProps = {
    displayName: 'CustomContent',
    title: null,
    hash: null,
    selected: null,
    disabled: null,
    children: null,
    className: null,
  }
  render() {
    const {
      displayName, // eslint-disable-line
      title, // eslint-disable-line
      hash, // eslint-disable-line
      selected, // eslint-disable-line
      disabled, // eslint-disable-line
      className,
      ...rest
    } = this.props

    if (this.props.id) {
      return <ContentWrapper {...rest} />
    }

    return (
      <div
        className={clsx(
          'dnb-tabs__content__inner',
          createSpacingClasses(rest),
          className
        )}
      >
        {this.props.children}
      </div>
    )
  }
}
