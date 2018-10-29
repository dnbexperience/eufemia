/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { cx, css } from 'react-emotion'

class Example extends Component {
  render() {
    return (
      <Fragment>
        <div className="dnb-width-limit typography-demo">
          {/* <!-- Book --> */}
          <Demo font_family="Fedra Sans Book" typo_class="typo-book" />
          <Demo
            font_family="Fedra Sans Book Italic"
            typo_class="typo-book-italic"
          />

          {/* <!-- Book Medium --> */}
          <Demo font_family="Fedra Sans Medium" typo_class="typo-medium" />
          <Demo
            font_family="Fedra Sans Medium Italic"
            typo_class="typo-medium-italic"
          />

          {/* <!-- Light --> */}
          <Demo font_family="Fedra Sans Light" typo_class="typo-light" />
          <Demo
            font_family="Fedra Sans Light Italic"
            typo_class="typo-light-italic"
          />

          {/* <!-- Bold --> */}
          <Demo font_family="Fedra Sans Bold" typo_class="typo-bold" />
          <Demo
            font_family="Fedra Sans Bold Italic"
            typo_class="typo-bold-italic"
          />
        </div>
      </Fragment>
    )
  }
}

const Demo = ({ typo_class, font_family }) => (
  <div className={cx('dnb-font-family-demo', typo_class)}>
    <h1>This is the {font_family}</h1>
    <p>
      Here is a paragraph with some nonsense lipsum text. Contrary to
      popular belief, Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source.
      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
      Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
      written in 45 BC.
    </p>
    <h4>Here are some numbers:</h4>
    <div className="dnb-font-family-demo__numbers">
      <p className="typo-number--lining">
        <strong>Lining:</strong> 123456789
      </p>
      <p className="typo-number--old-style">
        <strong>Old style:</strong> 123456789
      </p>
    </div>
  </div>
)
Demo.propTypes = {
  typo_class: PropTypes.string,
  font_family: PropTypes.string.isRequired
}
Demo.defaultProps = {
  typo_class: null
}

export { Example }
export default () => (
  <div
    css={css`
      /* typography-demo */
    `}
  >
    <Example />
  </div>
)
