import { useCallback, useContext } from 'react'
import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import clsx from 'clsx'

// Components
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import type { ImgProps } from '../../elements/img/Img'
import Img from '../../elements/img/Img'
import Space from '../space/Space'
import P from '../../elements/P'

// Icons
import { lightbulb_medium as LightbulbIcon } from '../../icons'

// Shared
import { useSpacing } from '../space/SpacingUtils'
import type { SkeletonShow } from '../skeleton/Skeleton'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import type { SpacingProps } from '../../shared/types'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type InfoCardProps = {
  /**
   * Used in combination with `src` to provide an alt attribute for the `img` element.
   * Default: `null`
   */
  alt?: ReactNode
  /**
   * Aligns the content to center, rather than left
   * Default: `false`
   */
  centered?: boolean
  /**
   * Determines whether to display a drop shadow around the card.
   * Default: `true`
   */
  dropShadow?: boolean
  /**
   * Replace the default icon with custom icon.
   * Default: `Lightbulb (icon)`
   */
  icon?: IconIcon
  /**
   * Props applied to the `img` element if the component is used to display an image. Replaces the icon.
   * Default: `null`
   */
  imgProps?: ImgProps
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   * Default: `false`
   */
  skeleton?: SkeletonShow
  /**
   * Stretch the card to fill the container
   */
  stretch?: boolean
  /**
   * Specifies the path to the image
   * Default: `null`
   */
  src?: string
  /**
   * The text content of the InfoCard
   * Default: `null`
   */
  text?: ReactNode
  /**
   * Can be used to add custom content, which is displayed/rendered between the `text` property and buttons.
   * Default: `null`
   */
  children?: ReactNode
  /**
   * Component title
   * Default: `null`
   */
  title?: ReactNode
  /**
   * Is called when the close button is clicked
   * Default: `null`
   */
  onClose?: MouseEventHandler<HTMLButtonElement>
  /**
   * The text of the close button.
   * Default: `null`
   */
  closeButtonText?: ReactNode
  /**
   * Is called when the accept button is clicked
   * Default: `null`
   */
  onAccept?: MouseEventHandler<HTMLButtonElement>
  /**
   * The text of the accept button.
   * Default: `null`
   */
  acceptButtonText?: ReactNode
  /**
   * Additional attributes for the close button.
   * Default: `null`
   */
  closeButtonAttributes?: ButtonProps
  /**
   * Additional attributes for the accept button
   * Default: `null`
   */
  acceptButtonAttributes?: ButtonProps
}

export type InfoCardAllProps = InfoCardProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  SpacingProps

export const defaultProps = {
  centered: false,
  dropShadow: true,
  skeleton: false,
  icon: LightbulbIcon,
}

const InfoCard = (localProps: InfoCardAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    {
      skeleton: context?.skeleton,
    },
    context?.InfoCard
  )

  // Extract additional props from global context
  const {
    alt,
    centered,
    dropShadow,
    title,
    skeleton,
    stretch,
    className,
    icon,
    src,
    imgProps,
    text,
    children,
    onClose,
    onAccept,
    closeButtonText,
    acceptButtonText,
    closeButtonAttributes,
    acceptButtonAttributes,
    ...props
  } = allProps

  const closeButtonIsHidden = !onClose && !closeButtonText
  const acceptButtonIsHidden = !onAccept && !acceptButtonText

  validateDOMAttributes(allProps, props)

  const rootProps = useSpacing(allProps, {
    ...props,
    className: clsx(
      'dnb-info-card',
      centered && 'dnb-info-card--centered',
      stretch && 'dnb-info-card--stretch',
      dropShadow && 'dnb-info-card--shadow',
      className
    ),
  })

  const getButtons = useCallback(() => {
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
            onClick={onAccept}
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
            onClick={onClose}
            icon="close"
            iconPosition="left"
            text={closeButtonText}
            {...closeButtonAttributes}
          />
        )}
      </div>
    )
  }, [
    acceptButtonAttributes,
    acceptButtonIsHidden,
    acceptButtonText,
    centered,
    closeButtonAttributes,
    closeButtonIsHidden,
    closeButtonText,
    onAccept,
    onClose,
  ])

  const getIllustration = useCallback(() => {
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
  }, [alt, icon, imgProps, src])

  return (
    <div {...rootProps}>
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
              weight="medium"
              bottom="x-small"
            >
              {title}
            </P>
          )}
          {text && (
            <P size="small" className="dnb-info-card__text" bottom="0">
              {text}
            </P>
          )}
          {children}
          {getButtons()}
        </div>
      </Provider>
    </div>
  )
}

withComponentMarkers(InfoCard, {
  _supportsSpacingProps: true,
})

export default InfoCard
