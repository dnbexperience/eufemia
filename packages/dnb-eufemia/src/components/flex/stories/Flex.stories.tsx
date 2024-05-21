/**
 * @dnb/eufemia Component Story
 *
 */

import { P } from '../../../elements'
import { Field, Form, TestElement } from '../../../extensions/forms'
import { SpaceProps } from '../../Space'
import { Section } from '../../lib'
import { createSpacingClasses } from '../../space/SpacingUtils'
import Flex from '../Flex'

export default {
  title: 'Eufemia/Components/Flex',
}

const Wrapper = Flex.withChildren(({ children }) => {
  return <div className="wrapper">{children}</div>
})

export function FlexWithVisibility() {
  const TestComponent = (props: SpaceProps) => {
    const cn = createSpacingClasses(props)
    cn.push('test-item')
    return <div className={cn.join(' ')}>content</div>
  }
  TestComponent._supportsSpacingProps = true

  return (
    <Form.Handler id="example-form" style={{ background: 'lightblue' }}>
      <Flex.Stack>
        <Field.Boolean path="/toggleValue" label="Check me" />
        <Form.Visibility pathTrue="/toggleValue">
          <P>This is visible 1</P>
          <P>This is visible 2</P>
        </Form.Visibility>

        <Wrapper>
          <TestComponent />
          <TestComponent />
        </Wrapper>

        <>
          <P>in fragment</P>
          <P>in fragment</P>
        </>
      </Flex.Stack>
    </Form.Handler>
  )
}

export function FlexWithChildren() {
  return (
    <Flex.Container direction="vertical">
      <TestElement>FlexItem 1</TestElement>
      <Wrapper>
        <TestElement>FlexItem 2</TestElement>
        <TestElement>FlexItem 3</TestElement>
      </Wrapper>
      <TestElement>FlexItem 4</TestElement>
    </Flex.Container>
  )
}

const Item = () => (
  <Flex.Stack divider="line-framed" gap="x-small">
    <TestElement>FlexItem</TestElement>
    <TestElement>FlexItem</TestElement>
  </Flex.Stack>
)

export function FlexBookend() {
  return (
    <Section innerSpace style={{ background: 'lightyellow' }}>
      <Flex.Horizontal rowGap={false}>
        <Item />
        <Item />
        <Item />
      </Flex.Horizontal>
    </Section>
  )
}
