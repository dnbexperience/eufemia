/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Provider } from '@dnb/eufemia/src/shared'
import { Flex, InputMasked } from '@dnb/eufemia/src'

// https://github.com/text-mask/text-mask
// How to use masks: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
// import createNumberMask from '@dnb/eufemia/src/components/input-masked/addons/createNumberMask'

export const InputMaskedExampleNumberLocale = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number">
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Flex.Vertical>
          <InputMasked
            label="Number:"
            as_number
            mask_options={{ allowNegative: false }}
            value="1234.50"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Number (decimal limit):"
            as_number
            number_mask={{ decimalLimit: 2 }}
            value="1234.016"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Percentage:"
            as_percent
            number_mask={{ decimalLimit: 1 }}
            value="1234.016"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCurrencyLocale = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency">
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Flex.Vertical>
          <InputMasked
            label="Currency:"
            as_currency="EUR"
            value="1234.50"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <Provider
            locale="en-GB"
            InputMasked={{
              currency_mask: {
                decimalLimit: 3,
              },
            }}
          >
            <InputMasked
              label="Currency:"
              as_currency="USD"
              value="1234.567"
              on_change={({ numberValue }) => {
                console.log(numberValue)
              }}
            />
          </Provider>
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCurrencyMask = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency_mask">
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Flex.Vertical>
          <InputMasked
            label="Left aligned (default):"
            show_mask
            currency_mask="kr"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Right aligned:"
            show_mask
            currency_mask={{ currency: 'NOK' }}
            align="right"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCustomNumberMask = () => (
  <Wrapper>
    <ComponentBox>
      <InputMasked
        label="Masked amount:"
        show_mask
        number_mask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
        placeholder_char={null}
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleNumberMask = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number_mask">
      <InputMasked
        label="Masked input:"
        value="1000000"
        number_mask={{
          suffix: ',-',
          allowDecimal: false,
        }}
        suffix="kr"
        on_change={({ numberValue }) => {
          console.log(parseInt(numberValue || 0, 10))
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePrefix = () => (
  <Wrapper>
    <ComponentBox>
      <InputMasked
        label="Masked input:"
        number_mask={{
          prefix: 'NOK ',
        }}
        stretch={true}
        placeholder="Enter a number"
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePhone = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-phone">
      <InputMasked
        label="Masked input:"
        mask={[
          '0',
          '0',
          /[4]/, // have to start with 4
          /[5-7]/, // can be 5,6 or 7
          ' ',
          /[49]/, // have to start with 4 or 9
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
        ]}
        show_mask
        placeholder_char="_"
        keep_char_positions
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`

export const InputMaskedInfoInputMode = () => (
  <Wrapper>
    <ComponentBox hidePreview hideToolbar>
      <InputMasked mask_options={{ allowNegative: false }} />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedInfoCleanNumberValues = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked as_currency="EUR" value="1234.50" />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedInfoCleanNumberValues2 = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked
        as_currency="EUR"
        value="1234.50"
        on_change={({ numberValue }) => {
          console.log(numberValue) // type of float
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedInfoDecimalsCurrencyProvider = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <Provider
        locale="en-GB"
        InputMasked={{
          currency_mask: {
            decimalLimit: 1, // defaults to 2
          },
        }}
      >
        <InputMasked as_currency="USD" value="1234.567" />
      </Provider>
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedInfoDecimalsNumberProvider = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <Provider
        locale="en-GB"
        InputMasked={{
          number_mask: {
            decimalLimit: 2, // defaults to no decimals
          },
        }}
      >
        <InputMasked as_number value="1234.567" />
      </Provider>
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedInfoRemoveDecimalLimit = () => (
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked
        as_number
        mask_options={{
          allowDecimal: true,
          decimalLimit: null,
        }}
        value="1234.567"
      />
    </ComponentBox>
  </Wrapper>
)
