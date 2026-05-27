import { useContext, useRef } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type { IconAllProps, IconFunction, IconProps } from '../icon/Icon'
import { prerenderIcon, prepareIcon } from '../icon/Icon'
import { transition, suppressTransitions } from '../icon/IconTransition'
import { useSpacing } from '../space/SpacingUtils'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

// NB: The path reflects the tsdown.config.ts -> external: '../../icons/dnb/primary_icons'
import * as primaryIcons from '../../icons/dnb/primary_icons'
import * as primaryIconsMedium from '../../icons/dnb/primary_icons_medium'

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

  const { icon, size, wrapperParams, iconParams, alt, transitionState } =
    prepareIcon(props, context)

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

  const ref = useRef<HTMLSpanElement>(null)
  const isInitialMount = useRef(true)
  const { ref: externalRef, ...restWrapperParams } =
    wrapperParams as typeof wrapperParams & {
      ref?: React.Ref<HTMLSpanElement>
    }
  const combinedRef = useCombinedRef(ref, externalRef)

  useLayoutEffect(() => {
    if (!transitionState || !ref.current) {
      return // stop here
    }

    const iconFn = icon as IconFunction
    if (iconFn?.__iconTransitionStyle) {
      for (const [key, value] of Object.entries(
        iconFn.__iconTransitionStyle
      )) {
        ref.current.style.setProperty(key, value)
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false
      suppressTransitions(ref.current, () => {
        transition.activate(ref.current, transitionState)
      })
    } else {
      transition.activate(ref.current, transitionState)
    }
  }, [transitionState, icon])

  if (!IconContainer) {
    return null
  }

  return (
    <span {...restWrapperParams} ref={combinedRef} {...spacingProps}>
      <IconContainer {...iconParams} />
    </span>
  )
}

withComponentMarkers(IconPrimary, { _supportsSpacingProps: true })
