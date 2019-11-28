export default {
  'nb-NO': {
    DatePicker: {
      mask_order: 'dd/mm/yyyy',
      mask_placeholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      date_format: 'yyyy-MM-dd', // in v1 of date-fns we where more flexible in terms of the format
      return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submit_button_text: 'Ok',
      cancel_button_text: 'Avbryt',
      reset_button_text: 'Tilbakestill'
    },
    GlobalStatus: {
      default_title: 'En feil har skjedd',
      close_text: 'Lukk',
      status_anchor_text: 'Gå til'
    },
    Dropdown: {
      title: 'Valgmeny'
    },
    Modal: {
      close_title: 'Lukk'
    },
    Logo: {
      alt: 'DNB Logo'
    }
  }
}
