// @vitest-environment node

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  AGENT_SKILLS_LOCK_FILE,
  checkAgentSkills,
  installAgentSkills,
  runAgentSkillsCli,
  uninstallAgentSkills,
  validateAgentSkills,
} from '../agentSkills'

const packageRoot = path.resolve(__dirname, '../../..')
const sourceRoot = path.join(packageRoot, 'agent-skills')
const packageVersion = '11.10.2'

describe('Eufemia agent skills', () => {
  let temporaryRoot: string
  let targetRoot: string

  beforeEach(async () => {
    temporaryRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), 'eufemia-agent-skills-')
    )
    targetRoot = path.join(temporaryRoot, '.claude', 'skills')
  })

  afterEach(async () => {
    await fs.rm(temporaryRoot, { recursive: true, force: true })
  })

  it('validates the canonical manifest and skill frontmatter', async () => {
    const { manifest, files } = await validateAgentSkills(sourceRoot)

    expect(manifest.skills.map(({ name }) => name)).toEqual([
      'eufemia-components',
      'eufemia-compose',
      'eufemia-accessibility',
      'eufemia-review',
      'eufemia-migrate',
    ])
    expect(files.size).toBe(5)
  })

  it('rejects host-specific skill frontmatter', async () => {
    const copiedSource = path.join(temporaryRoot, 'agent-skills')
    await fs.cp(sourceRoot, copiedSource, { recursive: true })
    const skillPath = path.join(
      copiedSource,
      'eufemia-components',
      'SKILL.md'
    )
    const content = await fs.readFile(skillPath, 'utf-8')
    await fs.writeFile(
      skillPath,
      content.replace(
        'compatibility:',
        'user-invocable: false\ncompatibility:'
      )
    )

    await expect(validateAgentSkills(copiedSource)).rejects.toThrow(
      'Unsupported Agent Skills frontmatter field "user-invocable"'
    )
  })

  it('reports when packaged skills are missing', async () => {
    await expect(
      validateAgentSkills(path.join(temporaryRoot, 'missing'))
    ).rejects.toThrow('Eufemia agent skills are missing from the package')
  })

  it('installs deterministic, current skill files', async () => {
    const installed = await installAgentSkills({
      sourceRoot,
      targetRoot,
      packageVersion,
    })

    expect(installed).toHaveLength(5)
    await expect(
      fs.readFile(
        path.join(targetRoot, 'eufemia-components', 'SKILL.md'),
        'utf-8'
      )
    ).resolves.toContain('name: eufemia-components')
    await expect(
      checkAgentSkills({ sourceRoot, targetRoot, packageVersion })
    ).resolves.toEqual([])

    const lock = JSON.parse(
      await fs.readFile(
        path.join(targetRoot, AGENT_SKILLS_LOCK_FILE),
        'utf-8'
      )
    )
    expect(lock).toMatchObject({
      schemaVersion: 1,
      packageVersion,
    })
    expect(lock).not.toHaveProperty('installedAt')
  })

  it('protects locally modified skill files during updates', async () => {
    await installAgentSkills({ sourceRoot, targetRoot, packageVersion })
    const skillPath = path.join(
      targetRoot,
      'eufemia-components',
      'SKILL.md'
    )
    await fs.appendFile(skillPath, '\nLocal guidance\n')

    await expect(
      installAgentSkills({ sourceRoot, targetRoot, packageVersion })
    ).rejects.toThrow('Refusing to overwrite modified agent skills')

    await installAgentSkills({
      sourceRoot,
      targetRoot,
      packageVersion,
      force: true,
    })
    await expect(
      checkAgentSkills({ sourceRoot, targetRoot, packageVersion })
    ).resolves.toEqual([])
  })

  it('only removes files managed by the installer', async () => {
    const unrelatedPath = path.join(targetRoot, 'team-skill', 'SKILL.md')
    await fs.mkdir(path.dirname(unrelatedPath), { recursive: true })
    await fs.writeFile(unrelatedPath, '# Team skill\n')
    await installAgentSkills({ sourceRoot, targetRoot, packageVersion })

    await uninstallAgentSkills({ targetRoot })

    await expect(fs.readFile(unrelatedPath, 'utf-8')).resolves.toBe(
      '# Team skill\n'
    )
    await expect(
      fs.readFile(
        path.join(targetRoot, 'eufemia-components', 'SKILL.md'),
        'utf-8'
      )
    ).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('supports CLI installation and checks with the default target', async () => {
    const output: string[] = []
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )

    await expect(
      runAgentSkillsCli({
        args: ['install'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)
    await expect(
      runAgentSkillsCli({
        args: ['check'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)

    expect(output).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Installed 5 Eufemia skills'),
        expect.stringContaining('Eufemia agent skills are current'),
      ])
    )
  })

  it('reports when there is no managed installation to uninstall', async () => {
    const output: string[] = []
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )

    await expect(
      runAgentSkillsCli({
        args: ['uninstall'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)
    expect(output).toEqual([
      expect.stringContaining('No managed Eufemia agent skills found'),
    ])
  })
})
