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
    },
    SubmitButton: {
      text: 'Send',
      sendText: 'Send inn',
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
    },
    IterateViewContainer: {
      removeButton: 'Fjern',
      editButton: 'Endre',
    },
    SectionViewContainer: {
      editButton: 'Endre',
    },
    SectionEditContainer: {
      doneButton: 'Ferdig',
      cancelButton: 'Avbryt',
      errorInSection: 'Feilene ovenfor må rettes',
    },
    IterateEditContainer: {
      removeButton: 'Fjern',
      doneButton: 'Ferdig',
      cancelButton: 'Avbryt',
      errorInSection: 'Feilene ovenfor må rettes',
    },
    IteratePushContainer: {
      createButton: 'Legg til',
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
    Date: {
      label: 'Dato',
      errorRequired: 'Du må angi en gyldig dato.',
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
      errorRequired:
        'Ugyldig fødselsnummer. Skriv inn et gyldig fødselsnummer med 11 siffer.',
      errorFnr: 'Ugyldig fødselsnummer.',
    },
    OrganizationNumber: {
      label: 'Organisasjonsnummer',
      errorRequired: 'Du må fylle inn et organisasjonsnummer.',
      errorPattern: 'Dette er ikke et gyldig organisasjonsnummer.',
    },
    BankAccountNumber: {
      label: 'Bankkonto',
      errorRequired:
        'Skriv inn et gyldig kontonummer. Kontonummeret må fylles ut.',
      errorPattern: 'Dette er ikke et gyldig kontonummer.',
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
