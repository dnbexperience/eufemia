# Tabs focus outline reproduction: @dnb/eufemia 11.18.0

Reproduction for [dnbexperience/eufemia#10958](https://github.com/dnbexperience/eufemia/pull/10958).

1. Press `Tab` until a tab has focus, then click that same tab with the mouse and move the pointer away.
2. Or click **Focus the first tab** or **Select and focus the last tab** with the mouse. These buttons keep focus where it is on mousedown and move focus to a tab from script.

In both cases `data-whatinput` is `mouse` while the tab still has visible focus. The status below the tabs shows `data-whatinput`, whether the tab matches `:focus-visible`, and its margin.

**Expected here:** The outline appears, but the margin stays `0px`, so it is clipped on the left of the first tab and on the right of the last tab.
