/**
 * This is a quick demo of a Eufemia form.
 * This demo is mainly to demonstrate the visual part,
 * but includes also some event handling to showcase error messages.
 *
 * It is divided in three parts:
 *
 * 1. Markup
 * 2. Styles
 * 3. Logic
 *
 */

import React from 'react'
import styled from '@emotion/styled'

// App layout wrapper
import Layout from '../layout/DemoLayout'

// Get Eufemia in
import { P } from '@dnb/eufemia/src'
import {
  Heading,
  Input,
  Textarea,
  Section,
  ToggleButton,
  Icon,
  Button,
  Switch,
  Space,
  GlobalStatus,
  Tabs,
} from '@dnb/eufemia/src/components'
import {
  save as SaveIcon,
  trash as TrashIcon,
  attachment as AttachmentIcon,
} from '@dnb/eufemia/src/icons'
import { Provider } from '@dnb/eufemia/src/shared'
import { FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'

/** -- 1. Markup -- */

// Our main component
const FormDemo = () => (
  <FormLogic>
    <Layout>
      <Header />
      <MainForm />
      <Space bottom="medium" />
    </Layout>
  </FormLogic>
)
export default FormDemo

// A dummy header
const Header = () => (
  <>
    <HeaderSection style_type="mint-green">
      <HeaderTitleWrapper top="x-large">
        <Heading size="x-large">Card complaint</Heading>
      </HeaderTitleWrapper>
      <Tabs
        data={[
          {
            title: 'Information about the complaint',
            key: 'Information about the complaint',
          },
          { title: 'Summary', key: 'Summary' },
        ]}
      />
    </HeaderSection>
    <GlobalStatus />
  </>
)

export const Head = () => {
  return <title>Eufemia - Form Demo #1</title>
}

// Main form markup
const MainForm = () => {
  const {
    currentValues,
    setValues,
    currentErrors,
    resetErrors,
    submitHandler,
    cancelHandler,
  } = React.useContext(FormContext)

  return (
    <Provider formElement={{ label_direction: 'vertical' }}>
      <Form.Handler onSubmit={submitHandler}>
        <WidthLimit>
          <Section top="medium" spacing="x-large" style_type="white">
            <Heading>What has happened?</Heading>
            <Ingress>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </Ingress>

            <ToggleButton.Group
              value={currentValues.toggleButtonOptionsValue}
              on_change={({ value: toggleButtonOptionsValue }) =>
                setValues({
                  toggleButtonOptionsValue,
                })
              }
            >
              <ToggleButton text="Unknown transaction" value="first" />
              <ToggleButton
                text="I did not receive money from the ATM"
                value="second"
              />
              <ToggleButton text="Goods not received" value="third" />
              <ToggleButton text="Wrong goods received" value="fourth" />
              <ToggleButton text="Fake goods received" value="fifth" />
              <ToggleButton text="Double charged" value="sixth" />
              <ToggleButton text="Wrong amount charged" value="seventh" />
              <ToggleButton text="I am after charged" value="eighth" />
            </ToggleButton.Group>
          </Section>

          <Section spacing="x-large">
            <Heading>Lorem ipsum</Heading>
            <Ingress>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore.
            </Ingress>

            <Space top="small">
              <FieldBlock label="Did you receive some money from the ATM?">
                <ToggleButton.Group
                  value={currentValues.yesNoQuestionValue}
                  on_change={({ value: yesNoQuestionValue }) =>
                    setValues({
                      yesNoQuestionValue,
                    })
                  }
                >
                  <ToggleButton text="Yes" value="yes" />
                  <ToggleButton text="No" value="no" />
                </ToggleButton.Group>
              </FieldBlock>
            </Space>

            <Space top="medium">
              <Input
                label="How much money did you withdraw?"
                suffix="Kr"
                value={currentValues.firstInputValue}
                on_change={({ value: firstInputValue }) =>
                  setValues({
                    firstInputValue,
                  })
                }
              />
            </Space>

            <Space top="medium">
              <Input
                label="How much money did you receive?"
                suffix="Kr"
                value={currentValues.secondInputValue}
                on_change={({ value: secondInputValue }) =>
                  setValues({
                    secondInputValue,
                  })
                }
              />
            </Space>

            <Space top="medium">
              <Textarea
                rows="6"
                cols="40"
                label="Do you have additional relevant information about the case?"
                value={currentValues.textareaValue}
                on_change={({ value: textareaValue }) =>
                  setValues({
                    textareaValue,
                  })
                }
              />
            </Space>
          </Section>

          <Section spacing="x-large" style_type="white">
            <Heading>Attachment</Heading>

            <Ingress bottom="x-small">
              If you have a receipt of the ATM transaction showing that
              money was not dispensed, then please upload the copy as this
              would strengthen your case.
            </Ingress>

            <Attachment>
              <Attachment.FileRow>
                <Icon icon={AttachmentIcon} />
                filename_01.jpg
              </Attachment.FileRow>
              <Button
                text="Delete"
                variant="tertiary"
                icon={TrashIcon}
                icon_position="left"
              />
            </Attachment>

            <Attachment.Add>
              <Button
                text="Upload attachment"
                variant="tertiary"
                icon={AttachmentIcon}
                icon_position="left"
              />
            </Attachment.Add>
          </Section>
        </WidthLimit>

        <Section top="medium" spacing="medium">
          <Switch
            label="I hereby declare that all information given is correct and to the best of my knowledge."
            label_position="right"
            checked={currentValues.switchIsChecked}
            on_change={({ checked: switchIsChecked }) =>
              setValues({
                switchIsChecked,
              })
            }
            on_change_end={({ checked }) => checked && resetErrors()}
            status={currentErrors.switchErrorMessage}
          />
        </Section>

        <DividerSection spacing="small" style_type="divider">
          <Button type="submit" text="Next" icon="chevron_right" />
          <div>
            <Button
              text="Save"
              type="submit" // This button is the required submit
              variant="secondary"
              icon={SaveIcon}
              icon_position="left"
            />
            <Button
              text="Cancel"
              variant="secondary"
              icon="close"
              icon_position="left"
              on_click={cancelHandler}
            />
          </div>
        </DividerSection>
      </Form.Handler>
    </Provider>
  )
}

/** -- 2. Styles -- */

// Visual helper to limit the width inside of our layout
const WidthLimit = styled.div`
  max-width: 42rem;
  .dnb-input__input {
    max-width: 10rem;
  }
  @media screen and (max-width: 40em) {
    textarea {
      width: 90vw;
    }
  }
`

// set the header height
const HeaderSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 16rem;
`
// center the h1 vertically
const HeaderTitleWrapper = styled(Space)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

// Custom paragraph
const IngressRaw = styled(P)`
  font-weight: var(--font-weight-medium);
  color: var(--color-emerald-green);
`
const Ingress = (props) => (
  <IngressRaw top="x-small" bottom="small" {...props} />
)

// Attachment area
const Attachment = (props) => {
  const Component = styled(P)`
    .dnb-button {
      margin-left: 1rem;
    }
  `
  return <Component {...props} />
}
Attachment.FileRow = styled.span`
  margin-right: 0.75rem;
  .dnb-icon {
    margin-right: 0.5rem;
  }
`
Attachment.Add = styled(Space)`
  margin-top: 0.5rem;
`

// The bottom section / divider has some extra CSS
const DividerSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  .dnb-button + .dnb-button {
    margin-left: 1rem;
  }
  @media screen and (max-width: 30rem) {
    display: block;
    .dnb-button {
      display: flex;
      margin-top: 0.5rem;
      & + .dnb-button {
        margin-left: 0;
      }
    }
  }
`

/** -- 3. App logic -- */

// Default local states/values
const defaultValues = {
  toggleButtonOptionsValue: 'second',
  yesNoQuestionValue: 'yes',
  firstInputValue: 2000,
  secondInputValue: 200,
  textareaValue:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
  switchIsChecked: false,
}
const defaultErrors = {
  switchErrorMessage: 'Sorry, this has to be checked.',
}

// Form Logic and Event handling
const FormContext = React.createContext(null)
const FormLogic = (props) => {
  const [currentValues, updateValues] = React.useState(defaultValues)
  const [currentErrors, updateErrors] = React.useState({})

  function submitHandler() {
    // Handle error before we use the form value
    if (handleErrors()) {
      console.log('Show me my values:', currentValues)
    }
  }

  function handleErrors() {
    // simulate error
    if (!currentValues.switchIsChecked) {
      updateErrors(defaultErrors)
      return false
    } else {
      // remove errors, in case we had some
      resetErrors()
    }

    return true
  }

  function cancelHandler() {
    // // remove errors, in case we had some
    resetErrors()

    // reset the values
    updateValues(defaultValues)
  }

  const resetErrors = () => updateErrors({})
  const setValues = (newProps) =>
    updateValues({ ...currentValues, ...newProps })

  // Our context we use for state handling
  const formContext = {
    currentValues,
    updateValues,
    currentErrors,
    updateErrors,
    submitHandler,
    handleErrors,
    cancelHandler,
    setValues,
    resetErrors,
  }

  return <FormContext.Provider value={formContext} {...props} />
}
