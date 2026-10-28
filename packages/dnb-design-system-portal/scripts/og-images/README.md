# Portal social images

Component, extension and element pages with a visible, compact live demo are eligible. The Demos tab is preferred when available. Mark one ComponentBox with socialPreview to choose its specimen explicitly. Otherwise, the first demo is used. The selected demo is tried at compact, wider and native widths before it is rejected. Selection never falls through to a later demo or a nested field group. Hidden or clipped examples get no screenshot and are reported in the generator output. Choose a populated example explicitly for Value pages, or a suitable static example for animated components. Tabs reuse their parent image.

    <ComponentBox socialPreview>
      <Button text="Continue" />
    </ComponentBox>

Use socialPreview="stack" for a horizontal flex group that should stack only in its screenshot. The capture uses a compact vertical gap, centers the children and removes child margins; the documentation layout is unchanged.

Use socialPreview={false} on one demo when no demo shows the component itself, for example because it renders into a portal. The page then uses the default image instead of a component screenshot.

Only one demo per page may be marked, with true or false. Multiple markers are reported as an error. Reordering other examples does not change an explicitly marked preview.

Pages provide their title and description through Open Graph and Twitter Card metadata. Pages with a component screenshot use it. Other pages use the shared Eufemia wordmark at /dnb/og-image.png. The 1200 × 630 fallback keeps its 480px-wide wordmark centered for square and landscape crops. The fallback is a static Portal asset, so it changes with normal Portal deployments and does not need weekly generation. No extra label/value fields are emitted.

Captures start after the page has been quiet for 500 ms (at most 5 s), with fixed page chrome such as the Portal header hidden. A screenshot is kept only if the specimen did not move while it was taken. Demos are captured at 4× resolution. Unused outer space is trimmed. Screenshots are centered on a 1200 × 630 canvas with the light demo grid, with the complete specimen inside a central 534 × 534 area. This retains the specimen in centered crops from 1:1 through 2:1. Receiving apps control the actual crop. Small specimens can grow up to 2× their normal size in a 600px-wide preview; large specimens shrink proportionally. Transparent captures preserve the component over the grid, including its opaque surfaces. PNGs are optimized losslessly.

## Storage and asset hosting

Generated PNGs and captures are not committed to the code branch or an assets branch. The generator writes .og-catalogue locally, which is ignored by Git. The durable catalogue, reusable captures and immutable PNGs are published in the existing Eufemia assets S3 bucket under the independent og/ namespace. Public PNG URLs use https://assets.eufemia.dnb.no/og/images/<content-hash>.png through the existing CloudFront and Akamai setup, like the standalone logos/ publisher. No new bucket or hostname is required.

The CDN catalogue at /og/manifest.json has a short cache lifetime. PNGs use content hashes and old image URLs are retained. The publisher uploads PNGs with a one-year immutable cache policy. The internal GitHub Enterprise assets repository publishes through AWS OIDC. Only its restore and publish jobs can use AWS, and they run Node built-ins and the AWS CLI. The renderer and its workspace dependencies run in a separate job without AWS access, and the publish job validates the rendered catalogue and PNGs before uploading them. The public workflow dispatches the internal publisher using GHE_ASSETS_DEPLOY_REPO and GHE_DEPLOY_PAT; the public workflow has no AWS credentials. The internal publisher requires the requested source revision to match current public main before running the renderer. The main asset publisher reserves og/ and cannot delete it while syncing fonts, icons or release assets.

Release and PR preview builds fetch the CDN manifest and install only its image references. PNGs are not downloaded into the Portal build. If the manifest cannot be fetched, the build reports a warning and its pages use the default image; the next OG publication adds the images to the deployed Portal. The checked-in static/og/manifest.json is empty. Actions artifacts are retained for review reports and the deployed Portal snapshot, not as the authoritative image catalogue.

## Weekly and manual updates

The public workflow runs Mondays at 05:23 UTC or through manual dispatch. It does not run on pushes or after releases. Manual publish defaults to true; set it to false to generate review artifacts without changing S3 or the site.

The job requests the internal publisher, which restores the S3 catalogue with the images and captures it references, checks deployed page assets and rendering fingerprints, and regenerates changed or missing images. Unchanged images are reused. Chromium is installed only when captures are needed. Temporary capture failures preserve an existing screenshot and retry later. Unsuitable specimens are skipped until their inputs change.

The publisher uploads and validates PNGs before updating the catalogue. The public workflow waits until its publication identifier appears on the public CDN, restores that manifest, and updates image metadata in the exact deployed Portal snapshot. Application assets and page bodies are preserved. The updated snapshot is deployed immediately to GitHub Pages; no library release or Portal rebuild is needed. A deployment marker identifies the source snapshot, which is checked again before publication. Only the final deployment job shares the Pages deployment queue with normal releases, so generation does not delay a release deployment.

Each normal Portal release stamps and retains a portal-og-site snapshot for 90 days. Each successful OG publication retains its updated snapshot and renews that lifetime. The first production publication requires one normal Portal deployment containing this workflow. If its snapshot expires or the deployed snapshot changes during generation, the OG publication fails rather than publishing an older site.

## Local use

From the repository root on Node 24 with workspace dependencies installed:

    node packages/dnb-design-system-portal/scripts/og-images/cdn.mts
    node packages/dnb-design-system-portal/scripts/og-images/generate.mts plan
    node packages/dnb-design-system-portal/scripts/og-images/generate.mts render
    node packages/dnb-design-system-portal/scripts/og-images/install.mts
    yarn workspace dnb-design-system-portal test:og-images

The E2E workflow runs the OG regression suite after installing Playwright browsers. Deployment marker checks and stamping use only Node built-ins, so the final publishing job needs no workspace dependencies.

Snapshot restoration uses gh and an authenticated GitHub session. S3 publishing runs in the internal assets workflow; local AWS operations can use an authenticated CLI profile. OG_OUTPUT selects the catalogue directory. OG_ONLY selects comma-separated routes. OG_MODE=missing preserves valid screenshots and repairs missing files. OG_ORIGIN permits production or localhost fixtures. OG_STATIC_OUTPUT selects where install.mts copies verified images. OG_SITE_OUTPUT selects the snapshot directory for OG metadata preparation.
