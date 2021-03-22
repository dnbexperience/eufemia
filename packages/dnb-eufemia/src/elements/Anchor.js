/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'
import Context from '../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext
} from '../shared/component-helper'
import Tooltip from '../components/tooltip/Tooltip'

class Anchor extends React.PureComponent {
  static contextType = Context
  static tagName = 'dnb-anchor'
  static propTypes = {
    ...spacingPropTypes,

    href: PropTypes.string,
    omitClass: PropTypes.bool,
    target_blank_title: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ]),
    tooltip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    children: PropTypes.node
  }
  static defaultProps = {
    href: null,
    omitClass: null,
    target_blank_title: null,
    target: null,
    className: null,
    tooltip: null,
    children: null
  }

  state = {}

  constructor(props) {
    super(props)

    this._id = props.id || 'id' + makeUniqueId()
    this._ref = props.inner_ref || React.createRef()
  }

  render() {
    const props = extendPropsWithContext(
      this.props,
      Anchor.defaultProps,
      { skeleton: this.context && this.context.skeleton },
      this.context.getTranslation(this.props).Anchor,
      this.context.Anchor
    )

    const {
      className,
      children,
      tooltip,
      omitClass,
      ...attributes
    } = props

    // WCAG guide: https://www.w3.org/TR/WCAG20-TECHS/G201.html
    const showTooltip = props.target === '_blank' && !props.title

    // can be icon only or what ever content
    // because we then don't want to distract the link out
    // we make sure we hide the icon
    attributes.className = classnames(
      omitClass !== true && 'dnb-anchor',
      omitClass && showTooltip && 'dnb-anchor--icon',
      className,
      props.target === '_blank' &&
        typeof children !== 'string' &&
        'dnb-anchor--no-icon'
    )

    return (
      <>
        <E is="a" {...attributes} inner_ref={this._ref}>
          {children}
        </E>
        {showTooltip && (
          <Tooltip
            show_delay={100}
            id={this._id + '-tooltip'}
            target_ref={this._ref}
            tooltip={tooltip}
          >
            {props.title || props.target_blank_title}
          </Tooltip>
        )}
      </>
    )
  }
}

const AnchorInstance = React.forwardRef((props, ref) => {
  return <Anchor inner_ref={ref} {...props} />
})

export default AnchorInstance
