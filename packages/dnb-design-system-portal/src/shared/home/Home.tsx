/**
 * Portal home
 */

import Anchor, { Link } from '../tags/Anchor'
import { Card, H2, P, Span } from '@dnb/eufemia/src'
import homeData from './HomeData.json'
import HomeHero from './HomeHero'
import {
  actionArtworkStyle,
  actionDescriptionStyle,
  actionGridStyle,
  actionStyle,
  actionTitleStyle,
  developArtworkStyle,
  designArtworkStyle,
  resourceGridStyle,
  resourcesStyle,
  rootStyle,
} from './Home.module.scss'

export default function Home() {
  return (
    <div className={rootStyle} data-portal-home>
      <HomeHero />

      <nav aria-label="Get started">
        <Card.List className={actionGridStyle}>
          {homeData.actions.map(({ title, url, description }, index) => (
            <Card.ListItem key={url}>
              <Card.Action
                href={url}
                element={Link}
                className={actionStyle}
                responsive={false}
                stack
                gap="x-small"
                backgroundColor="var(--token-color-background-neutral-subtle)"
                outline="var(--token-color-stroke-neutral-subtle)"
              >
                <span
                  className={`${actionArtworkStyle} ${index === 0 ? designArtworkStyle : developArtworkStyle}`}
                  aria-hidden
                />
                <H2
                  className={actionTitleStyle}
                  size="x-large"
                  top={false}
                  bottom={false}
                >
                  {title}
                </H2>
                <P
                  className={actionDescriptionStyle}
                  top={false}
                  bottom={false}
                >
                  {description}
                </P>
              </Card.Action>
            </Card.ListItem>
          ))}
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
          {homeData.resources.map(({ title, url }) => (
            <Anchor
              key={title}
              href={url}
              icon="arrow_right"
              iconPosition="right"
            >
              <Span size="x-large">{title}</Span>
            </Anchor>
          ))}
        </nav>
      </section>
    </div>
  )
}
