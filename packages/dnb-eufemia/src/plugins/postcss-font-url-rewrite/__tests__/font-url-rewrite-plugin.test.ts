import { URL } from 'url'
import postcss from 'postcss'
import postcssFontUrlRewrite from '../font-url-rewrite-plugin'
import { getFontBasePath } from '../config'

describe('font-url-rewrite-plugin', () => {
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
      basePath: getFontBasePath(),
    })
    expect(output.css).toContain(
      `url("${getFontBasePath()}TestFont.woff2")`
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
      basePath: getFontBasePath(),
    })
    expect(output.css).toContain(
      `url("${getFontBasePath()}subdir/TestFont.woff2")`
    )
  })

  it('should rewrite URLs to CDN and verify font exists', async () => {
    const input = `
      @font-face {
        font-family: 'DNB';
        src: url('assets/fonts/dnb/DNB-Regular.woff2') format('woff2');
      }
    `
    const output = await processCSS(input, {
      basePath: getFontBasePath(),
    })

    // Extract the rewritten URL from the output
    const urlMatch = output.css.match(/url\("([^"]+)"\)/)
    expect(urlMatch).toBeTruthy()

    const fontUrl = urlMatch[1]
    expect(fontUrl).toBe(`${getFontBasePath()}dnb/DNB-Regular.woff2`)

    // Make HTTP request to check if font exists on CDN
    const { status, accessible } = await checkUrlExists(fontUrl)

    // Always verify the URL format, regardless of CDN response
    const basePathRegex = getFontBasePath().replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )
    expect(fontUrl).toMatch(new RegExp(`^${basePathRegex}.*\\.woff2$`))

    // Fail the test if font is not accessible on CDN
    expect(accessible).toBe(true)
    expect(status).toBe(200)
  })

  it('should verify CDN font accessibility with actual request', async () => {
    const input = `
      @font-face {
        font-family: 'DNB';
        src: url('assets/fonts/dnb/DNB-Bold.woff2') format('woff2'),
             url('assets/fonts/dnb/DNB-Bold.woff') format('woff');
      }
    `
    const output = await processCSS(input, {
      basePath: getFontBasePath(),
    })

    // Extract all rewritten URLs
    const urlMatches = output.css.match(/url\("([^"]+)"\)/g)
    expect(urlMatches).toBeTruthy()
    expect(urlMatches).toHaveLength(2)

    const urls = urlMatches.map(
      (match) => match.match(/url\("([^"]+)"\)/)[1]
    )

    // Check each font URL format
    const basePathRegex = getFontBasePath().replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )
    for (const fontUrl of urls) {
      expect(fontUrl).toMatch(
        new RegExp(`^${basePathRegex}dnb/DNB-Bold\\.(woff2|woff)$`)
      )
    }

    // Check CDN accessibility for each URL and fail if any are not accessible
    for (const fontUrl of urls) {
      const { status, accessible } = await checkUrlExists(fontUrl)

      expect(accessible).toBe(true)
      expect(status).toBe(200)
    }
  })
})

// Helper function to make HTTP HEAD request
function checkUrlExists(
  urlString: string
): Promise<{ status: number; accessible: boolean }> {
  return new Promise((resolve) => {
    const url = new URL(urlString)
    const http =
      url.protocol === 'https:' ? require('https') : require('http')

    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; EufemiaTest/1.0)',
        },
        timeout: 5000,
      },
      (res) => {
        resolve({
          status: res.statusCode,
          accessible: res.statusCode === 200,
        })
      }
    )

    req.on('error', () => {
      resolve({ status: 0, accessible: false })
    })

    req.on('timeout', () => {
      req.destroy()
      resolve({ status: 0, accessible: false })
    })

    req.end()
  })
}
