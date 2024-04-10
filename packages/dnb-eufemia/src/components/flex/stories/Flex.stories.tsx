/**
 * @dnb/eufemia Component Story
 *
 */

import styled from '@emotion/styled'
import { P } from '../../../elements'
import { Field, Form, TestElement } from '../../../extensions/forms'
import { defaultBreakpoints } from '../../../shared/MediaQueryUtils'
import { defaultQueries } from '../../../shared/useMedia'
import { SpaceProps } from '../../Space'
import { Card, Section } from '../../lib'
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

export function FlexBookend() {
  const Item = () => (
    <Flex.Stack divider="line-framed" spacing="x-small">
      <TestElement>FlexItem</TestElement>
      <TestElement>FlexItem</TestElement>
    </Flex.Stack>
  )
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

export function CustomSpacing() {
  // return (
  //   <>
  //     <Flex.Container>
  //       <Field.String label="Label" value="Foo" />
  //       <Field.String label="Label" value="Foo" width="medium" />
  //     </Flex.Container>
  //     <Card stack>
  //       <Field.String />
  //       <Field.PhoneNumber />
  //     </Card>
  //   </>
  // )
  // return (
  //   <Section style={{ background: 'lightyellow' }}>
  //     <Flex.Horizontal sizeCount={4}>
  //       <Flex.Item size={2} right={0}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={2}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={2} space={{ left: 'large', right: false }}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={2} right="large">
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //     </Flex.Horizontal>
  //   </Section>
  // )
  // return (
  //   <Flex.Container>
  //     <Field.String label="Label" value="Foo" />
  //     <Field.String label="Label" value="Foo" width="medium" />
  //   </Flex.Container>
  // )

  // const breakpoints = {
  //   ...defaultBreakpoints,
  //   xsmall: '30em',
  // }

  // const queries = {
  //   ...defaultQueries,
  //   xsmall: { min: 0, max: 'xsmall' },
  //   small: { min: 'xsmall', max: 'small' },
  // }

  // const CustomMediaQuery = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   .dnb-flex-container[data-media-key='xsmall']
  //     .dnb-flex-item--responsive {
  //     --size: var(--xsmall);
  //   }
  // `

  // return (
  //   <CustomMediaQuery>
  //     <Flex.Container
  //       direction="horizontal"
  //       sizeCount={4}
  //       breakpoints={breakpoints}
  //       queries={queries}
  //     >
  //       <Flex.Item size={{ small: 2, medium: 3, large: 1 }}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={{ small: 2, medium: 1, large: 2 }}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={{ xsmall: 4, small: 2, medium: 1, large: 1 }}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //       <Flex.Item size={{ xsmall: 4, small: 2, medium: 3, large: 4 }}>
  //         <TestElement>FlexItem</TestElement>
  //       </Flex.Item>
  //     </Flex.Container>
  //   </CustomMediaQuery>
  // )

  return (
    <Flex.Container>
      <Flex.Item size={8}>
        <TestElement>FlexItem (8)</TestElement>
      </Flex.Item>
      <Flex.Item size={4}>
        <TestElement>FlexItem (4)</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          small: 12,
          medium: 4,
        }}
      >
        <TestElement>FlexItem (small: 8, medium: 4)</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          small: 12,
          medium: 8,
        }}
      >
        <TestElement>FlexItem (small: 4, medium: 8)</TestElement>
      </Flex.Item>
    </Flex.Container>
  )

  return (
    <Flex.Container
      direction="horizontal"
      sizeCount={4}
      // breakpoints={breakpoints}
      // queries={queries}
    >
      <Flex.Item
        size={{
          small: 2,
          medium: 3,
          large: 1,
        }}
      >
        <TestElement>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          small: 2,
          medium: 1,
          large: 2,
        }}
      >
        <TestElement>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          // xsmall: 4,
          small: 2,
          medium: 1,
          large: 1,
        }}
      >
        <TestElement>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          // xsmall: 4,
          small: 2,
          medium: 3,
          large: 4,
        }}
      >
        <TestElement>FlexItem</TestElement>
      </Flex.Item>
    </Flex.Container>
  )
  return (
    <Section style={{ background: 'lightyellow' }}>
      <Flex.Horizontal
      // sizeCount={4}
      >
        <Flex.Item
        // size={2}
        >
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item
        // size={2}
        >
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item
        // size={2}
        >
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item
        // size={2}
        >
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Horizontal>
    </Section>
  )
}
