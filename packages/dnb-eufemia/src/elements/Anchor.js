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
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
} from '../shared/component-helper'
import Tooltip from '../components/tooltip/Tooltip'

const Anchor = React.forwardRef((props, ref) => {
  return <AnchorInstance inner_ref={ref} {...props} />
})

Anchor.propTypes = {
  ...spacingPropTypes,

  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node,
  ]),
  href: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  omitClass: PropTypes.bool,
  target_blank_title: PropTypes.node,
  target_blank_external_title: PropTypes.node,
  target: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  external: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node,
}
Anchor.defaultProps = {
  element: null,
  href: null,
  to: null,
  omitClass: null,
  target_blank_title: null,
  target_blank_external_title: null,
  target: null,
  className: null,
  skeleton: null,
  tooltip: null,
  external: 'auto',
  children: null,
}

class AnchorInstance extends React.PureComponent {
  static contextType = Context
  static tagName = 'dnb-anchor'
  static propTypes = Anchor.propTypes
  static defaultProps = Anchor.defaultProps

  state = {}

  constructor(props) {
    super(props)

    this._id = props.id || 'id' + makeUniqueId() // eslint-disable-line react/prop-types
    this._ref = props.inner_ref || React.createRef() // eslint-disable-line react/prop-types
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
      element,
      className,
      children,
      tooltip,
      external,
      omitClass,
      inner_ref, // eslint-disable-line
      ...attributes
    } = props

    const isExternal =
      external === 'auto'
        ? checkIfExternal(props.to || props.href)
        : isTrue(external)
    let tooltipTitle = props.title || props.target_blank_title
    if (isExternal === true) {
      tooltipTitle = props.target_blank_external_title
      attributes.target = '_blank'
    }
    // WCAG guide: https://www.w3.org/TR/WCAG20-TECHS/G201.html
    const showTooltip = attributes.target === '_blank' && !props.title

    // can be icon only or what ever content
    // because we then don't want to distract the link out
    // we make sure we hide the icon
    attributes.className = classnames(
      omitClass !== true && 'dnb-anchor',
      // omitClass && showTooltip && 'dnb-anchor--icon',
      className,
      props.target === '_blank' &&
        typeof children !== 'string' &&
        'dnb-anchor--no-icon'
    )

    return (
      <>
        <E is={element || 'a'} {...attributes} inner_ref={this._ref}>
          {children}
        </E>
        {showTooltip && (
          <Tooltip
            show_delay={100}
            id={this._id + '-tooltip'}
            target_element={this._ref}
            tooltip={tooltip}
          >
            {tooltipTitle}
          </Tooltip>
        )}
      </>
    )
  }
}

export default Anchor

function checkIfExternal(href) {
  if (!href || !href.startsWith('http')) {
    return false
  }
  if (typeof window !== 'undefined') {
    try {
      const { hostname } = new URL(href)
      return window.location.hostname !== hostname
    } catch (e) {
      //
    }
    return null
  }
  return false
}
