import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import UploadFileInput from '../UploadFileInput'
import createMockFile from './testHelpers'

describe('UploadFileInput', () => {
  it('renders the component', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
      />
    )

    expect(screen.queryByTestId('upload-file-input')).not.toBeNull()
  })

  it('renders the upload button', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
      />
    )
    expect(screen.queryByTestId('upload-file-input-button')).not.toBeNull()
  })

  it('renders the upload button text', () => {
    const buttonText = 'button text'
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText={buttonText}
      />
    )
    expect(
      screen.queryByTestId('upload-file-input-button').textContent
    ).toMatch(buttonText)
  })

  it('accepts multiple files when multipleFiles is true', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
        multipleFiles={true}
      />
    )

    const element = screen.queryByTestId('upload-file-input-input')

    expect(element.hasAttribute('multiple')).toBeTruthy()
  })

  it('renders the input', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
      />
    )
    const element = screen.queryByTestId('upload-file-input-input')

    expect(element).not.toBeNull()
    expect(element.getAttribute('class')).toMatch(
      'dnb-upload__file-button'
    )
  })

  it('renders the sr only label for the input', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
      />
    )

    const element = screen.queryByTestId('upload-file-input-sr-label')

    expect(element).not.toBeNull()
  })

  it('renders the correct id for input and input sr label', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn}
        uploadFileButtonText="button text"
      />
    )

    const srLabelElement = screen.queryByTestId(
      'upload-file-input-sr-label'
    )
    const inputElement = screen.queryByTestId('upload-file-input-input')

    expect(srLabelElement.getAttribute('for')).toBe(
      inputElement.getAttribute('id')
    )
  })

  it('simulates a click on the input when clicking the button', () => {
    render(
      <UploadFileInput
        onUpload={jest.fn()}
        uploadFileButtonText="button text"
      />
    )

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

    render(
      <UploadFileInput
        onUpload={onUpload}
        uploadFileButtonText="button text"
      />
    )

    const inputElement = screen.queryByTestId('upload-file-input-input')

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file] },
      })
    )

    expect(onUpload).toHaveBeenCalledWith(file)
  })
})
