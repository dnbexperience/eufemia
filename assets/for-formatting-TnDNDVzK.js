import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{et as r}from"./Anchor-Djq5YQEM.js";import{i}from"./HelpButton-C7xeEDxM.js";import{n as a,t as o}from"./Ul-jQpCBea0.js";import{n as s,r as c,t as l}from"./Tr-BKjgVrf0.js";import{t as u}from"./DateFormat-D6Mk1ut1.js";import{t as d}from"./NumberFormatExport-VkMzyyld.js";import{K as f,v as p}from"./index-ppRu2ktv.js";import{t as m}from"./ComponentBox-R2c6Bo76.js";var h=e({AmountAndCurrency:()=>w,BankAccountNumber:()=>v,DateAndTime:()=>E,DateStyles:()=>T,DateWithoutYear:()=>D,DateWithoutYearAndTime:()=>O,DurationStrings:()=>A,NationalIdentificationNumber:()=>y,Numbers:()=>x,NumbersCompact:()=>S,OrganizationNumber:()=>b,Percentage:()=>C,PhoneNumber:()=>_,RelativeTime:()=>k}),g=t(n()),_=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`PhoneNumber`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Ul:o,Li:a,NumberFormat:d},children:`<Ul>
  <Li>
    <NumberFormat.PhoneNumber value="99999999" />
  </Li>
  <Li>
    <NumberFormat.PhoneNumber value="+4799999999" />
  </Li>
</Ul>
`}),v=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`BankAccountNumber`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Ul:o,Li:a,NumberFormat:d},children:`<Ul>
  <Li>
    <NumberFormat.BankAccountNumber value="12340001358" />
  </Li>
</Ul>
`}),y=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`NationalIdentificationNumber`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Ul:o,Li:a,NumberFormat:d},children:`<Ul>
  <Li>
    <NumberFormat.NationalIdentityNumber value="18089212345" />
  </Li>
</Ul>
`}),b=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`OrganizationNumber`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Ul:o,Li:a,NumberFormat:d},children:`<Ul>
  <Li>
    <NumberFormat.OrganizationNumber value="123456789" />
  </Li>
</Ul>
`}),x=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,stableName:`Numbers`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,NumberFormat:d},children:`<Table.ScrollView>
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
          <NumberFormat.Number locale="nb-NO" value={1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="en-GB" value={1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="sv-SE" value={1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="da-DK" value={1234567.89} />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>0 decimals</Td>
        <Td>
          <NumberFormat.Number
            locale="nb-NO"
            value={1234567.89}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="en-GB"
            value={1234567.89}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="sv-SE"
            value={1234567.89}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="da-DK"
            value={1234567.89}
            decimals={0}
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>3 decimals</Td>
        <Td>
          <NumberFormat.Number
            locale="nb-NO"
            value={1234567.89}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="en-GB"
            value={1234567.89}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="sv-SE"
            value={1234567.89}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="da-DK"
            value={1234567.89}
            decimals={3}
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Negative value</Td>
        <Td>
          <NumberFormat.Number locale="nb-NO" value={-1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="en-GB" value={-1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="sv-SE" value={-1234567.89} />
        </Td>
        <Td>
          <NumberFormat.Number locale="da-DK" value={-1234567.89} />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Sign display (except zero)</Td>
        <Td>
          <NumberFormat.Number
            locale="nb-NO"
            signDisplay="exceptZero"
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="en-GB"
            signDisplay="exceptZero"
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="sv-SE"
            signDisplay="exceptZero"
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="da-DK"
            signDisplay="exceptZero"
            value={1234567.89}
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Invalid input</Td>
        <Td>
          <NumberFormat.Number locale="nb-NO">invalid</NumberFormat.Number>
        </Td>
        <Td>
          <NumberFormat.Number locale="en-GB">invalid</NumberFormat.Number>
        </Td>
        <Td>
          <NumberFormat.Number locale="sv-SE">invalid</NumberFormat.Number>
        </Td>
        <Td>
          <NumberFormat.Number locale="da-DK">invalid</NumberFormat.Number>
        </Td>
      </Tr>
    </tbody>
  </Table>
</Table.ScrollView>
`}),S=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`NumbersCompact`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,NumberFormat:d},children:`<Table.ScrollView>
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
          <NumberFormat.Number
            compact
            locale="nb-NO"
            decimals={1}
            value={123456}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            compact
            locale="en-GB"
            decimals={1}
            value={123456}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            compact
            locale="sv-SE"
            decimals={1}
            value={123456}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            compact
            locale="da-DK"
            decimals={1}
            value={123456}
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Long</Td>
        <Td>
          <NumberFormat.Number
            locale="nb-NO"
            compact="long"
            decimals={2}
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="en-GB"
            compact="long"
            decimals={2}
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
            locale="sv-SE"
            compact="long"
            decimals={2}
            value={1234567.89}
          />
        </Td>
        <Td>
          <NumberFormat.Number
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
`}),C=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`Percentage`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,NumberFormat:d},children:`<Table.ScrollView>
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
          <NumberFormat.Percent locale="nb-NO" value={12.34} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="en-GB" value={12.34} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="sv-SE" value={12.34} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="da-DK" value={12.34} />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>3 decimals</Td>
        <Td>
          <NumberFormat.Percent locale="nb-NO" decimals={3} value={3} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="en-GB" decimals={3} value={3} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="sv-SE" decimals={3} value={3} />
        </Td>
        <Td>
          <NumberFormat.Percent locale="da-DK" decimals={3} value={3} />
        </Td>
      </Tr>
    </tbody>
  </Table>
</Table.ScrollView>
`}),w=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`AmountAndCurrency`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,NumberFormat:d,Code:r},children:`<Table.ScrollView>
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
          <NumberFormat.Currency locale="nb-NO" value={-1358} />
        </Td>
        <Td>
          <NumberFormat.Currency locale="en-GB" value={-1358} />
        </Td>
        <Td>
          <NumberFormat.Currency locale="sv-SE" value={-1358} />
        </Td>
        <Td>
          <NumberFormat.Currency locale="da-DK" value={-1358} />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Symbol display</Td>
        <Td>
          <NumberFormat.Currency
            locale="nb-NO"
            value={-1358}
            currencyDisplay="symbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="en-GB"
            value={-1358}
            currencyDisplay="symbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="sv-SE"
            value={-1358}
            currencyDisplay="symbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="da-DK"
            value={-1358}
            currencyDisplay="symbol"
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Narrow symbol display</Td>
        <Td>
          <NumberFormat.Currency
            currency="EUR"
            locale="nb-NO"
            value={-1358}
            currencyDisplay="narrowSymbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            currency="EUR"
            locale="en-GB"
            value={-1358}
            currencyDisplay="narrowSymbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            currency="EUR"
            locale="sv-SE"
            value={-1358}
            currencyDisplay="narrowSymbol"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            currency="EUR"
            locale="da-DK"
            value={-1358}
            currencyDisplay="narrowSymbol"
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Name display</Td>
        <Td>
          <NumberFormat.Currency
            locale="nb-NO"
            value={-1358}
            currencyDisplay="name"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="en-GB"
            value={-1358}
            currencyDisplay="name"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="sv-SE"
            value={-1358}
            currencyDisplay="name"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="da-DK"
            value={-1358}
            currencyDisplay="name"
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Code display</Td>
        <Td>
          <NumberFormat.Currency
            locale="nb-NO"
            value={-1358}
            currencyDisplay="code"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="en-GB"
            value={-1358}
            currencyDisplay="code"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="sv-SE"
            value={-1358}
            currencyDisplay="code"
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="da-DK"
            value={-1358}
            currencyDisplay="code"
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>0 decimals</Td>
        <Td>
          <NumberFormat.Currency
            locale="nb-NO"
            value={-1358}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="en-GB"
            value={-1358}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="sv-SE"
            value={-1358}
            decimals={0}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="da-DK"
            value={-1358}
            decimals={0}
          />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>3 decimals</Td>
        <Td>
          <NumberFormat.Currency
            locale="nb-NO"
            value={-1358}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="en-GB"
            value={-1358}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="sv-SE"
            value={-1358}
            decimals={3}
          />
        </Td>
        <Td>
          <NumberFormat.Currency
            locale="da-DK"
            value={-1358}
            decimals={3}
          />
        </Td>
      </Tr>
    </tbody>
  </Table>
</Table.ScrollView>
`}),T=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`DateStyles`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
          <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="full" />
        </Td>
        <Td>
          <DateFormat locale="en-GB" value="2026-01-30" dateStyle="full" />
        </Td>
        <Td>
          <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="full" />
        </Td>
        <Td>
          <DateFormat locale="da-DK" value="2026-01-30" dateStyle="full" />
        </Td>
      </Tr>
      <Tr noWrap>
        <Td>Long</Td>
        <Td>
          <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="long" />
        </Td>
        <Td>
          <DateFormat locale="en-GB" value="2026-01-30" dateStyle="long" />
        </Td>
        <Td>
          <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="long" />
        </Td>
        <Td>
          <DateFormat locale="da-DK" value="2026-01-30" dateStyle="long" />
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
`}),E=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`DateAndTime`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
`}),D=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`DateWithoutYear`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
`}),O=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`DateWithoutYearAndTime`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
`}),k=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`RelativeTime`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:59:30Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="en-GB"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:59:30Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="sv-SE"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:59:30Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="da-DK"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
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
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="en-GB"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="sv-SE"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T11:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="da-DK"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
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
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T15:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="en-GB"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T15:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="sv-SE"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T15:00:00Z"
          />
        </Td>
        <Td>
          <DateFormat
            locale="da-DK"
            relativeTime
            relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')}
            value="2026-02-06T15:00:00Z"
          />
        </Td>
      </Tr>
    </tbody>
  </Table>
</Table.ScrollView>
`}),A=()=>(0,g.jsx)(m,{hideCode:!0,omitWrapper:!0,scope:{Table:p},stableName:`DurationStrings`,sourceImports:[`import { DateFormat, Li, NumberFormat, Table, Td, Th, Tr, Ul } from '@dnb/eufemia'`],__buildScope:{Table:p,ScrollView:i,Tr:l,Th:s,Td:c,DateFormat:u},children:`<Table.ScrollView>
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
`});function j(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,p:`p`,...f(),...e.components};return h||N(`Examples`,!1),w||N(`Examples.AmountAndCurrency`,!0),v||N(`Examples.BankAccountNumber`,!0),E||N(`Examples.DateAndTime`,!0),T||N(`Examples.DateStyles`,!0),D||N(`Examples.DateWithoutYear`,!0),O||N(`Examples.DateWithoutYearAndTime`,!0),A||N(`Examples.DurationStrings`,!0),y||N(`Examples.NationalIdentificationNumber`,!0),x||N(`Examples.Numbers`,!0),S||N(`Examples.NumbersCompact`,!0),b||N(`Examples.OrganizationNumber`,!0),C||N(`Examples.Percentage`,!0),_||N(`Examples.PhoneNumber`,!0),k||N(`Examples.RelativeTime`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h1,{children:`Number formatting reference`}),`
`,(0,g.jsx)(t.p,{children:`This page shows the canonical number, currency and date layouts that the components produce for each locale.`}),`
`,(0,g.jsxs)(t.p,{children:[`For detailed prop lists, see the `,(0,g.jsx)(t.a,{href:`/uilib/components/number-format`,children:`NumberFormat`}),` component and the `,(0,g.jsx)(t.a,{href:`/uilib/components/date-format`,children:`DateFormat`}),` component.`]}),`
`,(0,g.jsxs)(t.p,{children:[`The tables below focus on the locales most commonly used at DNB (`,(0,g.jsx)(t.code,{children:`nb-NO`}),`, `,(0,g.jsx)(t.code,{children:`en-GB`}),`, `,(0,g.jsx)(t.code,{children:`sv-SE`}),` and `,(0,g.jsx)(t.code,{children:`da-DK`}),`), but Eufemia supports many more region/locale combinations. Any valid `,(0,g.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/IETF_language_tag`,children:`BCP 47`}),` locale supported by the browser's `,(0,g.jsx)(t.code,{children:`Intl`}),` APIs – for example `,(0,g.jsx)(t.code,{children:`en-NO`}),` (English – Norway) or `,(0,g.jsx)(t.code,{children:`en-US`}),` – can be passed to the `,(0,g.jsx)(t.code,{children:`locale`}),` prop and will be formatted accordingly.`]}),`
`,(0,g.jsx)(t.hr,{}),`
`,(0,g.jsx)(t.h2,{children:`Phone number`}),`
`,(0,g.jsx)(_,{}),`
`,(0,g.jsx)(t.h2,{children:`Bank account number`}),`
`,(0,g.jsx)(v,{}),`
`,(0,g.jsx)(t.h2,{children:`National identification number`}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h2,{children:`Organization number`}),`
`,(0,g.jsx)(b,{}),`
`,(0,g.jsx)(t.h2,{children:`Numbers`}),`
`,(0,g.jsx)(x,{}),`
`,(0,g.jsx)(t.h3,{children:`Compact`}),`
`,(0,g.jsx)(S,{}),`
`,(0,g.jsx)(t.h2,{children:`Percentage`}),`
`,(0,g.jsx)(C,{}),`
`,(0,g.jsx)(t.h2,{children:`Amount and Currency`}),`
`,(0,g.jsx)(w,{}),`
`,(0,g.jsx)(t.h2,{children:`Date`}),`
`,(0,g.jsx)(T,{}),`
`,(0,g.jsx)(t.h2,{children:`Date + time`}),`
`,(0,g.jsx)(E,{}),`
`,(0,g.jsx)(t.h2,{children:`Date without year`}),`
`,(0,g.jsxs)(t.p,{children:[`The component always includes the year unless `,(0,g.jsx)(t.code,{children:`hideYear`}),` or `,(0,g.jsx)(t.code,{children:`hideCurrentYear`}),` is set.`]}),`
`,(0,g.jsx)(D,{}),`
`,(0,g.jsx)(t.h2,{children:`Date without year + time`}),`
`,(0,g.jsx)(O,{}),`
`,(0,g.jsx)(t.h2,{children:`Relative time`}),`
`,(0,g.jsxs)(t.p,{children:[`All examples below use the same reference point (`,(0,g.jsx)(t.code,{children:`2026-02-06T12:00:00Z`}),`) so the labels stay stable.`]}),`
`,(0,g.jsx)(k,{}),`
`,(0,g.jsx)(t.h2,{children:`Duration strings`}),`
`,(0,g.jsx)(A,{})]})}function M(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(j,{...e})}):j(e)}function N(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{M as default};