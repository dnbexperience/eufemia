import type nb from './nb-NO'
export default {
  'da-DK': {
    /**
     * General
     */
    Field: {
      errorSummaryTitle: 'Felter der skal rettes',
      stateSummary: 'Oversigt:',
      errorSummary: 'Felter der skal rettes:',
      errorRequired: 'Dette felt skal udfyldes.',
      errorPattern: 'Ugyldig værdi.',
      optionalLabelSuffix: '(valgfrit)',
    },
    SubmitButton: {
      text: 'Send',
      sendText: 'Indsend',
    },
    SubmitIndicator: {
      label: 'Vent venligst',
    },
    Isolation: {
      commitButtonText: 'Tilføj',
      preventUncommittedChangesText:
        'Du har ændringer, som enten skal tilføjes eller nulstilles.',
    },
    Step: {
      summaryTitle: 'Oversigt',
      stepHasError: 'Skemaet indeholder fejl.',
    },
    WizardEditButton: {
      text: 'Rediger',
    },
    WizardPreviousButton: {
      text: 'Tilbage',
    },
    WizardNextButton: {
      text: 'Næste',
    },
    RemoveButton: {
      text: 'Fjern',
      confirmRemoveText: 'Er du sikker på, at du vil fjerne dette?',
    },
    InfoOverlaySuccess: {
      title: 'Tak',
      description: 'Vi har modtaget dine oplysninger.',
      buttonText: 'Tilbage til forsiden',
    },
    InfoOverlayError: {
      title: 'Beklager, noget gik galt',
      description: 'Prøv igen eller kontakt os, hvis fejlen fortsætter.',
      cancelButton: 'Tilbage',
      retryButton: 'Prøv igen',
      retryingText: 'Prøver igen...',
    },
    SectionViewContainer: {
      editButton: 'Rediger',
    },
    SectionEditContainer: {
      doneButton: 'Færdig',
      cancelButton: 'Annuller',
      errorInSection: 'Fejlene ovenfor skal rettes.',
      confirmCancelText:
        'Er du sikker på, at du vil forkaste dine ændringer?',
    },
    IterateViewContainer: {
      removeButton: 'Fjern',
      editButton: 'Rediger',
    },
    IterateEditContainer: {
      removeButton: 'Fjern',
      doneButton: 'Færdig',
      cancelButton: 'Annuller',
      resetButton: 'Nulstil',
      errorInContainer: 'Fejlene ovenfor skal rettes.',
      confirmResetText:
        'Er du sikker på, at du vil nulstille ændringerne?',
    },
    IteratePushContainer: {
      createButton: 'Tilføj',
      itemsLimitReached: 'Du har nået grænsen: {limit}',
    },
    IterateArray: {
      errorMinItems: 'Du skal tilføje mindst {minItems}.',
      errorMaxItems: 'Du kan ikke tilføje flere end {maxItems}.',
    },

    /**
     * Base fields
     */
    StringField: {
      errorMinLength: 'Værdien må ikke være kortere end {minLength} tegn.',
      errorMaxLength: 'Værdien må ikke være længere end {maxLength} tegn.',
    },
    NumberField: {
      errorMinimum: 'Værdien skal være mindst {minimum}.',
      errorMaximum: 'Værdien må højst være {maximum}.',
      errorExclusiveMinimum:
        'Værdien skal være større end {exclusiveMinimum}.',
      errorExclusiveMaximum:
        'Værdien skal være mindre end {exclusiveMaximum}.',
      errorMultipleOf: 'Indtast en værdi, der går op i {multipleOf}.',
      errorInteger: 'Værdien skal være et helt tal (uden decimaler).',
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
      label: 'Postadresse',
      errorRequired: 'Du skal udfylde en postadresse.',
      errorPattern: 'Ugyldig postadresse. Indtast en postadresse.',
    },
    StreetAddress: {
      label: 'Gadeadresse',
      errorRequired: 'Du skal udfylde en gadeadresse.',
      errorPattern: 'Ugyldig gadeadresse. Indtast en gadeadresse.',
      suggestionPlaceholder: 'Indtast en adresse',
    },
    Date: {
      label: 'Dato',
      errorRequired: 'Du skal udfylde en dato.',
      errorRequiredRange: 'Du skal udfylde et datointerval.',
      errorMinDate: 'Valgt dato må ikke være før {date}.',
      errorMaxDate: 'Valgt dato må ikke være efter {date}.',
      errorStartDateMinDate: 'Startdato må ikke være før {date}.',
      errorStartDateMaxDate: 'Startdato må ikke være efter {date}.',
      errorEndDateMinDate: 'Slutdato må ikke være før {date}.',
      errorEndDateMaxDate: 'Slutdato må ikke være efter {date}.',
      errorInvalidDate: 'Ugyldig dato.',
      errorInvalidStartDate: 'Ugyldig startdato.',
      errorInvalidEndDate: 'Ugyldig slutdato.',
    },
    Expiry: {
      label: 'Udløbsdato',
      errorMonth: '{month} er ikke en gyldig måned.',
      errorYear: '{year} er ikke et gyldigt år.',
      errorRequired: 'Du skal udfylde en udløbsdato.',
    },
    Email: {
      label: 'E-mailadresse',
      errorRequired: 'Du skal udfylde en e-mailadresse.',
      errorPattern: 'Ugyldig e-mailadresse. Indtast en e-mailadresse.',
    },
    FirstName: {
      label: 'Fornavn',
      errorRequired: 'Du skal udfylde fornavn.',
      errorPattern:
        'Kun bogstaver og tegn som bindestreg og mellemrum er tilladt.',
    },
    LastName: {
      label: 'Efternavn',
      errorRequired: 'Du skal udfylde efternavn.',
      errorPattern:
        'Kun bogstaver og tegn som bindestreg og mellemrum er tilladt.',
    },
    CompanyName: {
      label: 'Firmanavn',
      errorRequired: 'Du skal udfylde firmanavn.',
    },
    NationalIdentityNumber: {
      label: 'Norsk fødselsnummer (11 cifre)',
      errorRequired: 'Du skal udfylde et fødselsnummer.',
      errorFnr: 'Ugyldigt fødselsnummer.',
      errorFnrLength:
        'Ugyldigt fødselsnummer. Indtast et gyldigt fødselsnummer med 11 cifre.',
      errorDnr: 'Ugyldigt d-nummer.',
      errorDnrLength:
        'Ugyldigt d-nummer. Indtast et gyldigt d-nummer med 11 cifre.',
      errorMinimumAgeValidator: 'Skal være mindst {age} år.',
      errorMinimumAgeValidatorLength:
        'Ugyldig fødselsdato. Indtast en gyldig fødselsdato (inkl. århundredetal) med 7 cifre.',
    },
    OrganizationNumber: {
      label: 'Organisationsnummer',
      errorRequired: 'Du skal udfylde et organisationsnummer.',
      errorOrgNo: 'Ugyldigt organisationsnummer.',
      errorOrgNoLength:
        'Ugyldigt organisationsnummer. Indtast et gyldigt organisationsnummer med 9 cifre.',
    },
    BankAccountNumber: {
      label: 'Bankkonto',
      errorRequired: 'Du skal udfylde et kontonummer.',
      errorBankAccountNumber: 'Ugyldigt kontonummer.',
      errorBankAccountNumberLength:
        'Ugyldigt kontonummer. Indtast et gyldigt kontonummer med 11 cifre.',
    },
    DateOfBirth: {
      label: 'Fødselsdato',
      dayLabel: 'Dag',
      monthLabel: 'Måned',
      yearLabel: 'År',
      dayPlaceholder: 'dd',
      monthPlaceholder: 'måned',
      yearPlaceholder: 'åååå',
      errorRequired: 'Du skal udfylde en fødselsdato.',
      errorDateOfBirth: 'Ugyldig fødselsdato.',
      errorDateOfBirthFuture:
        'Ugyldig fødselsdato. Angiv dags dato eller tidligere.',
    },
    PhoneNumber: {
      label: 'Mobilnummer',
      countryCodeLabel: 'Landskode',
      errorRequired:
        'Mobilnummer skal udfyldes. Hvis du ikke har et mobilnummer, kan du indtaste et andet telefonnummer.',
      warningRequired:
        'Du har ikke angivet et mobilnummer. Du kan stadig bruge dette nummer, hvis det er korrekt.',
    },
    PostalCodeAndCity: {
      label: 'Postnummer og by',
      invalidCode: 'Ugyldigt postnummer.',
    },
    PostalCode: {
      label: 'Postnr.',
      errorRequired: 'Du skal udfylde et postnummer.',
      errorPattern: 'Dette er ikke et gyldigt postnummer (fire cifre).',
    },
    City: {
      label: 'By',
      errorRequired: 'Du skal udfylde et bynavn.',
      errorPattern:
        'Bynavn må kun indeholde bogstaver og gyldige tegn som bindestreg og mellemrum.',
    },
    SelectCountry: {
      label: 'Land',
      placeholder: 'Vælg et land',
      errorRequired: 'Du skal vælge et land fra listen.',
    },
    SelectCurrency: {
      label: 'Valuta',
      placeholder: 'Vælg en valuta',
      errorRequired: 'Du skal vælge en valuta fra listen.',
    },
    Password: {
      label: 'Adgangskode',
      errorRequired: 'Du skal udfylde en adgangskode.',
      ariaLabelShow: 'Vis adgangskode',
      ariaLabelHide: 'Skjul adgangskode',
    },
    Upload: {
      errorRequired: 'Du skal uploade mindst én fil.',
      errorInvalidFiles: 'Fjern alle filer, der indeholder fejl.',
    },
  } satisfies (typeof nb)['nb-NO'],
}
