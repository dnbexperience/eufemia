export const TITLE = "Tabs keyboard navigation after selectedKey changes"
export const VERSION_LABEL = "PR #10964"
export const STEPS = [
  "Click \"Select the last tab\". The app changes selectedKey, and focus stays on the button.",
  "Press Tab until the tab list has focus, then press ArrowLeft.",
  "Also try \"Select and focus the last tab\", then press ArrowLeft."
]
export const EXPECTED =
  "Fixed. ArrowLeft moves from the selected \"Fourth\" to \"Third\" in both cases, and changing selectedKey does not move focus."
