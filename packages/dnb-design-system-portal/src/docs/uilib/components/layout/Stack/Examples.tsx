import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus.
        </P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithParagraphs = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus.
        </P>
        <P>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus. Fusce volutpat risus vitae lectus elementum, sed
          facilisis augue dignissim. Donec accumsan, purus commodo bibendum
          finibus, lacus leo lobortis lorem, maximus posuere mi justo et
          ipsum.
        </P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithMainHeading = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <Layout.MainHeading>Heading</Layout.MainHeading>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus.
        </P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithCard = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeading = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeadings = () => {
  return (
    <ComponentBox>
      <Layout.Stack>
        <Layout.MainHeading>Main heading</Layout.MainHeading>
        <Layout.SubHeading>Sub heading</Layout.SubHeading>
        <Layout.Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox>
      <Layout.Stack aria-labelledby="unique-id">
        <Layout.MainHeading id="unique-id">
          Main heading
        </Layout.MainHeading>
        <Layout.Card>
          <P>Content inside a landmark ...</P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}
