/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import { Field } from '../../../extensions/forms'
import { Card, Flex } from '../../'
import { Wrapper, Box } from 'storybook-utils/helpers'

export default {
  title: 'Eufemia/Components/Card',
}

export const CardSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Card>
          <Field.NationalIdentityNumber
            path="/ssn"
            label="NationalIdentityNumber"
          />
          <Field.Email path="/email" label="Email" />
          <Field.PhoneNumber path="/phone" label="PhoneNumber" />
          <Field.BankAccountNumber
            path="/bankaccount"
            label="BankAccountNumber"
          />
          <Field.Boolean path="/boolean" label="Boolean" />
          <Field.Currency path="/currency" label="Currency" />
          <Field.Date path="/data" label="Date" />
          <Field.NationalIdentityNumber
            path="/national"
            label="NationalIdentityNumber"
          />
          <Field.Number path="/number" label="Number" />
          <Field.Selection path="/selectionoption" label="SelectionOption">
            <Field.Option path="/option" label="Option" />
          </Field.Selection>
          <Field.OrganizationNumber
            path="/org"
            label="OrganizationNumber"
          />
          <Field.PostalCodeAndCity
            label="PostalCodeAndCity"
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
          <Field.SelectCountry
            path="/selectcountry"
            label="SelectCountry"
          />
          <Field.Selection path="/selection" label="Selection" />
          <Field.String path="/string" label="String" />
          <Field.Toggle
            path="/toggle"
            valueOn="checked"
            valueOff="unchecked"
            label="Toggle"
          />
        </Card>
      </Box>
      <Box>
        <Card direction="horizontal">
          <Field.NationalIdentityNumber
            path="/ssn"
            label="NationalIdentityNumber"
          />
          <Field.Email path="/email" label="Email" />
          <Field.PhoneNumber path="/phone" label="PhoneNumber" />
          <Field.BankAccountNumber
            path="/bankaccount"
            label="BankAccountNumber"
          />
          <Field.Boolean path="/boolean" label="Boolean" />
          <Field.Currency path="/currency" label="Currency" />
          <Field.Date path="/data" label="Date" />
          <Field.NationalIdentityNumber
            path="/national"
            label="NationalIdentityNumber"
          />
          <Field.Number path="/number" label="Number" />
          <Field.Selection path="/selectionoption" label="SelectionOption">
            <Field.Option path="/option" label="Option" />
          </Field.Selection>
          <Field.OrganizationNumber
            path="/org"
            label="OrganizationNumber"
          />
          <Field.PostalCodeAndCity
            label="PostalCodeAndCity"
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
          <Field.SelectCountry
            path="/selectcountry"
            label="SelectCountry"
          />
          <Field.Selection path="/selection" label="Selection" />
          <Field.String path="/string" label="String" />
          <Field.Toggle
            path="/toggle"
            valueOn="checked"
            valueOff="unchecked"
            label="Toggle"
          />
        </Card>
      </Box>
      <Box>
        <Card direction="vertical">
          <Field.NationalIdentityNumber
            path="/ssn"
            label="NationalIdentityNumber"
          />
          <Field.Email path="/email" label="Email" />
          <Field.PhoneNumber path="/phone" label="PhoneNumber" />
          <Field.BankAccountNumber
            path="/bankaccount"
            label="BankAccountNumber"
          />
          <Field.Boolean path="/boolean" label="Boolean" />
          <Field.Currency path="/currency" label="Currency" />
          <Field.Date path="/data" label="Date" />
          <Field.NationalIdentityNumber
            path="/national"
            label="NationalIdentityNumber"
          />
          <Field.Number path="/number" label="Number" />
          <Field.Selection path="/selectionoption" label="SelectionOption">
            <Field.Option path="/option" label="Option" />
          </Field.Selection>
          <Field.OrganizationNumber
            path="/org"
            label="OrganizationNumber"
          />
          <Field.PostalCodeAndCity
            label="PostalCodeAndCity"
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
          <Field.SelectCountry
            path="/selectcountry"
            label="SelectCountry"
          />
          <Field.Selection path="/selection" label="Selection" />
          <Field.String path="/string" label="String" />
          <Field.Toggle
            path="/toggle"
            valueOn="checked"
            valueOff="unchecked"
            label="Toggle"
          />
        </Card>
      </Box>
      <Box>
        <Card>
          <Flex.Horizontal>
            <Field.NationalIdentityNumber
              path="/ssn"
              label="NationalIdentityNumber"
            />
            <Field.Email path="/email" label="Email" />
            <Field.PhoneNumber path="/phone" label="PhoneNumber" />
            <Field.BankAccountNumber
              path="/bankaccount"
              label="BankAccountNumber"
            />
            <Field.Boolean path="/boolean" label="Boolean" />
            <Field.Currency path="/currency" label="Currency" />
            <Field.Date path="/data" label="Date" />
            <Field.NationalIdentityNumber
              path="/national"
              label="NationalIdentityNumber"
            />
            <Field.Number path="/number" label="Number" />
            <Field.Selection
              path="/selectionoption"
              label="SelectionOption"
            >
              <Field.Option path="/option" label="Option" />
            </Field.Selection>
            <Field.OrganizationNumber
              path="/org"
              label="OrganizationNumber"
            />
            <Field.PostalCodeAndCity
              label="PostalCodeAndCity"
              postalCode={{
                path: '/postalCode',
              }}
              city={{
                path: '/city',
              }}
            />
            <Field.SelectCountry
              path="/selectcountry"
              label="SelectCountry"
            />
            <Field.Selection path="/selection" label="Selection" />
            <Field.String path="/string" label="String" />
            <Field.Toggle
              path="/toggle"
              valueOn="checked"
              valueOff="unchecked"
              label="Toggle"
            />
          </Flex.Horizontal>
        </Card>
      </Box>
      <Box>
        <Card>
          <Flex.Vertical>
            <Field.NationalIdentityNumber
              path="/ssn"
              label="NationalIdentityNumber"
            />
            <Field.Email path="/email" label="Email" />
            <Field.PhoneNumber path="/phone" label="PhoneNumber" />
            <Field.BankAccountNumber
              path="/bankaccount"
              label="BankAccountNumber"
            />
            <Field.Boolean path="/boolean" label="Boolean" />
            <Field.Currency path="/currency" label="Currency" />
            <Field.Date path="/data" label="Date" />
            <Field.NationalIdentityNumber
              path="/national"
              label="NationalIdentityNumber"
            />
            <Field.Number path="/number" label="Number" />
            <Field.Selection
              path="/selectionoption"
              label="SelectionOption"
            >
              <Field.Option path="/option" label="Option" />
            </Field.Selection>
            <Field.OrganizationNumber
              path="/org"
              label="OrganizationNumber"
            />
            <Field.PostalCodeAndCity
              label="PostalCodeAndCity"
              postalCode={{
                path: '/postalCode',
              }}
              city={{
                path: '/city',
              }}
            />
            <Field.SelectCountry
              path="/selectcountry"
              label="SelectCountry"
            />
            <Field.Selection path="/selection" label="Selection" />
            <Field.String path="/string" label="String" />
            <Field.Toggle
              path="/toggle"
              valueOn="checked"
              valueOff="unchecked"
              label="Toggle"
            />
          </Flex.Vertical>
        </Card>
      </Box>
      <Box>
        <Card stack>
          <Field.NationalIdentityNumber
            path="/ssn"
            label="NationalIdentityNumber"
          />
          <Field.Email path="/email" label="Email" />
          <Field.PhoneNumber path="/phone" label="PhoneNumber" />
          <Field.BankAccountNumber
            path="/bankaccount"
            label="BankAccountNumber"
          />
          <Field.Boolean path="/boolean" label="Boolean" />
          <Field.Currency path="/currency" label="Currency" />
          <Field.Date path="/data" label="Date" />
          <Field.NationalIdentityNumber
            path="/national"
            label="NationalIdentityNumber"
          />
          <Field.Number path="/number" label="Number" />
          <Field.Selection path="/selectionoption" label="SelectionOption">
            <Field.Option path="/option" label="Option" />
          </Field.Selection>
          <Field.OrganizationNumber
            path="/org"
            label="OrganizationNumber"
          />
          <Field.PostalCodeAndCity
            label="PostalCodeAndCity"
            postalCode={{
              path: '/postalCode',
            }}
            city={{
              path: '/city',
            }}
          />
          <Field.SelectCountry
            path="/selectcountry"
            label="SelectCountry"
          />
          <Field.Selection path="/selection" label="Selection" />
          <Field.String path="/string" label="String" />
          <Field.Toggle
            path="/toggle"
            valueOn="checked"
            valueOff="unchecked"
            label="Toggle"
          />
        </Card>
      </Box>
    </Wrapper>
  )
}
