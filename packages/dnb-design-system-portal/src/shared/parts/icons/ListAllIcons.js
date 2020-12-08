/**
 * List all the Icons available
 */

import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'dnb-ui-lib/src/components/icon/Icon'
import * as PrimaryIcons from 'dnb-ui-lib/src/icons/primary_icons'
import * as SecondaryIcons from 'dnb-ui-lib/src/icons/secondary_icons'
import * as PrimaryIconsMedium from 'dnb-ui-lib/src/icons/primary_icons_medium'
import * as SecondaryIconsMedium from 'dnb-ui-lib/src/icons/secondary_icons_medium'
import styled from '@emotion/styled'
import AutoLinkHeader from '../../tags/AutoLinkHeader'

export default class Icons extends React.PureComponent {
  state = { iconsToRender: [] }
  static propTypes = {
    type: PropTypes.string
  }
  static defaultProps = {
    type: 'primary'
  }
  constructor(props) {
    super(props)
    this.state.iconsToRender =
      props.type === 'secondary' ? SecondaryIcons : PrimaryIcons
  }
  render() {
    if (this.state.iconsToRender.length === 0) {
      return <></>
    }
    const icons = Object.entries(this.state.iconsToRender).map(
      ([name, Svg]) => {
        const SvgMedium = (this.props.type === 'secondary'
          ? SecondaryIconsMedium
          : PrimaryIconsMedium)[`${name}_medium`]
        return (
          <ListItem key={name}>
            <ListItemInner>
              <figure aria-labelledby={`icon-${name}`} aria-hidden>
                {(SvgMedium && (
                  <Icon icon={SvgMedium} size="medium" />
                )) || <Icon icon={Svg} />}
              </figure>

              <AutoLinkHeader
                level={3}
                element="figcaption"
                // className="dnb-h--medium"
                useSlug={`icon-${name}`}
              >
                {humanFormat(name)}
              </AutoLinkHeader>

              <p className="dnb-p" aria-hidden>
                ({name})
              </p>
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
  ${'' /* justify-content: center; */}

  padding: 0;
  margin: 0;
`

const ListItemInner = styled.div`
  ${'' /* display: flex;
  flex-direction: column;
  align-items: center; */}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  align-content: center;

  padding: 0.5rem 0;

  .dnb-h--medium,
  .dnb-spacing & .dnb-h--medium {
    margin: 1rem 0 0;
    white-space: nowrap;
  }
  .dnb-p,
  .dnb-spacing & .dnb-p {
    margin: 0;
    padding: 0;
  }

  .dnb-icon {
    font-size: var(--font-size-large);
    :hover {
      color: var(--color-sea-green);
    }
  }
`

const ListItem = styled.li`
  flex: 1 1 15rem;
  margin: 0.5rem;

  ${'' /* &:nth-last-child(2):nth-of-type(odd),
  &:last-of-type {
    flex-grow: 0;
  } */}

  ${'' /* @media screen and (min-width: 60em) {
    max-width: 15rem;
  } */}

  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`

const humanFormat = (title) =>
  title
    .replace(/_/g, ' ')
    .split(/\s/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
