import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { Form, Field, Iterate } from '@dnb/eufemia/src/extensions/forms'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const SingleFieldSchema = () => {
  return (
    <ComponentBox>
      <Field.String schema={{ type: 'string', minLength: 5 }} />
    </ComponentBox>
  )
}

export const DataSetSchema = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          address: 'Prefilled address',
        }}
        schema={{
          properties: {
            name: { minLength: 2 },
            address: { minLength: 3 },
          },
          required: ['name', 'address'],
        }}
      >
        <Form.Card gap="small" bottom="small">
          <Form.MainHeading>Company information</Form.MainHeading>

          <Field.String path="/name" label="Name" />
          <Field.String path="/address" label="Address" />
        </Form.Card>

        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const IfRuleSchema = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{}}
        schema={{
          type: 'object',
          properties: {
            name: { type: 'string' },
            customerType: {
              type: 'string',
              enum: ['corporate', 'private'],
            },
            companyName: { type: 'string' },
          },
          if: {
            properties: { customerType: { enum: ['corporate'] } },
            required: ['customerType'],
          },
          then: { required: ['name', 'companyName'] },
          else: { required: ['name'] },
        }}
      >
        <Form.Card gap="small">
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
    </ComponentBox>
  )
}

export const DependantListSchema = () => {
  return (
    <ComponentBox scope={{ TrashIcon }}>
      <Form.Handler
        data={{
          accounts: [{}],
        }}
        schema={{
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
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
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
        }}
      >
        <Flex.Vertical gap="small">
          <Form.MainHeading>Customer information</Form.MainHeading>
          <Form.Card gap="small">
            <Field.String path="/name" label="Name" />
            <Field.Email path="/email" label="E-mail" />
            <Field.PhoneNumber path="/phone" label="Phone number" />
          </Form.Card>

          <Form.MainHeading>Accounts</Form.MainHeading>
          <Form.Card gap="small">
            <Form.SubHeading>Standard accounts</Form.SubHeading>

            <Iterate.Array path="/accounts">
              <Flex.Horizontal align="flex-end">
                <Field.BankAccountNumber
                  itemPath="/accountNumber"
                  label="Account number"
                />
                <Field.String
                  itemPath="/alias"
                  label="Alias"
                  width="medium"
                />
                <Iterate.RemoveButton icon={TrashIcon} />
              </Flex.Horizontal>
            </Iterate.Array>

            <Iterate.PushButton
              icon="add"
              icon_position="left"
              text="Add account"
              path="/accounts"
              pushValue={{}}
              size="medium"
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
    </ComponentBox>
  )
}
