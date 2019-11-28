export default {
  'en-US': {
    DatePicker: {
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
