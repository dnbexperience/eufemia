import React from 'react'
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

interface ContentWrapperState {
  key: string | number | null
}

type SharedState = SharedStateReturn<ContentWrapperState> & {
  subscribe: (subscriber: () => void) => void
  unsubscribe: (subscriber: () => void) => void
}

export default class ContentWrapper extends React.PureComponent<
  ContentWrapperProps,
  ContentWrapperState
> {
  static defaultProps = {
    selectedKey: null,
    contentStyle: null,
    animate: null,
    contentSpacing: true,
    children: null,
  }

  _sharedState: SharedState | null = null
  _subscriber: (() => void) | null = null

  state: ContentWrapperState = { key: null }

  constructor(props: ContentWrapperProps) {
    super(props)

    if (props.id) {
      this._sharedState = createSharedState(
        props.id
      ) as unknown as SharedState
      this.state = this._sharedState.get() || { key: null }
    }
  }

  componentDidMount() {
    if (this.props.id && this._sharedState) {
      this._subscriber = () => {
        const params = this._sharedState!.get()
        if (this._sharedState && params?.key !== this.state.key) {
          this.setState(params)
        }
      }
      this._sharedState.subscribe(this._subscriber)
    }
  }

  componentWillUnmount() {
    if (this._sharedState && this._subscriber) {
      this._sharedState.unsubscribe(this._subscriber)
      this._sharedState = null
      this._subscriber = null
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
      return null
    }

    const params = rest

    // Use state.key if available (when linked with shared state),
    // otherwise fall back to selectedKey prop
    const activeKey = this.state.key !== null ? this.state.key : key

    if (activeKey) {
      params['aria-labelledby'] = combineLabelledBy(
        params,
        `${id}-tab-${activeKey}`
      )
    }

    validateDOMAttributes(this.props, params)

    let content: React.ReactNode = children as React.ReactNode
    if (typeof children === 'function') {
      // If state.key is null but we have an activeKey, create a proper state object
      const stateToPass =
        this.state.key !== null
          ? this.state
          : { ...this.state, key: activeKey }
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
