import React from 'react'
import PropTypes from 'prop-types'
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

export default class ContentWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    content_style: PropTypes.string,
    animate: PropTypes.bool,
    content_spacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }
  static defaultProps = {
    selected_key: null,
    content_style: null,
    animate: null,
    content_spacing: true,
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
          content_style
            ? React.forwardRef((props, ref) => {
                return (
                  <Section
                    spacing={content_style ? false : undefined}
                    style_type={content_style ? content_style : undefined}
                    innerRef={ref}
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
        {...params}
      >
        {content}
      </HeightAnimation>
    )
  }
}
