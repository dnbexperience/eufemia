import React from 'react'
import { renderHook } from '@testing-library/react'
import usePath from '../usePath'
import { Composite, Iterate } from '../../Forms'

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

  it('should return the correct identifier when compositePath is defined', () => {
    const compositePath = '/compositePath'
    const path = '/path'
    const { result } = renderHook(() => usePath({ path }), {
      wrapper: ({ children }) => (
        <Composite.Block path={compositePath}>{children}</Composite.Block>
      ),
    })
    expect(result.current.path).toBe(`${compositePath}${path}`)
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
    expect(result.current.path).toBe(
      `${iteratePath}/${iterateElementIndex}${itemPath}`
    )
    expect(result.current.itemPath).toBe(
      `${iteratePath}/${iterateElementIndex}${itemPath}`
    )
  })

  it('should return a combined path when Iterate is inside Composite', () => {
    const path = '/path'
    const compositePath = '/compositePath'
    const iteratePath = '/iteratePath'
    const itemPath = '/itemPath'
    const iterateElementIndex = 0
    const { result } = renderHook(() => usePath({ path, itemPath }), {
      wrapper: ({ children }) => (
        <Composite.Block path={compositePath}>
          <Iterate.Array path={iteratePath} value={['one']}>
            {children}
          </Iterate.Array>
        </Composite.Block>
      ),
    })
    expect(result.current.path).toBe(
      `${compositePath}${iteratePath}/${iterateElementIndex}${itemPath}`
    )
  })

  it('should return the correct identifier when neither compositePath nor itemPath is defined', () => {
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
})
