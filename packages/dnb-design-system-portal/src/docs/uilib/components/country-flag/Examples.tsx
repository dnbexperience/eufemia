/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { CountryFlag, Flex } from '@dnb/eufemia/src'
import {
  Field,
  FieldBlock,
  Form,
  useValueProps,
} from '@dnb/eufemia/src/extensions/forms'

// Import the flag-icons CSS
import '@dnb/eufemia/src/components/country-flag/style/dnb-country-flag-icons.scss'

export const AllSizes = () => (
  <ComponentBox data-visual-test="country-flag-sizes">
    <Flex.Horizontal align="center">
      <CountryFlag iso="NO" size="x-small" />
      <CountryFlag iso="NO" size="small" />
      <CountryFlag iso="NO" size="medium" />
      <CountryFlag iso="NO" size="large" />
      <CountryFlag iso="NO" size="x-large" />
    </Flex.Horizontal>
  </ComponentBox>
)

export const Square = () => (
  <ComponentBox data-visual-test="country-flag-shape">
    <CountryFlag iso="CH" shape="square" />
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
            <CountryFlag iso={iso} />
          </FieldBlock>
        )
      }

      return (
        <Form.Handler>
          <Flex.Horizontal>
            <Field.SelectCountry
              label="Select a country"
              path="/country"
              width="medium"
              value="SE"
            />
            <MyComponent label="Country" path="/country" />
          </Flex.Horizontal>
        </Form.Handler>
      )
    }}
  </ComponentBox>
)
