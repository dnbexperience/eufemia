/**
 * HTML Element
 *
 */

import { useState } from 'react'
import type { HTMLProps } from 'react'
import E from '../Element'
import {
  applySpacing,
  removeSpaceProps,
} from '../../components/space/SpacingUtils'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../../components/skeleton/Skeleton'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ImgProps = SpacingProps &
  HTMLProps<HTMLImageElement> & {
    src: string
    alt: string
    skeleton?: SkeletonShow
    imgClass?: string
    element?: DynamicElement & 'figure'
    caption?: string
    loading?: 'eager' | 'lazy'
  }

const Img = ({
  caption,
  alt,
  element = 'figure',
  skeleton,
  imgClass,
  className,
  loading = 'eager',
  ...p
}: ImgProps) => {
  const [hasError, setError] = useState(false)

  return (
    <E
      as={element}
      internalClass="dnb-img"
      {...applySpacing(p, { className }, p.is)}
      skeleton={skeleton}
      skeletonMethod="shape"
    >
      <E
        as="img"
        loading={loading}
        alt={alt}
        internalClass={clsx('dnb-img', hasError && 'dnb-img--error')}
        className={imgClass}
        skeleton={skeleton}
        onError={() => setError(true)}
        {...removeSpaceProps(p as Omit<ImgProps, 'ref'>)}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </E>
  )
}

withComponentMarkers(Img, { _supportsSpacingProps: true })

export default Img
