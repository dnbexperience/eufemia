import React from 'react'
import PropTypes from 'prop-types'
import { isTrue, makeUniqueId } from '../../shared/component-helper'

import format from 'date-fns/format'
import nbLocale from 'date-fns/locale/nb'

import DatePickerRange from './DatePickerRange'
import DatePickerAddon from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'

export default class DatePickerContainer extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hide_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    hide_navigation_buttons: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    hide_days: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    only_month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    hide_last_week: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    disable_autofocus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    reset_date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    first_day: PropTypes.string,
    locale: PropTypes.object,
    range: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    sync: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    addon_element: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    shortcuts: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onPickerChange: PropTypes.func,
    onSubmitHandler: PropTypes.func,
    onCancelHandler: PropTypes.func,
    onResetHandler: PropTypes.func,
  }

  static defaultProps = {
    id: null,
    hide_navigation: false,
    hide_navigation_buttons: false,
    hide_days: false,
    only_month: false,
    hide_last_week: false,
    disable_autofocus: false,
    reset_date: true,
    first_day: 'monday',
    locale: nbLocale,
    range: false,
    link: false,
    sync: true,
    addon_element: null,
    shortcuts: null,
    hidden: null,
    onPickerChange: null,
    onSubmitHandler: null,
    onCancelHandler: null,
    onResetHandler: null,
  }

  constructor(props) {
    super(props)

    this.id = props.id || makeUniqueId()
    this.hidden = props.hidden
  }

  render() {
    const {
      id,
      hide_navigation,
      hide_navigation_buttons,
      hide_days,
      only_month,
      hide_last_week,
      disable_autofocus,
      reset_date,
      first_day,
      locale,
      range,
      link,
      sync,
      addon_element,
      shortcuts,
      hidden,
      onPickerChange,
      onSubmitHandler,
      onCancelHandler,
      onResetHandler,
    } = this.props

    return (
      <>
        <div className="dnb-date-picker__container">
          {!hidden && (
            <>
              <DatePickerRange
                id={id}
                firstDayOfWeek={first_day}
                locale={locale}
                resetDate={isTrue(reset_date)}
                isRange={isTrue(range)}
                isLink={isTrue(link)}
                isSync={isTrue(sync)}
                hideDays={isTrue(hide_days)}
                hideNav={isTrue(hide_navigation)}
                views={
                  isTrue(hide_navigation_buttons)
                    ? [{ nextBtn: false, prevBtn: false }]
                    : null
                }
                onlyMonth={isTrue(only_month)}
                hideNextMonthWeek={isTrue(hide_last_week)}
                noAutofocus={isTrue(disable_autofocus)}
                onChange={onPickerChange}
              />
              {(addon_element || shortcuts) && (
                <DatePickerAddon
                  {...props}
                  renderElement={addon_element}
                  shortcuts={shortcuts}
                />
              )}
            </>
          )}
        </div>

        <DatePickerFooter
          isRange={isTrue(range)}
          onSubmit={onSubmitHandler}
          onCancel={onCancelHandler}
          onReset={onResetHandler}
        />
      </>
    )
  }
}
