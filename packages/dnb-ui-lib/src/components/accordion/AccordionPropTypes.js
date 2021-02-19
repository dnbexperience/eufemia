/**
 * Web Accordion Props
 *
 */

import PropTypes from 'prop-types'
import { spacingPropTypes } from '../space/SpacingHelper'

export const accordionPropTypes = {
  label: PropTypes.node,
  title: PropTypes.string,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  expanded_ssr: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_rerender: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prevent_rerender_conditional: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  remember_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  flush_remembered_state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  single_container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  left_component: PropTypes.node,
  allow_close_all: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string,
  element: PropTypes.node,
  heading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  heading_level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  icon_position: PropTypes.oneOf(['left', 'right']),
  icon_size: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,

  className: PropTypes.string,
  children: PropTypes.node,

  ...spacingPropTypes,

  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

export const accordionDefaultProps = {
  label: null,
  title: null,
  expanded: null,
  no_animation: null,
  expanded_ssr: null,
  prerender: null,
  prevent_rerender: null,
  prevent_rerender_conditional: null,
  remember_state: null,
  flush_remembered_state: null,
  single_container: null,
  variant: 'outlined',
  left_component: null,
  allow_close_all: null,
  disabled: null,
  skeleton: null,
  id: null,
  group: null,
  element: null,
  heading: null,
  heading_level: null,
  icon: null,
  icon_position: null,
  icon_size: 'medium',
  attributes: null,
  class: null,

  className: null,
  children: null,

  custom_element: null,
  custom_method: null,

  on_change: null,
  on_state_update: null
}
