import { Card, Hr, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
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

        const Summary = ({ title }) => {
          const { setActiveIndex } = Wizard.useStep()
          return (
            <Wizard.Step title={title}>
              <Card stack>
                <Value.SummaryList>
                  <Value.String label="First name" path="/firstName" />
                </Value.SummaryList>

                <Hr light />

                <Wizard.EditButton onClick={() => setActiveIndex(0)} />
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
              <Summary title="Summary" />
            </Wizard.Container>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
