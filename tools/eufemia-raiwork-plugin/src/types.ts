export type CanonicalSkill = {
  name: string
  description: string
  path: string
  requiredTools: string[]
}

export type CanonicalSkillsManifest = {
  schemaVersion: 1
  mcpServer: string
  optionalTools: string[]
  skills: CanonicalSkill[]
}

export type MarketplaceSkillConfig = {
  title: string
  tags: string[]
}

export type MarketplacePluginConfig = {
  schemaVersion: 1
  plugin: {
    name: string
    agentPluginName: string
    version: string
    title: string
    description: string
    license: string
    homepage: string
    repository: string
    tags: string[]
    platforms: string[]
    icon: string
    mcp: {
      name: string
      endpointUrl: string
    }
  }
  skills: Record<string, MarketplaceSkillConfig>
}

export type RaiworkPluginManifest = {
  schema: 'raicode.marketplace/v1'
  name: string
  version: string
  title: string
  description: string
  license: string
  homepage: string
  tags: string[]
  platforms: string[]
  icon: string
  contents: {
    skills: Array<{ name: string; path: string }>
    mcp_servers: Array<{
      name: string
      transport: 'http'
      endpoint_url: string
    }>
    scripts: []
  }
}

export type BuildPaths = {
  workspaceRoot: string
  toolRoot: string
  canonicalSkillsRoot: string
  configPath: string
  pluginReadmePath: string
  licensePath: string
  coverPath: string
  outputRoot: string
  agentPluginOutputRoot: string
}

export type ValidationReport = {
  bundleRoot: string
  fileCount: number
  totalBytes: number
  skillCount: number
}

export type RemoteVerificationReport = {
  endpointUrl: string
  availableTools: string[]
  requiredTools: string[]
  missingOptionalTools: string[]
}
