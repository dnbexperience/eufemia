import PropTypes from 'prop-types'
import { spacingPropTypes } from '../space/SpacingHelper'

export const stepIndicatorPropTypes = {
  mode: PropTypes.oneOf(['static', 'strict', 'loose']),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
          .isRequired,
        is_current: PropTypes.bool,
        inactive: PropTypes.bool,
        disabled: PropTypes.bool,
        status: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        status_state: PropTypes.oneOf(['warn', 'info', 'error']),

        on_click: PropTypes.func,
        on_render: PropTypes.func,

        /* Deprecated */
        url: PropTypes.string, // Deprecated
        /* Deprecated */
        is_active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // Deprecated
        /* Deprecated */
        url_future: PropTypes.string, // Deprecated
        /* Deprecated */
        url_passed: PropTypes.string, // Deprecated
      })
    ),
  ]).isRequired,
  overview_title: PropTypes.string,
  step_title_extended: PropTypes.string,
  step_title: PropTypes.string,
  current_step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /* Deprecated */
  active_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Deprecated
  /* Deprecated */
  active_url: PropTypes.string, // Deprecated

  hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  use_navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // Deprecated
  on_item_render: PropTypes.func,
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  ...spacingPropTypes,

  class: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  on_change: PropTypes.func,
  on_click: PropTypes.func,
}

export const stepIndicatorDefaultProps = {
  mode: null,
  data: [],
  overview_title: null,
  step_title_extended: null,
  step_title: null,
  current_step: null,
  active_item: null, // Deprecated
  active_url: null, // Deprecated
  hide_numbers: false,
  use_navigation: null, // Deprecated
  on_item_render: null,
  no_animation: null,
  skeleton: false,
  class: null,

  className: null,
  children: null,

  on_change: null,
  on_click: null,
}
