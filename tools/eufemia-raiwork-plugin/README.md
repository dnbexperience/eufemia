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
8. Atomically replaces the previous generated folder.
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

Missing required tools fail the command. Missing optional tools are reported as
warnings so a plugin can remain compatible while a new Eufemia MCP capability
is rolling out.

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
2. Deploy the hosted Eufemia MCP server with every required tool.
3. Agree which design-system-team-managed identity will reserve and own the
   marketplace name `dnb-eufemia`. Marketplace ownership belongs to the first
   uploader.
4. Run `release:check` from a clean checkout.
5. Review the generated `manifest.json`, skill frontmatter, README, license,
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

## Post-release checks

After publication:

1. Install the plugin in a clean RAIWork profile.
2. Enable the `eufemia` MCP server during consent.
3. Confirm all five skills are discoverable.
4. Confirm the MCP tools can be listed and called.
5. Run representative trigger and non-trigger prompts.
6. Confirm production DNB frontend requests select Eufemia guidance rather than
   generic visual-exploration skills.
7. Record the published plugin version and Eufemia source commit in the release
   record.

## Rollback

Marketplace versions are immutable. To fix a release:

1. Correct the canonical source or marketplace metadata.
2. Bump the plugin version.
3. Run the full release check.
4. Upload the replacement version.
5. Deprecate or unpublish the affected version through marketplace governance.

Never overwrite a generated bundle manually or attempt to reuse a published
version number.
