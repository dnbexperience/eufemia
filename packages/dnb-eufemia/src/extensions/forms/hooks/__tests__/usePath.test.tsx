import React from 'react'
import { renderHook } from '@testing-library/react'
import usePath, { appendPath, cleanPath } from '../usePath'
import { Form, Iterate } from '../../Forms'

describe('usePath', () => {
  it('should throw error when "path" without slash is given', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() =>
        usePath({
          path: 'withoutSlash',
        })
      )
    }).toThrow('path="withoutSlash" must start with a slash')

    log.mockRestore()
  })

  it('should throw then "itemPath" without slash was given', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() =>
        usePath({
          itemPath: 'withoutSlash',
        })
      )
    }).toThrow('itemPath="withoutSlash" must start with a slash')

    log.mockRestore()
  })

  it('should return the correct identifier when sectionPath is defined', () => {
    const sectionPath = '/sectionPath'
    const path = '/path'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>{children}</Form.Section>
      ),
    })
    expect(result.current.path).toBe(`${sectionPath}${path}`)
  })

  it('should access root data when path starts with //', () => {
    const sectionPath = '/sectionPath'
    const path = '//rootPath'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>{children}</Form.Section>
      ),
    })
    expect(result.current.path).toBe('/rootPath')
  })

  it('should access root data with // in nested sections', () => {
    const outerSectionPath = '/outer'
    const innerSectionPath = '/inner'
    const path = '//rootPath'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={outerSectionPath}>
          <Form.Section path={innerSectionPath}>{children}</Form.Section>
        </Form.Section>
      ),
    })
    expect(result.current.path).toBe('/rootPath')
  })

  it('should handle // with root path', () => {
    const sectionPath = '/sectionPath'
    const path = '//'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>{children}</Form.Section>
      ),
    })
    expect(result.current.path).toBe('/')
  })

  it('should handle // with nested paths', () => {
    const sectionPath = '/user/address'
    const path = '//profile/name'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>{children}</Form.Section>
      ),
    })
    expect(result.current.path).toBe('/profile/name')
  })

  it('should reset section context when nested section path starts with //', () => {
    const { result } = renderHook(() => usePath({ path: '/field' }), {
      wrapper: ({ children }) => (
        <Form.Section path="/outer">
          <Form.Section path="//global">{children}</Form.Section>
        </Form.Section>
      ),
    })
    expect(result.current.path).toBe('/global/field')
  })

  it('joinPath', () => {
    const { result } = renderHook(() => usePath(), {})
    expect(
      result.current.joinPath([undefined, null, '', 'foo/', '/bar//'])
    ).toBe('/foo/bar')
  })

  it('should return the correct identifier when itemPath is defined', () => {
    const path = '/path'
    const iteratePath = '/iteratePath'
    const itemPath = '/itemPath'
    const iterateElementIndex = 0
    const { result } = renderHook(() => usePath({ path, itemPath }), {
      wrapper: ({ children }) => (
        <Iterate.Array path={iteratePath} value={['one']}>
          {children}
        </Iterate.Array>
      ),
    })
    expect(result.current.identifier).toBe(
      `${iteratePath}/${iterateElementIndex}${itemPath}`
    )
    expect(result.current.path).toBe(
      `${iteratePath}/${iterateElementIndex}${itemPath}`
    )
    expect(result.current.itemPath).toBe(
      `${iteratePath}/${iterateElementIndex}${itemPath}`
    )
  })

  it('should clean paths properly when "iteratePath" is just a slash', () => {
    const path = '/path'
    const iteratePath = '/'
    const itemPath = '/itemPath'
    const iterateElementIndex = 0
    const { result } = renderHook(() => usePath({ path, itemPath }), {
      wrapper: ({ children }) => (
        <Iterate.Array path={iteratePath} value={['one']}>
          {children}
        </Iterate.Array>
      ),
    })
    expect(result.current.path).toBe(`/${iterateElementIndex}${itemPath}`)
    expect(result.current.itemPath).toBe(
      `/${iterateElementIndex}${itemPath}`
    )
  })

  it('should return a combined path when Iterate is inside Form.Section', () => {
    const path = '/path'
    const sectionPath = '/sectionPath'
    const iteratePath = '/iteratePath'
    const itemPath = '/itemPath'
    const iterateElementIndex = 0
    const { result } = renderHook(() => usePath({ path, itemPath }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>
          <Iterate.Array path={iteratePath} value={['one']}>
            {children}
          </Iterate.Array>
        </Form.Section>
      ),
    })
    expect(result.current.path).toBe(
      `${sectionPath}${iteratePath}/${iterateElementIndex}${itemPath}`
    )
  })

  it('should remove trailing slash from path when path is a slash only', () => {
    const path = '/'
    const sectionPath = '/section'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Form.Section path={sectionPath}>{children}</Form.Section>
      ),
    })
    expect(result.current.path).toBe(`${sectionPath}`)
  })

  it('should return the correct identifier when neither sectionPath nor itemPath is defined', () => {
    const path = '/path'
    const id = 'testId'
    const { result } = renderHook(() => usePath({ path, id }))
    expect(result.current.identifier).toBe(path)
    expect(result.current.path).toBe(path)
  })

  it('should return id if not path is given', () => {
    const path = undefined
    const id = 'testId'
    const { result } = renderHook(() => usePath({ path, id }))
    expect(result.current.identifier).toBe(id)
    expect(result.current.path).toBe(path)
  })

  describe('makeIteratePath', () => {
    it('should support nested itemPath', () => {
      const path = '/path'
      const iteratePath = '/iteratePath'
      const itemPath = '/itemPath'
      const iterateElementIndex = 0
      const { result } = renderHook(() => usePath({ path, itemPath }), {
        wrapper: ({ children }) => (
          <Iterate.Array path={iteratePath} value={['outer']}>
            {children}
          </Iterate.Array>
        ),
      })
      expect(result.current.makeIteratePath(itemPath, iteratePath)).toBe(
        `${iteratePath}/${iterateElementIndex}${itemPath}`
      )
    })
  })
})

describe('appendPath', () => {
  it('should concatenate base and part when both are provided', () => {
    expect(appendPath('/section', '/field')).toBe('/section/field')
    expect(appendPath('/section/path', '/field')).toBe(
      '/section/path/field'
    )
    expect(appendPath('/section', '/field/nested')).toBe(
      '/section/field/nested'
    )
  })

  it('should return base when part is undefined', () => {
    expect(appendPath('/section', undefined)).toBe('/section')
    expect(appendPath('/section/path', undefined)).toBe('/section/path')
  })

  it('should return part when base is empty string', () => {
    expect(appendPath('', '/field')).toBe('/field')
    expect(appendPath('', '/field/nested')).toBe('/field/nested')
  })

  it('should normalize "/" base to empty and return part', () => {
    expect(appendPath('/', '/field')).toBe('/field')
    expect(appendPath('/', '/field/nested')).toBe('/field/nested')
  })

  it('should normalize "/" part to empty and return base', () => {
    expect(appendPath('/section', '/')).toBe('/section')
    expect(appendPath('/section/path', '/')).toBe('/section/path')
  })

  it('should return "/" when both base and part are "/"', () => {
    expect(appendPath('/', '/')).toBe('/')
  })

  it('should return "/" when both base and part are empty or normalized to empty', () => {
    expect(appendPath('', '')).toBe('/')
    expect(appendPath('/', undefined)).toBe('/')
    expect(appendPath(undefined as any, '/')).toBe('/')
  })

  it('should handle empty string base and undefined part', () => {
    expect(appendPath('', undefined)).toBe('/')
  })

  it('should handle real-world error path scenarios', () => {
    // Simulating the actual usage in Provider.tsx
    expect(appendPath('/section', '/field')).toBe('/section/field')
    expect(appendPath('/section', '/field/error')).toBe(
      '/section/field/error'
    )
    expect(appendPath('/', '/field')).toBe('/field')
    expect(appendPath('/section', '/')).toBe('/section')
  })
})

describe('cleanPath', () => {
  it('should remove duplicate slashes', () => {
    expect(cleanPath('/foo///bar')).toBe('/foo/bar')
    expect(cleanPath('//foo//bar//')).toBe('/foo/bar')
    expect(cleanPath('/foo//bar//baz')).toBe('/foo/bar/baz')
  })

  it('should remove trailing slashes', () => {
    expect(cleanPath('/foo/bar/')).toBe('/foo/bar')
    expect(cleanPath('/foo/')).toBe('/foo')
    expect(cleanPath('/foo/bar/baz///')).toBe('/foo/bar/baz')
  })

  it('should handle both duplicate and trailing slashes', () => {
    expect(cleanPath('/foo///bar///')).toBe('/foo/bar')
    expect(cleanPath('//foo//bar//')).toBe('/foo/bar')
    expect(cleanPath('///foo///bar///')).toBe('/foo/bar')
  })

  it('should leave normal paths unchanged', () => {
    expect(cleanPath('/foo/bar')).toBe('/foo/bar')
    expect(cleanPath('/foo')).toBe('/foo')
  })

  it('should handle root path by removing trailing slashes', () => {
    // cleanPath removes trailing slashes, so '/' becomes empty string
    expect(cleanPath('/')).toBe('')
    expect(cleanPath('//')).toBe('')
    expect(cleanPath('///')).toBe('')
  })

  it('should handle single segment paths', () => {
    expect(cleanPath('/foo')).toBe('/foo')
    expect(cleanPath('/foo/')).toBe('/foo')
    expect(cleanPath('//foo')).toBe('/foo')
    expect(cleanPath('//foo//')).toBe('/foo')
  })

  it('should handle complex paths with multiple segments', () => {
    expect(cleanPath('/section/path/field')).toBe('/section/path/field')
    expect(cleanPath('/section//path//field')).toBe('/section/path/field')
    expect(cleanPath('/section/path/field/')).toBe('/section/path/field')
    expect(cleanPath('/section//path//field///')).toBe(
      '/section/path/field'
    )
  })

  it('should handle paths from the comment example', () => {
    // From the comment: /foo///bar/// => /foo/bar
    expect(cleanPath('/foo///bar///')).toBe('/foo/bar')
  })
})
