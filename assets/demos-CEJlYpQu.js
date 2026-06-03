import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Section-UYj7uQy5.js";import{c as i}from"./ToggleButton-D3NEk3jO.js";import{t as a}from"./Card-C6UABezd.js";import{V as o}from"./Selection-DXfzor9j.js";import{t as s}from"./Form-C16rVaXm.js";import{t as c}from"./ajv-244GHn5p.js";import{t as l}from"./Field-B5trC2Cn.js";import{t as u}from"./Iterate-BEyV0dg2.js";import{t as d}from"./Tools-B0-vRSQX.js";import{W as f}from"./index-BCXtuv-b.js";import{t as p}from"./ComponentBox-B2X8809Z.js";var m=e({DataSetSchema:()=>_,DependentListSchema:()=>y,DependentSchemaValidation:()=>b,DependentSchemaValidationWithZod:()=>x,IfRuleSchema:()=>v,SingleFieldSchema:()=>g}),h=t(n()),g=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:c},stableName:`SingleFieldSchema`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:l},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'string',
  minLength: 5,
}
render(
  <Form.Handler ajvInstance={ajv}>
    <Field.String schema={schema} />
  </Form.Handler>
)
`}),_=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:c},stableName:`DataSetSchema`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Card:a,Field:l},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
    },
    address: {
      type: 'string',
      minLength: 3,
    },
  },
  required: ['name', 'address'],
}
render(
  <Form.Handler
    data={{
      address: 'Prefilled address',
    }}
    schema={schema}
    ajvInstance={ajv}
  >
    <Form.Card bottom="small">
      <Form.MainHeading>Company information</Form.MainHeading>

      <Field.String path="/name" label="Name" />
      <Field.String path="/address" label="Address" />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`}),v=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:c},stableName:`IfRuleSchema`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Card:a,Field:l},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    customerType: {
      type: 'string',
      enum: ['corporate', 'private'],
    },
    companyName: {
      type: 'string',
    },
  },
  if: {
    properties: {
      customerType: {
        enum: ['corporate'],
      },
    },
    required: ['customerType'],
  },
  then: {
    required: ['name', 'companyName'],
  },
  else: {
    required: ['name'],
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Form.Card>
      <Form.MainHeading>Customer information</Form.MainHeading>

      <Field.String path="/name" label="Name" />
      <Field.String
        path="/customerType"
        label="Customer type (corporate or private)"
      />
      <Field.Name.Company
        path="/companyName"
        labelDescription="Company name (required for corporate customers)"
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`}),y=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:c},stableName:`DependentListSchema`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:i,Card:a,Field:l,Iterate:u},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  definitions: {
    account: {
      type: 'object',
      properties: {
        accountNumber: {
          type: 'string',
          pattern: '^[0-9]{11}$',
        },
        alias: {
          type: 'string',
          minLength: 2,
          maxLength: 32,
        },
      },
      required: ['accountNumber'],
    },
  },
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    accounts: {
      type: 'array',
      items: {
        $ref: '#/definitions/account',
      },
    },
    bsuAccount: {
      $ref: '#/definitions/account',
    },
  },
  oneOf: [
    {
      properties: {
        accounts: {
          type: 'array',
          minItems: 1,
        },
      },
    },
    {
      properties: {
        accounts: {
          type: 'array',
          minItems: 0,
        },
        bsuAccount: {
          type: 'object',
          required: ['accountNumber'],
        },
      },
      required: ['bsuAccount'],
    },
  ],
}
render(
  <Form.Handler
    data={{
      accounts: [{}],
    }}
    schema={schema}
    ajvInstance={ajv}
  >
    <Flex.Vertical>
      <Form.MainHeading>Customer information</Form.MainHeading>
      <Form.Card>
        <Field.String path="/name" label="Name" />
        <Field.Email path="/email" label="E-mail" />
        <Field.PhoneNumber path="/phone" label="Phone number" />
      </Form.Card>

      <Form.MainHeading>Accounts</Form.MainHeading>
      <Form.Card>
        <Form.SubHeading>Standard accounts</Form.SubHeading>

        <Iterate.Array path="/accounts">
          <Flex.Horizontal align="flex-end">
            <Field.BankAccountNumber
              itemPath="/accountNumber"
              label="Account number"
            />
            <Field.String itemPath="/alias" label="Alias" width="medium" />
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.Array>

        <Iterate.PushButton
          text="Add account"
          path="/accounts"
          pushValue={{}}
        />

        <Form.SubHeading>BSU Account</Form.SubHeading>
        <Field.BankAccountNumber
          path="/bsuAccount/accountNumber"
          label="Account number"
        />
        <Field.String path="/bsuAccount/alias" label="Alias" />
      </Form.Card>

      <Form.SubmitButton />
    </Flex.Vertical>
  </Form.Handler>
)
`}),b=()=>(0,h.jsx)(p,{scope:{makeAjvInstance:c,Tools:d},stableName:`DependentSchemaValidation`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:i,Card:a,Field:l,Iterate:u,Section:r,Tools:d},noInline:!0,children:`const ajv = makeAjvInstance()
const counts = [1, 2, 3]
const schema = {
  type: 'object',
  properties: {
    members: {
      type: 'object',
      properties: {
        numberOfMembers: {
          type: 'integer',
        },
      },
      required: ['numberOfMembers'],
    },
    beneficialOwners: {
      type: 'object',
      properties: {
        addedExistingBeneficialOwners: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
        },
      },
    },
  },
  dependentSchemas: {
    members: {
      allOf: [
        // Handle count = 0: array must be empty
        {
          if: {
            properties: {
              members: {
                type: 'object',
                properties: {
                  numberOfMembers: {
                    const: 0,
                  },
                },
                required: ['numberOfMembers'],
              },
            },
          },
          then: {
            properties: {
              beneficialOwners: {
                type: 'object',
                properties: {
                  addedExistingBeneficialOwners: {
                    type: 'array',
                    maxItems: 0,
                  },
                },
              },
            },
          },
        },
        // Handle count = 1, 2, or 3: array must match exactly
        ...counts.map((count) => ({
          if: {
            properties: {
              members: {
                type: 'object',
                properties: {
                  numberOfMembers: {
                    const: count,
                  },
                },
                required: ['numberOfMembers'],
              },
            },
          },
          then: {
            required: ['beneficialOwners'],
            properties: {
              beneficialOwners: {
                type: 'object',
                properties: {
                  addedExistingBeneficialOwners: {
                    type: 'array',
                    minItems: count,
                    maxItems: count,
                  },
                },
                required: ['addedExistingBeneficialOwners'],
              },
            },
          },
        })),
      ],
    },
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Flex.Stack>
      <Form.Card>
        <Form.MainHeading>Membership</Form.MainHeading>
        <Field.Number
          path="/members/numberOfMembers"
          label="Number of members (1-3)"
          width="small"
          startWith={-1}
          showStepControls
        />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Beneficial owners</Form.SubHeading>
        <Iterate.Array
          path="/beneficialOwners/addedExistingBeneficialOwners"
          errorMessages={{
            minItems: 'You must add {minItems} existing owners.',
          }}
          animate
        >
          <Section
            innerSpace={{
              top: 'small',
              bottom: 'small',
            }}
            bottom
            variant="information"
          >
            <Field.String itemPath="/name" label="Owner name {itemNo}" />
            <Iterate.RemoveButton />
          </Section>
        </Iterate.Array>
        <Iterate.PushButton
          path="/beneficialOwners/addedExistingBeneficialOwners"
          pushValue={{}}
          text="Add beneficiary"
        />
      </Form.Card>

      <Form.SubmitButton text="Show errors" />

      <Tools.Log label="Form data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
`}),x=()=>(0,h.jsx)(p,{scope:{Tools:d,z:o},stableName:`DependentSchemaValidationWithZod`,sourceImports:[`import { Flex, Section } from '@dnb/eufemia'`,`import { z, Form, Field, Iterate, Tools, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:i,Card:a,Field:l,Iterate:u,Section:r,Tools:d},noInline:!0,children:`const counts = [1, 2, 3]
const ownerSchema = z.object({
  name: z.string().optional(),
})
const schema = z
  .object({
    members: z
      .object({
        numberOfMembers: z.number().int().optional(),
      })
      .optional(),
    beneficialOwners: z
      .object({
        addedExistingBeneficialOwners: z.array(ownerSchema).optional(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    // numberOfMembers is always required
    if (!value.members || value.members.numberOfMembers === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['members', 'numberOfMembers'],
        message: 'Field.errorRequired',
      })
      return // stop further validation
    }

    const count = value.members.numberOfMembers

    // Check if count matches one of the expected values (1, 2, or 3)
    // This matches the AJV dependentSchemas logic with allOf and if/then
    if (counts.includes(count)) {
      // If count matches, beneficialOwners is required
      if (!value.beneficialOwners) {
        ctx.addIssue({
          code: 'custom',
          path: ['beneficialOwners'],
          message: 'Field.errorRequired',
        })
        return // stop further validation
      }

      // addedExistingBeneficialOwners is required
      if (!value.beneficialOwners.addedExistingBeneficialOwners) {
        ctx.addIssue({
          code: 'custom',
          path: ['beneficialOwners', 'addedExistingBeneficialOwners'],
          message: 'Field.errorRequired',
        })
        return // stop further validation
      }

      const ownersLength =
        value.beneficialOwners.addedExistingBeneficialOwners.length
      const path = ['beneficialOwners', 'addedExistingBeneficialOwners']

      // Validate array length matches count exactly
      if (ownersLength < count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMinItems',
          messageValues: {
            minItems: count,
          },
        })
      }
      if (ownersLength > count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMaxItems',
          messageValues: {
            maxItems: count,
          },
        })
      }

      // Validate that each owner has a name (required)
      value.beneficialOwners.addedExistingBeneficialOwners.forEach(
        (owner, index) => {
          if (!owner.name) {
            ctx.addIssue({
              code: 'custom',
              path: [
                'beneficialOwners',
                'addedExistingBeneficialOwners',
                index,
                'name',
              ],
              message: 'Field.errorRequired',
            })
          }
        }
      )
    }

    // Validate array length sync for all count values (including 0)
    if (
      value.beneficialOwners?.addedExistingBeneficialOwners &&
      Array.isArray(value.beneficialOwners.addedExistingBeneficialOwners)
    ) {
      const ownersLength =
        value.beneficialOwners.addedExistingBeneficialOwners.length
      const path = ['beneficialOwners', 'addedExistingBeneficialOwners']

      // If count is not in the expected range, array length must not exceed count
      if (!counts.includes(count) && count >= 0 && ownersLength > count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMaxItems',
          messageValues: {
            maxItems: count,
          },
        })
      }
    }
  })
render(
  <Form.Handler
    schema={schema}
    defaultData={{
      beneficialOwners: {
        addedExistingBeneficialOwners: undefined,
      },
    }}
  >
    <Flex.Stack>
      <Form.Card>
        <Form.MainHeading>Membership</Form.MainHeading>
        <Field.Number
          path="/members/numberOfMembers"
          label="Number of members (1-3)"
          width="small"
          startWith={-1}
          showStepControls
        />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Beneficial owners</Form.SubHeading>
        <Iterate.Array
          path="/beneficialOwners/addedExistingBeneficialOwners"
          animate
        >
          <Section
            innerSpace={{
              top: 'small',
              bottom: 'small',
            }}
            bottom
            variant="information"
          >
            <Field.String itemPath="/name" label="Owner name {itemNo}" />
            <Iterate.RemoveButton />
          </Section>
        </Iterate.Array>
        <Iterate.PushButton
          path="/beneficialOwners/addedExistingBeneficialOwners"
          pushValue={{}}
          text="Add beneficiary"
        />
      </Form.Card>

      <Form.SubmitButton text="Show errors" />

      <Tools.Log label="Form data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
`});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...f(),...e.components};return m||w(`Examples`,!1),_||w(`Examples.DataSetSchema`,!0),y||w(`Examples.DependentListSchema`,!0),b||w(`Examples.DependentSchemaValidation`,!0),x||w(`Examples.DependentSchemaValidationWithZod`,!0),v||w(`Examples.IfRuleSchema`,!0),g||w(`Examples.SingleFieldSchema`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[(0,h.jsx)(t.a,{href:`#demos`,children:`Demos`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#schema-for-single-field`,children:`Schema for single field`})}),`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#schema-for-a-whole-data-set`,children:`Schema for a whole data set`})}),`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#schema-with-if-rule`,children:`Schema with if-rule`})}),`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#dependent-list-schema`,children:`Dependent list schema`})}),`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#dependent-schema-across-sections`,children:`Dependent schema across sections`})}),`
`,(0,h.jsx)(t.li,{children:(0,h.jsx)(t.a,{href:`#dependent-schema-using-zod`,children:`Dependent schema using Zod`})}),`
`]}),`
`]}),`
`]}),`
`,(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Schema for single field`}),`
`,(0,h.jsx)(g,{}),`
`,(0,h.jsx)(t.h3,{children:`Schema for a whole data set`}),`
`,(0,h.jsx)(_,{}),`
`,(0,h.jsx)(t.h3,{children:`Schema with if-rule`}),`
`,(0,h.jsx)(v,{}),`
`,(0,h.jsx)(t.h3,{children:`Dependent list schema`}),`
`,(0,h.jsx)(t.p,{children:`Becoming a new customer, this form requires at least one normal account
to be added, unless the customer opens a BSU account, then normal
accounts can still be added, but is optional.`}),`
`,(0,h.jsx)(y,{}),`
`,(0,h.jsx)(t.h3,{children:`Dependent schema across sections`}),`
`,(0,h.jsx)(t.p,{children:`This schema validates fields across different sections based on the value of
another field.`}),`
`,(0,h.jsx)(b,{}),`
`,(0,h.jsx)(t.h3,{children:`Dependent schema using Zod`}),`
`,(0,h.jsxs)(t.p,{children:[`This schema is using `,(0,h.jsx)(t.code,{children:`Zod`}),` for validation, and validates fields across different sections based on the value of another field.`]}),`
`,(0,h.jsx)(x,{})]})}function C(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};