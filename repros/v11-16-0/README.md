# Tabs focus outline reproduction: @dnb/eufemia 11.16.0

Reproduction for [dnbexperience/eufemia#10958](https://github.com/dnbexperience/eufemia/pull/10958).

1. Press `Tab` until a tab has focus, then click that same tab with the mouse and move the pointer away.
2. Or click **Focus the first tab** or **Select and focus the last tab** with the mouse. These buttons keep focus where it is on mousedown and move focus to a tab from script.

In both cases `data-whatinput` is `mouse` while the tab still has visible focus. The status below the tabs shows `data-whatinput`, whether the tab matches `:focus-visible`, and its margin.

**Expected here:** No focus ring to clip. Before 11.18.0 the ring is only shown when `data-whatinput` is `keyboard`, so only the subtle focus background and the blue label appear. The edge of that background is cut off slightly.
