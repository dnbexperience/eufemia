/**
 * List all the Icons available
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'dnb-ui-lib/src/components'
import { P } from 'dnb-ui-lib/src/elements'
import * as PrimaryIcons from 'dnb-ui-lib/src/icons/primary_icons'
import * as SecondaryIcons from 'dnb-ui-lib/src/icons/secondary_icons'
import * as PrimaryIconsMedium from 'dnb-ui-lib/src/icons/primary_icons_medium'
import * as SecondaryIconsMedium from 'dnb-ui-lib/src/icons/secondary_icons_medium'
import iconsMetaData from 'dnb-ui-lib/src/icons/icons-meta.json'
import styled from '@emotion/styled'
import AutoLinkHeader from '../../tags/AutoLinkHeader'

export const getListOfIcons = (icons) => {
  return Object.entries(icons)
    .map(([iconName, Svg]) => {
      const meta =
        iconsMetaData && iconsMetaData[iconName]
          ? iconsMetaData[iconName]
          : { tags: [], created: Date.now() }
      const category = grabCategory(meta.name)
      return { iconName, Svg, category, ...meta }
    })
    .sort((a, b) => {
      return a.created < b.created ? 1 : -1
    })
}

const grabCategory = (name) => {
  return String(name).split(/\//)[0]
}

export default class Icons extends React.PureComponent {
  state = { iconsToRender: [] }
  static propTypes = {
    variant: PropTypes.string
  }
  static defaultProps = {
    variant: null
  }
  constructor(props) {
    super(props)

    let icons = {}
    switch (props.variant) {
      case 'primary':
        icons = PrimaryIcons
        break

      case 'secondary':
        icons = SecondaryIcons
        break

      default:
        icons = { ...PrimaryIcons, ...SecondaryIcons }
        break
    }

    this.state.iconsToRender = getListOfIcons(icons)
  }
  render() {
    if (this.state.iconsToRender.length === 0) {
      return <></>
    }

    const icons = this.state.iconsToRender.map(
      ({ iconName, Svg, variant, tags }) => {
        const SvgMedium = (variant === 'primary'
          ? PrimaryIconsMedium
          : SecondaryIconsMedium)[`${iconName}_medium`]
        return (
          <ListItem key={iconName}>
            <ListItemInner>
              <figure aria-labelledby={`icon-${iconName}`} aria-hidden>
                {(SvgMedium && (
                  <Icon icon={SvgMedium} size="medium" />
                )) || <Icon icon={Svg} />}
              </figure>

              <AutoLinkHeader
                level={3}
                size="medium"
                element="figcaption"
                useSlug={iconName}
              >
                {iconName}
              </AutoLinkHeader>

              <P>{tags.length > 0 ? tags.join(', ') : '(no tags)'}</P>
            </ListItemInner>
          </ListItem>
        )
      }
    )
    return <List>{icons}</List>
  }
}

const List = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-end;

  padding: 0;
  margin: 0;
`

const ListItemInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  align-content: center;
  text-align: center;

  padding: 0.5rem 0;

  figure {
    margin: 2rem;
  }

  .dnb-h--medium,
  .dnb-spacing & .dnb-h--medium {
    margin: 0;
    white-space: nowrap;
  }
  .dnb-p,
  .dnb-spacing & .dnb-p {
    margin: 0;
    padding: 0;
  }

  .dnb-icon {
    :hover {
      color: var(--color-sea-green);
    }
  }
`

const ListItem = styled.li`
  flex: 1 1 15rem;
  margin: 0.5rem;

  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`
