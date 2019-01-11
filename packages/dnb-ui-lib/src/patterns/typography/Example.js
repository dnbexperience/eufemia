/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import classnames from 'classnames'

const typographyStylesRaw = /* @css */ `
/* Font Faces */
.dnb-typo-book {
  font-family: var(--font-family-book);
  font-weight: normal;
  font-style: normal;
}
.dnb-typo-book-italic {
  font-family: var(--font-family-book);
  font-weight: normal;
  font-style: italic;
}
.dnb-typo-demi {
  font-family: var(--font-family-demi);
  font-weight: normal;
  font-style: normal;
}
.dnb-typo-demi-italic {
  font-family: var(--font-family-demi);
  font-weight: normal;
  font-style: italic;
}

/* Font weight */
.dnb-typo-medium {
  font-weight: 500;
  font-style: normal;
}
.dnb-typo-medium-italic {
  font-weight: 500;
  font-style: italic;
}
.typo-light-italic {
  font-weight: 300;
  font-style: italic;
}
.typo-light {
  font-weight: 300;
  font-style: normal;
}
.typo-bold {
  font-weight: bold;
  font-style: normal;
}
.typo-bold-italic {
  font-weight: bold;
  font-style: italic;
}
`
const typographyStyles = css(typographyStylesRaw)

const Section = styled.div`
  padding: 2rem 0;
`

const Wrapper = styled.div`
  padding: 3rem 0 0;
`

class Example extends PureComponent {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>CSS Usage</h3>
        <CodeRenderer language="css">{typographyStylesRaw}</CodeRenderer>
      </Fragment>
    )
  }
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <div className={typographyStyles}>
            {/* Standard Light */}
            <Demo font_family="Fedra Sans Light" typo_class="typo-light" />
            <Demo
              font_family="Fedra Sans Light Italic"
              typo_class="typo-light-italic"
            />

            {/* Standard Medium */}
            <Demo
              font_family="Fedra Sans Medium"
              typo_class="dnb-typo-medium"
            />
            <Demo
              font_family="Fedra Sans Medium Italic"
              typo_class="dnb-typo-medium-italic"
            />

            {/* Standard Bold */}
            <Demo font_family="Fedra Sans Bold" typo_class="typo-bold" />
            <Demo
              font_family="Fedra Sans Bold Italic"
              typo_class="typo-bold-italic"
            />

            {/* Book */}
            <Demo
              font_family="Fedra Sans Book"
              typo_class="dnb-typo-book"
            />
            <Demo
              font_family="Fedra Sans Book Italic"
              typo_class="dnb-typo-book-italic"
            />

            {/* Demi */}
            <Demo
              font_family="Fedra Sans Demi"
              typo_class="dnb-typo-demi"
            />
            <Demo
              font_family="Fedra Sans Demi Italic"
              typo_class="dnb-typo-demi-italic"
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

const Demo = ({ typo_class, font_family }) => (
  <Section>
    {/* Font Faces */}
    <h1 className={typo_class}>{font_family}</h1>
    <p className={typo_class}>
      Here is a paragraph with some nonsense lipsum text. Contrary to
      popular belief, Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source.
      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
      Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
      written in 45 BC.
    </p>

    {/* Numbers */}
    <h4 className={typo_class}>Numbers:</h4>
    <p className={classnames('dnb-typo-number--lining', typo_class)}>
      <strong>Lining:</strong> 0123456789
    </p>
    <p className={classnames('dnb-typo-number--old-style', typo_class)}>
      <strong>Old style:</strong> 0123456789
    </p>
  </Section>
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
  <Wrapper>
    <Example />
  </Wrapper>
)
