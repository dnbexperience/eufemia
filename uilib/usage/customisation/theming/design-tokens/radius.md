---
version: 11.1.1
generatedAt: 2026-05-05T18:42:13.381Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

---

**Beta:** The `--token-*` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.

---

## Radius

Radius tokens control border-radius values across themes. They map to foundation size values and may differ between brands.


```tsx
render(<Table>
      <thead>
        <Tr>
          <Th noWrap>Token</Th>
          <Th noWrap>DNB Light</Th>
          <Th noWrap>DNB Dark</Th>
          <Th noWrap>Sbanken Light</Th>
          <Th noWrap>Sbanken Dark</Th>
          <Th noWrap>Carnegie</Th>
        </Tr>
      </thead>
      <tbody>
        {tokens.map(token => <Tr key={token.name}>
            <Td style={cellVerticalMiddle}>
              <MDXCode>{token.name}</MDXCode>
            </Td>
            <Td>{renderRadiusValue(token.references.uiLight)}</Td>
            <Td>{renderRadiusValue(token.references.uiDark)}</Td>
            <Td>{renderRadiusValue(token.references.sbankenLight)}</Td>
            <Td>{renderRadiusValue(token.references.sbankenDark)}</Td>
            <Td>{renderRadiusValue(token.references.carnegie)}</Td>
          </Tr>)}
      </tbody>
    </Table>)
```
