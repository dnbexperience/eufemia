import { isValidElement, useContext, useMemo, useRef } from 'react'
import type { ComponentType } from 'react'
import { clsx } from 'clsx'
import {
  warn,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import type { ContextProps } from '../../shared/Context'
import Context from '../../shared/Context'
import { useSpacing } from '../space/SpacingUtils'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { iconCase } from './IconHelpers'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { transition, suppressTransitions } from './IconTransition'
import type {
  IconFunction,
  IconIcon,
  IconSVGProps,
  IconType,
  IconAllProps,
  IconProps,
} from './types'
import {
  DefaultIconSize,
  DefaultIconSizes,
  ListDefaultIconSizes,
  ValidIconType,
} from './sizes'
import type { ValidIconNumericSize } from './sizes'

export * from './sizes'
export * from './types'

/** For internal usage */

/** For external usage */

export default function Icon(localProps: IconAllProps) {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context?.skeleton },
    context.Icon
  )

  const {
    icon: iconProp,
    size,
    wrapperParams,
    iconParams,
    alt,
    children,
    transitionState,
    animationMode,
    animationTrigger,
    animationKey,
  } = usePrepareIcon(props, context)
  const icon = iconProp ?? children

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

    if (isInitialMount.current) {
      isInitialMount.current = false
      suppressTransitions(ref.current, () => {
        transition.activate(ref.current, transitionState)
      })
    } else {
      transition.activate(ref.current, transitionState)
    }
  }, [transitionState, icon])

  if (!icon) {
    return null
  }

  const IconContainer = prerenderIcon({ icon, size, alt })

  // make sure we return an empty span if we couldn't get the icon
  if (!IconContainer) {
    return null
  }

  return (
    <span {...restWrapperParams} ref={combinedRef}>
      <IconContainer
        key={animationMode ? animationKey : undefined}
        {...iconParams}
        {...(animationTrigger === 'hover' && {
          onAnimationStart: ({ currentTarget, target }) =>
            target === currentTarget &&
            currentTarget.classList.add('dnb-icon--animation-active'),
          onAnimationEnd: ({ currentTarget, target }) =>
            target === currentTarget &&
            currentTarget.classList.remove('dnb-icon--animation-active'),
        })}
      />
    </span>
  )
}

export function getIconNameFromComponent(icon: IconProps['icon']): string {
  if (isValidElement(icon) && icon?.type) {
    icon = icon?.type as IconType
  }
  const name = typeof icon === 'function' ? icon.name : String(icon)
  if (/^data:image\//.test(name)) {
    return null
  }
  return name
}

export function calcSize(props: IconProps) {
  const { icon, size, width, height } = props as Omit<
    IconProps,
    'icon'
  > & { icon: IconType }

  let sizeAsInt: ValidIconNumericSize | -1 = null
  let sizeAsString = null

  // if there is no size, check if we can find the actual size in the name
  if (!size || size === DefaultIconSize) {
    // get the icon name - we use it for several things
    const name = getIconNameFromComponent(icon)

    const nameParts = String(name || '').split('_')

    const lastPartOfIconName = nameParts.at(-1) as ValidIconType

    if (ValidIconType.includes(lastPartOfIconName)) {
      const potentialSize = ListDefaultIconSizes.filter(
        ([key]) => key === lastPartOfIconName
      )?.[0]?.[1]
      if (potentialSize) {
        sizeAsInt = potentialSize
      }
      sizeAsString = lastPartOfIconName
    } else {
      // Resolve the icon function — either directly or from a React element's type.
      // This handles minified builds where Function.name no longer contains
      // the size suffix (e.g. "bell_medium" → "e"), so we fall back to
      // reading the SVG's width/viewBox from the rendered output.
      const iconFn =
        typeof icon === 'function'
          ? icon
          : isValidElement(icon) && typeof icon.type === 'function'
            ? (icon.type as IconFunction)
            : null

      // Skip direct execution for hook-based components to avoid invalid hook call order.
      const hasHooks = iconFn
        ? /\buse[A-Z][A-Za-z0-9_]*\b/.test(iconFn.toString())
        : false

      if (iconFn && !hasHooks) {
        try {
          const elem = iconFn()
          const potentialSize = elem?.props?.width

          if (potentialSize && !isNaN(potentialSize)) {
            sizeAsInt = potentialSize
          }
        } catch {
          // Ignore and fallback to default size.
        }
      }
    }
  }

  // if size is defined as a string, find the size number
  else if (typeof size === 'string' && !(parseFloat(size) > 0)) {
    sizeAsInt =
      ListDefaultIconSizes.filter(([key]) => key === size)?.[0]?.[1] ?? -1

    // or if the size is a default size defined as a string
    if (ValidIconType.includes(size as ValidIconType)) {
      sizeAsString = size
    }
  }

  // check if the size is given as a number, and if it's a default size
  else if (parseFloat(String(size)) > 0) {
    sizeAsInt =
      ListDefaultIconSizes.filter(
        ([key, value]) => key && value === parseFloat(String(size))
      )?.[0]?.[1] ?? -1

    // has custom size
    if (sizeAsInt === -1) {
      sizeAsInt = parseFloat(String(size)) as ValidIconNumericSize
      sizeAsString = 'custom-size'
    }
  }

  // check if the sizeAsInt is a default size - and no sizeAsString exists yet
  if (!sizeAsString && sizeAsInt > 0) {
    const potentialSizeAsString = ListDefaultIconSizes.reduce<
      string | null
    >((acc, [key, value]) => {
      if (key && value === sizeAsInt) {
        return key
      }
      return acc
    }, null)

    if (potentialSizeAsString) {
      sizeAsString = potentialSizeAsString
    }
  }

  // define all the svg parameters
  const { sizeAsString: isCustomSize, params: iconParams } =
    prepareIconParams({
      sizeAsString,
      sizeAsInt,
      size,
      width,
      height,
    })

  if (isCustomSize) {
    sizeAsString = isCustomSize
  }

  if (!(sizeAsInt > 0)) {
    sizeAsInt = DefaultIconSize
  }

  if (size === 'auto') {
    iconParams.width = '100%'
    iconParams.height = '100%'
    sizeAsString = 'auto'
  }

  return {
    iconParams,
    sizeAsInt,
    sizeAsString,
  }
}

function prepareIconParams({
  sizeAsString,
  ...rest
}: Omit<IconProps, 'icon'> & {
  sizeAsString?: ValidIconType | 'custom-size'
  sizeAsInt?: ValidIconNumericSize | -1
}) {
  const { size, width, height, sizeAsInt } = rest
  const params: {
    height?: IconProps['height']
    width?: IconProps['width']
    color?: IconProps['color']
  } = {}

  if (!sizeAsString && !(sizeAsInt > 0) && parseFloat(String(size)) > -1) {
    params.width = params.height = parseFloat(String(size))
  } else if (sizeAsString === 'custom-size') {
    params.width = params.height = parseFloat(String(sizeAsInt))
  }
  if (parseFloat(String(width)) > -1) {
    sizeAsString = 'custom-size'
    params.width = parseFloat(String(width))
  }
  if (parseFloat(String(height)) > -1) {
    sizeAsString = 'custom-size'
    params.height = parseFloat(String(height))
  }

  validateDOMAttributes({}, params)

  return { params, sizeAsString }
}

export function prepareIcon(
  props: IconAllProps,
  context: ContextProps,
  cachedValues?: {
    sizeAsString?: string
    iconParams?: Record<string, unknown>
    label?: string
  }
) {
  const {
    icon,
    size,
    width,
    height,
    border,
    color,
    fill,
    inheritColor,
    modifier,
    alt,
    title,
    skeleton,
    className,
    transitionState: _transitionState,
    animate,
    animateWhen,
    animationKey: _animationKey,
    ...attributes
  } = props

  const { sizeAsString, iconParams } =
    cachedValues ||
    calcSize({
      icon,
      size,
      width,
      height,
    })

  if (color) {
    iconParams.color = color
  }

  const label =
    cachedValues?.label ?? (icon ? getIconNameFromComponent(icon) : null)

  const isFilled = Boolean(fill)

  // some wrapper params
  // also used for code markup simulation
  const wrapperParams = validateDOMAttributes(props, {
    role: alt ? 'img' : 'presentation',
    alt, // in case the image don't shows up (because we define the role to be img)
    'aria-label':
      label && !label.includes('default')
        ? label.replace(/_/g, ' ') + ' icon'
        : null, // for screen readers only
    title, // to show on hover, if defined
    ...attributes,
  })
  if (!alt && typeof wrapperParams['aria-hidden'] === 'undefined') {
    wrapperParams['aria-hidden'] = true
  }
  if (wrapperParams['aria-hidden']) {
    if (
      !wrapperParams['data-testid'] &&
      typeof process !== 'undefined' &&
      process.env.NODE_ENV === 'test'
    ) {
      wrapperParams['data-testid'] = wrapperParams['aria-label']
    }
    delete wrapperParams['aria-label']
  }

  wrapperParams.className = clsx(
    'dnb-icon',
    modifier && `dnb-icon--${modifier}`,
    border && 'dnb-icon--border',
    isFilled && 'dnb-icon--filled',
    inheritColor !== false && 'dnb-icon--inherit-color',
    sizeAsString ? `dnb-icon--${sizeAsString}` : 'dnb-icon--default',
    createSkeletonClass(null, skeleton, context),
    className
  )

  const iconToRender = getIcon(props)
  const hasAnimation =
    typeof iconToRender === 'function' &&
    Boolean(iconToRender.__iconAnimation)
  const animationMode =
    hasAnimation && animate ? (animate === true ? 'once' : animate) : null
  const animationTrigger = hasAnimation ? animateWhen : null

  if (typeof iconToRender === 'function') {
    if (animationMode || animationTrigger) {
      wrapperParams.className = clsx(
        wrapperParams.className,
        animationMode && 'dnb-icon--animate',
        animationMode && `dnb-icon--animate-${animationMode}`,
        animationTrigger && `dnb-icon--animate-when-${animationTrigger}`,
        `dnb-icon--animated-${iconToRender.__iconAnimation}`
      )
    }
    if (iconToRender.__iconTransitionFallback) {
      wrapperParams.className += ' dnb-icon--transition-fallback'

      // Pass transitionState so the icon function renders the correct
      // SVG as active during SSR — avoids a flash on hydration.
      if (_transitionState) {
        iconParams['data-transition-state'] = _transitionState
      }
    }
    if (iconToRender.__iconTransitionStyle) {
      wrapperParams.style = {
        ...wrapperParams.style,
        ...iconToRender.__iconTransitionStyle,
        ...(_transitionState && {
          '--icon-transition': `var(--icon-transition-${_transitionState})`,
        }),
      }
    }
  }

  return {
    ...props,
    icon: iconToRender,
    alt,
    iconParams,
    wrapperParams,
    animationMode,
    animationTrigger,
  }
}

function usePrepareIcon(props: IconAllProps, context: ContextProps) {
  const { icon, size, width, height } = props

  const cachedCalcSize = calcSize({
    icon,
    size,
    width,
    height,
  })

  const label = useMemo(
    () => (icon ? getIconNameFromComponent(icon) : null),
    [icon]
  )

  const result = useMemo(
    () =>
      prepareIcon(props, context, {
        ...cachedCalcSize,
        label,
      }),
    [props, context, cachedCalcSize, label]
  )

  const spacingProps = useSpacing(props, {
    className: result.wrapperParams.className,
    style: result.wrapperParams.style,
  })

  return {
    ...result,
    wrapperParams: { ...result.wrapperParams, ...spacingProps },
  }
}

export function prerenderIcon(
  props: IconProps & {
    listOfIcons?: Record<string, IconIcon>
  }
) {
  const { size = null, listOfIcons = null, alt = null } = props
  let { icon } = props as Omit<IconProps, 'icon'> & { icon: IconType }

  if (typeof icon === 'string' && /^data:image\//.test(icon)) {
    return () => <img src={String(icon)} alt={alt || ''} />
  }

  if (typeof icon === 'function') {
    return icon as ComponentType<IconSVGProps>
  }

  if (isValidElement(icon) || Array.isArray(icon)) {
    return () => icon
  }

  // For UMD/ dynamic import of icons
  try {
    icon = iconCase(icon)
    if (
      size &&
      DefaultIconSizes[size] &&
      size !== 'basis' &&
      size !== 'default' &&
      !(parseFloat(String(size)) > 0) &&
      !icon.includes(size as ValidIconType)
    ) {
      icon = `${icon}_${size}`
    }
    const mod = (
      listOfIcons.dnbIcons ? listOfIcons.dnbIcons : listOfIcons
    )[icon]
    return mod && mod.default ? mod.default : mod
  } catch (e) {
    warn(`Icon '${icon}' did not exist!`)
    return null
  }
}

function getIcon(props) {
  if (props.icon) {
    return props.icon
  }
  if (typeof props.children === 'function') {
    return props.children
  }
  return processChildren(props)
}

withComponentMarkers(Icon, { _supportsSpacingProps: true })
Icon.transition = transition
