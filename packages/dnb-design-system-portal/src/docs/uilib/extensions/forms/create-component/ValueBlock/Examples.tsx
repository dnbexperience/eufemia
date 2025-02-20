import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { ValueBlock } from '@dnb/eufemia/src/extensions/forms'
import { P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <ValueBlock label="Label text">Data-value goes here</ValueBlock>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox data-visual-test="value-block-inline">
      <P>
        this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
        <ValueBlock inline>Bar</ValueBlock> this is after the value
      </P>
    </ComponentBox>
  )
}

export const Help = () => {
  return (
    <ComponentBox>
      <ValueBlock
        label="Label text"
        help={{ title: 'Help title', content: 'Help content' }}
      >
        Data-value goes here
      </ValueBlock>
    </ComponentBox>
  )
}
