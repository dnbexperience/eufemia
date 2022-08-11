import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import Upload from '../Upload'
import nbNO from '../../../shared/locales/nb-NO'
import createMockFile from './testHelpers'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { UploadValidationError } from '../types'

const nb = nbNO['nb-NO'].Upload

global.URL.createObjectURL = jest.fn(() => 'url')

const defauleAcceptedFiles = ['png']

describe('Upload', () => {
  it('renders the component', () => {
    render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
      />
    )

    expect(screen.queryByTestId('upload')).not.toBeNull()
  })

  describe('Text', () => {
    it('renders the title', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
        />
      )

      const element = screen.queryByTestId('upload-title')

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.title)
    })

    it('renders the custom title', () => {
      const customTitle = 'custom title'

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          title={customTitle}
        />
      )

      const element = screen.queryByTestId('upload-title')

      expect(element.textContent).toMatch(customTitle)
    })

    it('renders the text', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
        />
      )

      const element = screen.queryByTestId('upload-text')

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.text)
    })

    it('renders the custom text', () => {
      const customText = 'custom text'

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          text={customText}
        />
      )

      const element = screen.queryByTestId('upload-text')

      expect(element.textContent).toMatch(customText)
    })

    it('renders the format description', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
        />
      )

      const element = screen.queryByTestId(
        'upload-accepted-formats-description'
      )

      expect(element).not.toBeNull()

      expect(element.textContent).toMatch(nb.formatsDescription)
    })

    it('renders the custom format description', () => {
      const customFormatDescription = 'custom formats description'

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          formatsDescription={customFormatDescription}
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
        <Upload
          onChange={jest.fn()}
          acceptedFileTypes={acceptedFileTypes}
        />
      )

      const element = screen.queryByTestId('upload-accepted-formats')

      const formattedFileTypes = acceptedFileTypes.join(', ').toUpperCase()

      expect(element).not.toBeNull()
      expect(element.textContent).toMatch(formattedFileTypes)
    })

    it('renders the file size description', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
        />
      )

      const element = screen.queryByTestId('upload-file-size-description')

      expect(element).not.toBeNull()
    })

    it('renders the custom file size description', () => {
      const fileSizeDescription = 'file size description'

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          fileSizeDescription={fileSizeDescription}
        />
      )

      const element = screen.queryByTestId('upload-file-size-description')

      expect(element.textContent).toMatch(fileSizeDescription)
    })

    it('renders the file size', () => {
      const fileMaxSize = 2
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          fileMaxSize={fileMaxSize}
        />
      )

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
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          fileMaxSize={fileMaxSize}
          fileSizeContent={fileSizeContent}
        />
      )

      const element = screen.queryByTestId('upload-file-size')

      expect(element.textContent).toMatch(
        String(fileMaxSize).replace('%size', `${fileMaxSize}`)
      )
    })
  })

  describe('Loading state', () => {
    it('does not render the loading section', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          isLoading={false}
        />
      )

      expect(screen.queryByTestId('upload-is-loading')).toBeNull()
    })
    it('renders the loading section', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          isLoading={true}
        />
      )

      expect(screen.queryByTestId('upload-is-loading')).not.toBeNull()
    })

    it('renders the loading section progress indicator', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          isLoading={true}
        />
      )

      const element = within(
        screen.queryByTestId('upload-is-loading')
      ).queryByTestId('upload-is-loading-progress-indicator')

      expect(element).not.toBeNull()
    })

    it('renders the loading section text', () => {
      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          isLoading={true}
        />
      )

      const element = within(
        screen.queryByTestId('upload-is-loading')
      ).queryByTestId('upload-is-loading-text')

      expect(element).not.toBeNull()
      expect(element.textContent).toMatch(nb.uploadingLoadingText)
    })
    it('renders the loading section custom text', () => {
      const uploadLoadingText = 'upload loading text'

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={jest.fn()}
          isLoading={true}
          uploadingLoadingText={uploadLoadingText}
        />
      )

      const element = within(
        screen.queryByTestId('upload-is-loading')
      ).queryByTestId('upload-is-loading-text')

      expect(element.textContent).toMatch(uploadLoadingText)
    })
  })

  it('renders the upload file input section', () => {
    render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
      />
    )

    expect(screen.queryByTestId('upload-file-input')).not.toBeNull()
  })

  it('renders the upload file input section button text', () => {
    render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
      />
    )

    const element = screen.queryByTestId('upload-file-input-button')

    expect(element.textContent).toMatch(nb.uploadButtonText)
  })

  it('renders the upload file input section button custom text', () => {
    const uploadButtonText = 'upload button text'

    render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
        uploadButtonText={uploadButtonText}
      />
    )

    const element = screen.queryByTestId('upload-file-input-button')

    expect(element.textContent).toMatch(uploadButtonText)
  })

  describe('onChange', () => {
    it('does not call onChange on initial load', async () => {
      const onChangeMock = jest.fn()

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={onChangeMock}
        />
      )

      expect(onChangeMock).not.toHaveBeenCalled()
    })

    it('calls onChange on when uploading a file', async () => {
      const onChangeMock = jest.fn()

      const file = createMockFile('fileName.png', 100, 'image/png')

      const expectedResult = [{ file, error: UploadValidationError.NONE }]

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={onChangeMock}
        />
      )

      const inputElement = screen.queryByTestId('upload-file-input-input')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file] },
        })
      )

      expect(onChangeMock).toHaveBeenCalled()
      expect(onChangeMock).toHaveBeenCalledWith(expectedResult)
    })

    it('calls onChange on when deleting a file', async () => {
      const onChangeMock = jest.fn()

      const file = createMockFile('fileName.png', 100, 'image/png')

      render(
        <Upload
          acceptedFileTypes={defauleAcceptedFiles}
          onChange={onChangeMock}
        />
      )

      const inputElement = screen.queryByTestId('upload-file-input-input')

      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file] },
        })
      )

      fireEvent.click(screen.queryByTestId('upload-delete-button'))

      expect(onChangeMock).toHaveBeenCalled()
      expect(onChangeMock).toHaveBeenCalledWith([])
    })
  })

  it('renders a list of files when uploading a file', async () => {
    const file = createMockFile('fileName.png', 100, 'image/png')

    render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
      />
    )

    const inputElement = screen.queryByTestId('upload-file-input-input')

    expect(screen.queryByTestId('upload-file-list-cell')).toBeNull()

    await waitFor(() =>
      fireEvent.change(inputElement, {
        target: { files: [file] },
      })
    )

    await waitFor(() => {
      expect(screen.queryByTestId('upload-file-list-cell')).not.toBeNull()
    })
  })
})

describe('Upload aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Upload
        acceptedFileTypes={defauleAcceptedFiles}
        onChange={jest.fn()}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Upload scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-upload.scss'))
    expect(scss).toMatchSnapshot()
  })
})
