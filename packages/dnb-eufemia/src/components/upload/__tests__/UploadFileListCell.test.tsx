import UploadFileListCell, {
  UploadFileListCellProps,
} from '../UploadFileListCell'
import { createMockFile } from './testHelpers'
import { fireEvent, render, screen } from '@testing-library/react'
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

    const element = document.querySelector(
      '.dnb-upload__file-cell__text-container a'
    )

    expect(element.textContent).toMatch('file.dat')
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

  it('renders a span when file size is 0', () => {
    const fileName = 'file.png'

    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{ file: createMockFile(fileName, 0, 'image/png') }}
      />
    )
    expect(screen.queryByText(fileName).tagName).toBe('SPAN')
    expect(screen.queryByText(fileName)).toHaveClass('dnb-span')
  })

  it('renders a span when file size is not given', () => {
    const fileName = 'file.png'

    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{
          file: createMockFile(fileName, undefined, 'image/png'),
        }}
      />
    )
    expect(screen.queryByText(fileName).tagName).toBe('SPAN')
    expect(screen.queryByText(fileName)).toHaveClass('dnb-span')
  })

  it('renders a button when file size is invalid, but onClick is given', () => {
    const fileName = 'file.png'

    render(
      <UploadFileListCell
        {...defaultProps}
        uploadFile={{
          file: createMockFile(fileName, undefined, 'image/png'),
        }}
        onClick={jest.fn()}
      />
    )

    expect(screen.queryByText(fileName).parentElement.tagName).toBe(
      'BUTTON'
    )
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
      expect(screen.queryByText(fileName).tagName).toBe('A')
    })

    it('renders the anchor href', () => {
      const fileName = 'file.png'
      const mockUrl = 'mock-url'

      const originalCreateObjectURL = global.URL.createObjectURL
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

      global.URL.createObjectURL = originalCreateObjectURL
    })

    it('renders the download attribute', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          download={true}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
            errorMessage: 'error message',
          }}
        />
      )

      const element = document.querySelector('.dnb-upload__file-cell a')

      expect(element).toHaveAttribute('download', 'file.png')
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

    it('executes onClick event when button is clicked', () => {
      const onClick = jest.fn()

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
          }}
          onClick={onClick}
        />
      )
      const element = document.querySelector(
        '.dnb-upload__file-cell button'
      )

      fireEvent.click(element)

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Delete Button', () => {
    it('renders the delete button', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = document.querySelector('button')

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

      const element = document.querySelector('button')

      expect(element.textContent).toMatch(deleteButtonText)
    })

    it('renders button as tertiary', () => {
      render(<UploadFileListCell {...defaultProps} />)

      const element = document.querySelector('button')

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

    it('executes onDelete event when delete button is clicked', () => {
      const onDelete = jest.fn()

      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
          }}
          onDelete={onDelete}
        />
      )
      const element = document.querySelector('button')

      fireEvent.click(element)

      expect(onDelete).toHaveBeenCalledTimes(1)
    })

    it('renders the delete button as disabled when loading state', () => {
      render(
        <UploadFileListCell
          {...defaultProps}
          uploadFile={{
            file: createMockFile('file.png', 100, 'image/png'),
            isLoading: true,
          }}
        />
      )
      const element = document.querySelector('button')

      expect(element).toBeDisabled()
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

    it('should set focus when clicking the delete button', () => {
      const MockComponent = () => {
        return (
          <div className="dnb-upload">
            <UploadFileListCell
              {...defaultProps}
              uploadFile={{
                file: createMockFile('file.png', 100, 'image/png'),
              }}
            />
            <button className="dnb-upload__file-input-button">
              Mock button
            </button>
          </div>
        )
      }
      const { rerender } = render(<MockComponent />)

      const removeButton = document.querySelector('button')
      const uploadButton = document.querySelector(
        '.dnb-upload__file-input-button'
      )

      expect(document.body).toHaveFocus()

      fireEvent.click(removeButton)
      expect(uploadButton).toHaveFocus()

      const focus = jest.fn()
      jest
        .spyOn(HTMLElement.prototype, 'focus')
        .mockImplementationOnce(focus)

      rerender(<MockComponent />)

      fireEvent.click(removeButton)
      expect(focus).toHaveBeenCalledTimes(1)
      expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    })
  })
})
