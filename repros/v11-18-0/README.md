# Tabs focus outline reproduction: @dnb/eufemia 11.18.0

Reproduction for [dnbexperience/eufemia#10958](https://github.com/dnbexperience/eufemia/pull/10958).

1. Click **Focus the first tab** with the mouse.
2. Click **Select and focus the last tab** with the mouse.

Both buttons move focus to a tab without a key press, so `data-whatinput` stays `mouse`. The status below the tabs shows `data-whatinput`, whether the tab matches `:focus-visible`, and its margin.

**Expected here:** The outline appears, but the margin stays `0px`, so it is clipped on the left of the first tab and on the right of the last tab.
