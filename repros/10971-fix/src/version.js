export const TITLE = "Tabs focus indicator for arrow keys after a click"
export const VERSION_LABEL = "PR #10971"
export const STEPS = [
  "Open this preview in Firefox.",
  "Click the \"Second\" tab with the mouse.",
  "Press ArrowRight, then Home."
]
export const EXPECTED =
  "Fixed. Firefox shows the focus indicator on \"Third\" and \"First\" (:focus-visible is true). Clicking a tab still shows none."
