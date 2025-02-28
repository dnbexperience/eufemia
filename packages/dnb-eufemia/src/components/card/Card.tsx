import React, { useContext } from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import { SectionParams, SectionProps } from '../section/Section'
import { combineLabelledBy } from '../../shared/component-helper'
import CardContext from './CardContext'
import Space from '../Space'
import useId from '../../shared/helpers/useId'

import type { BasicProps as FlexContainerProps } from '../flex/Container'
import type { BasicProps as FlexItemProps } from '../flex/Item'
import type { SpaceTypeMedia } from '../../shared/types'
import type { SpaceProps } from '../Space'

export type Props = {
  /**
   * Define a title that appears on top of the Card
   */
  title?: React.ReactNode

  /**
   * Define if the Card should behave responsive. Defaults to `true`
   */
  responsive?: boolean

  /**
   * Define if the Card should get the same background color as the outline border
   */
  filled?: boolean
} & FlexContainerProps &
  Pick<SectionProps, 'outset'> &
  FlexItemProps & {
    stack?: boolean
  } & SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'size' | 'title'>

function Card(props: Props) {
  const nestedContext = useContext(CardContext)

  const {
    className,
    stack,
    direction,
    gap,
    spacing,
    innerSpace,
    alignSelf = 'stretch',
    align,
    divider = 'space',
    rowGap,
    responsive = !nestedContext?.isNested,
    filled,
    outset,
    title,
    children,
    ...rest
  } = props

  const titleId = useId()
  const falseWhenSmall = { small: false, medium: true, large: true }
  const trueWhenSmall = { small: true, medium: false, large: false }
  const basisSpace = {
    top: 'medium',
    right: 'medium',
    bottom: 'large',
    left: 'medium',
  }
  const smallSpace = responsive
    ? {
        ...basisSpace,
        right: 0,
        left: 0,
      }
    : basisSpace

  const params = SectionParams({
    className: classnames(
      'dnb-card',
      className,
      responsive && 'dnb-card--responsive',
      filled && 'dnb-card--filled'
    ),
    breakout: responsive ? trueWhenSmall : false,
    outset: nestedContext?.isNested
      ? false
      : outset === true
      ? falseWhenSmall
      : outset,
    roundedCorner: responsive ? falseWhenSmall : true,
    outline: '--outline-card-color',
    innerSpace:
      innerSpace ??
      ({
        small: smallSpace,
        medium: basisSpace,
        large: basisSpace,
      } as SpaceTypeMedia),
    ...(rest as SectionProps),
    'aria-labelledby': combineLabelledBy(rest, title && titleId),
  })

  return (
    <Flex.Item alignSelf={alignSelf} element="section" {...params}>
      <CardContext.Provider value={{ isNested: true }}>
        <Flex.Container
          direction={direction ?? 'vertical'}
          divider={divider}
          alignSelf={alignSelf}
          align={stack ? 'stretch' : align}
          wrap={!stack}
          gap={gap ?? spacing ?? (stack ? 'medium' : false)}
          rowGap={rowGap}
        >
          {title && (
            <Space id={titleId} className="dnb-card__title">
              {title}
            </Space>
          )}
          {children}
        </Flex.Container>
      </CardContext.Provider>
    </Flex.Item>
  )
}

Card._supportsSpacingProps = true

export default Card
