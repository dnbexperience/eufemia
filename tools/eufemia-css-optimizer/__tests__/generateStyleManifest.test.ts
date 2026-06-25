import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'

import { generateStyleManifest } from '../src/generateStyleManifest.ts'

const sourceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../packages/dnb-eufemia/src'
)

describe('generateStyleManifest', () => {
  const manifest = generateStyleManifest({ sourceRoot })

  it('discovers known components', () => {
    expect(manifest.version).toBe(1)
    expect(manifest.entries).toHaveProperty('autocomplete')
    expect(manifest.entries).toHaveProperty('button')
    expect(manifest.entries).toHaveProperty('input')
    expect(manifest.entries).toHaveProperty('dropdown')
  })

  it('derives the BEM class prefix', () => {
    const button = manifest.entries.button

    expect(button.classPrefix).toBe('dnb-button')
    expect(button.group).toBe('components')
  })

  it('throws when the source root does not exist', () => {
    expect(() =>
      generateStyleManifest({ sourceRoot: '/no/such/eufemia/src' })
    ).toThrow(/source root not found/i)
  })

  it('derives direct dependencies from a component own SCSS selectors', () => {
    const button = manifest.entries.button

    // button/style/dnb-button.scss styles these other component blocks.
    expect(button.dependencies).toContain('form-status')
    expect(button.dependencies).toContain('icon')
    expect(button.dependencies).toContain('skeleton')
  })

  it('resolves transitive CSS dependencies', () => {
    const autocomplete = manifest.entries.autocomplete

    // Direct edges: autocomplete styles input, drawer-list, form-label etc.
    expect(autocomplete.dependencies).toContain('input')
    expect(autocomplete.dependencies).toContain('drawer-list')
    expect(autocomplete.dependencies).toContain('form-label')
    expect(autocomplete.dependencies).toContain('form-status')
    expect(autocomplete.dependencies).toContain('icon')

    // Transitive edge: autocomplete -> input -> button.
    expect(manifest.entries.input.dependencies).toContain('button')
    expect(autocomplete.dependencies).toContain('button')
  })

  it('does not include components it neither styles nor renders', () => {
    const autocomplete = manifest.entries.autocomplete

    // `dropdown` was a stale edge in the old deps.scss; autocomplete no longer
    // references any dnb-dropdown selector and never renders a Dropdown, so it
    // must not be a dependency.
    expect(autocomplete.dependencies).not.toContain('dropdown')
  })

  it('captures rendered-but-unstyled components as render dependencies', () => {
    // Button renders a Tooltip (via the `tooltip` prop) but adds no
    // `.dnb-tooltip` rules of its own. The SCSS scan misses it, but the JSX
    // scan picks it up so the block is kept when Button is used.
    expect(manifest.entries.button.dependencies).toContain('tooltip')

    // Autocomplete renders a ProgressIndicator in its loading state.
    expect(manifest.entries.autocomplete.dependencies).toContain(
      'progress-indicator'
    )
  })

  it('does not list a component as its own dependency', () => {
    for (const entry of Object.values(manifest.entries)) {
      expect(entry.dependencies).not.toContain(entry.name)
    }
  })

  it('only references dependencies that are themselves manifest entries', () => {
    for (const entry of Object.values(manifest.entries)) {
      for (const dep of entry.dependencies) {
        expect(manifest.entries).toHaveProperty(dep)
      }
    }
  })

  it('limits scanning to the requested groups', () => {
    const componentsOnly = generateStyleManifest({
      sourceRoot,
      groups: ['components'],
    })

    for (const entry of Object.values(componentsOnly.entries)) {
      expect(entry.group).toBe('components')
    }
    expect(componentsOnly.entries).toHaveProperty('button')
  })

  it('discovers fragments and extensions, not just components', () => {
    expect(manifest.entries['drawer-list']?.group).toBe('fragments')
    expect(manifest.entries['scroll-view']?.group).toBe('fragments')
    expect(manifest.entries.forms?.group).toBe('extensions')
  })

  describe('foundation prefixes', () => {
    it('derives element block prefixes from the elements group', () => {
      // These are emitted by the shared Element wrapper as a runtime
      // `dnb-${tag}` class, so they can never be import-detected.
      expect(manifest.foundation).toContain('dnb-hr')
      expect(manifest.foundation).toContain('dnb-p')
      expect(manifest.foundation).toContain('dnb-h')
      expect(manifest.foundation).toContain('dnb-ul')
      expect(manifest.foundation).toContain('dnb-ol')
      expect(manifest.foundation).toContain('dnb-code')
      expect(manifest.foundation).toContain('dnb-blockquote')
    })

    it('excludes standalone component entries and structural globals', () => {
      // `anchor`/`table`/`skeleton`/`icon` ship their own manifest entry, and
      // `dnb-core-style`/`dnb-spacing` are kept as structural globals, so they
      // must not be duplicated into the foundation list.
      for (const prefix of manifest.foundation) {
        expect(manifest.entries).not.toHaveProperty(
          prefix.replace(/^dnb-/, '')
        )
      }

      expect(manifest.foundation).not.toContain('dnb-core-style')
      expect(manifest.foundation).not.toContain('dnb-spacing')
      expect(manifest.foundation).not.toContain('dnb-anchor')
    })

    it('returns a sorted, unique list', () => {
      const sorted = [...manifest.foundation].sort()
      expect(manifest.foundation).toEqual(sorted)
      expect(new Set(manifest.foundation).size).toBe(
        manifest.foundation.length
      )
    })
  })

  describe('forms field dependencies', () => {
    const forms = manifest.entries.forms
    const fields = manifest.formsFieldDependencies

    it('keeps shared forms infrastructure in the base entry', () => {
      // Rendered by the always-present Form/FieldBlock/Wizard infrastructure.
      expect(forms.dependencies).toContain('form-status')
      expect(forms.dependencies).toContain('form-label')
      expect(forms.dependencies).toContain('button')
      expect(forms.dependencies).toContain('card')
      expect(forms.dependencies).toContain('heading')

      // The inline help button every field can render opens a Dialog, so the
      // dialog stack stays part of the shared base regardless of fields used.
      expect(forms.dependencies).toContain('help-button')
      expect(forms.dependencies).toContain('dialog')
    })

    it('moves field-specific components out of the base entry', () => {
      // Upload (and the Table it renders) is only reachable through the Upload
      // field, so it must not be a base dependency of every forms import.
      expect(forms.dependencies).not.toContain('upload')
      expect(forms.dependencies).not.toContain('table')

      // Likewise for other field-specific blocks.
      expect(forms.dependencies).not.toContain('input')
      expect(forms.dependencies).not.toContain('slider')
      expect(forms.dependencies).not.toContain('date-picker')
      expect(forms.dependencies).not.toContain('dropdown')
    })

    it('attributes Upload (and Table) to the Upload field/value members', () => {
      expect(fields['Field.Upload']).toContain('upload')
      expect(fields['Field.Upload']).toContain('table')
      expect(fields['Value.Upload']).toContain('upload')
      expect(fields['Value.Upload']).toContain('table')
    })

    it('attributes a field its own component dependencies', () => {
      expect(fields['Field.String']).toContain('input')
      expect(fields['Field.Slider']).toContain('slider')
      expect(fields['Field.Boolean']).toContain('checkbox')
    })

    it('resolves barrel imports to field component dependencies', () => {
      // These fields render their component through the `components` group
      // barrel (`import { DatePicker } from '../../../../components'`), which
      // only resolves once barrel imports are mapped per identifier.
      expect(fields['Field.Date']).toContain('date-picker')
      expect(fields['Field.Selection']).toContain('dropdown')
      expect(fields['Field.Number']).toContain('input-masked')
    })

    it('lets composite fields inherit their sub-field dependencies', () => {
      // Field.Email renders Field.String internally, so it must inherit input.
      expect(fields['Field.Email']).toContain('input')

      // Field.Currency renders Field.Number internally.
      expect(fields['Field.Currency']).toContain('input-masked')
    })

    it('only lists member extras that the base does not already provide', () => {
      const base = new Set(forms.dependencies)

      for (const deps of Object.values(fields)) {
        for (const dep of deps) {
          expect(base.has(dep)).toBe(false)
        }
      }
    })

    it('references only real manifest entries, sorted and unique', () => {
      for (const [key, deps] of Object.entries(fields)) {
        expect(key).toMatch(/^(Field|Value)\.[A-Z]/)

        for (const dep of deps) {
          expect(manifest.entries).toHaveProperty(dep)
        }

        expect(deps).toEqual([...deps].sort())
        expect(new Set(deps).size).toBe(deps.length)
      }
    })
  })
})
