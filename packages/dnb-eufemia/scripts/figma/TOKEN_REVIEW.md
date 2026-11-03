# Design token review

Run from the repository root:

    yarn workspace @dnb/eufemia make-properties
    yarn workspace @dnb/eufemia review:tokens origin/main

An optional second argument writes the Markdown report to a file. The report compares the current generated files, including uncommitted changes, with the merge base of HEAD and the supplied base ref. Use the actual target branch when reviewing a stacked PR.

The report lists resolved values for every changed semantic token in DNB light/dark, Sbanken light/dark and Carnegie light. Eiendom currently imports the DNB token palette. Foundation aliases and opacity compositions are resolved, so equivalent rgba and color-mix declarations do not appear as color changes.

The checked pairs are listed in tokenReview.ts:

- Main, secondary, action and error text on neutral and information surfaces: 4.5:1.
- Information icons and strokes: 3:1.
- Neutral UI fills on their parent surfaces: 1.01:1, to detect a fill becoming identical to its background. This is a visibility check, not a WCAG requirement.

A pair below its target fails the review only when its contrast decreases compared with the base. Existing failures and improvements that remain below the target are still listed. This allows focused fixes without hiding known limitations or accepting new regressions. It is not a full accessibility audit: component states, effective font sizes, custom overrides and nested surfaces still need browser review.

The sync workflow publishes the report in its job summary and PR comment. The PR workflow also generates the source exports before checking them and publishes its report in the job summary. Unsupported colors, unresolved references and cyclic aliases fail the review rather than producing an incomplete report.
