import React, { useEffect } from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
} from '@testing-library/react'
import Upload from '../Upload'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { createMockFile } from './testHelpers'
import { loadScss, axeComponent, wait } from '../../../core/jest/jestSetup'
import { UploadAllProps } from '../types'
import useUpload from '../useUpload'
import Provider from '../../../shared/Provider'
import IconPrimary from '../../IconPrimary'

const nb = nbNO['nb-NO'].Upload
const en = enGB['en-GB'].Upload

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadAllProps = {
  acceptedFileTypes: ['png'],
}

describe('Upload', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    render(<Upload {...defaultProps} />)

    expect(document.querySelector('.dnb-upload')).toBeInTheDocument()
  })

  it('renders default button', () => {
    render(<Upload {...defaultProps} />)

    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--secondary')
    expect(button.classList).toContain('dnb-button--icon-position-left')
    expect(button.textContent).toBe(nb.buttonText)
  })

  it('renders custom button icon using buttonProps', () => {
    const { rerender } = render(
      <Upload
        {...defaultProps}
        buttonProps={{
          icon: <span className="dnb-icon custom-icon">icon</span>,
        }}
      />
    )
    expect(document.querySelector('.custom-icon')).toBeInTheDocument()

    rerender(
      <Upload
        {...defaultProps}
        buttonProps={{
          icon: (
            <IconPrimary icon="bell" className="custom-icon-component" />
          ),
        }}
      />
    )

    expect(document.querySelector('.custom-icon')).not.toBeInTheDocument()
    expect(
      document.querySelector('.custom-icon-component')
    ).toBeInTheDocument()
  })

  it('opens file dialog when clicking button', () => {
    render(<Upload {...defaultProps} />)

    const input = document.querySelector('.dnb-upload__file-input')
    const inputClick = jest.spyOn(input as HTMLInputElement, 'click')

    fireEvent.click(
      document.querySelector('.dnb-upload__file-input-button')
    )

    expect(inputClick).toHaveBeenCalledTimes(1)
  })

  it('renders custom onClick using buttonProps', () => {
    const onClick = jest.fn()

    render(
      <Upload
        {...defaultProps}
        buttonProps={{
          onClick,
        }}
      />
    )

    const input = document.querySelector('.dnb-upload__file-input')
    const inputClick = jest.spyOn(input as HTMLInputElement, 'click')

    fireEvent.click(
      document.querySelector('.dnb-upload__file-input-button')
    )

    expect(inputClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders the upload file input section', () => {
    render(<Upload {...defaultProps} />)

    expect(
      document.querySelector('.dnb-upload__file-input')
    ).toBeInTheDocument()
  })

  it('renders custom content using children', () => {
    render(<Upload {...defaultProps}>My custom content</Upload>)

    expect(screen.getByText('My custom content')).toBeInTheDocument()
  })

  describe('Text', () => {
    it('renders the title', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.title)).toBeInTheDocument()
    })

    it('renders the custom title', () => {
      const customTitle = 'custom title'

      render(<Upload {...defaultProps} title={customTitle} />)

      expect(screen.queryByText(customTitle)).toBeInTheDocument()
    })

    it('renders the text', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.text)).toBeInTheDocument()
    })

    it('renders the custom text', () => {
      const customText = 'custom text'

      render(<Upload {...defaultProps} text={customText} />)

      expect(screen.queryByText(customText)).toBeInTheDocument()
    })

    it('supports inline styling', () => {
      render(<Upload {...defaultProps} style={{ color: 'red' }} />)
      expect(
        document
          .querySelector('.dnb-upload__file-input')
          .getAttribute('style')
      ).toBe('color: red;')
    })

    it('renders the format description', () => {
      render(<Upload {...defaultProps} />)

      expect(
        screen.queryByText(nb.fileTypeDescription)
      ).toBeInTheDocument()
    })

    it('renders the custom format description', () => {
      const customFormatDescription = 'custom formats description'

      render(
        <Upload
          {...defaultProps}
          fileTypeDescription={customFormatDescription}
        />
      )

      expect(
        screen.queryByText(customFormatDescription)
      ).toBeInTheDocument()
    })

    it('does not render text when text is false', () => {
      render(<Upload {...defaultProps} text={false} />)

      expect(screen.queryByText(nb.text)).not.toBeInTheDocument()
    })

    it('does not render text when text is empty string', () => {
      render(<Upload {...defaultProps} text="" />)

      expect(screen.queryByText(nb.text)).not.toBeInTheDocument()
    })

    it('does not render title when title is false', () => {
      render(<Upload {...defaultProps} title={false} />)

      expect(screen.queryByText(nb.title)).not.toBeInTheDocument()
    })

    it('does not render title when title is empty string', () => {
      render(<Upload {...defaultProps} title="" />)

      expect(screen.queryByText(nb.title)).not.toBeInTheDocument()
    })

    it('does not render fileTypeDescription when acceptedFileTypes is empty', () => {
      const acceptedFileTypes = []

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      expect(
        screen.queryByText(nb.fileTypeDescription)
      ).not.toBeInTheDocument()
    })

    it('does not render the accepted file types table when acceptedFileTypes is an array of strings', () => {
      const acceptedFileTypes = ['jpg', 'png']

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      expect(
        screen.queryByText(nb.fileTypeTableCaption)
      ).not.toBeInTheDocument()
    })

    it('renders the accepted file types table when acceptedFileTypes is an array of objects', () => {
      const acceptedFileTypes = [
        { fileType: 'jpg', fileMaxSize: 1 },
        { fileType: 'png', fileMaxSize: 2 },
      ]

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      expect(
        screen.queryByText(nb.fileTypeTableCaption)
      ).toBeInTheDocument()
    })

    it('renders the correct grouping of file types based on file max size', () => {
      const fileMaxSize = 99

      const fileMaxSize1Types = [
        {
          fileType: 'jpg',
          fileMaxSize: 1,
        },
        {
          fileType: 'doc',
          fileMaxSize: 1,
        },
        {
          fileType: 'svg',
          fileMaxSize: 1,
        },
        {
          fileType: 'gif',
          fileMaxSize: 1,
        },
      ]

      const fileMaxSize2Types = [
        {
          fileType: 'docx',
          fileMaxSize: 2,
        },
      ]

      const fileMaxSizeUndefinedTypes = [
        {
          fileType: 'odt',
        },
        {
          fileType: 'pdf',
        },
      ]

      const fileMaxSizeDisabledTypes = [
        {
          fileType: 'text',
          fileMaxSize: false,
        },
        {
          fileType: 'txt',
          fileMaxSize: 0,
        },
      ]

      const fileMaxSizeSameTypes = [
        {
          fileType: 'zip',
          fileMaxSize,
        },
      ]

      const acceptedFileTypes = [
        ...fileMaxSize1Types,
        ...fileMaxSize2Types,
        ...fileMaxSizeUndefinedTypes,
        ...fileMaxSizeDisabledTypes,
        ...fileMaxSizeSameTypes,
      ]

      render(
        <Upload
          {...defaultProps}
          fileMaxSize={fileMaxSize}
          acceptedFileTypes={acceptedFileTypes}
        />
      )

      expect(screen.queryByText('ODT, PDF, ZIP')).toBeInTheDocument()
      expect(screen.queryByText('DOCX')).toBeInTheDocument()
      expect(screen.queryByText('DOC, GIF, JPG, SVG')).toBeInTheDocument()
      expect(screen.queryByText('TEXT, TXT')).toBeInTheDocument()
    })

    it('renders the custom accepted format', () => {
      const acceptedFileTypes = ['png', 'jpg']

      render(
        <Upload {...defaultProps} acceptedFileTypes={acceptedFileTypes} />
      )

      const formattedFileTypes = acceptedFileTypes.join(', ').toUpperCase()

      expect(screen.queryByText(formattedFileTypes)).toBeInTheDocument()
    })

    it('renders the file size description', () => {
      render(<Upload {...defaultProps} />)

      expect(
        screen.queryByText(nb.fileSizeDescription)
      ).toBeInTheDocument()
    })

    it('renders the custom file size description', () => {
      const fileSizeDescription = 'file size description'

      render(
        <Upload
          {...defaultProps}
          fileSizeDescription={fileSizeDescription}
        />
      )

      expect(screen.queryByText(fileSizeDescription)).toBeInTheDocument()
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
      ).toBeInTheDocument()
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
      ).toBeInTheDocument()
    })

    it('renders no file size when fileMaxSize is disabled', () => {
      const fileMaxSize = 0
      render(<Upload {...defaultProps} fileMaxSize={fileMaxSize} />)

      expect(
        screen.queryByText(
          String(nb.fileSizeContent).replace(
            '%size',
            fileMaxSize.toString()
          )
        )
      ).not.toBeInTheDocument()
    })

    it('renders no custom file size when fileMaxSize is disabled', () => {
      const fileMaxSize = false
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
      ).not.toBeInTheDocument()
    })

    it('renders the file amount limit description', () => {
      const filesAmountLimit = 2
      render(
        <Upload {...defaultProps} filesAmountLimit={filesAmountLimit} />
      )

      expect(
        screen.queryByText(nb.fileAmountDescription)
      ).toBeInTheDocument()
      expect(
        screen.queryByText(String(filesAmountLimit))
      ).toBeInTheDocument()
    })

    it('renders the upload file input section button text', () => {
      render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.buttonText)).toBeInTheDocument()
    })

    it('renders the upload file input section button custom text', () => {
      const buttonText = 'upload button text'

      render(<Upload {...defaultProps} buttonText={buttonText} />)

      expect(screen.queryByText(buttonText)).toBeInTheDocument()
    })

    it('renders the upload file input section button as disabled', () => {
      render(<Upload {...defaultProps} disabled />)

      expect(
        screen.queryByRole('button', {
          name: nb.buttonText,
        })
      ).toHaveAttribute('disabled')
    })

    it('should support locale prop', () => {
      const { rerender } = render(<Upload {...defaultProps} />)

      expect(screen.queryByText(nb.title)).toBeInTheDocument()

      rerender(<Upload {...defaultProps} locale="en-GB" />)

      expect(screen.queryByText(en.title)).toBeInTheDocument()
    })

    it('should support locale from provider', () => {
      const { rerender } = render(
        <Provider>
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(nb.title)).toBeInTheDocument()

      rerender(
        <Provider locale="en-GB">
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(en.title)).toBeInTheDocument()

      rerender(
        <Provider locale="nb-NO">
          <Upload {...defaultProps} />
        </Provider>
      )

      expect(screen.queryByText(nb.title)).toBeInTheDocument()
    })

    it('should support spacing props', () => {
      render(<Upload top="2rem" {...defaultProps} />)

      const element = document.querySelector('.dnb-upload')
      const attributes = Array.from(element.attributes).map(
        (attr) => attr.name
      )

      expect(attributes).toEqual(['class'])
      expect(Array.from(element.classList)).toEqual(
        expect.arrayContaining(['dnb-space', 'dnb-space__top--large'])
      )
    })

    it('renders the singular upload button text when filesAmountLimit is 1', () => {
      render(<Upload {...defaultProps} filesAmountLimit={1} />)

      expect(screen.queryByText(nb.buttonText)).not.toBeInTheDocument()
      expect(screen.queryByText(nb.buttonTextSingular)).toBeInTheDocument()
    })

    it('renders the singular text when filesAmountLimit is 1', () => {
      render(<Upload {...defaultProps} filesAmountLimit={1} />)

      expect(screen.queryByText(nb.text)).not.toBeInTheDocument()
      expect(screen.queryByText(nb.textSingular)).toBeInTheDocument()
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

    const [firstItem] = Array.from(element.querySelectorAll('li'))
    const deleteButton = firstItem.querySelector('button')

    expect(result.current.files.length).toBe(1)
    expect(result.current.files).toEqual([
      { file: file1, id: expect.any(String), exists: false },
    ])
    expect(
      screen.queryByText(nb.errorAmountLimit.replace('%amount', '1'))
    ).toBeInTheDocument()
    expect(result.current.internalFiles.length).toBe(3)

    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(
        element.querySelector(
          '.dnb-upload__file-input-area .dnb-form-status'
        )
      ).not.toBeInTheDocument()
    })

    expect(
      screen.queryByRole('button', {
        name: nb.buttonTextSingular,
      })
    ).not.toHaveAttribute('disabled')
  })

  it('will remove files amount warning when resetting files', async () => {
    const id = 'filesAmountLimitResetFiles'

    const { result } = renderHook(useUpload, { initialProps: id })

    const MockComponent = () => {
      const { clearFiles } = useUpload(id)

      return (
        <div>
          <button
            id="reset"
            onClick={() => {
              clearFiles()
            }}
          >
            Reset files
          </button>
        </div>
      )
    }

    render(<Upload {...defaultProps} id={id} filesAmountLimit={1} />)
    render(<MockComponent />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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
    ).toBeInTheDocument()
    expect(result.current.internalFiles.length).toBe(3)

    fireEvent.click(document.querySelector('button#reset'))

    await waitFor(() => {
      expect(
        element.querySelector(
          '.dnb-upload__file-input-area .dnb-form-status'
        )
      ).not.toBeInTheDocument()
    })
    expect(result.current.files.length).toBe(0)
    expect(result.current.files).toEqual([])
  })

  it('will hide upload button when filesAmountLimit is met', async () => {
    const id = 'filesAmountLimitIsMet'

    renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} filesAmountLimit={1} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).toBeInTheDocument()

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })
    )

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).not.toBeInTheDocument()

    const [firstItem] = Array.from(element.querySelectorAll('li'))
    const deleteButton = firstItem.querySelector('button')

    fireEvent.click(deleteButton)

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).toBeInTheDocument()
  })

  it('will hide upload button when uploaded files is more than filesAmountLimit', async () => {
    const id = 'filesAmountLimitIsMetWithMultipleFiles'

    renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} filesAmountLimit={1} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).toBeInTheDocument()

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1, file2] },
      })
    )

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).not.toBeInTheDocument()

    const [firstItem] = Array.from(element.querySelectorAll('li'))
    const deleteButton = firstItem.querySelector('button')

    fireEvent.click(deleteButton)

    expect(
      document.querySelector('.dnb-upload__file-input-button')
    ).toBeInTheDocument()
  })

  it('will accept same file only once when fileName, size and lastModified is equal', async () => {
    const id = 'only-once'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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

  it('will accept same file only once when fileName and lastModified is equal', async () => {
    const id = 'only-once-filename-last-modified'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile(
      'fileName-1.png',
      undefined,
      'image/png',
      1743671810161
    )
    const file2 = createMockFile(
      'fileName-2.png',
      undefined,
      'image/png',
      1743671810161
    )

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

  it('will accept same file only once when fileName and size is equal', async () => {
    const id = 'only-once-file-name-size'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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

  it('will accept same file only once when fileName is equal', async () => {
    const id = 'only-once-file-name'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', undefined, 'image/png')
    const file2 = createMockFile('fileName-2.png', undefined, 'image/png')

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

  it('will highlight same file', async () => {
    const id = 'highlight'

    renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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
    ).toEqual(expect.arrayContaining(['dnb-upload__file-cell--highlight']))
  })

  it('will accept duplicate files when allowDuplicates', async () => {
    const id = 'allow-duplicates'

    const { result } = renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} allowDuplicates />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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

    expect(result.current.files.length).toBe(3)
    expect(result.current.files).toEqual([
      { file: file1, id: expect.any(String), exists: false },
      { file: file1, id: expect.any(String), exists: true },
      { file: file2, id: expect.any(String), exists: false },
    ])
    expect(result.current.internalFiles.length).toBe(3)
    expect(result.current.internalFiles).toEqual([
      { file: file1, id: expect.any(String), exists: false },
      { file: file1, id: expect.any(String), exists: true },
      { file: file2, id: expect.any(String), exists: false },
    ])
  })

  it('will not highlight same file when allowDuplicates', async () => {
    const id = 'not-highlight-duplicates'

    renderHook(useUpload, { initialProps: id })

    render(<Upload {...defaultProps} id={id} allowDuplicates />)

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

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
      element.querySelector('.dnb-upload__file-cell--highlight')
    ).not.toBeInTheDocument()
  })

  it('will return error when dropping a file with extension that is not accepted', async () => {
    const id = 'not-supported-extension'

    renderHook(useUpload, { initialProps: id })

    render(
      <Upload {...defaultProps} id={id} acceptedFileTypes={['jpg']} />
    )

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })
    )

    expect(screen.queryByText(nb.errorUnsupportedFile)).toBeInTheDocument()
  })

  it('will return error when dropping a file with extension that is not accepted when acceptedFileTypes is an array of objects', async () => {
    const id = 'not-supported-extension-array-of-objects'

    renderHook(useUpload, { initialProps: id })

    render(
      <Upload
        {...defaultProps}
        id={id}
        acceptedFileTypes={[
          {
            fileType: 'jpg',
            fileMaxSize: 0,
          },
          {
            fileType: 'doc',
            fileMaxSize: false,
          },
          {
            fileType: 'svg',
          },
        ]}
      />
    )

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1.png', 100, 'image/png')

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })
    )

    expect(screen.queryByText(nb.errorUnsupportedFile)).toBeInTheDocument()
  })

  it('will return error when dropping a file without extension when acceptedFileTypes is an array of objects', async () => {
    const id = 'no-extension-array-of-objects'

    renderHook(useUpload, { initialProps: id })

    render(
      <Upload
        {...defaultProps}
        id={id}
        acceptedFileTypes={[
          {
            fileType: 'jpg',
            fileMaxSize: 0,
          },
          {
            fileType: 'doc',
            fileMaxSize: false,
          },
          {
            fileType: 'svg',
          },
        ]}
      />
    )

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1', 100, '')

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })
    )

    expect(screen.queryByText(nb.errorUnsupportedFile)).toBeInTheDocument()
  })

  it('will return error when dropping a file without extension', async () => {
    const id = 'no-extension'

    renderHook(useUpload, { initialProps: id })

    render(
      <Upload {...defaultProps} id={id} acceptedFileTypes={['jpg']} />
    )

    const getRootElement = () => document.querySelector('.dnb-upload')

    const element = getRootElement()
    const file1 = createMockFile('fileName-1', 100, '')

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })
    )

    expect(screen.queryByText(nb.errorUnsupportedFile)).toBeInTheDocument()
  })

  it('passes down required to the upload file input', () => {
    render(<Upload {...defaultProps} required />)

    expect(
      document
        .querySelector('.dnb-upload__file-input')
        .getAttribute('required')
    ).toBe('')
  })

  it('passes down disabled to the upload file input', () => {
    render(<Upload {...defaultProps} disabled />)

    expect(
      document
        .querySelector('.dnb-upload__file-input')
        .getAttribute('disabled')
    ).toBe('')
  })

  describe('useUpload', () => {
    it('calls the useUpload hook to store files', async () => {
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

    it('renders file without file extension', async () => {
      const files = [
        { file: createMockFile('fileName.png', 100, undefined) },
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

    it('renders file without file extension and file extension in name', async () => {
      const files = [{ file: createMockFile('fileName', 100, undefined) }]

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

    it('renders file without file extension and file name', async () => {
      const files = [{ file: createMockFile(undefined, 100, undefined) }]

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

    it('does not render any file when file is undefined', async () => {
      const files = [{ file: undefined }]

      const id = 'random-id'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCells = document.querySelectorAll('.dnb-upload__file-cell')

      expect(fileCells.length).toBe(0)
    })

    it('does not render any file when list of files is undefined', async () => {
      const files = [undefined]

      const id = 'random-id'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCells = document.querySelectorAll('.dnb-upload__file-cell')

      expect(fileCells.length).toBe(0)
    })

    it('does not render any file when undefined', async () => {
      const files = undefined

      const id = 'random-id'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCells = document.querySelectorAll('.dnb-upload__file-cell')

      expect(fileCells.length).toBe(0)
    })

    it('does not render a undefined file', async () => {
      const files = [
        undefined,
        { file: createMockFile('fileName.png', 100, 'image/png') },
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

      expect(fileCells.length).toBe(1)
    })

    it('treats all the linked URLs of the files as a download when providing download prop', async () => {
      const files = [
        { file: createMockFile('fileName.png', 100, 'image/png') },
        { file: createMockFile('fileName2.png', 100, 'image/png') },
        { file: createMockFile('fileName3.png', 100, 'image/png') },
      ]

      const id = 'random-id'

      render(<Upload {...defaultProps} id={id} download={true} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      expect(document.querySelectorAll('[download]').length).toBe(
        files.length
      )
    })

    it('does not treat linked URLs of the files as a download by default', async () => {
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

      expect(document.querySelectorAll('[download]').length).toBe(0)
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

      expect(emptyFileCell).not.toBeInTheDocument()
    })

    it('does not show the delete button when removeDeleteButton', () => {
      const files = [
        {
          file: createMockFile('fileName.png', 100, 'image/png'),
          removeDeleteButton: true,
        },
      ]

      const id = 'random-id-remove-delete-button'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      expect(
        screen.queryByRole('button', {
          name: nb.deleteButton,
        })
      ).not.toBeInTheDocument()
    })

    it('shows the file description when provided', async () => {
      const myDescription = 'my description'
      const files = [
        {
          file: createMockFile('fileName.png', 100, 'image/png'),
          description: myDescription,
        },
      ]

      const id = 'random-id-description'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      expect(screen.queryByText(myDescription)).toBeInTheDocument()
    })

    it('does not show the file description when loading', async () => {
      const myDescription = 'my description'
      const files = [
        {
          file: createMockFile('fileName.png', 100, 'image/png'),
          description: myDescription,
          isLoading: true,
        },
      ]

      const id = 'random-id-description'

      render(<Upload {...defaultProps} id={id} />)

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      expect(screen.queryByText(myDescription)).not.toBeInTheDocument()
      expect(
        document.querySelectorAll('.dnb-progress-indicator').length
      ).toBe(1)
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

      expect(emptyFileCell).not.toBeInTheDocument()

      render(<MockComponent />)

      const fileCell = document.querySelector('.dnb-upload__file-cell')

      expect(fileCell).toBeInTheDocument()
    })

    it('removes the file from the list when clicking delete - checking for file equality', () => {
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

      expect(fileCell).toBeInTheDocument()

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector('.dnb-upload__file-cell')
      ).not.toBeInTheDocument()
    })

    it('removes the file from the list when clicking delete - checking for file id equality', () => {
      const files = [
        {
          file: createMockFile('fileName.png', 100, 'image/png'),
          id: 'my-id',
        },
      ]

      const id = 'random-idx'

      render(<Upload {...defaultProps} id={'random-idx'} />)
      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileCell = document.querySelector('.dnb-upload__file-cell')

      expect(fileCell).toBeInTheDocument()

      const deleteButton = screen.queryByRole('button', {
        name: nb.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector('.dnb-upload__file-cell')
      ).not.toBeInTheDocument()
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
      ).toBeInTheDocument()
    })

    it('returns no file size error message when fileMaxSize is disabled', async () => {
      const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

      const fileMaxSize = 0
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
      ).not.toBeInTheDocument()
    })

    it('can set custom error messages with setFiles', async () => {
      const MockComponent = () => {
        const { setFiles } = useUpload('upload-error-message')

        return (
          <Upload
            acceptedFileTypes={['jpg', 'png']}
            id="upload-error-message"
            onChange={({ files: internalFiles }) => {
              setFiles(
                internalFiles.map((fileItem) => {
                  const fileNameTooBig = fileItem?.file?.name?.length > 5
                  return {
                    ...fileItem,
                    errorMessage: fileNameTooBig
                      ? 'file length is more than 5'
                      : null,
                  }
                })
              )
            }}
          />
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )

      const file = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file] },
        })
      )

      expect(
        screen.queryByText(`file length is more than 5`)
      ).toBeInTheDocument()
    })

    it('keeps files in shared state when providing id', async () => {
      const files = [
        createMockFile('fileName1.png', 100, 'image/png'),
        createMockFile('fileName2.png', 200, 'image/png'),
      ]

      const id = 'random-id-unmount'

      const { unmount } = render(<Upload {...defaultProps} id={id} />)

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )
      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files },
        })
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)

      unmount()

      render(<Upload {...defaultProps} id={id} />)

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
    })

    it('removes files when unmounting when not providing id', async () => {
      const files = [
        createMockFile('fileName1.png', 100, 'image/png'),
        createMockFile('fileName2.png', 200, 'image/png'),
      ]

      const { unmount } = render(<Upload {...defaultProps} />)

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )
      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files },
        })
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)

      unmount()

      render(<Upload {...defaultProps} />)

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })

    it('will not support drop when disableDragAndDrop', async () => {
      const id = 'disable-drag-and-drop'

      const { result } = renderHook(useUpload, { initialProps: id })

      render(
        <Upload {...defaultProps} id={id} disableDragAndDrop={true} />
      )

      const getRootElement = () => document.querySelector('.dnb-upload')

      const element = getRootElement()
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1] },
        })
      )

      expect(result.current.files.length).toBe(0)
      expect(result.current.files).toEqual([])
      expect(result.current.internalFiles.length).toBe(0)
    })

    it('will not support drop when disabled', async () => {
      const id = 'disabled'

      const { result } = renderHook(useUpload, { initialProps: id })

      render(<Upload {...defaultProps} id={id} disabled={true} />)

      const getRootElement = () => document.querySelector('.dnb-upload')

      const element = getRootElement()
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1] },
        })
      )

      expect(result.current.files.length).toBe(0)
      expect(result.current.files).toEqual([])
      expect(result.current.internalFiles.length).toBe(0)
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

    it('will call onFileClick when file gets clicked', async () => {
      const id = 'onFileClick-sync'
      const onFileClick = jest.fn()

      render(
        <Upload {...defaultProps} id={id} onFileClick={onFileClick} />
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

      const fileButton = document.querySelector(
        '.dnb-upload__file-cell button'
      )

      await waitFor(() => fireEvent.click(fileButton))

      expect(onFileClick).toHaveBeenCalledTimes(1)
      expect(onFileClick).toHaveBeenCalledWith({
        fileItem: {
          file: file1,
          id: expect.any(String),
          exists: false,
        },
      })
    })

    it('will display loading state when onFileClick is async function', async () => {
      const id = 'onFileClick-async'
      const onFileClick = jest.fn(async () => {
        await wait(1)
      })

      render(
        <Upload {...defaultProps} id={id} onFileDelete={onFileClick} />
      )

      const inputElement = document.querySelector(
        '.dnb-upload__file-input'
      )
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')
      const file2 = createMockFile('fileName-2.png', 200, 'image/png')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file1, file2] },
        })
      )

      const fileButton = document.querySelector(
        '.dnb-upload__file-cell button'
      )

      await waitFor(() => {
        fireEvent.click(fileButton)
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(1)
      })
    })

    it('will display loading state when async onFileClick fn when files do not have id', async () => {
      const files = [
        { file: createMockFile('fileName1.png', 100, 'image/png') },
        { file: createMockFile('fileName2.png', 100, 'image/png') },
        { file: createMockFile('fileName3.png', 100, 'image/png') },
      ]

      const id = 'onFileClick-async-no-id'
      const onFileClick = jest.fn(async () => {
        await wait(1)
      })

      render(
        <Upload {...defaultProps} id={id} onFileClick={onFileClick} />
      )

      const MockComponent = () => {
        const { setFiles } = useUpload(id)

        useEffect(() => setFiles(files), [])

        return <div />
      }

      render(<MockComponent />)

      const fileButton = document.querySelector(
        '.dnb-upload__file-cell button'
      )

      await waitFor(() => {
        fireEvent.click(fileButton)
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(1)
      })
    })

    it('will call onFileDelete when file gets removed', async () => {
      const id = 'onFileDelete-sync'
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

    it('will display loading state when onFileDelete is async function', async () => {
      const id = 'onFileDelete-async'
      const onFileDelete = jest.fn(async () => {
        await wait(1)
      })

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

      await waitFor(() => {
        fireEvent.click(deleteButton)
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).toBeInTheDocument()
      })
    })

    it('will call onFileDelete when async function succeed', async () => {
      const id = 'onFileDelete-async-success'
      const onFileDelete = jest.fn(async () => {
        await wait(1)
      })

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

      await waitFor(() => {
        expect(onFileDelete).toHaveBeenCalledTimes(1)
        expect(onFileDelete).toHaveBeenCalledWith({
          fileItem: {
            file: file1,
            id: expect.any(String),
            exists: false,
          },
        })
      })
    })

    it('will call onFileDelete when async function fails', async () => {
      const id = 'onFileDelete-async-fail'
      const onFileDelete = jest.fn(async () => {
        await wait(1)

        throw new Error('My remove file message error')
      })

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

      await waitFor(() => {
        expect(onFileDelete).toHaveBeenCalledTimes(1)
        expect(onFileDelete).toHaveBeenCalledWith({
          fileItem: {
            file: file1,
            id: expect.any(String),
            exists: false,
          },
        })
      })
    })

    it('will display error message when async onFileDelete function fails', async () => {
      const id = 'onFileDelete-async-fail-error-message'
      const onFileDelete = jest.fn(async () => {
        await wait(1)

        throw new Error('My remove file message error')
      })

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

      expect(
        screen.queryByText('My remove file message error')
      ).toBeInTheDocument()
    })
  })

  describe('Compact variant', () => {
    it('renders the title', () => {
      render(<Upload {...defaultProps} variant="compact" />)

      expect(screen.queryByText(nb.title)).toBeInTheDocument()
    })

    it('renders the custom title', () => {
      const customTitle = 'custom title'

      render(
        <Upload {...defaultProps} title={customTitle} variant="compact" />
      )

      expect(screen.queryByText(customTitle)).toBeInTheDocument()
    })

    it('renders the text', () => {
      render(<Upload {...defaultProps} variant="compact" />)

      expect(screen.queryByText(nb.text)).toBeInTheDocument()
    })

    it('renders the custom text', () => {
      const customText = 'custom text'

      render(
        <Upload {...defaultProps} text={customText} variant="compact" />
      )

      expect(screen.queryByText(customText)).toBeInTheDocument()
    })

    it('does not render the format description', () => {
      render(<Upload {...defaultProps} variant="compact" />)

      expect(
        screen.queryByText(nb.fileTypeDescription)
      ).not.toBeInTheDocument()
    })

    it('does not render the file size description', () => {
      render(<Upload {...defaultProps} variant="compact" />)

      expect(
        screen.queryByText(nb.fileSizeDescription)
      ).not.toBeInTheDocument()
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
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-upload-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
