# Tabs focus indicator for arrow keys after a click: @dnb/eufemia 11.18.0

Reproduction for [dnbexperience/eufemia#10971](https://github.com/dnbexperience/eufemia/pull/10971).

1. Open this preview in Firefox.
2. Click the "Second" tab with the mouse.
3. Press ArrowRight, then Home.

The status below the tabs shows the selected key, the focused element, and whether it matches `:focus-visible`.

**Expected here:** Bug in Firefox. Focus moves to "Third" and then "First", but no focus indicator is shown (:focus-visible stays false).
