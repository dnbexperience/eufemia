---
draft: true
---

## MediaQuery Properties

| Properties   | Description                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`       | _(optional)_ Define a list of sizes to match, given as an object `{ min: 'small', max: 'medium' }` or as an array `[{ min: 'small', max: 'medium' }, { min: 'medium', max: 'large' }]`. |
| `query`      | _(optional)_ A MediaQuery as a string similar to the CSS API, but without `@media`.                                                                                                     |
| `not`        | _(optional)_ Reverts the defined queries as a whole.                                                                                                                                    |
| `matchOnSSR` | _(optional)_ If set to true, it will match and return the given children during SSR.                                                                                                    |
