/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Body from './Body'
import styled from 'react-emotion'

const ExampleContent = () => (
  <Fragment>
    <p>
      Lacinia ultricies dis justo sociis vestibulum erat sodales est
      rhoncus phasellus consequat bibendum cum potenti ornare cubilia
      scelerisque vulputate lobortis duis semper arcu congue pulvinar vel
      dui nunc sapien sociosqu venenatis orci curae interdum elit natoque
      maecenas viverra tellus id litora tempus ut tincidunt mollis dolor
      feugiat pharetra proin fames molestie tristique nam leo felis
      dignissim in at netus gravida nibh diam ante habitasse senectus
      aenean fusce sit rutrum porttitor ipsum montes tempor porta odio
      lectus platea cursus etiam magna faucibus imperdiet curabitur
      sagittis hendrerit massa donec dictumst vitae himenaeos lacus vivamus
      per nostra varius nisl tortor conubia luctus urna
    </p>
  </Fragment>
)

class Example extends Component {
  render() {
    return (
      <Body>
        <div>
          <p>All the content goes in here</p>
        </div>
      </Body>
    )
  }
}

const Wrapper = styled.div`
  line-height: 1;
  letter-spacing: 0;
  padding: 0.2rem 1rem 1rem;
  background: Cornsilk;
`

const Reset = props => <Wrapper {...props}>{props.children}</Wrapper>
Reset.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
}
Reset.defaultProps = {
  style: null
}

export { Example }
export default () => (
  <Fragment>
    <Reset>
      <h4>Without DNB Style</h4>
      <ExampleContent />
      <Body>
        <h4>With DNB Style</h4>
        <ExampleContent />
      </Body>
    </Reset>
  </Fragment>
)
