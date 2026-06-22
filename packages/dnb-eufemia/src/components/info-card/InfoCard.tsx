import { useCallback, useContext } from 'react'
import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { clsx } from 'clsx'

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
   * Used in combination with `src` to provide an alt attribute for the image element.
   */
  alt?: ReactNode
  /**
   * Centers the content. Defaults to `false`.
   */
  centered?: boolean
  /**
   * Sets the drop shadow of the info card. Defaults to `true`.
   */
  dropShadow?: boolean
  /**
   * Custom icon. Defaults to the `lightbulb` icon.
   */
  icon?: IconIcon
  /**
   * [Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image.
   */
  imgProps?: ImgProps
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown. Defaults to `false`.
   */
  skeleton?: SkeletonShow
  /**
   * Stretch the card to fill the container.
   */
  stretch?: boolean
  /**
   * Specifies the path to the image.
   */
  src?: string
  /**
   * The text content of the InfoCard, displayed/rendered in a paragraph. To fully customize the content, see `children` property.
   */
  text?: ReactNode
  /**
   * Can be used to add custom content, which is displayed/rendered between the `text` property and buttons.
   */
  children?: ReactNode
  /**
   * The title of the InfoCard.
   */
  title?: ReactNode
  /**
   * Will be called when user clicks the close button.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>
  /**
   * The close button text.
   */
  closeButtonText?: ReactNode
  /**
   * Will be called when user clicks the accept button.
   */
  onAccept?: MouseEventHandler<HTMLButtonElement>
  /**
   * The accept button text.
   */
  acceptButtonText?: ReactNode
  /**
   * Props forwarded to the close button.
   */
  closeButtonProps?: ButtonProps
  /**
   * Deprecated. Use `closeButtonProps` instead.
   * @deprecated Use `closeButtonProps` instead.
   */
  closeButtonAttributes?: ButtonProps
  /**
   * Props forwarded to the accept button.
   */
  acceptButtonProps?: ButtonProps
  /**
   * Deprecated. Use `acceptButtonProps` instead.
   * @deprecated Use `acceptButtonProps` instead.
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
    closeButtonProps: closeButtonPropsProp,
    closeButtonAttributes: closeButtonAttributesProp,
    acceptButtonProps: acceptButtonPropsProp,
    acceptButtonAttributes: acceptButtonAttributesProp,
    ...props
  } = allProps

  const closeButtonAttributes =
    closeButtonPropsProp || closeButtonAttributesProp

  const acceptButtonAttributes =
    acceptButtonPropsProp || acceptButtonAttributesProp

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
