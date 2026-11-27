# Design token review

Run from the repository root:

    yarn workspace @dnb/eufemia prebuild:figma:tokens:ci
    yarn workspace @dnb/eufemia review:tokens origin/main

An optional second argument writes the Markdown report to a file. The report compares the current generated files, including uncommitted changes, with the merge base of HEAD and the supplied base ref. Use the actual target branch when reviewing a stacked PR.

The report lists resolved values for every changed semantic token in DNB, Sbanken, Eiendom and transitional Coconut/Birdhouse light/dark, and Carnegie light. Birdhouse is the hidden preview of the new Eiendom identity. When the base revision predates Birdhouse, its tokens are compared with legacy Eiendom from that revision. Foundation aliases and opacity compositions are resolved, so equivalent rgba and color-mix declarations do not appear as color changes.

The checked pairs are listed in tokenReview.ts:

- Main, secondary, action and error text on neutral and information surfaces: 4.5:1.
- Information icons, strokes and focus outlines: 3:1.
- Neutral UI fills on their parent surfaces: 1.01:1, to detect a fill becoming identical to its background. This is a visibility check, not a WCAG requirement.

A transparent background is composited over the pair's transparency background, which defaults to the page background. The transparency background is then also part of the pair.

A pair regresses when it is below its target and either passed before or lost contrast. Existing failures and improvements that remain below the target are listed, but do not fail.

make-properties generates the theme files from the Figma exports and src/style/themes/figma/makeProperties.lock.json only, so the generated files can always be recreated. The lock file lists the tokens that keep a previous value. Like yarn.lock, it is only updated when new data is fetched, and is committed together with the exports and generated files.

prebuild:figma:tokens:ci first checks that make-properties does not change the generated files. If it does, commit the regenerated files and fetch again. It then fetches the exports and runs make-properties --update-lock, which uses the generated files on disk as the previous values and holds back as few tokens as it can to prevent regressions. Each pair is checked with the previous and new value of each changed token in it:

1. A token is locked to its previous value when no passing combination uses its new value, and locked to its new value when every passing combination uses it. A token is also locked to its previous value when keeping its new value would, through other pairs, leave a pair with no passing combination. This repeats until nothing changes.
2. The remaining tokens are decided one at a time, repeating step 1 after each decision. One pass holds back the token whose new value forces the most other tokens back. Another pass keeps the new value of the token that forces the fewest. The result that holds back fewer tokens is used. Finally, each held back token whose new value passes is released again.

The cost grows with the number of pairs, not with the size of the token set. The result is not always the smallest possible set, but no pair regresses.

The held back tokens are written to the lock file and listed first in the report, with the rejected value, the contrast before and with the rejected value, and the held back token that caused it, if any. The review fails only if the generated files still contain a regression. It is not a full accessibility audit: component states, effective font sizes, custom overrides and nested surfaces still need browser review.

The report also lists tokens that newly reference a foundation color from another brand, such as a Carnegie token using a DNB color. These are generated as Figma defines them; the list is a prompt to confirm in Figma that they are intended.

The sync workflow publishes the report in its job summary and PR comment. The sync workflow can skip make-properties and lock file generation to debug a failing run. It then commits only the exports, and make-properties --update-lock can be run locally once the cause is fixed. The PR workflow reviews the committed files and publishes its report in the job summary. It then runs make-properties and fails if the committed files differ from its output, so generated files are never edited by hand. It does not run on pull requests into release branches, because those only bundle token changes that were already reviewed in earlier pull requests. Unsupported colors, unresolved references and cyclic aliases fail the review rather than producing an incomplete report.
