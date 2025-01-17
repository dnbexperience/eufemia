import nb from './nb-NO'
export default {
  'en-GB': {
    TextCounter: {
      characterDown: '%count of %max characters remaining.',
      characterUp: 'You have used %count of %max characters.',
      characterExceeded: '%count characters over the limit of %max.',
    },
    TimelineItem: {
      alt_label_completed: 'Completed',
      alt_label_current: 'Current',
      alt_label_upcoming: 'Upcoming',
    },
    Breadcrumb: {
      navText: 'Page hierarchy',
      goBackText: 'Back',
      homeText: 'Home',
      backToText: 'Back to...',
    },
    DatePicker: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
      start: 'from',
      end: 'to',
      selectedDate: 'Selected date: %s',
      selectedMonth: 'Selected month %s',
      selectedYear: 'Selected year %s',
      nextMonth: 'Next month %s',
      prevMonth: 'Previous month %s',
      nextYear: 'Next year %s',
      prevYear: 'Previous year %s',
      openPickerText: 'Open date picker',
      maskOrder: 'dd/mm/yyyy',
      maskPlaceholder: 'dd/mm/yyyy', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      dateFormat: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      returnFormat: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submitButtonText: 'OK',
      cancelButtonText: 'Cancel',
      resetButtonText: 'Reset',
      errorMinDate: 'The date cannot be before %s',
      errorMaxDate: 'The date cannot be after %s',
      errorRangeStartDateMinDate: 'Start date cannot be before %s',
      errorRangeStartDateMaxDate: 'Start date cannot be after %s',
      errorRangeEndDateMinDate: 'End date cannot be before %s',
      errorRangeEndDateMaxDate: 'End date cannot be after %s',
      placeholderCharacters: {
        day: 'd',
        month: 'm',
        year: 'y',
      },
      // TODO: add firstDay
    },
    Anchor: {
      targetBlankTitle: 'Opens a new Window',
    },
    GlobalStatus: {
      default_title: 'An error has occurred',
      close_text: 'Close',
      status_anchor_text: 'Go to %s',
    },
    GlobalError: {
      404: {
        title: "We can't find the page you're looking for …",
        text: 'Are you sure you have entered the correct address? Or have we messed with the links?',
      },
      500: {
        title: 'Sorry, a technical error happened!',
        text: 'The service is not working properly at the moment. Try again later.',
      },
      code: 'Error code:',
      help: 'Here are some links that might help:',
    },
    ProgressIndicator: {
      indicator_label: 'Please wait ...',
    },
    Dropdown: {
      title: 'Option Menu',
    },
    Autocomplete: {
      title: 'Type and select',
      submit_button_title: 'Show options',
      no_options: 'No option',
      show_all: 'Show everything',
      show_options_sr: 'Browse options, close with esc button',
      aria_live_options: '%s options',
      selected_sr: 'Selected:',
      indicator_label: 'Getting data ...',
    },
    Modal: {
      dialog_title: 'Dialog Window',
      close_title: 'Close',
    },
    Dialog: {
      declineText: 'Cancel',
      confirmText: 'Approve',
    },
    CopyOnClick: {
      clipboard_copy: 'Copied',
    },
    NumberFormat: {
      clipboard_copy: 'Copied',
      not_available: 'Not available',
    },
    HelpButton: {
      title: 'Help text',
      aria_role: 'Help button',
    },
    Skeleton: {
      aria_busy: 'In progress ...',
      aria_ready: 'Ready to interact',
    },
    Input: {
      submit_button_title: 'Submit button',
      clear_button_title: 'Clear value',
    },
    Pagination: {
      button_title: 'Page %s',
      next_title: 'Next page',
      prev_title: 'Previous page',
      more_pages: '%s more pages',
      is_loading_text: 'Loading new content',
      load_button_text: 'Show more content',
    },
    StepIndicator: {
      overview_title: 'Steps Overview',
      step_title_extended: 'You are on step %step of %count',
      step_title: 'Step %step of %count',
    },
    Slider: {
      addTitle: 'Increase (%s)',
      subtractTitle: 'Decrease (%s)',
    },
    PaymentCard: {
      text_card_number: 'Card number',
      text_expired: 'Expired',
      text_blocked: 'Blocked',
      text_not_active: 'Not activated',
      text_order_in_process: 'Order in process',
      text_renewed: 'Renewed',
      text_replaced: 'Replaced',
      text_unknown: 'Unknown',
    },
    Tag: {
      removeIconTitle: 'Remove',
      addIconTitle: 'Add',
    },
    Table: {
      accordionToggleButtonSR: 'Show more content',
      accordionMoreContentSR: 'More content in the next row',
      navigationButtonSR: 'Navigate to more content',
    },
    Upload: {
      title: 'Upload documents',
      text: 'Drag & drop your files or choose files to upload.',
      textSingular:
        'Drag & drop your file or choose which file to upload.',
      fileTypeTableCaption: 'Allowed formats and max. filesize',
      fileTypeDescription: 'Allowed formats:',
      fileSizeDescription: 'Max. filesize:',
      fileAmountDescription: 'Max. number of files:',
      fileSizeContent: '%size MB',
      buttonText: 'Choose files',
      buttonTextSingular: 'Choose file',
      loadingText: 'Loading',
      errorLargeFile:
        'The file you are trying to upload is too big, the maximum size supported is %size MB.',
      errorAmountLimit:
        'There is a limit to how many files you can upload (%amount).',
      errorUnsupportedFile:
        'The file you are trying to upload is not supported.',
      deleteButton: 'Delete',
      fileListAriaLabel: 'uploaded files',
    },
  } satisfies (typeof nb)['nb-NO'],
}
