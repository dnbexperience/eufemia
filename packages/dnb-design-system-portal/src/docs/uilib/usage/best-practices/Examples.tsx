/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  DateFormat,
  Li,
  NumberFormat,
  Table,
  Td,
  Th,
  Tr,
  Ul,
} from '@dnb/eufemia/src'

export const PhoneNumber = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Ul>
      <Li>
        <NumberFormat phone value="99999999" />
      </Li>
    </Ul>
  </ComponentBox>
)

export const BankAccountNumber = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Ul>
      <Li>
        <NumberFormat ban value="12340001358" />
      </Li>
    </Ul>
  </ComponentBox>
)

export const NationalIdentificationNumber = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Ul>
      <Li>
        <NumberFormat nin value="18089212345" />
      </Li>
    </Ul>
  </ComponentBox>
)

export const OrganizationNumber = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Ul>
      <Li>
        <NumberFormat org value="123456789" />
      </Li>
    </Ul>
  </ComponentBox>
)

export const Numbers = () => (
  <ComponentBox hideCode omitWrapper>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Variation</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Default</Td>
            <Td>
              <NumberFormat locale="nb-NO" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat locale="en-GB" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat locale="sv-SE" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat locale="da-DK" value={1234567.89} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>0 decimals</Td>
            <Td>
              <NumberFormat
                locale="nb-NO"
                value={1234567.89}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="en-GB"
                value={1234567.89}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="sv-SE"
                value={1234567.89}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="da-DK"
                value={1234567.89}
                decimals={0}
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>3 decimals</Td>
            <Td>
              <NumberFormat
                locale="nb-NO"
                value={1234567.89}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="en-GB"
                value={1234567.89}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="sv-SE"
                value={1234567.89}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="da-DK"
                value={1234567.89}
                decimals={3}
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const NumbersCompact = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <NumberFormat
                locale="nb-NO"
                compact
                decimals={1}
                value={123456}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="en-GB"
                compact
                decimals={1}
                value={123456}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="sv-SE"
                compact
                decimals={1}
                value={123456}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="da-DK"
                compact
                decimals={1}
                value={123456}
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <NumberFormat
                locale="nb-NO"
                compact="long"
                decimals={2}
                value={1234567.89}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="en-GB"
                compact="long"
                decimals={2}
                value={1234567.89}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="sv-SE"
                compact="long"
                decimals={2}
                value={1234567.89}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="da-DK"
                compact="long"
                decimals={2}
                value={1234567.89}
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const Percentage = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Default</Td>
            <Td>
              <NumberFormat locale="nb-NO" percent value={12.34} />
            </Td>
            <Td>
              <NumberFormat locale="en-GB" percent value={12.34} />
            </Td>
            <Td>
              <NumberFormat locale="sv-SE" percent value={12.34} />
            </Td>
            <Td>
              <NumberFormat locale="da-DK" percent value={12.34} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>3 decimals</Td>
            <Td>
              <NumberFormat
                locale="nb-NO"
                percent
                decimals={3}
                value={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="en-GB"
                percent
                decimals={3}
                value={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="sv-SE"
                percent
                decimals={3}
                value={3}
              />
            </Td>
            <Td>
              <NumberFormat
                locale="da-DK"
                percent
                decimals={3}
                value={3}
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const AmountAndCurrency = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Variation</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Default</Td>
            <Td>
              <NumberFormat currency locale="nb-NO" value={-1358} />
            </Td>
            <Td>
              <NumberFormat currency locale="en-GB" value={-1358} />
            </Td>
            <Td>
              <NumberFormat currency locale="sv-SE" value={-1358} />
            </Td>
            <Td>
              <NumberFormat currency locale="da-DK" value={-1358} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Symbol display</Td>
            <Td>
              <NumberFormat
                currency
                locale="nb-NO"
                value={-1358}
                currency_display="symbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="en-GB"
                value={-1358}
                currency_display="symbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="sv-SE"
                value={-1358}
                currency_display="symbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="da-DK"
                value={-1358}
                currency_display="symbol"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Narrow symbol display</Td>
            <Td>
              <NumberFormat
                currency="EUR"
                locale="nb-NO"
                value={-1358}
                currency_display="narrowSymbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency="EUR"
                locale="en-GB"
                value={-1358}
                currency_display="narrowSymbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency="EUR"
                locale="sv-SE"
                value={-1358}
                currency_display="narrowSymbol"
              />
            </Td>
            <Td>
              <NumberFormat
                currency="EUR"
                locale="da-DK"
                value={-1358}
                currency_display="narrowSymbol"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Name display</Td>
            <Td>
              <NumberFormat
                currency
                locale="nb-NO"
                value={-1358}
                currency_display="name"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="en-GB"
                value={-1358}
                currency_display="name"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="sv-SE"
                value={-1358}
                currency_display="name"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="da-DK"
                value={-1358}
                currency_display="name"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Code display</Td>
            <Td>
              <NumberFormat
                currency
                locale="nb-NO"
                value={-1358}
                currency_display="code"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="en-GB"
                value={-1358}
                currency_display="code"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="sv-SE"
                value={-1358}
                currency_display="code"
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="da-DK"
                value={-1358}
                currency_display="code"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>0 decimals</Td>
            <Td>
              <NumberFormat
                currency
                locale="nb-NO"
                value={-1358}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="en-GB"
                value={-1358}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="sv-SE"
                value={-1358}
                decimals={0}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="da-DK"
                value={-1358}
                decimals={0}
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>3 decimals</Td>
            <Td>
              <NumberFormat
                currency
                locale="nb-NO"
                value={-1358}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="en-GB"
                value={-1358}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="sv-SE"
                value={-1358}
                decimals={3}
              />
            </Td>
            <Td>
              <NumberFormat
                currency
                locale="da-DK"
                value={-1358}
                decimals={3}
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const DateStyles = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Full</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="full"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="full"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="full"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="full"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="long"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="long"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="long"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="long"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="medium"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="medium"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="medium"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="medium"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="short"
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const DateAndTime = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Full</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const DateWithoutYear = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Full</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="full"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="full"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="full"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="full"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="long"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="long"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="long"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="long"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="medium"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="medium"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="medium"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="medium"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30"
                dateStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30"
                dateStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30"
                dateStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30"
                dateStyle="short"
                hideYear
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const DateWithoutYearAndTime = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Style</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Full</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="full"
                timeStyle="short"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="long"
                timeStyle="short"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="medium"
                timeStyle="short"
                hideYear
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
                hideYear
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                value="2026-01-30T09:12"
                dateStyle="short"
                timeStyle="short"
                hideYear
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const RelativeTime = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Description</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>Just now</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:59:30Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:59:30Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:59:30Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:59:30Z"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>In the past</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T11:00:00Z"
              />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>In the future</Td>
            <Td>
              <DateFormat
                locale="nb-NO"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T15:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="en-GB"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T15:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="sv-SE"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T15:00:00Z"
              />
            </Td>
            <Td>
              <DateFormat
                locale="da-DK"
                relativeTime
                relativeTimeReference={() =>
                  new Date('2026-02-06T12:00:00Z')
                }
                value="2026-02-06T15:00:00Z"
              />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const DurationStrings = () => (
  <ComponentBox hideCode omitWrapper scope={{ Table }}>
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr noWrap>
            <Th>Duration</Th>
            <Th>nb-NO</Th>
            <Th>en-GB</Th>
            <Th>sv-SE</Th>
            <Th>da-DK</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr noWrap>
            <Td>PT2H30M</Td>
            <Td>
              <DateFormat locale="nb-NO" value="PT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="PT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="PT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="PT2H30M" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>P1DT2H30M</Td>
            <Td>
              <DateFormat locale="nb-NO" value="P1DT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="P1DT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="P1DT2H30M" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="P1DT2H30M" />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)
