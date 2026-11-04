# DNB Sans fonts

Source: [DNB brand typography guidelines](https://bc.dnb.no/point/no/dnbvisualguidelines/component/default/763).
The official static release 26.302.1 was supplied on 4 November 2026 in
DNBSans-Statics-26.302.1. All active Text, Mono and Display TTF, WOFF and
WOFF2 binaries are unmodified. Their SHA-256 hashes are recorded in
[font-sources.json](font-sources.json).

| Family           | Font version | CSS family       |
| ---------------- | ------------ | ---------------- |
| DNB Sans Text    | 26.302.1     | DNB              |
| DNB Sans Mono    | 26.302.1     | DNBMono          |
| DNB Sans Display | 26.302.1     | DNB Sans Display |

Text and Mono provide Light, Regular, Medium and Bold, each with a genuine
italic. Regular italics are named DNBSansText-Italic and DNBSansMono-Italic;
other italics append Italic to the weight. Display has one upright face.
CSS weight mapping remains Light 300, Regular 400, Medium 500, Bold 600–700.
Display is deliberately registered at normal weight despite its internal
weight metadata. UI weights follow Eufemia Web in Figma: Regular buttons
and Medium Lead/Ingress. Display remains experimental and opt-in.

Regular Italic is named Italic for Office compatibility. The supplier
confirmed these executable font files as final for implementation; editable
source files are not part of the distribution.

## Official webfonts and downloads

Styles load the official files directly from this directory. The supplied
TrueType outlines and matching hhea, OS/2 typo and Windows line metrics
(950, -250, 0; Windows 950/250) are embedded in every format.
USE_TYPO_METRICS is enabled. No CSS metric
overrides or font binary modifications are needed.

Each family ZIP contains exactly the matching TTF, WOFF and WOFF2 binaries
in this directory. This release has no official OTF files. Do not mix older
OTFs into these downloads. Text advances are retained, but updated italic
kerning can change wrapping. Mono fixes some italic advances and ligature
widths, so code wrapping can change too.

The `DNB-*` and `DNBMono-*` files and their ZIPs remain byte-for-byte unchanged
for existing public URLs and direct package imports.
Remove published legacy assets only with separate migration guidance.

The supplied Variable, Eiendom and Ung families are not registered or bundled.
Variable is intended for separately configured animation use, not as a
replacement for Eufemia's static UI families. Existing theme choices remain.

## Skeleton build

Run yarn skeleton:font from packages/dnb-eufemia. It reads the official Text,
Mono and Display TTFs and writes matching skeletons to skeleton/. The
skeleton generator preserves advances, shaping tables and embedded metrics;
only skeleton outlines, names and metric hinting are generated. Its webfont
encoder is not used to rewrite the official font files.

Display still needs care with multiline accented headlines: 110% line height
can overlap. Check the actual words and widths and increase spacing when
needed. Some Mono per-mille glyphs and Display subscript parentheses extend
below the declared Windows descent. Browser compatibility tests do not
certify desktop applications or PowerPoint font installation and export.
