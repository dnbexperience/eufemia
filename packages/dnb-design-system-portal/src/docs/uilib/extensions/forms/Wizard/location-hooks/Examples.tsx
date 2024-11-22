import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { navigate, useLocation } from '@reach/router'
import { P } from '@dnb/eufemia/src'
import { Form, Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          Wizard.useQueryLocator('unique-id')

          return (
            <Form.Handler>
              <Wizard.Container id="unique-id">
                <MyStep title="Step 1" />
                <MyStep title="Step 2" />
                <MyStep title="Step 3" />
              </Wizard.Container>
            </Form.Handler>
          )
        }

        const MyStep = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Form.Card>
                <P>Contents of {title}</P>
              </Form.Card>
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export const ReachRouter = () => {
  return (
    <ComponentBox scope={{ useLocation, navigate }}>
      {() => {
        const Component = () => {
          Wizard.useReachRouter('wizard-with-router', {
            useLocation,
            navigate,
          })

          return (
            <Form.Handler>
              <Wizard.Container id="wizard-with-router">
                <MyStep title="Step 1" />
                <MyStep title="Step 2" />
                <MyStep title="Step 3" />
              </Wizard.Container>
            </Form.Handler>
          )
        }

        const MyStep = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Form.Card>
                <P>Contents of {title}</P>
              </Form.Card>
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
