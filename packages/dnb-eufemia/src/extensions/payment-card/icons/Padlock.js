import React from 'react'
import PropTypes from 'prop-types'

const SVG = (props) => (
  <svg {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Hengelås</title>
    <path
      d="M6.75 9.75V6C6.75 4.60761 7.30312 3.27226 8.28769 2.28769C9.27226 1.30312 10.6076 0.75 12 0.75C13.3924 0.75 14.7277 1.30312 15.7123 2.28769C16.6969 3.27226 17.25 4.60761 17.25 6V9.75M12 15V18M5.25 9.75H18.75C19.5784 9.75 20.25 10.4216 20.25 11.25V21.75C20.25 22.5784 19.5784 23.25 18.75 23.25H5.25C4.42157 23.25 3.75 22.5784 3.75 21.75V11.25C3.75 10.4216 4.42157 9.75 5.25 9.75Z"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
SVG.propTypes = {
  stroke: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string
}
SVG.defaultProps = {
  stroke: '#FBF6EC',
  width: '24',
  height: '24',
  viewBox: '0 0 24 24'
}
export default SVG
