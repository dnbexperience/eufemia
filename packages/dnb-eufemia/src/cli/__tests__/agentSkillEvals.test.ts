// @vitest-environment node

import fs from 'node:fs/promises'
import path from 'node:path'
import { readAgentSkillsManifest } from '../agentSkills'

const packageRoot = path.resolve(__dirname, '../../..')
const skillsRoot = path.join(packageRoot, 'agent-skills')
const evalsRoot = path.join(packageRoot, 'agent-skills-evals')

const readJson = async (filePath: string) =>
  JSON.parse(await fs.readFile(filePath, 'utf-8')) as unknown

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

describe('Eufemia Agent Skills evaluations', () => {
  it('defines representative output evaluations for every skill', async () => {
    const manifest = await readAgentSkillsManifest(skillsRoot)
    const expectedSkillNames = manifest.skills
      .map(({ name }) => name)
      .sort()
    const evaluationDirectories = (
      await fs.readdir(evalsRoot, { withFileTypes: true })
    )
      .filter((entry) => entry.isDirectory())
      .map(({ name }) => name)
      .sort()

    expect(evaluationDirectories).toEqual(expectedSkillNames)

    for (const skillName of expectedSkillNames) {
      const value = await readJson(
        path.join(evalsRoot, skillName, 'evals.json')
      )

      expect(isRecord(value)).toBe(true)
      if (!isRecord(value)) {
        continue
      }

      expect(value.skill_name).toBe(skillName)
      expect(Array.isArray(value.evals)).toBe(true)
      const evaluations = value.evals as unknown[]
      expect(evaluations.length).toBeGreaterThanOrEqual(2)

      const ids = new Set<number>()
      for (const evaluation of evaluations) {
        expect(isRecord(evaluation)).toBe(true)
        if (!isRecord(evaluation)) {
          continue
        }

        expect(typeof evaluation.id).toBe('number')
        expect(ids.has(evaluation.id as number)).toBe(false)
        ids.add(evaluation.id as number)
        expect(typeof evaluation.prompt).toBe('string')
        expect((evaluation.prompt as string).length).toBeGreaterThan(20)
        expect(typeof evaluation.expected_output).toBe('string')
        expect(
          (evaluation.expected_output as string).length
        ).toBeGreaterThan(20)
        expect(Array.isArray(evaluation.assertions)).toBe(true)
        expect(
          (evaluation.assertions as unknown[]).length
        ).toBeGreaterThanOrEqual(2)
        expect(
          (evaluation.assertions as unknown[]).every(
            (assertion) =>
              typeof assertion === 'string' && assertion.length > 10
          )
        ).toBe(true)
      }
    }
  })

  it('covers positive and negative skill routing', async () => {
    const manifest = await readAgentSkillsManifest(skillsRoot)
    const skillNames = new Set(manifest.skills.map(({ name }) => name))
    const value = await readJson(
      path.join(evalsRoot, 'trigger-cases.json')
    )

    expect(isRecord(value)).toBe(true)
    if (!isRecord(value)) {
      return
    }

    expect(Array.isArray(value.cases)).toBe(true)
    const cases = value.cases as unknown[]
    const prompts = new Set<string>()
    const counts = new Map<string | null, number>()

    for (const triggerCase of cases) {
      expect(isRecord(triggerCase)).toBe(true)
      if (!isRecord(triggerCase)) {
        continue
      }

      expect(typeof triggerCase.prompt).toBe('string')
      expect(prompts.has(triggerCase.prompt as string)).toBe(false)
      prompts.add(triggerCase.prompt as string)

      const expectedSkill = triggerCase.expected_skill
      expect(
        expectedSkill === null ||
          (typeof expectedSkill === 'string' &&
            skillNames.has(expectedSkill))
      ).toBe(true)
      counts.set(
        expectedSkill as string | null,
        (counts.get(expectedSkill as string | null) ?? 0) + 1
      )
    }

    for (const skillName of Array.from(skillNames)) {
      expect(counts.get(skillName)).toBeGreaterThanOrEqual(2)
    }
    expect(counts.get(null)).toBeGreaterThanOrEqual(2)
  })
})
