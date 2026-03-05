import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  validateDOMAttributes,
  combineLabelledBy,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import {
  createSharedState,
  type SharedStateReturn,
} from '../../shared/helpers/useSharedState'
import HeightAnimation from '../height-animation/HeightAnimation'

type ContentWrapperState = {
  value: string | number | null
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
  contentSpacing = true,
  ...rest
}: ContentWrapperProps) {
  const sharedStateRef = useRef<SharedState | null>(null)

  const [state, setState] = useState<ContentWrapperState>(() => {
    if (id) {
      const shared = createSharedState(id) as unknown as SharedState
      sharedStateRef.current = shared
      return shared.get() || { value: null }
    }
    return { value: null }
  })

  useEffect(() => {
    if (!id || !sharedStateRef.current) {
      return // stop here
    }

    const sharedState = sharedStateRef.current

    const subscriber = () => {
      const params = sharedState.get()
      if (params?.value !== undefined) {
        setState((prev) => {
          if (params.value !== prev.value) {
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

  if (!children) {
    return null
  }

  const params = { ...rest }

  // Use state.value if available (when linked with shared state),
  // otherwise fall back to selectedKey prop
  const activeKey = state.value !== null ? state.value : selectedKey

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
      contentSpacing,
      ...rest,
    },
    params
  )

  let content: React.ReactNode = children as React.ReactNode
  if (typeof children === 'function') {
    // If state.value is null but we have an activeKey, create a proper state object
    const stateToPass =
      state.value !== null ? state : { ...state, value: activeKey }
    content = children(stateToPass) as React.ReactNode
  }

  return (
    <HeightAnimation
      role="tabpanel"
      tabIndex={-1}
      id={`${id}-content`}
      element={
        contentStyle
          ? ({
              ref,
              ...props
            }: {
              ref: React.RefObject<HTMLElement>
              [key: string]: unknown
            }) => {
              return (
                <Section
                  spacing={contentStyle ? false : undefined}
                  style_type={contentStyle ? contentStyle : undefined}
                  ref={ref}
                  {...props}
                />
              )
            }
          : 'div'
      }
      className={clsx(
        'dnb-tabs__content',
        'dnb-no-focus',
        contentSpacing
          ? `dnb-section--spacing-${
              contentSpacing === true ? 'large' : contentSpacing
            }`
          : null,
        createSpacingClasses(rest)
      )}
      duration={600}
      animate={animate === true}
      {...params}
    >
      {content}
    </HeightAnimation>
  )
}

// Type definitions
import type {
  SectionSpacing,
  SectionStyleTypes,
  SectionVariants,
} from '../Section'

export type ContentWrapperSelectedKey = string | number
export type ContentWrapperChildren =
  | React.ReactNode
  | ((...args: any[]) => any)

export interface ContentWrapperProps
  extends Omit<
    React.HTMLProps<HTMLElement>,
    'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'
  > {
  id: string
  selectedKey?: ContentWrapperSelectedKey
  contentStyle?: SectionStyleTypes | SectionVariants
  animate?: boolean
  contentSpacing?: SectionSpacing
  children?: ContentWrapperChildren
}
