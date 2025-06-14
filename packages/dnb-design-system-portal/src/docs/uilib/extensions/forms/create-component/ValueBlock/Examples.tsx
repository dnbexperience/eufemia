import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  TestElement,
  ValueBlock,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
import { Anchor, Flex, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox scope={{ ValueBlock }}>
      <ValueBlock label="Label text">Data-value goes here</ValueBlock>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox
      data-visual-test="value-block-inline"
      scope={{ ValueBlock }}
    >
      <P>
        this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
        <ValueBlock inline>Bar</ValueBlock> this is after the value
      </P>
    </ComponentBox>
  )
}

export const Help = () => {
  return (
    <ComponentBox
      scope={{ ValueBlock }}
      data-visual-test="value-block-help-button"
    >
      <ValueBlock
        label="Label text"
        help={{ title: 'Help title', content: 'Help content' }}
      >
        Data-value goes here
      </ValueBlock>
    </ComponentBox>
  )
}

export const HelpHtml = () => {
  return (
    <ComponentBox
      scope={{ ValueBlock }}
      data-visual-test="value-block-help-button-html"
    >
      <ValueBlock
        label="Label text with a long label label – lorem ipsum
        dolor sit"
        help={{
          open: true,
          title: <strong>Help title</strong>,
          content: (
            <>
              Help content with a <Anchor href="/">Anchor</Anchor>.
            </>
          ),
        }}
      >
        Data-value goes here – lorem ipsum dolor sit amet consectetur.
      </ValueBlock>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox
      scope={{ ValueBlock, TestElement }}
      hideCode
      data-visual-test="forms-value-block-widths"
    >
      <Flex.Stack>
        <ValueBlock label="No maxWidth: This label is long so we can validate that the label can be longer until it will wrap.">
          <TestElement>
            This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters.
          </TestElement>
        </ValueBlock>
        <ValueBlock
          label="maxWidth='small': This label is long so we can validate that the label can be longer."
          maxWidth="small"
        >
          <TestElement>
            This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters.
          </TestElement>
        </ValueBlock>
        <ValueBlock
          label="maxWidth='medium': This label is long so we can validate that the label can be longer."
          maxWidth="medium"
        >
          <TestElement>
            This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters.
          </TestElement>
        </ValueBlock>
        <ValueBlock
          label="maxWidth='large': This label is long so we can validate that the label can be longer."
          maxWidth="large"
        >
          <TestElement>
            This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters.
          </TestElement>
        </ValueBlock>
        <ValueBlock
          label="maxWidth='auto': This label is long so we can validate that the label can be longer."
          maxWidth="auto"
        >
          <TestElement>
            This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters.
          </TestElement>
        </ValueBlock>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Wrapping = () => {
  const sixtyOneChars =
    '0000000000000000000000000000000000000000000000000000000000000'
  const sixtyOneCharsIncludingASpace =
    '000000000000000000000000000000 000000000000000000000000000000'
  const fiftyEightCharsIncludingASpace =
    '00000000000000000000000000000000000000000000000000000000 0'
  return (
    <ComponentBox
      scope={{
        ValueBlock,
        sixtyOneChars,
        sixtyOneCharsIncludingASpace,
        fiftyEightCharsIncludingASpace,
      }}
      data-visual-test="forms-value-block-wrapping"
    >
      <Flex.Stack>
        <Form.Card>
          <Form.SubHeading>
            Breaking word with 61 characters
          </Form.SubHeading>
          <ValueBlock label={sixtyOneChars}>{sixtyOneChars}</ValueBlock>
          <ValueBlock
            label={sixtyOneChars}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            {sixtyOneChars}
          </ValueBlock>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Breaking a sentence of 61 characters that include a space
          </Form.SubHeading>
          <ValueBlock label={sixtyOneCharsIncludingASpace}>
            {sixtyOneCharsIncludingASpace}
          </ValueBlock>
          <ValueBlock
            label={sixtyOneCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            {sixtyOneCharsIncludingASpace}
          </ValueBlock>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Help button should not wrap alone
          </Form.SubHeading>
          <ValueBlock
            label={fiftyEightCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            {'value'}
          </ValueBlock>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
