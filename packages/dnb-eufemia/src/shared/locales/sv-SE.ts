import type nb from './nb-NO'
export default {
  'sv-SE': {
    TextCounter: {
      characterDown: '%count av %max tecken återstår.',
      characterUp: 'Du har använt %count av %max tecken.',
      characterExceeded: '%count tecken över gränsen på %max.',
    },
    TimelineItem: {
      altLabelCompleted: 'Utförd',
      altLabelCurrent: 'Nuvarande',
      altLabelUpcoming: 'Kommande',
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
      defaultTitle: 'Ett fel har inträffat',
      closeText: 'Stäng',
      statusAnchorText: 'Gå till %s',
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
      errorMessageCode: 'Felmeddelande-kod: %statusCode',
      help: 'Här är några länkar som kanske kan hjälpa:',
    },
    ProgressIndicator: {
      indicatorLabel: 'Vänligen vänta ...',
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
      submitButtonTitle: 'Visa alternativ',
      noOptions: 'Inga alternativ',
      showAll: 'Visa allt',
      showOptionsSr: 'Bläddra genom alternativ, stäng med esc-knappen',
      ariaLiveOptions: '%s alternativ',
      selectedSr: 'Vald:',
      indicatorLabel: 'Hämtar data ...',
    },
    Modal: {
      dialogTitle: 'Separat Fönster',
      closeTitle: 'Stäng',
    },
    Dialog: {
      declineText: 'Avbryt',
      confirmText: 'Godkänn',
    },
    CopyOnClick: {
      clipboardCopy: 'Kopierad',
    },
    NumberFormat: {
      clipboardCopy: 'Kopierad',
      notAvailable: 'Inte tillgänglig',
    },
    HelpButton: {
      title: 'Hjälptext',
      ariaRole: 'Hjälp-knapp',
    },
    Input: {
      submitButtonTitle: 'Skicka knapp',
      clearButtonTitle: 'Återställ',
    },
    Pagination: {
      buttonTitle: 'Sida %s',
      nextTitle: 'Nästa sida',
      prevTitle: 'Föregående sida',
      morePages: '%s fler sidor',
      isLoadingText: 'Laddar nytt innehåll',
      loadButtonText: 'Visa mer innehåll',
    },
    Skeleton: {
      ariaBusy: 'Bearbetar data ...',
      ariaReady: 'Klar att interagera',
    },
    StepIndicator: {
      overviewTitle: 'Stegöversikt',
      stepTitle: 'Steg %step av %count',
    },
    Slider: {
      addTitle: 'Öka (%s)',
      subtractTitle: 'Minska (%s)',
    },
    PaymentCard: {
      textBlocked: 'Spärrat',
      textExpired: 'Utgånget',
      textNotActive: 'Inaktiv',
      textNewOrder: 'Beställd',
      textOrderInProcess: 'På väg',
      textReplaced: 'Ersatt',
      textRenewed: 'Förnyat',
      textNew: 'Ny',
      textUnknown: 'Okänt',
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
      focusTrapTitle: 'Klicka för att återgå',
    },
    TermDefinition: {
      closeButtonTitle: 'Stäng ordförklaring',
      openTriggerTitle: 'Klicka för att öppna ordförklaring',
      closeTriggerTitle: 'Klicka för att stänga ordförklaring',
    },
  } satisfies (typeof nb)['nb-NO'],
}
