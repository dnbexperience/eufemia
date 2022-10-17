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
  multipleFiles: false,
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
    const file = createMockFile('fileName.png', 100, 'image/png')

    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } })

    expect(defaultContext.onInputUpload).toHaveBeenCalledTimes(1)
    expect(defaultContext.onInputUpload).toHaveBeenCalledWith([{ file }])
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
