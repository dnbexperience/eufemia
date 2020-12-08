---
showTabs: true
---

import {
NumberDefault,
NumberCurrency,
NumberPhone,
NumberBankAccount,
NumberNationalIdentification,
NumberOrganization,
NumberLocales,
} from 'Pages/uilib/components/number/Examples'
import ChangeLocale from 'Src/core/ChangeLocale'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Default numbers

<NumberDefault />

### Currency

<NumberCurrency />

### Phone

By using `selectall={false}` you disable the auto select all feature.

<NumberPhone />

### Bank Account number (Kontonummer)

<NumberBankAccount />

### National Identification number (Fødselsnummer)

<NumberNationalIdentification />

### Organization number (Organisasjonsnummer)

<NumberOrganization />

### Numbers and currencies in different locales

<NumberLocales />
