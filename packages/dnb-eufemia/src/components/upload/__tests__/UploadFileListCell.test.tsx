import UploadFileListCell, {
  UploadFileListCellProps,
} from '../UploadFileListCell'
import { createMockFile } from './testHelpers'
import { render, screen } from '@testing-library/react'
import React from 'react'

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadFileListCellProps = {
  id: 'unique',
  deleteButtonText: 'delete',
  onDelete: jest.fn(),
  uploadFile: { file: createMockFile('file.png', 100, 'image/png') },
  loadingText: 'loading',
}

describe('UploadFileListCell', () => {
  it('renders the component', () => {
    render(<UploadFileListCell {...defaultProps} />)

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element).not.toBeNull()
  })

  it('renders the error styling', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{
          file: createMockFile('file.png', 100, 'image/png'),
          errorMessage: 'error message',
        }}
      />
    )

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element.className).toMatch('dnb-upload__file-cell--warning')
  })

  it('renders the no error styling', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />
    )

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element.className).not.toMatch('dnb-upload__file-cell--error')
    expect(element.className).toMatch('dnb-upload__file-cell')
  })

  it('renders the subtitle', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />
    )

    const element = screen.queryByTestId('upload-subtitle')

    expect(element).not.toBeNull()
    expect(element.textContent).toMatch('PNG')
  })

  it('renders the form errorMessage warning', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{
          file: createMockFile('file.png', 100, 'image/png'),
          errorMessage: 'errorMessage',
        }}
      />
    )

    const element = screen.queryByTestId('upload-warning')

    expect(element).not.toBeNull()
  })

  it('renders the form errorMessage warning message', () => {
    const errorMessage = 'error message'

    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{
          file: createMockFile('file.png', 100, 'image/png'),
          errorMessage: errorMessage,
        }}
      />
    )

    const element = screen.queryByTestId('upload-warning')

    expect(element.textContent).toMatch(errorMessage)
  })

  describe('Icons', () => {
    it('renders the exclamation icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
            errorMessage: 'error message',
          }}
        />
      )

      expect(
        screen.queryByTestId('exclamation medium icon')
      ).not.toBeNull()
    })

    it('renders the pdf icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.pdf', 100, 'application/pdf'),
          }}
        />
      )

      expect(screen.queryByTestId('file pdf medium icon')).not.toBeNull()
    })

    it('renders the xls icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.xls', 100, 'application/xls'),
          }}
        />
      )

      expect(screen.queryByTestId('file xls medium icon')).not.toBeNull()
    })

    it('renders the ppt icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.ppt', 100, 'application/ppt'),
          }}
        />
      )

      expect(screen.queryByTestId('file ppt medium icon')).not.toBeNull()
    })

    it('renders the csv icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.csv', 100, 'image/csv'),
          }}
        />
      )

      expect(screen.queryByTestId('file csv medium icon')).not.toBeNull()
    })

    it('renders the txt icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.txt', 100, 'text/txt'),
          }}
        />
      )

      expect(screen.queryByTestId('file txt medium icon')).not.toBeNull()
    })

    it('renders the xml icon', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.xml', 100, 'application/xml'),
          }}
        />
      )

      expect(screen.queryByTestId('file xml medium icon')).not.toBeNull()
    })

    it('renders the file icon as default', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.custom', 100, 'application/custom'),
          }}
        />
      )

      expect(screen.queryByTestId('file medium icon')).not.toBeNull()
    })
  })

  describe('File Anchor', () => {
    it('renders the anchor', () => {
      render(<UploadFileListCell {...defaultProps} />)
      const anchorElement = screen.queryByTestId('upload-file-anchor')

      expect(anchorElement).not.toBeNull()
    })

    it('renders the anchor text', () => {
      const fileName = 'file.png'

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{ file: createMockFile(fileName, 100, 'image/png') }}
        />
      )
      const anchorElement = screen.queryByTestId('upload-file-anchor')
      expect(anchorElement.textContent).toMatch(fileName)
    })

    it('renders the anchor href', () => {
      const mockUrl = 'mock-url'

      global.URL.createObjectURL = jest.fn().mockReturnValueOnce(mockUrl)

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
          }}
        />
      )
      const anchorElement = screen.queryByTestId(
        'upload-file-anchor'
      ) as HTMLAnchorElement
      expect(anchorElement.href).toMatch(mockUrl)
    })

    it('renders without the error style', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
          }}
        />
      )

      const anchorElement = screen.queryByTestId('upload-file-anchor')

      expect(anchorElement.className).not.toMatch(
        'dnb-upload__file-cell--error'
      )
    })
  })

  describe('Delete Button', () => {
    it('renders the delete button', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = screen.queryByTestId('upload-delete-button')

      expect(element).not.toBeNull()
    })

    it('renders the delete button text', () => {
      const deleteButtonText = 'delete'

      render(
        <UploadFileListCell
          deleteButtonText={deleteButtonText}
          {...defaultProps}
        />
      )

      const element = screen.queryByTestId('upload-delete-button')

      expect(element.textContent).toMatch(deleteButtonText)
    })

    it('renders button as tertiary', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = screen.queryByTestId('upload-delete-button')

      expect(element.className).toMatch('dnb-button--tertiary')
    })

    it('renders the file cell loading state', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
            isLoading: true,
          }}
        />
      )

      const element = screen.queryByTestId('upload-progress-indicator')

      expect(element).not.toBeNull()
    })

    it('does not render the loading state when not loading', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
            isLoading: false,
          }}
        />
      )

      const element = screen.queryByTestId('upload-progress-indicator')

      expect(element).toBeNull()
    })
  })
})
