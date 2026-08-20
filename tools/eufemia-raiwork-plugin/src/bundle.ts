import fs from 'node:fs/promises'
import path from 'node:path'
import { PNG } from 'pngjs'
import { readCanonicalManifest, readPluginConfig } from './config.ts'
import type {
  BuildPaths,
  CanonicalSkill,
  MarketplacePluginConfig,
  RaiworkPluginManifest,
  ValidationReport,
} from './types.ts'

const MAX_PLUGIN_BYTES = 50 * 1024 * 1024
const MAX_PLUGIN_FILES = 5_000
const MAX_ICON_BYTES = 2 * 1024 * 1024
const MAX_ICON_DIMENSION = 4_096

const isSecretLookingPath = (relativePath: string) => {
  const name = path.posix.basename(relativePath).toLowerCase()
  return (
    name === '.env' ||
    name.startsWith('.env.') ||
    name.endsWith('.pem') ||
    name.endsWith('.key') ||
    name === 'id_rsa' ||
    name === 'credentials' ||
    name === 'kubeconfig' ||
    (name.startsWith('service-account') && name.endsWith('.json'))
  )
}

const toPosixPath = (value: string) => value.split(path.sep).join('/')

const resolveInside = (root: string, relativePath: string) => {
  const resolvedRoot = path.resolve(root)
  const resolvedPath = path.resolve(resolvedRoot, relativePath)
  const relative = path.relative(resolvedRoot, resolvedPath)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Path escapes plugin root: ${relativePath}`)
  }
  return resolvedPath
}

const quoteYaml = (value: string) => JSON.stringify(value)

const renderSkill = (
  canonicalSkill: CanonicalSkill,
  source: string,
  config: MarketplacePluginConfig
) => {
  const frontmatter = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  if (!frontmatter) {
    throw new Error(
      `Missing canonical frontmatter: ${canonicalSkill.name}`
    )
  }
  const body = source.slice(frontmatter[0].length).replace(/^\r?\n/, '')
  const metadata = config.skills[canonicalSkill.name]
  if (!metadata) {
    throw new Error(
      `Missing RAIWork skill metadata: ${canonicalSkill.name}`
    )
  }

  return `---
name: ${canonicalSkill.name}
description: ${quoteYaml(canonicalSkill.description)}
license: ${quoteYaml(config.plugin.license)}
metadata:
  title: ${quoteYaml(metadata.title)}
  version: ${quoteYaml(config.plugin.version)}
  tags: [${metadata.tags.map(quoteYaml).join(', ')}]
  platforms: [${config.plugin.platforms.map(quoteYaml).join(', ')}]
---

${body}`
}

const createManifest = (
  config: MarketplacePluginConfig,
  skills: CanonicalSkill[]
): RaiworkPluginManifest => ({
  schema: 'raicode.marketplace/v1',
  name: config.plugin.name,
  version: config.plugin.version,
  title: config.plugin.title,
  description: config.plugin.description,
  license: config.plugin.license,
  homepage: config.plugin.homepage,
  tags: config.plugin.tags,
  platforms: config.plugin.platforms,
  icon: config.plugin.icon,
  contents: {
    skills: skills.map(({ name }) => ({
      name,
      path: `skills/${name}`,
    })),
    mcp_servers: [
      {
        name: config.plugin.mcp.name,
        transport: 'http',
        endpoint_url: config.plugin.mcp.endpointUrl,
      },
    ],
    scripts: [],
  },
})

const collectFiles = async (
  root: string,
  directory = root,
  files = new Map<string, Buffer>()
) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isSymbolicLink()) {
      throw new Error(
        `Plugin bundles cannot contain symlinks: ${absolutePath}`
      )
    }
    if (entry.isDirectory()) {
      await collectFiles(root, absolutePath, files)
      continue
    }
    if (!entry.isFile()) {
      throw new Error(`Unsupported plugin file type: ${absolutePath}`)
    }
    files.set(
      toPosixPath(path.relative(root, absolutePath)),
      await fs.readFile(absolutePath)
    )
  }
  return files
}

const createExpectedFiles = async (paths: BuildPaths) => {
  const canonicalManifest = await readCanonicalManifest(
    path.join(paths.canonicalSkillsRoot, 'manifest.json')
  )
  const config = await readPluginConfig(
    paths.configPath,
    canonicalManifest
  )
  const files = new Map<string, Buffer>()

  files.set(
    'manifest.json',
    Buffer.from(
      `${JSON.stringify(
        createManifest(config, canonicalManifest.skills),
        null,
        2
      )}\n`
    )
  )
  files.set('README.md', await fs.readFile(paths.pluginReadmePath))
  files.set('LICENSE.txt', await fs.readFile(paths.licensePath))
  files.set(config.plugin.icon, await fs.readFile(paths.coverPath))

  const canonicalFiles = await collectFiles(paths.canonicalSkillsRoot)
  canonicalFiles.delete('manifest.json')
  const canonicalSkillNames = new Set(
    canonicalManifest.skills.map(({ name }) => name)
  )
  const renderedSkills = new Set<string>()
  for (const [relativePath, content] of canonicalFiles) {
    const skillDirectory = relativePath.split('/')[0]
    if (!skillDirectory || !canonicalSkillNames.has(skillDirectory)) {
      throw new Error(
        `Canonical file does not belong to a declared skill: ${relativePath}`
      )
    }

    const destination = `skills/${relativePath}`
    if (relativePath.endsWith('/SKILL.md')) {
      const skill = canonicalManifest.skills.find(
        ({ path: skillPath }) => skillPath === relativePath
      )
      if (!skill) {
        throw new Error(`Unlisted canonical skill file: ${relativePath}`)
      }
      files.set(
        destination,
        Buffer.from(renderSkill(skill, content.toString('utf-8'), config))
      )
      renderedSkills.add(skill.name)
    } else {
      files.set(destination, content)
    }
  }

  for (const { name } of canonicalManifest.skills) {
    if (!renderedSkills.has(name)) {
      throw new Error(`Canonical skill is missing SKILL.md: ${name}`)
    }
  }

  return { canonicalManifest, config, files }
}

const replaceBundleSafely = async (
  outputRoot: string,
  files: Map<string, Buffer>
) => {
  const temporaryRoot = `${outputRoot}.tmp`
  const backupRoot = `${outputRoot}.backup-${process.pid}-${Date.now()}`
  await fs.rm(temporaryRoot, { recursive: true, force: true })
  await fs.mkdir(temporaryRoot, { recursive: true })

  try {
    for (const [relativePath, content] of files) {
      const destination = resolveInside(temporaryRoot, relativePath)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.writeFile(destination, content, { mode: 0o644 })
    }

    let hasPreviousBundle = false
    try {
      await fs.rename(outputRoot, backupRoot)
      hasPreviousBundle = true
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }

    try {
      await fs.rename(temporaryRoot, outputRoot)
    } catch (replacementError) {
      if (hasPreviousBundle) {
        try {
          await fs.rename(backupRoot, outputRoot)
        } catch (restoreError) {
          throw new AggregateError(
            [replacementError, restoreError],
            `Could not replace the plugin bundle or restore the previous bundle. Recovery copy: ${backupRoot}`,
            { cause: restoreError }
          )
        }
      }
      throw replacementError
    }

    if (hasPreviousBundle) {
      await fs.rm(backupRoot, { recursive: true, force: true })
    }
  } catch (error) {
    await fs.rm(temporaryRoot, { recursive: true, force: true })
    throw error
  }
}

const validatePng = (content: Buffer, relativePath: string) => {
  if (content.length > MAX_ICON_BYTES) {
    throw new Error(`Invalid marketplace PNG: ${relativePath}`)
  }

  try {
    const image = PNG.sync.read(content, { checkCRC: true })
    if (
      image.width < 1 ||
      image.height < 1 ||
      image.width > MAX_ICON_DIMENSION ||
      image.height > MAX_ICON_DIMENSION
    ) {
      throw new Error(
        `Marketplace image has unsupported dimensions: ${image.width}x${image.height}`
      )
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith(
        'Marketplace image has unsupported dimensions'
      )
    ) {
      throw error
    }
    throw new Error(`Invalid marketplace PNG: ${relativePath}`, {
      cause: error,
    })
  }
}

export async function validateRaiworkBundle(
  paths: BuildPaths
): Promise<ValidationReport> {
  const {
    canonicalManifest,
    config,
    files: expectedFiles,
  } = await createExpectedFiles(paths)
  const actualFiles = await collectFiles(paths.outputRoot)

  if (actualFiles.size > MAX_PLUGIN_FILES) {
    throw new Error(`Plugin has more than ${MAX_PLUGIN_FILES} files`)
  }
  const totalBytes = Array.from(actualFiles.values()).reduce(
    (sum, content) => sum + content.length,
    0
  )
  if (totalBytes > MAX_PLUGIN_BYTES) {
    throw new Error('Plugin exceeds the 50 MB marketplace limit')
  }

  const expectedPaths = Array.from(expectedFiles.keys()).sort()
  const actualPaths = Array.from(actualFiles.keys()).sort()
  if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) {
    throw new Error(
      'Generated plugin file inventory differs from its source'
    )
  }

  for (const [relativePath, expected] of expectedFiles) {
    const actual = actualFiles.get(relativePath)
    if (!actual?.equals(expected)) {
      throw new Error(`Generated plugin file differs: ${relativePath}`)
    }
    if (isSecretLookingPath(relativePath)) {
      throw new Error(
        `Secret-looking file is not allowed: ${relativePath}`
      )
    }
  }

  validatePng(
    actualFiles.get(config.plugin.icon) as Buffer,
    config.plugin.icon
  )

  const manifest = JSON.parse(
    (actualFiles.get('manifest.json') as Buffer).toString('utf-8')
  ) as RaiworkPluginManifest
  if (manifest.schema !== 'raicode.marketplace/v1') {
    throw new Error('Invalid RAIWork marketplace schema')
  }
  if (manifest.contents.scripts.length !== 0) {
    throw new Error('The Eufemia plugin must not ship executable scripts')
  }
  if (
    manifest.contents.mcp_servers.length !== 1 ||
    manifest.contents.mcp_servers[0]?.transport !== 'http'
  ) {
    throw new Error(
      'The Eufemia plugin must use one hosted HTTP MCP server'
    )
  }

  return {
    bundleRoot: paths.outputRoot,
    fileCount: actualFiles.size,
    totalBytes,
    skillCount: canonicalManifest.skills.length,
  }
}

export async function buildRaiworkBundle(paths: BuildPaths) {
  const { files } = await createExpectedFiles(paths)
  await replaceBundleSafely(paths.outputRoot, files)
  return validateRaiworkBundle(paths)
}
