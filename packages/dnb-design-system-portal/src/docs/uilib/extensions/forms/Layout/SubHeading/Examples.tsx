import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src/extensions/forms'

export const TextOnly = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
    </ComponentBox>
  )
}

export const BelowMainHeading = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
    </ComponentBox>
  )
}

export const OverSection = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
      <Layout.Section>Section contents</Layout.Section>
    </ComponentBox>
  )
}

export const OverSectionWithCard = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.SubHeading>This is a sub heading</Layout.SubHeading>
      <Layout.Section>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const TwoSubHeadings = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.SubHeading>This is sub heading 1</Layout.SubHeading>
      <Layout.SubHeading>This is sub heading 2</Layout.SubHeading>
      Other contents
    </ComponentBox>
  )
}
