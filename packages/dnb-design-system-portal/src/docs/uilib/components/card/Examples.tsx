import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Button,
  Card,
  Flex,
  Grid,
  H2,
  Hr,
  P,
  Section,
  Table,
  Td,
  Th,
  Tr,
} from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Card data-visual-test="layout-card-border">
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum.
        </P>
        <P>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </P>
      </Card>
    </ComponentBox>
  )
}

export const NestedCards = () => {
  return (
    <ComponentBox data-visual-test="layout-card-nested">
      <Card>
        <P>First Card</P>
        <Card top>
          <P>Second Card</P>
          <Card top>
            <P>Third Card (for edge cases only)</P>
          </Card>
        </Card>
      </Card>
    </ComponentBox>
  )
}

export const WithTable = () => {
  return (
    <ComponentBox data-visual-test="layout-card-table">
      {() => {
        const MyTable = () => (
          <Table.ScrollView>
            <Table border outline size="medium">
              <thead>
                <Tr noWrap>
                  <Th>Column 1</Th>
                  <Th>Column 2</Th>
                  <Th>Column 3</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                </Tr>
                <Tr>
                  <Td colSpan={3} align="right">
                    <Button>Button</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                  <Td>Row 3</Td>
                </Tr>
              </tbody>
            </Table>
          </Table.ScrollView>
        )

        return (
          <Card
            title="Card title"
            responsive={false}
            innerSpace={0}
            filled
          >
            <MyTable />
          </Card>
        )
      }}
    </ComponentBox>
  )
}

export const WithGrid = () => {
  return (
    <ComponentBox data-visual-test="layout-card-grid">
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
    </ComponentBox>
  )
}

export const WithFlex = () => {
  return (
    <ComponentBox data-visual-test="layout-card-flex">
      <Flex.Container>
        <Card
          size={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card
          size={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card
          size={{
            small: 'auto',
            medium: 4,
            large: 4,
          }}
          stack
        >
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Flex.Container>
    </ComponentBox>
  )
}

export const Stack = () => {
  return (
    <ComponentBox data-visual-test="layout-card-stack">
      <Card stack>
        <Field.String label="Label" value="Value" />
        <Field.String label="Label" value="Value" />
        <Hr />
        <Form.SubmitButton />
      </Card>
    </ComponentBox>
  )
}

export const VerticalFields = () => {
  return (
    <ComponentBox>
      <Card>
        <Flex.Vertical>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Flex.Vertical>
      </Card>
    </ComponentBox>
  )
}

export const HorizontalFields = () => {
  return (
    <ComponentBox>
      <Card>
        <Flex.Horizontal>
          <Field.String label="Label" value="Value" width="small" />
          <Field.String label="Label" value="Value" width="stretch" />
        </Flex.Horizontal>
      </Card>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox hidePreview>
      <Card aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id" space={0}>
          Heading
        </Form.SubHeading>
        <P>Content inside a landmark ...</P>
      </Card>
    </ComponentBox>
  )
}

export const WithoutPadding = () => {
  return (
    <ComponentBox>
      <Card innerSpace={false} align="stretch">
        <P>no inner space</P>
      </Card>
    </ComponentBox>
  )
}

export const WithNestedSection = () => {
  return (
    <ComponentBox data-visual-test="card-nested-section">
      <Flex.Stack>
        <Card gap="x-small" align="stretch">
          <Form.SubHeading>Card with a nested Section</Form.SubHeading>
          <Section
            variant="info"
            innerSpace={{ top: 'small', bottom: 'medium' }}
          >
            <Field.String width="medium" label="In nested Section" />
          </Section>
        </Card>

        <Card innerSpace="x-large" stack>
          <Section
            variant="info"
            innerSpace={{ top: 'small', bottom: 'medium' }}
          >
            <Field.String
              width="medium"
              label="Card with a 'x-large' inner space"
            />
          </Section>
        </Card>

        <Card innerSpace={false} align="stretch">
          <P>no inner space</P>
          <Section innerSpace backgroundColor="var(--card-outline-color)">
            <Field.String
              width="medium"
              label="Card with no inner space"
            />
          </Section>
          <P>no inner space</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
