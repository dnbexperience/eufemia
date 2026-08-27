import fs from 'node:fs/promises'
import type {
  CanonicalSkillsManifest,
  MarketplacePluginConfig,
} from './types.ts'

const ALLOWED_PLATFORMS = new Set(['darwin', 'linux', 'win32'])

const isLowercaseHyphenated = (value: string) => {
  if (
    !/[a-z0-9]/.test(value[0] ?? '') ||
    !/[a-z0-9]/.test(value.at(-1) ?? '')
  ) {
    return false
  }
  for (const character of value) {
    if (!/[a-z0-9-]/.test(character)) {
      return false
    }
  }
  return true
}

const isSemver = (value: string) => {
  const normalized = value.startsWith('v') ? value.slice(1) : value
  const separator = normalized.indexOf('-')
  const core =
    separator === -1 ? normalized : normalized.slice(0, separator)
  const prerelease =
    separator === -1 ? null : normalized.slice(separator + 1)
  const coreParts = core.split('.')

  if (
    coreParts.length !== 3 ||
    coreParts.some(
      (part) =>
        part.length === 0 ||
        Array.from(part).some(
          (character) => character < '0' || character > '9'
        )
    )
  ) {
    return false
  }
  if (prerelease === null) {
    return true
  }
  if (prerelease.length === 0) {
    return false
  }

  return Array.from(prerelease).every(
    (character) =>
      (character >= '0' && character <= '9') ||
      (character >= 'A' && character <= 'Z') ||
      (character >= 'a' && character <= 'z') ||
      character === '-' ||
      character === '.'
  )
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const readJson = async (filePath: string): Promise<unknown> =>
  JSON.parse(await fs.readFile(filePath, 'utf-8')) as unknown

const validateName = (name: string, field: string) => {
  if (
    name.length < 2 ||
    name.length > 64 ||
    !isLowercaseHyphenated(name)
  ) {
    throw new Error(`Invalid ${field}: ${name}`)
  }
}

const validateTags = (tags: string[], field: string) => {
  if (tags.length > 20) {
    throw new Error(`${field} has more than 20 tags`)
  }
  for (const tag of tags) {
    if (tag.length > 40 || !isLowercaseHyphenated(tag)) {
      throw new Error(`Invalid ${field} tag: ${tag}`)
    }
  }
}

export async function readCanonicalManifest(
  filePath: string
): Promise<CanonicalSkillsManifest> {
  const value = await readJson(filePath)
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    typeof value.mcpServer !== 'string' ||
    !isStringArray(value.optionalTools) ||
    !Array.isArray(value.skills)
  ) {
    throw new Error('Invalid canonical Eufemia skills manifest')
  }

  const names = new Set<string>()
  const skills = value.skills.map((skill) => {
    if (
      !isRecord(skill) ||
      typeof skill.name !== 'string' ||
      typeof skill.description !== 'string' ||
      typeof skill.path !== 'string' ||
      !isStringArray(skill.requiredTools)
    ) {
      throw new Error('Invalid canonical Eufemia skill entry')
    }
    validateName(skill.name, 'canonical skill name')
    if (skill.description.length === 0 || skill.description.length > 500) {
      throw new Error(
        `Canonical skill description exceeds RAIWork limits: ${skill.name}`
      )
    }
    if (skill.path !== `${skill.name}/SKILL.md`) {
      throw new Error(`Canonical skill path does not match: ${skill.name}`)
    }
    if (names.has(skill.name)) {
      throw new Error(`Duplicate canonical skill: ${skill.name}`)
    }
    names.add(skill.name)

    return {
      name: skill.name,
      description: skill.description,
      path: skill.path,
      requiredTools: skill.requiredTools,
    }
  })

  return {
    schemaVersion: 1,
    mcpServer: value.mcpServer,
    optionalTools: value.optionalTools,
    skills,
  }
}

export async function readPluginConfig(
  filePath: string,
  canonicalManifest: CanonicalSkillsManifest
): Promise<MarketplacePluginConfig> {
  const value = await readJson(filePath)
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    !isRecord(value.plugin) ||
    !isRecord(value.skills)
  ) {
    throw new Error('Invalid Eufemia RAIWork plugin configuration')
  }

  const plugin = value.plugin
  if (
    typeof plugin.name !== 'string' ||
    typeof plugin.agentPluginName !== 'string' ||
    typeof plugin.version !== 'string' ||
    typeof plugin.title !== 'string' ||
    typeof plugin.description !== 'string' ||
    typeof plugin.license !== 'string' ||
    typeof plugin.homepage !== 'string' ||
    typeof plugin.repository !== 'string' ||
    !isStringArray(plugin.tags) ||
    !isStringArray(plugin.platforms) ||
    typeof plugin.icon !== 'string' ||
    !isRecord(plugin.mcp) ||
    typeof plugin.mcp.name !== 'string' ||
    typeof plugin.mcp.endpointUrl !== 'string'
  ) {
    throw new Error('Invalid Eufemia RAIWork plugin metadata')
  }

  validateName(plugin.name, 'plugin name')
  validateName(plugin.agentPluginName, 'Agent Plugin name')
  validateName(plugin.mcp.name, 'MCP server name')
  if (!isSemver(plugin.version)) {
    throw new Error(`Invalid plugin version: ${plugin.version}`)
  }
  if (plugin.title.length === 0 || plugin.title.length > 120) {
    throw new Error('Plugin title must be 1-120 characters')
  }
  if (plugin.description.length === 0 || plugin.description.length > 500) {
    throw new Error('Plugin description must be 1-500 characters')
  }
  if (!plugin.license.trim()) {
    throw new Error('Plugin license is required')
  }
  const homepage = new URL(plugin.homepage)
  if (homepage.protocol !== 'https:') {
    throw new Error('The plugin homepage must use HTTPS')
  }
  const repository = new URL(plugin.repository)
  if (repository.protocol !== 'https:') {
    throw new Error('The plugin repository must use HTTPS')
  }
  validateTags(plugin.tags, 'plugin')
  for (const platform of plugin.platforms) {
    if (!ALLOWED_PLATFORMS.has(platform)) {
      throw new Error(`Unsupported plugin platform: ${platform}`)
    }
  }
  const endpoint = new URL(plugin.mcp.endpointUrl)
  if (endpoint.protocol !== 'https:') {
    throw new Error('The hosted MCP endpoint must use HTTPS')
  }

  const canonicalNames = new Set(
    canonicalManifest.skills.map(({ name }) => name)
  )
  const configuredNames = new Set(Object.keys(value.skills))
  if (
    canonicalNames.size !== configuredNames.size ||
    Array.from(canonicalNames).some((name) => !configuredNames.has(name))
  ) {
    throw new Error(
      'RAIWork skill metadata must match the canonical Eufemia skills'
    )
  }

  const skills: MarketplacePluginConfig['skills'] = {}
  for (const [name, metadata] of Object.entries(value.skills)) {
    if (
      !isRecord(metadata) ||
      typeof metadata.title !== 'string' ||
      !isStringArray(metadata.tags)
    ) {
      throw new Error(`Invalid RAIWork metadata for skill: ${name}`)
    }
    if (metadata.title.length === 0 || metadata.title.length > 120) {
      throw new Error(`Skill title must be 1-120 characters: ${name}`)
    }
    validateTags(metadata.tags, name)
    skills[name] = {
      title: metadata.title,
      tags: metadata.tags,
    }
  }

  return {
    schemaVersion: 1,
    plugin: {
      name: plugin.name,
      agentPluginName: plugin.agentPluginName,
      version: plugin.version,
      title: plugin.title,
      description: plugin.description,
      license: plugin.license,
      homepage: plugin.homepage,
      repository: plugin.repository,
      tags: plugin.tags,
      platforms: plugin.platforms,
      icon: plugin.icon,
      mcp: {
        name: plugin.mcp.name,
        endpointUrl: plugin.mcp.endpointUrl,
      },
    },
    skills,
  }
}
