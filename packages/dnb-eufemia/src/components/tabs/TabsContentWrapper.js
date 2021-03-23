import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  isTrue
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import TabsController from './TabsController'

export default class ContentWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    content_style: PropTypes.string,
    content_spacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }
  static defaultProps = {
    selected_key: null,
    content_style: null,
    content_spacing: true,
    children: null
  }

  state = {}

  constructor(props) {
    super(props)

    if (props.id) {
      this._controller = TabsController.use(props.id)
      this.state.key = this._controller.get().key
    }
  }

  componentDidMount() {
    if (this.props.id) {
      this._controller.listen(({ key }) => {
        // this._timeout = setTimeout(() => {
        if (this._controller && key !== this.state.key) {
          this.setState({ key })
        }
        // }, 1)
      })
    }
  }

  componentWillUnmount() {
    // clearTimeout(this._timeout)
    if (this._controller) {
      this._controller.remove()
      this._controller = null
    }
  }

  render() {
    const {
      id,
      children,
      selected_key: key,
      content_style,
      content_spacing,
      ...rest
    } = this.props

    if (!children) {
      return <></>
    }

    const params = rest

    if (key) {
      params['aria-labelledby'] = `${id}-tab-${key}`
    }

    validateDOMAttributes(this.props, params)

    const Element = content_style ? Section : 'div'

    let content = children
    if (typeof children === 'function') {
      content = children({ key: this.state.key })
    }

    return (
      <Element
        role="tabpanel"
        tabIndex="0"
        id={`${id}-content`}
        spacing={content_style ? false : undefined}
        style_type={content_style ? content_style : undefined}
        element={content_style ? 'div' : undefined}
        className={classnames(
          'dnb-tabs__content dnb-no-focus',
          isTrue(content_spacing) && 'dnb-tabs__content--spacing',
          createSpacingClasses(rest)
        )}
        {...params}
      >
        {content}
      </Element>
    )
  }
}
