import React from 'react'
import classnames from 'classnames'
import {
  removeInvalidAttributes,
  isTrue,
  combineLabelledBy,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import EventEmitter, {
  EventEmitterData,
} from '../../shared/helpers/EventEmitter'
import HeightAnimation from '../height-animation/HeightAnimation'
import { ContentWrapperProps, TabsInternalState } from './types'

export default function ContentWrapper(props: ContentWrapperProps) {
  const _eventEmitter = React.useRef<EventEmitter>()
  if (!_eventEmitter.current) {
    _eventEmitter.current = EventEmitter.createInstance<
      EventEmitterData<TabsInternalState>
    >(props.id)
  }
  const [state, setState] = React.useState<EventEmitterData>(() => {
    return _eventEmitter.current.get()
  })

  React.useEffect(() => {
    if (props.id && _eventEmitter.current) {
      _eventEmitter.current.listen((params) => {
        if (_eventEmitter && params?.key !== state.key) {
          setState(params)
        }
      })
    }

    return () => {
      if (_eventEmitter.current) {
        _eventEmitter.current.remove()
        _eventEmitter.current = null
      }
    }
  }, [])

  const {
    id,
    children,
    selected_key,
    content_style,
    animate,
    content_spacing,
    ...rest
  } = props

  if (!children) {
    return <></>
  }

  const params = rest

  if (selected_key) {
    params['aria-labelledby'] = combineLabelledBy(
      params,
      `${id}-tab-${selected_key}`
    )
  }

  removeInvalidAttributes(params)

  const content =
    typeof children === 'function' ? children(state) : children

  return (
    <HeightAnimation
      role="tabpanel"
      tabIndex={-1}
      id={`${id}-content`}
      element={
        content_style
          ? React.forwardRef(
              (props, ref: React.RefObject<HTMLElement>) => {
                return (
                  <Section
                    spacing={content_style ? false : undefined}
                    style_type={content_style ? content_style : undefined}
                    innerRef={ref}
                    {...props}
                  />
                )
              }
            )
          : 'div'
      }
      className={classnames(
        'dnb-tabs__content',
        'dnb-no-focus',
        content_spacing
          ? `dnb-section--spacing-${
              isTrue(content_spacing) ? 'large' : content_spacing
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
