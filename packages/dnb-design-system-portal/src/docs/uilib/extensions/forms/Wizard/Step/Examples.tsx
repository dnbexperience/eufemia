import { Card, Hr, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Value, Wizard } from '@dnb/eufemia/src/extensions/forms'

export const EditButton = () => {
  return (
    <ComponentBox>
      {() => {
        const Step = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Card stack>
                <P>Contents</P>
              </Card>

              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        const Summary = () => {
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Wizard.Step title={summaryTitle}>
              <Card stack>
                <Value.SummaryList>
                  <Value.String label="First name" path="/firstName" />
                </Value.SummaryList>

                <Hr />

                <Wizard.EditButton toStep={0} />
              </Card>
            </Wizard.Step>
          )
        }

        return (
          <Form.Handler
            data={{
              firstName: 'John',
            }}
          >
            <Wizard.Container initialActiveIndex={1}>
              <Step title="Step" />
              <Summary />
            </Wizard.Container>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
