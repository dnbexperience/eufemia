# Software Bill of Materials (SBOM)

Every release of `@dnb/eufemia` is accompanied by a **Software Bill of
Materials (SBOM)** and a **vulnerability report**, attached to the GitHub
Release. The SBOM is also **cryptographically attested** (Sigstore-backed)
so its authenticity can be verified. This page explains what they are, where
to find them, and what they are for.

## What an SBOM is

An SBOM is a machine-readable inventory of every third-party component
that goes into the published library — its direct **and** transitive
production dependencies, each at its exact version. Think of it as
the ingredients list for a given `@dnb/eufemia` release.

Eufemia's SBOM is generated in the [CycloneDX](https://cyclonedx.org/)
1.6 JSON format — a widely supported standard that security scanners and
inventory tools (for example [Dependency-Track][dt], Grype or Trivy) can
read directly.

The **vulnerability report** is a companion file listing any known
advisories against those same production dependencies at release time —
security vulnerabilities as well as any deprecation notices.

[dt]: https://dependencytrack.org/

## Where it is stored

Both files are produced by the release workflow
([`.github/workflows/release.yml`](../.github/workflows/release.yml))
**after** the package is published, and are kept in two places:

| Location                                                              | File(s)                                                                   | Lifetime                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| The **GitHub Release** for the version (tag `v<version>`), as assets  | `sbom.cdx.json`, `vulnerability-report.json`, `dnb-eufemia-<version>.tgz` | Permanent — lives with the release |
| The release **workflow run artifact** `sbom-and-vulnerability-report` | `sbom.cdx.json`, `vulnerability-report.json`                              | 90 days                            |

The `.tgz` is the packed release artifact that the SBOM attestation is
bound to (see [Verifying the attestation](#verifying-the-attestation));
`npm` remains the canonical source for installing the package.

The GitHub Release is the durable, canonical copy. To fetch it for a
specific version:

```bash
# available on releases from this feature onwards; use the tag you need
gh release download vX.Y.Z --repo dnbexperience/eufemia \
  --pattern 'sbom.cdx.json' --pattern 'vulnerability-report.json'
```

(or download them from the release page under **Assets**).

## Verifying the attestation

The SBOM is signed with a [Sigstore][sigstore]-backed attestation issued
by the release workflow, so you can confirm it was produced by this
repository's CI and has not been tampered with. Download the packed
artifact from the release, then verify it.

`gh attestation verify` defaults to the SLSA provenance predicate, so pass
the CycloneDX SBOM predicate type explicitly — it carries the SBOM's spec
version (`v1.6` here):

```bash
gh release download vX.Y.Z --repo dnbexperience/eufemia \
  --pattern 'dnb-eufemia-*.tgz'

gh attestation verify dnb-eufemia-X.Y.Z.tgz --repo dnbexperience/eufemia \
  --predicate-type https://cyclonedx.org/bom/v1.6
```

To inspect the attested SBOM contents, add `--format json`:

```bash
gh attestation verify dnb-eufemia-X.Y.Z.tgz --repo dnbexperience/eufemia \
  --predicate-type https://cyclonedx.org/bom/v1.6 \
  --format json --jq '.[].verificationResult.statement.predicate'
```

This complements the [npm provenance][provenance] published with the
package itself.

[sigstore]: https://www.sigstore.dev/
[provenance]: https://docs.npmjs.com/generating-provenance-statements

## What it is used for

- **Supply-chain transparency** — see exactly which components, at which
  versions, make up a given release, without cloning or building it.
- **Vulnerability response** — when a new advisory lands on a
  dependency, the SBOM lets you check which shipped versions of
  `@dnb/eufemia` are affected and scope the impact quickly.
- **Automated scanning** — the CycloneDX file feeds straight into
  inventory and vulnerability-scanning tools.
- **Compliance** — DNB's _Requirements for Application Security_ (SECARC)
  require an SBOM and a vulnerability report for each release.

## Notes

- **Scope:** production (shipped) dependencies only, including
  transitive ones. Development and build tooling is excluded — it never
  reaches consumers.
- **Resolved versions:** the dependency tree is resolved in Eufemia's
  monorepo, so transitive versions reflect what Eufemia builds and tests
  against — including any dependency `resolutions` pinned at the
  repository root. A fresh install elsewhere may resolve some transitive
  dependencies to other versions within the same permitted ranges.
- The SBOM's main component is stamped with the version that was actually
  published, so the file is self-describing once downloaded.
- Generating these files is **non-blocking**. The gate that can stop a
  release is the pre-publish dependency audit, not this step; if
  generation ever fails, the release still completes and the artifacts
  can be regenerated afterwards.
