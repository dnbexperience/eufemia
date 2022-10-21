import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import UploadFileInput from '../UploadFileInput'
import createMockFile from './testHelpers'
import { UploadContextProps } from '../types'
import { UploadContext } from '../UploadContext'

const defaultProps: UploadContextProps = {
  acceptedFileTypes: ['png'],
  onInputUpload: jest.fn(),
  buttonText: 'upload button text',
  fileMaxSize: 1000,
  errorLargeFile: 'error message',
  errorUnsupportedFile: 'error message',
  filesAmountLimit: 2,
}

describe('UploadFileInput', () => {
  const makeWrapper = (props = null) => {
    const defaultContext: UploadContextProps = {
      ...defaultProps,
      ...props,
    }
    return ({ children }) => {
      return (
        <UploadContext.Provider value={defaultContext}>
          {children}
        </UploadContext.Provider>
      )
    }
  }

  it('renders the component', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper(),
    })

    expect(screen.queryByTestId('upload-file-input')).not.toBeNull()
  })

  it('renders the upload button', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper(),
    })
    expect(screen.queryByTestId('upload-file-input-button')).not.toBeNull()
  })

  it('renders the upload button text', () => {
    const buttonText = 'button text'
    render(<UploadFileInput />, {
      wrapper: makeWrapper({
        buttonText: buttonText,
      }),
    })
    expect(
      screen.queryByTestId('upload-file-input-button').textContent
    ).toMatch(buttonText)
  })

  it('accepts multiple files by default', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper(),
    })

    const element = screen.queryByTestId('upload-file-input-input')

    expect(element.hasAttribute('multiple')).toBeTruthy()
  })

  it('accepts ony one file when filesAmountLimit is 1', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper({
        filesAmountLimit: 1,
      }),
    })

    const element = screen.queryByTestId('upload-file-input-input')

    expect(element.hasAttribute('multiple')).toBeFalsy()
  })

  it('renders the input', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper(),
    })
    const element = screen.queryByTestId('upload-file-input-input')

    expect(element).not.toBeNull()
    expect(element.getAttribute('class')).toMatch('dnb-upload__file-input')
  })

  it('simulates a click on the input when clicking the button', () => {
    render(<UploadFileInput />, {
      wrapper: makeWrapper(),
    })

    const buttonElement = screen.queryByTestId('upload-file-input-button')

    const inputElement = screen.queryByTestId('upload-file-input-input')

    const clickEventListener = jest.fn()
    inputElement.addEventListener('click', clickEventListener)

    fireEvent.click(buttonElement)

    expect(clickEventListener).toHaveBeenCalled()
  })

  it('calls the onInputUpload function', async () => {
    const file = createMockFile('fileName.png', 100, 'image/png')

    const onInputUpload = jest.fn()

    render(<UploadFileInput />, {
      wrapper: makeWrapper({ onInputUpload }),
    })

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file] },
      })
    )

    expect(onInputUpload).toHaveBeenCalledWith([{ file }])
  })

  it('can upload multiple files', async () => {
    const file1 = createMockFile('fileName1.png', 100, 'image/png')
    const file2 = createMockFile('fileName2.png', 100, 'image/png')

    const onInputUpload = jest.fn()

    render(<UploadFileInput />, {
      wrapper: makeWrapper({ onInputUpload }),
    })

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file1, file2] },
      })
    )

    expect(onInputUpload).toHaveBeenCalledWith([
      { file: file1 },
      { file: file2 },
    ])
  })
})
