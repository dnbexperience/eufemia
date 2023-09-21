import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'

export const TextOnly = () => {
  return (
    <ComponentBox>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
    </ComponentBox>
  )
}

export const BelowMainHeading = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-below-main">
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
    </ComponentBox>
  )
}

export const OverStack = () => {
  return (
    <ComponentBox>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
      <Layout.Stack>
        <P>Stack contents</P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const InsideCard = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-inside-card">
      <Layout.Card>
        <Layout.Stack>
          <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
          <P>Card contents</P>
        </Layout.Stack>
      </Layout.Card>
    </ComponentBox>
  )
}

export const OverStackWithCard = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-over-card">
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
      <Layout.Stack>
        <Layout.Card>
          <P>Card contents</P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const TwoSubHeadings = () => {
  return (
    <ComponentBox>
      <Layout.SubHeading>This is sub heading 1</Layout.SubHeading>
      <Layout.SubHeading>This is sub heading 2</Layout.SubHeading>
      Other contents
    </ComponentBox>
  )
}
