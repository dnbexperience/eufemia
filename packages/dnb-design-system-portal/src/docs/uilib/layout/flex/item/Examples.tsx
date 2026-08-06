import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import {
  HorizontalFlexItemResponsiveSize,
  HorizontalFlexItemResponsiveSizeCustomColumns,
} from '../../Examples'

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
      </Flex.Container>
    </ComponentBox>
  )
}

export const BasicSize = () => {
  return (
    <ComponentBox>
      <Flex.Container>
        <Flex.Item span={6}>uses 50% in width</Flex.Item>
        <Flex.Item span={6}>uses 50% in width</Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const ResponsiveSize = () => {
  return (
    <ComponentBox hidePreview>
      <Flex.Container>
        <Flex.Item span={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Flex.Item>
        <Flex.Item span={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const GapOverrides = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Horizontal gap="small" wrap={false}>
        <Flex.Item>
          <TestElement>Default gap</TestElement>
        </Flex.Item>
        <Flex.Item gapBefore="large">
          <TestElement>Large gap before</TestElement>
        </Flex.Item>
        <Flex.Item gapAfter="xx-large">
          <TestElement>Large gap after</TestElement>
        </Flex.Item>
        <Flex.Item gapBefore="x-small">
          <TestElement>Small gap before wins</TestElement>
        </Flex.Item>
        <Flex.Item gapBefore={false} left="medium">
          <TestElement>No gap plus medium margin</TestElement>
        </Flex.Item>
      </Flex.Horizontal>
    </ComponentBox>
  )
}

export const BasicSizeExample = HorizontalFlexItemResponsiveSize
export const AdvancedSizeExample =
  HorizontalFlexItemResponsiveSizeCustomColumns
