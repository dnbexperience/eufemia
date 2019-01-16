/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding: 3rem 0 0;
`

const FontUsageExample = ({ typo_class, font_family }) => (
  <div className="example-box">
    <h3 className={typo_class}>{font_family}</h3>
    <p className={typo_class}>
      Here is a paragraph with some nonsense <a href="/">Lorem Ipsum</a>
      comes from <b>sections</b> 1.10.32 and 1.10.33 of "de
      <i>Finibus Bonorum</i> et <u>Malorum</u>" (
      <strong>The Extremes</strong> of Good and Evil) by Cicero, written in
      45 BC.
    </p>
  </div>
)
FontUsageExample.propTypes = {
  typo_class: PropTypes.string,
  font_family: PropTypes.string.isRequired
}
FontUsageExample.defaultProps = {
  typo_class: null
}

export default () => (
  <Wrapper>
    {/* Book */}
    <FontUsageExample
      font_family="Fedra Sans Book"
      typo_class="dnb-typo-book"
    />

    {/* Demi */}
    <FontUsageExample
      font_family="Fedra Sans Demi"
      typo_class="dnb-typo-demi"
    />

    {/* Standard Medium */}
    <FontUsageExample
      font_family="Fedra Sans Medium"
      typo_class="dnb-typo-medium"
    />
  </Wrapper>
)
