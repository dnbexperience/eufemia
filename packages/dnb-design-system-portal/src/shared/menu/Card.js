/**
 * Card
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Button } from 'dnb-ui-lib/src'
import { isIE11 } from 'dnb-ui-lib/src/components/icon'

const CardWrapper = styled.div`
  width: calc(33.333333% - 1rem);

  margin: 0.5rem;
  padding: 0;

  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

  &,
  a {
    border-radius: 0.5rem;
  }

  /* mobile view */
  @media (max-width: 640px) {
    & {
      min-width: calc(100% - 1rem);
      transition: 0.5s;
    }
  }

  [data-whatinput='keyboard'] &:focus {
    box-shadow: none;
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

const linkStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
  text-align: center;
  font-weight: 100;

  background-color: var(--color-white);
  transition: background-color 0.5s ease;

  ${'' /* transition: transform ease-out 0.5s;
  transform: scale3d(1, 1, 1); */}

  &:focus,
  &:hover {
    background-color: var(--color-mint-green-50);
    ${'' /* transform: scale3d(1.02, 1.02, 1);
    transition: transform ease-out 0.3s; */}
  }
`

const Header = styled.h3`
  margin: 0;

  text-align: center;
  font-size: 1rem;
  ${'' /* font-weight: 600; */}
  ${'' /* font-family: Sindre is using either boor nor demi, he uses std normal  */}
  color: var(--color-black-80);
`

const About = styled.p`
  margin: 0.5rem 0 0;
  padding: 0 1rem;

  font-size: 1rem;
  color: var(--color-black);
`

const Box = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 3rem;
    height: 3rem;
    margin: 3rem 0 2rem;
  }
`
const BottomWrapper = styled.span`
  margin: 2rem 0;
`

export default class Card extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func
  }
  static defaultProps = {
    customStyle: null,
    onClick: null
  }
  render() {
    const {
      url,
      customStyle,
      title,
      about,
      icon: Svg,
      onClick
    } = this.props

    // size is else defined in css
    const svgParams = isIE11 ? { width: '48', height: '48' } : null

    return (
      <CardWrapper
        className="card-wrapper"
        style={{ '--delay': `${random(1, 160)}ms` }}
      >
        <Link
          css={[linkStyle, customStyle]}
          className="dnb-no-anker-style"
          to={url}
          onClick={onClick}
        >
          <Box>
            <Svg {...svgParams} />
            <Header>{title}</Header>

            <About>{about}</About>
          </Box>

          <BottomWrapper>
            <Button
              variant="tertiary"
              icon="add"
              text="Read more"
              tabindex="-1"
            />
          </BottomWrapper>
        </Link>
      </CardWrapper>
    )
  }
}

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
