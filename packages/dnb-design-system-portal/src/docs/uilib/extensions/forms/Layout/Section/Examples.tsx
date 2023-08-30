import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum. Vivamus tincidunt eleifend tellus
        at tempus. Aliquam at felis rutrum, luctus dui at, bibendum ipsum.
        Quisque vitae justo magna. Fusce hendrerit risus nec enim posuere
        commodo. Vestibulum tempus suscipit ullamcorper. Maecenas ac
        lobortis nibh, vitae gravida neque. Fusce imperdiet rhoncus diam,
        in tincidunt dolor consectetur ut.
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithParagraphs = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </p>
        <p>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus. Fusce volutpat risus vitae lectus elementum, sed
          facilisis augue dignissim. Donec accumsan, purus commodo bibendum
          finibus, lacus leo lobortis lorem, maximus posuere mi justo et
          ipsum. Phasellus ut nulla eu mi placerat posuere at vel elit.
          Suspendisse facilisis mi eu sem eleifend, eu eleifend nulla
          mattis. Sed iaculis, erat at posuere scelerisque, sapien metus
          ullamcorper tortor, et interdum augue tortor id eros.
        </p>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithMainHeading = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        <Layout.MainHeading>Heading</Layout.MainHeading>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum. Vivamus tincidunt eleifend tellus
        at tempus. Aliquam at felis rutrum, luctus dui at, bibendum ipsum.
        Quisque vitae justo magna. Fusce hendrerit risus nec enim posuere
        commodo. Vestibulum tempus suscipit ullamcorper. Maecenas ac
        lobortis nibh, vitae gravida neque. Fusce imperdiet rhoncus diam,
        in tincidunt dolor consectetur ut.
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCard = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        <Layout.Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCardAndHeading = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCardAndHeadings = () => {
  return (
    <ComponentBox scope={{ Layout }}>
      <Layout.Section>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.SubHeading>Sub heading</Layout.SubHeading>
        <Layout.Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}
