/**
 * Card
 *
 */

import type { HTMLAttributes, JSX, ReactNode } from 'react'
import { Link } from '../tags/Anchor'
import { Button, Card, Lead, P } from '@dnb/eufemia/src'
import { cardItemStyle } from './MainMenu.module.scss'

type MenuCardProps = {
  url: string
  title: ReactNode
  about: ReactNode
  icon: (props?: HTMLAttributes<JSX.Element>) => JSX.Element
}

export default function MenuCard(props: MenuCardProps) {
  const { url, title, about, icon: Svg } = props

  return (
    <Card.ListItem center="when-small" className={cardItemStyle}>
      <Card.Action to={url} element={Link} stack dropShadow>
        {Svg && <Svg />}
        <Lead>{title}</Lead>
        <P top="x-small">{about}</P>

        <Button
          variant="tertiary"
          icon="chevron_right"
          text="Read more"
          element="span"
        />
      </Card.Action>
    </Card.ListItem>
  )
}
