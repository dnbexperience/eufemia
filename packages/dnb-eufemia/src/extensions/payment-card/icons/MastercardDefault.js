import React from 'react'
import PropTypes from 'prop-types'

const MastercardSVG = ({ textFill, ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <title>Mastercard</title>
    <path fill="#FF5F00" d="M32.89 3.42h-14v25.158h14V3.42Z" />
    <path
      fill="#EB001B"
      d="M19.776 16a15.972 15.972 0 0 1 6.111-12.58 16 16 0 1 0 0 25.16A15.972 15.972 0 0 1 19.777 16Z"
    />
    <path
      fill="#F79E1B"
      d="M51.777 16A16 16 0 0 1 25.89 28.58a16 16 0 0 0 0-25.16A16 16 0 0 1 51.777 16Z"
    />
  </svg>
)
MastercardSVG.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
}
MastercardSVG.defaultProps = {
  width: '52',
  height: '32',
  viewBox: '0 0 52 32',
}

export default MastercardSVG
