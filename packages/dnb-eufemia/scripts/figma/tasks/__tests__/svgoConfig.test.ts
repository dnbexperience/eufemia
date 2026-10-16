import { optimize } from 'svgo'
import type { Config } from 'svgo'
import svgoConfig from '../../../../svgo.config'

const optimizeIcon = (svg: string) =>
  optimize(svg, { path: 'pin.svg', ...(svgoConfig as Config) }).data

describe('svgo.config', () => {
  it('removes a clip path that covers the whole view box', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g clip-path="url(#a)"><path stroke="#000" stroke-width="1.5" d="M1 15 5 10"/></g><defs><clipPath id="a"><rect width="16" height="16" fill="#fff"/></clipPath></defs></svg>'

    expect(optimizeIcon(svg)).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#000" stroke-width="1.5" d="m1 15 4-5"/></svg>'
    )
  })

  it('keeps a clip path that covers only a part of the view box', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g clip-path="url(#a)"><path stroke="#000" stroke-width="1.5" d="M1 15 5 10"/></g><defs><clipPath id="a"><rect width="8" height="16" fill="#fff"/></clipPath></defs></svg>'

    expect(optimizeIcon(svg)).toContain('clip-path="url(#pin_svg__a)"')
    expect(optimizeIcon(svg)).toContain('<clipPath id="pin_svg__a">')
  })
})
