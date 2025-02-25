import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { ValueBlock } from '@dnb/eufemia/src/extensions/forms'
import { Anchor, P } from '@dnb/eufemia/src'

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
        label="Label text"
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
        Data-value goes here
      </ValueBlock>
    </ComponentBox>
  )
}
