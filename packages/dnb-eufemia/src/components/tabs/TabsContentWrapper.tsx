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

export default class ContentWrapper extends React.PureComponent<ContentWrapperProps> {
  static defaultProps = {
    selectedKey: null,
    contentStyle: null,
    animate: null,
    contentSpacing: true,
    children: null,
  }

  state = { key: null }

  constructor(props) {
    super(props)

    if (props.id) {
      this._eventEmitter = EventEmitter.createInstance(props.id)
      this.state = this._eventEmitter.get()
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
      selectedKey: key,
      contentStyle,
      animate,
      contentSpacing,
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

    let content = children
    if (typeof children === 'function') {
      content = children(this.state)
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

export interface ContentWrapperProps extends React.HTMLProps<HTMLElement> {
  id: string
  selectedKey?: ContentWrapperSelectedKey
  contentStyle?: SectionStyleTypes | SectionVariants
  animate?: boolean
  contentSpacing?: SectionSpacing
  children?: ContentWrapperChildren
}
