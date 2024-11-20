/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import { Field, Form } from '../../../extensions/forms'
import { Card, Flex, Grid, Section, Space } from '../../'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { H2, P } from '../../../elements'

export default {
  title: 'Eufemia/Components/Card',
}

const getFormFields = () => {
  const fields = (
    <>
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
      <Field.Boolean path="/boolean1" label="Boolean default" />
      <Field.Boolean
        path="/boolean2"
        label="Boolean button"
        variant="button"
      />
      <Field.Boolean
        path="/boolean3"
        label="Boolean buttons"
        variant="buttons"
      />
      <Field.Boolean
        path="/boolean4"
        label="Boolean checkbox-button"
        variant="checkbox-button"
      />
      <Field.Currency path="/currency" label="Currency" />
      <Field.Date path="/data" label="Date" />
      <Field.NationalIdentityNumber
        path="/national"
        label="NationalIdentityNumber"
      />
      <Field.Number path="/number" label="Number" />
      <Field.Selection path="/selection1" label="Selection">
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.Selection
        path="/selection2"
        label="Selection button"
        variant="button"
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.Selection
        path="/selection3"
        label="Selection radio"
        variant="radio"
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.OrganizationNumber path="/org" label="OrganizationNumber" />
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
        }}
        city={{
          path: '/city',
        }}
      />
      <Field.SelectCountry path="/selectcountry" label="SelectCountry" />
      <Field.String path="/string" label="String" />
      <Field.Toggle
        path="/toggle1"
        valueOn="checked"
        valueOff="unchecked"
        label="Toggle default"
      />
      <Field.Toggle
        path="/toggle2"
        valueOn="on"
        valueOff="off"
        variant="button"
        label="Toggle button"
      />
      <Field.Toggle
        path="/toggle3"
        valueOn="on"
        valueOff="off"
        variant="buttons"
        label="Toggle buttons"
      />
      <Field.Toggle
        path="/toggle4"
        valueOn="on"
        valueOff="off"
        variant="checkbox-button"
        label="Toggle checkbox-button"
      />
      <Field.Expiry path="/expiry" label="Expiry" />
    </>
  )

  return fields.props.children
}

export const CardSandbox = () => {
  const fields = getFormFields()
  return (
    <Wrapper>
      <Box>
        Default card:
        <Card>{fields}</Card>
      </Box>
      <Box>
        Card direction="horizontal":
        <Card direction="horizontal">{fields}</Card>
      </Box>
      <Box>
        Card direction="vertical"
        <Card direction="vertical">{fields}</Card>
      </Box>
      <Box>
        Card Flex.Horizontal
        <Card>
          <Flex.Horizontal>{fields}</Flex.Horizontal>
        </Card>
      </Box>
      <Box>
        Card Flex.Vertical
        <Card>
          <Flex.Vertical>{fields}</Flex.Vertical>
        </Card>
      </Box>
      <Box>
        Card stack
        <Card stack>{fields}</Card>
      </Box>
    </Wrapper>
  )
}

export function CardWithHeading() {
  return (
    <Card stack divider="line">
      <Form.SubHeading>Heading</Form.SubHeading>
      <Field.PhoneNumber />
      <Field.Email />
    </Card>
  )
}

export const WithGrid = () => {
  return (
    <div style={{}}>
      <Grid.Container
        columns={{
          small: 1,
          medium: 3,
          large: 3,
        }}
        columnGap="small"
      >
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Grid.Container>
    </div>
  )
}

export const WithOutset = () => {
  return (
    <Space space="large">
      <Flex.Vertical>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Card stack outset>
          <P>Card content</P>
          <Card>
            <P>Nested card</P>
          </Card>
        </Card>
        <Form.SubmitButton />
      </Flex.Vertical>

      <Section
        top
        roundedCorner
        outline
        outset={{ small: false, medium: true, large: true }}
        innerSpace="medium"
        backgroundColor="transparent"
      >
        <P>Nested card</P>
      </Section>
    </Space>
  )
}
