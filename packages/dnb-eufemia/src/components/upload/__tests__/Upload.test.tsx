import React, { useEffect } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import Upload from '../Upload'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { createMockFile } from './testHelpers'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { UploadAllProps } from '../types'
import useUpload from '../useUpload'
import Provider from '../../../shared/Provider'

const nb = nbNO['nb-NO'].Upload
const en = enGB['en-GB'].Upload

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadAllProps = {
  id: 'id',
  acceptedFileTypes: ['png'],
}

describe('Upload', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    render(<Upload {...defaultProps} />)

    expect(document.querySelector('.dnb-upload')).not.toBeNull()
  })

  it('renders the upload file input section', () => {
    render(<Upload {...defaultProps} />)

    expect(
      document.querySelector('.dnb-upload__file-input')
    ).not.toBeNull()
  })

  describe('Text', () => {
    it('renders the title', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.title)).toBeTruthy()
    })

    it('renders the custom title', () => {
      const customTitle = 'custom title'

      render(<Upload {...defaultProps} title={customTitle} />)

      expect(screen.queryByText(customTitle)).toBeTruthy()
    })

    it('renders the text', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.text)).toBeTruthy()
    })

    it('renders the custom text', () => {
      const customText = 'custom text'

      render(<Upload {...defaultProps} text={customText} />)

      expect(screen.queryByText(customText)).toBeTruthy()
    })

    it('renders the format description', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.fileTypeDescription)).toBeTruthy()
    })

    it('renders the custom format description', () => {
      const customFormatDescription = 'custom formats description'

      render(
        <Upload
          {...defaultProps}
          fileTypeDescription={customFormatDescription}
        />
      )

      expect(screen.queryByText(customFormatDescription)).toBeTruthy()
    })

    it('renders the custom accepted format', () => {
      const acceptedFileTypes = ['png', 'jpg']

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      const formattedFileTypes = acceptedFileTypes.join(', ').toUpperCase()

      expect(screen.queryByText(formattedFileTypes)).toBeTruthy()
    })

    it('renders the file size description', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.fileSizeDescription)).toBeTruthy()
    })

    it('renders the custom file size description', () => {
      const fileSizeDescription = 'file size description'

      render(
        <Upload
          {...defaultProps}
          fileSizeDescription={fileSizeDescription}
        />
      )

      expect(screen.queryByText(fileSizeDescription)).toBeTruthy()
    })

    it('renders the file size', () => {
      const fileMaxSize = 2
      render(<Upload {...defaultProps} fileMaxSize={fileMaxSize} />)

      expect(
        screen.queryByText(
          String(nb.fileSizeContent).replace(
            '%size',
            fileMaxSize.toString()
          )
        )
      ).toBeTruthy()
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

      expect(
        screen.queryByText(
          String(fileSizeContent).replace('%size', `${fileMaxSize}`)
        )
      ).toBeTruthy()
    })

    it('renders the file amount limit description', () => {
      const filesAmountLimit = 2
      render(
        <Upload {...defaultProps} filesAmountLimit={filesAmountLimit} />
      )

      expect(screen.queryByText(nb.fileAmountDescription)).toBeTruthy()
      expect(screen.queryByText(String(filesAmountLimit))).toBeTruthy()
    })

    it('renders the upload file input section button text', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.buttonText)).toBeTruthy()
    })

    it('renders the upload file input section button custom text', () => {
      const buttonText = 'upload button text'

      render(<Upload {...defaultProps} buttonText={buttonText} />)

      expect(screen.queryByText(buttonText)).toBeTruthy()
    })

    it('should support locale prop', () => {
      const { rerender } = render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.title)).toBeTruthy()

      rerender(<Upload {...defaultProps} locale="en-GB" />)

      expect(screen.queryByText(en.title)).toBeTruthy()
    })

    it('should support locale from provider', () => {
      const { rerender } = render(
        <Provider>
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(nb.title)).toBeTruthy()

      rerender(
        <Provider locale="en-GB">
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(en.title)).toBeTruthy()

      rerender(
        <Provider locale="nb-NO">
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(nb.title)).toBeTruthy()
    })

    it('should support spacing props', () => {
      render(<Upload top="2rem" {...defaultProps} />)

      const element = document.querySelector('.dnb-upload')
      const attributes = Array.from(element.attributes).map(
        (attr) => attr.name
      )

      expect(attributes).toEqual(['class', 'style'])
      expect(Array.from(element.classList)).toEqual(
        expect.arrayContaining(['dnb-space', 'dnb-space__top--large'])
      )
    })
  })

  it('will only accept one file if filesAmountLimit is 1', async () => {
    const id = 'filesAmountLimit'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} filesAmountLimit={1} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    await act(async () => {
      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1, file2] },
        })
      )

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file2, file2] },
        })
      )

      expect(result.current.files.length).toBe(1)
      expect(result.current.files).toEqual([
        { file: file1, id: expect.any(String), exists: false },
      ])
      expect(
        screen.queryByText(nb.errorAmountLimit.replace('%amount', '1'))
      ).toBeTruthy()
      expect(result.current.internalFiles.length).toBe(3)

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(element.querySelector('.dnb-form-status')).toBeFalsy()

      expect(
        screen
          .queryByRole('button', {
            name: nb.buttonText,
          })
          .hasAttribute('disabled')
      ).toBe(false)
    })
  })

  it('will accept same file only once', async () => {
    const id = 'only-once'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    await act(async () => {
      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1] },
        })
      )
      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1, file2] },
        })
      )

      expect(result.current.files.length).toBe(2)
      expect(result.current.files).toEqual([
        { file: file1, id: expect.any(String), exists: false },
        { file: file2, id: expect.any(String), exists: false },
      ])
      expect(result.current.internalFiles.length).toBe(3)
      expect(result.current.internalFiles).toEqual([
        { file: file1, id: expect.any(String), exists: false },
        { file: file1, id: expect.any(String), exists: true },
        { file: file2, id: expect.any(String), exists: false },
      ])
    })
  })

  it('will highlight same file', async () => {
    const id = 'highlight'

    renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    await act(async () => {
      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1] },
        })
      )
      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1, file2] },
        })
      )

      expect(
        element.querySelectorAll('.dnb-upload__file-cell--highlight')
      ).toHaveLength(1)
      expect(
        Array.from(
          element.querySelectorAll('.dnb-upload__file-cell')[0].classList
        )
      ).toEqual(
        expect.arrayContaining(['dnb-upload__file-cell--highlight'])
      )
    })
  })

  describe('useUpload', () => {
    it('calls uses the useUpload hook to store files', async () => {
      const validationFunction = jest.fn()

      const file = createMockFile('fileName.png', 100, 'image/png')

      const id = 'random-id'

      const expectedResult = [
        { file, id: expect.any(String), exists: false },
      ]

      render(<Upload {...defaultProps} id={id} />)

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )

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

      const fileCells = document.querySelectorAll('.dnb-upload__file-cell')

      expect(fileCells.length).toBe(files.length)
    })

    it('shows no files', async () => {
      const files = []

      const id = 'random-id3'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }
      render(<MockComponent />)

      const emptyFileCell = document.querySelector(
        '.dnb-upload__file-cell'
      )

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

      const emptyFileCell = document.querySelector(
        '.dnb-upload__file-cell'
      )

      expect(emptyFileCell).toBeNull()

      render(<MockComponent />)

      const fileCell = document.querySelector('.dnb-upload__file-cell')

      expect(fileCell).not.toBeNull()
    })

    it('removes the file from the list when clicking delete', () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
      ]

      const id = 'random-id3'

      render(<Upload {...defaultProps} id={id} />)
      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCell = document.querySelector('.dnb-upload__file-cell')

      expect(fileCell).not.toBeNull()

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(document.querySelector('.dnb-upload__file-cell')).toBeNull()
    })

    it('sets focus on choose button when clicking delete', () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
      ]

      const id = 'random-id3'

      render(<Upload {...defaultProps} id={id} />)
      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(document.activeElement).toBe(
        screen.queryByRole('button', {
          name: nb.buttonText,
        })
      )
    })

    it('returns the file size error message', async () => {
      const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

      const fileMaxSize = 1
      const errorMessage = 'error message %size'

      render(
        <Upload
          {...defaultProps}
          fileMaxSize={fileMaxSize}
          errorLargeFile={errorMessage}
        />
      )

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file1] },
        })
      )

      expect(
        screen.queryByText(`error message ${fileMaxSize}`)
      ).toBeTruthy()
    })
  })

  describe('events', () => {
    it('will call onChange when file gets added or removed', async () => {
      const id = 'onChange'
      const onChange = jest.fn()

      render(<Upload {...defaultProps} id={id} onChange={onChange} />)

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file1] },
        })
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        files: [{ file: file1, id: expect.any(String), exists: false }],
      })

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      await waitFor(() => fireEvent.click(deleteButton))

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenCalledWith({ files: [] })
    })

    it('will call onFileDelete when file gets removed', async () => {
      const id = 'onFileDelete'
      const onFileDelete = jest.fn()

      render(
        <Upload {...defaultProps} id={id} onFileDelete={onFileDelete} />
      )

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file1] },
        })
      )

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      await waitFor(() => fireEvent.click(deleteButton))

      expect(onFileDelete).toHaveBeenCalledTimes(1)
      expect(onFileDelete).toHaveBeenCalledWith({
        fileItem: { file: file1, id: expect.any(String), exists: false },
      })
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

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-upload-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
