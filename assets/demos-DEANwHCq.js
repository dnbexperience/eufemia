import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{n,t as r}from"./ComponentBox-DPdYTeDv.js";import{t as i}from"./ajv-vuuxEh2r.js";import{Lr as a,Y as o}from"./index--zEB_f_m.js";var s=e({DataSetSchema:()=>u,DependentListSchema:()=>f,DependentSchemaValidation:()=>p,DependentSchemaValidationWithZod:()=>m,IfRuleSchema:()=>d,SingleFieldSchema:()=>l}),c=t(),l=()=>(0,c.jsx)(r,{scope:{makeAjvInstance:i},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'string',
  minLength: 5,
}
render(
  <Form.Handler ajvInstance={ajv}>
    <Field.String schema={schema} />
  </Form.Handler>
)
`}),u=()=>(0,c.jsx)(r,{scope:{makeAjvInstance:i},noInline:!0,children:`const ajv = makeAjvInstance()
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
`}),d=()=>(0,c.jsx)(r,{scope:{makeAjvInstance:i},noInline:!0,children:`const ajv = makeAjvInstance()
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
`}),f=()=>(0,c.jsx)(r,{scope:{makeAjvInstance:i},noInline:!0,children:`const ajv = makeAjvInstance()
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
`}),p=()=>(0,c.jsx)(r,{scope:{makeAjvInstance:i,Tools:n},noInline:!0,children:`const ajv = makeAjvInstance()
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
`}),m=()=>(0,c.jsx)(r,{scope:{Tools:n,z:o},noInline:!0,children:`const counts = [1, 2, 3]
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
`});function h(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...a(),...e.components};return s||_(`Examples`,!1),u||_(`Examples.DataSetSchema`,!0),f||_(`Examples.DependentListSchema`,!0),p||_(`Examples.DependentSchemaValidation`,!0),m||_(`Examples.DependentSchemaValidationWithZod`,!0),d||_(`Examples.IfRuleSchema`,!0),l||_(`Examples.SingleFieldSchema`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`#demos`,children:`Demos`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#schema-for-single-field`,children:`Schema for single field`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#schema-for-a-whole-data-set`,children:`Schema for a whole data set`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#schema-with-if-rule`,children:`Schema with if-rule`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#dependent-list-schema`,children:`Dependent list schema`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#dependent-schema-across-sections`,children:`Dependent schema across sections`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`#dependent-schema-using-zod`,children:`Dependent schema using Zod`})}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Schema for single field`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Schema for a whole data set`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Schema with if-rule`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Dependent list schema`}),`
`,(0,c.jsx)(t.p,{children:`Becoming a new customer, this form requires at least one normal account
to be added, unless the customer opens a BSU account, then normal
accounts can still be added, but is optional.`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Dependent schema across sections`}),`
`,(0,c.jsx)(t.p,{children:`This schema validates fields across different sections based on the value of
another field.`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Dependent schema using Zod`}),`
`,(0,c.jsxs)(t.p,{children:[`This schema is using `,(0,c.jsx)(t.code,{children:`Zod`}),` for validation, and validates fields across different sections based on the value of another field.`]}),`
`,(0,c.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};