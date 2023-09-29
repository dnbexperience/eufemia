export default {
  'nb-NO': {
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
      date_format: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submit_button_text: 'Ok',
      cancel_button_text: 'Avbryt',
      reset_button_text: 'Tilbakestill',
      placeholder_characters: {
        day: 'd',
        month: 'm',
        year: 'å',
      },
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
    },
    Logo: {
      alt: 'DNB Logo',
    },
    Tag: {
      removeIconTitle: 'Fjern',
    },
    Table: {
      accordionToggleButtonSR: 'Vis mer innhold',
      accordionMoreContentSR: 'Mer innhold i neste rad',
    },
    Upload: {
      title: 'Last opp dokumenter',
      text: 'Dra & slipp eller velg hvilke filer du vil laste opp.',
      textSingular: 'Dra & slipp eller velg hvilken fil du vil laste opp.',
      fileTypeDescription: 'Tillatte filformater:',
      fileSizeDescription: 'Maks filstørrelse:',
      fileAmountDescription: 'Maks antall filer:',
      fileSizeContent: '%size MB',
      buttonText: 'Velg filer',
      buttonTextSingular: 'Velg fil',
      loadingText: 'Laster opp',
      errorLargeFile:
        'Filen du prøver å laste opp er for stor, vi støtter ikke filer større enn %size MB.',
      errorAmountLimit:
        'Det er begrenset hvor mange filer du kan laste opp (%amount).',
      errorUnsupportedFile: 'Filen du prøver å laste opp er ikke støttet.',
      deleteButton: 'Slett',
      fileListAriaLabel: 'opplastede filer',
    },
    Forms: {
      booleanYes: 'Ja',
      booleanNo: 'Nei',
      stepNext: 'Neste',
      stepPrevious: 'Tilbake',
      contextSubmit: 'Send',
      inputErrorRequired: 'Dette feltet må fylles ut',
      inputErrorPattern: 'Verdien er ugyldig',
      stringInputErrorMinLength:
        'Verdien kan ikke være kortere enn {minLength} tegn',
      stringInputErrorMaxLength:
        'Verdien kan ikke være lengre enn {maxLength} tegn',
      selectionClearSelected: 'Fjern valgt verdi',
      countryCodeLabel: 'Landskode',
      dateLabel: 'Dato',
      expiryLabel: 'Utløpsdato',
      emailErrorRequired: 'Du må fylle inn e-post',
      emailErrorPattern: 'Dette er ikke en gyldig e-postadresse',
      emailLabel: 'E-post',
      firstNameLabel: 'Fornavn',
      firstNameErrorRequired: 'Du må fylle inn fornavn',
      lastNameLabel: 'Etternavn',
      lastNameErrorRequired: 'Du må fylle inn etternavn',
      nationalIdentityNumberLabel: 'Fødselsnummer (11 siffer)',
      nationalIdentityNumberErrorRequired:
        'Du må fylle inn et fødselsnummer',
      nationalIdentityNumberErrorPattern:
        'Dette er ikke et gyldig fødselsnummer',
      organizationNumberLabel: 'Organisasjonsnummer',
      organizationNumberErrorRequired:
        'Du må fylle inn et organisasjonsnummer',
      organizationNumberErrorPattern:
        'Dette er ikke et gyldig organisasjonsnummer',
      bankAccountNumberLabel: 'Bankkonto',
      bankAccountNumberErrorRequired: 'Du må fylle inn et bankkontonummer',
      bankAccountNumberErrorPattern:
        'Dette er ikke et gyldig bankkontonummer',
      phoneNumberLabel: 'Mobilnummer',
      phoneNumberErrorRequired: 'Du må fylle inn mobilnummer',
      postalCodeLabel: 'Postnr.',
      postalCodeErrorRequired: 'Du må fylle inn et postnummer',
      postalCodeErrorPattern: 'Dette er ikke et gyldig postnummer',
      cityLabel: 'Sted',
      cityErrorRequired: 'Du må fylle inn et sted',
      selectCountryLabel: 'Land',
      selectCountryPlaceholder: 'Velg et land',
      selectCountryErrorRequired: 'Du må velge et land',
    },
  },
}
