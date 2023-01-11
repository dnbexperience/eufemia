/**
 * Card
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Button } from '@dnb/eufemia/src'
import classnames from 'classnames'
import { P, Span } from '@dnb/eufemia/src/elements'
import {
  liItemStyle,
  linkStyle,
  linkInnerStyle,
  boxStyle,
} from './Card.module.scss'

export default class Card extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    about: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
      .isRequired,
    icon: PropTypes.func,
  }
  isSelected() {
    if (typeof window !== 'undefined') {
      const { url } = this.props
      const { pathname } = window.location
      return pathname.length > 1 && pathname.includes(url)
    }
    return false
  }
  render() {
    const { url, title, about, icon: Svg } = this.props

    return (
      <li
        className={classnames(
          liItemStyle,
          this.isSelected() && 'is-selected'
        )}
      >
        <Link
          className={classnames(
            linkStyle,
            'dnb-anchor--no-style',
            this.isSelected() && 'current-card'
          )}
          to={url}
          aria-current={this.isSelected()}
        >
          <Span className={linkInnerStyle}>
            <Span className={boxStyle}>
              {Svg && <Svg />}
              <P className="dnb-p--lead">{title}</P>
              <P top="x-small">{about}</P>
            </Span>

            <Span aria-hidden top bottom>
              <Button
                variant="tertiary"
                icon="chevron_right"
                text="Read more"
                tabIndex="-1"
                element="span"
              />
            </Span>
          </Span>
        </Link>
      </li>
    )
  }
}
