---
title: 'Line Height'
draft: false
order: 2
---

# Line Height

## Default `line-height` **rem** table

| Pixel | Type       | Rem          | Custom Property          | Info |
| ----- | ---------- | ------------ | ------------------------ | ---- |
| 16px  | `x-small`  | **1rem**     | `--line-height-x-small`  |      |
| 20px  | `small`    | **1.25rem**  | `--line-height-small`    |      |
| 22px  | `medium`   | **1.375rem** | `--line-height-medium`   |      |
| 24px  | `default`  | **1.5rem**   | `--line-height-default`  | Body |
| 28px  | `large`    | **1.75rem**  | `--line-height-large`    |      |
| 32px  | `x-large`  | **2rem**     | `--line-height-x-large`  |      |
| 52px  | `xx-large` | **3.5rem**   | `--line-height-xx-large` |      |

## Additional `line-height` **em** table

| Pixel | Type          | Em        | Custom Property             | Info |
| ----- | ------------- | --------- | --------------------------- | ---- |
| 16px  | `x-small--em` | **1.5em** | `--line-height-x-small--em` |      |
| 24px  | `default--em` | **1.5em** | `--line-height-default--em` |      |
|       |               |           |                             |      |

### How to use the line heights (CSS)

```css
/* I have a default height */
.dnb-p {
  line-height: var(--line-height-default); /* 1.5rem - 24px */
}
```
