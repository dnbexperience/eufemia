export default {
  'nb-NO': {
    boolean: {
      yes: 'Ja',
      no: 'Nei',
    },
    step: {
      next: 'Neste',
      previous: 'Tilbake',
    },
    context: {
      submit: 'Send',
    },
    field: {
      stateSummary: 'Oppsummering:',
      error: {
        summary: 'Feil som må rettes:',
        required: 'Dette feltet må fylles ut',
      },
    },
    input: {
      error: {
        required: 'Dette feltet må fylles ut',
        pattern: 'Verdien er ugyldig',
      },
    },
    stringInput: {
      error: {
        minLength: 'Verdien kan ikke være kortere enn {minLength} tegn',
        maxLength: 'Verdien kan ikke være lengre enn {maxLength} tegn',
      },
    },
    numberField: {
      error: {
        minimum: 'Verdien må være minst {minimum}',
        maximum: 'Verdien må være maksimalt {maximum}',
        exclusiveMinimum: 'Verdien må være større enn {exclusiveMinimum}',
        exclusiveMaximum: 'Verdien må være mindre enn {exclusiveMaximum}',
        multipleOf: 'Verdien må være et multiplum av {multipleOf}',
      },
    },
    countryCode: {
      label: 'Landskode',
    },
    date: {
      label: 'Dato',
      error: {
        required: 'Du må angi en gyldig dato',
      },
    },
    expiry: {
      label: 'Utløpsdato',
    },
    email: {
      label: 'E-post',
      error: {
        required: 'Du må fylle inn e-post',
        pattern: 'Dette er ikke en gyldig e-postadresse',
      },
    },
    firstName: {
      label: 'Fornavn',
      error: {
        required: 'Du må fylle inn fornavn',
      },
    },
    lastName: {
      label: 'Etternavn',
      error: {
        required: 'Du må fylle inn etternavn',
      },
    },
    nationalIdentityNumber: {
      label: 'Fødselsnummer (11 siffer)',
      error: {
        required:
          'Ugyldig fødselsnummer. Skriv inn et gyldig fødselsnummer med 11 siffer.',
      },
    },

    organizationNumber: {
      label: 'Organisasjonsnummer',
      error: {
        required: 'Du må fylle inn et organisasjonsnummer',
        pattern: 'Dette er ikke et gyldig organisasjonsnummer',
      },
    },
    bankAccountNumber: {
      label: 'Bankkonto',
      error: {
        required: 'Du må fylle inn et bankkontonummer',
        pattern: 'Dette er ikke et gyldig bankkontonummer',
      },
    },
    phoneNumbe: {
      label: 'Mobilnummer',
      error: {
        required: 'Du må fylle inn et gyldig nummer',
      },
    },
    postalCode: {
      label: 'Postnr.',
      error: {
        required: 'Du må fylle inn et postnummer',
        pattern: 'Dette er ikke et gyldig postnummer',
      },
    },
    city: {
      label: 'Sted',
      error: {
        required: 'Du må fylle inn et sted',
      },
    },
    selectCountry: {
      label: 'Land',
      placeholder: 'Velg et land',
      error: {
        required: 'Du må velge et land',
      },
    },
    password: {
      label: 'Passord',
      ariaLabel: {
        show: 'Vis passord',
        hide: 'Skjul passord',
      },
    },
  },
}
