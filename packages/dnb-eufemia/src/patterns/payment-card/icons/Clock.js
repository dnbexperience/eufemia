import React from 'react'
import PropTypes from 'prop-types'

const ClockSVG = (props) => (
  <svg {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 8.25V12L16.687 16.688M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12Z"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
ClockSVG.propTypes = {
  stroke: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string
}
ClockSVG.defaultProps = {
  stroke: '#FBF6EC',
  width: '24',
  height: '24',
  viewBox: '0 0 24 24'
}

export default ClockSVG
