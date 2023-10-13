/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Ingress,
  Space,
  Button,
  IconPrimary,
  DatePicker,
  Textarea,
  Autocomplete,
  Dropdown,
  Slider,
  Checkbox,
  Radio,
  ToggleButton,
  Switch,
  Input,
  FormSet,
  FormRow,
} from '@dnb/eufemia/src'
import { SpacingElementProps } from '@dnb/eufemia/src/shared/types'
import { Provider } from '@dnb/eufemia/src/shared'
import { SpaceAllProps } from '@dnb/eufemia/src/components/space/Space'

const TestStyles = styled.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
  :not(.dnb-input--stretch) .dnb-input__input {
    width: 12rem;
  }
  .box1 {
    width: 1rem;
    height: 1rem;
    background: var(--color-emerald-green);
  }
  .box2 {
    width: 2rem;
    height: 2rem;
    background: var(--color-summer-green);
  }
`
const WidthLimit = styled.div`
  width: 40rem;
`

const Box = styled((props: SpaceAllProps) => <Space {...props} />)`
  position: relative;

  margin: 0;
  padding: 1rem;

  @media screen and (min-width: 40em) {
    padding: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    right: -50vw;
    bottom: -1px;
    width: 200vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
  }
`

export const FormRowVerticalAlignedLabels = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-vertical-label">
      <FormRow
        label={
          <Ingress top="0" bottom="small">
            Custom legend:
          </Ingress>
        }
        label_direction="vertical"
      >
        <Input label="Label A:" value="Input A" right="small" />
        <Input label="Label B:" value="Input B" />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowSectionStyle = () => (
  <TestStyles>
    <ComponentBox>
      <FormRow
        vertical
        section_style="mint-green"
        section_spacing
        label="A long horizontal legend (FormLabel) with a lot of informative text:"
      >
        <Checkbox label="Checkbox" />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowCombineVerticalAndHorizontal = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-combined">
      {() => {
        // 1. In the nested FormRow we reset the layout to not be vertical
        // 2. So we can use a different direction ("label_direction")
        return (
          <FormRow
            label={
              <Space
                element="span"
                className="dnb-h--large"
                top={false}
                bottom="large"
                no_collapse={true}
              >
                Custom vertical legend:
              </Space>
            }
            vertical
          >
            <Input label="Vertical input A" />
            <Input label="Vertical input B" top="medium" />
            <FormRow
              vertical={false}
              label_direction="horizontal"
              top="medium"
            >
              <Input label="Horizontal input A" right="small" />
              <Input label="Horizontal input B" />
            </FormRow>
            <Input label="Vertical input C" top="medium" />
          </FormRow>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

export const FormRowDefault = () => (
  <TestStyles>
    <ComponentBox>
      <FormRow>
        <Input
          label="Default horizontal FormRow:"
          placeholder="Input ..."
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowVertical = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-vertical">
      <FormRow direction="vertical" label="Label legend for the inputs:">
        <Input label="Vertical direction:" placeholder="Input A ..." />
        <Input
          label="Vertical direction:"
          placeholder="Input B ..."
          top="small"
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowNoWrap = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-horizontal-no_wrap">
      <FormRow
        label="A long horizontal legend (FormLabel) with a lot of informative text:"
        direction="horizontal"
      >
        <Input label="Input label A:" right="small" />
        <Input label="Input label B:" />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowWrap = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-horizontal-wrap">
      <FormRow
        label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:"
        direction="horizontal"
        wrap
      >
        <Input label="Input A:" top="small" right="small" />
        <Input label="Input B:" top="small" right="small" />
        <Input label="Input C:" top="small" right="small" />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowLegendUsage = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-legend">
      <FormSet label_direction="vertical">
        <FormRow label="Label legend for the inputs:">
          <Input
            label="Vertical label direction:"
            placeholder="Input A ..."
            right="small"
          />
          <Input
            label="Vertical label direction:"
            placeholder="Input B ..."
          />
        </FormRow>
        <FormRow label="Checkbox legend:" top="medium">
          <Checkbox label="Checkbox" />
        </FormRow>
      </FormSet>
    </ComponentBox>
  </TestStyles>
)

export const FormRowInheritContext = () => (
  <TestStyles>
    <ComponentBox>
      <FormRow vertical={true} disabled={true}>
        <Input label="Vertical input A:" placeholder="Input A ..." />
        <Input
          label="Vertical input B:"
          placeholder="Input B ..."
          top="medium"
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>
)

export const FormRowDifferentDirections = () => (
  <TestStyles>
    <ComponentBox>
      {() => {
        const PhoneRow = styled(FormRow)`
          .dnb-dropdown__shell,
          .dnb-dropdown__list {
            width: auto;
            min-width: 6rem;
          }
          @media screen and (max-width: 40em) {
            .dnb-dropdown {
              margin-bottom: 0.5rem;
            }
          }
        `
        return (
          <FormRow vertical={true}>
            <Input label="Input" placeholder="Input ..." bottom />
            <PhoneRow
              label="Phone number"
              label_direction="vertical"
              vertical={false}
            >
              <Dropdown
                right="small"
                title="Country code"
                data={['+47', '+48', '+49']}
                value={0}
              />
              <Input placeholder="Your phone number" />
            </PhoneRow>
          </FormRow>
        )
      }}
    </ComponentBox>
  </TestStyles>
)

const VisibleWhenVisualTestHorizontalDirection = () => (
  <ComponentBox
    scope={{ AllComponents }}
    data-visual-test="form-row-all-horizontal-direction"
  >
    <FormRow direction="horizontal">
      <AllComponents horizontal />
    </FormRow>
  </ComponentBox>
)

const VisibleWhenVisualTestVerticalDirection = () => (
  <ComponentBox
    scope={{ AllComponents, WidthLimit }}
    data-visual-test="form-row-all-vertical-direction"
  >
    <WidthLimit>
      <FormRow label="Vertical direction:" direction="vertical">
        <AllComponents />
      </FormRow>
    </WidthLimit>
  </ComponentBox>
)

const VisibleWhenVisualTestVerticalEverything = () => (
  <ComponentBox
    scope={{ AllComponents, WidthLimit }}
    data-visual-test="form-row-all-vertical-everything"
  >
    <WidthLimit>
      <FormRow label="Vertical everything:" vertical={true}>
        <AllComponents />
      </FormRow>
    </WidthLimit>
  </ComponentBox>
)

const VisibleWhenVisualTestLabelDirection = () => (
  <ComponentBox
    scope={{ AllComponents }}
    data-visual-test="form-row-all-vertical-label-direction"
  >
    <FormRow label="Vertical label direction:" label_direction="vertical">
      <AllComponents horizontal />
    </FormRow>
  </ComponentBox>
)

const VisibleWhenVisualTestVerticalLabelDirectionNoLabels = () => (
  <ComponentBox
    scope={{ AllComponents }}
    data-visual-test="form-row-all-vertical-label-direction-no-label"
  >
    <FormRow
      label="Vertical label direction, no labels:"
      label_direction="vertical"
    >
      <AllComponents horizontal hideLabel />
    </FormRow>
  </ComponentBox>
)

const VisibleWhenVisualTestAllStretch = () => (
  <ComponentBox
    scope={{ AllStretchComponents }}
    data-visual-test="form-row-all-stretch-components"
  >
    <AllStretchComponents />
  </ComponentBox>
)

const VisibleWhenVisualTestHorizontalCentered = () => (
  <ComponentBox data-visual-test="form-row-centered">
    <FormRow centered>
      <div className="box1" />
      <div className="box2" />
    </FormRow>
  </ComponentBox>
)

export default function FormRowVisibleWhenVisualTests() {
  return (
    <TestStyles>
      <Global
        styles={css`
          #___gatsby {
            display: flex;
          }
          .dnb-app-content {
            overflow: visible;
          }
        `}
      />
      <VisibleWhenVisualTestHorizontalDirection />
      <VisibleWhenVisualTestVerticalDirection />
      <VisibleWhenVisualTestVerticalEverything />
      <VisibleWhenVisualTestLabelDirection />
      <VisibleWhenVisualTestVerticalLabelDirectionNoLabels />
      <VisibleWhenVisualTestAllStretch />
      <VisibleWhenVisualTestHorizontalCentered />
    </TestStyles>
  )
}

export const AllComponents = ({
  horizontal,
  vertical,
  showText,
  hideLabel,
}) => {
  const params: SpacingElementProps = {
    left: horizontal ? 'small' : null,
    top: !horizontal || vertical ? 'small' : null,
  }
  let labels: Record<string, string> = {
    datePicker: 'DatePicker:',
    dropdown: 'Dropdown:',
    autocomplete: 'Autocomplete:',
    checkbox: 'Checkbox',
    radio: 'Radio',
    radioGroup: 'Radio Group:',
    toggleButton: 'Toggle:',
    toggleButtonGroup: 'Toggle Group:',
    switch: 'Switch',
    input: 'Input:',
    textarea: 'Textarea:',
    slider: 'Slider:',
  }
  if (hideLabel) {
    labels = Object.entries(labels).reduce((acc, [k]) => {
      acc[k] = ''
      return acc
    }, {})
  }
  return (
    <>
      {showText && (
        <>
          <Space {...params} inline>
            <p className="dnb-p">
              paragraph{' '}
              <IconPrimary
                icon="bell"
                size="medium"
                {...params}
                style={{ margin: 0 }} // since this is not a block element
              />
            </p>
          </Space>
          text
        </>
      )}
      <Button text="Button" {...params} />
      <Button icon="add" {...params} />
      <Input label={labels.input} {...params} />
      <Input label={labels.input} {...params} />
      <Dropdown
        label={labels.dropdown}
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <Autocomplete
        label={labels.autocomplete}
        data={['Item A', 'Item B', 'Item C']}
        {...params}
      />
      <DatePicker label={labels.datePicker} {...params} />
      <IconPrimary
        icon="bell"
        size="medium"
        {...params}
        style={{ marginTop: 0 }} // since this is not a block element
      />
      <Checkbox label={labels.checkbox} {...params} />
      <Radio label={labels.radio} {...params} />
      <Radio.Group label={labels.radioGroup} {...params}>
        <Radio label={labels.radio} value="a" />
        <Radio label={labels.radio} value="b" />
      </Radio.Group>
      <ToggleButton
        label={labels.toggleButton}
        text="Toggle"
        {...params}
      />
      <ToggleButton.Group label={labels.toggleButtonGroup} {...params}>
        <ToggleButton text="Toggle A" value="a" />
        <ToggleButton text="Toggle B" value="b" />
      </ToggleButton.Group>
      <Switch label={labels.switch} {...params} />
      <Textarea label={labels.textarea} rows="5" {...params} />
      <Textarea label={labels.textarea} rows="5" {...params} />
      <Slider label={labels.slider} value={50} {...params} />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  showText: PropTypes.bool,
  hideLabel: PropTypes.bool,
}
AllComponents.defaultProps = {
  horizontal: null,
  vertical: null,
  showText: null,
  hideLabel: null,
}

export function AllStretchComponents() {
  return (
    <div>
      <StretchTemplate element={Input} />
      <StretchTemplate element={Textarea} />
      <StretchTemplate element={Autocomplete} />
      <StretchTemplate element={DatePicker} show_input />
      <StretchTemplate element={Dropdown} />
      <StretchTemplate element={Slider} />
    </div>
  )
}

function StretchTemplate({ element: Comp, ...props }) {
  return (
    <>
      <Box>
        <FormSet direction="vertical">
          <FormRow>
            <Comp
              label='FormSet direction="vertical"'
              stretch
              {...props}
            />
          </FormRow>
        </FormSet>
      </Box>
      <Box>
        <FormSet vertical>
          <FormRow>
            <Comp label="FormSet vertical" stretch {...props} />
          </FormRow>
        </FormSet>
      </Box>
      <Box>
        <FormRow direction="horizontal">
          <Comp
            label='FormRow direction="horizontal"'
            stretch
            {...props}
          />
        </FormRow>
      </Box>
      <Box>
        <Comp
          label='label_direction="vertical"'
          label_direction="vertical"
          stretch
          {...props}
        />
      </Box>
    </>
  )
}

export function FormRowLabelDirectionInfo() {
  return (
    <ComponentBox>
      <FormRow label_direction="vertical">
        <Input label="Label:" right />
        <Input label="Label:" />
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowDirectionInfo() {
  return (
    <ComponentBox>
      <FormRow direction="vertical">
        <Input label="Label:" bottom />
        <Input label="Label:" />
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowVerticalInfo() {
  return (
    <ComponentBox>
      <FormRow vertical>
        <Input label="Label:" bottom />
        <Input label="Label:" />
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowDefaultInfo() {
  return (
    <ComponentBox>
      <FormRow>
        <Input label="Label:" right />
        <Input label="Label:" />
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowSpacingInfo() {
  return (
    <ComponentBox>
      {/* The FormRow will then have a "margin-top: 2.5rem;" */}
      <FormRow top="large x-small">
        <Input label="Input label">Value</Input>
      </FormRow>
      {/* ... or go crazy */}
      <FormRow top="large medium small">
        <Input label="Input label">Value</Input>
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowResponsiveInfo() {
  return (
    <ComponentBox>
      <FormRow responsive={true}>
        <Input label="Input label">Value</Input>
      </FormRow>
    </ComponentBox>
  )
}

export function FormRowProvider() {
  return (
    <ComponentBox scope={{ Provider }} hidePreview>
      <Provider FormRow={{ vertical: true }}>
        <div id="my-app">
          ...
          <FormRow>Everything is vertical now</FormRow>
          <FormRow>Everything is vertical now</FormRow>
          ...
        </div>
      </Provider>
    </ComponentBox>
  )
}
