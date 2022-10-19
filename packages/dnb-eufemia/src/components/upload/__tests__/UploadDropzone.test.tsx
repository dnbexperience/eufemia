import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import UploadDropzone from '../UploadDropzone'
import createMockFile from './testHelpers'
import { UploadContext } from '../UploadContext'
import type { UploadAllProps, UploadContextProps } from '../types'
import { wait } from '@testing-library/user-event/dist/utils'

const defaultProps: Partial<UploadAllProps> = {
  id: 'unique',
  className: 'upload-drop-zone',
}

const defaultContext: UploadContextProps = {
  acceptedFileTypes: ['png'],
  onInputUpload: jest.fn(),
  buttonText: 'upload button text',
  fileMaxSize: 1000,
  errorLargeFile: 'error message',
  errorUnsupportedFile: 'error message',
  singleFile: false,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe('Upload', () => {
  const MockComponent = (props: Partial<UploadAllProps>) => {
    return (
      <UploadContext.Provider value={defaultContext}>
        <UploadDropzone {...props} />
      </UploadContext.Provider>
    )
  }

  const getRootElement = () => document.querySelector('.upload-drop-zone')

  it('renders the component', () => {
    render(<MockComponent {...defaultProps} />)

    expect(getRootElement()).not.toBeNull()
    expect(Array.from(getRootElement().classList)).toEqual(
      expect.arrayContaining([
        'dnb-space',
        'dnb-height-animation',
        'upload-drop-zone',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--parallax',
      ])
    )
  })

  it('has drop event', () => {
    render(<MockComponent {...defaultProps} />)

    const dropZone = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    fireEvent.drop(dropZone, { dataTransfer: { files: [file1, file2] } })

    expect(defaultContext.onInputUpload).toHaveBeenCalledTimes(1)
    expect(defaultContext.onInputUpload).toHaveBeenLastCalledWith([
      { file: file1 },
      { file: file2 },
    ])
  })

  it('will only accept one file if singleFile is true', () => {
    render(
      <UploadContext.Provider
        value={{ ...defaultContext, singleFile: true }}
      >
        <UploadDropzone {...defaultProps} />
      </UploadContext.Provider>
    )

    const dropZone = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    fireEvent.drop(dropZone, { dataTransfer: { files: [file1, file2] } })
    fireEvent.drop(dropZone, { dataTransfer: { files: [file2, file2] } })

    expect(defaultContext.onInputUpload).toHaveBeenCalledTimes(2)
    expect(defaultContext.onInputUpload).toHaveBeenLastCalledWith([
      { file: file1 },
    ])
  })

  it('has "active" class on dragOver event', () => {
    render(<MockComponent {...defaultProps} />)

    const dropZone = getRootElement()

    fireEvent.dragOver(dropZone)

    expect(Array.from(getRootElement().classList)).toEqual(
      expect.arrayContaining(['dnb-upload--active'])
    )
  })

  it('has not "active" class on dragLeave event', async () => {
    render(<MockComponent {...defaultProps} />)

    const dropZone = getRootElement()

    fireEvent.dragOver(dropZone)

    expect(Array.from(getRootElement().classList)).toEqual(
      expect.arrayContaining(['dnb-upload--active'])
    )

    await act(async () => {
      fireEvent.dragLeave(dropZone)

      await wait(300)

      expect(Array.from(getRootElement().classList)).not.toContain(
        'dnb-upload--active'
      )
    })
  })
})
