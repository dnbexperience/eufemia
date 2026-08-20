import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

export const AGENT_SKILLS_LOCK_FILE = '.eufemia-skills-lock.json'
export const DEFAULT_AGENT_SKILLS_TARGET = '.claude/skills'
export const AGENT_SKILLS_TARGETS = [
  {
    label: 'Claude Code and GitHub Copilot',
    target: '.claude/skills',
  },
  {
    label: 'GitHub Copilot',
    target: '.github/skills',
  },
  {
    label: 'Codex and GitHub Copilot',
    target: '.agents/skills',
  },
] as const

export type AgentSkillManifestEntry = {
  name: string
  description: string
  path: string
  requiredTools: string[]
}

export type AgentSkillsManifest = {
  schemaVersion: 1
  mcpServer: string
  optionalTools: string[]
  skills: AgentSkillManifestEntry[]
}

type AgentSkillsLock = {
  schemaVersion: 1
  packageVersion: string
  files: Record<string, string>
}

type SkillFile = {
  content: Buffer
  mode: number
  hash: string
}

export type InstallAgentSkillsOptions = {
  sourceRoot: string
  targetRoot: string
  targetBaseRoot?: string
  packageVersion: string
  force?: boolean
}

type UninstallAgentSkillsOptions = Pick<
  InstallAgentSkillsOptions,
  'targetRoot' | 'targetBaseRoot' | 'force'
> & {
  dryRun?: boolean
}

export type RunAgentSkillsCliOptions = {
  args: string[]
  packageRoot: string
  cwd?: string
  output?: (message: string) => void
  selectTargets?: SelectAgentSkillsTargets
}

export type AgentSkillsTargetChoice = {
  label: string
  target: string
  checked: boolean
}

export type SelectAgentSkillsTargets = (
  choices: AgentSkillsTargetChoice[]
) => Promise<string[]>

const hashContent = (content: Buffer) =>
  createHash('sha256').update(content).digest('hex')

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === 'string')

const toPosixPath = (value: string) => value.split(path.sep).join('/')

const resolveInside = (root: string, relativePath: string) => {
  const resolvedRoot = path.resolve(root)
  const resolvedPath = path.resolve(resolvedRoot, relativePath)
  const relative = path.relative(resolvedRoot, resolvedPath)

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Agent skill path escapes its root: ${relativePath}`)
  }

  return resolvedPath
}

const readJson = async (filePath: string): Promise<unknown> => {
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content) as unknown
}

const readOptionalBuffer = async (filePath: string) => {
  try {
    return await fs.readFile(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }
    throw error
  }
}

const assertSafeTargetPath = async (
  targetBaseRoot: string,
  targetPath: string
) => {
  const resolvedBaseRoot = path.resolve(targetBaseRoot)
  const resolvedTargetPath = path.resolve(targetPath)
  const relativePath = path.relative(resolvedBaseRoot, resolvedTargetPath)

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(
      `Agent skills target escapes the project: ${targetPath}`
    )
  }

  const paths = [resolvedBaseRoot]
  let currentPath = resolvedBaseRoot
  for (const segment of relativePath.split(path.sep).filter(Boolean)) {
    currentPath = path.join(currentPath, segment)
    paths.push(currentPath)
  }

  for (const candidate of paths) {
    try {
      const stat = await fs.lstat(candidate)
      if (stat.isSymbolicLink()) {
        throw new Error(
          `Agent skills target cannot contain symlinks: ${candidate}`
        )
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        break
      }
      throw error
    }
  }
}

const readFrontmatterValue = (content: string, key: string) => {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter?.[1]) {
    return null
  }

  const prefix = `${key}:`
  const line = frontmatter[1]
    .split(/\r?\n/)
    .find((line) => !/^\s/.test(line) && line.startsWith(prefix))

  if (!line) {
    return null
  }

  return line
    .slice(prefix.length)
    .trim()
    .replace(/^['"]|['"]$/g, '')
}

const STANDARD_SKILL_FIELDS = new Set([
  'name',
  'description',
  'license',
  'compatibility',
  'metadata',
  'allowed-tools',
])

const validateSkillFrontmatter = (
  content: string,
  skill: AgentSkillManifestEntry
) => {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter?.[1]) {
    throw new Error(`Missing SKILL.md frontmatter: ${skill.name}`)
  }

  const topLevelFields = frontmatter[1]
    .split(/\r?\n/)
    .filter((line) => !/^\s/.test(line))
    .map((line) => line.match(/^([a-zA-Z0-9-]+):/)?.[1])
    .filter((field): field is string => Boolean(field))

  for (const field of topLevelFields) {
    if (!STANDARD_SKILL_FIELDS.has(field)) {
      throw new Error(
        `Unsupported Agent Skills frontmatter field "${field}": ${skill.name}`
      )
    }
  }

  if (readFrontmatterValue(content, 'name') !== skill.name) {
    throw new Error(`SKILL.md name does not match manifest: ${skill.name}`)
  }
  if (readFrontmatterValue(content, 'description') !== skill.description) {
    throw new Error(
      `SKILL.md description does not match manifest: ${skill.name}`
    )
  }
  if (skill.name.length > 64 || skill.description.length > 1024) {
    throw new Error(
      `Agent skill metadata exceeds specification: ${skill.name}`
    )
  }

  const compatibility = readFrontmatterValue(content, 'compatibility')
  if (compatibility && compatibility.length > 500) {
    throw new Error(
      `Agent skill compatibility exceeds specification: ${skill.name}`
    )
  }
}

export async function readAgentSkillsManifest(
  sourceRoot: string
): Promise<AgentSkillsManifest> {
  let value: unknown
  try {
    value = await readJson(path.join(sourceRoot, 'manifest.json'))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(
        `Eufemia agent skills are missing from the package: ${sourceRoot}`,
        { cause: error }
      )
    }
    throw error
  }

  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    typeof value.mcpServer !== 'string' ||
    !isStringArray(value.optionalTools) ||
    !Array.isArray(value.skills)
  ) {
    throw new Error('Invalid Eufemia agent skills manifest')
  }

  const names = new Set<string>()
  const skills = value.skills.map((entry): AgentSkillManifestEntry => {
    if (
      !isRecord(entry) ||
      typeof entry.name !== 'string' ||
      typeof entry.description !== 'string' ||
      typeof entry.path !== 'string' ||
      !isStringArray(entry.requiredTools)
    ) {
      throw new Error('Invalid Eufemia agent skill manifest entry')
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) {
      throw new Error(`Invalid agent skill name: ${entry.name}`)
    }
    if (names.has(entry.name)) {
      throw new Error(`Duplicate agent skill name: ${entry.name}`)
    }
    if (entry.path !== `${entry.name}/SKILL.md`) {
      throw new Error(
        `Agent skill path must match its name: ${entry.name}`
      )
    }

    names.add(entry.name)
    resolveInside(sourceRoot, entry.path)

    return {
      name: entry.name,
      description: entry.description,
      path: entry.path,
      requiredTools: entry.requiredTools,
    }
  })

  return {
    schemaVersion: 1,
    mcpServer: value.mcpServer,
    optionalTools: value.optionalTools,
    skills,
  }
}

const collectDirectoryFiles = async (
  sourceRoot: string,
  directory: string,
  files: Map<string, SkillFile>
) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isSymbolicLink()) {
      throw new Error(
        `Agent skills cannot contain symlinks: ${absolutePath}`
      )
    }
    if (entry.isDirectory()) {
      await collectDirectoryFiles(sourceRoot, absolutePath, files)
      continue
    }
    if (!entry.isFile()) {
      throw new Error(`Unsupported agent skill entry: ${absolutePath}`)
    }

    const relativePath = toPosixPath(
      path.relative(sourceRoot, absolutePath)
    )
    const content = await fs.readFile(absolutePath)
    const stat = await fs.stat(absolutePath)
    files.set(relativePath, {
      content,
      mode: stat.mode,
      hash: hashContent(content),
    })
  }
}

export async function validateAgentSkills(sourceRoot: string) {
  const manifest = await readAgentSkillsManifest(sourceRoot)
  const files = new Map<string, SkillFile>()

  for (const skill of manifest.skills) {
    const skillPath = resolveInside(sourceRoot, skill.path)
    const content = await fs.readFile(skillPath, 'utf-8')
    validateSkillFrontmatter(content, skill)

    await collectDirectoryFiles(sourceRoot, path.dirname(skillPath), files)
  }

  return { manifest, files }
}

const readAgentSkillsLock = async (
  targetRoot: string,
  targetBaseRoot = targetRoot
): Promise<AgentSkillsLock | null> => {
  const lockPath = path.join(targetRoot, AGENT_SKILLS_LOCK_FILE)
  await assertSafeTargetPath(targetBaseRoot, lockPath)
  const content = await readOptionalBuffer(lockPath)
  if (!content) {
    return null
  }

  const value = JSON.parse(content.toString('utf-8')) as unknown
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    typeof value.packageVersion !== 'string' ||
    !isRecord(value.files) ||
    !Object.values(value.files).every((hash) => typeof hash === 'string')
  ) {
    throw new Error(`Invalid ${AGENT_SKILLS_LOCK_FILE}`)
  }

  return {
    schemaVersion: 1,
    packageVersion: value.packageVersion,
    files: value.files as Record<string, string>,
  }
}

const pruneEmptyDirectories = async (
  targetRoot: string,
  relativePaths: Iterable<string>,
  targetBaseRoot = targetRoot
) => {
  const directories = new Set<string>()
  for (const relativePath of Array.from(relativePaths)) {
    let directory = path.dirname(relativePath)
    while (directory !== '.') {
      directories.add(directory)
      directory = path.dirname(directory)
    }
  }

  const sorted = Array.from(directories).sort(
    (a, b) => b.length - a.length
  )
  for (const directory of sorted) {
    try {
      const directoryPath = resolveInside(targetRoot, directory)
      await assertSafeTargetPath(targetBaseRoot, directoryPath)
      await fs.rmdir(directoryPath)
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code !== 'ENOENT' && code !== 'ENOTEMPTY') {
        throw error
      }
    }
  }
}

export async function installAgentSkills({
  sourceRoot,
  targetRoot,
  targetBaseRoot = targetRoot,
  packageVersion,
  force = false,
}: InstallAgentSkillsOptions) {
  const { manifest, files } = await validateAgentSkills(sourceRoot)
  await assertSafeTargetPath(targetBaseRoot, targetRoot)
  const previousLock = await readAgentSkillsLock(
    targetRoot,
    targetBaseRoot
  )
  const conflicts: string[] = []

  for (const [relativePath, file] of Array.from(files.entries())) {
    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    const existing = await readOptionalBuffer(destination)
    if (!existing) {
      continue
    }

    const existingHash = hashContent(existing)
    const previousHash = previousLock?.files[relativePath]
    if (
      existingHash !== file.hash &&
      existingHash !== previousHash &&
      !force
    ) {
      conflicts.push(relativePath)
    }
  }

  for (const [relativePath, previousHash] of Object.entries(
    previousLock?.files ?? {}
  )) {
    if (files.has(relativePath)) {
      continue
    }

    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    const existing = await readOptionalBuffer(destination)
    if (existing && hashContent(existing) !== previousHash && !force) {
      conflicts.push(relativePath)
    }
  }

  if (conflicts.length > 0) {
    throw new Error(
      `Refusing to overwrite modified agent skills:\n${conflicts
        .sort()
        .map((entry) => `- ${entry}`)
        .join('\n')}`
    )
  }

  await fs.mkdir(targetRoot, { recursive: true })

  const staleFiles = Object.keys(previousLock?.files ?? {}).filter(
    (relativePath) => !files.has(relativePath)
  )
  for (const relativePath of staleFiles) {
    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    await fs.rm(destination, { force: true })
  }

  const lockFiles: Record<string, string> = {}
  for (const [relativePath, file] of Array.from(files.entries())) {
    const destination = resolveInside(targetRoot, relativePath)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await assertSafeTargetPath(targetBaseRoot, destination)
    await fs.writeFile(destination, file.content)
    await fs.chmod(destination, file.mode & 0o777)
    lockFiles[relativePath] = file.hash
  }

  const lock: AgentSkillsLock = {
    schemaVersion: 1,
    packageVersion,
    files: lockFiles,
  }
  const lockPath = path.join(targetRoot, AGENT_SKILLS_LOCK_FILE)
  await assertSafeTargetPath(targetBaseRoot, lockPath)
  await fs.writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`)
  await pruneEmptyDirectories(targetRoot, staleFiles, targetBaseRoot)

  return manifest.skills.map(({ name }) => name)
}

export async function checkAgentSkills({
  sourceRoot,
  targetRoot,
  targetBaseRoot = targetRoot,
  packageVersion,
}: InstallAgentSkillsOptions) {
  const { files } = await validateAgentSkills(sourceRoot)
  await assertSafeTargetPath(targetBaseRoot, targetRoot)
  const lock = await readAgentSkillsLock(targetRoot, targetBaseRoot)
  const issues: string[] = []

  if (!lock) {
    return [`Missing ${AGENT_SKILLS_LOCK_FILE}`]
  }
  if (lock.packageVersion !== packageVersion) {
    issues.push(
      `Installed version ${lock.packageVersion} does not match ${packageVersion}`
    )
  }

  for (const [relativePath, file] of Array.from(files.entries())) {
    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    const existing = await readOptionalBuffer(destination)
    if (!existing) {
      issues.push(`Missing ${relativePath}`)
    } else if (hashContent(existing) !== file.hash) {
      issues.push(`Changed ${relativePath}`)
    }
  }

  for (const relativePath of Object.keys(lock.files)) {
    if (!files.has(relativePath)) {
      issues.push(`Stale ${relativePath}`)
    }
  }

  return issues
}

export async function uninstallAgentSkills({
  targetRoot,
  targetBaseRoot = targetRoot,
  force = false,
  dryRun = false,
}: UninstallAgentSkillsOptions) {
  await assertSafeTargetPath(targetBaseRoot, targetRoot)
  const lock = await readAgentSkillsLock(targetRoot, targetBaseRoot)
  if (!lock) {
    return null
  }

  const conflicts: string[] = []
  for (const [relativePath, expectedHash] of Object.entries(lock.files)) {
    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    const existing = await readOptionalBuffer(destination)
    if (existing && hashContent(existing) !== expectedHash && !force) {
      conflicts.push(relativePath)
    }
  }

  if (conflicts.length > 0) {
    throw new Error(
      `Refusing to remove modified agent skills:\n${conflicts
        .sort()
        .map((entry) => `- ${entry}`)
        .join('\n')}`
    )
  }

  if (dryRun) {
    return Object.keys(lock.files)
  }

  for (const relativePath of Object.keys(lock.files)) {
    const destination = resolveInside(targetRoot, relativePath)
    await assertSafeTargetPath(targetBaseRoot, destination)
    await fs.rm(destination, { force: true })
  }
  const lockPath = path.join(targetRoot, AGENT_SKILLS_LOCK_FILE)
  await assertSafeTargetPath(targetBaseRoot, lockPath)
  await fs.rm(lockPath, {
    force: true,
  })
  await pruneEmptyDirectories(
    targetRoot,
    Object.keys(lock.files),
    targetBaseRoot
  )

  return Object.keys(lock.files)
}

const readPackageVersion = async (packageRoot: string) => {
  const packageJson = await readJson(
    path.join(packageRoot, 'package.json')
  )
  if (!isRecord(packageJson) || typeof packageJson.version !== 'string') {
    throw new Error('Could not read the Eufemia package version')
  }
  return packageJson.version
}

const createTargetChoices = async (cwd: string) => {
  return Promise.all(
    AGENT_SKILLS_TARGETS.map(async ({ label, target }) => ({
      label,
      target,
      checked: Boolean(
        await readAgentSkillsLock(path.resolve(cwd, target), cwd)
      ),
    }))
  )
}

const findManagedTargetRoots = async (cwd: string) => {
  const managedTargetRoots: string[] = []

  for (const { target } of AGENT_SKILLS_TARGETS) {
    const targetRoot = path.resolve(cwd, target)
    if (await readAgentSkillsLock(targetRoot, cwd)) {
      managedTargetRoots.push(targetRoot)
    }
  }

  return managedTargetRoots
}

const selectAgentSkillsTargets: SelectAgentSkillsTargets = async (
  choices
) => {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error(
      'Interactive target selection requires a terminal. Pass --target <directory> for non-interactive use.'
    )
  }

  const { default: checkbox } = await import('@inquirer/checkbox')
  return checkbox({
    message: 'Select one or more Agent Skills locations',
    choices: choices.map(({ label, target, checked }) => ({
      name: `${label} (${target})`,
      value: target,
      checked,
    })),
    validate: (targets) =>
      targets.length > 0 || 'Select at least one target',
  })
}

const parseCliOptions = (args: string[], cwd: string) => {
  const command = args[0] ?? 'help'
  let targetRoot: string | null = null
  let force = false

  for (let index = 1; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === '--force') {
      force = true
      continue
    }
    if (argument === '--target') {
      const target = args[index + 1]
      if (!target) {
        throw new Error('--target requires a directory')
      }
      targetRoot = path.resolve(cwd, target)
      index += 1
      continue
    }
    throw new Error(`Unknown option: ${argument}`)
  }

  return { command, targetRoot, force }
}

const HELP = `Usage: eufemia skills <command> [options]

Commands:
  install      Select targets and install Eufemia agent skills
  update       Alias for install
  check        Check installed skills against this package
  uninstall    Remove all unmodified managed Eufemia skills
  list         List packaged Eufemia skills
  version      Print the Eufemia package version

Options:
  --target <directory>  Use one project skill directory without prompting
  --force               Replace or remove locally modified skill files`

export async function runAgentSkillsCli({
  args,
  packageRoot,
  cwd = process.cwd(),
  output = console.log,
  selectTargets = selectAgentSkillsTargets,
}: RunAgentSkillsCliOptions) {
  const { command, targetRoot, force } = parseCliOptions(args, cwd)
  const sourceRoot = path.join(packageRoot, 'agent-skills')
  const packageVersion = await readPackageVersion(packageRoot)

  if (command === 'help' || command === '--help' || command === '-h') {
    output(HELP)
    return 0
  }
  if (
    command === 'version' ||
    command === '--version' ||
    command === '-v'
  ) {
    output(packageVersion)
    return 0
  }
  if (command === 'list') {
    const manifest = await readAgentSkillsManifest(sourceRoot)
    for (const skill of manifest.skills) {
      output(`${skill.name}\t${skill.description}`)
    }
    return 0
  }
  if (command === 'install' || command === 'update') {
    const selectedTargets = targetRoot
      ? [targetRoot]
      : await selectTargets(await createTargetChoices(cwd))
    const knownTargets = new Set<string>(
      AGENT_SKILLS_TARGETS.map(({ target }) => target)
    )

    if (selectedTargets.length === 0) {
      throw new Error('Select at least one target')
    }

    for (const target of Array.from(new Set(selectedTargets))) {
      if (!targetRoot && !knownTargets.has(target)) {
        throw new Error(`Unknown agent skills target: ${target}`)
      }

      const selectedTargetRoot = targetRoot
        ? target
        : path.resolve(cwd, target)
      const names = await installAgentSkills({
        sourceRoot,
        targetRoot: selectedTargetRoot,
        targetBaseRoot: cwd,
        packageVersion,
        force,
      })
      output(
        `Installed ${names.length} Eufemia skills in ${selectedTargetRoot}`
      )
    }
    return 0
  }
  if (command === 'check') {
    const issues = await checkAgentSkills({
      sourceRoot,
      targetRoot:
        targetRoot ?? path.resolve(cwd, DEFAULT_AGENT_SKILLS_TARGET),
      targetBaseRoot: cwd,
      packageVersion,
    })
    if (issues.length > 0) {
      for (const issue of issues) {
        output(issue)
      }
      return 1
    }
    output(
      `Eufemia agent skills are current in ${
        targetRoot ?? path.resolve(cwd, DEFAULT_AGENT_SKILLS_TARGET)
      }`
    )
    return 0
  }
  if (command === 'uninstall') {
    const uninstallTargets = targetRoot
      ? [targetRoot]
      : await findManagedTargetRoots(cwd)
    if (uninstallTargets.length === 0) {
      output('No managed Eufemia agent skills found in this project')
      return 0
    }

    const managedTargets: string[] = []
    for (const uninstallTarget of uninstallTargets) {
      const files = await uninstallAgentSkills({
        targetRoot: uninstallTarget,
        targetBaseRoot: cwd,
        force,
        dryRun: true,
      })
      if (files) {
        managedTargets.push(uninstallTarget)
      }
    }

    if (managedTargets.length === 0) {
      output(
        `No managed Eufemia agent skills found in ${uninstallTargets[0]}`
      )
      return 0
    }

    for (const uninstallTarget of managedTargets) {
      const files = await uninstallAgentSkills({
        targetRoot: uninstallTarget,
        targetBaseRoot: cwd,
        force,
      })
      output(
        `Removed ${files?.length ?? 0} Eufemia skill files from ${uninstallTarget}`
      )
    }
    return 0
  }

  throw new Error(`Unknown command: ${command}\n\n${HELP}`)
}
