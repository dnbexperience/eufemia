# DNB Sans fonts

Source: [DNB brand typography guidelines](https://bc.dnb.no/point/no/dnbvisualguidelines/component/default/763).
Downloaded from the official family archives on 30 October 2026. Source
font files and download ZIPs are unmodified. Eufemia loads derived webfonts
from `web/`; see the webfont build below.

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

The current web fonts include updated Medium and Bold details and genuine
italics. The Regular, Medium and Light Text TTF outlines match the previous
TTFs, but the previously served Medium WOFF2 was an older build. The current
official WOFF2 and WOFF files use CFF outlines instead of the previous
TrueType outlines. The derived webfonts retain the official TTF outlines.

The official files enable USE_TYPO_METRICS and have different hhea and typo
metrics. The derived webfonts align these embedded metrics to retain the
legacy line box and baseline without CSS metric overrides.

The official binaries remain unchanged. Mono retains character coverage and
widths. Skeleton fonts keep the existing widths; their generator reads the
current Text and Mono sources.

## Webfont build

The web build under `web/` starts from
all 16 official Text and Mono TTF files and aligns the typo ascent,
descent and line gap with the existing hhea values (950, -250, 0). It keeps
USE_TYPO_METRICS enabled and preserves outlines, hinting and names. The
original font files and ZIP downloads remain unchanged.

Regenerate with `node scripts/tools/createWebFonts.ts` from the Eufemia
package directory. The styles load these generated files without CSS ascent,
descent or line-gap overrides. The generator updates only the typo values and
required checksums before compression. WOFF2 compression omits the original
empty DSIG table. Use these derived files for manual preloads and self-hosting
with Eufemia's styles.
