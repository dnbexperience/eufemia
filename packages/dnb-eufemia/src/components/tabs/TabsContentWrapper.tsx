import { useContext, useEffect, useRef, useState } from 'react'
import type { HTMLProps, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { DynamicElement, InnerSpaceType } from '../../shared/types'
import {
  validateDOMAttributes,
  combineLabelledBy,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'
import Section from '../section/Section'
import {
  createSharedState,
  useDefaultSharedStateStore,
  SharedStateScopeContext,
  type SharedStateReturn,
} from '../../shared/helpers/useSharedState'
import { warnOnServer } from '../../shared/helpers/warnOnServer'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import HeightAnimation from '../height-animation/HeightAnimation'

type ContentWrapperState = {
  key: string | number | null
}

type SharedState = SharedStateReturn<ContentWrapperState> & {
  subscribe: (subscriber: () => void) => void
  unsubscribe: (subscriber: () => void) => void
}

// Look in reading order, through layout wrappers and past inactive cached panels.
function startsWithTabStop(root: Element): boolean {
  const walker = root.ownerDocument.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP
      }
      const element = node as HTMLElement
      if (
        element.matches(
          '[hidden], [inert], [aria-hidden="true"], input[type="hidden"], style, script'
        )
      ) {
        return NodeFilter.FILTER_REJECT
      }
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden') {
        return NodeFilter.FILTER_REJECT
      }
      return element.matches(
        'a[href], button, input, select, textarea, summary, iframe, [tabindex], [contenteditable]:not([contenteditable="false"]), img[alt]:not([alt=""])'
      )
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP
    }
  )
  const first = walker.nextNode()
  return (
    first instanceof HTMLElement &&
    (first.tabIndex >= 0 ||
      (!first.hasAttribute('tabindex') && first.isContentEditable)) &&
    !first.matches(':disabled')
  )
}

export default function ContentWrapper({
  id,
  children = null,
  selectedKey = null,
  contentStyle = null,
  animate = null,
  contentInnerSpace = { top: 'large' } as InnerSpaceType | boolean,
  nested = false,
  className,
  style,
  tabIndex,
  ...rest
}: TabsContentWrapperProps) {
  const sharedStateRef = useRef<SharedState | null>(null)
  const sharedStateStore = useDefaultSharedStateStore()
  // On the server, Tabs.Content gets the selected tab only inside the same Provider as its Tabs
  const hasScope = Boolean(useContext(SharedStateScopeContext))
  if (id && !nested && !hasScope) {
    warnOnServer(
      'Tabs.Content',
      id,
      'does not get the selected tab during server rendering, because no Eufemia Provider surrounds it and its Tabs. Put both inside the same Provider.'
    )
  }

  const [state, setState] = useState<ContentWrapperState>(() => {
    if (id) {
      const shared = createSharedState(
        id,
        undefined,
        sharedStateStore
      ) as unknown as SharedState
      sharedStateRef.current = shared
      return shared.get() || { key: null }
    }
    return { key: null }
  })

  useEffect(() => {
    if (!id || !sharedStateRef.current) {
      return undefined // stop here
    }

    const sharedState = sharedStateRef.current

    const subscriber = () => {
      const params = sharedState.get()
      if (params?.key !== undefined) {
        setState((prev) => {
          if (params.key !== prev.key) {
            return params
          }
          return prev
        })
      }
    }

    sharedState.subscribe(subscriber)

    return () => {
      sharedState.unsubscribe(subscriber)
      sharedStateRef.current = null
    }
  }, [id])

  // Register this tabpanel's presence in a shared state so a separately
  // rendered <Tabs> (linked via <Tabs.Content>) can set aria-controls on the
  // selected tab only while the panel is mounted. Skipped for the internal
  // panel, which <Tabs> already tracks synchronously.
  const hasPanel = Boolean(children)
  useEffect(() => {
    if (nested || !id || !hasPanel) {
      return undefined // stop here
    }

    const presence = createSharedState<{ count: number }>(
      `${id}-tabpanel-presence`,
      undefined,
      sharedStateStore
    )
    presence.set({ count: (presence.get()?.count || 0) + 1 })

    return () => {
      presence.set({
        count: Math.max(0, (presence.get()?.count || 1) - 1),
      })
    }
  }, [id, nested, hasPanel, sharedStateStore])

  const resolvedInnerSpace =
    contentInnerSpace === true ? 'large' : contentInnerSpace

  const spacingProps = useSpacing(
    {
      ...rest,
      innerSpace:
        !contentStyle && resolvedInnerSpace
          ? resolvedInnerSpace
          : undefined,
    },
    {
      className: clsx(
        'dnb-tabs__content',
        'dnb-no-focus',
        !contentStyle && resolvedInnerSpace && 'dnb-space',
        className
      ),
      style,
    }
  )

  const panelRef = useRef<HTMLElement>(null)
  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel || tabIndex != null) {
      return undefined
    }
    const updateTabIndex = () => {
      const next = startsWithTabStop(panel) ? -1 : 0
      if (panel.tabIndex !== next) {
        panel.tabIndex = next
      }
    }
    updateTabIndex()

    // Children can change their own content without re-rendering Tabs.
    const observer = new MutationObserver((records) => {
      if (
        records.some(
          ({ type, target }) => type !== 'attributes' || target !== panel
        )
      ) {
        updateTabIndex()
      }
    })
    observer.observe(panel, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        'hidden',
        'inert',
        'aria-hidden',
        'tabindex',
        'disabled',
        'href',
        'type',
        'contenteditable',
      ],
    })
    return () => observer.disconnect()
  }, [tabIndex, hasPanel, contentStyle])

  if (!children) {
    return null
  }

  const params = { ...rest }

  // Use state.key if available (when linked with shared state),
  // otherwise fall back to selectedKey prop
  const activeKey = nested ? selectedKey : (state.key ?? selectedKey)

  if (activeKey != null) {
    params['aria-labelledby'] = combineLabelledBy(
      params,
      `${id}-tab-${activeKey}`
    )
  }

  validateDOMAttributes(
    {
      id,
      children,
      selectedKey,
      contentStyle,
      animate,
      contentInnerSpace,
      ...rest,
    },
    params
  )

  let content: ReactNode = children as ReactNode
  if (typeof children === 'function') {
    // If state.key is null but we have an activeKey, create a proper state object
    const stateToPass =
      state.key !== null ? state : { ...state, key: activeKey }
    content = children(stateToPass) as ReactNode
  }

  return (
    <HeightAnimation
      role="tabpanel"
      tabIndex={tabIndex ?? 0}
      id={`${id}-content`}
      element={contentStyle ? (Section as DynamicElement) : 'div'}
      {...(contentStyle && {
        variant: contentStyle,
        innerSpace: resolvedInnerSpace || undefined,
      })}
      {...spacingProps}
      duration={600}
      animate={animate === true}
      {...params}
      ref={panelRef}
    >
      {content}
    </HeightAnimation>
  )
}

// Type definitions
import type { SectionVariants } from '../Section'

export type TabsContentWrapperSelectedKey = string | number
export type TabsContentWrapperChildren =
  | ReactNode
  | ((...args: any[]) => ReactNode)

export type TabsContentWrapperProps = {
  id: string
  selectedKey?: TabsContentWrapperSelectedKey
  contentStyle?: SectionVariants | string
  animate?: boolean
  contentInnerSpace?: InnerSpaceType | boolean
  children?: TabsContentWrapperChildren
  /** Internal: set by <Tabs> for its own tabpanel so it does not self-register presence. */
  nested?: boolean
} & Omit<
  HTMLProps<HTMLElement>,
  'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'
>
