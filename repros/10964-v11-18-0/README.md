# Tabs keyboard navigation after selectedKey changes: @dnb/eufemia 11.18.0

Reproduction for [dnbexperience/eufemia#10964](https://github.com/dnbexperience/eufemia/pull/10964).

1. Click "Select the last tab". The app changes selectedKey, and focus stays on the button.
2. Press Tab until the tab list has focus, then press ArrowLeft.
3. Also try "Select and focus the last tab", then press ArrowLeft.

The status below the tabs shows the selected key, the focused element, and whether it matches `:focus-visible`.

**Expected here:** Bug. Arrow keys start from the previously selected "First", so ArrowLeft wraps around to "Fourth" instead of moving to "Third".
