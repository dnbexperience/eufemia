import type { ReactNode } from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Card, Flex, H2, HeightAnimation } from '@dnb/eufemia/src'
import AriaLive from '@dnb/eufemia/src/components/aria-live/AriaLive'
import { TestElement, Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFieldString = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-field"
    >
      <Flex.Container>
        <Field.String label="Label" value="Foo" width="medium" />
        <Field.String label="Label" value="Foo" width="small" />
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItemJustifyCenter = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container justify="center">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItemJustifyFlexEnd = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container justify="flex-end">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItemAlignCenter = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container align="center">
        <Flex.Item>
          <TestElement style={{ height: '4rem' }}>Tall</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Short</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement style={{ height: '6rem' }}>Taller</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Short</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithFlexItemAlignCenter = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container direction="vertical" align="center">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Wider FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container direction="vertical">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container direction="vertical">
        <Card>Card contents</Card>
        <Card>Card contents</Card>
        <Card>Card contents</Card>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalLineDivider = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-divider"
    >
      <Flex.Container
        direction="vertical"
        divider="line"
        alignSelf="stretch"
      >
        <TestElement>FlexItem</TestElement>
        <TestElement>FlexItem</TestElement>
        <TestElement>FlexItem</TestElement>
      </Flex.Container>
    </ComponentBox>
  )
}

export const LayoutHorizontalFlexGrowItems = () => {
  return (
    <ComponentBox>
      <Flex.Horizontal>
        <Flex.Item span={3}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item span={4}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item span={5}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
      </Flex.Horizontal>
    </ComponentBox>
  )
}

export const WrappedWithChildren = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-with-children"
    >
      {() => {
        const Wrapper = Flex.withChildren(({ children }) => {
          return <div>{children}</div>
        })

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
      }}
    </ComponentBox>
  )
}

const CssAdditiveSpacingGeometry = () => {
  return (
    <Flex.Vertical
      data-visual-test="flex-container-css-additive-spacing"
      layoutEngine="css"
      gap="small"
    >
      <Flex.Item>Default gap</Flex.Item>
      <Flex.Item gapBefore="small" top="large">
        Large start
      </Flex.Item>
      <Flex.Item gapBefore="small" top="x-small">
        Small start
      </Flex.Item>
      <Flex.Item gapBefore="small" top="medium">
        Medium start
      </Flex.Item>
    </Flex.Vertical>
  )
}

const CssPairwiseSpacingContract = () => {
  const getItems = (direction: 'horizontal' | 'vertical') => {
    const isHorizontal = direction === 'horizontal'

    return (
      <>
        <Flex.Item
          {...(isHorizontal
            ? { left: 'large', right: 'large' }
            : { top: 'large', bottom: 'large' })}
        >
          First
        </Flex.Item>
        <Flex.Item
          {...(isHorizontal ? { right: 'medium' } : { bottom: 'medium' })}
        >
          Second
        </Flex.Item>
        <Flex.Item
          {...(isHorizontal ? { left: 'x-small' } : { top: 'x-small' })}
        >
          Third
        </Flex.Item>
        <Flex.Item
          {...(isHorizontal ? { left: 'medium' } : { top: 'medium' })}
        >
          Fourth
        </Flex.Item>
        <Flex.Item
          {...(isHorizontal
            ? { right: 'x-large' }
            : { bottom: 'x-large' })}
        >
          Last
        </Flex.Item>
      </>
    )
  }

  return (
    <div
      data-visual-test="flex-container-css-pairwise-spacing"
      style={{ display: 'grid', gap: '2rem' }}
    >
      <Flex.Horizontal
        layoutEngine="css"
        gap="small"
        wrap={false}
        style={{ width: 'fit-content' }}
      >
        {getItems('horizontal')}
      </Flex.Horizontal>
      <Flex.Vertical
        layoutEngine="css"
        gap="small"
        style={{ width: 'fit-content' }}
      >
        {getItems('vertical')}
      </Flex.Vertical>
    </div>
  )
}

const CssDividerParity = () => {
  const legacyItems = (
    <>
      <Flex.Item>First</Flex.Item>
      <Flex.Item>Second</Flex.Item>
      <H2>Heading</H2>
      <Flex.Item>After heading</Flex.Item>
      <Flex.Item>Last</Flex.Item>
    </>
  )
  const cssItems = (
    <>
      <Flex.Item>First</Flex.Item>
      <Flex.Item>Second</Flex.Item>
      <H2>Heading</H2>
      <Flex.Item>After heading</Flex.Item>
      <Flex.Item>Last</Flex.Item>
    </>
  )

  return (
    <div
      data-visual-test="flex-container-css-divider-parity"
      data-css-divider-parity
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '2rem',
      }}
    >
      <Flex.Vertical divider="line">{legacyItems}</Flex.Vertical>
      <Flex.Vertical layoutEngine="css" divider="line">
        {cssItems}
      </Flex.Vertical>
    </div>
  )
}

const CssHorizontalDividerAlignment = () => {
  const cases = [
    { align: 'center', label: 'Center', expectedDividers: 2 },
    { align: 'flex-end', label: 'End', expectedDividers: 2 },
    { align: 'baseline', label: 'Baseline', expectedDividers: 2 },
  ] as const

  return (
    <div
      data-visual-test="flex-container-css-horizontal-divider-alignment"
      style={{ display: 'grid', gap: '1rem' }}
    >
      {cases.map(({ align, label, expectedDividers }) => (
        <Flex.Horizontal
          key={align}
          data-expected-dividers={expectedDividers}
          layoutEngine="css"
          divider="line"
          align={align}
          wrap={false}
        >
          <Flex.Item style={{ height: '4rem' }}>{label} tall</Flex.Item>
          <Flex.Item>{label} short</Flex.Item>
          <Flex.Item style={{ fontSize: '2rem' }}>Large text</Flex.Item>
        </Flex.Horizontal>
      ))}

      <Flex.Horizontal
        data-expected-dividers="2"
        layoutEngine="css"
        divider="line"
        align="flex-start"
        wrap={false}
      >
        <Flex.Item>Start</Flex.Item>
        <Flex.Item alignSelf="center" style={{ height: '3rem' }}>
          Self center
        </Flex.Item>
        <Flex.Item alignSelf="flex-end">Self end</Flex.Item>
      </Flex.Horizontal>

      <Flex.Horizontal
        data-expected-dividers="2"
        layoutEngine="css"
        divider="line"
        style={{ width: '10rem' }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Flex.Item key={item} style={{ flex: '0 0 4rem' }}>
            Wrapped {item}
          </Flex.Item>
        ))}
      </Flex.Horizontal>

      <Flex.Horizontal
        data-expected-dividers="2"
        layoutEngine="css"
        divider="line"
        align="center"
        wrap={false}
        dir="rtl"
      >
        <Flex.Item style={{ height: '4rem' }}>RTL tall</Flex.Item>
        <Flex.Item>RTL short</Flex.Item>
        <Flex.Item>RTL last</Flex.Item>
      </Flex.Horizontal>
    </div>
  )
}

const CssSpanGeometry = () => {
  return (
    <Flex.Horizontal
      data-visual-test="flex-container-css-span-geometry"
      layoutEngine="css"
      gap="small"
    >
      <Flex.Item span={{ small: 12, medium: 6, large: 6 }}>
        First
      </Flex.Item>
      <Flex.Item span={{ small: 12, medium: 6, large: 6 }}>
        Second
      </Flex.Item>
    </Flex.Horizontal>
  )
}

const CssHiddenGapGeometry = () => {
  return (
    <Flex.Vertical
      data-visual-test="flex-container-css-hidden-gap-geometry"
      layoutEngine="css"
      gap="small"
    >
      <Flex.Item>First</Flex.Item>
      <span hidden>Hidden span</span>
      <HeightAnimation animate={false} keepInDOM open={false}>
        Hidden animation
      </HeightAnimation>
      <Flex.Item>Last</Flex.Item>
    </Flex.Vertical>
  )
}

const CssWrapperGeometry = () => {
  const Wrapper = Flex.withChildren(
    ({ children }: { children?: ReactNode }) => (
      <section className="css-wrapper-geometry__custom">
        {children}
      </section>
    )
  )
  const items = (
    <>
      <Flex.Item>First</Flex.Item>
      <Flex.Item>Second</Flex.Item>
    </>
  )

  return (
    <Flex.Vertical
      data-visual-test="flex-container-css-wrapper-geometry"
      layoutEngine="css"
      gap="medium"
    >
      <HeightAnimation animate={false}>{items}</HeightAnimation>
      <AriaLive variant="content">{items}</AriaLive>
      <Wrapper>{items}</Wrapper>
    </Flex.Vertical>
  )
}

const CssItemGapOverrideGeometry = () => {
  return (
    <div
      data-visual-test="flex-item-gap-override-geometry"
      style={{ display: 'grid', gap: '2rem' }}
    >
      <Flex.Horizontal layoutEngine="css" gap="small" wrap={false}>
        <Flex.Item gapAfter="large" right="x-small">
          Horizontal 1
        </Flex.Item>
        <Flex.Item gapAfter="xx-large">Horizontal 2</Flex.Item>
        <Flex.Item gapBefore="x-small">Horizontal 3</Flex.Item>
        <Flex.Item gapBefore={false} left="medium">
          Horizontal 4
        </Flex.Item>
        <Flex.Item>Horizontal 5</Flex.Item>
      </Flex.Horizontal>

      <Flex.Vertical layoutEngine="css" gap="small">
        <Flex.Item gapAfter="large" bottom="x-small">
          Vertical 1
        </Flex.Item>
        <Flex.Item gapAfter="xx-large">Vertical 2</Flex.Item>
        <Flex.Item gapBefore="x-small">Vertical 3</Flex.Item>
        <Flex.Item gapBefore={false} top="medium">
          Vertical 4
        </Flex.Item>
        <Flex.Item>Vertical 5</Flex.Item>
      </Flex.Vertical>
    </div>
  )
}

export const CssMigrationFixtures = () => {
  return (
    <div className="dnb-no-focus">
      <CssAdditiveSpacingGeometry />
      <CssPairwiseSpacingContract />
      <CssDividerParity />
      <CssHorizontalDividerAlignment />
      <CssSpanGeometry />
      <CssHiddenGapGeometry />
      <CssWrapperGeometry />
      <CssItemGapOverrideGeometry />
    </div>
  )
}

export const FramedLineDividers = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-line-framed"
      background="plain" // will be enabled in related PR
    >
      {() => {
        const Item = () => (
          <Flex.Stack divider="line-framed" gap="x-small">
            <TestElement>FlexItem</TestElement>
            <TestElement>FlexItem</TestElement>
          </Flex.Stack>
        )

        return (
          <Flex.Horizontal rowGap={false}>
            <Item />
            <Item />
            <Item />
          </Flex.Horizontal>
        )
      }}
    </ComponentBox>
  )
}
