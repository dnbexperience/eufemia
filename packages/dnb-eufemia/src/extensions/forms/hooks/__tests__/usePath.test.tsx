import React from 'react'
import { renderHook } from '@testing-library/react'
import usePath from '../usePath'
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
