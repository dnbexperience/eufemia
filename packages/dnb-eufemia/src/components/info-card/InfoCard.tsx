import React from 'react'
import classnames from 'classnames'

// Components
import Button, { ButtonProps } from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import Img, { ImgProps } from '../../elements/img/Img'
import Space from '../space/Space'
import P from '../../elements/P'

// Icons
import { lightbulb_medium as LightbulbIcon } from '../../icons'

// Shared
import { createSpacingClasses } from '../space/SpacingHelper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import type { SpacingProps } from '../../shared/types'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'

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
   * Replace the default icon with custom icon.
   * Default: Lightbulb (icon)
   */
  icon?: IconIcon
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

export type InfoCardAllProps = InfoCardProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> &
  SpacingProps

export const defaultProps = {
  centered: false,
  skeleton: false,
  icon: LightbulbIcon,
}

const InfoCard = (localProps: InfoCardAllProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  const allProps = extendPropsWithContext(localProps, defaultProps, {
    skeleton: context?.skeleton,
  })

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
  } = allProps

  const spacingClasses = createSpacingClasses(props)

  const closeButtonIsHidden = !onClose && !closeButtonText
  const acceptButtonIsHidden = !onAccept && !acceptButtonText

  validateDOMAttributes(allProps, props)

  return (
    <div
      className={classnames(
        'dnb-info-card',
        centered && 'dnb-info-card--centered',
        spacingClasses,
        className
      )}
      {...props}
    >
      <Provider skeleton={skeleton}>
        <Space
          right={!centered ? 'small' : false}
          bottom={centered ? 'small' : false}
        >
          {getIllustration()}
        </Space>

        <div className="dnb-info-card__content">
          {title && (
            <P
              className="dnb-info-card__title"
              size="small"
              modifier="medium"
              bottom="x-small"
            >
              {title}
            </P>
          )}

          <P size="small" className="dnb-info-card__text" bottom="0">
            {text}
          </P>

          {getButtons()}
        </div>
      </Provider>
    </div>
  )

  function getButtons() {
    if (closeButtonIsHidden && acceptButtonIsHidden) return null

    return (
      <div className="dnb-info-card__buttons">
        {!acceptButtonIsHidden && (
          <Button
            top={centered ? 'medium' : 'small'}
            type="button"
            className="dnb-info-card__buttons__accept-button"
            variant="secondary"
            right={centered ? 'zero' : 'small'}
            on_click={onAccept}
            text={acceptButtonText}
            {...acceptButtonAttributes}
          />
        )}
        {!closeButtonIsHidden && (
          <Button
            type="button"
            className="dnb-info-card__buttons__close-button"
            variant="tertiary"
            top="small"
            on_click={onClose}
            icon="close"
            icon_position="left"
            text={closeButtonText}
            {...closeButtonAttributes}
          />
        )}
      </div>
    )
  }

  function getIllustration() {
    if (src || imgProps) {
      const imageProps = { src, alt, ...imgProps }
      return <Img className="dnb-info-card__image" {...imageProps} />
    }
    return (
      <IconPrimary
        size="medium"
        className="dnb-info-card__icon"
        icon={icon}
      />
    )
  }
}

export default InfoCard
