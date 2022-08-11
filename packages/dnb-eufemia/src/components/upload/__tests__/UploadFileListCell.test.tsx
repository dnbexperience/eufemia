import UploadFileListCell from '../UploadFileListCell'
import createMockFile from './testHelpers'
import { render, screen } from '@testing-library/react'
import React from 'react'

global.URL.createObjectURL = jest.fn(() => 'url')

describe('UploadFileListCell', () => {
  it('renders the component', () => {
    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
      />
    )

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element).not.toBeNull()
  })

  it('renders the error styling', () => {
    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
        errorMessage="error message"
      />
    )

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element.className).toMatch('dnb-upload__file-cell--error')
    expect(element.className).not.toMatch(
      'dnb-upload__file-cell--no-error'
    )
  })

  it('renders the no error styling', () => {
    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
      />
    )

    const element = screen.queryByTestId('upload-file-list-cell')

    expect(element.className).not.toMatch('dnb-upload__file-cell--error')
    expect(element.className).toMatch('dnb-upload__file-cell--no-error')
  })

  it('renders the subtitle', () => {
    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
      />
    )

    const element = screen.queryByTestId('upload-subtitle')

    expect(element).not.toBeNull()
    expect(element.textContent).toMatch('PNG')
  })

  it('renders the form status warning', () => {
    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
        errorMessage="message"
      />
    )

    const element = screen.queryByTestId('upload-warning')

    expect(element).not.toBeNull()
  })

  it('renders the form status warning message', () => {
    const errorMessage = 'error message'

    render(
      <UploadFileListCell
        deleteButtonText="delete"
        onDelete={jest.fn()}
        file={createMockFile('file.png', 100, 'image/png')}
        errorMessage={errorMessage}
      />
    )

    const element = screen.queryByTestId('upload-warning')

    expect(element.textContent).toMatch(errorMessage)
  })

  describe('Icons', () => {
    it('renders the exclamation icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
          errorMessage="error message"
        />
      )

      const iconElement = screen.queryByTestId('upload-exclamation-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'exclamation medium icon'
      )
    })

    it('renders the pdf icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.pdf', 100, 'application/pdf')}
        />
      )

      const iconElement = screen.queryByTestId('upload-pdf-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file pdf medium icon'
      )
    })

    it('renders the xls icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.xls', 100, 'application/xls')}
        />
      )

      const iconElement = screen.queryByTestId('upload-xls-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file xls medium icon'
      )
    })

    it('renders the ppt icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.xls', 100, 'application/xls')}
        />
      )

      const iconElement = screen.queryByTestId('upload-xls-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file xls medium icon'
      )
    })

    it('renders the csv icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.csv', 100, 'image/csv')}
        />
      )

      const iconElement = screen.queryByTestId('upload-csv-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file csv medium icon'
      )
    })

    it('renders the txt icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.txt', 100, 'text/txt')}
        />
      )

      const iconElement = screen.queryByTestId('upload-txt-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file txt medium icon'
      )
    })

    it('renders the xml icon', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.xml', 100, 'application/xml')}
        />
      )

      const iconElement = screen.queryByTestId('upload-xml-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file xml medium icon'
      )
    })

    it('renders the file icon as default', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.custom', 100, 'application/custom')}
        />
      )

      const iconElement = screen.queryByTestId('upload-file-icon')

      expect(iconElement).not.toBeNull()
      expect(iconElement.getAttribute('data-test-id')).toBe(
        'file medium icon'
      )
    })
  })

  describe('File Anchor', () => {
    it('renders the anchor', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
        />
      )
      const anchorElement = screen.queryByTestId('upload-file-anchor')

      expect(anchorElement).not.toBeNull()
    })

    it('renders the anchor text', () => {
      const fileName = 'file.png'

      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile(fileName, 100, 'image/png')}
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
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
        />
      )
      const anchorElement = screen.queryByTestId(
        'upload-file-anchor'
      ) as HTMLAnchorElement
      expect(anchorElement.href).toMatch(mockUrl)
    })

    it('renders with the error style', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
          errorMessage="error message"
        />
      )

      const anchorElement = screen.queryByTestId('upload-file-anchor')

      expect(anchorElement.className).toMatch(
        'dnb-upload__file-cell--error'
      )
    })

    it('renders without the error style', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
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
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
        />
      )

      const element = screen.queryByTestId('upload-delete-button')

      expect(element).not.toBeNull()
    })

    it('renders the delete button text', () => {
      const deleteButtonText = 'delete'

      render(
        <UploadFileListCell
          deleteButtonText={deleteButtonText}
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
        />
      )

      const element = screen.queryByTestId('upload-delete-button')

      expect(element.textContent).toMatch(deleteButtonText)
    })

    it('renders button as tertiary', () => {
      render(
        <UploadFileListCell
          deleteButtonText="delete"
          onDelete={jest.fn()}
          file={createMockFile('file.png', 100, 'image/png')}
        />
      )

      const element = screen.queryByTestId('upload-delete-button')

      expect(element.className).toMatch('dnb-button--tertiary')
    })
  })
})
