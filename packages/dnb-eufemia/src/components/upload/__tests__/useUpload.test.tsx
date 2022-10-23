import { act, render } from '@testing-library/react'
import useUpload from './../useUpload'
import React, { useEffect } from 'react'
import { createMockFile } from './testHelpers'
import EventEmitter from '../../../../src/shared/helpers/EventEmitter'

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

  it('use the event emitter to store a file', () => {
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

    const emitter = EventEmitter.createInstance(id)
    const emitterFiles = emitter.get().files

    expect(emitterFiles).toMatchObject([mockFile])
  })

  it('use the event emitter to return a file', () => {
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

    const emitter = EventEmitter.createInstance(id)
    const emitterData = { files: [mockFile] }
    emitter.update(emitterData)

    render(<MockComponents />)

    act(() => {
      expect(validationFunction).toHaveBeenCalledWith([mockFile])
    })
  })
})
