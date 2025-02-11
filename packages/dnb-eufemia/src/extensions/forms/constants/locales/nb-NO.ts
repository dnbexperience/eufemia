export default {
  'nb-NO': {
    /**
     * General
     */
    Field: {
      errorSummaryTitle: 'Feil som må rettes',
      stateSummary: 'Oppsummering:',
      errorSummary: 'Feil som må rettes:',
      errorRequired: 'Dette feltet må fylles ut.',
      errorPattern: 'Verdien er ugyldig.',
      optionalLabelSuffix: '(valgfritt)',
    },
    SubmitButton: {
      text: 'Send',
      sendText: 'Send inn',
    },
    SubmitIndicator: {
      label: 'Vennligst vent',
    },
    Isolation: {
      commitButtonText: 'Legg til',
    },
    Step: {
      summaryTitle: 'Oppsummering',
    },
    WizardEditButton: {
      text: 'Endre',
    },
    WizardPreviousButton: {
      text: 'Tilbake',
    },
    WizardNextButton: {
      text: 'Neste',
    },
    RemoveButton: {
      text: 'Fjern',
      confirmRemoveText: 'Er du sikker på at du vil slette dette?',
    },
    InfoOverlaySuccess: {
      title: 'Takk skal du ha',
      description: 'Vi har mottatt din informasjon.',
      buttonText: 'Tilbake til forsiden',
    },
    InfoOverlayError: {
      title: 'Beklager, noe gikk galt',
      description:
        'Prøv igjen eller ta kontakt med oss om feilen vedstår.',
      cancelButton: 'Tilbake',
      retryButton: 'Prøv igjen',
      retryingText: 'Prøver på nytt...',
    },
    SectionViewContainer: {
      editButton: 'Endre',
    },
    SectionEditContainer: {
      doneButton: 'Ferdig',
      cancelButton: 'Avbryt',
      errorInSection: 'Feilene ovenfor må rettes.',
    },
    IterateViewContainer: {
      removeButton: 'Fjern',
      editButton: 'Endre',
    },
    IterateEditContainer: {
      removeButton: 'Fjern',
      doneButton: 'Ferdig',
      cancelButton: 'Avbryt',
      errorInContainer: 'Feilene ovenfor må rettes.',
    },
    IteratePushContainer: {
      createButton: 'Legg til',
      itemsLimitReached: 'Du har nådd grensen på: {limit}',
    },

    /**
     * Base fields
     */
    StringField: {
      errorMinLength:
        'Verdien kan ikke være kortere enn {minLength} tegn.',
      errorMaxLength: 'Verdien kan ikke være lengre enn {maxLength} tegn.',
    },
    NumberField: {
      errorMinimum: 'Verdien må være minst {minimum}.',
      errorMaximum: 'Verdien må være maksimalt {maximum}.',
      errorExclusiveMinimum:
        'Verdien må være større enn {exclusiveMinimum}.',
      errorExclusiveMaximum:
        'Verdien må være mindre enn {exclusiveMaximum}.',
      errorMultipleOf: 'Verdien må være et multiplum av {multipleOf}.',
    },
    BooleanField: {
      yes: 'Ja',
      no: 'Nei',
    },
    ToggleField: {
      yes: 'Ja',
      no: 'Nei',
    },

    /**
     * Feature fields
     */
    PostalAddress: {
      label: 'Postadresse',
      errorRequired: 'Du må fylle inn en postadresse.',
      errorPattern: 'Ugyldig postadresse. Skriv inn en postadresse.',
    },
    StreetAddress: {
      label: 'Gateadresse',
      errorRequired: 'Du må fylle inn en gateaddresse.',
      errorPattern: 'Ugyldig gateaddresse. Skriv inn en gateaddresse.',
    },
    Date: {
      label: 'Dato',
      errorRequired: 'Du må angi en gyldig dato.',
      errorMinDate: 'Valgt dato kan ikke være før %s.',
      errorMaxDate: 'Valgt dato kan ikke være etter %s.',
      errorRangeStartDateMinDate: 'Startdato kan ikke være før %s.',
      errorRangeStartDateMaxDate: 'Startdato kan ikke være etter %s.',
      errorRangeEndDateMinDate: 'Sluttdato kan ikke være før %s.',
      errorRangeEndDateMaxDate: 'Sluttdato kan ikke være etter %s.',
    },
    Expiry: {
      label: 'Utløpsdato',
    },
    Email: {
      label: 'E-postadresse',
      errorRequired: 'Du må fylle inn en e-postadresse.',
      errorPattern: 'Ugyldig e-postadresse. Skriv inn en e-postadresse.',
    },
    FirstName: {
      label: 'Fornavn',
      errorRequired: 'Du må fylle inn fornavn.',
      errorPattern:
        'Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.',
    },
    LastName: {
      label: 'Etternavn',
      errorRequired: 'Du må fylle inn etternavn.',
      errorPattern:
        'Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.',
    },
    CompanyName: {
      label: 'Firmanavn',
      errorRequired: 'Du må fylle inn firmanavn.',
    },
    NationalIdentityNumber: {
      label: 'Fødselsnummer (11 siffer)',
      errorRequired: 'Du må fylle inn et fødselsnummer.',
      errorFnr: 'Ugyldig fødselsnummer.',
      errorFnrLength:
        'Ugyldig fødselsnummer. Skriv inn et gyldig fødselsnummer med 11 siffer.',
      errorDnr: 'Ugyldig d-nummer.',
      errorDnrLength:
        'Ugyldig d-nummer. Skriv inn et gyldig d-nummer med 11 siffer.',
      errorMinimumAgeValidator: 'Må være minst {age} år.',
      errorMinimumAgeValidatorLength:
        'Ugyldig fødselsdato. Skriv inn en gyldig fødselsdato (inkl. århundresiffer) med 7 siffer.',
    },
    OrganizationNumber: {
      label: 'Organisasjonsnummer',
      errorRequired: 'Du må fylle inn et organisasjonsnummer.',
      errorOrgNo: 'Ugyldig organisasjonsnummer.',
      errorOrgNoLength:
        'Ugyldig organisasjonsnummer. Skriv inn et gyldig organisasjonsnummer med 9 siffer.',
    },
    BankAccountNumber: {
      label: 'Bankkonto',
      errorRequired: 'Du må fylle inn et kontonummer.',
      errorBankAccountNumber: 'Ugyldig kontonummer.',
      errorBankAccountNumberLength:
        'Ugyldig kontonummer. Skriv inn et gyldig kontonummer med 11 siffer.',
    },
    PhoneNumber: {
      label: 'Mobilnummer',
      countryCodeLabel: 'Landskode',
      errorRequired:
        'Mobilnummer må fylles ut. Hvis du ikke har et mobilnummer, kan du oppgi et annet telefonnummer.',
      warningRequired:
        'Du har ikke skrevet inn et mobilnummer. Du kan likevel bruke dette nummeret hvis det er riktig.',
    },
    PostalCodeAndCity: {
      label: 'Postnummer og sted',
      invalidCode: 'Ugyldig postnummer.',
    },
    PostalCode: {
      label: 'Postnr.',
      errorRequired: 'Du må fylle inn et postnummer.',
      errorPattern: 'Dette er ikke et gyldig postnummer (fire siffer).',
    },
    City: {
      label: 'Sted',
      errorRequired: 'Du må fylle inn et stedsnavn.',
      errorPattern:
        'Stedsnavn kan kun inneholde bokstaver og gyldige tegn som bindestrek og mellomrom.',
    },
    SelectCountry: {
      label: 'Land',
      placeholder: 'Velg et land',
      errorRequired: 'Du må velge et land fra listen.',
    },
    Password: {
      label: 'Passord',
      ariaLabelShow: 'Vis passord',
      ariaLabelHide: 'Skjul passord',
    },
    Upload: {
      errorRequired: 'Du må laste opp minst en fil.',
      errorInvalidFiles: 'Fjern alle filer som har feil.',
    },
  },
}
