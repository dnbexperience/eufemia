import fs from 'node:fs/promises'
import {
  collectFiles,
  isSecretLookingPath,
  readPluginSource,
  replaceBundleSafely,
} from './bundle.ts'
import type { BuildPaths, ValidationReport } from './types.ts'

const PLUGIN_SCHEMA =
  'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json'
const MCP_SCHEMA =
  'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json'

const toJson = (value: unknown) =>
  Buffer.from(`${JSON.stringify(value, null, 2)}\n`)

const createExpectedFiles = async (paths: BuildPaths) => {
  const { canonicalManifest, config, canonicalFiles } =
    await readPluginSource(paths)
  const { plugin } = config
  const metadata = {
    name: plugin.agentPluginName,
    version: plugin.version,
    description: plugin.description,
    author: { name: 'DNB' },
    homepage: plugin.homepage,
    repository: plugin.repository,
    license: plugin.license,
    keywords: plugin.tags,
  }
  const files = new Map<string, Buffer>()

  files.set(
    'plugin.json',
    toJson({
      $schema: PLUGIN_SCHEMA,
      ...metadata,
    })
  )
  files.set(
    '.claude-plugin/plugin.json',
    toJson({
      ...metadata,
      displayName: plugin.title,
    })
  )
  files.set(
    'mcp.json',
    toJson({
      $schema: MCP_SCHEMA,
      mcpServers: {
        [plugin.mcp.name]: {
          type: 'streamable-http',
          url: plugin.mcp.endpointUrl,
        },
      },
    })
  )
  files.set(
    '.mcp.json',
    toJson({
      mcpServers: {
        [plugin.mcp.name]: {
          type: 'http',
          url: plugin.mcp.endpointUrl,
        },
      },
    })
  )
  files.set('README.md', await fs.readFile(paths.pluginReadmePath))
  files.set('LICENSE', await fs.readFile(paths.licensePath))

  for (const [relativePath, content] of canonicalFiles) {
    files.set(`skills/${relativePath}`, content)
  }

  return { canonicalManifest, files }
}

export async function validateAgentPlugin(
  paths: BuildPaths
): Promise<ValidationReport> {
  const { canonicalManifest, files: expectedFiles } =
    await createExpectedFiles(paths)
  const actualFiles = await collectFiles(paths.agentPluginOutputRoot)

  const expectedPaths = Array.from(expectedFiles.keys()).sort()
  const actualPaths = Array.from(actualFiles.keys()).sort()
  if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) {
    throw new Error(
      'Generated Agent Plugin file inventory differs from its source'
    )
  }

  let totalBytes = 0
  for (const [relativePath, expected] of expectedFiles) {
    const actual = actualFiles.get(relativePath)
    if (!actual?.equals(expected)) {
      throw new Error(
        `Generated Agent Plugin file differs: ${relativePath}`
      )
    }
    if (isSecretLookingPath(relativePath)) {
      throw new Error(
        `Secret-looking file is not allowed: ${relativePath}`
      )
    }
    totalBytes += actual.length
  }

  return {
    bundleRoot: paths.agentPluginOutputRoot,
    fileCount: actualFiles.size,
    totalBytes,
    skillCount: canonicalManifest.skills.length,
  }
}

export async function buildAgentPlugin(paths: BuildPaths) {
  const { files } = await createExpectedFiles(paths)
  await replaceBundleSafely(paths.agentPluginOutputRoot, files)
  return validateAgentPlugin(paths)
}
