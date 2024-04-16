import React from 'react'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingHelper'
import ContentWrapper from './TabsContentWrapper'
import { CustomContentProps } from './types'

// This component is only a internal dummy component to collect data
/**
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
export default function CustomContent(props: CustomContentProps) {
  const {
    title, // eslint-disable-line
    hash, // eslint-disable-line
    selected, // eslint-disable-line
    disabled, // eslint-disable-line
    className,
    ...rest
  } = props

  if (props.id) {
    return <ContentWrapper {...rest} />
  }

  return (
    <div
      className={classnames(
        'dnb-tabs__content__inner',
        createSpacingClasses(rest),
        className
      )}
    >
      {props.children}
    </div>
  )
}
