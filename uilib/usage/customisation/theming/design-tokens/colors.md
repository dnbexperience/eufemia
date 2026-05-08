---
version: 11.2.0
generatedAt: 2026-05-08T07:25:37.872Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

---

**Beta:** The `--token-*` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.

---

## Overview


```tsx
render(<Table>
      <thead>
        <Tr>
          <Th>Section</Th>
          <Th>Tokens</Th>
          <Th>Usage</Th>
        </Tr>
      </thead>
      <tbody>
        {colorSections.map(section => {
      return <Tr key={section.id}>
              <Td>
                <Anchor href={`/uilib/usage/customisation/theming/design-tokens/colors/#${section.id}`}>
                  {section.title}
                </Anchor>
              </Td>
              <Td>{section.tokens.length}</Td>
              <Td>
                {section.id === 'component' ? 'For internal use only.' : section.id === 'decorative' ? 'For advanced custom decorative needs.' : 'For external use. Use the filters in each section to narrow tokens to the variants you need.'}
              </Td>
            </Tr>;
    })}
      </tbody>
    </Table>)
```


### Tips

- Hover over the value of a token in the tables below to see its **Eufemia Foundation** name.
- Use the filter buttons above each table to narrow tokens by modifier (for example `inverse`, `ondark`, `subtle`, `bold` or `static`). Multiple modifiers combine with `AND`.
- You can sort the tables by clicking the column headers. Click again to reverse the sort order.

## Background

Background tokens are used for surfaces, fills and interactive fill states. Typical semantic names in this section are `action`, `neutral`, `selected` and `page`.


| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- |
| action | `--token-color-background-action` | `#007272` | `#A5E1D2` | `#4E08BC` | `#64D7B4` | `#000000` |
| action-alternative | `--token-color-background-action-alternative` | `#8E8E93` | `#737373` | `#9090A3` | `#9090A3` | `#000000` |
| action-alternative-hover-subtle | `--token-color-background-action-alternative-hover-subtle` | `#EBEBEB` | `#48484A` | `#F2F2F7` | `#4A4A5B` | `#EBEBEB` |
| action-disabled | `--token-color-background-action-disabled` | `#CCCCCC` | `#48484A` | `#EBEBF1` | `#4A4A5B` | `#CCCCCC` |
| action-disabled-ondark | `--token-color-background-action-disabled-ondark` | `#48484A` | `#48484A` | `#666578` | `#4A4A5B` | `#48484A` |
| action-focus | `--token-color-background-action-focus` | `#276ACE` | `#276ACE` | `#005CFF` | `#005CFF` | `#276ACE` |
| action-focus-subtle | `--token-color-background-action-focus-subtle` | `#E1E9F9` | `#E1E9F9` | `#EBF6FF` | `#EBF6FF` | `#E1E9F9` |
| action-hover | `--token-color-background-action-hover` | `#007272` | `#A5E1D2` | `#4E08BC` | `#64D7B4` | `#333333` |
| action-hover-inverse | `--token-color-background-action-hover-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#B1B1B5` |
| action-hover-ondark | `--token-color-background-action-hover-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-hover-subtle | `--token-color-background-action-hover-subtle` | `#D8F3EC` | `#023939` | `#F1EBFF` | `#16342D` | `rgba(0 0 0 / 5%)` |
| action-hover-subtle-inverse | `--token-color-background-action-hover-subtle-inverse` | `#023939` | `#D8F3EC` | `#222163` | `#F1EBFF` | `#000000` |
| action-hover-subtle-ondark | `--token-color-background-action-hover-subtle-ondark` | `#08454D` | `#08454D` | `#16342D` | `#16342D` | `rgba(0 0 0 / 30%)` |
| action-inverse | `--token-color-background-action-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#B1B1B5` |
| action-ondark | `--token-color-background-action-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-pressed | `--token-color-background-action-pressed` | `#14555A` | `#5CBDAD` | `#1C1B4E` | `#37B992` | `#000000` |
| action-pressed-ondark | `--token-color-background-action-pressed-ondark` | `#5CBDAD` | `#5CBDAD` | `#64D7B4` | `#64D7B4` | `#FFFFFF` |
| action-pressed-subtle | `--token-color-background-action-pressed-subtle` | `#BCE8DC` | `#14555A` | `#E0D0FF` | `#0D1F1B` | `rgba(0 0 0 / 10%)` |
| action-pressed-subtle-inverse | `--token-color-background-action-pressed-subtle-inverse` | `#14555A` | `#BCE8DC` | `#1C1B4E` | `#E0D0FF` | `#333333` |
| action-pressed-subtle-ondark | `--token-color-background-action-pressed-subtle-ondark` | `#14555A` | `#14555A` | `#0D1F1B` | `#0D1F1B` | `rgba(0 0 0 / 50%)` |
| error | `--token-color-background-error` | `#D52525` | `#D52525` | `#D8134B` | `#DF280F` | `#D52525` |
| error-subtle | `--token-color-background-error-subtle` | `#FCEEEE` | `#401A1A` | `#FFDBE9` | `#4D1E08` | `#FCEEEE` |
| info | `--token-color-background-info` | `#007272` | `#A5E1D2` | `#1E9F73` | `#64D7B4` | `#007272` |
| info-subtle | `--token-color-background-info-subtle` | `#F2F4EC` | `#1C342D` | `#F4FFFB` | `#16342D` | `#EBF4F2` |
| marketing | `--token-color-background-marketing` | `#333333` | `#F8F8F8` | `#222163` | `#E0D0FF` | `#333333` |
| marketing-subtle | `--token-color-background-marketing-subtle` | `#F2F2F5` | `#48484A` | `#F1EBFF` | `#3A3A4A` | `#F2F2F5` |
| neutral | `--token-color-background-neutral` | `#FFFFFF` | `#1C1C1E` | `#FFFFFF` | `#21202D` | `#FFFFFF` |
| neutral-alternative | `--token-color-background-neutral-alternative` | `#F2F2F5` | `#333333` | `#EBEBF1` | `#161620` | `#F2F2F5` |
| neutral-base | `--token-color-background-neutral-base` | `#EBEBEB` | `#333333` | `#F2F2F7` | `#3A3A4A` | `#EBEBEB` |
| neutral-bold | `--token-color-background-neutral-bold` | `#CCCCCC` | `#48484A` | `#D9D9E4` | `#4A4A5B` | `#CCCCCC` |
| neutral-static | `--token-color-background-neutral-static` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| neutral-subtle | `--token-color-background-neutral-subtle` | `#F8F8F8` | `#2C2C2E` | `#F9F9FD` | `#21202D` | `#F8F8F8` |
| page-background | `--token-color-background-page-background` | `#FFFFFF` | `#000000` | `#FFFFFF` | `#161620` | `#FFFFFF` |
| positive | `--token-color-background-positive` | `#007B5E` | `#47D197` | `#00785B` | `#64D7B4` | `#007B5E` |
| positive-subtle | `--token-color-background-positive-subtle` | `#EBF4F2` | `#1C342D` | `#E5FFF7` | `#16342D` | `#EBF4F2` |
| selected | `--token-color-background-selected` | `#08454D` | `#E4EED7` | `#1C1B4E` | `#E5FFF7` | `#000000` |
| selected-ondark | `--token-color-background-selected-ondark` | `#D8F3EC` | `#D8F3EC` | `#E5FFF7` | `#E5FFF7` | `#FFFFFF` |
| selected-subtle | `--token-color-background-selected-subtle` | `#E4EED7` | `#0D4637` | `#F1EBFF` | `#16342D` | `#F6EAE4` |
| selected-subtle-ondark | `--token-color-background-selected-subtle-ondark` | `#0D4637` | `#0D4637` | `#16342D` | `#16342D` | `#000000` |
| warning | `--token-color-background-warning` | `#FDBB31` | `#FDBB31` | `#F7BF16` | `#F7BF16` | `#FDBB31` |
| warning-subtle | `--token-color-background-warning-subtle` | `#FBF6EC` | `#3D2E0F` | `#FFFCE5` | `#312500` | `#FBF6EC` |


## Text

Text tokens are used for readable content, labels and text states.


| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- |
| action | `--token-color-text-action` | `#007272` | `#A5E1D2` | `#4E08BC` | `#92EECD` | `#000000` |
| action-alternative-ondark | `--token-color-text-action-alternative-ondark` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| action-disabled | `--token-color-text-action-disabled` | `#CCCCCC` | `#636366` | `#D9D9E4` | `#666578` | `#CCCCCC` |
| action-disabled-ondark | `--token-color-text-action-disabled-ondark` | `#8E8E93` | `#8E8E93` | `#9090A3` | `#9090A3` | `#8E8E93` |
| action-focus | `--token-color-text-action-focus` | `#276ACE` | `#276ACE` | `#005CFF` | `#005CFF` | `#276ACE` |
| action-hover | `--token-color-text-action-hover` | `#007272` | `#A5E1D2` | `#4E08BC` | `#92EECD` | `#000000` |
| action-hover-inverse | `--token-color-text-action-hover-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-hover-ondark | `--token-color-text-action-hover-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-inverse | `--token-color-text-action-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-ondark | `--token-color-text-action-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-pressed | `--token-color-text-action-pressed` | `#14555A` | `#5CBDAD` | `#222163` | `#64D7B4` | `#000000` |
| action-pressed-inverse | `--token-color-text-action-pressed-inverse` | `#5CBDAD` | `#14555A` | `#64D7B4` | `#222163` | `#FFFFFF` |
| action-pressed-ondark | `--token-color-text-action-pressed-ondark` | `#5CBDAD` | `#5CBDAD` | `#64D7B4` | `#64D7B4` | `#FFFFFF` |
| destructive | `--token-color-text-destructive` | `#D52525` | `#FF5400` | `#D8134B` | `#FF5B44` | `#D52525` |
| destructive-inverse | `--token-color-text-destructive-inverse` | `#FF5400` | `#D52525` | `#FF5B44` | `#A02615` | `#FF5400` |
| error | `--token-color-text-error` | `#D52525` | `#D52525` | `#D8134B` | `#DF280F` | `#D52525` |
| neutral | `--token-color-text-neutral` | `#333333` | `#FFFFFF` | `#18172A` | `#FFFFFF` | `#000000` |
| neutral-alternative | `--token-color-text-neutral-alternative` | `#737373` | `#8E8E93` | `#666578` | `#9090A3` | `#737373` |
| neutral-alternative-inverse | `--token-color-text-neutral-alternative-inverse` | `#CCCCCC` | `#636366` | `#C0C0D1` | `#666578` | `#CCCCCC` |
| neutral-inverse | `--token-color-text-neutral-inverse` | `#FFFFFF` | `#333333` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| neutral-ondark | `--token-color-text-neutral-ondark` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| neutral-onlight | `--token-color-text-neutral-onlight` | `#333333` | `#333333` | `#18172A` | `#000000` | `#000000` |
| neutral-subtle | `--token-color-text-neutral-subtle` | `#CCCCCC` | `#636366` | `#666578` | `#666578` | `#CCCCCC` |
| neutral-subtle-ondark | `--token-color-text-neutral-subtle-ondark` | `#CCCCCC` | `#CCCCCC` | `#EBEBF1` | `#EBEBF1` | `#CCCCCC` |
| positive | `--token-color-text-positive` | `#007B5E` | `#28B482` | `#00785B` | `#64D7B4` | `#007B5E` |
| positive-inverse | `--token-color-text-positive-inverse` | `#28B482` | `#007B5E` | `#1E9F73` | `#00785B` | `#28B482` |
| selected | `--token-color-text-selected` | `#08454D` | `#E4EED7` | `#1C1B4E` | `#E5FFF7` | `#333333` |
| warning | `--token-color-text-warning` | `#805B0E` | `#FDBB31` | `#816209` | `#F7BF16` | `#805B0E` |
| warning-inverse | `--token-color-text-warning-inverse` | `#FDBB31` | `#805B0E` | `#F7BF16` | `#816209` | `#FDBB31` |


## Icon

Icon tokens are used for icon colors.


| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- |
| action | `--token-color-icon-action` | `#007272` | `#A5E1D2` | `#4E08BC` | `#92EECD` | `#000000` |
| action-alternative-ondark | `--token-color-icon-action-alternative-ondark` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| action-disabled | `--token-color-icon-action-disabled` | `#CCCCCC` | `#636366` | `#D9D9E4` | `#666578` | `#CCCCCC` |
| action-disabled-ondark | `--token-color-icon-action-disabled-ondark` | `#8E8E93` | `#8E8E93` | `#9090A3` | `#9090A3` | `#8E8E93` |
| action-focus | `--token-color-icon-action-focus` | `#276ACE` | `#276ACE` | `#005CFF` | `#005CFF` | `#276ACE` |
| action-hover | `--token-color-icon-action-hover` | `#007272` | `#A5E1D2` | `#4E08BC` | `#92EECD` | `#000000` |
| action-hover-inverse | `--token-color-icon-action-hover-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-hover-ondark | `--token-color-icon-action-hover-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-inverse | `--token-color-icon-action-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-ondark | `--token-color-icon-action-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-pressed | `--token-color-icon-action-pressed` | `#14555A` | `#5CBDAD` | `#222163` | `#64D7B4` | `#000000` |
| action-pressed-inverse | `--token-color-icon-action-pressed-inverse` | `#5CBDAD` | `#14555A` | `#92EECD` | `#222163` | `#FFFFFF` |
| action-pressed-ondark | `--token-color-icon-action-pressed-ondark` | `#5CBDAD` | `#5CBDAD` | `#64D7B4` | `#64D7B4` | `#FFFFFF` |
| destructive | `--token-color-icon-destructive` | `#D52525` | `#FF5400` | `#D8134B` | `#FF5B44` | `#D52525` |
| error | `--token-color-icon-error` | `#D52525` | `#D52525` | `#D8134B` | `#DF280F` | `#D52525` |
| error-subtle | `--token-color-icon-error-subtle` | `#FCEEEE` | `#401A1A` | `#FFDBE9` | `#4D1E08` | `#FCEEEE` |
| info | `--token-color-icon-info` | `#007272` | `#A5E1D2` | `#1E9F73` | `#64D7B4` | `#007272` |
| info-subtle | `--token-color-icon-info-subtle` | `#F2F4EC` | `#1C342D` | `#F4FFFB` | `#0D1F1B` | `#EBF4F2` |
| marketing | `--token-color-icon-marketing` | `#333333` | `#F8F8F8` | `#222163` | `#E0D0FF` | `#333333` |
| marketing-subtle | `--token-color-icon-marketing-subtle` | `#F2F2F5` | `#48484A` | `#F1EBFF` | `#3A3A4A` | `#F2F2F5` |
| neutral | `--token-color-icon-neutral` | `#333333` | `#FFFFFF` | `#18172A` | `#FFFFFF` | `#000000` |
| neutral-alternative | `--token-color-icon-neutral-alternative` | `#737373` | `#8E8E93` | `#666578` | `#9090A3` | `#737373` |
| neutral-inverse | `--token-color-icon-neutral-inverse` | `#FFFFFF` | `#333333` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| neutral-ondark | `--token-color-icon-neutral-ondark` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| neutral-static | `--token-color-icon-neutral-static` | `#333333` | `#333333` | `#18172A` | `#18172A` | `#000000` |
| positive | `--token-color-icon-positive` | `#007B5E` | `#47D197` | `#00785B` | `#64D7B4` | `#007B5E` |
| positive-subtle | `--token-color-icon-positive-subtle` | `#EBF4F2` | `#1C342D` | `#E5FFF7` | `#16342D` | `#EBF4F2` |
| selected | `--token-color-icon-selected` | `#08454D` | `#D8F3EC` | `#1C1B4E` | `#64D7B4` | `#000000` |
| selected-ondark | `--token-color-icon-selected-ondark` | `#D8F3EC` | `#D8F3EC` | `#64D7B4` | `#64D7B4` | `#EBEBEB` |
| warning | `--token-color-icon-warning` | `#FDBB31` | `#FDBB31` | `#F7BF16` | `#F7BF16` | `#FDBB31` |
| warning-subtle | `--token-color-icon-warning-subtle` | `#FBF6EC` | `#3D2E0F` | `#FFFCE5` | `#312500` | `#FBF6EC` |


## Stroke

Stroke tokens are used for borders, dividers, outlines and focus-related line work.


| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- |
| action | `--token-color-stroke-action` | `#007272` | `#A5E1D2` | `#4E08BC` | `#64D7B4` | `#000000` |
| action-alternative | `--token-color-stroke-action-alternative` | `#8E8E93` | `#CCCCCC` | `#9090A3` | `#C0C0D1` | `#000000` |
| action-alternative-ondark | `--token-color-stroke-action-alternative-ondark` | `#CCCCCC` | `#CCCCCC` | `#C0C0D1` | `#C0C0D1` | `#CCCCCC` |
| action-disabled | `--token-color-stroke-action-disabled` | `#B1B1B5` | `#636366` | `#D9D9E4` | `#666578` | `#B1B1B5` |
| action-disabled-ondark | `--token-color-stroke-action-disabled-ondark` | `#636366` | `#636366` | `#666578` | `#666578` | `#636366` |
| action-focus | `--token-color-stroke-action-focus` | `#276ACE` | `#276ACE` | `#005CFF` | `#005CFF` | `#276ACE` |
| action-focus-subtle | `--token-color-stroke-action-focus-subtle` | `#E1E9F9` | `#E1E9F9` | `#EBF6FF` | `#EBF6FF` | `#E1E9F9` |
| action-hover | `--token-color-stroke-action-hover` | `#007272` | `#A5E1D2` | `#4E08BC` | `#64D7B4` | `#000000` |
| action-hover-inverse | `--token-color-stroke-action-hover-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-hover-ondark | `--token-color-stroke-action-hover-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-inverse | `--token-color-stroke-action-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#4E08BC` | `#FFFFFF` |
| action-ondark | `--token-color-stroke-action-ondark` | `#A5E1D2` | `#A5E1D2` | `#92EECD` | `#92EECD` | `#FFFFFF` |
| action-pressed | `--token-color-stroke-action-pressed` | `#14555A` | `#5CBDAD` | `#1C1B4E` | `#37B992` | `#48484A` |
| action-pressed-inverse | `--token-color-stroke-action-pressed-inverse` | `#5CBDAD` | `#14555A` | `#37B992` | `#1C1B4E` | `#8E8E93` |
| action-pressed-ondark | `--token-color-stroke-action-pressed-ondark` | `#5CBDAD` | `#5CBDAD` | `#64D7B4` | `#64D7B4` | `#FFFFFF` |
| error | `--token-color-stroke-error` | `#D52525` | `#FF5400` | `#D8134B` | `#FF5B44` | `#D52525` |
| info | `--token-color-stroke-info` | `#007272` | `#A5E1D2` | `#1E9F73` | `#00785B` | `#007272` |
| marketing | `--token-color-stroke-marketing` | `#333333` | `#F2F2F5` | `#222163` | `#E0D0FF` | `#333333` |
| neutral | `--token-color-stroke-neutral` | `#333333` | `#CCCCCC` | `#222163` | `#C0C0D1` | `#DBCDC5` |
| neutral-alternative | `--token-color-stroke-neutral-alternative` | `#F2F2F5` | `#333333` | `#D9D9E4` | `#21202D` | `#CCCCCC` |
| neutral-bold | `--token-color-stroke-neutral-bold` | `#CCCCCC` | `#48484A` | `#D9D9E4` | `#3A3A4A` | `#000000` |
| neutral-ondark | `--token-color-stroke-neutral-ondark` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| neutral-subtle | `--token-color-stroke-neutral-subtle` | `#EBEBEB` | `#48484A` | `#D9D9E4` | `#3A3A4A` | `#F6EAE4` |
| positive | `--token-color-stroke-positive` | `#007B5E` | `#47D197` | `#00785B` | `#64D7B4` | `#007B5E` |
| selected | `--token-color-stroke-selected` | `#08454D` | `#E4EED7` | `#1C1B4E` | `#E5FFF7` | `#000000` |
| selected-ondark | `--token-color-stroke-selected-ondark` | `#D8F3EC` | `#D8F3EC` | `#E5FFF7` | `#E5FFF7` | `#B1B1B5` |
| warning | `--token-color-stroke-warning` | `#FDBB31` | `#FDBB31` | `#F7BF16` | `#F7BF16` | `#FDBB31` |


## Decorative

Decorative tokens are colors to use for advanced custom decorative needs where the semantic color tokens are not the right fit. They should not be used for text. For text on dark decorative backgrounds, use the `ondark` text tokens, and for other backgrounds, use the `neutral` text tokens.

If you use decorative tokens, the `First`, `Second`, and `Third` sets are intended to be used one at a time, because the colors inside each set are designed to match each other.


| Group | Name | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- | --- |
| First | base | `--token-color-decorative-first-base` | `#4A948D` | `#4A948D` | `#7129E2` | `#7129E2` | `#B5A197` |
| First | base-static | `--token-color-decorative-first-base-static` | `#4A948D` | `#4A948D` | `#7129E2` | `#7129E2` | `#B5A197` |
| First | bold | `--token-color-decorative-first-bold` | `#14555A` | `#A5E1D2` | `#4E08BC` | `#D2BAFF` | `#73655E` |
| First | bold-static | `--token-color-decorative-first-bold-static` | `#14555A` | `#14555A` | `#4E08BC` | `#4E08BC` | `#73655E` |
| First | intense | `--token-color-decorative-first-intense` | `#00343E` | `#D8F3EC` | `#222163` | `#F1EBFF` | `#4A3F3A` |
| First | intense-static | `--token-color-decorative-first-intense-static` | `#00343E` | `#00343E` | `#222163` | `#222163` | `#4A3F3A` |
| First | muted | `--token-color-decorative-first-muted` | `#D8F3EC` | `#023939` | `#F1EBFF` | `#222163` | `#FDFBF9` |
| First | muted-static | `--token-color-decorative-first-muted-static` | `#D8F3EC` | `#D8F3EC` | `#F1EBFF` | `#F1EBFF` | `#FDFBF9` |
| First | subtle | `--token-color-decorative-first-subtle` | `#A5E1D2` | `#14555A` | `#D2BAFF` | `#4E08BC` | `#F6EAE4` |
| First | subtle-static | `--token-color-decorative-first-subtle-static` | `#A5E1D2` | `#A5E1D2` | `#D2BAFF` | `#D2BAFF` | `#F6EAE4` |
| Second | base | `--token-color-decorative-second-base` | `#47D197` | `#47D197` | `#37B992` | `#37B992` | `#B66D73` |
| Second | base-static | `--token-color-decorative-second-base-static` | `#47D197` | `#47D197` | `#37B992` | `#37B992` | `#B66D73` |
| Second | bold | `--token-color-decorative-second-bold` | `#007B5E` | `#B9E7CE` | `#00785B` | `#92EECD` | `#5C0022` |
| Second | bold-static | `--token-color-decorative-second-bold-static` | `#007B5E` | `#007B5E` | `#00785B` | `#00785B` | `#5C0022` |
| Second | intense | `--token-color-decorative-second-intense` | `#0D4637` | `#DCF3E8` | `#16342D` | `#E5FFF7` | `#24000D` |
| Second | intense-static | `--token-color-decorative-second-intense-static` | `#0D4637` | `#0D4637` | `#16342D` | `#16342D` | `#24000D` |
| Second | muted | `--token-color-decorative-second-muted` | `#DCF3E8` | `#0D4637` | `#E5FFF7` | `#16342D` | `#FFDEDB` |
| Second | muted-static | `--token-color-decorative-second-muted-static` | `#DCF3E8` | `#DCF3E8` | `#E5FFF7` | `#E5FFF7` | `#FFDEDB` |
| Second | subtle | `--token-color-decorative-second-subtle` | `#B9E7CE` | `#007B5E` | `#92EECD` | `#00785B` | `#E2A2A5` |
| Second | subtle-static | `--token-color-decorative-second-subtle-static` | `#B9E7CE` | `#B9E7CE` | `#92EECD` | `#92EECD` | `#E2A2A5` |
| Third | base | `--token-color-decorative-third-base` | `#80BA77` | `#80BA77` | `#9761F1` | `#37B992` | `#24968D` |
| Third | base-static | `--token-color-decorative-third-base-static` | `#80BA77` | `#80BA77` | `#9761F1` | `#37B992` | `#24968D` |
| Third | bold | `--token-color-decorative-third-bold` | `#5D7650` | `#BCE5AC` | `#4E08BC` | `#92EECD` | `#14555A` |
| Third | bold-static | `--token-color-decorative-third-bold-static` | `#5D7650` | `#5D7650` | `#4E08BC` | `#007B5E` | `#14555A` |
| Third | intense | `--token-color-decorative-third-intense` | `#3B4736` | `#F2F4EC` | `#222163` | `#E5FFF7` | `#00343E` |
| Third | intense-static | `--token-color-decorative-third-intense-static` | `#3B4736` | `#3B4736` | `#222163` | `#16342D` | `#00343E` |
| Third | muted | `--token-color-decorative-third-muted` | `#F2F4EC` | `#3B4736` | `#FBF9FF` | `#16342D` | `#DDF2EC` |
| Third | muted-static | `--token-color-decorative-third-muted-static` | `#F2F4EC` | `#F2F4EC` | `#FBF9FF` | `#F4FFFB` | `#DCF3E8` |
| Third | subtle | `--token-color-decorative-third-subtle` | `#BCE5AC` | `#5D7650` | `#D2BAFF` | `#00785B` | `#A5E1D2` |
| Third | subtle-static | `--token-color-decorative-third-subtle-static` | `#BCE5AC` | `#BCE5AC` | `#D2BAFF` | `#92EECD` | `#A5E1D2` |


## Component

**NB:** Do not use. These tokens are reserved for internal use only.

Component tokens are the component-specific layer. They are useful when a broad semantic token is not precise enough and the API needs a token with an explicit component role, such as `button`, `tooltip` or `table`.

After `-component-`, the next segment is the component name, followed by the role path. Example:

`--token-color-component-button-background-action`.


| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |
| --- | --- | --- | --- | --- | --- | --- |
| button | `--token-color-component-button-background-action` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-background-action-destructive` | `#D52525` | `#D52525` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-background-action-destructive-hover` | `#D52525` | `#D52525` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-background-action-destructive-hover-subtle` | `#FCEEEE` | `#401A1A` | `#FFECF3` | `#350E02` | `#FCEEEE` |
| button | `--token-color-component-button-background-action-destructive-pressed` | `#B21E1E` | `#ED4C4C` | `#A02615` | `#FF817B` | `#B21E1E` |
| button | `--token-color-component-button-background-action-destructive-pressed-subtle` | `#FCDDDD` | `#541515` | `#FFDBE9` | `#591703` | `#FCDDDD` |
| button | `--token-color-component-button-background-action-hover` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-icon-action` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-icon-action-destructive` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-icon-action-destructive-hover` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-icon-action-destructive-pressed` | `#B21E1E` | `#FF7633` | `#FF5B44` | `#FF817B` | `#B21E1E` |
| button | `--token-color-component-button-icon-action-disabled` | `#FFFFFF` | `#737373` | `#FFFFFF` | `#9090A3` | `#FFFFFF` |
| button | `--token-color-component-button-icon-action-hover` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-icon-neutral` | `#FFFFFF` | `#023939` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| button | `--token-color-component-button-icon-neutral-destructive` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| button | `--token-color-component-button-icon-neutral-ondark` | `#023939` | `#023939` | `#18172A` | `#18172A` | `#000000` |
| button | `--token-color-component-button-stroke-action` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-stroke-action-destructive` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-stroke-action-destructive-hover` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-stroke-action-destructive-pressed` | `#B21E1E` | `#FF7633` | `#FF5B44` | `#FF817B` | `#B21E1E` |
| button | `--token-color-component-button-stroke-action-hover` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-stroke-selected` | `rgba(20 85 90 / 40%)` | `rgba(165 225 210 / 40%)` | `rgba(78 8 188 / 40%)` | `rgba(146 238 205 / 40%)` | `#897971` |
| button | `--token-color-component-button-text-action` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-text-action-destructive` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-text-action-destructive-hover` | `#D52525` | `#FF5400` | `#DF280F` | `#FF5B44` | `#D52525` |
| button | `--token-color-component-button-text-action-destructive-pressed` | `#B21E1E` | `#FF7633` | `#FF5B44` | `#FF817B` | `#B21E1E` |
| button | `--token-color-component-button-text-action-disabled` | `#FFFFFF` | `#737373` | `#FFFFFF` | `#9090A3` | `#FFFFFF` |
| button | `--token-color-component-button-text-action-hover` | `#007272` | `#A5E1D2` | `#222163` | `#92EECD` | `#000000` |
| button | `--token-color-component-button-text-action-hover-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#222163` | `#FFFFFF` |
| button | `--token-color-component-button-text-action-hover-ondark` | `#A5E1D2` | `#007272` | `#92EECD` | `#222163` | `#FFFFFF` |
| button | `--token-color-component-button-text-action-inverse` | `#A5E1D2` | `#007272` | `#92EECD` | `#222163` | `#FFFFFF` |
| button | `--token-color-component-button-text-action-ondark` | `#A5E1D2` | `#007272` | `#92EECD` | `#222163` | `#FFFFFF` |
| button | `--token-color-component-button-text-neutral` | `#FFFFFF` | `#023939` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| button | `--token-color-component-button-text-neutral-destructive` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#18172A` | `#FFFFFF` |
| button | `--token-color-component-button-text-neutral-inverse` | `#023939` | `#FFFFFF` | `#18172A` | `#FFFFFF` | `#000000` |
| button | `--token-color-component-button-text-neutral-ondark` | `#023939` | `#023939` | `#18172A` | `#18172A` | `#000000` |
| dimmer | `--token-color-component-dimmer-background` | `rgba(0 0 0 / 30%)` | `rgba(51 51 51 / 60%)` | `rgba(0 0 0 / 30%)` | `rgba(58 58 74 / 60%)` | `rgba(0 0 0 / 30%)` |
| progressbar | `--token-color-component-progressbar-neutral-onsubtle` | `#CCCCCC` | `#48484A` | `#D9D9E4` | `#3A3A4A` | `#CCCCCC` |
| switch | `--token-color-component-switch-action-disabled-ondark` | `#333333` | `#333333` | `#18172A` | `#18172A` | `#333333` |
| table | `--token-color-component-table-background-neutral-alternative` | `#FAFAFA` | `#333333` | `#FCFCFD` | `#3A3A4A` | `#FAFAFA` |
| tooltip | `--token-color-component-tooltip-background-neutral` | `#333333` | `#EBEBEB` | `#3A3A4A` | `#F2F2F7` | `#333333` |
