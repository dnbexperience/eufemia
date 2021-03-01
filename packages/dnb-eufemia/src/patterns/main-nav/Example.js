/**
 * UI lib Component Example
 *
 */

import React from 'react'
import MainNav from './MainNav'
import styled from '@emotion/styled'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <MainNav
          data={[
            { title: 'Title 1', url: '?url1' },
            { title: 'Title 2', url: '?url2' },
            { title: 'Title 3', url: '?url3' },
            { title: 'Title 4', url: '?url4' },
            { title: 'Title 5', url: '?url5' },
            { title: 'Title 6', url: '?url6' }
          ]}
          notification_amount="3"
          baseurl="https://www.dnb.no"
        />
      </React.Fragment>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`

export { Example }
export default function StyledExample() {
  return (
    <Wrapper>
      <Example />
    </Wrapper>
  )
}
