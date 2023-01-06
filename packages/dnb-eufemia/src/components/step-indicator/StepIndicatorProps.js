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
      })
    ),
  ]),
  overview_title: PropTypes.string,
  step_title_extended: PropTypes.string,
  step_title: PropTypes.string,
  current_step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  hide_numbers: false,
  on_item_render: null,
  no_animation: null,
  skeleton: false,
  class: null,

  className: null,
  children: null,

  on_change: null,
  on_click: null,
}
