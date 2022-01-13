import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
// Elements

import { lightbulb } from '../../icons'
// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'
import IconPrimary, { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import Img, { ImgProps } from '../../elements/Img'
import { Div, H3, P, Span } from '../../elements'
export interface InfoCardProps {
  /**
   * Aligns the content to center, rather than left
   * Default: false
   */
  center?: boolean
  /**
   * The content of the component. Can be used instead of prop "text".
   * Default: null
   */
  children?: React.ReactNode
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
  /**
   * Replace the default icon with custom icon.
   * Default: Lightbulb (icon)
   */
  icon?: IconPrimaryIcon
  /**
   * Props applied to the `img` element if the component is used to display an image. Replace the 'icon'
   * Default: null
   */
  imgProps?: ImgProps
  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes
  /**
   * Specifies the path to the image
   * Default: null
   */
  src?: string
  /**
   * Image src, will replace the 'icon' with the image
   * Default: ''
   */
  text?: string | React.ReactNode
  /**
   * Component title
   *  Default: ''
   */
  title?: string
}

export const defaultProps = {
  center: false,
  children: null,
  className: null,
  skeleton: false,
  icon: lightbulb,
  imgProps: null,
  src: '',
  text: '',
  title: '',
}

function InfoCard(localProps: InfoCardProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    center,
    title,
    skeleton,
    className,
    icon,
    src,
    imgProps,
    children: childrenProp,
    text,
    ...props
  } = extendPropsWithContext({
    ...defaultProps,
    ...localProps,
  })

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  return (
    <Div
      className={classnames(
        'dnb-info-card',
        skeletonClasses,
        spacingClasses,
        center ? 'dnb-info-card-center' : '',
        className
      )}
      data-testid="info-card"
      {...props}
    >
      <Div right={center ? '0' : 'small'} bottom={center ? 'small' : '0'}>
        {getIllustration()}
      </Div>

      <div
        className="dnb-info-card-content"
        data-testid="info-card-content"
      >
        {title != '' && (
          <H3
            size="small"
            data-testid="info-card-title"
            bottom="x-small"
            top="0"
          >
            {title}
          </H3>
        )}
        {getChildren()}
      </div>
    </Div>
  )

  function getIllustration() {
    if (src || imgProps) {
      const imageProps = { src, ...imgProps }
      return (
        <Img
          data-testid="info-card-image"
          className="dnb-info-card-image"
          {...imageProps}
        />
      )
    }
    return (
      <IconPrimary
        className="dnb-info-card-icon"
        icon={icon}
        data-testid="info-card-icon"
      />
    )
  }

  function getChildren() {
    if (text != '') {
      return (
        <P size="small" data-testid="info-card-text">
          {text}
        </P>
      )
    }
    return childrenProp
  }
}

export default InfoCard
