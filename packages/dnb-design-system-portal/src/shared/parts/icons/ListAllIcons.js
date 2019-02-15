/**
 * List all the Icons available
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'dnb-ui-lib/src/components/icon/Icon'
import * as PrimaryIcons from 'dnb-ui-lib/src/icons/primary_icons'
import * as SecondaryIcons from 'dnb-ui-lib/src/icons/secondary_icons'
import styled from '@emotion/styled'

export default class Icons extends PureComponent {
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
      ([name, Svg]) => (
        <ListItem key={`icon${name}`}>
          <ListItemInner>
            <span aria-labelledby={`id${name}`}>
              <Icon icon={Svg} />
            </span>
            <h3 id={`id${name}`}>{humanFormat(name)}</h3>
            <p>({name})</p>
          </ListItemInner>
        </ListItem>
      )
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
  justify-content: center;

  padding: 0;
  margin: 0;
`

const ListItemInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.5rem 0;

  span[aria-labelledby] {
    padding: 2rem 0;
  }

  h3 {
    margin: 0;
  }

  .dnb-icon {
    font-size: 1.5rem;
    :hover {
      color: var(--color-cherry-red);
    }
  }
`

const ListItem = styled.li`
  flex: 1 1 auto;
  min-width: 9rem;
  margin: 0.5rem !important; /* sice we can't define the CSS specificity to .dnb-soacing */

  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`

const humanFormat = title =>
  title
    .replace(/_/g, ' ')
    .split(/\s/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
