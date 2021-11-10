---
showTabs: true
redirect_from:
  - /uilib/components/number/demos
---

import {
NumberDefault,
NumberCurrency,
NumberPercent,
NumberPhone,
NumberBankAccount,
NumberNationalIdentification,
NumberOrganization,
NumberLocales,
NumberSpacing,
} from 'Docs/uilib/components/number-format/Examples'
import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Default numbers

<NumberDefault />

### Currency

<NumberCurrency />

### Percentage

<NumberPercent />

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

### NumberFormat and spacing

The NumberFormat uses `display: inline-block;` in order to make the [spacing system](/uilib/components/space) to work.

<NumberSpacing />
