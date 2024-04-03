import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { navigate, useLocation } from '@reach/router'
import { Card, P } from '@dnb/eufemia/src'
import { Form, Steps } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          Steps.useQueryLocator('unique-id')

          return (
            <Form.Handler>
              <Steps.Layout id="unique-id">
                <MyStep title="Step 1" />
                <MyStep title="Step 2" />
                <MyStep title="Step 3" />
              </Steps.Layout>
            </Form.Handler>
          )
        }

        const MyStep = ({ title }) => {
          return (
            <Steps.Step title={title}>
              <Card stack>
                <P>Contents of {title}</P>
              </Card>
              <Steps.Buttons />
            </Steps.Step>
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
          Steps.useReachRouter('steps-with-router', {
            useLocation,
            navigate,
          })

          return (
            <Form.Handler>
              <Steps.Layout id="steps-with-router">
                <MyStep title="Step 1" />
                <MyStep title="Step 2" />
                <MyStep title="Step 3" />
              </Steps.Layout>
            </Form.Handler>
          )
        }

        const MyStep = ({ title }) => {
          return (
            <Steps.Step title={title}>
              <Card stack>
                <P>Contents of {title}</P>
              </Card>
              <Steps.Buttons />
            </Steps.Step>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
