import React, { useEffect } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Upload from '../Upload'
import nbNO from '../../../shared/locales/nb-NO'
import createMockFile from './testHelpers'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { UploadProps } from '../types'
import useUpload from '../useUpload'

const nb = nbNO['nb-NO'].Upload

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadProps = {
  id: 'id',
  acceptedFileTypes: ['png'],
}

describe('Upload', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    render(<Upload {...defaultProps} />)

    expect(screen.queryByTestId('upload')).not.toBeNull()
  })

  it('renders the upload file input section', () => {
    render(<Upload {...defaultProps} />)

    expect(screen.queryByTestId('upload-file-input')).not.toBeNull()
  })

  describe('Text', () => {
    it('renders the title', () => {
      render(<Upload {...defaultProps} />)

      const element = screen.queryByTestId('upload-title')

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.title)
    })

    it('renders the custom title', () => {
      const customTitle = 'custom title'

      render(<Upload {...defaultProps} title={customTitle} />)

      const element = screen.queryByTestId('upload-title')

      expect(element.textContent).toMatch(customTitle)
    })

    it('renders the text', () => {
      render(<Upload {...defaultProps} />)

      const element = screen.queryByTestId('upload-text')

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.text)
    })

    it('renders the custom text', () => {
      const customText = 'custom text'

      render(<Upload {...defaultProps} text={customText} />)

      const element = screen.queryByTestId('upload-text')

      expect(element.textContent).toMatch(customText)
    })

    it('renders the format description', () => {
      render(<Upload {...defaultProps} />)

      const element = screen.queryByTestId(
        'upload-accepted-formats-description'
      )

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.fileTypeDescription)
    })

    it('renders the custom format description', () => {
      const customFormatDescription = 'custom formats description'

      render(
        <Upload
          {...defaultProps}
          fileTypeDescription={customFormatDescription}
        />
      )

      const element = screen.queryByTestId(
        'upload-accepted-formats-description'
      )

      expect(element.textContent).toMatch(customFormatDescription)
    })

    it('renders the custom accepted format', () => {
      const acceptedFileTypes = ['png, jpg']

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      const element = screen.queryByTestId('upload-accepted-formats')

      const formattedFileTypes = acceptedFileTypes.join(', ').toUpperCase()

      expect(element).not.toBeNull()
      expect(element.textContent).toMatch(formattedFileTypes)
    })

    it('renders the file size description', () => {
      render(<Upload {...defaultProps} />)

      const element = screen.queryByTestId('upload-file-size-description')

      expect(element).not.toBeNull()
    })

    it('renders the custom file size description', () => {
      const fileSizeDescription = 'file size description'

      render(
        <Upload
          {...defaultProps}
          fileSizeDescription={fileSizeDescription}
        />
      )

      const element = screen.queryByTestId('upload-file-size-description')

      expect(element.textContent).toMatch(fileSizeDescription)
    })

    it('renders the file size', () => {
      const fileMaxSize = 2
      render(<Upload {...defaultProps} fileMaxSize={fileMaxSize} />)

      const element = screen.queryByTestId('upload-file-size')

      expect(element).not.toBeNull()
      expect(element.textContent).toMatch(
        String(nb.fileSizeContent).replace('%size', fileMaxSize.toString())
      )
    })

    it('renders the custom file size', () => {
      const fileMaxSize = 2
      const fileSizeContent = '%size custom'

      render(
        <Upload
          {...defaultProps}
          fileMaxSize={fileMaxSize}
          fileSizeContent={fileSizeContent}
        />
      )

      const element = screen.queryByTestId('upload-file-size')

      expect(element.textContent).toMatch(
        String(fileMaxSize).replace('%size', `${fileMaxSize}`)
      )
    })

    it('renders the upload file input section button text', () => {
      render(<Upload {...defaultProps} />)

      const element = screen.queryByTestId('upload-file-input-button')

      expect(element.textContent).toMatch(nb.buttonText)
    })

    it('renders the upload file input section button custom text', () => {
      const buttonText = 'upload button text'

      render(<Upload {...defaultProps} buttonText={buttonText} />)

      const element = screen.queryByTestId('upload-file-input-button')

      expect(element.textContent).toMatch(buttonText)
    })
  })

  describe('useUpload', () => {
    it('calls uses the useUpload hook to store files', async () => {
      const validationFunction = jest.fn()

      const file = createMockFile('fileName.png', 100, 'image/png')

      const id = 'random-id'

      const expectedResult = [{ file }]

      render(<Upload {...defaultProps} id={id} />)

      const inputElement = screen.queryByTestId('upload-file-input-input')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file] },
        })
      )

      const MockComponent = () => {
        const { files } = useUpload(id)
        useEffect(() => validationFunction(files), [])

        return <div />
      }

      render(<MockComponent />)

      expect(validationFunction).toHaveBeenCalledWith(expectedResult)
    })

    it('renders the list of files', async () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
        { file: createMockFile('fileName2.png', 100, 'image/png') },
        { file: createMockFile('fileName3.png', 100, 'image/png') },
      ]

      const id = 'random-id'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCells = screen.queryAllByTestId('upload-file-list-cell')

      expect(fileCells.length).toBe(files.length)
    })

    it('shows no files', async () => {
      const files = []

      const id = 'random-id3'

      const { queryByTestId } = render(
        <Upload {...defaultProps} id={id} />
      )

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }
      render(<MockComponent />)

      const emptyFileCell = queryByTestId('upload-file-list-cell')

      expect(emptyFileCell).toBeNull()
    })

    it('shows the file when the file is added', async () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
      ]

      const id = 'random-id2'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      const emptyFileCell = screen.queryByTestId('upload-file-list-cell')

      expect(emptyFileCell).toBeNull()

      render(<MockComponent />)

      const fileCell = screen.queryByTestId('upload-file-list-cell')

      expect(fileCell).not.toBeNull()
    })

    it('removes the file from the list when clicking delete', () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
      ]

      const id = 'random-id3'

      const { queryByTestId } = render(
        <Upload {...defaultProps} id={id} />
      )
      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCell = queryByTestId('upload-file-list-cell')

      expect(fileCell).not.toBeNull()

      const deleteButton = queryByTestId('upload-delete-button')

      fireEvent.click(deleteButton)

      expect(queryByTestId('upload-file-list-cell')).toBeNull()
    })

    it('sets focus on choose button when clicking delete', () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
      ]

      const id = 'random-id3'

      const { queryByTestId } = render(
        <Upload {...defaultProps} id={id} />
      )
      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const deleteButton = queryByTestId('upload-delete-button')

      fireEvent.click(deleteButton)

      expect(document.activeElement).toBe(
        queryByTestId('upload-file-input-button')
      )
    })
  })
})

describe('Upload aria', () => {
  it('should validate', async () => {
    const Component = render(<Upload {...defaultProps} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Upload scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-upload.scss'))
    expect(scss).toMatchSnapshot()
  })
})
