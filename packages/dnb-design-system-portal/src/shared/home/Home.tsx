/**
 * Portal home
 */

import Anchor, { Link } from '../tags/Anchor'
import { Card, H1, H2, P, Span } from '@dnb/eufemia/src'
import {
  actionArtworkStyle,
  actionDescriptionStyle,
  actionGridStyle,
  actionStyle,
  actionTitleStyle,
  developArtworkStyle,
  designArtworkStyle,
  heroStyle,
  introStyle,
  resourceGridStyle,
  resourcesStyle,
  rootStyle,
  titleStyle,
} from './Home.module.scss'

const resources = [
  { title: 'Images', url: '/uilib/usage/best-practices' },
  { title: 'Animations', url: '/uilib/components/height-animation' },
  { title: 'Icons', url: '/icons' },
  { title: 'Theming', url: '/uilib/usage/customisation/theming' },
  { title: 'Grid', url: '/uilib/layout/grid' },
  {
    title: 'Tokens',
    url: '/uilib/usage/customisation/theming/design-tokens',
  },
]

export default function Home() {
  return (
    <div className={rootStyle} data-portal-home>
      <section className={heroStyle} aria-labelledby="welcome-heading">
        <H1
          id="welcome-heading"
          className={titleStyle}
          top={false}
          bottom={false}
        >
          Welcome to Eufemia
        </H1>
        <P className={introStyle} top={false} bottom={false}>
          Eufemia is DNB's design system, providing resources for designers
          and developers to create consistent and efficient experiences
          across web and native platforms.
        </P>
      </section>

      <nav aria-label="Get started">
        <Card.List className={actionGridStyle}>
          <Card.ListItem>
            <Card.Action
              to="/quickguide-designer"
              element={Link}
              className={actionStyle}
              responsive={false}
              stack
              gap="x-small"
              backgroundColor="var(--token-color-background-neutral-subtle)"
              outline="var(--token-color-stroke-neutral-subtle)"
            >
              <span
                className={`${actionArtworkStyle} ${designArtworkStyle}`}
                aria-hidden
              />
              <H2
                className={actionTitleStyle}
                size="x-large"
                top={false}
                bottom={false}
              >
                Design
              </H2>
              <P
                className={actionDescriptionStyle}
                top={false}
                bottom={false}
              >
                Figma UI kits and more
              </P>
            </Card.Action>
          </Card.ListItem>

          <Card.ListItem>
            <Card.Action
              to="/uilib/getting-started"
              element={Link}
              className={actionStyle}
              responsive={false}
              stack
              gap="x-small"
              backgroundColor="var(--token-color-background-neutral-subtle)"
              outline="var(--token-color-stroke-neutral-subtle)"
            >
              <span
                className={`${actionArtworkStyle} ${developArtworkStyle}`}
                aria-hidden
              />
              <H2
                className={actionTitleStyle}
                size="x-large"
                top={false}
                bottom={false}
              >
                Develop
              </H2>
              <P
                className={actionDescriptionStyle}
                top={false}
                bottom={false}
              >
                Get started with installation guides
              </P>
            </Card.Action>
          </Card.ListItem>
        </Card.List>
      </nav>

      <section
        className={resourcesStyle}
        aria-labelledby="resources-heading"
      >
        <H2
          id="resources-heading"
          size="x-large"
          top={false}
          bottom="medium"
        >
          Resources
        </H2>
        <nav className={resourceGridStyle} aria-label="Resources">
          {resources.map(({ title, url }) => (
            <Anchor key={title} href={url}>
              <Span size="x-large">{title}</Span>
            </Anchor>
          ))}
        </nav>
      </section>
    </div>
  )
}
