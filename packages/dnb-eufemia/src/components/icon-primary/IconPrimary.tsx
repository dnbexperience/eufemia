import React, { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import {
  prerenderIcon,
  prepareIcon,
  IconAllProps,
  IconProps,
} from '../icon/Icon'

// NB: The path reflects the rollup.config.js -> external: '../../icons/dnb/primary_icons'
import * as primary_icons from '../../icons/dnb/primary_icons'
import * as primary_icons_medium from '../../icons/dnb/primary_icons_medium'

export * from '../icon/Icon'

export type IconPrimaryProps = IconProps
export type IconPrimaryAllProps = IconAllProps

const icons = { ...primary_icons, ...primary_icons_medium }

export default function IconPrimary(localProps: IconAllProps) {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context?.skeleton },
    context.Icon,
    context.IconPrimary
  )

  const { icon, size, wrapperParams, iconParams, alt } = prepareIcon(
    props,
    context
  )

  const IconContainer = prerenderIcon({
    icon,
    size,
    alt,
    listOfIcons: icons,
  })

  if (!IconContainer) {
    return <></>
  }

  return (
    <span {...wrapperParams}>
      <IconContainer {...iconParams} />
    </span>
  )
}

IconPrimary._supportsSpacingProps = true
