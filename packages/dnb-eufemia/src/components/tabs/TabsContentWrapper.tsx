import React from 'react'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  isTrue,
  combineLabelledBy,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import EventEmitter from '../../shared/helpers/EventEmitter'
import HeightAnimation from '../height-animation/HeightAnimation'

export default class ContentWrapper extends React.PureComponent<ContentWrapperProps> {
  private _eventEmitter: ReturnType<
    typeof EventEmitter.createInstance
  > | null = null

  static defaultProps = {
    selected_key: null,
    content_style: null,
    animate: null,
    content_spacing: true,
    children: null,
  }

  state: { key: string | number | null } = { key: null }

  constructor(props: ContentWrapperProps) {
    super(props)

    if (props.id) {
      this._eventEmitter = EventEmitter.createInstance(props.id)
      const emitterState = this._eventEmitter.get()
      this.state = {
        key: (emitterState as { key?: string | number })?.key ?? null,
      }
    }
  }

  componentDidMount() {
    if (this.props.id && this._eventEmitter) {
      this._eventEmitter.listen((params) => {
        if (this._eventEmitter && params.key !== this.state.key) {
          this.setState(params)
        }
      })
    }
  }

  componentWillUnmount() {
    if (this._eventEmitter) {
      this._eventEmitter.remove()
      this._eventEmitter = null
    }
  }

  render() {
    const {
      id,
      children,
      selected_key: key,
      content_style,
      animate,
      content_spacing,
      ...rest
    } = this.props

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

    validateDOMAttributes(this.props, params)

    let content: React.ReactNode = children
    if (typeof children === 'function') {
      content = (
        children as (state: typeof this.state) => React.ReactNode
      )(this.state)
    }

    return (
      <HeightAnimation
        role="tabpanel"
        tabIndex={-1}
        id={`${id}-content`}
        element={
          content_style
            ? React.forwardRef<HTMLElement>((props, ref) => {
                return (
                  <Section
                    spacing={content_style ? false : undefined}
                    style_type={content_style ? content_style : undefined}
                    innerRef={ref as React.RefObject<HTMLElement>}
                    {...props}
                  />
                )
              })
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
        {...(params as Record<string, unknown>)}
      >
        {content}
      </HeightAnimation>
    )
  }
}

// Type definitions
import type {
  SectionSpacing,
  SectionStyleTypes,
  SectionVariants,
} from '../Section'

export type ContentWrapperSelectedKey = string | number
export type ContentWrapperChildren = React.ReactNode

export interface ContentWrapperProps extends React.HTMLProps<HTMLElement> {
  id: string
  selected_key?: ContentWrapperSelectedKey
  content_style?: SectionStyleTypes | SectionVariants
  animate?: boolean
  content_spacing?: SectionSpacing
  children?: ContentWrapperChildren
}
