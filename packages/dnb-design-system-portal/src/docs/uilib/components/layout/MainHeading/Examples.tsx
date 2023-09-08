import { Layout } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
    </ComponentBox>
  )
}

export const OverSection = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.Section>Section contents</Layout.Section>
    </ComponentBox>
  )
}

export const OverSectionWithCard = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.Section>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}
