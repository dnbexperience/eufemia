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
import { runEufemiaCli } from '../eufemiaCli'

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
    expect(manifest.optionalTools).toEqual(['docs_meta', 'review_rules'])
    expect(files.size).toBe(5)
    expect(
      manifest.skills.every(
        ({ requiredTools }) => !requiredTools.includes('docs_entry')
      )
    ).toBe(true)
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

  it('rejects a symlinked lock file without modifying its target', async () => {
    const externalLockPath = path.join(temporaryRoot, 'external-lock.json')
    const externalLock = `${JSON.stringify({
      schemaVersion: 1,
      packageVersion: 'external',
      files: {},
    })}\n`
    await fs.writeFile(externalLockPath, externalLock)
    await fs.mkdir(targetRoot, { recursive: true })
    await fs.symlink(
      externalLockPath,
      path.join(targetRoot, AGENT_SKILLS_LOCK_FILE)
    )

    await expect(
      installAgentSkills({ sourceRoot, targetRoot, packageVersion })
    ).rejects.toThrow('Agent skills target cannot contain symlinks')
    await expect(fs.readFile(externalLockPath, 'utf-8')).resolves.toBe(
      externalLock
    )
  })

  it('rejects a symlinked target parent', async () => {
    const externalRoot = path.join(temporaryRoot, 'external-target')
    const projectRoot = path.join(temporaryRoot, 'project')
    await fs.mkdir(externalRoot)
    await fs.mkdir(projectRoot)
    await fs.symlink(
      externalRoot,
      path.join(projectRoot, '.claude'),
      'dir'
    )

    await expect(
      installAgentSkills({
        sourceRoot,
        targetRoot: path.join(projectRoot, '.claude', 'skills'),
        targetBaseRoot: projectRoot,
        packageVersion,
      })
    ).rejects.toThrow('Agent skills target cannot contain symlinks')
    await expect(fs.readdir(externalRoot)).resolves.toEqual([])
  })

  it('rejects an explicit target outside the project', async () => {
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    const projectRoot = path.join(temporaryRoot, 'project')
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )
    await fs.mkdir(projectRoot)

    await expect(
      runAgentSkillsCli({
        args: ['install', '--target', '../outside'],
        packageRoot: cliPackageRoot,
        cwd: projectRoot,
      })
    ).rejects.toThrow('Agent skills target escapes the project')
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

  it('supports non-interactive installation with an explicit target', async () => {
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
      runEufemiaCli({
        args: ['skills', 'install', '--target', '.claude/skills'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
        selectTargets: async () => {
          throw new Error('Explicit targets must not prompt')
        },
      })
    ).resolves.toBe(0)
    await expect(
      runEufemiaCli({
        args: ['skills', 'check'],
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

  it('prompts for targets and preselects managed installations', async () => {
    const output: string[] = []
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )
    await installAgentSkills({
      sourceRoot,
      targetRoot: path.join(temporaryRoot, '.claude', 'skills'),
      packageVersion,
    })

    await expect(
      runEufemiaCli({
        args: ['skills', 'install'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
        selectTargets: async (choices) => {
          expect(choices).toEqual([
            {
              label: 'Claude Code and GitHub Copilot',
              target: '.claude/skills',
              checked: true,
            },
            {
              label: 'GitHub Copilot',
              target: '.github/skills',
              checked: false,
            },
            {
              label: 'Codex and GitHub Copilot',
              target: '.agents/skills',
              checked: false,
            },
          ])
          return ['.claude/skills', '.agents/skills']
        },
      })
    ).resolves.toBe(0)

    await expect(
      fs.readFile(
        path.join(
          temporaryRoot,
          '.agents',
          'skills',
          AGENT_SKILLS_LOCK_FILE
        ),
        'utf-8'
      )
    ).resolves.toContain(`"packageVersion": "${packageVersion}"`)
    expect(output).toEqual([
      expect.stringContaining('.claude/skills'),
      expect.stringContaining('.agents/skills'),
    ])
  })

  it('uninstalls every managed supported target by default', async () => {
    const output: string[] = []
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    const managedTargets = [
      path.join(temporaryRoot, '.github', 'skills'),
      path.join(temporaryRoot, '.agents', 'skills'),
    ]
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )
    for (const managedTarget of managedTargets) {
      await installAgentSkills({
        sourceRoot,
        targetRoot: managedTarget,
        targetBaseRoot: temporaryRoot,
        packageVersion,
      })
    }

    await expect(
      runEufemiaCli({
        args: ['skills', 'uninstall'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)

    for (const managedTarget of managedTargets) {
      await expect(
        fs.readFile(
          path.join(managedTarget, AGENT_SKILLS_LOCK_FILE),
          'utf-8'
        )
      ).rejects.toMatchObject({ code: 'ENOENT' })
    }
    expect(output).toHaveLength(2)
  })

  it('does not partially uninstall when a managed target has changes', async () => {
    const cliPackageRoot = path.join(temporaryRoot, 'package')
    const managedTargets = [
      path.join(temporaryRoot, '.github', 'skills'),
      path.join(temporaryRoot, '.agents', 'skills'),
    ]
    await fs.cp(sourceRoot, path.join(cliPackageRoot, 'agent-skills'), {
      recursive: true,
    })
    await fs.writeFile(
      path.join(cliPackageRoot, 'package.json'),
      JSON.stringify({ version: packageVersion })
    )
    for (const managedTarget of managedTargets) {
      await installAgentSkills({
        sourceRoot,
        targetRoot: managedTarget,
        targetBaseRoot: temporaryRoot,
        packageVersion,
      })
    }
    await fs.appendFile(
      path.join(managedTargets[1], 'eufemia-components', 'SKILL.md'),
      '\nLocal guidance\n'
    )

    await expect(
      runEufemiaCli({
        args: ['skills', 'uninstall'],
        packageRoot: cliPackageRoot,
        cwd: temporaryRoot,
      })
    ).rejects.toThrow('Refusing to remove modified agent skills')

    for (const managedTarget of managedTargets) {
      await expect(
        fs.readFile(
          path.join(managedTarget, AGENT_SKILLS_LOCK_FILE),
          'utf-8'
        )
      ).resolves.toContain(`"packageVersion": "${packageVersion}"`)
    }
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

  it('shows skills through the main package CLI', async () => {
    const output: string[] = []

    await expect(
      runEufemiaCli({
        args: ['skills', 'list'],
        packageRoot,
        cwd: temporaryRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)

    expect(output).toHaveLength(5)
    expect(output[0]).toMatch(
      /^1\. eufemia-components\n   Find and apply current Eufemia component APIs\.[\s\S]+\n$/
    )
    expect(output[1]).toMatch(/^2\. eufemia-compose\n   Compose /)
    expect(output.join('\n')).toContain(
      '\n\n2. eufemia-compose\n   Compose '
    )
    expect(output[4]).toMatch(/^5\. eufemia-migrate\n   Migrate /)
    expect(output[4]).not.toMatch(/\n$/)
  })

  it('shows the package version through the main CLI', async () => {
    const output: string[] = []

    await expect(
      runEufemiaCli({
        args: ['--version'],
        packageRoot,
        output: (message) => output.push(message),
      })
    ).resolves.toBe(0)
    expect(output).toEqual(['0.0.0-development'])
  })
})
