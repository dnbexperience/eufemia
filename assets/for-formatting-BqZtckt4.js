import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r,Lt as i}from"./index-DVm0MbGb.js";var a=e({AmountAndCurrency:()=>m,BankAccountNumber:()=>c,DateAndTime:()=>g,DateStyles:()=>h,DateWithoutYear:()=>_,DateWithoutYearAndTime:()=>v,DurationStrings:()=>b,NationalIdentificationNumber:()=>l,Numbers:()=>d,NumbersCompact:()=>f,OrganizationNumber:()=>u,Percentage:()=>p,PhoneNumber:()=>s,RelativeTime:()=>y}),o=t(),s=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Ul>
  <Li>
    <NumberFormat.PhoneNumber value="99999999" />
  </Li>
  <Li>
    <NumberFormat.PhoneNumber value="+4799999999" />
  </Li>
</Ul>
`}),c=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Ul>
  <Li>
    <NumberFormat.BankAccountNumber value="12340001358" />
  </Li>
</Ul>
`}),l=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Ul>
  <Li>
    <NumberFormat.NationalIdentityNumber value="18089212345" />
  </Li>
</Ul>
`}),u=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Ul>
  <Li>
    <NumberFormat.OrganizationNumber value="123456789" />
  </Li>
</Ul>
`}),d=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,children:`<Table.ScrollView>
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
`}),f=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),p=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),m=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),h=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),g=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),_=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),v=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),y=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`}),b=()=>(0,o.jsx)(n,{hideCode:!0,omitWrapper:!0,scope:{Table:i},children:`<Table.ScrollView>
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
`});function x(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,p:`p`,...r(),...e.components};return a||C(`Examples`,!1),m||C(`Examples.AmountAndCurrency`,!0),c||C(`Examples.BankAccountNumber`,!0),g||C(`Examples.DateAndTime`,!0),h||C(`Examples.DateStyles`,!0),_||C(`Examples.DateWithoutYear`,!0),v||C(`Examples.DateWithoutYearAndTime`,!0),b||C(`Examples.DurationStrings`,!0),l||C(`Examples.NationalIdentificationNumber`,!0),d||C(`Examples.Numbers`,!0),f||C(`Examples.NumbersCompact`,!0),u||C(`Examples.OrganizationNumber`,!0),p||C(`Examples.Percentage`,!0),s||C(`Examples.PhoneNumber`,!0),y||C(`Examples.RelativeTime`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Number formatting reference`}),`
`,(0,o.jsx)(t.p,{children:`This page shows the canonical number, currency and date layouts that the components produce for each locale.`}),`
`,(0,o.jsxs)(t.p,{children:[`For detailed prop lists, see the `,(0,o.jsx)(t.a,{href:`/uilib/components/number-format`,children:`NumberFormat`}),` component and the `,(0,o.jsx)(t.a,{href:`/uilib/components/date-format`,children:`DateFormat`}),` component.`]}),`
`,(0,o.jsxs)(t.p,{children:[`The tables below focus on the locales most commonly used at DNB (`,(0,o.jsx)(t.code,{children:`nb-NO`}),`, `,(0,o.jsx)(t.code,{children:`en-GB`}),`, `,(0,o.jsx)(t.code,{children:`sv-SE`}),` and `,(0,o.jsx)(t.code,{children:`da-DK`}),`), but Eufemia supports many more region/locale combinations. Any valid `,(0,o.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/IETF_language_tag`,children:`BCP 47`}),` locale supported by the browser's `,(0,o.jsx)(t.code,{children:`Intl`}),` APIs – for example `,(0,o.jsx)(t.code,{children:`en-NO`}),` (English – Norway) or `,(0,o.jsx)(t.code,{children:`en-US`}),` – can be passed to the `,(0,o.jsx)(t.code,{children:`locale`}),` prop and will be formatted accordingly.`]}),`
`,(0,o.jsx)(t.hr,{}),`
`,(0,o.jsx)(t.h2,{children:`Phone number`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h2,{children:`Bank account number`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h2,{children:`National identification number`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h2,{children:`Organization number`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h2,{children:`Numbers`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Compact`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h2,{children:`Percentage`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h2,{children:`Amount and Currency`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h2,{children:`Date`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h2,{children:`Date + time`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h2,{children:`Date without year`}),`
`,(0,o.jsxs)(t.p,{children:[`The component always includes the year unless `,(0,o.jsx)(t.code,{children:`hideYear`}),` or `,(0,o.jsx)(t.code,{children:`hideCurrentYear`}),` is set.`]}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h2,{children:`Date without year + time`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h2,{children:`Relative time`}),`
`,(0,o.jsxs)(t.p,{children:[`All examples below use the same reference point (`,(0,o.jsx)(t.code,{children:`2026-02-06T12:00:00Z`}),`) so the labels stay stable.`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h2,{children:`Duration strings`}),`
`,(0,o.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};