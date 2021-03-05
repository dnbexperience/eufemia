/**
 * Card
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button } from '@dnb/eufemia/src'
import { IS_IE11 } from '@dnb/eufemia/src/shared/helpers'
import { MainMenuContext } from './MainMenuContext'
import classnames from 'classnames'
import { P } from '@dnb/eufemia/src/elements'

const CardWrapper = styled.div`
  width: calc(33.333333% - 1rem);

  margin: 0.5rem;
  padding: 0;

  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

  &,
  a {
    border-radius: 0.5rem;
  }
  &.is-selected a {
    background-color: var(--color-mint-green);
  }
  a:focus,
  a:hover {
    background-color: var(--color-mint-green-50);
  }

  /* mobile view */
  @media screen and (max-width: 40em) {
    & {
      min-width: calc(100% - 1rem);
      transition: 0.5s;
    }
  }

  [data-whatinput='keyboard'] &:focus {
    box-shadow: none;
  }
  &.show-cards {
    opacity: 0;
    animation: fade-in 600ms cubic-bezier(0.19, 1, 0.22, 1) 1 var(--delay)
      forwards;
  }
  &.hide-cards {
    opacity: 1;
    animation: fade-out 800ms cubic-bezier(0.19, 1, 0.22, 1) 1 var(--delay)
      forwards;
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

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1) translate3d(0, -8%, 0);
    }
  }

  /* IE11 fix */
  @media screen and (-ms-high-contrast: none) {
    &.show-cards {
      opacity: 1;
    }
    overflow: hidden;
    background-color: #fff;
    p {
      width: 20rem;
    }
  }
`

export const focusRing = css`
  box-shadow: 0 0 0 0.125rem var(--color-accent-yellow);
`

const linkStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
  text-align: center;
  font-weight: var(--font-weight-basis);

  background-color: var(--color-white);
  transition: background-color 0.5s ease;

  &:focus {
    outline: none;
  }
  html[data-whatinput='keyboard'] &:focus {
    ${focusRing}
  }
`
const LinkInner = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled(P)`
  margin: 0;

  text-align: center;
  font-size: var(--font-size-basis);
  color: var(--color-black-80);
`

const About = styled(P)`
  margin: 0.5rem 0 0;
  padding: 0 1rem;

  font-size: var(--font-size-basis);
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

export default class Card extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
    about: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
      .isRequired,
    icon: PropTypes.func.isRequired
  }
  static defaultProps = {
    customStyle: null
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
    const { url, customStyle, title, about, icon: Svg } = this.props

    // size is else defined in css
    const svgParams = IS_IE11 ? { width: '48', height: '48' } : null

    const Anchor = IS_IE11
      ? ({ children, to, ...rest }) =>
          to && (
            <a
              {...rest}
              href={url}
              onClick={(event) => {
                event.preventDefault()
                window.location.assign(url)
              }}
            >
              {children}
            </a>
          )
      : Link

    return (
      <MainMenuContext.Consumer>
        {({ isActive, isClosing, closeMenu }) => (
          <CardWrapper
            className={classnames(
              this.isSelected() && 'is-selected',
              isActive && !isClosing && 'show-cards',
              isClosing && 'hide-cards'
            )}
            style={{
              '--delay': `${isClosing ? random(1, 400) : random(1, 200)}ms`
            }}
          >
            <Anchor
              css={[linkStyle, customStyle]}
              className={classnames(
                'dnb-anchor--no-style',
                this.isSelected() && 'current-card'
              )}
              to={url}
              aria-current={this.isSelected()}
              onClick={closeMenu}
            >
              <LinkInner>
                <Box>
                  <Svg {...svgParams} />
                  <Header className={classnames('dnb-lead')}>
                    {title}
                  </Header>
                  <About>{about}</About>
                </Box>

                <BottomWrapper aria-hidden>
                  <Button
                    variant="tertiary"
                    icon="chevron_right"
                    text="Read more"
                    tabIndex="-1"
                  />
                </BottomWrapper>
              </LinkInner>
            </Anchor>
          </CardWrapper>
        )}
      </MainMenuContext.Consumer>
    )
  }
}

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
