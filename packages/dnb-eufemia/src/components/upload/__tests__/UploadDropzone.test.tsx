import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { wait } from '@testing-library/user-event/dist/utils'
import UploadDropzone from '../UploadDropzone'
import { createMockFile } from './testHelpers'
import { UploadContext } from '../UploadContext'
import type { UploadAllProps, UploadContextProps } from '../types'

const defaultProps: Partial<UploadAllProps> = {
  id: 'unique',
  className: 'upload-drop-zone',
}

const defaultContext: UploadContextProps = {
  id: 'unique-id',
  acceptedFileTypes: ['png'],
  onInputUpload: jest.fn(),
  buttonText: 'upload button text',
  fileMaxSize: 1000,
  errorLargeFile: 'error message',
  errorUnsupportedFile: 'error message',
  filesAmountLimit: 2,
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
    defaultContext.onInputUpload = jest.fn()
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

  it('has "active" class on dragEnter event', async () => {
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

    fireEvent.dragLeave(dropZone)

    await waitFor(() =>
      expect(Array.from(getRootElement().classList)).not.toContain(
        'dnb-upload--active'
      )
    )
  })

  describe('body listeners', () => {
    const getBodyElement = () => document.body

    beforeEach(() => {
      document.body = document.createElement('body')
    })

    it('has attribute while mounted', async () => {
      const { unmount } = render(<MockComponent {...defaultProps} />)

      await waitFor(() =>
        expect(document.body.getAttribute('data-upload-drop-zone')).toBe(
          ''
        )
      )

      unmount()

      expect(document.body.hasAttribute('data-upload-drop-zone')).toBe(
        false
      )
    })

    it('has drop event', async () => {
      defaultContext.onInputUpload = jest.fn()
      render(<MockComponent {...defaultProps} />)

      const bodyDropZone = getBodyElement()
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')
      const file2 = createMockFile('fileName-2.png', 100, 'image/png')

      await wait(10)

      fireEvent.drop(bodyDropZone, {
        dataTransfer: { files: [file1, file2] },
      })

      expect(defaultContext.onInputUpload).toHaveBeenCalledTimes(1)
      expect(defaultContext.onInputUpload).toHaveBeenLastCalledWith([
        { file: file1 },
        { file: file2 },
      ])
    })

    it('has "active" class on dragEnter event', async () => {
      render(<MockComponent {...defaultProps} />)

      const bodyDropZone = getBodyElement()

      await wait(10)

      fireEvent.dragOver(bodyDropZone)

      expect(Array.from(getRootElement().classList)).toEqual(
        expect.arrayContaining(['dnb-upload--active'])
      )
    })

    it('has not "active" class on dragLeave event', async () => {
      render(<MockComponent {...defaultProps} />)

      const bodyDropZone = getBodyElement()

      await wait(10)

      fireEvent.dragOver(bodyDropZone)

      expect(Array.from(getRootElement().classList)).toEqual(
        expect.arrayContaining(['dnb-upload--active'])
      )

      fireEvent.dragLeave(bodyDropZone)

      await waitFor(() =>
        expect(Array.from(getRootElement().classList)).not.toContain(
          'dnb-upload--active'
        )
      )
    })
  })
})
