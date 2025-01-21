export default {
  'nb-NO': {
    TextCounter: {
      characterDown: '%count av %max tegn gjenstår.',
      characterUp: 'Du har brukt %count av %max tegn.',
      characterExceeded: '%count tegn over grensen på %max.',
    },
    TimelineItem: {
      alt_label_completed: 'Utført',
      alt_label_current: 'Nåværende',
      alt_label_upcoming: 'Kommende',
    },
    Breadcrumb: {
      navText: 'Sidehierarki',
      goBackText: 'Tilbake',
      homeText: 'Hjem',
      backToText: 'Tilbake til...',
    },
    DatePicker: {
      day: 'dag',
      month: 'måned',
      year: 'år',
      start: 'fra',
      end: 'til',
      selectedDate: 'Valgt dato: %s',
      selectedMonth: 'Valgt måned %s',
      selectedYear: 'Valgt år %s',
      nextMonth: 'Neste måned %s',
      prevMonth: 'Forrige måned %s',
      nextYear: 'Neste år %s',
      prevYear: 'Forrige år %s',
      openPickerText: 'åpne datovelger',
      maskOrder: 'dd/mm/yyyy',
      maskPlaceholder: 'dd.mm.åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      dateFormat: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      returnFormat: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submitButtonText: 'Ok',
      cancelButtonText: 'Avbryt',
      resetButtonText: 'Tilbakestill',
      errorSummary: 'Feil som må rettes:',
      errorMinDate: 'Valgt dato må være etter %s',
      errorMaxDate: 'Valgt dato må være før %s',
      errorRangeStartDateMinDate: 'Valgt startdato må være etter %s',
      errorRangeStartDateMaxDate: 'Valgt startdato må være før %s',
      errorRangeEndDateMinDate: 'Valgt sluttdato må være etter %s',
      errorRangeEndDateMaxDate: 'Valgt sluttdato må være før %s',
      placeholderCharacters: {
        day: 'd',
        month: 'm',
        year: 'å',
      },
      // TODO: add firstDay
    },
    Anchor: {
      targetBlankTitle: 'Åpner et nytt vindu',
    },
    GlobalStatus: {
      default_title: 'En feil har skjedd',
      close_text: 'Lukk',
      status_anchor_text: 'Gå til %s',
    },
    GlobalError: {
      404: {
        title: 'Vi finner ikke siden du leter etter …',
        text: 'Sikker på at du har skrevet riktig adresse? Eller har vi rotet med lenkene?',
      },
      500: {
        title: 'Beklager, her skjedde det noe feil!',
        text: 'Tjenesten fungerer ikke slik den skal for øyeblikket, men prøv igjen senere.',
      },
      code: 'Feilmeldings-kode:',
      help: 'Her er noen lenker som kanskje kan hjelpe:',
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
      show_options_sr: 'Bla gjennom alternativer, lukk med esc knappen',
      aria_live_options: '%s alternativer',
      selected_sr: 'Valgt:',
      indicator_label: 'Henter data ...',
    },
    Modal: {
      dialog_title: 'Separat Vindu',
      close_title: 'Lukk',
    },
    Dialog: {
      declineText: 'Avbryt',
      confirmText: 'Godta',
    },
    CopyOnClick: {
      clipboard_copy: 'Kopiert',
    },
    NumberFormat: {
      clipboard_copy: 'Kopiert',
      not_available: 'Ikke tilgjengelig',
    },
    HelpButton: {
      title: 'Hjelpetekst',
      aria_role: 'Hjelp-knapp',
    },
    Input: {
      submit_button_title: 'Send knapp',
      clear_button_title: 'Nullstill',
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
      step_title_extended: 'Du er på steg %step av %count',
      step_title: 'Steg %step av %count',
    },
    Slider: {
      addTitle: 'Øk (%s)',
      subtractTitle: 'Reduser (%s)',
    },
    PaymentCard: {
      text_card_number: 'Kortnummer',
      text_expired: 'Utgått',
      text_blocked: 'Sperret',
      text_not_active: 'Ikke aktivert',
      text_order_in_process: 'Under behandling',
      text_renewed: 'Fornyet',
      text_replaced: 'Erstattet',
      text_unknown: 'Ukjent',
    },
    Tag: {
      removeIconTitle: 'Fjern',
      addIconTitle: 'Legg til',
    },
    Table: {
      accordionToggleButtonSR: 'Vis mer innhold',
      accordionMoreContentSR: 'Mer innhold i neste rad',
      navigationButtonSR: 'Naviger til mer innhold',
    },
    Upload: {
      title: 'Last opp dokumenter',
      text: 'Dra og slipp eller velg hvilke filer du vil laste opp.',
      textSingular:
        'Dra og slipp eller velg hvilken fil du vil laste opp.',
      fileTypeTableCaption: 'Tillatte filformater og maks filstørrelse',
      fileTypeDescription: 'Tillatte filformater:',
      fileSizeDescription: 'Maks filstørrelse:',
      fileAmountDescription: 'Maks antall filer:',
      fileSizeContent: '%size MB',
      buttonText: 'Velg filer',
      buttonTextSingular: 'Velg fil',
      loadingText: 'Laster',
      errorLargeFile:
        'Filen du prøver å laste opp er for stor, den maksimale støttede størrelsen er %size MB.',
      errorAmountLimit:
        'Det er begrenset hvor mange filer du kan laste opp (%amount).',
      errorUnsupportedFile: 'Filen du prøver å laste opp er ikke støttet.',
      deleteButton: 'Slett',
      fileListAriaLabel: 'opplastede filer',
    },
  },
}
