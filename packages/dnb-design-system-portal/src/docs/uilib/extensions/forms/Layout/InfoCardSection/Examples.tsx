import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Layout,
  TestElement,
  DataInput,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.InfoCardSection text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean magna arcu, consequat in arcu a, luctus ornare massa." />
    </ComponentBox>
  )
}
