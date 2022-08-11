import UploadFileList from '../UploadFileList'
import createMockFile from './testHelpers'
import { render, screen, within } from '@testing-library/react'
import React from 'react'
import { UploadValidationError } from '../types'

global.URL.createObjectURL = jest.fn(() => 'url')

describe('UploadFileList', () => {
  it('renders the component', () => {
    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat="error"
        errorMessageLargeFile="error"
        onDeleteFile={jest.fn()}
        files={[
          {
            file: createMockFile('file.png', 100, 'image/png'),
            error: UploadValidationError.NONE,
          },
        ]}
      />
    )

    const element = screen.queryByTestId('upload-file-list')

    expect(element).not.toBeNull()
  })

  it('does not render if the files list is empty', () => {
    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat="error"
        errorMessageLargeFile="error"
        onDeleteFile={jest.fn()}
        files={[]}
      />
    )

    const element = screen.queryByTestId('upload-file-list')

    expect(element).toBeNull()
  })

  it('renders the correct amount of file list cells', () => {
    const allFiles = [
      {
        file: createMockFile('file.png', 100, 'image/png'),
        error: UploadValidationError.NONE,
      },
      {
        file: createMockFile('file2.png', 100, 'image/png'),
        error: UploadValidationError.NONE,
      },
      {
        file: createMockFile('file3.png', 100, 'image/png'),
        error: UploadValidationError.NONE,
      },
    ]

    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat="error"
        errorMessageLargeFile="error"
        onDeleteFile={jest.fn()}
        files={allFiles}
      />
    )

    const fileListCells = within(
      screen.queryByTestId('upload-file-list')
    ).queryAllByTestId('upload-file-list-cell')

    expect(fileListCells.length).toBe(allFiles.length)
  })

  it('does not render the error message when there are no errors', () => {
    const errorMessageFileFormat = 'errorMessageFileFormat'
    const errorMessageLargeFile = 'errorMessageLargeFile'

    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat={errorMessageFileFormat}
        errorMessageLargeFile={errorMessageLargeFile}
        onDeleteFile={jest.fn()}
        files={[
          {
            file: createMockFile('file.png', 100, 'image/png'),
            error: UploadValidationError.NONE,
          },
        ]}
      />
    )

    expect(screen.queryByText(errorMessageLargeFile)).toBeNull()
    expect(screen.queryByText(errorMessageFileFormat)).toBeNull()
  })

  it('renders the file size error message', () => {
    const errorMessageLargeFile = 'errorMessageLargeFile'

    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat="error"
        errorMessageLargeFile={errorMessageLargeFile}
        onDeleteFile={jest.fn()}
        files={[
          {
            file: createMockFile('file.png', 100, 'image/png'),
            error: UploadValidationError.LARGE_FILE_SIZE,
          },
        ]}
      />
    )

    expect(screen.queryByText(errorMessageLargeFile)).not.toBeNull()
  })

  it('renders the file type error message', () => {
    const errorMessageFileFormat = 'errorMessageFileFormat'

    render(
      <UploadFileList
        deleteButtonText="delete"
        errorMessageFileFormat={errorMessageFileFormat}
        errorMessageLargeFile={'error'}
        onDeleteFile={jest.fn()}
        files={[
          {
            file: createMockFile('file.png', 100, 'image/png'),
            error: UploadValidationError.WRONG_FILE_TYPE,
          },
        ]}
      />
    )

    expect(screen.queryByText(errorMessageFileFormat)).not.toBeNull()
  })
})
