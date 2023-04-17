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
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

export default class Logo extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    brand: PropTypes.string,
    variant: PropTypes.string,
    alt: PropTypes.string,
    color: PropTypes.string,
    inherit_color: PropTypes.bool,
    class: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: null,
    ratio: 1.453690625,
    width: null,
    height: null,
    brand: null,
    variant: 'default',
    alt: 'DNB Logo',
    color: null,
    inherit_color: null,
    class: null,
    className: null,
  }

  static sbankenProps = {
    ratio: 4.72289156626506,
    brand: 'sbanken',
    alt: 'Sbanken logo',
  }

  static sbankenCompactProps = {
    ratio: 0.772727272727273,
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Logo.defaultProps,
      this.context.getTranslation(this.props).Logo,
      this.context.Logo
    )

    let {
      ratio,
      size,
      width,
      height,
      brand,
      variant,
      color,
      inherit_color,
      alt,
      className,
      class: _className,
      ...rest
    } = props

    if (brand == null && this.context.theme) {
      // Attempt to get theme from context
      brand = this.context.theme.name
    }

    if (brand === 'sbanken') {
      ratio = Logo.sbankenProps.ratio
      alt = Logo.sbankenProps.alt

      if (variant === 'compact') {
        ratio = Logo.sbankenCompactProps.ratio
      }
    }

    if (parseFloat(size) > -1 && width === null && height === null) {
      width = size * ratio
      height = width / ratio
    } else if (parseFloat(width) > -1 && height === null) {
      height = width / ratio
    } else if (parseFloat(height) > -1 && width === null) {
      width = height * ratio
    }

    const rootParams = {
      ui: {
        className: classnames(
          'dnb-logo',
          className,
          _className,
          createSpacingClasses(props),
          (width > 0 || height > 0) && 'dnb-logo--has-size',
          size === 'inherit' && 'dnb-logo--inherit-size',
          inherit_color && 'dnb-logo--inherit-color'
        ),
        role: 'img',
        alt,
        ['data-ratio']: ratio,
        ['aria-hidden']: true,
        ...rest,
      },
      sbanken: {
        className: classnames(
          'sbanken-logo',
          className,
          _className,
          createSpacingClasses(props),
          (width > 0 || height > 0) && 'sbanken-logo--has-size',
          size === 'inherit' && 'sbanken-logo--inherit-size',
          inherit_color && 'sbanken-logo--inherit-color'
        ),
        role: 'img',
        alt,
        ['data-ratio']: ratio,
        ['aria-hidden']: true,
        ...rest,
      },
    }

    const svgParams = {
      ui: {
        default: {
          viewBox: '0 0 93.0362 64', // these size are set to me associated with the svg path point values
        },
      },
      sbanken: {
        default: {
          viewBox: '0 0 392 83',
        },
        compact: {
          viewBox: '0 0 17 22',
        },
      },
    }

    if (parseFloat(width) > -1) {
      svgParams.ui.default['width'] = width
      svgParams.sbanken.default['width'] = width
      svgParams.sbanken.compact['width'] = width
    }
    if (parseFloat(height) > -1) {
      svgParams.ui.default['height'] = height
      svgParams.sbanken.default['height'] = height
      svgParams.sbanken.compact['height'] = height
    }
    if (color) {
      svgParams.ui.default['color'] = color
      svgParams.sbanken.default['color'] = color
      svgParams.sbanken.compact['color'] = color
    }

    validateDOMAttributes(this.props, rootParams)
    validateDOMAttributes(null, svgParams.ui.default)
    validateDOMAttributes(null, svgParams.sbanken.default)
    validateDOMAttributes(null, svgParams.sbanken.compact)

    const logos = {
      ui: {
        default: (
          <svg {...svgParams.ui.default}>
            <title>{alt}</title>
            <path d="M89.668 31.9442a10.6487 10.6487 0 0 0-1.8465-1.2184l-.178-.0887.1554-.1337a8.7063 8.7063 0 0 0 2.7652-6.848c-.006-3.3331-1.1437-5.82-3.413-7.3936-1.9135-1.3528-4.5588-2.0142-8.092-2.0079l-10.1326.0182a1.081 1.081 0 0 0-1.0645 1.0685l.0597 33.2203a1.0667 1.0667 0 0 0 1.0685 1.0646l11.577-.0208c3.644-.0065 6.5758-.7897 8.684-2.3266a8.6558 8.6558 0 0 0 2.7937-3.4054 11.2675 11.2675 0 0 0 .9913-4.868 8.967 8.967 0 0 0-3.3681-7.0605zM71.1547 17.5795l7.9106-.0142q4.1997-.0076 6.202 1.3885c.8454.5985 2.003 1.752 2.0083 4.7074.0095 5.2883-4.1672 5.7179-5.4338 5.7201l-10.6659.0192zm9.4066 28.7366l-9.355.0168-.0244-13.6438 10.6659-.0191c4.6219-.0083 7.8707 2.6072 7.8774 6.3407.0033 1.8.0131 7.289-9.1639 7.3054z" />
            <path d="M22.4948 19.6221a14.0642 14.0642 0 0 0-5.5848-4.101 16.8443 16.8443 0 0 0-6.2238-1.1443l-9.6215.0173A1.086 1.086 0 0 0 0 15.4853L.0597 48.683a1.0668 1.0668 0 0 0 1.0686 1.0646l9.6214-.0173a16.3939 16.3939 0 0 0 6.2197-1.1667 13.8015 13.8015 0 0 0 5.57-4.0994c3.3924-4.1833 3.894-9.4508 3.889-12.2284-.0043-2.3544-.3927-8.2876-3.9336-12.6136zm-2.5144 22.758a11.615 11.615 0 0 1-9.2366 4.0615l-7.3773.0133-.0516-28.7535 7.3772-.0132a11.5412 11.5412 0 0 1 9.2512 4.0271c2.9396 3.5948 3.1714 8.9716 3.1742 10.5264.0042 2.3338-.3878 6.7559-3.137 10.1384z" />
            <path d="M59.9016 0l.0877 48.7976a.9801.9801 0 0 1-.6872.956.7852.7852 0 0 1-.311.0678 1.011 1.011 0 0 1-.8229-.4217L36.3643 21.7303l.076 42.2638L33.1294 64l-.0879-48.9083a.9989.9989 0 0 1 .7094-.956.706.706 0 0 1 .311-.045 1.0218 1.0218 0 0 1 .8229.3978l21.8038 27.6922L56.6128.0059z" />
          </svg>
        ),
      },
      sbanken: {
        default: (
          <svg {...svgParams.sbanken.default}>
            <title>{alt}</title>
            <path d="M349.36 81V27.85h7.83v5.12h.2a15.9 15.9 0 0 1 6.33-4.77 20.78 20.78 0 0 1 8.64-1.85c5.76 0 10.38 1.77 13.86 5.32 3.49 3.54 5.23 8.35 5.23 14.43V81h-8.24V48.7c0-9.9-4.02-14.84-12.06-14.84-4.15 0-7.44 1.17-9.89 3.5-2.45 2.35-3.67 5.6-3.67 9.73V81h-8.23z" />
            <path d="M299.43 50.32h31.65a19.39 19.39 0 0 0-4.03-11.63c-2.54-3.28-6.46-4.92-11.75-4.92-5.16 0-9.07 1.75-11.75 5.26a18.76 18.76 0 0 0-4.12 11.29zm31.85 14.23l6.72 4.42a26.4 26.4 0 0 1-8.58 9.67c-3.72 2.57-8.3 3.87-13.72 3.87-7.23 0-13.2-2.56-17.88-7.68-4.68-5.11-7.03-11.91-7.03-20.4 0-8.5 2.3-15.3 6.88-20.41 4.59-5.11 10.47-7.67 17.63-7.67 7.17 0 12.98 2.5 17.43 7.52 4.46 5.01 6.68 11.87 6.68 20.55v2.41h-40.18c.07 5.08 1.49 9.4 4.27 12.94 2.78 3.54 6.78 5.31 12 5.31 2.41 0 4.54-.31 6.38-.95a11.68 11.68 0 0 0 4.52-2.7 21.8 21.8 0 0 0 2.67-3.11c.6-.9 1.23-1.96 1.9-3.16l.3-.6z" />
            <polygon points="265.763 48.91 285.249 27.854 274.3 27.854 251.898 52.218 251.699 52.218 251.699 7.525 243.46 7.525 243.46 80.997 251.699 80.997 251.699 62.547 259.432 54.024 259.634 54.024 277.716 80.997 287.66 80.997" />
            <path d="M188.11 81V27.85h7.83v5.12h.2a15.92 15.92 0 0 1 6.33-4.77 20.78 20.78 0 0 1 8.64-1.85c5.76 0 10.38 1.77 13.87 5.32 3.48 3.54 5.22 8.35 5.22 14.43V81h-8.24V48.7c0-9.9-4.01-14.84-12.05-14.84-4.15 0-7.45 1.17-9.9 3.5-2.44 2.35-3.66 5.6-3.66 9.73V81h-8.24z" />
            <path d="M152.75 57.04c-4.55 1.26-7.65 2.63-9.3 4.1a7.31 7.31 0 0 0-2.46 5.72c0 5.55 3.52 8.33 10.56 8.33 4.82 0 8.53-1.1 11.14-3.27 2.61-2.16 3.92-4.82 3.92-7.97V50.72h-.2c-.94 1.94-5.5 4.04-13.66 6.32zM167.41 81v-5.81h-.2c-1 1.73-2.9 3.39-5.72 4.95-2.81 1.58-6.33 2.36-10.55 2.36-5.9 0-10.4-1.43-13.51-4.3a14.11 14.11 0 0 1-4.67-10.83c0-4.42 1.39-7.88 4.17-10.39 2.78-2.5 7.42-4.6 13.91-6.26 5.56-1.4 9.5-2.71 11.8-3.92 2.32-1.2 3.47-3 3.47-5.4 0-2.21-1-4.06-3.01-5.53-2.01-1.46-4.72-2.2-8.14-2.2-7.1 0-11.42 3.5-12.96 10.53l-7.63-2.2c.8-4.62 3-8.38 6.58-11.29 3.58-2.9 8.15-4.36 13.71-4.36 5.96 0 10.81 1.5 14.56 4.51 3.76 3 5.63 7.09 5.63 12.24V81h-7.44z" />
            <path d="M112.37 69.67c-2.75 3.6-6.77 5.41-12.06 5.41-3.88 0-7.13-1.16-9.74-3.5-2.62-2.34-3.92-5.08-3.92-8.23V46.91c0-3.35 1.24-6.38 3.72-9.08 2.47-2.7 5.79-4.06 9.94-4.06 5.3 0 9.31 1.8 12.06 5.41 2.74 3.61 4.11 8.7 4.11 15.24 0 6.56-1.37 11.64-4.11 15.25m-10.75-43.32c-6.1 0-11.02 2.2-14.77 6.62h-.2V7.52h-8.24V81h7.44v-5.12h.2c1.4 1.68 3.46 3.2 6.17 4.57a20.57 20.57 0 0 0 9.4 2.05c7.03 0 12.67-2.55 16.93-7.67 4.25-5.11 6.38-11.91 6.38-20.4 0-8.42-2.2-15.21-6.59-20.36a21 21 0 0 0-16.72-7.72" />
            <path d="M63.35 7.52A7.53 7.53 0 1 1 48.3 7.5a7.53 7.53 0 0 1 15.06.02" />
            <path d="M25.72 38.18c-8.9-3.8-12.8-6-12.8-10.93 0-5.53 4.5-10.03 10.04-10.03 6.15 0 9.85 3.01 11.04 8.95l9.41-2.34c-2.25-10.13-9.86-16.3-20.45-16.3A19.77 19.77 0 0 0 3.2 27.24c0 11.84 10.37 16.28 18.7 19.84 8.65 3.7 13.96 6.3 13.96 12.75a12.9 12.9 0 0 1-12.9 12.88c-6.91 0-12.09-4.61-13.53-11.9L0 63.18c2.5 11.46 11.6 19.25 22.96 19.25a22.62 22.62 0 0 0 22.61-22.58c0-13.16-11-17.87-19.85-21.66" />
          </svg>
        ),
        compact: (
          <svg {...svgParams.sbanken.compact}>
            <title>{alt}</title>
            <path d="M16.17 1.93c0 1.06-.88 1.94-1.94 1.94a1.95 1.95 0 0 1-1.93-1.94C12.3.88 13.17 0 14.23 0s1.94.88 1.94 1.93z" />
            <path d="M6.58 9.78C4.33 8.8 3.31 8.26 3.31 6.97A2.57 2.57 0 0 1 5.9 4.39c1.57 0 2.53.78 2.8 2.3l2.4-.6A5.13 5.13 0 0 0 5.84 1.9 5.08 5.08 0 0 0 .78 6.97c0 3.04 2.67 4.19 4.79 5.06 2.2.97 3.59 1.61 3.59 3.27 0 1.8-1.47 3.32-3.32 3.32-1.74 0-3.08-1.2-3.45-3.04l-2.39.6c.64 2.95 2.95 4.93 5.84 4.93a5.8 5.8 0 0 0 5.8-5.8c0-3.32-2.8-4.57-5.06-5.53z" />
          </svg>
        ),
      },
    }

    let selectedLogo = logos.ui.default
    let selectedLogoRootParams = rootParams.ui
    if (brand === 'sbanken') {
      selectedLogoRootParams = rootParams.sbanken
      switch (variant) {
        case 'compact':
          selectedLogo = logos.sbanken.compact
          break
        default:
          selectedLogo = logos.sbanken.default
      }
    }

    return <span {...selectedLogoRootParams}>{selectedLogo}</span>
  }
}
