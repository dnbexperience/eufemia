export default {
  'nb-NO': {
    /**
     * Base fields
     */
    Field: {
      stateSummary: 'Oppsummering:',
      errorSummary: 'Feil som må rettes:',
      errorRequired: 'Dette feltet må fylles ut',
      errorPattern: 'Verdien er ugyldig',
    },
    StringField: {
      errorMinLength: 'Verdien kan ikke være kortere enn {minLength} tegn',
      errorMaxLength: 'Verdien kan ikke være lengre enn {maxLength} tegn',
    },
    NumberField: {
      errorMinimum: 'Verdien må være minst {minimum}',
      errorMaximum: 'Verdien må være maksimalt {maximum}',
      errorExclusiveMinimum:
        'Verdien må være større enn {exclusiveMinimum}',
      errorExclusiveMaximum:
        'Verdien må være mindre enn {exclusiveMaximum}',
      errorMultipleOf: 'Verdien må være et multiplum av {multipleOf}',
    },
    BooleanField: {
      yes: 'Ja',
      no: 'Nei',
    },
    Context: {
      submit: 'Send',
    },
    Step: {
      next: 'Neste',
      previous: 'Tilbake',
    },

    /**
     * Feature fields
     */
    CountryCode: {
      label: 'Landskode',
    },
    Date: {
      label: 'Dato',
      errorRequired: 'Du må angi en gyldig dato',
    },
    Expiry: {
      label: 'Utløpsdato',
    },
    Email: {
      label: 'E-post',
      errorRequired: 'Du må fylle inn e-post',
      errorPattern: 'Dette er ikke en gyldig e-postadresse',
    },
    FirstName: {
      label: 'Fornavn',
      errorRequired: 'Du må fylle inn fornavn',
    },
    LastName: {
      label: 'Etternavn',
      errorRequired: 'Du må fylle inn etternavn',
    },
    NationalIdentityNumber: {
      label: 'Fødselsnummer (11 siffer)',
      errorRequired:
        'Ugyldig fødselsnummer. Skriv inn et gyldig fødselsnummer med 11 siffer.',
    },
    OrganisationNumber: {
      label: 'Organisasjonsnummer',
      errorRequired: 'Du må fylle inn et organisasjonsnummer',
      errorPattern: 'Dette er ikke et gyldig organisasjonsnummer',
    },
    BankAccountNumber: {
      label: 'Bankkonto',
      errorRequired: 'Du må fylle inn et bankkontonummer',
      errorPattern: 'Dette er ikke et gyldig bankkontonummer',
    },
    PhoneNumber: {
      label: 'Mobilnummer',
      errorRequired: 'Du må fylle inn et gyldig nummer',
    },
    PostalCode: {
      label: 'Postnr.',
      errorRequired: 'Du må fylle inn et postnummer',
      errorPattern: 'Dette er ikke et gyldig postnummer',
    },
    City: {
      label: 'Sted',
      errorRequired: 'Du må fylle inn et sted',
    },
    SelectCountry: {
      label: 'Land',
      placeholder: 'Velg et land',
      errorRequired: 'Du må velge et land',
    },
    Password: {
      label: 'Passord',
      ariaLabelShow: 'Vis passord',
      ariaLabelHide: 'Skjul passord',
    },
  },
}
