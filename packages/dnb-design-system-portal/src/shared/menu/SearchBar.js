/**
 * SearchBar
 *
 */

import React, { PureComponent } from 'react'
import styled from '@emotion/styled'
import { Input } from 'dnb-ui-lib/src'
import { isCi } from 'is-ci'

const SearchWrapper = styled.span`
  @media (max-width: 50em) {
    input {
      max-width: 60vw;
    }
  }
`

export default class SearchBar extends PureComponent {
  render() {
    if (isCi) {
      return <></>
    }
    return (
      <SearchWrapper className="toggle-grid" {...this.props}>
        <Input
          right
          type="search"
          placeholder="Search ..."
          id="switch-grid"
          on_change={({ value }) => console.log(value)}
        />
      </SearchWrapper>
    )
  }
}
