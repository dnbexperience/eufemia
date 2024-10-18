import UploadFileListCell, {
  UploadFileListCellProps,
} from '../UploadFileListCell'
import { createMockFile } from './testHelpers'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { UploadContext } from '../UploadContext'
import { UploadContextProps } from '../types'

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadFileListCellProps = {
  id: 'unique',
  deleteButtonText: 'delete',
  onDelete: jest.fn(),
  uploadFile: { file: createMockFile('file.png', 100, 'image/png') },
  loadingText: 'loading',
}

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

describe('UploadFileListCell', () => {
  it('renders the component', () => {
    render(<UploadFileListCell {...defaultProps} />)

    expect(
      document.querySelector('.dnb-upload__file-cell')
    ).toBeInTheDocument()
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

    const element = document.querySelector('.dnb-upload__file-cell')

    expect(element.className).toMatch('dnb-upload__file-cell--warning')
  })

  it('supports special file extensions', async () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.dat', 100, 'dat') }}
      />
    )

    const element = document.querySelector('.dnb-upload__file-cell__title')
    const fileExtension = document.querySelector(
      '.dnb-upload__file-cell__subtitle'
    )

    expect(element.textContent).toMatch('file.dat')
    expect(fileExtension.textContent).toMatch('DAT')
  })

  it('supports not displaying file extension text', async () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.dat', 100, 'dat') }}
        displayFileExtensionText={false}
      />
    )

    expect(
      document.querySelector('.dnb-upload__file-cell__subtitle')
    ).not.toBeInTheDocument()
  })

  it('renders the no error styling', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />
    )

    const element = document.querySelector('.dnb-upload__file-cell')

    expect(element.className).not.toMatch('dnb-upload__file-cell--error')
    expect(element.className).toMatch('dnb-upload__file-cell')
  })

  it('renders the subtitle and uses the file mime', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />
    )

    expect(screen.queryByText('PNG')).toBeInTheDocument()
  })

  it('renders the subtitle and uses the extension if mime is missing', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, '') }}
      />
    )

    expect(screen.queryByText('PNG')).toBeInTheDocument()
  })

  it('renders the subtitle with file extension when set by acceptedFileTypes', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />,
      {
        wrapper: makeWrapper({ acceptedFileTypes: ['png'] }),
      }
    )

    expect(screen.queryByText('PNG')).toBeInTheDocument()
  })

  it('renders the subtitle with file mime when set by acceptedFileTypes', () => {
    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile('file.png', 100, 'image/png') }}
      />,
      {
        wrapper: makeWrapper({ acceptedFileTypes: ['image/png'] }),
      }
    )

    expect(screen.queryByText('PNG')).toBeInTheDocument()
  })

  it('renders the form errorMessage warning', () => {
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

    expect(screen.queryByText(errorMessage)).toBeInTheDocument()
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
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file pdf medium icon')
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file xls medium icon')
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file ppt medium icon')
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file csv medium icon')
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file txt medium icon')
      ).toBeInTheDocument()
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

      expect(
        screen.queryByTestId('file xml medium icon')
      ).toBeInTheDocument()
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

      expect(screen.queryByTestId('file medium icon')).toBeInTheDocument()
    })
  })

  describe('File Anchor', () => {
    it('renders the anchor', () => {
      const fileName = 'file.png'

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{ file: createMockFile(fileName, 100, 'image/png') }}
        />
      )
      expect(screen.queryByText(fileName)).toBeInTheDocument()
    })

    it('renders the anchor href', () => {
      const fileName = 'file.png'
      const mockUrl = 'mock-url'

      global.URL.createObjectURL = jest.fn().mockReturnValueOnce(mockUrl)

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile(fileName, 100, 'image/png'),
          }}
        />
      )
      const anchorElement = screen.queryByText(
        fileName
      ) as HTMLAnchorElement
      expect(anchorElement.href).toMatch(mockUrl)
    })

    it('renders without the error style', () => {
      const fileName = 'file.png'

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile(fileName, 100, 'image/png'),
          }}
        />
      )

      const anchorElement = screen.queryByText(fileName)

      expect(anchorElement.className).not.toMatch(
        'dnb-upload__file-cell--error'
      )
    })
  })

  describe('Delete Button', () => {
    it('renders the delete button', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = screen.getByRole('button')

      expect(element).toBeInTheDocument()
    })

    it('renders the delete button text', () => {
      const deleteButtonText = 'delete'

      render(
        <UploadFileListCell
          deleteButtonText={deleteButtonText}
          {...defaultProps}
        />
      )

      const element = screen.getByRole('button')

      expect(element.textContent).toMatch(deleteButtonText)
    })

    it('renders button as tertiary', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = screen.getByRole('button')

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

      expect(
        document.querySelector('.dnb-progress-indicator')
      ).toBeInTheDocument()
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

      expect(
        document.querySelector('.dnb-progress-indicator')
      ).not.toBeInTheDocument()
    })
  })
})
