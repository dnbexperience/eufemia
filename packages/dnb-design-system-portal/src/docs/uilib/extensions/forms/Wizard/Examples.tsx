import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Form, Wizard } from '@dnb/eufemia/src/extensions/forms'
import { P } from '@dnb/eufemia/src'

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
                  <Form.Card>
                    <P>Step 1</P>
                  </Form.Card>
                  <Wizard.Buttons />
                </Wizard.Step>
                <Wizard.Step title="Step 2">
                  <Form.MainHeading>Heading</Form.MainHeading>
                  <Form.Card>
                    <P>Step 2</P>
                  </Form.Card>
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
