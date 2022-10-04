import React from 'react'
import classnames from 'classnames'

// Components
import Button, { ButtonProps } from '../button/Button'
import IconPrimary, { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import Img, { ImgProps } from '../../elements/Img'
import Div from '../../elements/Div'
import H3 from '../../elements/H3'
import P from '../../elements/P'

// Icons
import { lightbulb_medium as LightbulbIcon } from '../../icons'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { SkeletonShow } from '../skeleton/Skeleton'
import Context from '../../shared/Context'
import { SpacingProps } from '../../shared/types'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface InfoCardProps {
  /**
   * Used in combination with `src` to provide an alt attribute for the `img` element.
   * Default: null
   */
  alt?: React.ReactNode
  /**
   * Aligns the content to center, rather than left
   * Default: false
   */
  centered?: boolean
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
  skeleton?: SkeletonShow
  /**
   * Specifies the path to the image
   * Default: null
   */
  src?: string
  /**
   * Image src, will replace the 'icon' with the image
   * Default: null
   */
  text: React.ReactNode
  /**
   * Component title
   * Default: null
   */
  title?: React.ReactNode
  /**
   * Is called when the close button is clicked
   * Default: null
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The text of the close button.
   * Default: null
   */
  closeButtonText?: React.ReactNode
  /**
   * Is called when the accept button is clicked
   * Default: null
   */
  onAccept?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The text of the accept button.
   * Default: null
   */
  acceptButtonText?: React.ReactNode
  /**
   * Additional attributes for the close button.
   * Default: null
   */
  closeButtonAttributes?: ButtonProps
  /**
   * Additional attributes for the accept button
   * Default: null
   */
  acceptButtonAttributes?: ButtonProps
}

export const defaultProps = {
  centered: false,
  skeleton: false,
  icon: LightbulbIcon,
}

const InfoCard = (localProps: InfoCardProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    alt,
    centered,
    title,
    skeleton,
    className,
    icon,
    src,
    imgProps,
    text,
    onClose,
    onAccept,
    closeButtonText,
    acceptButtonText,
    closeButtonAttributes,
    acceptButtonAttributes,
    ...props
  } = extendPropsWithContext(localProps, defaultProps, {
    skeleton: context?.skeleton,
  })

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const closeButtonIsHidden = !onClose && !closeButtonText
  const acceptButtonIsHidden = !onAccept && !acceptButtonText

  return (
    <Div
      className={classnames(
        'dnb-info-card',
        skeletonClasses,
        spacingClasses,
        centered && 'dnb-info-card--centered',
        className
      )}
      data-testid="info-card"
      {...props}
    >
      <Div right={!centered && 'small'} bottom={centered && 'small'}>
        {getIllustration()}
      </Div>

      <div
        className="dnb-info-card--content"
        data-testid="info-card-content"
      >
        {title && (
          <H3
            size="small"
            data-testid="info-card-title"
            bottom="x-small"
            top="0"
          >
            {title}
          </H3>
        )}
        <P size="small" data-testid="info-card-text" bottom="0">
          {text}
        </P>

        {getButtons()}
      </div>
    </Div>
  )

  function getButtons() {
    if (closeButtonIsHidden && acceptButtonIsHidden) return null

    return (
      <Div
        className={classnames(
          'dnb-info-card--buttons',
          centered && 'dnb-info-card--buttons-centered'
        )}
      >
        {!acceptButtonIsHidden && (
          <Button
            top={centered ? 'medium' : 'small'}
            type="button"
            data-testid="info-card-accept-button"
            variant="secondary"
            right={!centered && 'small'}
            on_click={onAccept}
            text={acceptButtonText}
            {...acceptButtonAttributes}
          />
        )}
        {!closeButtonIsHidden && (
          <Button
            type="button"
            data-testid="info-card-close-button"
            variant="tertiary"
            top="small"
            on_click={onClose}
            icon="close"
            icon_position="left"
            text={closeButtonText}
            {...closeButtonAttributes}
          />
        )}
      </Div>
    )
  }

  function getIllustration() {
    if (src || imgProps) {
      const imageProps = { src, alt, ...imgProps }
      return (
        <Img
          data-testid="info-card-image"
          className="dnb-info-card--image"
          {...imageProps}
        />
      )
    }
    return (
      <IconPrimary
        size="medium"
        className="dnb-info-card--icon"
        icon={icon}
        data-testid="info-card-icon"
      />
    )
  }
}

export default InfoCard
