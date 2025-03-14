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

export function AnimatedVisibility() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.Boolean
          label="Make second field visible when toggled"
          path="/toggleValue"
          variant="checkbox"
        />

        <Form.Card>
          <Value.SummaryList>
            <Value.String label="Label" value="First field" />

            <Form.Visibility pathTrue="/toggleValue" animate>
              <Value.String label="Label" value="Second field" />
            </Form.Visibility>
          </Value.SummaryList>
        </Form.Card>
      </Flex.Stack>
    </Form.Handler>
  )
}

export function SummaryListWithHelpButton() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Form.Card>
          <Value.SummaryList>
            <Value.Boolean
              label={
                'Vil foretaket være involvert i, eller drive virksomhet knyttet til virtuell valuta?'
              }
              help={{
                open: true,
                title: 'Virtuell valuta',
                content:
                  'For eksempel i forbindelse med veksling, oppbevaring, utvinning eller investering i kryptovaluta.',
              }}
              value={false}
            />
            <Value.Boolean
              label={
                'Skal foretaket drive med betalingsformidling som hovedvirksomhet eller som tilleggsvirksomhet til annen næring?'
              }
              help={{
                open: true,
                title: 'Betalingsformidling',
                content:
                  'For eksempel betalingsforetak, agent, filial eller tilsvarende virksomhet som krever konsesjon.',
              }}
              value={false}
            />
          </Value.SummaryList>
          <Value.Boolean
            label={'Er foretaket registreringspliktig hos Finanstilsynet?'}
            help={{
              open: true,
              title: 'Registreringspliktig',
              content:
                'Driver virksomhet innenfor eiendomsmegling, inkasso, finans eller regnskapstjenester kan foretaket være regnskapspliktig.',
            }}
            value={true}
          />
        </Form.Card>
      </Flex.Stack>
    </Form.Handler>
  )
}
