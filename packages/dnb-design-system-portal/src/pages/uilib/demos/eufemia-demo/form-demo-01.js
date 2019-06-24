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
import { H1, H2, P } from 'dnb-ui-lib/elements'
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
  Switch
} from 'dnb-ui-lib/components'
import {
  save_alt_01 as SaveIcon,
  trash as TrashIcon,
  attachment as AttachmentIcon
} from 'dnb-ui-lib/icons'

// Spacing helper for styled components
const SpacingHelper = props => ({
  marginTop: props.top && `${props.top}rem`,
  marginBottom: props.bottom && `${props.bottom}rem`,
  maxWidth: props.maxWidth && `${props.maxWidth}rem`
})
const Spacing = styled.div(SpacingHelper)
const SectionWithSpacing = styled(Section)(SpacingHelper)

// Visual helper to limit the width inside of our layout
const WidthLimit = styled.div`
  max-width: 42rem;
  .dnb-input {
    max-width: 10rem;
  }
`

// set the header hight
const HeaderSection = styled(SectionWithSpacing)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 16rem;
`
// center the h1 vertically
const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin-top: 3rem;
`

// Section's combined, but now with spacing possibility
const SectionCustom = styled(SectionWithSpacing)`
  /* change from 3rem to 1.5rem */
  padding-bottom: 1.5rem;
`

// Paragraph with spacing
const Paragraph = styled(P)`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`
// Custom paragraph
const Ingress = styled(Paragraph)`
  font-weight: var(--font-weight-demi);
  color: var(--color-emerald-green);
`

// Attachment area
const Attachment = styled(Spacing)`
  .dnb-button {
    margin-left: 1.5rem;
  }
`
Attachment.FileRow = styled.span`
  .dnb-icon {
    margin-right: 0.5rem;
  }
`
Attachment.Add = styled(Spacing)`
  .dnb-button {
    margin-left: -1rem;
  }
`

// The bottom section / divider has some extra CSS
const DividerSection = styled(SectionWithSpacing)`
  display: flex;
  justify-content: space-between;
  .dnb-button + .dnb-button {
    margin-left: 0.5rem;
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
        <HeaderTitleWrapper>
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
          setTimeout(() => {
            if (currentValues.switchIsChecked) {
              updateErrors(defaultErrors)
            }
          }, 1e3)
        }}
      >
        <WidthLimit>
          <SectionCustom top="1.5" spacing="large" style="white">
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
          </SectionCustom>

          <SectionCustom top="1.5" spacing="large">
            <H2>Lorem ipsum</H2>
            <Ingress>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore.
            </Ingress>

            <Spacing top=".5">
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
            </Spacing>

            <Spacing top="1.5">
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
            </Spacing>

            <Spacing top="1.5">
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
            </Spacing>

            <Spacing top="1.5">
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
            </Spacing>
          </SectionCustom>

          <SectionCustom top="1.5" spacing="large" style="white">
            <H2>Attachment</H2>

            <Ingress>
              If you have a receipt of the ATM transaction showing that
              money was not dispensed, then please upload the copy as this
              would strengthen your case.
            </Ingress>

            <Attachment top=".5">
              <Attachment.FileRow>
                <Icon icon={AttachmentIcon} /> filname_01.jpg
              </Attachment.FileRow>
              <Button
                text="Delete"
                variant="tertiary"
                icon={TrashIcon}
                icon_position="left"
              />
            </Attachment>

            <Attachment.Add top=".5">
              <Button
                text="Upload attachment"
                variant="tertiary"
                icon={AttachmentIcon}
                icon_position="left"
              />
            </Attachment.Add>
          </SectionCustom>
        </WidthLimit>

        <SectionCustom top="3.5" spacing="medium">
          <Switch
            label="I hereby declare that all information given is correct and to the best of my knowledge."
            label_position="right"
            checked={currentValues.switchIsChecked}
            on_change={({ checked }) =>
              updateValues({
                ...currentValues,
                switchIsChecked: checked
              })
            }
            status={currentErrors.switchErrorMessage}
          />
        </SectionCustom>

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

        <Spacing bottom="1.5" />
      </FormSet>
    </Layout>
  )
}

export default FormDemo

const goToNextPage = () => navigateTo('/form-demo-02')
