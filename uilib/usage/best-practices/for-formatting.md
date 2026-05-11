---
title: 'Best Practices for number formatting'
description: 'Compare the canonical number, currency and date layouts that the components produce for each locale.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.952Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Number formatting reference

This page shows the canonical number, currency and date layouts that the components produce for each locale.

For detailed prop lists, see the [NumberFormat](/uilib/components/number-format) component and the [DateFormat](/uilib/components/date-format) component.

The tables below focus on the locales most commonly used at DNB (`nb-NO`, `en-GB`, `sv-SE` and `da-DK`), but Eufemia supports many more region/locale combinations. Any valid [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) locale supported by the browser's `Intl` APIs – for example `en-NO` (English – Norway) or `en-US` – can be passed to the `locale` prop and will be formatted accordingly.

---

## Phone number


```tsx
render(<Ul>
      <Li>
        <NumberFormat.PhoneNumber value="99999999" />
      </Li>
      <Li>
        <NumberFormat.PhoneNumber value="+4799999999" />
      </Li>
    </Ul>)
```


## Bank account number


```tsx
render(<Ul>
      <Li>
        <NumberFormat.BankAccountNumber value="12340001358" />
      </Li>
    </Ul>)
```


## National identification number


```tsx
render(<Ul>
      <Li>
        <NumberFormat.NationalIdentityNumber value="18089212345" />
      </Li>
    </Ul>)
```


## Organization number


```tsx
render(<Ul>
      <Li>
        <NumberFormat.OrganizationNumber value="123456789" />
      </Li>
    </Ul>)
```


## Numbers


```tsx
render(<Table.ScrollView>
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
              <NumberFormat.Number locale="nb-NO" value={1234567.89} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Number locale="en-GB" value={1234567.89} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Number locale="sv-SE" value={1234567.89} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Number locale="da-DK" value={1234567.89} decimals={0} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>3 decimals</Td>
            <Td>
              <NumberFormat.Number locale="nb-NO" value={1234567.89} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Number locale="en-GB" value={1234567.89} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Number locale="sv-SE" value={1234567.89} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Number locale="da-DK" value={1234567.89} decimals={3} />
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
              <NumberFormat.Number locale="nb-NO" signDisplay="exceptZero" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="en-GB" signDisplay="exceptZero" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="sv-SE" signDisplay="exceptZero" value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="da-DK" signDisplay="exceptZero" value={1234567.89} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Invalid input</Td>
            <Td>
              <NumberFormat.Number locale="nb-NO">
                invalid
              </NumberFormat.Number>
            </Td>
            <Td>
              <NumberFormat.Number locale="en-GB">
                invalid
              </NumberFormat.Number>
            </Td>
            <Td>
              <NumberFormat.Number locale="sv-SE">
                invalid
              </NumberFormat.Number>
            </Td>
            <Td>
              <NumberFormat.Number locale="da-DK">
                invalid
              </NumberFormat.Number>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


### Compact


```tsx
render(<Table.ScrollView>
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
              <NumberFormat.Number compact locale="nb-NO" decimals={1} value={123456} />
            </Td>
            <Td>
              <NumberFormat.Number compact locale="en-GB" decimals={1} value={123456} />
            </Td>
            <Td>
              <NumberFormat.Number compact locale="sv-SE" decimals={1} value={123456} />
            </Td>
            <Td>
              <NumberFormat.Number compact locale="da-DK" decimals={1} value={123456} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <NumberFormat.Number locale="nb-NO" compact="long" decimals={2} value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="en-GB" compact="long" decimals={2} value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="sv-SE" compact="long" decimals={2} value={1234567.89} />
            </Td>
            <Td>
              <NumberFormat.Number locale="da-DK" compact="long" decimals={2} value={1234567.89} />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Percentage


```tsx
render(<Table.ScrollView>
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
    </Table.ScrollView>)
```


## Amount and Currency


```tsx
render(<Table.ScrollView>
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
              <NumberFormat.Currency locale="nb-NO" value={-1358} currencyDisplay="symbol" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="en-GB" value={-1358} currencyDisplay="symbol" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="sv-SE" value={-1358} currencyDisplay="symbol" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="da-DK" value={-1358} currencyDisplay="symbol" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Narrow symbol display</Td>
            <Td>
              <NumberFormat.Currency currency="EUR" locale="nb-NO" value={-1358} currencyDisplay="narrowSymbol" />
            </Td>
            <Td>
              <NumberFormat.Currency currency="EUR" locale="en-GB" value={-1358} currencyDisplay="narrowSymbol" />
            </Td>
            <Td>
              <NumberFormat.Currency currency="EUR" locale="sv-SE" value={-1358} currencyDisplay="narrowSymbol" />
            </Td>
            <Td>
              <NumberFormat.Currency currency="EUR" locale="da-DK" value={-1358} currencyDisplay="narrowSymbol" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Name display</Td>
            <Td>
              <NumberFormat.Currency locale="nb-NO" value={-1358} currencyDisplay="name" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="en-GB" value={-1358} currencyDisplay="name" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="sv-SE" value={-1358} currencyDisplay="name" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="da-DK" value={-1358} currencyDisplay="name" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Code display</Td>
            <Td>
              <NumberFormat.Currency locale="nb-NO" value={-1358} currencyDisplay="code" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="en-GB" value={-1358} currencyDisplay="code" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="sv-SE" value={-1358} currencyDisplay="code" />
            </Td>
            <Td>
              <NumberFormat.Currency locale="da-DK" value={-1358} currencyDisplay="code" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>0 decimals</Td>
            <Td>
              <NumberFormat.Currency locale="nb-NO" value={-1358} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="en-GB" value={-1358} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="sv-SE" value={-1358} decimals={0} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="da-DK" value={-1358} decimals={0} />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>3 decimals</Td>
            <Td>
              <NumberFormat.Currency locale="nb-NO" value={-1358} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="en-GB" value={-1358} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="sv-SE" value={-1358} decimals={3} />
            </Td>
            <Td>
              <NumberFormat.Currency locale="da-DK" value={-1358} decimals={3} />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Date


```tsx
render(<Table.ScrollView>
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
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="medium" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="medium" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="medium" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="medium" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="short" />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Date + time


```tsx
render(<Table.ScrollView>
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
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Date without year

The component always includes the year unless `hideYear` or `hideCurrentYear` is set.


```tsx
render(<Table.ScrollView>
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
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="full" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="full" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="full" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="full" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="long" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="long" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="long" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="long" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="medium" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="medium" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="medium" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="medium" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30" dateStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30" dateStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30" dateStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30" dateStyle="short" hideYear />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Date without year + time


```tsx
render(<Table.ScrollView>
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
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="full" timeStyle="short" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Long</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="long" timeStyle="short" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Medium</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="medium" timeStyle="short" hideYear />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>Short</Td>
            <Td>
              <DateFormat locale="nb-NO" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="en-GB" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" hideYear />
            </Td>
            <Td>
              <DateFormat locale="da-DK" value="2026-01-30T09:12" dateStyle="short" timeStyle="short" hideYear />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Relative time

All examples below use the same reference point (`2026-02-06T12:00:00Z`) so the labels stay stable.


```tsx
render(<Table.ScrollView>
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
              <DateFormat locale="nb-NO" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:59:30Z" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:59:30Z" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:59:30Z" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:59:30Z" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>In the past</Td>
            <Td>
              <DateFormat locale="nb-NO" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T11:00:00Z" />
            </Td>
          </Tr>
          <Tr noWrap>
            <Td>In the future</Td>
            <Td>
              <DateFormat locale="nb-NO" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T15:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="en-GB" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T15:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="sv-SE" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T15:00:00Z" />
            </Td>
            <Td>
              <DateFormat locale="da-DK" relativeTime relativeTimeReference={() => new Date('2026-02-06T12:00:00Z')} value="2026-02-06T15:00:00Z" />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>)
```


## Duration strings


```tsx
render(<Table.ScrollView>
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
    </Table.ScrollView>)
```
