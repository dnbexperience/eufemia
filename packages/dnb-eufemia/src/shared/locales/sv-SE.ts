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
      navText: 'Sidhierarki',
      goBackText: 'Tillbaka',
      homeText: 'Hem',
      backToText: 'Tillbaka till...',
    },
    DatePicker: {
      day: 'dag',
      month: 'månad',
      year: 'år',
      start: 'från',
      end: 'till',
      selectedDate: 'Vald datum: %s',
      selectedMonth: 'Vald månad %s',
      selectedYear: 'Vald år %s',
      nextMonth: 'Nästa månad %s',
      prevMonth: 'Föregående månad %s',
      nextYear: 'Nästa år %s',
      prevYear: 'Föregående år %s',
      openPickerText: 'öppna datumväljare',
      maskOrder: 'dd/mm/yyyy',
      maskPlaceholder: 'dd.mm.åååå',
      dateFormat: 'yyyy-MM-dd',
      returnFormat: 'yyyy-MM-dd',
      submitButtonText: 'Ok',
      cancelButtonText: 'Avbryt',
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
        title: 'Vi hittar inte sidan du letar efter …',
        text: 'Är du säker på att du har skrivit rätt adress? Eller har vi strulat till det med länkarna?',
      },
      500: {
        title: 'Tyvärr, här hände något fel!',
        text: 'Tjänsten fungerar inte som den ska för tillfället, men försök igen senare.',
      },
      code: 'Felkod:',
      help: 'Här är några länkar som kanske kan hjälpa:',
    },
    ProgressIndicator: {
      indicator_label: 'Var vänlig vänta ...',
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
      step_title_extended: 'Du är på steg %step av %count',
      step_title: 'Steg %step av %count',
    },
    Slider: {
      addTitle: 'Öka (%s)',
      subtractTitle: 'Minska (%s)',
    },
    PaymentCard: {
      text_card_number: 'Kortnummer',
      text_expired: 'Utgånget',
      text_blocked: 'Spärrat',
      text_not_active: 'Ej aktiverat',
      text_order_in_process: 'Under behandling',
      text_renewed: 'Förnyat',
      text_replaced: 'Ersatt',
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
      fileTypeTableCaption: 'Tillåtna filformat och maximal filstorlek',
      fileTypeDescription: 'Tillåtna filformat:',
      fileSizeDescription: 'Max filstorlek:',
      fileAmountDescription: 'Max antal filer:',
      fileSizeContent: '%size MB',
      buttonText: 'Välj filer',
      buttonTextSingular: 'Välj fil',
      loadingText: 'Laddar',
      errorLargeFile:
        'Filen du försöker ladda upp är för stor, den maximala stödda storleken är %size MB.',
      errorAmountLimit:
        'Det är begränsat hur många filer du kan ladda upp (%amount).',
      errorUnsupportedFile: 'Filen du försöker ladda upp stöds inte.',
      deleteButton: 'Ta bort',
      fileListAriaLabel: 'uppladdade filer',
    },
  } satisfies (typeof nb)['nb-NO'],
}
