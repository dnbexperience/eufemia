---
title: 'Line Height'
draft: false
order: 3
---

# Line Height

## Default `line-height` **rem** table

| Pixel | Type      | Rem          | Custom Property         | Info |
| ----- | --------- | ------------ | ----------------------- | ---- |
| 22px  | `small`   | **1.375rem** | `--line-height-small`   |      |
| 24px  | `basis`   | **1.5rem**   | `--line-height-basis`   | Body |
| 32px  | `medium`  | **2rem**     | `--line-height-medium`  |      |
| 48px  | `large`   | **3rem**     | `--line-height-large`   |      |
| 56px  | `x-large` | **3.5rem**   | `--line-height-x-large` |      |

<!-- - Used for `<h5>` and `<h6>`, who are not a part of the design sytem. -->

## Additional `line-height` **em** table

| Pixel | Type          | Em        | Custom Property             | Info |
| ----- | ------------- | --------- | --------------------------- | ---- |
| 16px  | `x-small--em` | **1em**   | `--line-height-x-small--em` |      |
| 24px  | `basis--em`   | **1.5em** | `--line-height-basis--em`   |      |
|       |               |           |                             |      |

### How to use the line heights (CSS)

```css
/* I have a default height */
.dnb-p {
  line-height: var(--line-height-basis); /* 1.5rem - 24px */
}
```
