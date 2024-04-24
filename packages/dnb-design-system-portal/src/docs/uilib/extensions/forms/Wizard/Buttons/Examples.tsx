import { Card, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Step = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Card>
                <P>Contents of {title}</P>
              </Card>
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

export const NextButton = () => {
  return (
    <ComponentBox>
      <Wizard.Provider
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => console.log('handleNext'),
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Wizard.NextButton />
      </Wizard.Provider>
    </ComponentBox>
  )
}

export const PreviousButton = () => {
  return (
    <ComponentBox>
      <Wizard.Provider
        value={{
          activeIndex: 5,
          handlePrevious: () => console.log('handlePrevious'),
          handleNext: () => null,
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Wizard.PreviousButton />
      </Wizard.Provider>
    </ComponentBox>
  )
}
