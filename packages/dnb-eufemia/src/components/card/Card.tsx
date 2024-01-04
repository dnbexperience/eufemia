import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import { SectionParams } from '../section/Section'

import type { Props as FlexContainerProps } from '../flex/Container'
import type { Props as FlexItemProps } from '../flex/Item'
import type { SpaceTypeMedia } from '../../shared/types'

export type Props = Omit<
  FlexContainerProps & FlexItemProps,
  'ref' | 'wrap'
> & {
  stack?: boolean
}
function Card(props: Props) {
  const {
    className,
    stack,
    direction,
    spacing,
    innerSpace,
    alignSelf = 'stretch',
    divider = 'space',
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
    backgroundColor: 'white',
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
    children,
    ...rest,
  })

  if (stack || direction || spacing) {
    return (
      <Flex.Container
        direction={direction ?? 'vertical'}
        divider={divider}
        wrap={false}
        spacing={spacing}
        alignSelf={alignSelf}
        element="section"
        {...params}
      />
    )
  }

  return <Flex.Item alignSelf={alignSelf} element="section" {...params} />
}

Card._supportsSpacingProps = true

export default Card
