import { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type { IconAllProps, IconProps } from '../icon/Icon'
import { prerenderIcon, prepareIcon } from '../icon/Icon'
import { useSpacing } from '../space/SpacingUtils'

// NB: The path reflects the tsdown.config.ts -> external: '../../icons/dnb/primary_icons'
import * as primaryIcons from '../../icons/dnb/primary_icons'
import * as primaryIconsMedium from '../../icons/dnb/primary_icons_medium'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export * from '../icon/Icon'

export type IconPrimaryProps = IconProps
export type IconPrimaryAllProps = IconAllProps

const icons = { ...primaryIcons, ...primaryIconsMedium }

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

  const spacingProps = useSpacing(props, {
    className: wrapperParams.className,
    style: wrapperParams.style,
  })

  const IconContainer = prerenderIcon({
    icon,
    size,
    alt,
    listOfIcons: icons,
  })

  if (!IconContainer) {
    return null
  }

  return (
    <span {...wrapperParams} {...spacingProps}>
      <IconContainer {...iconParams} />
    </span>
  )
}

withComponentMarkers(IconPrimary, { _supportsSpacingProps: true })
