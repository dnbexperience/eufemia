export default {
  'da-DK': {
    TextCounter: {
      characterDown: '%count af %max tegn tilbage.',
      characterUp: 'Du har brugt %count af %max tegn.',
      characterExceeded: '%count tegn over grænsen på %max.',
    },
    TimelineItem: {
      alt_label_completed: 'Udført',
      alt_label_current: 'Nuværende',
      alt_label_upcoming: 'Kommende',
    },
    Breadcrumb: {
      navText: 'Sidehierarki',
      goBackText: 'Tilbage',
      homeText: 'Hjem',
      backToText: 'Tilbage til...',
    },
    DateFormat: {
      invalidDate: 'Ugyldig dato: {value}',
    },
    DatePicker: {
      day: 'dag',
      month: 'måned',
      year: 'år',
      start: 'fra',
      end: 'til',
      selectedDate: 'Valgt dato: %s',
      selectedDateRange: 'Valgte datoer: %s',
      selectedMonth: 'Valgt måned %s',
      selectedYear: 'Valgt år %s',
      nextMonth: 'Næste måned %s',
      prevMonth: 'Forrige måned %s',
      nextYear: 'Næste år %s',
      prevYear: 'Forrige år %s',
      openPickerText: 'Åbn datovælger',
      maskOrder: 'dd/mm/yyyy',
      maskPlaceholder: 'dd.mm.åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      dateFormat: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      returnFormat: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      firstDay: 'monday', // used in DatePickerCalendar to set the first day of the week
      submitButtonText: 'Ok',
      cancelButtonText: 'Annuller',
      resetButtonText: 'Nulstil',
      placeholderCharacters: {
        day: 'd',
        month: 'm',
        year: 'å',
      },
    },
    Anchor: {
      targetBlankTitle: 'Åbner et nyt vindue',
    },
    GlobalStatus: {
      default_title: 'Der er opstået en fejl',
      close_text: 'Luk',
      status_anchor_text: 'Gå til %s',
    },
    GlobalError: {
      404: {
        title: 'Vi kan ikke finde den siden du leder efter …',
        text: 'Er du sikker på, at du har skrevet den rigtige adresse?',
      },
      500: {
        title: 'Beklager, der opstod en fejl!',
        text: 'Tjenesten fungerer ikke som den skal i øjeblikket, prøv igen senere.',
      },
      errorMessageCode: 'Fejlkode: %statusCode',
      help: 'Her er nogle links, der måske kan hjælpe:',
    },
    ProgressIndicator: {
      indicator_label: 'Vent venligst ...',
    },
    DrawerList: {
      defaultGroupSR: 'Standardvalg',
      missingGroup: 'Gruppe',
      noGroupSR: 'Andre valg',
    },
    Dropdown: {
      title: 'Valgmenu',
    },
    Autocomplete: {
      title: 'Skriv og vælg',
      submit_button_title: 'Vis muligheder',
      no_options: 'Ingen muligheder',
      show_all: 'Vis alt',
      show_options_sr: 'Gennemse muligheder, luk med esc-knappen',
      aria_live_options: '%s muligheder',
      selected_sr: 'Valgt:',
      indicator_label: 'Henter data ...',
    },
    Modal: {
      dialog_title: 'Separat vindue',
      close_title: 'Luk',
    },
    Dialog: {
      declineText: 'Annuller',
      confirmText: 'Godkend',
    },
    CopyOnClick: {
      clipboard_copy: 'Kopieret',
    },
    NumberFormat: {
      clipboard_copy: 'Kopieret',
      not_available: 'Ikke tilgængelig',
    },
    HelpButton: {
      title: 'Hjælpetekst',
      aria_role: 'Hjælp-knap',
    },
    Input: {
      submit_button_title: 'Send ind knap',
      clear_button_title: 'Nulstil',
    },
    Pagination: {
      button_title: 'Side %s',
      next_title: 'Næste side',
      prev_title: 'Forrige side',
      more_pages: '%s flere sider',
      is_loading_text: 'Indlæser nyt indhold',
      load_button_text: 'Vis mere indhold',
    },
    Skeleton: {
      aria_busy: 'Behandler data ...',
      aria_ready: 'Klar til at interagere',
    },
    StepIndicator: {
      overview_title: 'Trinoverblik',
      step_title: 'Trin %step af %count:',
    },
    Slider: {
      addTitle: 'Forøg (%s)',
      subtractTitle: 'Reducer (%s)',
    },
    PaymentCard: {
      text_card_number: 'Kortnummer', // Deprecated: As it's not in use anymore, can be removed in v11.
      text_blocked: 'Spærret',
      text_expired: 'Udløbet',
      text_not_active: 'Inaktivt',
      text_new_order: 'Bestilt',
      text_order_in_process: 'På vej',
      text_replaced: 'Erstattet',
      text_renewed: 'Fornyet',
      text_new: 'Nyt',
      text_unknown: 'Ukendt',
    },
    Tag: {
      removeIconTitle: 'Fjern',
      addIconTitle: 'Tilføj',
    },
    Table: {
      accordionToggleButtonSR: 'Vis mere indhold',
      accordionMoreContentSR: 'Mere indhold i næste række',
      navigationButtonSR: 'Naviger til mere indhold',
    },
    Upload: {
      title: 'Upload dokumenter',
      text: 'Træk og slip eller vælg hvilke filer du vil uploade.',
      textSingular: 'Træk og slip eller vælg hvilken fil du vil uploade.',
      fileTypeTableCaption: 'Tilladte filformater og maks filstørrelse',
      fileTypeDescription: 'Tilladte filformater:',
      fileSizeDescription: 'Maks filstørrelse:',
      fileAmountDescription: 'Maks antal filer:',
      fileSizeContent: '%size MB',
      buttonText: 'Vælg filer',
      buttonTextSingular: 'Vælg fil',
      loadingText: 'Indlæser',
      errorLargeFile:
        'Filen du prøver at uploade er for stor, den maksimale understøttede størrelse er %size MB.',
      errorAmountLimit:
        'Der er en grænse for, hvor mange filer du kan uploade (%amount).',
      errorUnsupportedFile:
        'Filen du prøver at uploade er ikke understøttet.',
      deleteButton: 'Slet',
      fileListAriaLabel: 'uploadede filer',
    },
    Popover: {
      closeButtonTitle: 'Luk',
      openTriggerTitle: 'Klik for at åbne',
      closeTriggerTitle: 'Klik for at lukke',
      focusTrapTitle: 'Klik for at vende tilbage',
    },
    TermDefinition: {
      closeButtonTitle: 'Luk ordforklaring',
      openTriggerTitle: 'Klik for at åbne ordforklaring',
      closeTriggerTitle: 'Klik for at lukke ordforklaring',
    },
  },
}
