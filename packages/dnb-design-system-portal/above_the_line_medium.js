import _extends from '@babel/runtime/helpers/esm/extends'

var _path

import React from 'react'

const above_the_line_medium = (props) =>
  React.createElement(
    'svg',
    _extends(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 24,
        height: 24,
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      props,
    ),
    _path ||
      (_path = React.createElement('path', {
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 1.5,
        d: 'M12 21V9m0 0-4 4m4-4s2.243 2.047 4 4M2 3.5h2m4 0h2m4 0h2m4 0h2',
      })),
  )

export default above_the_line_medium
