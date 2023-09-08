import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </P>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithParagraphs = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </P>
        <P>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus. Fusce volutpat risus vitae lectus elementum, sed
          facilisis augue dignissim. Donec accumsan, purus commodo bibendum
          finibus, lacus leo lobortis lorem, maximus posuere mi justo et
          ipsum. Phasellus ut nulla eu mi placerat posuere at vel elit.
          Suspendisse facilisis mi eu sem eleifend, eu eleifend nulla
          mattis. Sed iaculis, erat at posuere scelerisque, sapien metus
          ullamcorper tortor, et interdum augue tortor id eros.
        </P>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithMainHeading = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <Layout.MainHeading>Heading</Layout.MainHeading>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus. Aliquam at felis rutrum, luctus dui at,
          bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit risus
          nec enim posuere commodo. Vestibulum tempus suscipit ullamcorper.
          Maecenas ac lobortis nibh, vitae gravida neque. Fusce imperdiet
          rhoncus diam, in tincidunt dolor consectetur ut.
        </P>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCard = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit
            risus nec enim posuere commodo. Vestibulum tempus suscipit
            ullamcorper. Maecenas ac lobortis nibh, vitae gravida neque.
            Fusce imperdiet rhoncus diam, in tincidunt dolor consectetur
            ut.
          </P>
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCardAndHeading = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit
            risus nec enim posuere commodo. Vestibulum tempus suscipit
            ullamcorper. Maecenas ac lobortis nibh, vitae gravida neque.
            Fusce imperdiet rhoncus diam, in tincidunt dolor consectetur
            ut.
          </P>
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const WithCardAndHeadings = () => {
  return (
    <ComponentBox>
      <Layout.Section>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.SubHeading>Sub heading</Layout.SubHeading>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum. Quisque vitae justo magna. Fusce hendrerit
            risus nec enim posuere commodo. Vestibulum tempus suscipit
            ullamcorper. Maecenas ac lobortis nibh, vitae gravida neque.
            Fusce imperdiet rhoncus diam, in tincidunt dolor consectetur
            ut.
          </P>
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}
