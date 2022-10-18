/**
 * Space helper
 * NB: Because it contains "PropTypes" we keep this file as a JavaScirpt file.
 */

import PropTypes from 'prop-types'
import {
  createSpacingClasses,
  removeSpaceProps,
  createStyleObject,
} from './SpacingUtils'

export { createSpacingClasses, removeSpaceProps, createStyleObject } // because of ESLint import plugin

export const spacingPropTypes = {
  space: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      top: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      right: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      bottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      left: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    }),
  ]),
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}
