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
    // let iconParams = { fill: null }
    // if (isIE11)
    //   iconParams = { iconParams, ...{ width: '48', height: '48' } }
    // () => <Svg {...iconParams} />
    const icons = Object.entries(this.state.iconsToRender).map(
      ([name, Svg]) => (
        <ListItem key={`icon${name}`}>
          <span aria-labelledby={`id${name}`}>
            <Icon icon={Svg} />
          </span>
          <h4 id={`id${name}`}>{humanFormat(name)}</h4>
          <h5>({name})</h5>
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
`

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 9rem;

  margin: 0 1rem 1rem 0;
  padding: 1rem 0;

  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

  span {
    padding: 1rem;
    line-height: 1rem;
    margin-bottom: 0;
  }

  h4 {
    color: var(--color-333);
    font-weight: 600;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0;
  }

  h5 {
    color: var(--color-333);
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 1rem;
  }
  .dnb-icon svg {
    width: 1.5rem;
    height: 1.5rem;
    :hover {
      color: var(--color-cherry-red);
    }
  }
`

const humanFormat = title =>
  title
    .replace(/_/g, ' ')
    .split(/\s/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

// const isIE11 =
//   typeof window !== 'undefined'
//     ? !!window.MSInputMethodContext && !!document.documentMode
//     : false
