import { createMenuCardExtension } from '../../src/extensions/mdx/menuCard.ts'

const { replace } = createMenuCardExtension()

describe('menuCard', () => {
  it('renders MenuCards and drops the wrapping Card.List', async () => {
    const input = [
      '<Card.List bottom="small">',
      '  <MenuCard',
      '    url="/contribute/rules"',
      '    about="Code of conduct and Development principles"',
      '    title="Ground rules"',
      '    icon={Principles}',
      '  />',
      '  <MenuCard',
      '    url="/contribute/getting-started"',
      '    about="Set up environment"',
      '    title="Getting started"',
      '    icon={GettingStarted}',
      '  />',
      '</Card.List>',
    ].join('\n')

    const output = await replace(input)

    expect(output).toContain(
      '- [Ground rules](/contribute/rules) – Code of conduct and Development principles'
    )
    expect(output).toContain(
      '- [Getting started](/contribute/getting-started) – Set up environment'
    )
    expect(output).not.toContain('<MenuCard')
    expect(output).not.toContain('Card.List')
  })

  it('leaves an unrelated Card.List untouched', async () => {
    const unrelated = [
      '<Card.List>',
      '  Some unrelated content.',
      '</Card.List>',
    ].join('\n')

    const input = [
      '<Card.List bottom="small">',
      '  <MenuCard url="/a" about="About A" title="A" icon={IconA} />',
      '</Card.List>',
      '',
      unrelated,
    ].join('\n')

    const output = await replace(input)

    expect(output).toContain('- [A](/a) – About A')
    // The unrelated wrapper (which holds no MenuCards) is preserved verbatim.
    expect(output).toContain(unrelated)
  })

  it('renders a MenuCard that is not wrapped in a Card.List', async () => {
    const input = [
      'Intro text.',
      '',
      '<MenuCard url="/solo" about="Solo card" title="Solo" icon={IconSolo} />',
    ].join('\n')

    const output = await replace(input)

    expect(output).toContain('- [Solo](/solo) – Solo card')
    expect(output).not.toContain('<MenuCard')
  })

  it('omits the reason when no "about" is provided', async () => {
    const input = '<MenuCard url="/x" title="X" icon={IconX} />'

    const output = await replace(input)

    expect(output).toBe('- [X](/x)')
  })
})
