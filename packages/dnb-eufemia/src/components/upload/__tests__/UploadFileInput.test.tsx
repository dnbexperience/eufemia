import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import UploadFileInput, { UploadFileInputProps } from '../UploadFileInput'
import createMockFile from './testHelpers'

const defaultProps: UploadFileInputProps = {
  acceptedFormats: ['png'],
  onUpload: jest.fn(),
  buttonText: 'upload button text',
  fileMaxSize: 1000,
  errorLargeFile: 'error message',
  errorUnsupportedFile: 'error message',
  multipleFiles: false,
}

describe('UploadFileInput', () => {
  it('renders the component', () => {
    render(<UploadFileInput {...defaultProps} />)

    expect(screen.queryByTestId('upload-file-input')).not.toBeNull()
  })

  it('renders the upload button', () => {
    render(<UploadFileInput {...defaultProps} />)
    expect(screen.queryByTestId('upload-file-input-button')).not.toBeNull()
  })

  it('renders the upload button text', () => {
    const buttonText = 'button text'
    render(<UploadFileInput {...defaultProps} buttonText={buttonText} />)
    expect(
      screen.queryByTestId('upload-file-input-button').textContent
    ).toMatch(buttonText)
  })

  it('accepts multiple files when multipleFiles is true', () => {
    render(<UploadFileInput {...defaultProps} multipleFiles={true} />)

    const element = screen.queryByTestId('upload-file-input-input')

    expect(element.hasAttribute('multiple')).toBeTruthy()
  })

  it('renders the input', () => {
    render(<UploadFileInput {...defaultProps} />)
    const element = screen.queryByTestId('upload-file-input-input')

    expect(element).not.toBeNull()
    expect(element.getAttribute('class')).toMatch('dnb-upload__file-input')
  })

  it('simulates a click on the input when clicking the button', () => {
    render(<UploadFileInput {...defaultProps} />)

    const buttonElement = screen.queryByTestId('upload-file-input-button')

    const inputElement = screen.queryByTestId('upload-file-input-input')

    const clickEventListener = jest.fn()
    inputElement.addEventListener('click', clickEventListener)

    fireEvent.click(buttonElement)

    expect(clickEventListener).toHaveBeenCalled()
  })

  it('calls the onUpload function', async () => {
    const file = createMockFile('fileName.png', 100, 'image/png')

    const onUpload = jest.fn()

    render(<UploadFileInput {...defaultProps} onUpload={onUpload} />)

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file] },
      })
    )
    expect(onUpload).toHaveBeenCalledWith([{ file }])
  })

  it('can upload multiple files', async () => {
    const file1 = createMockFile('fileName1.png', 100, 'image/png')
    const file2 = createMockFile('fileName2.png', 100, 'image/png')

    const onUpload = jest.fn()

    render(<UploadFileInput {...defaultProps} onUpload={onUpload} />)

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file1, file2] },
      })
    )
    expect(onUpload).toHaveBeenCalledWith([
      { file: file1 },
      { file: file2 },
    ])
  })

  it('returns the file size error message', async () => {
    const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

    const fileMaxSize = 1
    const errorMessage = 'error message %size'
    const errorMessageFormatted = `error message ${fileMaxSize}`

    const onUpload = jest.fn()

    render(
      <UploadFileInput
        {...defaultProps}
        onUpload={onUpload}
        fileMaxSize={fileMaxSize}
        errorLargeFile={errorMessage}
      />
    )

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file1] },
      })
    )
    expect(onUpload).toHaveBeenCalledWith([
      { file: file1, errorMessage: errorMessageFormatted },
    ])
  })
})
