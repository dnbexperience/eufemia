/**
 * HTML Element
 *
 */

import React from 'react'
import E from '../Element'
import {
  createSpacingClasses,
  removeSpaceProps,
} from '../../components/space/SpacingHelper'
import { SpacingProps } from '../../components/space/types'
import { SkeletonShow } from '../../components/skeleton/Skeleton'
import classnames from 'classnames'
import type { DynamicElement } from '../../shared/types'

export type ImgProps = SpacingProps &
  React.HTMLProps<HTMLImageElement> & {
    src: string
    alt: string
    skeleton?: SkeletonShow
    imgClass?: string
    element?: DynamicElement & 'figure'
    caption?: string
  }

const Img = ({
  caption,
  alt,
  element = 'figure',
  skeleton,
  imgClass,
  className,
  ...p
}: ImgProps) => {
  const [hasError, setError] = React.useState(false)

  return (
    <E
      as={element}
      internalClass="dnb-img"
      className={classnames(className, createSpacingClasses(p, p.is))}
      skeleton={skeleton}
      skeletonMethod="shape"
    >
      <E
        as="img"
        alt={alt}
        internalClass={classnames('dnb-img', hasError && 'dnb-img--error')}
        className={imgClass}
        skeleton={skeleton}
        onError={() => setError(true)}
        {...removeSpaceProps(p as Omit<ImgProps, 'ref'>)}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </E>
  )
}

Img._supportsSpacingProps = true

export default Img
