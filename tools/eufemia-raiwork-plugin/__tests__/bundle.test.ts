import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  buildRaiworkBundle,
  validateRaiworkBundle,
} from '../src/bundle.ts'
import { buildAgentPlugin } from '../src/agent-plugin.ts'
import { defaultPaths } from '../src/paths.ts'
import { verifyHostedMcp } from '../src/remote.ts'
import type { BuildPaths, RaiworkPluginManifest } from '../src/types.ts'

describe('Eufemia RAIWork plugin', () => {
  let temporaryRoot: string
  let paths: BuildPaths

  beforeEach(async () => {
    temporaryRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), 'eufemia-raiwork-plugin-')
    )
    paths = {
      ...defaultPaths,
      outputRoot: path.join(temporaryRoot, 'dnb-eufemia-web'),
    }
  })

  afterEach(async () => {
    await fs.rm(temporaryRoot, { recursive: true, force: true })
  })

  it('builds a minimal upload-ready plugin', async () => {
    const report = await buildRaiworkBundle(paths)

    expect(report).toMatchObject({
      bundleRoot: paths.outputRoot,
      fileCount: 10,
      skillCount: 6,
    })
    expect(report.totalBytes).toBeLessThan(50 * 1024 * 1024)

    const manifest = JSON.parse(
      await fs.readFile(
        path.join(paths.outputRoot, 'manifest.json'),
        'utf-8'
      )
    ) as RaiworkPluginManifest
    expect(manifest).toMatchObject({
      schema: 'raicode.marketplace/v1',
      name: 'dnb-eufemia-web',
      title: 'Eufemia Web',
      version: '0.1.0',
      icon: 'cover.png',
      homepage: 'https://eufemia.dnb.no',
      contents: {
        mcp_servers: [
          {
            name: 'eufemia',
            transport: 'http',
            endpoint_url: 'https://server.eufemia.dnb.no/mcp/web',
          },
        ],
        scripts: [],
      },
    })
    expect(manifest.contents.skills).toHaveLength(6)
  })

  it('builds a portable Agent Plugin with Claude compatibility', async () => {
    const agentPluginOutputRoot = path.join(temporaryRoot, 'eufemia')
    const report = await buildAgentPlugin({
      ...paths,
      agentPluginOutputRoot,
    })

    expect(report).toMatchObject({
      bundleRoot: agentPluginOutputRoot,
      skillCount: 6,
    })

    const openManifest = JSON.parse(
      await fs.readFile(
        path.join(agentPluginOutputRoot, 'plugin.json'),
        'utf-8'
      )
    )
    expect(openManifest).toMatchObject({
      $schema:
        'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
      name: 'eufemia',
      version: '0.1.0',
    })

    const claudeManifest = JSON.parse(
      await fs.readFile(
        path.join(agentPluginOutputRoot, '.claude-plugin', 'plugin.json'),
        'utf-8'
      )
    )
    expect(claudeManifest).toMatchObject({
      name: 'eufemia',
      displayName: 'Eufemia Web',
      version: '0.1.0',
    })

    const openMcp = JSON.parse(
      await fs.readFile(
        path.join(agentPluginOutputRoot, 'mcp.json'),
        'utf-8'
      )
    )
    expect(openMcp).toMatchObject({
      $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json',
      mcpServers: {
        eufemia: {
          type: 'streamable-http',
          url: 'https://server.eufemia.dnb.no/mcp/web',
        },
      },
    })

    const claudeMcp = JSON.parse(
      await fs.readFile(
        path.join(agentPluginOutputRoot, '.mcp.json'),
        'utf-8'
      )
    )
    expect(claudeMcp).toEqual({
      mcpServers: {
        eufemia: {
          type: 'http',
          url: 'https://server.eufemia.dnb.no/mcp/web',
        },
      },
    })

    const canonicalSkill = await fs.readFile(
      path.join(
        paths.canonicalSkillsRoot,
        'eufemia-components',
        'SKILL.md'
      ),
      'utf-8'
    )
    const generatedSkill = await fs.readFile(
      path.join(
        agentPluginOutputRoot,
        'skills',
        'eufemia-components',
        'SKILL.md'
      ),
      'utf-8'
    )
    expect(generatedSkill).toBe(canonicalSkill)
  })

  it('changes only skill frontmatter', async () => {
    await buildRaiworkBundle(paths)

    const canonical = await fs.readFile(
      path.join(
        paths.canonicalSkillsRoot,
        'eufemia-components',
        'SKILL.md'
      ),
      'utf-8'
    )
    const generated = await fs.readFile(
      path.join(
        paths.outputRoot,
        'skills',
        'eufemia-components',
        'SKILL.md'
      ),
      'utf-8'
    )
    const canonicalBody = canonical.replace(
      /^---\r?\n[\s\S]*?\r?\n---\r?\n?/,
      ''
    )
    const generatedBody = generated.replace(
      /^---\r?\n[\s\S]*?\r?\n---\r?\n?/,
      ''
    )

    expect(generatedBody).toBe(canonicalBody)
    expect(generated).toContain(
      'license: "Apache-2.0 with Commons Clause"'
    )
    expect(generated).toContain('version: "0.1.0"')
    expect(generated).toContain('platforms: ["darwin", "linux", "win32"]')
    expect(generated).not.toContain('compatibility:')
    expect(generated).not.toContain('owner: dnbexperience/eufemia')
  })

  it('rejects generated files that drift from canonical source', async () => {
    await buildRaiworkBundle(paths)
    await fs.appendFile(
      path.join(paths.outputRoot, 'skills', 'eufemia-review', 'SKILL.md'),
      '\nLocal change\n'
    )

    await expect(validateRaiworkBundle(paths)).rejects.toThrow(
      'Generated plugin file differs: skills/eufemia-review/SKILL.md'
    )
  })

  it('preserves the previous bundle when replacement fails', async () => {
    await buildRaiworkBundle(paths)
    const markerPath = path.join(paths.outputRoot, 'previous-bundle.txt')
    await fs.writeFile(markerPath, 'keep me')

    const originalRename = fs.rename.bind(fs)
    const rename = vi
      .spyOn(fs, 'rename')
      .mockImplementation(async (source, destination) => {
        if (
          source === `${paths.outputRoot}.tmp` &&
          destination === paths.outputRoot
        ) {
          throw Object.assign(new Error('Simulated rename failure'), {
            code: 'EACCES',
          })
        }
        return originalRename(source, destination)
      })

    try {
      await expect(buildRaiworkBundle(paths)).rejects.toThrow(
        'Simulated rename failure'
      )
      await expect(fs.readFile(markerPath, 'utf-8')).resolves.toBe(
        'keep me'
      )
    } finally {
      rename.mockRestore()
    }
  })

  it('rejects an incomplete canonical skill tree', async () => {
    const canonicalSkillsRoot = path.join(temporaryRoot, 'agent-skills')
    await fs.cp(paths.canonicalSkillsRoot, canonicalSkillsRoot, {
      recursive: true,
    })
    await fs.rm(
      path.join(canonicalSkillsRoot, 'eufemia-migrate', 'SKILL.md')
    )

    await expect(
      buildRaiworkBundle({ ...paths, canonicalSkillsRoot })
    ).rejects.toThrow(
      'Canonical skill is missing SKILL.md: eufemia-migrate'
    )
  })

  it('rejects secret-looking files in canonical skills', async () => {
    const canonicalSkillsRoot = path.join(temporaryRoot, 'agent-skills')
    await fs.cp(paths.canonicalSkillsRoot, canonicalSkillsRoot, {
      recursive: true,
    })
    await fs.writeFile(
      path.join(canonicalSkillsRoot, 'eufemia-review', '.env'),
      'NOT_A_REAL_SECRET=true\n'
    )

    await expect(
      buildRaiworkBundle({ ...paths, canonicalSkillsRoot })
    ).rejects.toThrow(
      'Secret-looking file is not allowed: skills/eufemia-review/.env'
    )
  })

  it('rejects a truncated PNG with a clear validation error', async () => {
    const coverPath = path.join(temporaryRoot, 'cover.png')
    await fs.writeFile(
      coverPath,
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    )

    await expect(
      buildRaiworkBundle({ ...paths, coverPath })
    ).rejects.toThrow('Invalid marketplace PNG: cover.png')
  })

  it('rejects a signature-only PNG with plausible dimensions', async () => {
    const coverPath = path.join(temporaryRoot, 'cover.png')
    const invalidPng = Buffer.alloc(24)
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(invalidPng)
    invalidPng.writeUInt32BE(1, 16)
    invalidPng.writeUInt32BE(1, 20)
    await fs.writeFile(coverPath, invalidPng)

    await expect(
      buildRaiworkBundle({ ...paths, coverPath })
    ).rejects.toThrow('Invalid marketplace PNG: cover.png')
  })

  it('accepts a hosted MCP with every required tool', async () => {
    const requiredTools = [
      'component_doc',
      'component_find',
      'component_props',
      'docs_meta',
      'docs_read',
      'docs_search',
      'review_rules',
    ]
    const fetchFunction: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          result: {
            tools: requiredTools.map((name) => ({ name })),
          },
        }),
        { headers: { 'content-type': 'application/json' } }
      )

    const report = await verifyHostedMcp(paths, fetchFunction)

    expect(report.requiredTools).toEqual(requiredTools)
    expect(report.missingOptionalTools).toEqual([])
  })

  it('rejects an incompatible hosted MCP', async () => {
    const fetchFunction: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          result: { tools: [{ name: 'docs_entry' }] },
        }),
        { headers: { 'content-type': 'application/json' } }
      )

    await expect(verifyHostedMcp(paths, fetchFunction)).rejects.toThrow(
      'Hosted Eufemia MCP is missing required tools'
    )
  })
})
