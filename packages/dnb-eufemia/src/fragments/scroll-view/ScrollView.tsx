/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { applySpacing } from '../../components/space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ScrollViewProps = {
  /**
   * To make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation.
   * Default: `false`
   */
  interactive?: boolean | 'auto'
}

export type ScrollViewAllProps = ScrollViewProps &
  SpacingProps &
  Partial<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> & {
    ref?: React.Ref<unknown>
  }

const defaultProps: Partial<ScrollViewAllProps> = {
  children: null,
}

function ScrollView(localProps: ScrollViewAllProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.ScrollView
  )

  const {
    interactive,
    children,
    className = null,
    ref: refProp,
    ...attributes
  } = props

  const mainParams: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = applySpacing(props, {
    ...(attributes as React.HTMLAttributes<unknown>),
    className: clsx('dnb-scroll-view', className),
  })

  const localRef = React.useRef<HTMLDivElement>(undefined)
  const combinedRef = useCombinedRef(refProp, localRef)
  mainParams.ref = combinedRef

  mainParams.tabIndex = useInteractive({
    interactive,
    children,
    ref: localRef,
  })

  validateDOMAttributes(props, mainParams)

  return <div {...mainParams}>{children}</div>
}

function useInteractive({ interactive, children, ref }) {
  const [isInteractive, setAsInteractive] = React.useState(
    Boolean(interactive)
  )

  useLayoutEffect(() => {
    if (interactive === 'auto') {
      setAsInteractive(hasScrollbar())
    }
  }, [interactive, children]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (interactive === 'auto' && typeof ResizeObserver !== 'undefined') {
      // eslint-disable-next-line compat/compat
      const observer = new ResizeObserver(() => {
        setAsInteractive(hasScrollbar())
      })
      observer.observe(ref.current)
      return () => observer?.disconnect()
    }

    return undefined
  }, [interactive, ref]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isInteractive) {
    return 0 // Ensure that scrollable region has keyboard access
  }

  return undefined

  function hasScrollbar() {
    if (!ref.current) {
      return true // fallback and assume, there is a scrollbar
    }

    /**
     * Safari Desktop adds one pixel "on zoom" level 1
     * therefore we just remove it here
     */
    return (
      ref.current.scrollWidth - 1 > ref.current.offsetWidth ||
      ref.current.scrollHeight - 1 > ref.current.offsetHeight
    )
  }
}

withComponentMarkers(ScrollView, {
  _supportsSpacingProps: true,
})

export default ScrollView
