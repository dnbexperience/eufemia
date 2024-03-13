/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import type { SpacingProps } from '../../shared/types'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type ScrollViewProps = {
  /**
   * To make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation.
   * Default: false
   */
  interactive?: boolean | 'auto'
}

export type ScrollViewAllProps = ScrollViewProps &
  SpacingProps &
  Partial<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> & {
    innerRef?: React.ForwardedRef<unknown>
  }

const defaultProps = {
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
    innerRef,
    ...attributes
  } = props

  const mainParams: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    className: classnames(
      'dnb-scroll-view',
      createSpacingClasses(props),
      className
    ),
    ...(attributes as React.HTMLAttributes<unknown>),
  }

  const ref = React.useRef<HTMLDivElement>()
  mainParams.ref = innerRef
    ? (innerRef as React.RefObject<HTMLDivElement>)
    : ref

  mainParams.tabIndex = useInteractive({
    interactive,
    children,
    ref: mainParams.ref,
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
      const observer = new ResizeObserver(() => {
        setAsInteractive(hasScrollbar())
      })
      observer.observe(ref.current)
      return () => observer?.disconnect()
    }
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

const ScrollViewWithRef = React.forwardRef(
  (props: ScrollViewAllProps, ref) => {
    return <ScrollView {...props} innerRef={props.innerRef || ref} />
  }
)

ScrollView._supportsSpacingProps = true
ScrollViewWithRef['_supportsSpacingProps'] = true

export default ScrollViewWithRef
