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
      <ComponentBox
        title="Defualt headings"
        data-dnb-test="heading-default"
      >
        {
          /* @jsx */ `
<Heading>Heading</Heading>
          `
        }
      </ComponentBox>
    )
  }
}

export default Example
