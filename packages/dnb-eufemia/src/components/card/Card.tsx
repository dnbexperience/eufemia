import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import { SectionParams, SectionProps } from '../section/Section'

import type { BasicProps as FlexContainerProps } from '../flex/Container'
import type { BasicProps as FlexItemProps } from '../flex/Item'
import type { SpaceTypeMedia } from '../../shared/types'
import { SpaceProps } from '../Space'

export type Props = FlexContainerProps &
  FlexItemProps & {
    stack?: boolean
  } & SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'size'>

function Card(props: Props) {
  const {
    className,
    stack,
    direction,
    spacing,
    innerSpace,
    alignSelf = 'stretch',
    divider = 'space',
    rowGap,
    children,
    ...rest
  } = props

  const falseWhenSmall = { small: false, medium: true, large: true }
  const trueWhenSmall = { small: true, medium: false, large: false }
  const basisSpace = {
    top: 'medium',
    right: 'medium',
    bottom: 'large',
    left: 'medium',
  }
  const smallSpace = {
    ...basisSpace,
    right: 0,
    left: 0,
  }

  const params = SectionParams({
    className: classnames('dnb-card', className),
    breakout: trueWhenSmall,
    roundedCorner: falseWhenSmall,
    outline: true,
    innerSpace:
      innerSpace ??
      ({
        small: smallSpace,
        medium: basisSpace,
        large: basisSpace,
      } as SpaceTypeMedia),
    ...(rest as SectionProps),
  })

  return (
    <Flex.Item alignSelf={alignSelf} element="section" {...params}>
      <Flex.Container
        direction={direction ?? 'vertical'}
        divider={divider}
        alignSelf={alignSelf}
        wrap={!stack}
        spacing={stack ? 'small' : spacing || false}
        rowGap={rowGap || false}
      >
        {children}
      </Flex.Container>
    </Flex.Item>
  )
}

Card._supportsSpacingProps = true

export default Card
