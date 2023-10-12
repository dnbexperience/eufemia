/**
 * Card
 *
 */

import React from 'react'
import { Link } from '../tags/Anchor'
import classnames from 'classnames'
import { Button, P, Span } from '@dnb/eufemia/src'
import {
  liItemStyle,
  linkStyle,
  linkInnerStyle,
  boxStyle,
} from './Card.module.scss'

type MenuCardProps = {
  url: string
  title: React.ReactNode
  about: React.ReactNode
  icon: (props?: React.HTMLAttributes<JSX.Element>) => JSX.Element
}

export default function MenuCard(props: MenuCardProps) {
  const { url, title, about, icon: Svg } = props

  const isSelected = () => {
    if (typeof window !== 'undefined') {
      const { url } = props
      const { pathname } = window.location
      return pathname.length > 1 && pathname.includes(url)
    }
    return false
  }

  return (
    <li className={classnames(liItemStyle, isSelected() && 'is-selected')}>
      <Link
        className={classnames(
          linkStyle,
          'dnb-anchor--no-style',
          isSelected() && 'current-card',
        )}
        to={url}
        aria-current={isSelected()}
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
              tabIndex={-1}
              element="span"
            />
          </Span>
        </Span>
      </Link>
    </li>
  )
}
