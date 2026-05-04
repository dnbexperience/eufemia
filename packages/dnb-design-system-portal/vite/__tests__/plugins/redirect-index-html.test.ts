import { describe, it, expect, vi, afterEach } from 'vitest'
import redirectIndexHtmlPlugin, {
  redirectIndexHtmlMiddleware,
  trailingSlashMiddleware,
} from '../../client/plugins/redirect-index-html'
import fs from 'node:fs'

describe('redirect-index-html', () => {
  function createMockReqRes(url: string) {
    const req = { url }
    const res = {
      writeHead: vi.fn(),
      end: vi.fn(),
    }
    const next = vi.fn()
    return { req, res, next }
  }

  describe('redirectIndexHtmlMiddleware', () => {
    const middleware = redirectIndexHtmlMiddleware()

    it('redirects /path/index.html to /path/', () => {
      const { req, res, next } = createMockReqRes(
        '/uilib/components/button/demos/index.html'
      )
      middleware(req as any, res as any, next)

      expect(res.writeHead).toHaveBeenCalledWith(301, {
        Location: '/uilib/components/button/demos/',
      })
      expect(res.end).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
    })

    it('redirects /index.html to /', () => {
      const { req, res, next } = createMockReqRes('/index.html')
      middleware(req as any, res as any, next)

      expect(res.writeHead).toHaveBeenCalledWith(301, {
        Location: '/',
      })
      expect(res.end).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
    })

    it('does not redirect clean URLs', () => {
      const { req, res, next } = createMockReqRes(
        '/uilib/components/button/'
      )
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it('does not redirect non-index HTML files', () => {
      const { req, res, next } = createMockReqRes('/404.html')
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it('does not redirect when url is undefined', () => {
      const req = { url: undefined }
      const res = { writeHead: vi.fn(), end: vi.fn() }
      const next = vi.fn()
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  describe('trailingSlashMiddleware', () => {
    const outDir = '/out'

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('redirects /path to /path/ when index.html exists', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes(
        '/uilib/components/button'
      )
      middleware(req as any, res as any, next)

      expect(res.writeHead).toHaveBeenCalledWith(301, {
        Location: '/uilib/components/button/',
      })
      expect(res.end).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
    })

    it('preserves query string when redirecting', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes(
        '/uilib/components/button?skeleton'
      )
      middleware(req as any, res as any, next)

      expect(res.writeHead).toHaveBeenCalledWith(301, {
        Location: '/uilib/components/button/?skeleton',
      })
    })

    it('does not redirect when index.html does not exist', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(false)
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes('/nonexistent')
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it('does not redirect paths that already have a trailing slash', () => {
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes(
        '/uilib/components/button/'
      )
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it('does not redirect the root path', () => {
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes('/')
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })

    it('does not redirect paths with file extensions', () => {
      const middleware = trailingSlashMiddleware(outDir)
      const { req, res, next } = createMockReqRes('/assets/style.css')
      middleware(req as any, res as any, next)

      expect(res.writeHead).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = redirectIndexHtmlPlugin()
      expect(plugin.name).toBe('redirect-index-html')
    })

    it('has configureServer hook', () => {
      const plugin = redirectIndexHtmlPlugin()
      expect(plugin.configureServer).toBeDefined()
    })

    it('has configurePreviewServer hook', () => {
      const plugin = redirectIndexHtmlPlugin()
      expect(plugin.configurePreviewServer).toBeDefined()
    })

    it('has configResolved hook', () => {
      const plugin = redirectIndexHtmlPlugin()
      expect(plugin.configResolved).toBeDefined()
    })
  })
})
