/**
 * Portal home
 */

import Anchor, { Link } from '../tags/Anchor'
import { Card, H1, H2, P, Span } from '@dnb/eufemia/src'
import homeData from './HomeData.json'
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
          {homeData.title}
        </H1>
        <P className={introStyle} top={false} bottom={false}>
          {homeData.introduction}
        </P>
      </section>

      <nav aria-label="Get started">
        <Card.List className={actionGridStyle}>
          <Card.ListItem>
            <Card.Action
              href={homeData.actions[0].url}
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
                {homeData.actions[0].title}
              </H2>
              <P
                className={actionDescriptionStyle}
                top={false}
                bottom={false}
              >
                {homeData.actions[0].description}
              </P>
            </Card.Action>
          </Card.ListItem>

          <Card.ListItem>
            <Card.Action
              href={homeData.actions[1].url}
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
                {homeData.actions[1].title}
              </H2>
              <P
                className={actionDescriptionStyle}
                top={false}
                bottom={false}
              >
                {homeData.actions[1].description}
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
