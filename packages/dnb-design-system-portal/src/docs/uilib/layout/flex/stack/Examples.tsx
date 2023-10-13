import { Form } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus.
        </P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithParagraphs = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
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
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithMainHeading = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Flex.Stack>
        <Form.MainHeading>Heading</Form.MainHeading>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
          tellus at tempus.
        </P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCard = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
        <Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeading = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeadings = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Form.SubHeading>Sub heading</Form.SubHeading>
        <Card>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            cursus pharetra elit in bibendum. Vivamus tincidunt eleifend
            tellus at tempus. Aliquam at felis rutrum, luctus dui at,
            bibendum ipsum.
          </P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox hidePreview scope={{ Form }}>
      <Flex.Stack aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
        <Card>
          <P>Content inside a landmark ...</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
