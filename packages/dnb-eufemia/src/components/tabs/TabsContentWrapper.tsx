// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import clsx from 'clsx'
import {
  validateDOMAttributes,
  isTrue,
  combineLabelledBy,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import EventEmitter from '../../shared/helpers/EventEmitter'
import HeightAnimation from '../height-animation/HeightAnimation'

const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
  const {
    id,
    children = null,
    selectedKey: key = null,
    contentStyle = null,
    animate = null,
    contentSpacing = true,
    ...rest
  } = props

  const eventEmitterRef = React.useRef(null)
  const [state, setState] = React.useState({ key: null })

  React.useEffect(() => {
    if (id) {
      eventEmitterRef.current = EventEmitter.createInstance(id)
      setState(eventEmitterRef.current.get())

      eventEmitterRef.current.listen((params) => {
        setState((prevState) => {
          if (params.key !== prevState.key) {
            return params
          }
          return prevState
        })
      })
    }

    return () => {
      if (eventEmitterRef.current) {
        eventEmitterRef.current.remove()
        eventEmitterRef.current = null
      }
    }
  }, [id])

  if (!children) {
    return <></>
  }

  const params = rest

  if (key) {
    params['aria-labelledby'] = combineLabelledBy(
      params,
      `${id}-tab-${key}`
    )
  }

  validateDOMAttributes(props, params)

  let content = children
  if (typeof children === 'function') {
    content = children(state)
  }

  return (
    <HeightAnimation
      role="tabpanel"
      tabIndex="-1"
      id={`${id}-content`}
      element={
        contentStyle
          ? React.forwardRef((props, ref) => {
              return (
                <Section
                  spacing={contentStyle ? false : undefined}
                  style_type={contentStyle ? contentStyle : undefined}
                  innerRef={ref}
                  {...props}
                />
              )
            })
          : 'div'
      }
      className={clsx(
        'dnb-tabs__content',
        'dnb-no-focus',
        contentSpacing
          ? `dnb-section--spacing-${
              isTrue(contentSpacing) ? 'large' : contentSpacing
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

export default ContentWrapper

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

export interface ContentWrapperProps extends React.HTMLProps<HTMLElement> {
  id: string
  selectedKey?: ContentWrapperSelectedKey
  contentStyle?: SectionStyleTypes | SectionVariants
  animate?: boolean
  contentSpacing?: SectionSpacing
  children?: ContentWrapperChildren
}
