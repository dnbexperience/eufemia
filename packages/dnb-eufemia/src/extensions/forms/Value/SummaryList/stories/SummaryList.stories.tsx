import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'
import { P } from '../../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/SummaryList',
}

export function SummaryList() {
  return (
    <Form.Handler
      data={{
        contactInformation: {
          firstName: 'FirstName',
          lastName: 'LastName',
          phoneNumber: '+47 12345678',
          emailAddress: 'ikke@dnb.no',
        },
      }}
    >
      <Form.Section path="/contactInformation">
        <Flex.Stack>
          <Form.MainHeading>MainHeading</Form.MainHeading>
          <P>Description</P>
          <ContactInformationView />
          <ContactInformationEdit />
        </Flex.Stack>
      </Form.Section>
    </Form.Handler>
  )
}

function ContactInformationView() {
  return (
    <>
      <Form.Card>
        <Form.SubHeading>Subheading</Form.SubHeading>

        <Value.SummaryList layout="horizontal">
          <Value.Name.First value="FirstName" />
          <Value.Name.Last value="LastName" />
        </Value.SummaryList>

        <Value.SummaryList layout="grid">
          <Value.Name.First value="FirstName" />
          <Value.Name.Last value="LastName" />
        </Value.SummaryList>
      </Form.Card>

      <Form.Section.ViewContainer top title="Subheading">
        <Value.SummaryList layout="horizontal">
          <Value.Name.First path="/firstName" />
          <Value.Name.Last path="/lastName" />
        </Value.SummaryList>

        <Value.SummaryList layout="grid">
          <Value.Name.First path="/firstName" label="" />
          <Value.Name.Last path="/lastName" />
        </Value.SummaryList>
      </Form.Section.ViewContainer>
    </>
  )
}

function ContactInformationEdit() {
  return (
    <Form.Section.EditContainer>
      <Field.PhoneNumber path="/phoneNumber" countries="Prioritized" />
      <Field.String path="/emailAddress" />
    </Form.Section.EditContainer>
  )
}
