import React, { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import {
  prerenderIcon,
  prepareIcon,
  IconAllProps,
  IconProps,
} from '../icon/Icon'

// NB: The path reflects the tsdown.config.ts -> external: '../../icons/dnb/primary_icons'
import * as primary_icons from '../../icons/dnb/primary_icons'
import * as primary_icons_medium from '../../icons/dnb/primary_icons_medium'

export * from '../icon/Icon'

export type IconPrimaryProps = IconProps
export type IconPrimaryAllProps = IconAllProps

const icons = { ...primary_icons, ...primary_icons_medium }

function IconPrimary(localProps: IconAllProps) {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context?.skeleton },
    context.Icon,
    context.IconPrimary
  )

  const { icon, size, wrapperParams, iconParams, alt, innerRef } = prepareIcon(
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
    <span ref={innerRef} {...wrapperParams}>
      <IconContainer {...iconParams} />
    </span>
  )
}

const IconPrimaryWithRef = React.forwardRef<HTMLSpanElement, IconAllProps>(
  (props, ref) => {
    return <IconPrimary {...props} innerRef={ref} />
  }
)
IconPrimaryWithRef.displayName = 'IconPrimary'
// @ts-expect-error - Adding custom property to component
IconPrimaryWithRef._supportsSpacingProps = true
IconPrimary._supportsSpacingProps = true

export default IconPrimaryWithRef
