import type nb from './nb-NO'
export default {
  'sv-SE': {
    /**
     * General
     */
    Field: {
      errorSummaryTitle: 'Fel som måste åtgärdas',
      stateSummary: 'Sammanfattning:',
      errorSummary: 'Fel som måste åtgärdas:',
      errorRequired: 'Detta fält måste fyllas i.',
      errorPattern: 'Du måste ange ett giltigt värde.',
      optionalLabelSuffix: '(valfritt)',
    },
    SubmitButton: {
      text: 'Skicka',
      sendText: 'Skicka in',
    },
    SubmitIndicator: {
      label: 'Vänligen vänta',
    },
    Isolation: {
      commitButtonText: 'Lägg till',
      preventUncommittedChangesText:
        'Du måste antingen lägga till eller förkasta ändringarna.',
    },
    Step: {
      summaryTitle: 'Sammanfattning',
      stepHasError: 'Formuläret innehåller fel.',
    },
    WizardEditButton: {
      text: 'Ändra',
    },
    WizardPreviousButton: {
      text: 'Tillbaka',
    },
    WizardNextButton: {
      text: 'Nästa',
    },
    RemoveButton: {
      text: 'Ta bort',
      confirmRemoveText: 'Är du säker på att du vill ta bort detta?',
    },
    InfoOverlaySuccess: {
      title: 'Tack',
      description: 'Vi har mottagit din information.',
      buttonText: 'Tillbaka till startsidan',
    },
    InfoOverlayError: {
      title: 'Tyvärr, något gick fel',
      description: 'Försök igen eller kontakta oss om felet kvarstår.',
      cancelButton: 'Tillbaka',
      retryButton: 'Försök igen',
      retryingText: 'Försöker igen...',
    },
    SectionViewContainer: {
      editButton: 'Ändra',
    },
    SectionEditContainer: {
      doneButton: 'Klar',
      cancelButton: 'Avbryt',
      errorInSection: 'Du måste rätta felen ovan.',
      confirmCancelText:
        'Är du säker på att du vill ångra dina ändringar?',
    },
    IterateViewContainer: {
      removeButton: 'Ta bort',
      editButton: 'Ändra',
    },
    IterateEditContainer: {
      removeButton: 'Ta bort',
      doneButton: 'Klar',
      cancelButton: 'Avbryt',
      resetButton: 'Återställ',
      errorInContainer: 'Du måste rätta felen ovan.',
      confirmResetText:
        'Är du säker på att du vill återställa ändringarna?',
    },
    IteratePushContainer: {
      createButton: 'Lägg till',
      itemsLimitReached: 'Du har nått gränsen på: {limit}',
    },
    IterateArray: {
      errorMinItems: 'Du måste lägga till minst {minItems}.',
      errorMaxItems: 'Du kan inte lägga till fler än {maxItems}.',
    },

    /**
     * Base fields
     */
    StringField: {
      errorMinLength: 'Kan inte vara kortare än {minLength} tecken.',
      errorMaxLength: 'Kan inte vara längre än {maxLength} tecken.',
    },
    NumberField: {
      errorMinimum: 'Måste vara minst {minimum}.',
      errorMaximum: 'Måste vara max {maximum}.',
      errorExclusiveMinimum: 'Måste vara större än {exclusiveMinimum}.',
      errorExclusiveMaximum: 'Måste vara mindre än {exclusiveMaximum}.',
      errorMultipleOf: 'Måste vara delbart med {multipleOf}.',
      errorInteger: 'Måste vara ett heltal (utan decimaler).',
    },
    BooleanField: {
      yes: 'Ja',
      no: 'Nej',
    },
    ToggleField: {
      yes: 'Ja',
      no: 'Nej',
    },

    /**
     * Feature fields
     */
    PostalAddress: {
      label: 'Postadress',
      errorRequired: 'Du måste fylla i en postadress.',
      errorPattern: 'Du måste ange en giltig postadress.',
    },
    StreetAddress: {
      label: 'Gatuadress',
      errorRequired: 'Du måste fylla i en gatuadress.',
      errorPattern: 'Du måste ange en giltig gatuadress.',
      suggestionPlaceholder: 'Ange en adress',
    },
    Date: {
      label: 'Datum',
      errorRequired: 'Du måste fylla i ett datum.',
      errorRequiredRange: 'Du måste fylla i ett datumintervall.',
      errorMinDate: 'Valt datum kan inte vara före {date}.',
      errorMaxDate: 'Valt datum kan inte vara efter {date}.',
      errorStartDateMinDate: 'Startdatum kan inte vara före {date}.',
      errorStartDateMaxDate: 'Startdatum kan inte vara efter {date}.',
      errorEndDateMinDate: 'Slutdatum kan inte vara före {date}.',
      errorEndDateMaxDate: 'Slutdatum kan inte vara efter {date}.',
      errorInvalidDate: 'Ogiltigt datum.',
      errorInvalidStartDate: 'Ogiltigt startdatum.',
      errorInvalidEndDate: 'Ogiltigt slutdatum.',
    },
    Expiry: {
      label: 'Utgångsdatum',
      errorMonth: '{month} är inte en giltig månad.',
      errorYear: '{year} är inte ett giltigt år.',
      errorRequired: 'Du måste fylla i ett utgångsdatum.',
    },
    Email: {
      label: 'E-postadress',
      errorRequired: 'Du måste fylla i en e-postadress.',
      errorPattern: 'Du måste ange en giltig e-postadress.',
    },
    FirstName: {
      label: 'Förnamn',
      errorRequired: 'Du måste fylla i förnamn.',
      errorPattern:
        'Du måste ange ett giltigt förnamn. Endast bokstäver, bindestreck och mellanslag är tillåtna.',
    },
    LastName: {
      label: 'Efternamn',
      errorRequired: 'Du måste fylla i efternamn.',
      errorPattern:
        'Du måste ange ett giltigt efternamn. Endast bokstäver, bindestreck och mellanslag är tillåtna.',
    },
    CompanyName: {
      label: 'Företagsnamn',
      errorRequired: 'Du måste fylla i företagsnamn.',
    },
    NationalIdentityNumber: {
      label: 'Norsk "fødselsnummer" (11 siffror)',
      errorRequired: 'Du måste fylla i ett födselsnummer.',
      errorFnr: 'Ogiltigt födselsnummer.',
      errorFnrLength:
        'Du måste ange ett giltigt födselsnummer med 11 siffror.',
      errorDnr: 'Ogiltigt d-nummer.',
      errorDnrLength: 'Du måste ange ett giltigt d-nummer med 11 siffror.',
      errorMinimumAgeValidator: 'Måste vara minst {age} år.',
      errorMinimumAgeValidatorLength:
        'Du måste ange ett giltigt födelsedatum med 7 siffror (inklusive århundrade).',
    },
    OrganizationNumber: {
      label: 'Organisationsnummer',
      errorRequired: 'Du måste fylla i ett organisationsnummer.',
      errorOrgNo: 'Ogiltigt organisationsnummer.',
      errorOrgNoLength:
        'Du måste ange ett giltigt organisationsnummer med 9 siffror.',
    },
    BankAccountNumber: {
      label: 'Bankkonto',
      errorRequired: 'Du måste fylla i ett kontonummer.',
      errorBankAccountNumber: 'Ogiltigt kontonummer.',
      errorBankAccountNumberLength:
        'Du måste ange ett giltigt kontonummer med 11 siffror.',
    },
    DateOfBirth: {
      label: 'Födelsedatum',
      dayLabel: 'Dag',
      monthLabel: 'Månad',
      yearLabel: 'År',
      dayPlaceholder: 'dd',
      monthPlaceholder: 'månad',
      yearPlaceholder: 'åååå',
      errorRequired: 'Du måste fylla i ett födelsedatum.',
      errorDateOfBirth: 'Ogiltigt födelsedatum.',
      errorDateOfBirthFuture:
        'Ogiltigt födelsedatum. Ange dagens datum eller tidigare.',
    },
    PhoneNumber: {
      numberLabel: 'Mobilnummer',
      countryCodeLabel: 'Landskod',
      errorRequired:
        'Mobilnummer måste fyllas i. Om du inte har ett mobilnummer kan du ange ett annat telefonnummer.',
      warningRequired:
        'Du har inte angett ett mobilnummer. Du kan ändå använda detta nummer om det är korrekt.',
    },
    PostalCodeAndCity: {
      label: 'Postnummer och ort',
      invalidCode: 'Ogiltigt postnummer.',
    },
    PostalCode: {
      label: 'Postnr.',
      errorRequired: 'Du måste fylla i ett postnummer.',
      errorPattern: 'Du måste ange ett giltigt postnummer (fyra siffror).',
    },
    City: {
      label: 'Ort',
      errorRequired: 'Du måste fylla i ett ortsnamn.',
      errorPattern:
        'Du måste ange ett giltigt ortsnamn. Endast bokstäver, bindestreck och mellanslag är tillåtna.',
    },
    SelectCountry: {
      label: 'Land',
      placeholder: 'Välj ett land',
      errorRequired: 'Du måste välja ett land från listan.',
    },
    SelectCurrency: {
      label: 'Valuta',
      placeholder: 'Välj en valuta',
      errorRequired: 'Du måste välja en valuta från listan.',
    },
    Password: {
      label: 'Lösenord',
      errorRequired: 'Du måste fylla i ett lösenord.',
      ariaLabelShow: 'Visa lösenord',
      ariaLabelHide: 'Dölj lösenord',
    },
    Upload: {
      errorRequired: 'Du måste ladda upp minst en fil.',
      errorInvalidFiles: 'Ta bort alla filer som innehåller fel.',
    },
  } satisfies (typeof nb)['nb-NO'],
}
