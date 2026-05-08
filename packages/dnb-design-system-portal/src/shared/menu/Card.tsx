/**
 * Card
 *
 */

import type { HTMLAttributes, JSX, ReactNode } from 'react'
import { Link } from '../tags/Anchor'
import styled from '@emotion/styled'
import { Button, Card, P } from '@dnb/eufemia/src'

type MenuCardProps = {
  url: string
  title: ReactNode
  about: ReactNode
  icon: (props?: HTMLAttributes<JSX.Element>) => JSX.Element
}

export default function MenuCard(props: MenuCardProps) {
  const { url, title, about, icon: Svg } = props

  return (
    <StyledLi>
      <StyledLink to={url}>
        <StyledCard stack dropShadow>
          {Svg && <Svg />}
          <P className="dnb-p--lead">{title}</P>
          <P top="x-small">{about}</P>

          <Button
            variant="tertiary"
            icon="chevron_right"
            text="Read more"
            tabIndex={-1}
            element="span"
          />
        </StyledCard>
      </StyledLink>
    </StyledLi>
  )
}

const StyledLi = styled.li`
  list-style-type: none;
  width: calc(33.333333% - 1rem);

  &:hover {
    z-index: 1;
  }

  @media screen and (max-width: 60em) {
    width: calc(50% - 1rem);
  }
  @media screen and (min-width: 40em) {
    margin: 0.5rem;
  }
  @media screen and (max-width: 40em) {
    width: 100%;
    text-align: center;

    .dnb-card {
      align-items: center;

      > .dnb-flex-container--align-stretch > .dnb-button {
        align-self: center;
      }
    }
  }
`

const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }

  &:hover .dnb-card {
    --card-outline-color: var(--token-color-stroke-action-hover);
  }
  &:focus-visible .dnb-card {
    --card-outline-color: var(--token-color-stroke-action-focus);
    --card-outline-width: var(--focus-ring-width);
  }
`

const StyledCard = styled(Card)`
  height: 100%;

  svg {
    align-self: center;
    color: var(--token-color-icon-neutral);
  }
`
