import React, { useContext } from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { DataContext, Field, Form, Iterate, Wizard } from '../../..'
import { BYTES_IN_A_MEGA_BYTE } from '../../../../../components/upload/UploadVerify'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'
import { axeComponent } from '../../../../../core/jest/jestSetup'

import nbNOForms from '../../../constants/locales/nb-NO'
import nbNOShared from '../../../../../shared/locales/nb-NO'
import userEvent from '@testing-library/user-event'
import { UploadFileNative, UploadValue } from '../Upload'
import { wait } from '../../../../../core/jest/jestSetup'
import { makeUniqueId } from '../../../../../shared/component-helper'

const nbForms = nbNOForms['nb-NO']
const nbShared = nbNOShared['nb-NO']

global.URL.createObjectURL = jest.fn(() => 'url')

describe('Field.Upload', () => {
  const getRootElement = () => document.querySelector('.dnb-upload')

  it('should render with defaults', () => {
    render(<Field.Upload />)

    const [title, text] = Array.from(document.querySelectorAll('p'))
    expect(title).toHaveTextContent(nbShared.Upload.title)
    expect(text).toHaveTextContent(nbShared.Upload.text)

    const [firstDt, secondDt] = Array.from(
      document.querySelectorAll('dl dt')
    )
    expect(firstDt).toHaveTextContent(nbShared.Upload.fileTypeDescription)
    expect(secondDt).toHaveTextContent(nbShared.Upload.fileSizeDescription)

    const [firstDd, , thirdDd, , fourthDd] = Array.from(
      document.querySelectorAll('dl dd')
    )
    expect(firstDd).toHaveTextContent('PDF')
    expect(thirdDd).toHaveTextContent('5 MB')
    expect(fourthDd).toBeUndefined()
  })

  it('should render with custom properties', () => {
    render(
      <Field.Upload
        acceptedFileTypes={['pdf']}
        filesAmountLimit={2}
        fileMaxSize={1}
      />
    )

    const [firstDt, secondDt, thirdDt] = Array.from(
      document.querySelectorAll('dl dt')
    )
    expect(firstDt).toHaveTextContent(nbShared.Upload.fileTypeDescription)
    expect(secondDt).toHaveTextContent(nbShared.Upload.fileSizeDescription)
    expect(thirdDt).toHaveTextContent(
      nbShared.Upload.fileAmountDescription
    )

    const [firstDd, , thirdDd, , fourthDd] = Array.from(
      document.querySelectorAll('dl dd')
    )
    expect(firstDd).toHaveTextContent('PDF')
    expect(thirdDd).toHaveTextContent('1 MB')
    expect(fourthDd).toHaveTextContent('2')
  })

  it('should render label and text', () => {
    render(<Field.Upload label="My Label" text="My Text" />)

    const [title, text] = Array.from(document.querySelectorAll('p'))
    expect(title).toHaveTextContent('My Label')
    expect(text).toHaveTextContent('My Text')
  })

  it('should support onFileClick event', () => {
    const onFileClick = jest.fn()
    render(
      <Field.Upload
        onFileClick={onFileClick}
        value={[
          { file: createMockFile('fileName-1.png', 100, 'image/png') },
        ]}
      />
    )

    const element = document.querySelector('.dnb-upload__file-cell button')

    fireEvent.click(element)

    expect(onFileClick).toHaveBeenCalledTimes(1)
  })

  it('should support being disabled', () => {
    render(<Field.Upload disabled />)

    expect(
      document.querySelector('.dnb-upload__file-input')
    ).toHaveAttribute('disabled')
    expect(document.querySelector('button')).toHaveAttribute('disabled')
  })

  it('should support setting custom content using children', () => {
    render(<Field.Upload>My custom content</Field.Upload>)

    expect(screen.getByText('My custom content')).toBeInTheDocument()
  })

  it('should display spinner for an async onFileClick event', async () => {
    const onFileClick = jest.fn(async () => {
      await wait(1)
    })

    render(
      <Field.Upload
        onFileClick={onFileClick}
        value={[
          { file: createMockFile('fileName-1.png', 100, 'image/png') },
        ]}
      />
    )

    const fileButton = document.querySelector(
      '.dnb-upload__file-cell button'
    )

    await waitFor(() => {
      fireEvent.click(fileButton)
      expect(
        document.querySelector('.dnb-progress-indicator')
      ).toBeInTheDocument()
    })
  })

  it('should render files given in data context', () => {
    render(
      <Form.Handler
        data={{
          myFiles: [
            { file: createMockFile('fileName-1.png', 100, 'image/png') },
          ],
        }}
      >
        <Field.Upload path="/myFiles" />
      </Form.Handler>
    )

    const list = document.querySelector('ul')
    expect(list).toHaveTextContent('fileName-1.png')
  })

  it('should render predefined value', () => {
    render(
      <Field.Upload
        value={[
          { file: createMockFile('fileName-1.png', 100, 'image/png') },
        ]}
      />
    )

    const list = document.querySelector('ul')
    expect(list).toHaveTextContent('fileName-1.png')
  })

  it('should render help prop', () => {
    render(
      <Field.Upload
        help={{
          title: 'My Help Title',
          content: 'My Help Content',
        }}
      />
    )

    const helpButton = document.querySelector('.dnb-help-button')
    expect(helpButton).toBeInTheDocument()
  })

  describe('sync validation', () => {
    it('should emit data context based on required-prop', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.Upload path="/myFiles" />
          <Form.SubmitButton />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { myFiles: undefined },
        expect.anything()
      )

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

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            {
              file: file1,
              id: expect.any(String),
              exists: expect.any(Boolean),
              name: 'fileName-1.png',
            },
            {
              file: file2,
              id: expect.any(String),
              exists: expect.any(Boolean),
              name: 'fileName-2.png',
            },
          ],
        },
        expect.anything()
      )
    })

    it('should prevent submit when error in one file is present', async () => {
      const onChangeContext = jest.fn()
      const onChangeField = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onChange={onChangeContext} onSubmit={onSubmit}>
          <Field.Upload path="/myFiles" onChange={onChangeField} />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const getRootElement = () => document.querySelector('.dnb-upload')

      const element = getRootElement()

      const file1 = createMockFile('fileName-1.png', 100, 'image/png')
      const file2 = createMockFile(
        'fileName-2.png',
        5 * BYTES_IN_A_MEGA_BYTE + 1, // exceeds the default fileMaxSize
        'image/png'
      )

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: { files: [file1, file2] },
        })
      )

      expect(onChangeContext).toHaveBeenCalledTimes(1)
      expect(onChangeContext).toHaveBeenLastCalledWith(
        {
          myFiles: [
            {
              file: file1,
              exists: false,
              id: expect.anything(),
              name: 'fileName-1.png',
            },
            {
              errorMessage: nbShared.Upload.errorLargeFile.replace(
                '%size',
                '5'
              ),
              file: file2,
              exists: false,
              id: expect.anything(),
              name: 'fileName-2.png',
            },
          ],
        },
        expect.anything()
      )
      expect(onChangeField).toHaveBeenCalledTimes(1)
      expect(onChangeField).toHaveBeenLastCalledWith(
        [
          {
            file: file1,
            exists: false,
            id: expect.anything(),
            name: 'fileName-1.png',
          },
          {
            errorMessage: nbShared.Upload.errorLargeFile.replace(
              '%size',
              '5'
            ),
            file: file2,
            exists: false,
            id: expect.anything(),
            name: 'fileName-2.png',
          },
        ],
        expect.anything()
      )

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorInvalidFiles)

      const deleteButton = screen.queryAllByRole('button', {
        name: nbShared.Upload.deleteButton,
      })
      fireEvent.click(deleteButton[1])
      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            {
              file: file1,
              exists: false,
              id: expect.anything(),
              name: 'fileName-1.png',
            },
          ],
        },
        expect.anything()
      )
    })

    it('should handle "required" logic based on, if files are present', async () => {
      const onChange = jest.fn((args) => args)
      const onSubmit = jest.fn((args) => args)

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Upload required path="/myFiles" />
          <Form.SubmitButton />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nbForms.Upload.errorRequired
      )

      const element = getRootElement()
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
              name: 'fileName-1.png',
            }),
          ],
        },
        expect.anything()
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      const deleteButton = screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nbForms.Upload.errorRequired
      )

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )
      fireEvent.submit(document.querySelector('form'))

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
              name: 'fileName-1.png',
            }),
          ],
        },
        expect.anything()
      )
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
            }),
          ],
        },
        {
          clearData: expect.any(Function),
          resetForm: expect.any(Function),
          filterData: expect.any(Function),
          transformData: expect.any(Function),
          reduceToVisibleFields: expect.any(Function),
        }
      )
    })

    it('should handle validation based on files with error', async () => {
      const onChange = jest.fn((args) => args)
      const onSubmit = jest.fn((args) => args)

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Upload required fileMaxSize={0.2} path="/myFiles" />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nbForms.Upload.errorRequired
      )

      const element = getRootElement()
      const file1 = createMockFile(
        'fileName-1.png',
        0.2 * BYTES_IN_A_MEGA_BYTE + 1,
        'image/png'
      )

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            {
              errorMessage: nbShared.Upload.errorLargeFile.replace(
                '%size',
                '0,2'
              ),
              file: file1,
              exists: false,
              id: expect.anything(),
              name: 'fileName-1.png',
            },
          ],
        },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorInvalidFiles)

      const deleteButton = screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        { myFiles: [] },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const file2 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file2],
          },
        })
      )
      fireEvent.submit(document.querySelector('form'))

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file2,
              id: expect.any(String),
            }),
          ],
        },
        expect.anything()
      )
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file2,
              id: expect.any(String),
            }),
          ],
        },
        {
          clearData: expect.any(Function),
          resetForm: expect.any(Function),
          filterData: expect.any(Function),
          transformData: expect.any(Function),
          reduceToVisibleFields: expect.any(Function),
        }
      )
    })
  })

  describe('async validation', () => {
    it('should handle "required" logic based on, if files are present', async () => {
      const onChange = jest.fn(async (args) => args)
      const onSubmit = jest.fn(async (args) => args)

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Upload
            label="Async validation"
            required
            path="/myFiles"
          />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const submitButton = document.querySelector('button[type="submit"]')
      await userEvent.click(submitButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const element = getRootElement()
      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
            }),
          ],
        },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      const deleteButton = screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      await userEvent.click(submitButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )
      await userEvent.click(submitButton)

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
            }),
          ],
        },
        expect.anything()
      )
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file1,
              id: expect.any(String),
            }),
          ],
        },
        {
          clearData: expect.any(Function),
          resetForm: expect.any(Function),
          filterData: expect.any(Function),
          transformData: expect.any(Function),
          reduceToVisibleFields: expect.any(Function),
        }
      )
    })

    it('should handle validation based on files with error', async () => {
      const onChange = jest.fn(async (args) => args)
      const onSubmit = jest.fn(async (args) => args)

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Upload
            label="Async validation"
            required
            fileMaxSize={0.2}
            path="/myFiles"
          />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const submitButton = document.querySelector('button[type="submit"]')
      await userEvent.click(submitButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const element = getRootElement()
      const file1 = createMockFile(
        'fileName-1.png',
        0.2 * BYTES_IN_A_MEGA_BYTE + 1,
        'image/png'
      )

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file1],
          },
        })
      )

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            {
              errorMessage: nbShared.Upload.errorLargeFile.replace(
                '%size',
                '0,2'
              ),
              file: file1,
              exists: false,
              id: expect.anything(),
              name: 'fileName-1.png',
            },
          ],
        },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      await userEvent.click(submitButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorInvalidFiles)

      const deleteButton = screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })

      fireEvent.click(deleteButton)

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).not.toBeInTheDocument()

      await userEvent.click(submitButton)

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [],
        },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const file2 = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file2],
          },
        })
      )
      await userEvent.click(submitButton)

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file2,
              id: expect.any(String),
            }),
          ],
        },
        expect.anything()
      )
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myFiles: [
            expect.objectContaining({
              exists: false,
              file: file2,
              id: expect.any(String),
            }),
          ],
        },
        {
          clearData: expect.any(Function),
          resetForm: expect.any(Function),
          filterData: expect.any(Function),
          transformData: expect.any(Function),
          reduceToVisibleFields: expect.any(Function),
        }
      )
    })
  })

  describe('In Wizard', () => {
    const previousButton = () => {
      return document.querySelector('.dnb-forms-previous-button')
    }
    const nextButton = () => {
      return document.querySelector('.dnb-forms-next-button')
    }
    const output = () => {
      return document.querySelector('output')
    }

    it('should keep files between steps', async () => {
      let dataContext: DataContext.ContextState = null

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Field.Upload required path="/files" />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>

          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      const element = getRootElement()
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(dataContext.internalDataRef.current.files[0].file).toBe(file)

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')
      expect(dataContext.internalDataRef.current.files[0].file).toBe(file)

      await userEvent.click(previousButton())
      expect(output()).toHaveTextContent('Step 1')
      expect(dataContext.internalDataRef.current.files[0].file).toBe(file)

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')
      expect(dataContext.internalDataRef.current.files[0].file).toBe(file)
      expect(dataContext.internalDataRef.current.files).toHaveLength(1)
    })

    it('should show required error when "required" is set', async () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Field.Upload required path="/files" />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const element = getRootElement()
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 2')

      await userEvent.click(previousButton())
      expect(output()).toHaveTextContent('Step 1')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      const deleteButton = screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })

      await userEvent.click(deleteButton)
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)
    })

    it('should handle displaying error from fileHandler with sync function', async () => {
      const fileValid = createMockFile('1.png', 100, 'image/png')
      const fileInValid = createMockFile('invalid.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={function (newFiles: UploadValue) {
            return newFiles.map((file) => {
              if (file.file.name.length > 5) {
                file.errorMessage = 'File name is too long'
              }
              return file
            })
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [fileValid],
          },
        })
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [fileInValid],
          },
        })
      )

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'File name is too long'
      )
    })

    it('should handle undefined from fileHandler', async () => {
      const file = createMockFile('1.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={function () {
            return undefined
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })

    it('should handle list of undefined files from fileHandler', async () => {
      const file = createMockFile('1.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={function () {
            return [undefined]
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })

    it('should handle file without file extension from fileHandler', async () => {
      const file = createMockFile('1.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={function () {
            return [{ file: createMockFile('1.png', 100, undefined) }]
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should handle file without file extension in filename from fileHandler', async () => {
      const file = createMockFile('1.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={function () {
            return [{ file: createMockFile('1', 100, 'image/png') }]
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should handle file without file name and file extension in fileHandler', async () => {
      const file = createMockFile(undefined, 100, undefined)

      render(
        <Field.Upload
          fileHandler={function () {
            return [{ file: createMockFile('1', 100, 'image/png') }]
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should handle file without file in fileHandler', async () => {
      const file = createMockFile(undefined, 100, undefined)

      render(
        <Field.Upload
          fileHandler={function () {
            return [{ file: undefined }]
          }}
        />
      )

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should handle displaying error from fileHandler with async function', async () => {
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      const asyncValidatorResolvingWithErrorMessage = () =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  file,
                  id: 'internal-id',
                  exists: false,
                  errorMessage: 'customError',
                },
              ]),
            1
          )
        )

      const asyncFileHandlerFnError = jest.fn(
        asyncValidatorResolvingWithErrorMessage
      )

      render(<Field.Upload fileHandler={asyncFileHandlerFnError} />)

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )

      await waitFor(() => {
        // Wait for since it's processed asynchronously
        expect(asyncFileHandlerFnError).toHaveBeenCalledTimes(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('customError')
      })
    })

    it('should handle displaying success from fileHandler with async function', async () => {
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      const asyncValidatorResolvingWithSuccess = () =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  file,
                  id: 'server_generated_id',
                  exists: false,
                },
              ]),
            1
          )
        )

      const asyncFileHandlerFnSuccess = jest.fn(
        asyncValidatorResolvingWithSuccess
      )

      render(<Field.Upload fileHandler={asyncFileHandlerFnSuccess} />)

      const element = getRootElement()

      await waitFor(() =>
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
      )

      await waitFor(() => {
        // Wait for since it's processed asynchronously
        expect(asyncFileHandlerFnSuccess).toHaveBeenCalledTimes(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should display spinner when loading fileHandler with async function', async () => {
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={() => new Promise<UploadValue>(() => jest.fn())}
        />
      )

      const element = getRootElement()

      expect(
        screen.queryByText(nbShared.Upload.loadingText)
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('.dnb-progress-indicator')
      ).not.toBeInTheDocument()

      await waitFor(() => {
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
        expect(
          screen.getByText(nbShared.Upload.loadingText)
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).toBeInTheDocument()
      })
    })

    it('should add new files from fileHandler with async function', async () => {
      const fileExisting = createMockFile(
        'fileName-existing.png',
        100,
        'image/png'
      )
      const newFile1 = createMockFile(
        'fileName-new-1.png',
        100,
        'image/png'
      )
      const newFile2 = createMockFile(
        'fileName-new-2.png',
        100,
        'image/png'
      )

      const asyncValidatorResolvingWithSuccess = () =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  file: newFile1,
                  id: 'server_generated_id_1',
                  exists: false,
                },
                {
                  file: newFile2,
                  id: 'server_generated_id_2',
                  exists: false,
                },
              ]),
            1
          )
        )

      render(
        <Field.Upload
          fileHandler={jest.fn(asyncValidatorResolvingWithSuccess)}
          value={[{ file: fileExisting }]}
        />
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(
        screen.queryByText('fileName-existing.png')
      ).toBeInTheDocument()
      expect(
        screen.queryByText('fileName-new-1.png')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('fileName-new-2.png')
      ).not.toBeInTheDocument()

      const element = getRootElement()

      await waitFor(() => {
        fireEvent.drop(element, {
          dataTransfer: {
            files: [newFile1, newFile2],
          },
        })
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(3)
        expect(
          screen.queryByText('fileName-existing.png')
        ).toBeInTheDocument()
        expect(
          screen.queryByText('fileName-new-1.png')
        ).toBeInTheDocument()
        expect(
          screen.queryByText('fileName-new-2.png')
        ).toBeInTheDocument()
      })
    })

    it('should not execute fileHandler function when new files are not valid', async () => {
      const newFile1 = createMockFile(
        'fileName-new-1.png',
        2000000,
        'image/png'
      )

      const asyncValidatorResolving = () =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(() => resolve([]), 1)
        )

      const asyncFileHandlerFn = jest.fn(asyncValidatorResolving)

      render(
        <Field.Upload fileMaxSize={1} fileHandler={asyncFileHandlerFn} />
      )

      const element = getRootElement()

      await waitFor(() => {
        fireEvent.drop(element, {
          dataTransfer: {
            files: [newFile1],
          },
        })

        expect(asyncFileHandlerFn).not.toHaveBeenCalled()

        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)

        expect(
          screen.queryByText('fileName-new-1.png')
        ).toBeInTheDocument()
      })
    })

    it('should add new files from fileHandler with async function with multiple actions', async () => {
      const newFile = (fileId) => {
        return createMockFile(`${fileId}.png`, 100, 'image/png')
      }

      const files = [
        newFile(0),
        newFile(1),
        newFile(2),
        newFile(3),
        newFile(4),
        newFile(5),
      ]

      const asyncValidatorResolvingWithSuccess = (id) =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  file: files[id],
                  id: 'server_generated_id_' + id,
                  exists: false,
                },
              ]),
            1
          )
        )

      const asyncValidatorNeverResolving = () =>
        new Promise<UploadValue>(() => undefined)

      render(
        <Field.Upload
          fileHandler={jest
            .fn(asyncValidatorResolvingWithSuccess)
            .mockReturnValueOnce(asyncValidatorResolvingWithSuccess(0))
            .mockReturnValueOnce(asyncValidatorNeverResolving())
            .mockReturnValueOnce(asyncValidatorResolvingWithSuccess(2))
            .mockReturnValueOnce(asyncValidatorNeverResolving())}
        />
      )

      const element = getRootElement()

      await waitFor(() => {
        fireEvent.drop(element, {
          dataTransfer: {
            files: [files[0]],
          },
        })

        fireEvent.drop(element, {
          dataTransfer: {
            files: [files[1], files[3], files[4]],
          },
        })

        fireEvent.drop(element, {
          dataTransfer: {
            files: [files[2]],
          },
        })

        fireEvent.drop(element, {
          dataTransfer: {
            files: [files[5]],
          },
        })

        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(6)

        expect(screen.queryByText('0.png')).toBeInTheDocument()
        expect(screen.queryByText('1.png')).not.toBeInTheDocument()
        expect(screen.queryByText('2.png')).toBeInTheDocument()
        expect(screen.queryByText('3.png')).not.toBeInTheDocument()
        expect(screen.queryByText('4.png')).not.toBeInTheDocument()
        expect(screen.queryByText('5.png')).not.toBeInTheDocument()

        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(4)
      })
    })

    it('should add new files from fileHandler with async function while removing file', async () => {
      const asyncOnFileDelete = jest.fn(async () => {
        await wait(1)
      })

      const newFile = (fileId) => {
        return createMockFile(`${fileId}.png`, 100, 'image/png')
      }

      const filesFirstUpload = [newFile(0)]

      const filesSecondUpload = [newFile(1)]

      const asyncValidatorResolvingWithSuccess = (files) =>
        new Promise<UploadValue>((resolve) =>
          setTimeout(() => {
            const filesToResolve = files.map((file, i) => {
              return {
                file: file,
                id: makeUniqueId(),
                exists: false,
              }
            })
            resolve(filesToResolve)
          }, 1)
        )

      render(
        <Field.Upload
          onFileDelete={asyncOnFileDelete}
          fileHandler={jest
            .fn(asyncValidatorResolvingWithSuccess)
            .mockReturnValueOnce(
              asyncValidatorResolvingWithSuccess(filesFirstUpload)
            )
            .mockReturnValueOnce(
              asyncValidatorResolvingWithSuccess(filesSecondUpload)
            )}
        />
      )

      const element = getRootElement()

      await waitFor(() => {
        // upload the first file
        fireEvent.drop(element, {
          dataTransfer: {
            files: filesFirstUpload,
          },
        })
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
      })

      await waitFor(() => {
        // upload the second file
        fireEvent.drop(element, {
          dataTransfer: {
            files: filesSecondUpload,
          },
        })
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)
      })

      await waitFor(() => {
        // delete the first file
        fireEvent.click(
          document
            .querySelectorAll('.dnb-upload__file-cell')[0]
            .querySelector('button')
        )
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
      })
    })

    it('should not add existing file using fileHandler with async function', async () => {
      const file = createMockFile('fileName.png', 100, 'image/png')

      render(
        <Field.Upload
          fileHandler={jest.fn(
            () =>
              new Promise<UploadValue>((resolve) =>
                setTimeout(
                  () =>
                    resolve([
                      {
                        file,
                      },
                    ]),
                  1
                )
              )
          )}
          value={[{ file }]}
        />
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(screen.queryByText('fileName.png')).toBeInTheDocument()

      const element = getRootElement()

      await waitFor(() => {
        fireEvent.drop(element, {
          dataTransfer: {
            files: [file],
          },
        })
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
        expect(screen.queryByText('fileName.png')).toBeInTheDocument()
      })
    })
  })

  it('should handle a mix of successful and failed files in fileHandler with async function', async () => {
    const successFile = createMockFile('successFile.png', 100, 'image/png')
    const failFile = createMockFile('failFile.png', 100, 'image/png')

    const asyncValidatorWithMixedResults = () =>
      new Promise<UploadValue>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                file: successFile,
                id: 'server_generated_id',
                exists: false,
              },
              {
                file: failFile,
                id: 'internal_id_fail',
                exists: false,
                errorMessage: 'Failed to process',
              },
            ]),
          1
        )
      )

    const asyncFileHandlerFn = jest.fn(asyncValidatorWithMixedResults)

    render(<Field.Upload fileHandler={asyncFileHandlerFn} />)

    const element = getRootElement()

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: {
          files: [successFile, failFile],
        },
      })
    )

    await waitFor(() => {
      expect(asyncFileHandlerFn).toHaveBeenCalledTimes(1)
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
      expect(screen.queryByText('successFile.png')).toBeInTheDocument()
      expect(screen.queryByText('failFile.png')).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Failed to process'
      )
    })
  })

  it('should recreate files from session storage', async () => {
    const file = createMockFile('fileName.png', 100, 'image/png')

    const { unmount } = render(
      <Form.Handler sessionStorageId="session-storage-id">
        <Field.Upload path="/myFiles" />
      </Form.Handler>
    )

    const element = getRootElement()

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
    )

    expect(
      document.querySelectorAll('.dnb-upload__file-cell').length
    ).toBe(1)

    let dataContext = null

    // Don't rerender, but render again to make sure the files are not set
    unmount()
    render(
      <Form.Handler sessionStorageId="session-storage-id">
        <Field.Upload path="/myFiles" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.internalDataRef.current.myFiles).toEqual([
      {
        exists: false,
        file: new File([], 'fileName.png'),
        id: expect.any(String),
        name: 'fileName.png',
      },
    ])
    const [title] = Array.from(document.querySelectorAll('p'))
    expect(title).toHaveTextContent(nbShared.Upload.title)
    expect(
      document.querySelectorAll('.dnb-upload__file-cell').length
    ).toBe(1)
  })

  it('should remove correct file when file names are the same', async () => {
    const fileName = 'fileName-1.png'
    const asyncOnFileDelete = jest.fn(async () => {
      await wait(1)
    })

    const existingFile = createMockFile(
      fileName,
      100,
      'image/png',
      1730801854755
    )
    const newFile = createMockFile(
      fileName,
      100,
      'image/png',
      1730801854752
    )

    render(
      <Form.Handler
        data={{
          myFiles: [
            {
              file: existingFile,
            },
          ],
        }}
      >
        <Field.Upload path="/myFiles" onFileDelete={asyncOnFileDelete} />
      </Form.Handler>
    )

    expect(
      document.querySelectorAll('.dnb-upload__file-cell').length
    ).toBe(1)

    const element = getRootElement()

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: {
          files: [newFile],
        },
      })
    )

    // it should allow uploading two files with the same file name, as they are not identical files
    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
    })

    await waitFor(() => {
      // delete the second file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[1]
          .querySelector('button')
      )
    })

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    await waitFor(() => {
      // delete the first file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )
    })

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })
  })

  it('should remove correct file when transformIn and transformOut is used to change the file', async () => {
    function transformIn(external) {
      return (
        external?.map((file) => ({
          ...file,
          id: file.id,
          file: new File([], file.fileName),
          errorMessage: file?.errorMessage,
        })) || []
      )
    }

    function transformOut(upload?: UploadValue) {
      return upload?.map((file) => ({
        ...file,
        id: file.id,
        fileName: file.file?.name,
        errorMessage: file?.errorMessage,
      }))
    }

    const asyncOnFileDelete = jest.fn(async () => {
      await wait(1)
    })

    render(
      <Form.Handler
        data={{
          myFiles: [
            {
              id: '1',
            },
          ],
        }}
      >
        <Field.Upload
          transformOut={transformOut}
          transformIn={transformIn}
          path="/myFiles"
          onFileDelete={asyncOnFileDelete}
        />
      </Form.Handler>
    )

    expect(
      document.querySelectorAll('.dnb-upload__file-cell').length
    ).toBe(1)

    await waitFor(() => {
      // delete the file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )
    })

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })
  })

  it('should support file item properties set in data context', () => {
    const errorMessage = 'my error message'
    const description = 'my description'
    render(
      <Form.Handler
        data={{
          myFiles: [
            {
              file: createMockFile('fileName-1.png', 100, 'image/png'),
              errorMessage,
              description,
              removeDeleteButton: true,
            },
          ],
        }}
      >
        <Field.Upload path="/myFiles" />
      </Form.Handler>
    )

    const list = document.querySelector('ul')
    expect(list).toHaveTextContent('fileName-1.png')

    expect(
      screen.queryByRole('button', {
        name: nbShared.Upload.deleteButton,
      })
    ).not.toBeInTheDocument()

    expect(screen.queryByText(description)).toBeInTheDocument()
    expect(screen.queryByText(errorMessage)).toBeInTheDocument()
  })

  it('should iterate over array with itemPath support', () => {
    render(
      <Iterate.Array
        value={[
          {
            myFiles: [
              {
                file: createMockFile('fileName-1.png', 100, 'image/png'),
                id: '1',
              },
            ],
          },
          {
            myFiles: [
              {
                file: createMockFile('fileName-2.png', 100, 'image/png'),
                id: '2',
              },
            ],
          },
        ]}
      >
        <Field.Upload itemPath="/myFiles" />
      </Iterate.Array>
    )

    const [file1Input, file2Input] = Array.from(
      document.querySelectorAll('.dnb-anchor')
    )

    expect(file1Input).toHaveTextContent('fileName-1.png')
    expect(file2Input).toHaveTextContent('fileName-2.png')
  })

  describe('transformIn and transformOut', () => {
    type DocumentMetadata = {
      id: string
      fileName: string
    }

    const defaultValue = [
      {
        id: '1234',
        fileName: 'myFile.pdf',
      },
    ] satisfies DocumentMetadata[] as unknown as UploadValue

    const filesCache = new Map<string, File>()

    // To the Field (from e.g. defaultValue)
    const transformIn = (external?: DocumentMetadata[]) => {
      return (
        external?.map(({ id, fileName }) => {
          const file: File = filesCache.get(id) || new File([], fileName)

          return { id, file } satisfies UploadFileNative
        }) || []
      )
    }

    // From the Field (internal value) to the data context or event parameter
    const transformOut = (internal?: UploadValue) => {
      return (
        internal?.map(({ id, file }) => {
          if (!filesCache.has(id)) {
            filesCache.set(id, file)
          }

          return { id, fileName: file.name } satisfies DocumentMetadata
        }) || []
      )
    }

    let dataContext = null
    function LogContext() {
      dataContext = useContext(DataContext.Context).data
      return null
    }

    it('should render files given in data context', async () => {
      render(
        <Form.Handler
          defaultData={{
            documents: defaultValue,
          }}
        >
          <Field.Upload
            path="/documents"
            transformIn={transformIn}
            transformOut={transformOut}
          />
          <LogContext />
        </Form.Handler>
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            fileName: 'myFile.pdf',
          },
        ],
      })

      const file = createMockFile('secondFile.png', 100, 'image/png')
      await waitFor(() => {
        fireEvent.drop(document.querySelector('input'), {
          dataTransfer: {
            files: [file],
          },
        })
      })

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            fileName: 'myFile.pdf',
          },
          {
            id: expect.any(String),
            fileName: 'secondFile.png',
          },
        ],
      })
    })

    it('should render files given by defaultValue', async () => {
      render(
        <Form.Handler>
          <Field.Upload
            path="/documents"
            transformIn={transformIn}
            transformOut={transformOut}
            defaultValue={defaultValue}
          />
          <LogContext />
        </Form.Handler>
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            fileName: 'myFile.pdf',
          },
        ],
      })

      const file = createMockFile('secondFile.png', 100, 'image/png')
      await waitFor(() => {
        fireEvent.drop(document.querySelector('input'), {
          dataTransfer: {
            files: [file],
          },
        })
      })

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            fileName: 'myFile.pdf',
          },
          {
            id: expect.any(String),
            fileName: 'secondFile.png',
          },
        ],
      })
    })

    it('should prevent uploading duplicate file when filename is the same', async () => {
      const fileName = 'myFile.pdf'
      render(
        <Form.Handler
          data={{
            documents: [
              {
                file: { name: fileName },
                id: '1234',
              },
            ],
          }}
        >
          <Field.Upload path="/documents" />
          <LogContext />
        </Form.Handler>
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            file: createMockFile(fileName, 0, '', 0),
          },
        ],
      })

      const file = createMockFile(
        fileName,
        100,
        'application/pdf',
        1743671810162
      )
      await waitFor(() => {
        fireEvent.drop(document.querySelector('input'), {
          dataTransfer: {
            files: [file],
          },
        })
      })

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(dataContext).toEqual({
        documents: [
          {
            id: '1234',
            file: createMockFile(fileName, 0, '', 0),
            name: fileName,
          },
        ],
      })
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(<Field.Upload required />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })

    describe('Test typing', () => {
    it('how should transformOut be typed in strict mode?', async () => {
      function transformOut(upload?: UploadValue) {
        return upload?.map((file) => ({
          ...file,
          id: file.id,
          fileName: file.file?.name,
          errorMessage: file?.errorMessage,
        }))
      }
      const result = render(<Field.Upload transformOut={transformOut} required />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })
})
