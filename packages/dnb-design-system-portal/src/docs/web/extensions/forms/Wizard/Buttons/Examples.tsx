import { P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Step = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Form.Card>
                <P>Contents of {title}</P>
              </Form.Card>
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        return (
          <Form.Handler>
            <Wizard.Container mode="loose">
              <Step title="Step 1" />
              <Step title="Step 2" />
              <Step title="Step 3" />
            </Wizard.Container>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
