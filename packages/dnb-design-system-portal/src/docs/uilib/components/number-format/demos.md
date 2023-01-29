---
showTabs: true
redirect_from:
  - /uilib/components/number/demos
---

import {
NumberDefault,
NumberCurrency,
NumberCompact,
NumberPercent,
NumberPhone,
NumberBankAccount,
NumberNationalIdentification,
NumberOrganization,
NumberLocales,
NumberSpacing,
NumberProvider,
} from 'Docs/uilib/components/number-format/Examples'
import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Default numbers

<NumberDefault />

### Currency

<NumberCurrency />

### Compact (shorten) numbers

Shorten numbers should only be used for numbers above 100 000. A small `k` for thausand is not a Norwegian standard, and should not be used in formal contexts.

<NumberCompact />

### Percentage

<NumberPercent />

### Phone

By using `selectall={false}` you disable the auto-select all feature.

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

### Using the Provider with NumberFormat

In this example every NumberFormat will receive the Provider defined properties, including `clean_copy_value`.

<NumberProvider />
