---
version: 11.0.1
generatedAt: 2026-04-24T10:40:51.786Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

---

**NB:** Do not use the `--token-*` CSS custom properties in your code until this page is marked as ready for consumption. The token API is still being finalized and may change without warning until then.

---

## Radius

Radius tokens control border-radius values across themes. They map to foundation size values and may differ between brands.

```tsx
render(
  <Table>
    <thead>
      <Tr>
        <Th noWrap>Token</Th>
        <Th noWrap>DNB Light</Th>
        {isDev && <Th noWrap>DNB Dark</Th>}
        <Th noWrap>Sbanken Light</Th>
        {isDev && <Th noWrap>Sbanken Dark</Th>}
        <Th noWrap>Carnegie</Th>
      </Tr>
    </thead>
    <tbody>
      {tokens.map((token) => (
        <Tr key={token.name}>
          <Td style={cellVerticalMiddle}>
            <MDXCode>{token.name}</MDXCode>
          </Td>
          <Td>{renderRadiusValue(token.references.uiLight)}</Td>
          {isDev && <Td>{renderRadiusValue(token.references.uiDark)}</Td>}
          <Td>{renderRadiusValue(token.references.sbankenLight)}</Td>
          {isDev && (
            <Td>{renderRadiusValue(token.references.sbankenDark)}</Td>
          )}
          <Td>{renderRadiusValue(token.references.carnegie)}</Td>
        </Tr>
      ))}
    </tbody>
  </Table>
)
```
