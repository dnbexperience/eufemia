import postcss from 'postcss'
import postcssFontUrlRewrite from '../postcss-plugin-font-url-rewrite'

describe('postcss-plugin-font-url-rewrite', () => {
  const processCSS = async (css, opts = {}) => {
    return await postcss([postcssFontUrlRewrite(opts)]).process(css, {
      from: undefined,
    })
  }

  it('should rewrite font URLs with default options', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should rewrite font URLs with custom base path', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input, {
      basePath: '/custom/fonts/',
    })
    expect(output.css).toContain('url("/custom/fonts/TestFont.woff2")')
  })

  it('should remove hash from filename', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont-123abc456def.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should handle multiple font sources', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont-123abc.woff2') format('woff2'),
             url('assets/fonts/TestFont-456def.woff') format('woff');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
    expect(output.css).toContain('url("/new-path/TestFont.woff")')
  })

  it('should handle URLs with quotes', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url("assets/fonts/TestFont.woff2") format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should handle URLs with single quotes', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should handle URLs without quotes', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url(assets/fonts/TestFont.woff2) format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should maintain directory structure', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/subdir/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/subdir/TestFont.woff2")')
  })

  it('should not modify non-font-face rules', async () => {
    const input = `
      .test {
        background: url('images/test.png');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain("url('images/test.png')")
  })

  it('should not modify URLs without assets/fonts/ path', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('fonts/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain("url('fonts/TestFont.woff2')")
  })

  it('should handle verbose logging', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('fonts/TestFont.woff2') format('woff2');
      }
    `
    await processCSS(input, { verbose: true })
    expect(consoleSpy).toHaveBeenCalledWith(
      `Skipped (no match for "assets/fonts/"): fonts/TestFont.woff2`
    )
    consoleSpy.mockRestore()
  })

  it('should handle Windows-style paths with backslashes', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets\\fonts\\TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/TestFont.woff2")')
  })

  it('should handle Windows-style paths with mixed slashes', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts\\subdir\\TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input)
    expect(output.css).toContain('url("/new-path/subdir/TestFont.woff2")')
  })

  it('should handle basePath as full URL', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input, {
      basePath: 'https://eufemia.dnb.no/fonts/',
    })
    expect(output.css).toContain(
      'url("https://eufemia.dnb.no/fonts/TestFont.woff2")'
    )
  })

  it('should handle basePath as full URL with subdirectories', async () => {
    const input = `
      @font-face {
        font-family: 'TestFont';
        src: url('assets/fonts/subdir/TestFont.woff2') format('woff2');
      }
    `
    const output = await processCSS(input, {
      basePath: 'https://eufemia.dnb.no/fonts/',
    })
    expect(output.css).toContain(
      'url("https://eufemia.dnb.no/fonts/subdir/TestFont.woff2")'
    )
  })
})
