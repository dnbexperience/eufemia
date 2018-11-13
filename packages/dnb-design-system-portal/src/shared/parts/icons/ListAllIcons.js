/**
 * List all the Icons available
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PrimaryIcons from 'dnb-ui-lib/src/icons/primary_icons'
import * as SecondaryIcons from 'dnb-ui-lib/src/icons/secondary_icons'
import styled from 'react-emotion'

export default class Icons extends Component {
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
      ([name, Icon]) => (
        <ListItem key={`icon${name}`}>
          <span aria-labelledby={`id${name}`}>
            <Icon width="48" height="48" />
          </span>
          <h4 id={`id${name}`}>
            {humanFormat(name)}
            <small>({name})</small>
          </h4>
        </ListItem>
      )
    )
    return <List>{icons}</List>
  }
}

const List = styled.ul`
  list-style: none;
`

const ListItem = styled.li`
  h4 {
    display: inline;
    padding-left: 1.5rem;
    font-weight: 400;
    small {
      padding-left: 0.5rem;
      font-size: 0.8rem;
      font-weight: 100;
    }
  }
`

const humanFormat = title =>
  title
    .replace(/_/g, ' ')
    .split(/\s/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
