export default {
  'nb-NO': {
    DatePicker: {
      day: 'dag',
      month: 'måned',
      year: 'år',
      start: 'fra',
      end: 'til',
      selected_date: 'Valgt dato: %s',
      selected_month: 'Valgt måned %s',
      selected_year: 'Valgt år %s',
      next_month: 'Neste måned %s',
      prev_month: 'Forrige måned %s',
      next_year: 'Neste år %s',
      prev_year: 'Forrige år %s',
      open_picker_text: 'åpne datovelger',
      mask_order: 'dd/mm/yyyy',
      mask_placeholder: 'dd.mm.åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      date_format: 'yyyy-MM-dd', // in v1 of date-fns we where more flexible in terms of the format
      return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submit_button_text: 'Ok',
      cancel_button_text: 'Avbryt',
      reset_button_text: 'Tilbakestill',
    },
    Anchor: {
      target_blank_title: 'Åpner et nytt vindu',
    },
    GlobalStatus: {
      default_title: 'En feil har skjedd',
      close_text: 'Lukk',
      status_anchor_text: 'Gå til %s',
    },
    GlobalError: {
      404: {
        title: 'Oisann! Vi finner ikke siden du leter etter …',
        text: 'Sikker på at du har skrevet riktig adresse? Eller har vi rotet med lenkene? Prøv på nytt, eller [gå tilbake der du kom fra](/back).',
        alt: 'Dame søker i tom eske',
      },
      500: {
        title: 'Oops, her ble det en teknisk feil!',
        text: 'Tjenesten fungerer ikke slik den skal for øyeblikket, men prøv igjen senere.',
        alt: 'Mann leter etter spor',
      },
    },
    ProgressIndicator: {
      indicator_label: 'Vennligst vent ...',
    },
    Dropdown: {
      title: 'Valgmeny',
    },
    Autocomplete: {
      title: 'Skriv og velg',
      submit_button_title: 'Vis alternativer',
      no_options: 'Ingen alternativer',
      show_all: 'Vis alt',
      aria_live_options: '%s alternativer',
      indicator_label: 'Henter data ...',
    },
    Modal: {
      close_title: 'Lukk',
    },
    NumberFormat: {
      clipboard_copy: 'Kopiert',
    },
    HelpButton: {
      title: 'Hjelpetekst',
      aria_role: 'Hjelp-knapp',
    },
    Input: {
      submit_button_title: 'Send knapp',
      clear_button_title: 'Nullstill',
      show_password: 'Vis passord',
      hide_password: 'Skjul passord',
    },
    Pagination: {
      button_title: 'Side %s',
      next_title: 'Neste side',
      prev_title: 'Forrige side',
      more_pages: '%s flere sider',
      is_loading_text: 'Laster nytt innhold',
      load_button_text: 'Vis mer innhold',
    },
    Skeleton: {
      aria_busy: 'Behandler data ...',
      aria_ready: 'Klar til å samhandle',
    },
    StepIndicator: {
      overview_title: 'Stegoversikt',
      overview_step_title: 'Du er på Steg %step av %count',
      step_title: 'Steg %step av %count',
    },
    Slider: {
      add_title: 'Øk (%s)',
      subtract_title: 'Reduser (%s)',
    },
    PaymentCard: {
      text_card_number: 'Kortnummer',
      text_expired: 'Utgått',
      text_blocked: 'Sperret',
    },
    Logo: {
      alt: 'DNB Logo',
    },
  },
}
