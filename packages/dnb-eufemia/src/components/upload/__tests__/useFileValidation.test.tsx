import { render } from '@testing-library/react'
import { UploadValidationError } from '../types'
import useFileValivation from './../useFileValidation'
import createMockFile from './testHelpers'
import React, { useEffect } from 'react'

describe('useFileValidation', () => {
  it('returns no error', () => {
    const validationFn = jest.fn()

    const TestComponent = () => {
      const { validate } = useFileValivation({
        fileMaxSize: 1,
        acceptedFileTypes: ['png'],
      })

      const file = createMockFile('myFile.png', 1000, 'image/png')

      useEffect(() => {
        validationFn(validate(file))
      })

      return <div />
    }

    render(<TestComponent />)

    expect(validationFn).toHaveBeenCalledWith(UploadValidationError.NONE)
  })
  it('returns large file size error', () => {
    const validationFn = jest.fn()

    const TestComponent = () => {
      const { validate } = useFileValivation({
        fileMaxSize: 1,
        acceptedFileTypes: ['png'],
      })

      const file = createMockFile('myFile.png', 100000000, 'image/png')

      useEffect(() => {
        validationFn(validate(file))
      })

      return <div />
    }

    render(<TestComponent />)

    expect(validationFn).toHaveBeenCalledWith(
      UploadValidationError.LARGE_FILE_SIZE
    )
  })

  it('returns wrong file type', () => {
    const validationFn = jest.fn()

    const TestComponent = () => {
      const { validate } = useFileValivation({
        fileMaxSize: 10000,
        acceptedFileTypes: ['pdf', 'jpg', 'customfile'],
      })

      const file = createMockFile('myFile.png', 10000000, 'image/png')

      useEffect(() => {
        validationFn(validate(file))
      })

      return <div />
    }

    render(<TestComponent />)

    expect(validationFn).toHaveBeenCalledWith(
      UploadValidationError.WRONG_FILE_TYPE
    )
  })
})
