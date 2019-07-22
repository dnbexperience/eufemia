/**
 * This is a quick demo of a Eufemia form.
 * This demo is mainly to demonstrate the visual part,
 * but includes also some event handling - but no state management.
 *
 */

import React, { useState } from 'react'
import Head from 'react-helmet'
import { navigateTo } from 'gatsby'
import styled from '@emotion/styled'

// App layout
import Layout from '../layout/Layout'

// Get Eufemia in
import { H1, H2, P } from 'dnb-ui-lib/src/elements'
import {
  FormSet,
  FormRow,
  Input,
  Textarea,
  Section,
  StepIndicator,
  ToggleButton,
  Icon,
  Button,
  Switch,
  Space
} from 'dnb-ui-lib/src/components'
import {
  save_alt_01 as SaveIcon,
  trash as TrashIcon,
  attachment as AttachmentIcon
} from 'dnb-ui-lib/src/icons'

// Visual helper to limit the width inside of our layout
const WidthLimit = styled.div`
  max-width: 42rem;
  .dnb-input__input {
    max-width: 10rem;
  }
  @media (max-width: 40em) {
    textarea {
      width: 90vw;
    }
  }
`

// set the header hight
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
  font-weight: var(--font-weight-demi);
  color: var(--color-emerald-green);
`
const Ingress = props => (
  <IngressRaw top="x-small" bottom="small" {...props} />
)

// Attachment area
const Attachment = styled(Space)`
  .dnb-button {
    margin-left: 1.5rem;
  }
`
Attachment.FileRow = styled.span`
  .dnb-icon {
    margin-right: 0.5rem;
  }
`
Attachment.Add = styled(Space)`
  .dnb-button {
    margin-left: -1rem;
  }
`

// The bottom section / divider has some extra CSS
const DividerSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  .dnb-button + .dnb-button {
    margin-left: 1rem;
  }
  @media (max-width: 40em) {
    .dnb-button + .dnb-button {
      margin-left: 0.5rem;
    }
  }
`

// Default local states/values
const defaultValues = {
  toggleButtonOptionsValue: 'second',
  yesNoQuestionValue: 'yes',
  firstInputValue: 2000,
  secondInputValue: 200,
  textareValue:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
  switchIsChecked: true
}
const defaultErrors = {
  switchErrorMessage: 'Sorry, this has to be unchecked.'
}

const FormDemo = () => {
  // Event handling
  const [currentValues, updateValues] = useState(defaultValues)
  const [currentErrors, updateErrors] = useState({})

  return (
    <Layout>
      <Head>
        <html lang="en" />
        <title>Eufemia - form demo 1</title>
      </Head>

      <HeaderSection style="mint-green">
        <HeaderTitleWrapper top="x-large">
          <H1 style_type="small">Card complaint</H1>
        </HeaderTitleWrapper>

        <StepIndicator
          active_item={0}
          use_navigation="true"
          data={[
            {
              title: 'Information about the complaint'
            },
            {
              title: 'Summary'
            }
          ]}
          on_change={e => {
            console.log('StepIndicator.on_change', e)
          }}
        />
      </HeaderSection>

      <FormSet
        vertical
        prevent_submit
        on_submit={() => {
          // console.log('FormSet.on_submit', object)
          console.log('Show me my values:', currentValues)

          // remove errors for a bit
          updateErrors({})

          // simulate error
          if (currentValues.switchIsChecked) {
            updateErrors(defaultErrors)
          }
        }}
      >
        <WidthLimit>
          <Section top="medium" spacing="x-large" style="white">
            <H2>What has happened?</H2>
            <Ingress>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </Ingress>

            <ToggleButton.Group
              value={currentValues.toggleButtonOptionsValue}
              on_change={({ value }) =>
                updateValues({
                  ...currentValues,
                  toggleButtonOptionsValue: value
                })
              }
            >
              <ToggleButton text="Unknown transaction" value="first" />
              <ToggleButton
                text="I did not recieve money from the ATM"
                value="second"
              />
              <ToggleButton text="Goods not recieved" value="third" />
              <ToggleButton text="Wrong goods recieved" value="fourth" />
              <ToggleButton text="Fake goods recieved" value="fift" />
              <ToggleButton text="Double charged" value="sixth" />
              <ToggleButton text="Wrong amount charged" value="seventh" />
              <ToggleButton text="I am after charged" value="eighth" />
            </ToggleButton.Group>
          </Section>

          <Section spacing="x-large">
            <H2>Lorem ipsum</H2>
            <Ingress>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore.
            </Ingress>

            <Space top="small">
              <FormRow label="Did you receive some money from the ATM?">
                <ToggleButton.Group
                  value={currentValues.yesNoQuestionValue}
                  on_change={({ value }) =>
                    updateValues({
                      ...currentValues,
                      yesNoQuestionValue: value
                    })
                  }
                >
                  <ToggleButton text="Yes" value="yes" />
                  <ToggleButton text="No" value="no" />
                </ToggleButton.Group>
              </FormRow>
            </Space>

            <Space top="medium">
              <FormRow>
                <Input
                  label="How much money did you withdraw?"
                  description="Kr"
                  value={currentValues.firstInputValue}
                  on_change={({ value }) =>
                    updateValues({
                      ...currentValues,
                      firstInputValue: value
                    })
                  }
                />
              </FormRow>
            </Space>

            <Space top="medium">
              <FormRow>
                <Input
                  label="How much money did you receive?"
                  description="Kr"
                  value={currentValues.secondInputValue}
                  on_change={({ value }) =>
                    updateValues({
                      ...currentValues,
                      secondInputValue: value
                    })
                  }
                />
              </FormRow>
            </Space>

            <Space top="medium">
              <FormRow>
                <Textarea
                  rows="6"
                  cols="40"
                  label="Do you have additional relevant information about the case?"
                  value={currentValues.textareValue}
                  on_change={({ value }) =>
                    updateValues({
                      ...currentValues,
                      textareValue: value
                    })
                  }
                />
              </FormRow>
            </Space>
          </Section>

          <Section spacing="x-large" style="white">
            <H2>Attachment</H2>

            <Ingress bottom="x-small">
              If you have a receipt of the ATM transaction showing that
              money was not dispensed, then please upload the copy as this
              would strengthen your case.
            </Ingress>

            <Attachment>
              <Attachment.FileRow>
                <Icon icon={AttachmentIcon} /> <span>filname_01.jpg</span>
              </Attachment.FileRow>
              <Button
                text="Delete"
                variant="tertiary"
                icon={TrashIcon}
                icon_position="left"
              />
            </Attachment>

            <Attachment.Add top="x-small">
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
            on_change={({ checked }) => {
              updateValues({
                ...currentValues,
                switchIsChecked: checked
              })
            }}
            on_change_ends={({ checked }) => {
              if (!checked) {
                // remove errors
                updateErrors({
                  ...currentErrors,
                  switchErrorMessage: null
                })
              }
            }}
            status={currentErrors.switchErrorMessage}
            // status_animation
          />
        </Section>

        <DividerSection spacing="small" style="divider">
          <Button
            text="Next"
            icon="chevron_right"
            on_click={goToNextPage}
          />
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
              on_click={() => {
                // remove errors
                updateErrors({})

                // reset the values
                updateValues(defaultValues)
              }}
            />
          </div>
        </DividerSection>

        <Space bottom="medium" />
      </FormSet>
    </Layout>
  )
}

export default FormDemo

const goToNextPage = () => navigateTo('/form-demo-02')
