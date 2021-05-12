/**
 * Web Logo Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  validateDOMAttributes,
  registerElement,
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

export default class Logo extends React.PureComponent {
  static tagName = 'dnb-logo'
  static contextType = Context

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alt: PropTypes.string,
    color: PropTypes.string,
    class: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: null,
    ratio: 1.453690625,
    width: null,
    height: null,
    alt: 'DNB Logo',
    color: null,
    class: null,

    className: null,
  }

  static enableWebComponent() {
    registerElement(Logo.tagName, Logo, Logo.defaultProps)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Logo.defaultProps,
      this.context.getTranslation(this.props).Logo,
      this.context.FormRow,
      this.context.Logo
    )

    let {
      ratio,
      size,
      width,
      height,
      color,
      alt,
      className,
      class: _className,
      ...rest
    } = props

    if (parseFloat(size) > -1 && width === null && height === null) {
      width = size * ratio
      height = width / ratio
    } else if (parseFloat(width) > -1 && height === null) {
      height = width / ratio
    } else if (parseFloat(height) > -1 && width === null) {
      width = height * ratio
    }

    const rootParams = {
      className: classnames(
        'dnb-logo',
        className,
        _className,
        createSpacingClasses(props),
        (width > 0 || height > 0) && `dnb-logo--has-size`,
        size === 'inherit' && `dnb-logo--inherit-size`
      ),
      role: 'img',
      alt,
      ['data-ratio']: ratio,
      ['aria-hidden']: true,
      ...rest,
    }

    const svgParams = {
      viewBox: '0 0 93.0362 64', // these size are set to me associated with the svg path point values
    }

    if (parseFloat(width) > -1) svgParams['width'] = width
    if (parseFloat(height) > -1) svgParams['height'] = height
    if (color) svgParams['color'] = color

    validateDOMAttributes(this.props, rootParams)
    validateDOMAttributes(null, svgParams)

    return (
      <span {...rootParams}>
        <svg {...svgParams}>
          <title>DNB Logo</title>
          <path d="M89.668 31.9442a10.6487 10.6487 0 0 0-1.8465-1.2184l-.178-.0887.1554-.1337a8.7063 8.7063 0 0 0 2.7652-6.848c-.006-3.3331-1.1437-5.82-3.413-7.3936-1.9135-1.3528-4.5588-2.0142-8.092-2.0079l-10.1326.0182a1.081 1.081 0 0 0-1.0645 1.0685l.0597 33.2203a1.0667 1.0667 0 0 0 1.0685 1.0646l11.577-.0208c3.644-.0065 6.5758-.7897 8.684-2.3266a8.6558 8.6558 0 0 0 2.7937-3.4054 11.2675 11.2675 0 0 0 .9913-4.868 8.967 8.967 0 0 0-3.3681-7.0605zM71.1547 17.5795l7.9106-.0142q4.1997-.0076 6.202 1.3885c.8454.5985 2.003 1.752 2.0083 4.7074.0095 5.2883-4.1672 5.7179-5.4338 5.7201l-10.6659.0192zm9.4066 28.7366l-9.355.0168-.0244-13.6438 10.6659-.0191c4.6219-.0083 7.8707 2.6072 7.8774 6.3407.0033 1.8.0131 7.289-9.1639 7.3054z" />
          <path d="M22.4948 19.6221a14.0642 14.0642 0 0 0-5.5848-4.101 16.8443 16.8443 0 0 0-6.2238-1.1443l-9.6215.0173A1.086 1.086 0 0 0 0 15.4853L.0597 48.683a1.0668 1.0668 0 0 0 1.0686 1.0646l9.6214-.0173a16.3939 16.3939 0 0 0 6.2197-1.1667 13.8015 13.8015 0 0 0 5.57-4.0994c3.3924-4.1833 3.894-9.4508 3.889-12.2284-.0043-2.3544-.3927-8.2876-3.9336-12.6136zm-2.5144 22.758a11.615 11.615 0 0 1-9.2366 4.0615l-7.3773.0133-.0516-28.7535 7.3772-.0132a11.5412 11.5412 0 0 1 9.2512 4.0271c2.9396 3.5948 3.1714 8.9716 3.1742 10.5264.0042 2.3338-.3878 6.7559-3.137 10.1384z" />
          <path d="M59.9016 0l.0877 48.7976a.9801.9801 0 0 1-.6872.956.7852.7852 0 0 1-.311.0678 1.011 1.011 0 0 1-.8229-.4217L36.3643 21.7303l.076 42.2638L33.1294 64l-.0879-48.9083a.9989.9989 0 0 1 .7094-.956.706.706 0 0 1 .311-.045 1.0218 1.0218 0 0 1 .8229.3978l21.8038 27.6922L56.6128.0059z" />
        </svg>
      </span>
    )
  }
}
