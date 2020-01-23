export default {
  'en-US': {
    DatePicker: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
      start: 'from',
      end: 'to',
      selected_date: 'Selected date: %s',
      selected_month: 'Selected month %s',
      selected_year: 'Selected year %s',
      next_month: 'Next month %s',
      prev_month: 'Previous month %s',
      next_year: 'Next year %s',
      prev_year: 'Previous year %s',
      open_picker_text: 'Open date picker',
      mask_order: 'dd/mm/yyyy',
      mask_placeholder: 'dd/mm/yyyy', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      date_format: 'yyyy-MM-dd', // in v1 of date-fns we where more flexible in terms of the format
      return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submit_button_text: 'OK',
      cancel_button_text: 'Cancel',
      reset_button_text: 'Reset'
    },
    GlobalStatus: {
      default_title: 'An error has occurred',
      close_text: 'Close',
      status_anchor_text: 'Go to'
    },
    GlobalError: {
      404: {
        title: "Oops! We can't find the page you're looking for …",
        text:
          'Did we messed with the links? Try again, or [go back where you came from](/back).',
        alt: 'Lady searching in empty box'
      },
      500: {
        title: 'Ohh, a technical error happened!',
        text:
          'The service is not working properly at the moment, but try again later.',
        alt: 'Man looking for clues'
      }
    },
    Dropdown: {
      title: 'Option Menu'
    },
    Modal: {
      close_title: 'Close'
    },
    Logo: {
      alt: 'DNB Logo'
    }
  }
}
