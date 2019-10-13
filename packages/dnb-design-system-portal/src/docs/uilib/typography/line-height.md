---
title: 'Line Height'
draft: false
order: 2
---

# Line Height

## Default `line-height` **rem** table

| Pixel | Type      | Rem        | Custom Property         | Info |
| ----- | --------- | ---------- | ----------------------- | ---- |
| 24px  | `default` | **1.5rem** | `--line-height-default` | Body |

## Additional `line-height` **em** table

| Pixel | Type          | Em        | Custom Property             | Info |
| ----- | ------------- | --------- | --------------------------- | ---- |
| 24px  | `default--em` | **1.5em** | `--line-height-small--em` |      |
|       |               |           |                             |      |

### How to use the line heights (CSS)

```css
/* I have a default height */
.dnb-p {
  line-height: var(--line-height-default); /* 1.5rem - 24px */
}
```
