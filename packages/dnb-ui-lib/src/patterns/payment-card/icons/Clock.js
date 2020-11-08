import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({
  stroke = '#FBF6EC',
  width = '24',
  height = '24',
  id = '',
  viewBox = '0 0 24 24',
  className = ''
}) => (
  <svg
    viewBox={viewBox}
    height={height}
    width={width}
    fill="none"
    id={id}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8.25V12L16.687 16.688M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SVG.propTypes = {
  stroke: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  viewBox: PropTypes.string
};

export default SVG;
