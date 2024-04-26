import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Form, Wizard } from '@dnb/eufemia/src/extensions/forms'
import { Card, P } from '@dnb/eufemia/src'

export const IntroExample = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('my-wizard')

          return (
            <Form.Handler>
              <Wizard.Container
                id="my-wizard"
                variant="drawer"
                omitScrollManagement
              >
                <Wizard.Step title="Step 1">
                  <Form.MainHeading>Heading</Form.MainHeading>
                  <Card stack>
                    <P>Step 1</P>
                  </Card>
                  <Wizard.Buttons />
                </Wizard.Step>
                <Wizard.Step title="Step 2">
                  <Form.MainHeading>Heading</Form.MainHeading>
                  <Card stack>
                    <P>Step 2</P>
                  </Card>
                  <Wizard.Buttons />
                </Wizard.Step>
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
