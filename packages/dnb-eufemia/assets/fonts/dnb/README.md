# DNB Sans fonts

Source: [DNB brand typography guidelines](https://bc.dnb.no/point/no/dnbvisualguidelines/component/default/763).
Downloaded from the official family archives on 30 October 2026. Official
font files are unmodified. Download ZIPs contain those files without OS metadata.

| Family        | Font version | Files                                           | CSS family |
| ------------- | ------------ | ----------------------------------------------- | ---------- |
| DNB Sans Text | 26.159.1     | DNBSansText-{Light,Regular,Medium,Bold}[Italic] | DNB        |
| DNB Sans Mono | 26.133.1     | DNBSansMono-{Light,Regular,Medium,Bold}[Italic] | DNBMono    |

Text and Mono provide WOFF2, WOFF, TTF and OTF for every weight and italic.
CSS weight mapping is deliberate: Light 300, Regular 400, Medium 500, Bold 600–700. This preserves
Eufemia's existing 600 Bold token and supports native CSS bold. The source
files' internal weight metadata is not used to select faces in CSS.

The `DNB-*` and `DNBMono-*` files and their ZIPs remain available for existing
public URLs and direct package imports. Current styles use only `DNBSansText-*`
and `DNBSansMono-*`. Remove legacy assets only in a separately
announced breaking change with migration guidance.

Regular, Medium and Light Text outlines, character widths and mappings match
the previous Text files. Bold outlines have changed. The new files enable
USE_TYPO_METRICS. Text, Mono and their skeleton faces use explicit CSS metrics
(ascent 95%, descent 25%, line gap 0%) to retain the established line boxes
across browsers. These values match the previous 950/−250 metrics at 1,000
units per em. The official binaries remain unchanged. Mono retains character
coverage and widths. Skeleton fonts keep the existing widths; their generator
reads the current Text and Mono sources.
