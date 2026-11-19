export const TITLE = "Tabs focus indicator for arrow keys after a click"
export const VERSION_LABEL = "@dnb/eufemia 11.18.0"
export const STEPS = [
  "Open this preview in Firefox.",
  "Click the \"Second\" tab with the mouse.",
  "Press ArrowRight, then Home."
]
export const EXPECTED =
  "Bug in Firefox. Focus moves to \"Third\" and then \"First\", but no focus indicator is shown (:focus-visible stays false)."
