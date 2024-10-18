import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  FieldBlock,
  Field,
  TestElement,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
import { Flex, Slider } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <FieldBlock label="Label text">Input features goes here</FieldBlock>
    </ComponentBox>
  )
}

export const WithInfo = () => {
  return (
    <ComponentBox>
      <FieldBlock label="Label text" info="For your information">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const Horizontal = () => {
  return (
    <ComponentBox>
      <FieldBlock label="Label text" layout="horizontal">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const HorizontalWithInfo = () => {
  return (
    <ComponentBox>
      <FieldBlock
        label="Label text"
        layout="horizontal"
        info="For your information"
      >
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      hideCode
      data-visual-test="forms-field-block-widths"
    >
      <Flex.Stack>
        <FieldBlock label="Default width (no width props)">
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Small (affects outer block element)"
          width="small"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Medium (affects outer block element)"
          width="medium"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Large (affects outer block element)"
          width="large"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Custom (affects outer block element)"
          width="8rem"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Stretch (affects outer block element)"
          width="stretch"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>

        <FieldBlock
          label="Small (affects contents only)"
          contentWidth="small"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Medium (affects contents only)"
          contentWidth="medium"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Large (affects contents only)"
          contentWidth="large"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Custom (affects contents only)"
          contentWidth="8rem"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>
        <FieldBlock
          label="Stretch (affects contents only)"
          contentWidth="stretch"
        >
          <TestElement>Contents</TestElement>
        </FieldBlock>

        <Flex.Horizontal gap={false}>
          <FieldBlock
            width="stretch"
            style={{ backgroundColor: 'var(--color-mint-green)' }}
          >
            Left content
          </FieldBlock>
          <FieldBlock
            width="stretch"
            style={{ backgroundColor: 'var(--color-pistachio)' }}
          >
            Right content
          </FieldBlock>
        </Flex.Horizontal>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithDescription = () => {
  return (
    <ComponentBox data-visual-test="forms-field-block-label-description">
      <FieldBlock label="Label text" labelDescription="Description text">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const HorizontalAutoSize = () => {
  return (
    <ComponentBox>
      <FieldBlock label="Label">
        <Flex.Container>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <Field.Name.First
              path="/firstName"
              width="medium"
              minLength={2}
            />
          </Flex.Item>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <Field.Name.Last path="/lastName" width="medium" required />
          </Flex.Item>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <FieldBlock width="large">
              <Slider
                min={1900}
                max={new Date().getFullYear()}
                step={1}
                value={2010}
                label="Birth year"
                label_direction="vertical"
                tooltip
                alwaysShowTooltip
              />
            </FieldBlock>
          </Flex.Item>
        </Flex.Container>
      </FieldBlock>
    </ComponentBox>
  )
}

export const LabelSize = () => (
  <ComponentBox data-visual-test="forms-field-block-label-size">
    <Form.Handler>
      <Flex.Stack>
        <Form.MainHeading>Heading</Form.MainHeading>
        <FieldBlock
          label="Legend with medium heading size"
          labelSize="medium"
        >
          <Field.String
            label="Label with a long text that goes beyond the field"
            width="medium"
          />
        </FieldBlock>
      </Flex.Stack>
    </Form.Handler>
  </ComponentBox>
)

export const CombineErrorMessages = () => {
  return (
    <ComponentBox data-visual-test="forms-field-block-combined-errors">
      <Field.Composition>
        <Field.Number
          width="small"
          label="Number"
          value={99}
          minimum={100}
          validateInitially
        />
        <Field.String
          width="medium"
          label="Text"
          value="Text"
          minLength={5}
          validateInitially
        />
      </Field.Composition>
    </ComponentBox>
  )
}
