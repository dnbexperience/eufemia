import { Field, Form, Iterate, Tools, z, makeAjvInstance } from '../../..'
import { Flex, Section } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Iterate/Array',
}

export function ArrayValidation() {
  const schema = {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        minItems: 1,
        maxItems: 2,
      },
    },
  }

  const errorMessages = {
    minItems: 'You need at least {minItems} items.',
    maxItems: 'You cannot have more than {maxItems} items.',
  }

  return (
    <Form.Handler
      ajvInstance={makeAjvInstance()}
      schema={schema}
      defaultData={{
        items: [],
      }}
    >
      <Iterate.Array
        path="/items"
        errorMessages={errorMessages}
        validateInitially
      >
        <Field.String itemPath="/" />
      </Iterate.Array>

      <Tools.Log label="Form data" />
      <Tools.Errors label="Errors" />
    </Form.Handler>
  )
}

export const DependentSchemaValidationWithZod = () => {
  const counts = [1, 2, 3]
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
        if (
          !counts.includes(count) &&
          count >= 0 &&
          ownersLength > count
        ) {
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

  return (
    <Form.Handler schema={schema}>
      <Flex.Stack>
        <Form.Card>
          <Form.MainHeading>Membership Zod</Form.MainHeading>
          <Field.Number
            path="/members/numberOfMembers"
            label="Number of members (1-3)"
            width="small"
            minimum={0}
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
              backgroundColor="lavender"
            >
              <Field.String
                itemPath="/name"
                label="Owner name {itemNo}"
                required
              />
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
}

export const DependentSchemaValidationWithAjv = () => {
  const ajv = makeAjvInstance()
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
                name: { type: 'string' },
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
                    numberOfMembers: { const: 0 },
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
                    numberOfMembers: { const: count },
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

  return (
    <Form.Handler schema={schema} ajvInstance={ajv}>
      <Flex.Stack>
        <Form.Card>
          <Form.MainHeading>Membership Ajv</Form.MainHeading>
          <Field.Number
            path="/members/numberOfMembers"
            label="Number of members (1-3)"
            width="small"
            minimum={0}
            // defaultValue={1}
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
            validateInitially
          >
            <Section
              innerSpace={{
                top: 'small',
                bottom: 'small',
              }}
              bottom
              backgroundColor="lavender"
            >
              <Field.String
                itemPath="/name"
                label="Owner name {itemNo}"
                required
              />
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
}
