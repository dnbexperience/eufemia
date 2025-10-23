import React from 'react'
import AlignmentHelper from '../../../shared/AlignmentHelper'
import { isTrue } from '../../../shared/component-helper'
import IconPrimary from '../../icon-primary/IconPrimary'
import type { IconIcon, IconSize } from '../../icon/Icon'

type ButtonContentProps = {
  title?: React.ReactNode
  content?: React.ReactNode
  customContent?: React.ReactNode
  icon?: IconIcon | React.ReactNode | ((...args: any[]) => any)
  iconSize?: IconSize | string | number
  bounding?: boolean
  skeleton?: boolean
  isIconOnly?: boolean
  iconElement?: React.ReactNode
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
      {isTrue(bounding) && (
        <span key="button-bounding" className="dnb-button__bounding" />
      )}

      {customContent && (
        <React.Fragment key="button-custom-content">
          {customContent}
        </React.Fragment>
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
