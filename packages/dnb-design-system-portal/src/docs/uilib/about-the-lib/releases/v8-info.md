---
draft: true
---

# v8

- [Migration](#migration)

## Migration

v8 contains a couple of _braking changes_. As a migration process, you can simply search and replace:

1. Find `black-30` and replace it with `black-20`
1. Find these icons and replace them :

- `print` to `printer`
- `pencil` to `edit`
- `view_off` to `hide`
- `file` to `document`
- `file_add` to `document_add`
- `contract` to `document_contract`
- `link_out` to `launch`
- `logout` to `log_out`
- `login` to `log_in`
- `without_bankid` to `pin_code`
- `bankid_on_mobile` to `bankid_mobile`
- `bankid_with_qr` to `bankid_qr`
- `check_alt_01` removed (use e.g. `check`)

## Install

To upgrade to v8 with NPM, use:

```bash
$ npm i dnb-ui-lib@8
```

_December, 10. 2020_
