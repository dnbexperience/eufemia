import React from 'react'
import clsx from 'clsx'
import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type Props = FlexContainerAllProps

function Stack(props: Props) {
  const {
    className,
    direction = 'vertical',
    alignSelf = 'stretch',
    align = 'stretch',
    gap = props.divider !== 'line' && props.divider !== 'line-framed'
      ? 'medium'
      : 'small',
    children,
    ...rest
  } = props

  return (
    <Container
      element="section"
      className={clsx('dnb-flex-stack', className)}
      direction={direction}
      alignSelf={alignSelf}
      align={align}
      gap={gap}
      {...rest}
    >
      {children}
    </Container>
  )
}

withComponentMarkers(Stack, { _supportsSpacingProps: true })

export default Stack
