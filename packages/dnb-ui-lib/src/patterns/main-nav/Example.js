/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import MainNav from './MainNav'
import styled from '@emotion/styled'
import Button from '../../components/button/Button'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
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

        <div className="styleguide-dummy-content dnb-width-limit ">
          <h1>Content outside of the component.. </h1>
          <p className="typo-light">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <Button type="button" text="I am a button" variant="primary" />
        </div>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)
