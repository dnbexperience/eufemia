import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { DataContext, Field, Form, Wizard } from '../../..'
import { BYTES_IN_A_MEGA_BYTE } from '../../../../../components/upload/UploadVerify'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

import nbNOForms from '../../../constants/locales/nb-NO'
import nbNOShared from '../../../../../shared/locales/nb-NO'
import userEvent from '@testing-library/user-event'
import { UploadValue } from '../Upload'

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
            },
            {
              file: file2,
              id: expect.any(String),
              exists: expect.any(Boolean),
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
            },
            {
              errorMessage: nbShared.Upload.errorLargeFile.replace(
                '%size',
                '5'
              ),
              file: file2,
              exists: false,
              id: expect.anything(),
            },
          ],
        },
        expect.anything()
      )
      expect(onChangeField).toHaveBeenCalledTimes(1)
      expect(onChangeField).toHaveBeenLastCalledWith([
        {
          file: file1,
          exists: false,
          id: expect.anything(),
        },
        {
          errorMessage: nbShared.Upload.errorLargeFile.replace(
            '%size',
            '5'
          ),
          file: file2,
          exists: false,
          id: expect.anything(),
        },
      ])

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

    it('should handle displaying error from asyncFileHandler', async () => {
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

      render(<Field.Upload asyncFileHandler={asyncFileHandlerFnError} />)

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

    it('should handle displaying success from asyncFileHandler', async () => {
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

      render(<Field.Upload asyncFileHandler={asyncFileHandlerFnSuccess} />)

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

    it('should display spinner when loading asyncFileHandler', async () => {
      const file = createMockFile('fileName-1.png', 100, 'image/png')

      const asyncValidatorResolvingWithSuccess = () =>
        new Promise<UploadValue>(() => jest.fn())

      render(
        <Field.Upload
          asyncFileHandler={asyncValidatorResolvingWithSuccess}
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

    it('should add new files from asyncFileHandler', async () => {
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

      const asyncFileHandlerFnSuccess = jest.fn(
        asyncValidatorResolvingWithSuccess
      )

      render(
        <Field.Upload
          asyncFileHandler={asyncFileHandlerFnSuccess}
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

    it('should not add existing file using asyncFileHandler', async () => {
      const file = createMockFile('fileName.png', 100, 'image/png')

      const asyncValidatorResolvingWithSuccess = () =>
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

      const asyncFileHandlerFnSuccess = jest.fn(
        asyncValidatorResolvingWithSuccess
      )

      render(
        <Field.Upload
          asyncFileHandler={asyncFileHandlerFnSuccess}
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

  it('should handle a mix of successful and failed files in asyncFileHandler', async () => {
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

    render(<Field.Upload asyncFileHandler={asyncFileHandlerFn} />)

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
})
