# Eufemia RAIWork marketplace plugin

Builds the upload-ready RAIWork marketplace plugin for Eufemia from canonical
source in this repository.

The generated plugin contains:

- The official Eufemia Agent Skills from
  `packages/dnb-eufemia/agent-skills/`.
- A registration for the hosted Eufemia MCP endpoint.
- Consumer documentation, the Eufemia license, and Eufemia cover art.

It contains no scripts, hooks, local MCP launcher, binaries, secrets, or copied
Eufemia API documentation.

## Ownership model

Eufemia remains the source of truth:

- Skill procedures are authored in `packages/dnb-eufemia/agent-skills/`.
- Component APIs, theme capabilities, review rules, and documentation are
  provided by Eufemia and its hosted MCP server.
- This tool owns only RAIWork marketplace metadata, packaging, and validation.
- `dist/` is generated and must not be committed.

Do not edit generated skills. Update the canonical skill or
`plugin.config.json`, then rebuild.

## Build

From the repository root:

```bash
yarn workspace eufemia-raiwork-plugin build
```

The upload folder is generated at:

```text
tools/eufemia-raiwork-plugin/dist/dnb-eufemia/
```

RAIWork packages the selected folder during upload, so the build does not
create a separate archive.

## What the generator does

1. Reads `packages/dnb-eufemia/agent-skills/manifest.json`.
2. Requires marketplace metadata for every canonical skill.
3. Copies every skill and future supporting file.
4. Replaces only `SKILL.md` frontmatter with the limited RAIWork-compatible
   metadata shape. Skill bodies remain byte-for-byte identical.
5. Generates the strict `raicode.marketplace/v1` plugin manifest.
6. Registers `https://server.eufemia.dnb.no/mcp/web` as a remote HTTP MCP
   server.
7. Copies the package license, Eufemia cover image, and plugin README.
8. Replaces the previous generated folder through a backup-and-restore swap, so
   a failed promotion keeps the previous bundle intact.
9. Validates the complete generated inventory against its canonical source.

## Validation

Run offline validation without regenerating:

```bash
yarn workspace eufemia-raiwork-plugin validate
```

It verifies:

- Strict plugin and skill names, versions, titles, descriptions, tags, and
  platforms.
- One HTTPS MCP server and no executable scripts.
- No symlinks, unsupported file types, or secret-looking files.
- Marketplace file-count and uncompressed-size limits.
- Raster cover format, dimensions, and size.
- Exact generated file inventory and content.
- Exact correspondence between marketplace skills and canonical skills.

Run unit, type, and lint checks:

```bash
yarn workspace eufemia-raiwork-plugin test
yarn workspace eufemia-raiwork-plugin test:types
yarn workspace eufemia-raiwork-plugin lint
```

## Verify the hosted MCP

The skills declare their required MCP tools in the canonical manifest. Verify
the hosted server before every marketplace release:

```bash
yarn workspace eufemia-raiwork-plugin verify:remote
```

Every tool declared by a canonical skill is required. A missing tool fails the
command and blocks marketplace release until the hosted Eufemia MCP deployment
matches the skill contract.

Run every release check in one command:

```bash
yarn workspace eufemia-raiwork-plugin release:check
```

Network verification is intentionally separate from normal tests so local and
CI builds remain deterministic and work offline.

## Versioning

The marketplace plugin has an independent semantic version in
`plugin.config.json`.

Bump it whenever any installed artifact changes:

- Skill instructions or marketplace metadata.
- Plugin README, license, or cover image.
- Hosted MCP registration or required tool contract.
- Generated manifest structure.

A normal Eufemia documentation or component release does not require a plugin
release when the hosted MCP contract and skill procedures are unchanged.

The marketplace rejects publishing the same plugin version twice. Always review
the generated diff and bump the plugin version before uploading an update.

## Release prerequisites

Before the first marketplace release:

1. Merge and release the canonical Eufemia Agent Skills.
2. Deploy the hosted Eufemia MCP server with every required tool. Do not release
   the plugin against a partial or rolling tool deployment.
3. Agree which design-system-team-managed identity will reserve and own the
   marketplace name `dnb-eufemia`. Marketplace ownership belongs to the first
   uploader.
4. Run the cases in `packages/dnb-eufemia/agent-skills-evals` when skill
   instructions or descriptions changed. Record trigger accuracy, assertion
   pass rate, token usage, duration, and human feedback in the release record.
5. Run `release:check` from a clean checkout.
6. Review the generated `manifest.json`, skill frontmatter, README, license,
   cover, and file inventory.

## Upload and publish

The marketplace currently uses folder upload rather than repository-driven
publishing.

### RAIWork UI

1. Open **Marketplace → My Uploads → Upload**.
2. Select `tools/eufemia-raiwork-plugin/dist/dnb-eufemia`.
3. Upload privately first.
4. Wait for manifest validation, secret scanning, malware scanning, and the
   safeguard scan.
5. Inspect the result and make the version public when it is ready.

### Marketplace-enabled CLI

When using a RAIWork distribution of `raicode` that includes marketplace
management:

```bash
raicode manage marketplace upload \
  tools/eufemia-raiwork-plugin/dist/dnb-eufemia
```

Private is the default. Add `--public` only when the release should be visible
immediately after scanning. The desktop upload flow and CLI use the same packer
and safety validation.

## Installation behavior

RAIWork selects bundled skills by default. Remote MCP servers are not selected
by default and require explicit user consent.

The storefront description and generated README therefore tell users to enable
the **eufemia** MCP row. RAIWork merges the approved endpoint into the user's
configuration without replacing an existing MCP entry with the same name.

## Downstream migration and routing

After the first private marketplace release is verified, owners of the audited
DNB frontend agent plugin should:

1. Link to the discoverable `dnb-eufemia` marketplace entry rather than copying
   its skills, component APIs, tokens, theme claims, accessibility requirements,
   or review rules.
2. Remove unsupported Eufemia claims, including full Carnegie dark-mode support
   and blanket product-library precedence.
3. Route production DNB frontend implementation and review to the official
   Eufemia skills and MCP server.
4. Keep generic visual-exploration skills explicitly labeled as exploratory and
   outside production DNB/Eufemia compliance guidance.
5. Track remaining product-specific conventions in the owning product or
   platform backlog rather than adding them to Eufemia.

This repository owns the upstream contract and marketplace artifact. The
downstream plugin owner owns that migration after the marketplace identifier is
reserved and available.

## Post-release checks

After publication:

1. Install the plugin in a clean RAIWork profile.
2. Enable the `eufemia` MCP server during consent.
3. Confirm all five skills are discoverable.
4. Confirm the MCP tools can be listed and called.
5. Run the canonical trigger and non-trigger prompts from
   `packages/dnb-eufemia/agent-skills-evals/trigger-cases.json`.
6. Confirm production DNB frontend requests select Eufemia guidance rather than
   generic visual-exploration skills.
7. Run the output evaluations for every changed skill against a baseline.
8. Record the published plugin version, Eufemia source commit, grading,
   benchmark, and human feedback in the release record.

## Rollback

Marketplace versions are immutable. To fix a release:

1. Correct the canonical source or marketplace metadata.
2. Bump the plugin version.
3. Run the full release check.
4. Upload the replacement version.
5. Deprecate or unpublish the affected version through marketplace governance.

Never overwrite a generated bundle manually or attempt to reuse a published
version number.
