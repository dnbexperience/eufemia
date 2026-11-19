# Tabs focus indicator for arrow keys after a click: PR #10971

Reproduction for [dnbexperience/eufemia#10971](https://github.com/dnbexperience/eufemia/pull/10971).

1. Open this preview in Firefox.
2. Click the "Second" tab with the mouse.
3. Press ArrowRight, then Home.

The status below the tabs shows the selected key, the focused element, and whether it matches `:focus-visible`.

**Expected here:** Fixed. Firefox shows the focus indicator on "Third" and "First" (:focus-visible is true). Clicking a tab still shows none.
