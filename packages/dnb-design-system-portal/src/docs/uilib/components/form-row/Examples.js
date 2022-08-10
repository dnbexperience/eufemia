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
} from '@dnb/eufemia/src/components'

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

const Box = styled(Space)`
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
      {
        /* jsx */ `
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
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowLegendIndentUsage = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-default">
      {
        /* jsx */ `
<FormRow indent="default" label="A long horizontal legend (FormLabel) with a lot of informative text and a default indent:">
  <Checkbox id="alone-1" label="Checkbox" />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowSectionStyle = () => (
  <TestStyles>
    <ComponentBox>
      {
        /* jsx */ `
<FormRow
  section_style="mint-green"
  section_spacing="default"
  indent={true}
  label="A long horizontal legend (FormLabel) with a lot of informative text and a default indent:"
>
  <Checkbox label="Checkbox" />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowCombineVerticalAndHorizontal = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-combined" useRender>
      {
        /* jsx */ `
// 1. In the nested FormRow we reset the layout to not be vertical
// 2. So we can use a different direction ("label_direction")
render(
  <FormRow
    label={
      <Space element="span" className="dnb-h--large" top={false} bottom="large" no_collapse={true} >
        Custom vertical legend:
      </Space>
    }
    vertical
  >
    <Input label="Vertical input A" />
    <Input label="Vertical input B" top="medium" />
    <FormRow
      vertical="false"
      label_direction="horizontal"
      top="medium"
    >
      <Input label="Horizontal input A" right="small" />
      <Input label="Horizontal input B" />
    </FormRow>
    <Input label="Vertical input C" top="medium" />
  </FormRow>
)
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowCustomIndentLayout = () => (
  <TestStyles>
    <ComponentBox useRender>
      {
        /* jsx */ `
const CustomRow = styled(FormRow)\`
  align-items: flex-end;
  > .dnb-form-label {
    max-width: 12rem;
    background: var(--color-white);
    color: var(--color-fire-red);
  }
\`
render(
  <CustomRow label="A long horizontal legend (FormLabel) with a lot of informative text and a max-width of 12rem:">
    <Checkbox label="Checkbox" />
  </CustomRow>
)
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowDefault = () => (
  <TestStyles>
    <ComponentBox>
      {
        /* jsx */ `
<FormRow>
  <Input label="Default horizontal FormRow:" placeholder="Input ..." />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowVertical = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-vertical">
      {
        /* jsx */ `
<FormRow direction="vertical" label="Label legend for the inputs:">
  <Input label="Vertical direction:" placeholder="Input A ..." />
  <Input label="Vertical direction:" placeholder="Input B ..." top="small" />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowVerticalDirection = () => (
  <TestStyles>
    <ComponentBox
      data-visual-test="form-row-vertical-label-button"
      useRender
    >
      {
        /* jsx */ `
const CustomRow = styled(FormRow)\`
  .dnb-form-row__content .dnb-button {
    align-self: flex-end;
    transform: translateY(0.25rem); /* 4px down */
  }
\`
render(
<CustomRow
  label={ <Space element="span" className="dnb-h--large" top="0" bottom="0">Legend</Space> }
  label_direction="vertical"
>
  <Input label="Vertical input label" value="Input" right="small" />
  <Button text="Button" />
</CustomRow>
)
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowNoWrap = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-horizontal-no_wrap">
      {
        /* jsx */ `
<FormRow
  label="A long horizontal legend (FormLabel) with a lot of informative text:"
  indent="true"
  indent_offset="large"
  direction="horizontal"
>
  <Input label="Input label A:" right="small"  />
  <Input label="Input label B:"  />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowWrap = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-horizontal-wrap">
      {
        /* jsx */ `
<FormRow
  label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:"
  indent
  indent_offset="x-large"
  wrap
  direction="horizontal"
>
  <Input label="Input A:" top="small" right="small" />
  <Input label="Input B:" top="small" right="small" />
  <Input label="Input C:" top="small" right="small" />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowLegendUsage = () => (
  <TestStyles>
    <ComponentBox data-visual-test="form-row-legend">
      {
        /* jsx */ `
<FormSet label_direction="vertical">
  <FormRow label="Label legend for the inputs:" >
    <Input label="Vertical label direction:" placeholder="Input A ..." right="small" />
    <Input label="Vertical label direction:" placeholder="Input B ..." />
  </FormRow>
  <FormRow label="Checkbox legend:" top="medium">
    <Checkbox label="Checkbox" />
  </FormRow>
</FormSet>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowInheritContext = () => (
  <TestStyles>
    <ComponentBox>
      {
        /* jsx */ `
<FormRow vertical={true} disabled={true}>
  <Input label="Vertical input A:" placeholder="Input A ..." />
  <Input label="Vertical input B:" placeholder="Input B ..." top="medium" />
</FormRow>
`
      }
    </ComponentBox>
  </TestStyles>
)

export const FormRowDifferentDirections = () => (
  <TestStyles>
    <ComponentBox useRender>
      {
        /* jsx */ `
const PhoneRow = styled(FormRow)\`
.dnb-dropdown__shell,
.dnb-dropdown__list {
  width: auto;
  min-width: 6rem;
}
@media screen and (max-width: 40em) {
  .dnb-dropdown {
    margin-bottom: 0.5rem;
  }
\`
render(
<FormRow vertical={true}>
  <Input
    label="Input"
    placeholder="Input ..."
    bottom
  />
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
`
      }
    </ComponentBox>
  </TestStyles>
)

export default class FormRowVisualTests extends React.PureComponent {
  render() {
    if (!global.IS_TEST) {
      return null
    }
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
        <ComponentBox
          title="Horizontal direction"
          scope={{ AllComponents }}
          data-visual-test="form-row-all-horizontal-direction"
        >
          {
            /* jsx */ `
<FormRow
  // label="Horizontal:"
  // indent="true"
  // indent_offset="large"
  direction="horizontal"
>
  <AllComponents horizontal />
</FormRow>
`
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical direction"
          scope={{ AllComponents, WidthLimit }}
          data-visual-test="form-row-all-vertical-direction"
        >
          {
            /* jsx */ `
<WidthLimit>
  <FormRow label="Vertical direction:" direction="vertical">
    <AllComponents />
  </FormRow>
</WidthLimit>
`
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical everything"
          scope={{ AllComponents, WidthLimit }}
          data-visual-test="form-row-all-vertical-everything"
        >
          {
            /* jsx */ `
<WidthLimit>
  <FormRow label="Vertical everything:" vertical="true">
   <AllComponents />
  </FormRow>
</WidthLimit>
`
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical label direction"
          scope={{ AllComponents }}
          data-visual-test="form-row-all-vertical-label-direction"
        >
          {
            /* jsx */ `
<FormRow label="Vertical label direction:" label_direction="vertical">
  <AllComponents horizontal />
</FormRow>
`
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical label direction, no labels"
          scope={{ AllComponents }}
          data-visual-test="form-row-all-vertical-label-direction-no-label"
        >
          {
            /* jsx */ `
<FormRow label="Vertical label direction, no labels:" label_direction="vertical">
  <AllComponents horizontal hideLabel />
</FormRow>
`
          }
        </ComponentBox>
        <ComponentBox
          title="All form components which has the stretch property"
          scope={{ AllStretchComponents }}
          data-visual-test="form-row-all-stretch-components"
        >
          {
            /* jsx */ `
<AllStretchComponents />
`
          }
        </ComponentBox>
        <ComponentBox
          title="Horizontal centered"
          data-visual-test="form-row-centered"
        >
          {
            /* jsx */ `
<FormRow centered>
  <div className="box1" />
  <div className="box2" />
</FormRow>
`
          }
        </ComponentBox>
      </TestStyles>
    )
  }
}

export const AllComponents = ({
  horizontal,
  vertical,
  showText,
  hideLabel,
}) => {
  const params = {
    left: horizontal ? 'small' : null,
    top: !horizontal || vertical ? 'small' : null,
  }
  let labels = {
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
