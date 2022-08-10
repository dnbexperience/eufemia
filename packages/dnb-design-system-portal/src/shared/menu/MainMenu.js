/**
 * Main Menu
 *
 */

import React from 'react'
import { css, Global } from '@emotion/react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import classnames from 'classnames'
import Card, { focusRing } from './Card'
import keycode from 'keycode'
import {
  UilibSvg,
  BrandSvg,
  IconsSvg,
  QuickguideDesignerSvg,
  DesignSystemSvg,
  DevelopmentSvg,
} from './MainMenuGraphics'
import { Logo, Button, VisuallyHidden } from '@dnb/eufemia/src'
import packageJson from '../../../package.json'
import { MainMenuContext } from './MainMenuContext'
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/src/shared/helpers'
import { SearchBarInput } from './SearchBar'

function MainWrapper({ className, isOpen, children, ...rest }) {
  React.useEffect(() => {
    if (isOpen) {
      applyPageFocus('mainmenu')
    }

    return () => {
      applyPageFocus('content')
    }
  }, [isOpen])

  return (
    <MainWrapperStyled
      tabIndex="-1"
      className={classnames('main-menu', 'dnb-no-focus', className)}
      {...rest}
    >
      {children}
    </MainWrapperStyled>
  )
}

const MainWrapperStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  @media screen and (max-width: 40em), (max-height: 55em) {
    height: auto;
  }

  &.is-overlay {
    position: absolute;
    z-index: 4001; /* one more than sticky Bar = styled.div */
    top: 0;
    left: 0;
    @media (min-height: 55em) {
      position: fixed;
      height: 100%;
    }
  }

  html[data-whatinput='keyboard'] & .close-button:focus {
    ${focusRing}
  }

  background-color: transparent;
  transition: background-color ease-out 0.8s;

  &.is-open&:not(.is-closing),
  &:not(.is-overlay) {
    background-color: var(--color-emerald-green);
  }

  /* IE11 fix */
  @media screen and (-ms-high-contrast: none) {
    background-color: #14555a;
  }
`

const ContentWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: 5vh;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* IE11 fix */
  @media screen and (-ms-high-contrast: none) {
    width: auto;
    left: 48%;
    color: #fff;
  }

  @media screen and (max-width: 40em) {
    .dnb-drawer-list__list {
      left: auto;
      right: -20vw;
      width: 90vw;
    }
  }
`

const LogoFigure = styled.figure`
  display: flex;
  align-items: center;

  color: var(--color-white);

  .dnb-logo {
    margin-right: 1rem;
    color: inherit;
  }

  @media (max-height: 55em) {
    display: none;
  }

  margin-bottom: 2vh;
`

const CardsWrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  padding: 0;

  max-width: 60rem;

  @media screen and (max-width: 40em), (max-height: 55em) {
    margin-top: 16vh;
  }
`

const Toolbar = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 16vh;

  opacity: 0;
  animation: toolbar-fade-in 800ms ease-out 1 0.6s forwards;

  @keyframes toolbar-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const LastUpdated = styled.span`
  display: block;
  font-size: var(--font-size-small);
`

const customBodyStyle = css`
  body {
    transition: background-color ease-out 1.2s;
    background-color: var(--color-emerald-green);
  }
`
const toggleContent = css`
  /* hide content if shown as overlay menu */
  .dnb-skip-link,
  .sticky-menu,
  .content-wrapper {
    display: none !important;
  }
`

function MainMenu(props) {
  const context = React.useContext(MainMenuContext)
  const { closeMenu, isOpen, isClosing, isActive, openAsMenu } = context
  const { enableOverlay } = props

  React.useEffect(() => {
    const onKeyDownHandler = (e) => {
      switch (keycode(e)) {
        case 'esc':
          if (context.isOpen) {
            context.closeMenu()
          }
          break
      }
    }

    setPageFocusElement('a.current-card', 'mainmenu')
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onKeyDownHandler)
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', onKeyDownHandler)
      }
    }
  }, [])

  const data = useStaticQuery(graphql`
    query {
      categories: allMdx(
        filter: {
          slug: {
            in: [
              "uilib"
              "quickguide-designer"
              "icons"
              "design-system"
              "brand"
              "principles"
              "contribute"
            ]
          }
        }
      ) {
        edges {
          node {
            slug
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `)

  const {
    categories: { edges },
  } = data

  const items = edges.reduce((acc, { node: { slug, frontmatter } }) => {
    acc[slug] = {
      url: `/${slug}/`,
      slug,
      ...frontmatter,
    }
    return acc
  }, {})

  return (
    (isActive || !enableOverlay) && (
      <>
        <h1 id="welcome-heading" className="dnb-sr-only">
          Welcome to Eufemia
        </h1>
        <MainWrapper
          aria-labelledby="welcome-heading"
          className={classnames(
            enableOverlay && 'is-overlay',
            isOpen && 'is-open',
            isClosing && 'is-closing'
          )}
          {...{ isOpen }}
        >
          <>
            <Global styles={customBodyStyle} />
            {isOpen && !isClosing && <Global styles={toggleContent} />}
            {(enableOverlay && (
              <Toolbar className={classnames(isClosing && 'is-closing')}>
                {isOpen && !isClosing && (
                  <Button
                    variant="secondary"
                    className="close-button dnb-always-focus"
                    on_click={closeMenu}
                    icon="close"
                    icon_position="left"
                    text="Close"
                    aria-label="Close Main Menu"
                  />
                )}
              </Toolbar>
            )) ||
              (!enableOverlay && (
                <ContentWrapper>
                  <LogoFigure>
                    <Logo size="48" />
                    <figcaption>
                      <VisuallyHidden>DNB</VisuallyHidden>
                      Eufemia
                    </figcaption>
                  </LogoFigure>
                  <SearchBarInput />
                </ContentWrapper>
              ))}
            <CardsWrapper
              aria-labelledby={openAsMenu ? 'toggle-main-menu' : undefined}
            >
              <Card
                url={items['design-system']?.url}
                title={items['design-system']?.title}
                about={
                  <>
                    {items['design-system']?.description}
                    <LastUpdated title="Last Change log update">
                      Updated: {packageJson.changelogVersion}
                    </LastUpdated>
                  </>
                }
                icon={DesignSystemSvg}
              />
              <Card
                url={items['uilib']?.url}
                title={items['uilib']?.title}
                about={items['uilib']?.description}
                icon={UilibSvg}
              />
              <Card
                url={items['quickguide-designer']?.url}
                title={items['quickguide-designer']?.title}
                about={items['quickguide-designer']?.description}
                icon={QuickguideDesignerSvg}
              />
              <Card
                url={items['icons']?.url}
                title={items['icons']?.title}
                about={items['icons']?.description}
                icon={IconsSvg}
              />
              <Card
                url={items['brand']?.url}
                title={items['brand']?.title}
                about={items['brand']?.description}
                icon={BrandSvg}
              />
              <Card
                url={items['contribute']?.url}
                title={items['contribute']?.title}
                about={items['contribute']?.description}
                icon={DevelopmentSvg}
              />
            </CardsWrapper>
          </>
        </MainWrapper>
      </>
    )
  )
}

export default MainMenu
