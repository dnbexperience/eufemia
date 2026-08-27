/**
 * HTML Element
 *
 */

import { useState } from 'react'
import type { HTMLProps, SyntheticEvent } from 'react'
import E from '../Element'
import {
  useSpacing,
  removeSpaceProps,
} from '../../components/space/SpacingUtils'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../../components/skeleton/Skeleton'
import { clsx } from 'clsx'
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
  onError,
  ...p
}: ImgProps) => {
  const [hasError, setError] = useState(false)

  return (
    <E
      as={element}
      internalClass="dnb-img"
      {...useSpacing(p, { className }, p.is)}
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
        onError={(event) => {
          setError(true)
          onError?.(event as SyntheticEvent<HTMLImageElement>)
        }}
        {...removeSpaceProps(p as Omit<ImgProps, 'ref'>)}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </E>
  )
}

withComponentMarkers(Img, { _supportsSpacingProps: true })

export default Img
