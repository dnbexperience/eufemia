import { describe, it, expect } from 'vitest'
import {
  filterImportsByUsage,
  analyzeCodeStructure,
  generateAppComponent,
  formatCode,
  openInStackBlitz,
} from '../openInStackBlitz'

describe('filterImportsByUsage', () => {
  it('keeps imports for names used in code', () => {
    const result = filterImportsByUsage(
      ["import { Button } from '@dnb/eufemia'"],
      '<Button>Click</Button>'
    )

    expect(result).toEqual(["import { Button } from '@dnb/eufemia'"])
  })

  it('removes imports for names not used in code', () => {
    const result = filterImportsByUsage(
      ["import { Card } from '@dnb/eufemia'"],
      '<Button>Click</Button>'
    )

    expect(result).toEqual([])
  })

  it('filters individual specifiers from grouped imports', () => {
    const result = filterImportsByUsage(
      ["import { Button, Card, Table } from '@dnb/eufemia'"],
      '<Button>Click</Button>'
    )

    expect(result).toEqual(["import { Button } from '@dnb/eufemia'"])
  })

  it('keeps default imports when name is used', () => {
    const result = filterImportsByUsage(
      ["import styled from '@emotion/styled'"],
      'const Wrapper = styled.div`color: red`'
    )

    expect(result).toEqual(["import styled from '@emotion/styled'"])
  })

  it('removes default imports when name is not used', () => {
    const result = filterImportsByUsage(
      ["import styled from '@emotion/styled'"],
      '<Button>Click</Button>'
    )

    expect(result).toEqual([])
  })

  it('handles renamed imports by checking local name', () => {
    const result = filterImportsByUsage(
      ["import { trash as trashIcon } from '@dnb/eufemia/icons'"],
      '<Button icon={trashIcon}>Click</Button>'
    )

    expect(result).toEqual([
      "import { trash as trashIcon } from '@dnb/eufemia/icons'",
    ])
  })

  it('keeps multiple imports from different sources', () => {
    const result = filterImportsByUsage(
      [
        "import { Button } from '@dnb/eufemia'",
        "import { useState } from 'react'",
        "import { format } from 'date-fns'",
      ],
      'const [v, setV] = useState(0)\n<Button>Click</Button>'
    )

    expect(result).toEqual([
      "import { Button } from '@dnb/eufemia'",
      "import { useState } from 'react'",
    ])
  })

  it('handles mixed default and named imports', () => {
    const result = filterImportsByUsage(
      ["import React, { useState, useEffect } from 'react'"],
      'const [v, setV] = useState(0)'
    )

    expect(result).toEqual(["import { useState } from 'react'"])
  })
})

describe('analyzeCodeStructure', () => {
  it('detects function component pattern', () => {
    const result = analyzeCodeStructure(
      'function MyComponent() { return <div /> }'
    )

    expect(result.isFunctionComponent).toBe(true)
  })

  it('detects arrow function component pattern', () => {
    const result = analyzeCodeStructure(
      'const MyComponent = () => <div />'
    )

    expect(result.isFunctionComponent).toBe(true)
  })

  it('detects default export', () => {
    const result = analyzeCodeStructure(
      'export default function App() { return <div /> }'
    )

    expect(result.hasDefaultExport).toBe(true)
  })

  it('detects render() pattern', () => {
    const result = analyzeCodeStructure('render(<MyComponent />)')

    expect(result.usesRenderPattern).toBe(true)
  })

  it('detects existing imports', () => {
    const result = analyzeCodeStructure(
      "import { Button } from '@dnb/eufemia'\n<Button>Click</Button>"
    )

    expect(result.hasExistingImports).toBe(true)
  })
})

describe('generateAppComponent', () => {
  it('wraps plain JSX in an App component', () => {
    const result = generateAppComponent('<Button>Click</Button>', [
      "import { Button } from '@dnb/eufemia'",
    ])

    expect(result).toContain('export default function App()')
    expect(result).toContain('<Button>Click</Button>')
    expect(result).toContain("import { Button } from '@dnb/eufemia'")
  })

  it('passes through code with existing imports unchanged', () => {
    const code =
      "import { Button } from '@dnb/eufemia'\n<Button>Click</Button>"

    const result = generateAppComponent(code)

    expect(result).toBe(code)
  })

  it('includes imports in the output', () => {
    const result = generateAppComponent(
      '<Button icon={trash}>Click</Button>',
      [
        "import { Button } from '@dnb/eufemia'",
        "import { trash } from '@dnb/eufemia/icons'",
      ]
    )

    expect(result).toContain("import { Button } from '@dnb/eufemia'")
    expect(result).toContain("import { trash } from '@dnb/eufemia/icons'")
  })

  it('wraps function component with App export', () => {
    const result = generateAppComponent(
      'function MyComp() { return <Button>Click</Button> }',
      ["import { Button } from '@dnb/eufemia'"]
    )

    expect(result).toContain('export default function App()')
    expect(result).toContain('<MyComp />')
  })

  it('handles default export by renaming', () => {
    const result = generateAppComponent(
      'export default function MyComp() { return <Button>Click</Button> }',
      ["import { Button } from '@dnb/eufemia'"]
    )

    expect(result).toContain('function MyComp()')
    expect(result).toContain('export default function App()')
    expect(result).toContain('<MyComp />')
  })
})

describe('openInStackBlitz', () => {
  it('adds external dependency from sourceImports', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz(
      'const Wrapper = styled.div`color: red`\n<Wrapper>hi</Wrapper>',
      ["import styled from '@emotion/styled'"]
    )

    const packageJson = JSON.parse(
      form.fields['project[files][package.json]']
    )

    expect(packageJson.dependencies['@emotion/styled']).toBe('latest')

    form.cleanup()
  })

  it('detects external dependencies from sourceImports', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('format(new Date())', [
      "import { format } from 'date-fns'",
    ])

    const packageJson = JSON.parse(
      form.fields['project[files][package.json]']
    )

    expect(packageJson.dependencies['date-fns']).toBe('latest')

    form.cleanup()
  })

  it('does not add @dnb/eufemia as extra dependency from sourceImports', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('<Button icon={trash}>Click</Button>', [
      "import { Button } from '@dnb/eufemia'",
      "import { trash } from '@dnb/eufemia/icons'",
    ])

    const packageJson = JSON.parse(
      form.fields['project[files][package.json]']
    )

    expect(packageJson.dependencies['@dnb/eufemia']).toBe('latest')
    expect(
      Object.keys(packageJson.dependencies).filter(
        (k: string) => k === '@dnb/eufemia'
      )
    ).toHaveLength(1)

    form.cleanup()
  })

  it('includes only used sourceImports in App.tsx', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('<Button icon={trash}>Click</Button>', [
      "import { Button, Card } from '@dnb/eufemia'",
      "import { trash } from '@dnb/eufemia/icons'",
    ])

    const appTsx = form.fields['project[files][src/App.tsx]']

    expect(appTsx).toContain("from '@dnb/eufemia/icons'")
    expect(appTsx).toContain('Button')
    expect(appTsx).not.toContain('Card')

    form.cleanup()
  })

  it('filters sourceImports to avoid unused imports', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('<Button>Click</Button>', [
      "import { Button } from '@dnb/eufemia'",
      "import { Field } from '@dnb/eufemia/extensions/forms'",
    ])

    const appTsx = form.fields['project[files][src/App.tsx]']

    expect(appTsx).toContain("from '@dnb/eufemia'")
    expect(appTsx).not.toContain('Field')

    form.cleanup()
  })

  it('always includes base dependencies', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('<Button>Click</Button>', [
      "import { Button } from '@dnb/eufemia'",
    ])

    const packageJson = JSON.parse(
      form.fields['project[files][package.json]']
    )

    expect(packageJson.dependencies).toHaveProperty('@dnb/eufemia')
    expect(packageJson.dependencies).toHaveProperty('react')
    expect(packageJson.dependencies).toHaveProperty('react-dom')

    form.cleanup()
  })

  it('generates valid main.tsx', async () => {
    const form = mockFormSubmission()

    await openInStackBlitz('<Button>Click</Button>', [
      "import { Button } from '@dnb/eufemia'",
    ])

    const mainTsx = form.fields['project[files][src/main.tsx]']

    expect(mainTsx).toContain("import '@dnb/eufemia/style'")
    expect(mainTsx).toContain("import App from './App.tsx'")
    expect(mainTsx).toContain('<StrictMode>')
    expect(mainTsx).toContain('<App />')
    // Should not contain Provider wrapper
    expect(mainTsx).not.toContain('Provider')

    form.cleanup()
  })
})

describe('formatCode', () => {
  it('formats code with prettier', async () => {
    const result = await formatCode('const x=1;const y=2;')

    expect(result).toContain('const x = 1')
    expect(result).toContain('const y = 2')
  })

  it('returns original code on parse error', async () => {
    const broken = '{{{'

    const result = await formatCode(broken)

    expect(result).toBe(broken)
  })
})

/**
 * Intercepts form submission by stubbing document.createElement
 * and captures the submitted field values.
 */
function mockFormSubmission() {
  const fields: Record<string, string> = {}

  const originalSubmit = HTMLFormElement.prototype.submit
  HTMLFormElement.prototype.submit = function (this: HTMLFormElement) {
    this.querySelectorAll('input[type="hidden"]').forEach((input) => {
      const el = input as HTMLInputElement
      fields[el.name] = el.value
    })
  }

  return {
    fields,
    cleanup() {
      HTMLFormElement.prototype.submit = originalSubmit
    },
  }
}
