import { Fragment } from 'react'
import type { ReactNode } from 'react'
import AlignmentHelper from '../../../shared/AlignmentHelper'
import IconPrimary from '../../icon-primary/IconPrimary'
import type { IconIcon, IconSize } from '../../icon/Icon'

type ButtonContentProps = {
  title?: ReactNode
  content?: ReactNode
  customContent?: ReactNode
  icon?: IconIcon | ReactNode | (() => ReactNode)
  iconSize?: IconSize | string | number
  bounding?: boolean
  skeleton?: boolean
  isIconOnly?: boolean
  iconElement?: ReactNode
}

export default function ButtonContent({
  title = null,
  content = null,
  customContent = null,
  icon = null,
  iconSize = 'default',
  bounding = null,
  skeleton = null,
  isIconOnly = null,
  iconElement = null,
}: ButtonContentProps) {
  return (
    <>
      {bounding && (
        <span key="button-bounding" className="dnb-button__bounding" />
      )}

      {customContent && (
        <Fragment key="button-custom-content">{customContent}</Fragment>
      )}

      {content && (
        <>
          <AlignmentHelper
            key="button-alignment"
            className="dnb-button__alignment"
            pseudoElementOnly
          />
          <span
            key="button-text"
            className="dnb-button__text dnb-skeleton--show-font"
          >
            {content}
          </span>
        </>
      )}

      {
        // on empty text, use a zero-width non-joiner
        // so the icon button gets vertical aligned
        // we need the dnb-button__text for alignment
        !content && icon && (
          <AlignmentHelper
            key="button-alignment"
            className="dnb-button__alignment"
            pseudoElementOnly
          />
        )
      }

      {icon &&
        (iconElement || (
          <IconPrimary
            key="button-icon"
            className="dnb-button__icon"
            icon={icon as IconIcon}
            size={iconSize as IconSize}
            aria-hidden={isIconOnly && !title ? null : true}
            skeleton={skeleton}
          />
        ))}
    </>
  )
}
