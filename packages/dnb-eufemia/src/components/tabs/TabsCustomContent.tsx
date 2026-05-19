import type { HTMLProps, ReactNode } from 'react'
import clsx from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import ContentWrapper, {
  type TabsContentWrapperProps,
} from './TabsContentWrapper'

export type TabsCustomContentTitle =
  | Record<string, unknown>
  | ReactNode
  | (() => ReactNode)

export type TabsCustomContentChildren =
  | ReactNode
  | ((...args: any[]) => ReactNode)

export type TabsCustomContentProps = {
  displayName?: string
  title?: TabsCustomContentTitle
  hash?: string
  selected?: boolean
  disabled?: boolean
  id?: string
  key?: string | number
  children?: TabsCustomContentChildren
  className?: string
} & Omit<
  HTMLProps<HTMLElement>,
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

  const spacingProps = useSpacing(rest, {
    className: clsx('dnb-tabs__content__inner', className),
  })

  if (id) {
    const contentWrapperProps = rest as unknown as Omit<
      TabsContentWrapperProps,
      'id'
    >
    return (
      <ContentWrapper {...contentWrapperProps} id={id}>
        {children as ReactNode}
      </ContentWrapper>
    )
  }

  return <div {...spacingProps}>{children as ReactNode}</div>
}

export default CustomContent
