import { render } from '@testing-library/react'
import React from 'react'
import { Form, Tools } from '../../../..'
import FirstBlock from '../FirstBlock'
import { GenerateRef } from '../../../../Tools/ListAllProps'

describe('FirstBlock', () => {
  it('should match snapshot', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
          <FirstBlock />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfFields, propsOfValues } = generateRef.current()
    expect(propsOfFields).toMatchInlineSnapshot(`
      {
        "firstName": {
          "autoComplete": "given-name",
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "required": "Du må fylle inn fornavn.",
          },
          "label": "Fornavn",
          "path": "/firstName",
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
            "type": "string",
          },
          "space": {
            "bottom": 0,
            "top": 0,
          },
          "translations": {
            "en-GB": {
              "MyBlock": {
                "MyField": {
                  "label": "Field label",
                },
              },
            },
            "nb-NO": {
              "MyBlock": {
                "MyField": {
                  "label": "Felt label",
                },
              },
            },
          },
          "trim": true,
          "width": "large",
        },
        "lastName": {
          "autoComplete": "family-name",
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "required": "Du må fylle inn etternavn.",
          },
          "label": "Etternavn",
          "path": "/lastName",
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
            "type": "string",
          },
          "translations": {
            "en-GB": {
              "MyBlock": {
                "MyField": {
                  "label": "Field label",
                },
              },
            },
            "nb-NO": {
              "MyBlock": {
                "MyField": {
                  "label": "Felt label",
                },
              },
            },
          },
          "trim": true,
          "width": "large",
        },
        "myField": {
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Verdien er ugyldig.",
            "required": "Dette feltet må fylles ut.",
          },
          "label": "Felt label",
          "path": "/myField",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": undefined,
            "type": "string",
          },
          "space": {
            "bottom": 0,
            "top": "medium",
          },
          "translations": {
            "en-GB": {
              "MyBlock": {
                "MyField": {
                  "label": "Field label",
                },
              },
            },
            "nb-NO": {
              "MyBlock": {
                "MyField": {
                  "label": "Felt label",
                },
              },
            },
          },
          "width": "large",
        },
      }
    `)
    expect(propsOfValues).toMatchInlineSnapshot(`{}`)
  })
})
