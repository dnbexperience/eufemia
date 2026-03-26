import React from 'react'
import classnames from 'classnames'
import type { SpacingProps } from '../../shared/types'
import { convertJsxToString, warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { useTranslation } from '../../shared'
import { clamp } from '../../shared/helpers/clamp'
import { TextInternal as Text } from './Text'

const MAX_ALLOWED = 20

type RatingOwnProps = {
  value?: number
  max?: number
  variant?: 'stars' | 'progressive'
  element?: keyof JSX.IntrinsicElements
  srLabel?: React.ReactNode
  skeleton?: SkeletonShow
}

export type RatingProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof RatingOwnProps | 'ref'
> &
  RatingOwnProps &
  SpacingProps

function Rating(props: RatingProps) {
  const {
    value = 0,
    max = null,
    id = null,
    variant = 'stars',
    element: Element = 'span',
    className = null,
    style = null,
    srLabel = null,
    skeleton = null,
    ...rest
  } = props

  const defaultMax = variant === 'progressive' ? 7 : 5
  const resolvedMax =
    Number.isFinite(max) && max > 0 ? Math.floor(max) : defaultMax

  if (resolvedMax > MAX_ALLOWED) {
    warn(
      `Stat.Rating: max=${resolvedMax} exceeds the supported limit of ${MAX_ALLOWED}. The value will be clamped.`
    )
  }

  const clampedMax = Math.min(resolvedMax, MAX_ALLOWED)
  const safeValue = Number.isFinite(value) ? value : 0
  const normalizedValue = clamp(safeValue, 0, clampedMax)
  const labelValue = Number.isInteger(normalizedValue)
    ? String(normalizedValue)
    : String(parseFloat(normalizedValue.toFixed(2)))
  const { Stat: { rating: ratingTemplate = '%value of %max' } = {} } =
    useTranslation()
  const localizedRating = ratingTemplate
    .replace('%value', labelValue)
    .replace('%max', String(clampedMax))
  const label = srLabel
    ? `${convertJsxToString(srLabel)} ${localizedRating}`
    : localizedRating

  return (
    <Text
      {...rest}
      id={id}
      element={Element}
      className={classnames(
        'dnb-stat',
        'dnb-stat__rating',
        `dnb-stat__rating--${variant}`,
        className
      )}
      style={style}
      role="img"
      aria-label={label}
      skeleton={skeleton}
      skeletonMethod="shape"
      textClassName={false}
    >
      {variant === 'stars' ? (
        <span className="dnb-stat__rating-stars" aria-hidden>
          {Array.from({ length: clampedMax }).map((_, index) => {
            const fill = clamp(normalizedValue - index, 0, 1)

            return (
              <span
                key={index}
                className="dnb-stat__rating-star"
                style={
                  {
                    '--dnb-stat-rating-fill': `${fill * 100}%`,
                  } as React.CSSProperties
                }
                data-fill={fill.toFixed(2)}
              >
                <StarIcon variant="base" />
                <span className="dnb-stat__rating-fill">
                  <StarIcon variant="active" />
                </span>
              </span>
            )
          })}
        </span>
      ) : (
        <span className="dnb-stat__rating-progressive" aria-hidden>
          {Array.from({ length: clampedMax }).map((_, index) => {
            const fill = clamp(normalizedValue - index, 0, 1)
            const stepHeight =
              clampedMax > 1 ? 0.25 + (index / (clampedMax - 1)) * 0.75 : 1

            return (
              <span
                key={index}
                className="dnb-stat__rating-progressive-step dnb-stat__rating-progressive-step--base"
                style={
                  {
                    '--dnb-stat-rating-step-fill': `${fill * 100}%`,
                    '--dnb-stat-rating-step-height': `${stepHeight}rem`,
                  } as React.CSSProperties
                }
                data-fill={fill.toFixed(2)}
              />
            )
          })}
        </span>
      )}
    </Text>
  )
}

const STAR_PATH =
  'M5.9996 0L7.8546 3.95006L12 4.58343L9.0006 7.65834L9.708 12L5.9996 9.95006L2.2928 12L3.0002 7.65834L0 4.58343L4.1462 3.95006L5.9996 0Z'

function StarIcon({ variant }: { variant: 'base' | 'active' }) {
  return (
    <svg
      className={classnames(
        'dnb-stat__rating-icon',
        `dnb-stat__rating-icon--${variant}`
      )}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={STAR_PATH} />
    </svg>
  )
}

Rating._supportsSpacingProps = true

export default Rating
