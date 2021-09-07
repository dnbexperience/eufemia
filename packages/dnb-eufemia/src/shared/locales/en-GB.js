export default {
  'en-GB': {
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
      reset_button_text: 'Reset',
    },
    Anchor: {
      target_blank_title: 'Opens a new Window',
    },
    GlobalStatus: {
      default_title: 'An error has occurred',
      close_text: 'Close',
      status_anchor_text: 'Go to %s',
    },
    GlobalError: {
      404: {
        title: "Oops! We can't find the page you're looking for …",
        text: 'Did we messed with the links? Try again, or [go back where you came from](/back).',
        alt: 'Lady searching in empty box',
      },
      500: {
        title: 'Ohh, a technical error happened!',
        text: 'The service is not working properly at the moment, but try again later.',
        alt: 'Man looking for clues',
      },
    },
    ProgressIndicator: {
      indicator_label: 'Please wait ...',
    },
    Dropdown: {
      title: 'Option Menu',
    },
    Autocomplete: {
      title: 'Type and select',
      submit_button_title: 'Show options',
      no_options: 'No option',
      show_all: 'Show everything',
      aria_live_options: '%s options',
      indicator_label: 'Getting data ...',
    },
    Modal: {
      dialog_title: 'Dialog Window',
      close_title: 'Close',
    },
    NumberFormat: {
      clipboard_copy: 'Copied',
    },
    HelpButton: {
      title: 'Help text',
      aria_role: 'Help button',
    },
    Skeleton: {
      aria_busy: 'In progress ...',
      aria_ready: 'Ready to interact',
    },
    Input: {
      submit_button_title: 'Submit button',
      clear_button_title: 'Clear value',
      show_password: 'Show password',
      hide_password: 'Hide password',
    },
    Pagination: {
      button_title: 'Page %s',
      next_title: 'Next page',
      prev_title: 'Previous page',
      more_pages: '%s more pages',
      is_loading_text: 'Loading new content',
      load_button_text: 'Show more content',
    },
    StepIndicator: {
      overview_title: 'Steps Overview',
      step_title_extended: 'You are on step %step of %count',
      step_title: 'Step %step of %count',
    },
    Slider: {
      add_title: 'Increase (%s)',
      subtract_title: 'Decrease (%s)',
    },
    PaymentCard: {
      text_card_number: 'Card number',
      text_expired: 'Expired',
      text_blocked: 'Blocked',
    },
    Logo: {
      alt: 'DNB Logo',
    },
  },
}
