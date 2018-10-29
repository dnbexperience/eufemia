/**
 * Card
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { css, cx } from 'react-emotion'

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const boxStyle = css`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  min-width: 33.333333%;
  padding: 0;
  margin: 0;
  border: none;

  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 100;

  &:hover {
    filter: grayscale(90%);
    transition: filter 0.5s ease;
    border: none;
  }

  @media (max-width: 640px) {
    & {
      min-width: 100%;
      transition: 0.5s;
      height: 240px;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1) translate3d(0, -8%, 0);
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
  }

  opacity: 0;
  animation: fade-in 600ms cubic-bezier(0.19, 1, 0.22, 1) 1 var(--delay)
    forwards;
`

const headerStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 6em;

  text-align: center;

  color: white;
  background-color: rgba(0, 0, 0, 0.15);

  @media (max-width: 640px) {
    & {
      height: 4em;
      transition: 0.5s;
    }
  }
`
const iconStyle = css`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`
const svgStyle = css``

export default class Card extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func
  }
  static defaultProps = {
    customStyle: null,
    onClick: null
  }
  render() {
    const { url, customStyle, title, icon: Svg, onClick } = this.props
    return (
      <Link
        css={cx(boxStyle, customStyle)}
        style={{ '--delay': `${random(1, 160)}ms` }}
        to={url}
        onClick={onClick}
      >
        <div css={iconStyle}>
          <Svg css={svgStyle} />
        </div>
        <span css={headerStyle}>{title}</span>
      </Link>
    )
  }
}
