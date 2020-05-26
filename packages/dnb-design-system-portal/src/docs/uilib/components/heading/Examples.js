/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
// import styled from '@emotion/styled'

// const Style = styled.div`
//   span.dnb-heading {
//     display: block;
//   }
// `

class Example extends React.PureComponent {
  render() {
    return (
      <>
        <ComponentBox
          title="Default headings"
          data-dnb-test="heading-default"
        >
          {
            /* @jsx */ `
<Heading>Heading #1</Heading>
<Heading>Heading #2</Heading>
<Heading level={4}>Heading #3</Heading>
        `
          }
        </ComponentBox>
      </>
    )
  }
}

export default Example
