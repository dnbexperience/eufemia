/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Button,
  CountryFlag,
  Dropdown,
  Flex,
  Heading,
  Icon,
  Input,
  P,
} from '@dnb/eufemia/src'
import {
  Field,
  FieldBlock,
  Form,
  useValueProps,
} from '@dnb/eufemia/src/extensions/forms'

// Import the flag icons styles
import '@dnb/eufemia/src/components/country-flag/style/dnb-country-flag-icons.scss'

export const AllSizes = () => (
  <ComponentBox data-visual-test="country-flag-sizes">
    <Flex.Horizontal align="center">
      <CountryFlag iso="NO" size="auto" />
      <CountryFlag iso="NO" size="small" />
      <CountryFlag iso="NO" size="medium" />
      <CountryFlag iso="NO" size="large" />
      <CountryFlag iso="NO" size="x-large" />
    </Flex.Horizontal>
  </ComponentBox>
)

export const Square = () => (
  <ComponentBox data-visual-test="country-flag-shape">
    <CountryFlag iso="CH" shape="square" size="large" />
  </ComponentBox>
)

export const Forms = () => (
  <ComponentBox scope={{ useValueProps }}>
    {() => {
      const MyComponent = ({ label, ...props }) => {
        const { value } = useValueProps(props)
        const iso = String(value)
        return (
          <FieldBlock label={label}>
            <CountryFlag iso={iso} size="medium" />
          </FieldBlock>
        )
      }

      return (
        <Form.Handler>
          <Field.Composition>
            <Field.SelectCountry
              label="Select a country"
              path="/country"
              width="medium"
              value="SE"
            />
            <MyComponent label="Country flag" path="/country" />
          </Field.Composition>
        </Form.Handler>
      )
    }}
  </ComponentBox>
)

export const InComponents = () => (
  <ComponentBox hideCode data-visual-test="country-flag-in-components">
    <Flex.Vertical gap="x-small">
      <Button icon={<CountryFlag iso="NO" />} title="Icon button" />
      <Button
        icon={<CountryFlag iso="NO" />}
        title="Icon button"
        size="large"
      />
      <Button
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        text="Button"
        variant="secondary"
      />
      <Button
        icon={<CountryFlag iso="NO" />}
        icon_size="medium"
        icon_position="left"
        size="large"
        text="Button"
        variant="secondary"
      />
      <Input
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        placeholder="Write something"
      />
      <Input
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        size="large"
        placeholder="Write something"
      />
      <Dropdown
        value="NO"
        icon_position="left"
        data={{
          NO: (
            <Dropdown.HorizontalItem>
              <CountryFlag iso="NO" />
              {' '}Norway
            </Dropdown.HorizontalItem>
          ),
          SE: (
            <Dropdown.HorizontalItem>
              <CountryFlag iso="SE" />
              {' '}Sweden
            </Dropdown.HorizontalItem>
          ),
        }}
      />
      <Dropdown icon={<CountryFlag iso="NO" />} size="large" />

      <Flex.Horizontal align="center" gap="x-small">
        In Icon component:
        <Icon icon={<CountryFlag iso="NO" />} />
        <Icon icon={<CountryFlag iso="NO" />} size="medium" />
      </Flex.Horizontal>

      <Flex.Vertical>
        <Heading level="1">
          H1 heading <CountryFlag iso="NO" />
        </Heading>
        <Heading level="2">
          H2 heading <CountryFlag iso="NO" />
        </Heading>
        <Heading level="3">
          H3 heading <CountryFlag iso="NO" />
        </Heading>
        <P style={{ maxWidth: '20rem' }}>
          <CountryFlag iso="NO" /> Paragraph Eiusmod id cillum Lorem nulla
          non consectetur pariatur mollit Lorem non do nulla reprehenderit
          {' '}
          <CountryFlag iso="NO" />
        </P>
      </Flex.Vertical>
    </Flex.Vertical>
  </ComponentBox>
)
