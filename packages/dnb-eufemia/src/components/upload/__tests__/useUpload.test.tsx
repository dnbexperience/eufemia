import { act, render } from '@testing-library/react'
import useUpload from './../useUpload'
import React, { useEffect } from 'react'
import { createMockFile } from './testHelpers'
import { createSharedState } from '../../../shared/helpers/useSharedState'
import { UploadFile } from '../types'

describe('useUpload', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('return an empty list', () => {
    const validationFunction = jest.fn()

    const MockComponents = () => {
      const { files } = useUpload('id')

      validationFunction(files)

      return <div />
    }

    render(<MockComponents />)

    expect(validationFunction).toHaveBeenCalledWith([])
  })

  it('return the updateFiles function', () => {
    const validationFunction = jest.fn()

    const MockComponents = () => {
      const { setFiles } = useUpload('id')

      validationFunction(setFiles)

      return <div />
    }

    render(<MockComponents />)

    expect(validationFunction).toHaveBeenCalledWith(expect.any(Function))
  })

  it('return the added files', () => {
    const validationFunction = jest.fn()

    const mockFile = createMockFile('fileName.png', 100, 'image/png')

    const MockComponents = () => {
      const { setFiles, files } = useUpload('id')

      useEffect(() => {
        setFiles([{ file: mockFile }])
      }, [])

      validationFunction(files)
      return <div />
    }

    render(<MockComponents />)
    act(() => {
      expect(validationFunction).toHaveBeenCalledWith([{ file: mockFile }])
    })
  })

  it('use the shared state to store a file', () => {
    const mockFile = {
      file: createMockFile('fileName.png', 100, 'image/png'),
    }
    const id = 'unique-id-1'

    const MockComponents = () => {
      const { setFiles } = useUpload(id)

      useEffect(() => setFiles([mockFile]), [])

      return <div />
    }

    render(<MockComponents />)

    const sharedState = createSharedState<{
      files?: Array<UploadFile>
    }>(id)
    const sharedStateFiles = sharedState.get().files
    expect(sharedStateFiles).toEqual([mockFile])
  })

  it('use the event shared state to return a file', () => {
    const mockFile = {
      file: createMockFile('fileName.png', 100, 'image/png'),
    }
    const id = 'unique-id-2'

    const validationFunction = jest.fn()

    const MockComponents = () => {
      const { files } = useUpload(id)

      useEffect(() => {
        validationFunction(files)
      }, [])

      return <div />
    }

    const sharedState = createSharedState(id)
    const sharedStateData = { files: [mockFile] }
    sharedState.update(sharedStateData)

    render(<MockComponents />)

    act(() => {
      expect(validationFunction).toHaveBeenCalledWith([mockFile])
    })
  })
})
