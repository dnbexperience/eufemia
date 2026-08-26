import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { BuildPaths } from './types.ts'

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url))

export const defaultPaths: BuildPaths = {
  toolRoot: path.resolve(moduleDirectory, '..'),
  workspaceRoot: path.resolve(moduleDirectory, '../../..'),
  canonicalSkillsRoot: path.resolve(
    moduleDirectory,
    '../../../packages/dnb-eufemia/agent-skills'
  ),
  configPath: path.resolve(moduleDirectory, '../plugin.config.json'),
  pluginReadmePath: path.resolve(
    moduleDirectory,
    '../assets/PLUGIN_README.md'
  ),
  licensePath: path.resolve(
    moduleDirectory,
    '../../../packages/dnb-eufemia/LICENSE'
  ),
  coverPath: path.resolve(
    moduleDirectory,
    '../../../packages/dnb-design-system-portal/static/dnb/og-image.png'
  ),
  outputRoot: path.resolve(moduleDirectory, '../dist/dnb-eufemia-web'),
}
