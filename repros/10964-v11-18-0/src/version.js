export const TITLE = "Tabs keyboard navigation after selectedKey changes"
export const VERSION_LABEL = "@dnb/eufemia 11.18.0"
export const STEPS = [
  "Click \"Select the last tab\". The app changes selectedKey, and focus stays on the button.",
  "Press Tab until the tab list has focus, then press ArrowLeft.",
  "Also try \"Select and focus the last tab\", then press ArrowLeft."
]
export const EXPECTED =
  "Bug. Arrow keys start from the previously selected \"First\", so ArrowLeft wraps around to \"Fourth\" instead of moving to \"Third\"."
