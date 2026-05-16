import { useEffect, useRef, useState } from 'react'
import type { HTMLProps, ReactNode, RefObject } from 'react'
import clsx from 'clsx'
import type { DynamicElement, InnerSpaceType } from '../../shared/types'
import {
  validateDOMAttributes,
  combineLabelledBy,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'
import Section from '../section/Section'
import {
  createSharedState,
  type SharedStateReturn,
} from '../../shared/helpers/useSharedState'
import HeightAnimation from '../height-animation/HeightAnimation'

type ContentWrapperState = {
  key: string | number | null
}

type SharedState = SharedStateReturn<ContentWrapperState> & {
  subscribe: (subscriber: () => void) => void
  unsubscribe: (subscriber: () => void) => void
}

export default function ContentWrapper({
  id,
  children = null,
  selectedKey = null,
  contentStyle = null,
  animate = null,
  contentInnerSpace = { top: 'large' } as InnerSpaceType | boolean,
  ...rest
}: TabsContentWrapperProps) {
  const sharedStateRef = useRef<SharedState | null>(null)

  const [state, setState] = useState<ContentWrapperState>(() => {
    if (id) {
      const shared = createSharedState(id) as unknown as SharedState
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
        !contentStyle && resolvedInnerSpace && 'dnb-space'
      ),
    }
  )

  if (!children) {
    return null
  }

  const params = { ...rest }

  // Use state.key if available (when linked with shared state),
  // otherwise fall back to selectedKey prop
  const activeKey = state.key !== null ? state.key : selectedKey

  if (activeKey) {
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
      tabIndex={-1}
      id={`${id}-content`}
      element={
        (contentStyle
          ? ({
              ref,
              ...props
            }: {
              ref: RefObject<HTMLElement>
              [key: string]: unknown
            }) => {
              return (
                <Section
                  variant={contentStyle ? contentStyle : undefined}
                  innerSpace={resolvedInnerSpace || undefined}
                  ref={ref}
                  {...props}
                />
              )
            }
          : 'div') as DynamicElement
      }
      {...spacingProps}
      duration={600}
      animate={animate === true}
      {...params}
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
} & Omit<
  HTMLProps<HTMLElement>,
  'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'
>
