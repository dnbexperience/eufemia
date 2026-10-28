import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Portal page language', () => {
  it('declares English in the HTML template used for development and prerendering', () => {
    const html = readFileSync(
      resolve(__dirname, '../client/index.html'),
      'utf-8'
    )
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.documentElement.lang).toBe('en')
  })
})
