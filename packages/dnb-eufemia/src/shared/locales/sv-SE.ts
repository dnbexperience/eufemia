import nb from './nb-NO'
export default {
  'sv-SE': {
    TextCounter: {
      characterDown: '%count av %max tecken återstår.',
      characterUp: 'Du har använt %count av %max tecken.',
      characterExceeded: '%count tecken över gränsen på %max.',
    },
    TimelineItem: {
      alt_label_completed: 'Utförd',
      alt_label_current: 'Nuvarande',
      alt_label_upcoming: 'Kommande',
    },
    Breadcrumb: {
      navText: 'Sidstruktur',
      goBackText: 'Tillbaka',
      homeText: 'Hem',
      backToText: 'Tillbaka till...',
    },
    DateFormat: {
      invalidDate: 'Ogiltigt datum: {value}',
    },
    DatePicker: {
      day: 'dag',
      month: 'månad',
      year: 'år',
      start: 'från',
      end: 'till',
      selectedDate: 'Valt datum: %s',
      selectedDateRange: 'Valda datum: %s',
      selectedMonth: 'Vald månad %s',
      selectedYear: 'Valt år %s',
      nextMonth: 'Nästa månad %s',
      prevMonth: 'Förra månaden %s',
      nextYear: 'Nästa år %s',
      prevYear: 'Förra året %s',
      openPickerText: 'Öppna datumväljaren',
      maskOrder: 'yyyy/mm/dd',
      maskPlaceholder: 'åååå.mm.dd', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      dateFormat: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      returnFormat: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      firstDay: 'monday', // used in DatePickerCalendar to set the first day of the week
      submitButtonText: 'Okej',
      cancelButtonText: 'Stäng',
      resetButtonText: 'Återställ',
      placeholderCharacters: {
        day: 'd',
        month: 'm',
        year: 'å',
      },
    },
    Anchor: {
      targetBlankTitle: 'Öppnar ett nytt fönster',
    },
    GlobalStatus: {
      default_title: 'Ett fel har inträffat',
      close_text: 'Stäng',
      status_anchor_text: 'Gå till %s',
    },
    GlobalError: {
      404: {
        title: 'Vi kan inte hitta sidan du letar efter …',
        text: 'Är du säker på att du har skrivit rätt adress?',
      },
      500: {
        title: 'Tyvärr, något gick fel!',
        text: 'Tjänsten fungerar inte som den ska just nu, men försök igen senare.',
      },
      code: 'Felmeddelande-kod:', // Deprecated:  Replaced with errorMessageCode, code can be removed in v11.
      errorMessageCode: 'Felmeddelande-kod: %statusCode',
      help: 'Här är några länkar som kanske kan hjälpa:',
    },
    ProgressIndicator: {
      indicator_label: 'Vänligen vänta ...',
    },
    DrawerList: {
      defaultGroupSR: 'Standardval',
      missingGroup: 'Grupp',
      noGroupSR: 'Andra val',
    },
    Dropdown: {
      title: 'Valmeny',
    },
    Autocomplete: {
      title: 'Skriv och välj',
      submit_button_title: 'Visa alternativ',
      no_options: 'Inga alternativ',
      show_all: 'Visa allt',
      show_options_sr: 'Bläddra genom alternativ, stäng med esc-knappen',
      aria_live_options: '%s alternativ',
      selected_sr: 'Vald:',
      indicator_label: 'Hämtar data ...',
    },
    Modal: {
      dialog_title: 'Separat Fönster',
      close_title: 'Stäng',
    },
    Dialog: {
      declineText: 'Avbryt',
      confirmText: 'Godkänn',
    },
    CopyOnClick: {
      clipboard_copy: 'Kopierad',
    },
    NumberFormat: {
      clipboard_copy: 'Kopierad',
      not_available: 'Inte tillgänglig',
    },
    HelpButton: {
      title: 'Hjälptext',
      aria_role: 'Hjälp-knapp',
    },
    Input: {
      submit_button_title: 'Skicka knapp',
      clear_button_title: 'Återställ',
    },
    Pagination: {
      button_title: 'Sida %s',
      next_title: 'Nästa sida',
      prev_title: 'Föregående sida',
      more_pages: '%s fler sidor',
      is_loading_text: 'Laddar nytt innehåll',
      load_button_text: 'Visa mer innehåll',
    },
    Skeleton: {
      aria_busy: 'Bearbetar data ...',
      aria_ready: 'Klar att interagera',
    },
    StepIndicator: {
      overview_title: 'Stegöversikt',
      step_title: 'Steg %step av %count',
    },
    Slider: {
      addTitle: 'Öka (%s)',
      subtractTitle: 'Minska (%s)',
    },
    PaymentCard: {
      text_card_number: 'Kortnummer', // Deprecated: As it's not in use anymore, can be removed in v11.
      text_blocked: 'Spärrat',
      text_expired: 'Utgånget',
      text_not_active: 'Inaktiv',
      text_new_order: 'Beställd',
      text_order_in_process: 'På väg',
      text_replaced: 'Ersatt',
      text_renewed: 'Förnyat',
      text_new: 'Ny',
      text_unknown: 'Okänt',
    },
    Tag: {
      removeIconTitle: 'Ta bort',
      addIconTitle: 'Lägg till',
    },
    Table: {
      accordionToggleButtonSR: 'Visa mer innehåll',
      accordionMoreContentSR: 'Mer innehåll i nästa rad',
      navigationButtonSR: 'Navigera till mer innehåll',
    },
    Upload: {
      title: 'Ladda upp dokument',
      text: 'Dra och släpp eller välj vilka filer du vill ladda upp.',
      textSingular:
        'Dra och släpp eller välj vilken fil du vill ladda upp.',
      fileTypeTableCaption: 'Tillåtna filformat och max filstorlek',
      fileTypeDescription: 'Tillåtna filformat:',
      fileSizeDescription: 'Max filstorlek:',
      fileAmountDescription: 'Max antal filer:',
      fileSizeContent: '%size MB',
      buttonText: 'Välj filer',
      buttonTextSingular: 'Välj fil',
      loadingText: 'Laddar',
      errorLargeFile:
        'Filen du försöker ladda upp är för stor, den maximalt tillåtna storleken är %size MB.',
      errorAmountLimit:
        'Det är begränsat hur många filer du kan ladda upp (%amount).',
      errorUnsupportedFile: 'Filen du försöker ladda upp stöds inte.',
      deleteButton: 'Radera',
      fileListAriaLabel: 'uppladdade filer',
    },
    Popover: {
      closeButtonTitle: 'Stäng',
      openTriggerTitle: 'Klicka för att öppna',
      closeTriggerTitle: 'Klicka för att stänga',
    },
    WordDefinition: {
      closeButtonTitle: 'Stäng ordförklaring',
      openTriggerTitle: 'Klicka för att öppna ordförklaring',
      closeTriggerTitle: 'Klicka för att stänga ordförklaring',
    },
  } satisfies (typeof nb)['nb-NO'],
}
