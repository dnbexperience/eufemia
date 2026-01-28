import nb from './nb-NO'

export default {
  'da-DK': {
    TextCounter: {
      characterDown: '%count af %max tegn tilbage.',
      characterUp: 'Du har brugt %count af %max tegn.',
      characterExceeded: '%count tegn over grænsen på %max.',
    },
    TimelineItem: {
      altLabelCompleted: 'Udført',
      altLabelCurrent: 'Nuværende',
      altLabelUpcoming: 'Kommende',
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
      resetButtonText: 'Gendan',
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
      defaultTitle: 'Der er opstået en fejl',
      closeText: 'Luk',
      statusAnchorText: 'Gå til %s',
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
      indicatorLabel: 'Vent venligst ...',
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
      submitButtonTitle: 'Vis muligheder',
      noOptions: 'Ingen muligheder',
      showAll: 'Vis alt',
      showOptionsSr: 'Gennemse muligheder, luk med esc-knappen',
      ariaLiveOptions: '%s muligheder',
      selectedSr: 'Valgt:',
      indicatorLabel: 'Henter data ...',
    },
    Modal: {
      dialogTitle: 'Separat vindue',
      closeTitle: 'Luk',
    },
    Dialog: {
      declineText: 'Annuller',
      confirmText: 'Godkend',
    },
    CopyOnClick: {
      clipboardCopy: 'Kopieret',
    },
    NumberFormat: {
      clipboardCopy: 'Kopieret',
      notAvailable: 'Ikke tilgængelig',
    },
    HelpButton: {
      title: 'Hjælpetekst',
      ariaRole: 'Hjælp-knap',
    },
    Input: {
      submitButtonTitle: 'Send ind knap',
      clearButtonTitle: 'Nulstil',
    },
    Pagination: {
      buttonTitle: 'Side %s',
      nextTitle: 'Næste side',
      prevTitle: 'Forrige side',
      morePages: '%s flere sider',
      isLoadingText: 'Indlæser nyt indhold',
      loadButtonText: 'Vis mere indhold',
    },
    Skeleton: {
      ariaBusy: 'Behandler data ...',
      ariaReady: 'Klar til at interagere',
    },
    StepIndicator: {
      overviewTitle: 'Trinoverblik',
      stepTitle: 'Trin %step af %count:',
    },
    Slider: {
      addTitle: 'Forøg (%s)',
      subtractTitle: 'Reducer (%s)',
    },
    PaymentCard: {
      textBlocked: 'Spærret',
      textExpired: 'Udløbet',
      textNotActive: 'Inaktivt',
      textNewOrder: 'Bestilt',
      textOrderInProcess: 'På vej',
      textReplaced: 'Erstattet',
      textRenewed: 'Fornyet',
      textNew: 'Nyt',
      textUnknown: 'Ukendt',
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
  } satisfies (typeof nb)['nb-NO'],
}
