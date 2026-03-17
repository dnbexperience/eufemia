import React, { useContext } from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent, wait } from '../../../../../core/jest/jestSetup'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { DataContext, Field, Form, Iterate, Wizard } from '../../..'
import { BYTES_IN_A_MEGA_BYTE } from '../../../../../components/upload/UploadVerify'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'
import nbNOForms from '../../../constants/locales/nb-NO'
import nbNOShared from '../../../../../shared/locales/nb-NO'
import type { UploadFileNative, UploadValue } from '../Upload'

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

  it('should add (optional) text to the label if required={false}', () => {
    render(
      <Form.Handler required>
        <Field.Upload required={false} />
      </Form.Handler>
    )

    const [label] = Array.from(document.querySelectorAll('p'))
    expect(label).toHaveTextContent(
      `${nbShared.Upload.title} ${nbForms.Field.optionalLabelSuffix}`
    )
  })

  it('should support labelSuffix', () => {
    render(
      <Field.Upload
        label="A Label"
        required={false}
        labelSuffix="(suffix)"
      />
    )

    const [label] = Array.from(document.querySelectorAll('p'))
    expect(label.textContent).toBe('A Label (suffix)')
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

  it('should render predefined undefined value', () => {
    render(<Field.Upload value={undefined} />)

    const list = document.querySelector('ul')
    expect(list).not.toBeInTheDocument()
  })

  it('should render predefined empty list value', () => {
    render(<Field.Upload value={[]} />)

    const list = document.querySelector('ul')
    expect(list).not.toBeInTheDocument()
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

      fireEvent.drop(element, {
        dataTransfer: { files: [file1, file2] },
      })

      fireEvent.drop(element, {
        dataTransfer: { files: [file2, file2] },
      })

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

    it('should return undefined value when no files are present', async () => {
      const onChangeContext = jest.fn()
      const onChangeField = jest.fn()

      render(
        <Form.Handler onChange={onChangeContext}>
          <Field.Upload path="/myFiles" onChange={onChangeField} />
        </Form.Handler>
      )

      const getRootElement = () => document.querySelector('.dnb-upload')

      const element = getRootElement()

      const file1 = createMockFile('fileName-1.png', 100, 'image/png')

      fireEvent.drop(element, {
        dataTransfer: { files: [file1] },
      })

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
        ],
        expect.anything()
      )

      // delete the file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(0)
      })

      expect(onChangeContext).toHaveBeenCalledTimes(2)
      expect(onChangeContext).toHaveBeenLastCalledWith(
        {
          myFiles: undefined,
        },
        expect.anything()
      )
      expect(onChangeField).toHaveBeenCalledTimes(2)
      expect(onChangeField).toHaveBeenLastCalledWith(
        undefined,
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

      fireEvent.drop(element, {
        dataTransfer: { files: [file1, file2] },
      })

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

    it('should display "required" after removing the only present file', async () => {
      const onChange = jest.fn((args) => args)
      const onSubmit = jest.fn((args) => args)

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Upload required path="/myFiles" />
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

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nbForms.Upload.errorRequired
      )
    })

    it('should handle "required" logic based on if files are present', async () => {
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })

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
      ).toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nbForms.Upload.errorRequired
      )

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })

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
      ).toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        { myFiles: undefined },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const file2 = createMockFile('fileName-1.png', 100, 'image/png')

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file2],
        },
      })
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
    it('should handle "required" logic based on if files are present', async () => {
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })

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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file1],
        },
      })

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
          myFiles: undefined,
        },
        expect.anything()
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status .dnb-form-status'
        )
      ).toHaveTextContent(nbForms.Upload.errorRequired)

      const file2 = createMockFile('fileName-1.png', 100, 'image/png')

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file2],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

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

    it('should keep wizard step until upload finishes', async () => {
      const file = createMockFile('async.png', 100, 'image/png')
      let resolveFileHandler: ((value: UploadValue) => void) | undefined

      const asyncFileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Field.Upload path="/files" fileHandler={asyncFileHandler} />
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(asyncFileHandler).toHaveBeenCalledTimes(1)
      })

      await userEvent.click(nextButton())
      expect(output()).toHaveTextContent('Step 1')

      if (!resolveFileHandler) {
        throw new Error('fileHandler was not invoked')
      }

      resolveFileHandler([
        {
          file,
          id: 'server-id',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).not.toBeInTheDocument()
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [fileValid],
        },
      })

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [fileInValid],
        },
      })

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('File name is too long')
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(0)
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(0)
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        // Wait for since it's processed asynchronously
        expect(asyncFileHandlerFnError).toHaveBeenCalledTimes(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('customError')
      })

      // delete the file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should handle displaying error from validation with fileMaxSize with async function', async () => {
      function createErrorFile(fileName: string) {
        return createMockFile(fileName, 2000000, 'image/png')
      }

      function createSuccessFile(fileName: string) {
        return createMockFile(fileName, 100, 'image/png')
      }

      const errorFile1 = createErrorFile('error-1.png')
      const errorFile2 = createErrorFile('error-2.png')

      const successFile1 = createSuccessFile('success-1.png')

      let resolveFileHandler: ((value: UploadValue) => void) | undefined

      const asyncFileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const asyncFileHandlerFn = jest.fn(asyncFileHandler)

      render(
        <Field.Upload fileMaxSize={1} fileHandler={asyncFileHandlerFn} />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [errorFile1, successFile1, errorFile2],
        },
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(3)

        expect(document.querySelectorAll('.dnb-form-status').length).toBe(
          2
        )

        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(1)

        expect(screen.queryByText('error-1.png')).toBeInTheDocument()
        expect(screen.queryByText('success-1.png')).not.toBeInTheDocument()
      })

      resolveFileHandler([
        {
          file: successFile1,
          id: 'serverGeneratedId',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(3)

        expect(
          document.querySelector('.dnb-progress-indicator')
        ).not.toBeInTheDocument()

        expect(screen.queryByText('error-1.png')).toBeInTheDocument()
        expect(screen.queryByText('success-1.png')).toBeInTheDocument()
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
                  id: 'serverGeneratedId',
                  exists: false,
                },
              ]),
            1
          )
        )

      const asyncFileHandlerFnSuccess = jest.fn(
        asyncValidatorResolvingWithSuccess
      )

      const onChange = jest.fn((args) => args)

      render(
        <Field.Upload
          fileHandler={asyncFileHandlerFnSuccess}
          onChange={onChange}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        // Wait for since it's processed asynchronously
        expect(asyncFileHandlerFnSuccess).toHaveBeenCalledTimes(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      // onChange is called once with the final resolved file
      expect(onChange).toHaveBeenCalledTimes(1)

      // Only call has resolved file
      expect(onChange).toHaveBeenCalledWith(
        [
          {
            exists: false,
            file: file,
            id: 'serverGeneratedId',
            isLoading: false,
            name: 'fileName-1.png',
          },
        ],
        expect.anything()
      )
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
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
                  id: 'serverGeneratedId_1',
                  exists: false,
                },
                {
                  file: newFile2,
                  id: 'serverGeneratedId_2',
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [newFile1, newFile2],
        },
      })

      await waitFor(() => {
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [newFile1],
        },
      })

      await waitFor(() => {
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
                  id: 'serverGeneratedId_' + id,
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

      await waitFor(() => {
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

      // upload the first file
      fireEvent.drop(element, {
        dataTransfer: {
          files: filesFirstUpload,
        },
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
      })

      // upload the second file
      fireEvent.drop(element, {
        dataTransfer: {
          files: filesSecondUpload,
        },
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)
      })

      // delete the first file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
      })
    })

    it('should keep delete spinner when upload completes for another file', async () => {
      const supportedFile = createMockFile(
        'supported.png',
        100,
        'image/png'
      )
      const unsupportedFile = createMockFile(
        'unsupported.png',
        BYTES_IN_A_MEGA_BYTE * 10,
        'image/png'
      )

      let resolveFileHandler: ((value: UploadValue) => void) | undefined
      const fileHandler = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            resolveFileHandler = resolve
          })
      )

      let resolveDelete: (() => void) | undefined
      const asyncOnFileDelete = jest.fn(async () => {
        await new Promise<void>((resolve) => {
          resolveDelete = resolve
        })
      })

      render(
        <Field.Upload
          fileMaxSize={1}
          fileHandler={fileHandler}
          onFileDelete={asyncOnFileDelete}
        />
      )

      const element = getRootElement()

      // Drop both files simultaneously — one supported, one too large
      fireEvent.drop(element, {
        dataTransfer: {
          files: [supportedFile, unsupportedFile],
        },
      })

      // The supported file shows a spinner (uploading), the unsupported file shows an error
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)

        // One spinner for the uploading file
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(1)

        // One error for the unsupported file
        expect(document.querySelectorAll('.dnb-form-status').length).toBe(
          1
        )
      })

      // Click delete on the unsupported file (second file cell)
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[1]
          .querySelector('button')
      )

      // Now both files should show spinners: uploading + deleting
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(2)
      })

      // The supported file's upload completes
      resolveFileHandler([
        {
          file: supportedFile,
          id: 'serverGeneratedId',
          exists: false,
        },
      ])

      // After upload completes, the delete spinner should still be visible
      await waitFor(() => {
        // Upload spinner gone, but delete spinner should remain
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(1)
      })

      // Resolve the delete
      resolveDelete()

      // After delete completes, the unsupported file should be removed
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
        expect(
          document.querySelectorAll('.dnb-progress-indicator').length
        ).toBe(0)
      })
    })

    it('should block form submission while async file handler is pending', async () => {
      const file = createMockFile('fileName.png', 100, 'image/png')
      let resolveFileHandler: ((value: UploadValue) => void) | undefined

      const fileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.Upload path="/myFiles" fileHandler={fileHandler} />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(fileHandler).toHaveBeenCalledTimes(1)
      })

      fireEvent.submit(document.querySelector('form'))

      // Wait for submit button to be disabled
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-submit-button')
        ).toBeDisabled()
      })

      expect(onSubmit).not.toHaveBeenCalled()

      if (!resolveFileHandler) {
        throw new Error('fileHandler was not invoked')
      }

      resolveFileHandler([
        {
          file,
          id: 'server_id',
          exists: true,
        },
      ])

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })
    })

    it('should block form submission while async file handler in an Iterate.Array is pending', async () => {
      const file = createMockFile('fileName.png', 100, 'image/png')
      let resolveFileHandler: ((value: UploadValue) => void) | undefined

      const fileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          defaultData={{
            cases: [{ title: 'Case 1', files: undefined }],
          }}
        >
          <Iterate.Array path="/cases">
            <Field.String itemPath="/title" />
            <Field.Upload itemPath="/files" fileHandler={fileHandler} />
          </Iterate.Array>
          <Form.SubmitButton />
        </Form.Handler>
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(fileHandler).toHaveBeenCalledTimes(1)
      })

      fireEvent.submit(document.querySelector('form'))

      // Wait for submit button to be disabled
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-submit-button')
        ).toBeDisabled()
      })

      expect(onSubmit).not.toHaveBeenCalled()

      if (!resolveFileHandler) {
        throw new Error('fileHandler was not invoked')
      }

      resolveFileHandler([
        {
          file,
          id: 'server_id',
          exists: true,
        },
      ])

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
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

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
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
                id: 'serverGeneratedId',
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

    fireEvent.drop(element, {
      dataTransfer: {
        files: [successFile, failFile],
      },
    })

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

    fireEvent.drop(element, {
      dataTransfer: {
        files: [file],
      },
    })

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

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

    await waitFor(() => {
      expect(dataContext?.internalDataRef?.current?.myFiles).toEqual([
        {
          exists: false,
          file: new File([], 'fileName.png'),
          id: expect.any(String),
          name: 'fileName.png',
        },
      ])
    })

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

    fireEvent.drop(element, {
      dataTransfer: {
        files: [newFile],
      },
    })

    // it should allow uploading two files with the same file name, as they are not identical files
    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
    })

    // delete the second file
    fireEvent.click(
      document
        .querySelectorAll('.dnb-upload__file-cell')[1]
        .querySelector('button')
    )

    await waitFor(() => {
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    // delete the first file
    fireEvent.click(
      document
        .querySelectorAll('.dnb-upload__file-cell')[0]
        .querySelector('button')
    )

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

    // delete the file
    fireEvent.click(
      document
        .querySelectorAll('.dnb-upload__file-cell')[0]
        .querySelector('button')
    )

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

  describe('Iterate.Array with async handlers', () => {
    it('should keep first iterate item files after second item async upload resolves', async () => {
      const queuedResolvers: Array<(value: UploadValue) => void> = []

      const sharedAsyncFileHandler = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            queuedResolvers.push(resolve)
          })
      )

      const onSubmit = jest.fn()
      let latestData = null

      const firstItemFile = createMockFile(
        'first-item-file.png',
        100,
        'image/png'
      )
      const secondItemFile = createMockFile(
        'second-item-file.png',
        100,
        'image/png'
      )

      render(
        <Form.Handler
          onSubmit={onSubmit}
          onChange={(data) => {
            latestData = data
          }}
          defaultData={{
            listOfFiles: [
              {
                files: undefined,
              },
              {
                files: undefined,
              },
            ],
          }}
        >
          <Iterate.Array path="/listOfFiles">
            <Field.Upload
              itemPath="/files"
              fileHandler={sharedAsyncFileHandler}
              required
            />
          </Iterate.Array>
          <Form.SubmitButton />
        </Form.Handler>
      )

      fireEvent.drop(document.querySelectorAll('input')[0], {
        dataTransfer: {
          files: [firstItemFile],
        },
      })

      fireEvent.drop(document.querySelectorAll('input')[1], {
        dataTransfer: {
          files: [secondItemFile],
        },
      })

      await waitFor(() => {
        expect(queuedResolvers.length).toBe(2)
      })

      queuedResolvers[0]([
        {
          file: firstItemFile,
          id: 'first-item-server-id',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)
        expect(document.querySelector('.dnb-anchor')).toHaveTextContent(
          'first-item-file.png'
        )
      })

      queuedResolvers[1]([
        {
          file: secondItemFile,
          id: 'second-item-server-id',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(latestData?.listOfFiles?.[0]?.files?.[0]?.file?.name).toBe(
          'first-item-file.png'
        )
        expect(latestData?.listOfFiles?.[1]?.files?.[0]?.file?.name).toBe(
          'second-item-file.png'
        )
        expect(
          screen.queryByText('first-item-file.png')
        ).toBeInTheDocument()
        expect(
          screen.queryByText('second-item-file.png')
        ).toBeInTheDocument()
      })
    })

    it('should support async fileHandler in Iterate.Array using Form.Handler defaultData', async () => {
      let resolveFileHandler1: ((value: UploadValue) => void) | undefined
      let resolveFileHandler2: ((value: UploadValue) => void) | undefined

      const onSubmit = jest.fn()

      const file1 = createMockFile('new-file-1.png', 100, 'image/png')
      const file2 = createMockFile('new-file-2.png', 100, 'image/png')
      const errorFile1 = createMockFile(
        'error-file-1.png',
        5 * BYTES_IN_A_MEGA_BYTE + 1, // exceeds the default fileMaxSize
        'image/png'
      )
      const errorFile2 = createMockFile(
        'error-file-2.strange.extension', // invalid file type by default
        BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      const asyncFileHandler1 = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            resolveFileHandler1 = resolve
          })
      )

      const asyncFileHandler2 = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            resolveFileHandler2 = resolve
          })
      )

      const FileHandlerWrapper = ({ id }: { id: number }) => {
        const handler = id === 0 ? asyncFileHandler1 : asyncFileHandler2
        return <Field.Upload itemPath="/myFiles" fileHandler={handler} />
      }

      render(
        <Form.Handler
          onSubmit={onSubmit}
          defaultData={{
            myArray: [
              {
                myFiles: undefined,
              },
              {
                myFiles: undefined,
              },
            ],
          }}
        >
          <Iterate.Array path="/myArray">
            {(elementValue, index) => <FileHandlerWrapper id={index} />}
          </Iterate.Array>
          <Form.SubmitButton />
        </Form.Handler>
      )

      fireEvent.drop(document.querySelectorAll('input')[0], {
        dataTransfer: {
          files: [file1],
        },
      })

      fireEvent.drop(document.querySelectorAll('input')[0], {
        dataTransfer: {
          files: [errorFile1],
        },
      })

      fireEvent.drop(document.querySelectorAll('input')[1], {
        dataTransfer: {
          files: [file2],
        },
      })

      fireEvent.drop(document.querySelectorAll('input')[1], {
        dataTransfer: {
          files: [errorFile2],
        },
      })

      resolveFileHandler1([
        {
          file: file1,
          id: 'server-id-1',
          exists: false,
        },
      ])

      await new Promise((resolve) => setTimeout(resolve, 50))

      resolveFileHandler2([
        {
          file: file2,
          id: 'server-id-2',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(screen.queryByText('new-file-1.png')).toBeInTheDocument()
        expect(screen.queryByText('error-file-1.png')).toBeInTheDocument()
        expect(screen.queryByText('new-file-2.png')).toBeInTheDocument()
        expect(
          screen.queryByText('error-file-2.strange.extension')
        ).toBeInTheDocument()
      })

      // delete the first error file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[1]
          .querySelector('button')
      )

      // delete the second error file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[2]
          .querySelector('button')
      )

      await waitFor(() => {
        expect(screen.queryByText('new-file-1.png')).toBeInTheDocument()
        expect(
          screen.queryByText('error-file-1.png')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('new-file-2.png')).toBeInTheDocument()
        expect(
          screen.queryByText('error-file-2.strange.extension')
        ).not.toBeInTheDocument()
      })

      // Check that no error files remain
      expect(document.querySelectorAll('.dnb-form-status').length).toBe(0)
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)

      // Check submit button is not disabled
      const submitButton = document.querySelector('button[type="submit"]')
      expect(submitButton).not.toBeDisabled()

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          {
            myArray: [
              {
                myFiles: [
                  expect.objectContaining({
                    file: file1,
                    id: 'server-id-1',
                    exists: false,
                  }),
                ],
              },
              {
                myFiles: [
                  expect.objectContaining({
                    file: file2,
                    id: 'server-id-2',
                    exists: false,
                  }),
                ],
              },
            ],
          },
          expect.anything()
        )
      })
    })

    it('should support async fileHandler and onFileDelete in Iterate.Array using Form.Handler defaultData', async () => {
      const onSubmit = jest.fn()

      let resolveFileHandler1: ((value: UploadValue) => void) | undefined
      let resolveFileHandler2: ((value: UploadValue) => void) | undefined

      let resolveOnFileDeleteHandler1: ((value: void) => void) | undefined
      let resolveOnFileDeleteHandler2: ((value: void) => void) | undefined

      const file1 = createMockFile('new-file-1.png', 100, 'image/png')
      const file2 = createMockFile('new-file-2.png', 100, 'image/png')

      const asyncFileHandler1 = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            resolveFileHandler1 = resolve
          })
      )

      const asyncFileHandler2 = jest.fn(
        () =>
          new Promise<UploadValue>((resolve) => {
            resolveFileHandler2 = resolve
          })
      )

      const asyncOnFileDeleteHandler1 = jest.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveOnFileDeleteHandler1 = resolve
          })
      )

      const asyncOnFileDeleteHandler2 = jest.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveOnFileDeleteHandler2 = resolve
          })
      )

      const FileHandlerWrapper = ({ id }: { id: number }) => {
        const handler = id === 0 ? asyncFileHandler1 : asyncFileHandler2
        const onFileDeleteHandler =
          id === 0 ? asyncOnFileDeleteHandler1 : asyncOnFileDeleteHandler2
        return (
          <Field.Upload
            itemPath="/myFiles"
            fileHandler={handler}
            onFileDelete={onFileDeleteHandler}
          />
        )
      }

      render(
        <Form.Handler
          onSubmit={onSubmit}
          defaultData={{
            myArrayWithDelete: [
              {
                myFiles: undefined,
              },
              {
                myFiles: undefined,
              },
            ],
          }}
        >
          <Iterate.Array path="/myArrayWithDelete">
            {(elementValue, index) => <FileHandlerWrapper id={index} />}
          </Iterate.Array>
          <Form.SubmitButton />
        </Form.Handler>
      )

      fireEvent.drop(document.querySelectorAll('input')[0], {
        dataTransfer: {
          files: [file1],
        },
      })

      fireEvent.drop(document.querySelectorAll('input')[1], {
        dataTransfer: {
          files: [file2],
        },
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)
      })

      resolveFileHandler1([
        {
          file: file1,
          id: 'server-id-1',
          exists: false,
        },
      ])

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(2)
        expect(screen.queryByText('new-file-1.png')).toBeInTheDocument()
      })

      // delete the first file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )

      resolveFileHandler2([
        {
          file: file2,
          id: 'server-id-2',
          exists: false,
        },
      ])

      resolveOnFileDeleteHandler1()

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(1)
        expect(screen.queryByText('new-file-2.png')).toBeInTheDocument()
      })

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          {
            myArrayWithDelete: [
              {
                myFiles: undefined,
              },
              {
                myFiles: [
                  expect.objectContaining({
                    file: file2,
                    id: 'server-id-2',
                    exists: false,
                  }),
                ],
              },
            ],
          },
          expect.anything()
        )
      })

      // delete the last file
      fireEvent.click(
        document
          .querySelectorAll('.dnb-upload__file-cell')[0]
          .querySelector('button')
      )

      resolveOnFileDeleteHandler2()

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          {
            myArrayWithDelete: [
              {
                myFiles: undefined,
              },
              {
                myFiles: undefined,
              },
            ],
          },
          expect.anything()
        )
      })
    })
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
      fireEvent.drop(document.querySelector('input'), {
        dataTransfer: {
          files: [file],
        },
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
      fireEvent.drop(document.querySelector('input'), {
        dataTransfer: {
          files: [file],
        },
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
      fireEvent.drop(document.querySelector('input'), {
        dataTransfer: {
          files: [file],
        },
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

  describe('sync external value', () => {
    it('should skip echo updates (our own updates coming back)', async () => {
      const onChange = jest.fn()
      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('file-1.png', 100, 'image/png'),
              id: 'file-1',
            },
          ]}
          onChange={onChange}
        />
      )

      // User adds a file
      const element = getRootElement()
      const file2 = createMockFile('file-2.png', 100, 'image/png')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [file2],
        },
      })

      // Wait for onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })

      const newValue = onChange.mock.calls[0][0]

      // Parent component echoes back the same value
      rerender(<Field.Upload value={newValue} onChange={onChange} />)

      // Should not trigger another change
      expect(onChange).toHaveBeenCalledTimes(1)

      // Should still show 2 files
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
    })

    it('should skip stale updates with loading files when we already have resolved files', async () => {
      let resolveFileHandler: ((value: UploadValue) => void) | undefined
      const fileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const { rerender } = render(
        <Field.Upload value={[]} fileHandler={fileHandler} />
      )

      // User drops a file
      const element = getRootElement()
      const file = createMockFile('file-1.png', 100, 'image/png')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      // Wait for loading state
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).toBeInTheDocument()
      })

      // Simulate stale external value with loading files
      const staleValue: UploadValue = [
        {
          file,
          id: 'temp-id',
          isLoading: true,
        },
      ]

      // Resolve the file handler
      resolveFileHandler([
        {
          file,
          id: 'server-id',
          exists: true,
        },
      ])

      // Wait for resolved state
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).not.toBeInTheDocument()
      })

      // Now try to update with stale loading value
      rerender(
        <Field.Upload value={staleValue} fileHandler={fileHandler} />
      )

      // Should still show resolved file, not revert to loading state
      expect(
        document.querySelector('.dnb-progress-indicator')
      ).not.toBeInTheDocument()
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should update files when no pending files to preserve', async () => {
      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('file-1.png', 100, 'image/png'),
              id: 'file-1',
            },
          ]}
        />
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
      expect(screen.queryByText('file-1.png')).toBeInTheDocument()

      // Update with new external value
      rerender(
        <Field.Upload
          value={[
            {
              file: createMockFile('file-2.png', 100, 'image/png'),
              id: 'file-2',
            },
            {
              file: createMockFile('file-3.png', 100, 'image/png'),
              id: 'file-3',
            },
          ]}
        />
      )

      // Should show new files
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)
      expect(screen.queryByText('file-1.png')).not.toBeInTheDocument()
      expect(screen.queryByText('file-2.png')).toBeInTheDocument()
      expect(screen.queryByText('file-3.png')).toBeInTheDocument()
    })

    it('should preserve loading files when external value updates', async () => {
      let resolveFileHandler: ((value: UploadValue) => void) | undefined
      const fileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('existing.png', 100, 'image/png'),
              id: 'existing-id',
            },
          ]}
          fileHandler={fileHandler}
        />
      )

      // User drops a new file
      const element = getRootElement()
      const newFile = createMockFile('new-file.png', 100, 'image/png')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [newFile],
        },
      })

      // Wait for loading state
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).toBeInTheDocument()
      })

      // External value updates (e.g., from another component)
      // but doesn't include the loading file
      rerender(
        <Field.Upload
          value={[
            {
              file: createMockFile('existing.png', 100, 'image/png'),
              id: 'existing-id',
            },
            {
              file: createMockFile('another.png', 100, 'image/png'),
              id: 'another-id',
            },
          ]}
          fileHandler={fileHandler}
        />
      )

      // Should preserve the loading file and merge with external files
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(3)
      })
      expect(screen.queryByText('existing.png')).toBeInTheDocument()
      expect(screen.queryByText('another.png')).toBeInTheDocument()

      // Resolve the loading file
      resolveFileHandler([
        {
          file: newFile,
          id: 'new-server-id',
          exists: true,
        },
      ])

      // Wait for loading to complete
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).not.toBeInTheDocument()
      })

      // Should still have all files
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(3)
    })

    it('should preserve files with error messages when external value updates', async () => {
      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('valid.png', 100, 'image/png'),
              id: 'valid-id',
            },
          ]}
          fileMaxSize={0.001}
        />
      )

      // User drops a file that's too large
      const element = getRootElement()
      const largeFile = createMockFile('large.png', 100000, 'image/png')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [largeFile],
        },
      })

      // Wait for error to appear
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      // Should have both files (valid + error file)
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(2)

      // External value updates but doesn't include error file
      rerender(
        <Field.Upload
          value={[
            {
              file: createMockFile('valid.png', 100, 'image/png'),
              id: 'valid-id',
            },
            {
              file: createMockFile('another.png', 100, 'image/png'),
              id: 'another-id',
            },
          ]}
          fileMaxSize={0.001}
        />
      )

      // Should preserve the error file and merge with external files
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell').length
        ).toBe(3)
      })
      expect(screen.queryByText('valid.png')).toBeInTheDocument()
      expect(screen.queryByText('another.png')).toBeInTheDocument()
      expect(screen.queryByText('large.png')).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    it('should not duplicate files when external value already includes pending files', async () => {
      let resolveFileHandler: ((value: UploadValue) => void) | undefined
      const fileHandler = jest.fn(() => {
        return new Promise<UploadValue>((resolve) => {
          resolveFileHandler = resolve
        })
      })

      const { rerender } = render(
        <Field.Upload value={[]} fileHandler={fileHandler} />
      )

      // User drops a file
      const element = getRootElement()
      const file = createMockFile('file.png', 100, 'image/png')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      // Wait for loading state
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).toBeInTheDocument()
      })

      // Resolve the file handler
      resolveFileHandler([
        {
          file,
          id: 'server-id',
          exists: true,
        },
      ])

      // Wait for resolved state
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-progress-indicator')
        ).not.toBeInTheDocument()
      })

      // External value updates with the same file
      rerender(
        <Field.Upload
          value={[
            {
              file,
              id: 'server-id',
              exists: true,
            },
          ]}
          fileHandler={fileHandler}
        />
      )

      // Should not duplicate - still just 1 file
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)
    })

    it('should handle empty external value update', async () => {
      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('file-1.png', 100, 'image/png'),
              id: 'file-1',
            },
          ]}
        />
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)

      // Update with empty value
      rerender(<Field.Upload value={[]} />)

      // Should clear all files
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })

    it('should handle undefined external value update', async () => {
      const { rerender } = render(
        <Field.Upload
          value={[
            {
              file: createMockFile('file-1.png', 100, 'image/png'),
              id: 'file-1',
            },
          ]}
        />
      )

      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(1)

      // Update with undefined value
      rerender(<Field.Upload value={undefined} />)

      // Should clear all files
      expect(
        document.querySelectorAll('.dnb-upload__file-cell').length
      ).toBe(0)
    })
  })

  describe('onValidationError', () => {
    it('should call onValidationError for files exceeding fileMaxSize', async () => {
      const onValidationError = jest.fn((files) => files)
      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      const invalidFiles = onValidationError.mock.calls[0][0]
      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe('large-file.png')
      expect(invalidFiles[0].errorMessage).toBe(
        nbShared.Upload.errorLargeFile.replace('%size', '5')
      )
    })

    it('should call onValidationError for unsupported file types', async () => {
      const onValidationError = jest.fn((files) => files)
      const file = createMockFile('document.docx', 100, 'application/docx')

      render(
        <Field.Upload
          acceptedFileTypes={['pdf', 'png']}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      const invalidFiles = onValidationError.mock.calls[0][0]
      expect(invalidFiles).toHaveLength(1)
      expect(invalidFiles[0].file.name).toBe('document.docx')
      expect(invalidFiles[0].errorMessage).toBe(
        nbShared.Upload.errorUnsupportedFile
      )
    })

    it('should call onValidationError before onChange', async () => {
      const callOrder: string[] = []
      const onValidationError = jest.fn((files) => {
        callOrder.push('onValidationError')
        return files.map((file) => ({
          ...file,
          description: 'Modified by validation handler',
        }))
      })
      const onChange = jest.fn((value) => {
        callOrder.push('onChange')
      })
      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
          onChange={onChange}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledTimes(1)
      })

      // Verify execution order
      expect(callOrder).toEqual(['onValidationError', 'onChange'])

      // Verify onChange received the modified files from onValidationError
      const changeValue = onChange.mock.calls[0][0]
      expect(changeValue).toBeDefined()
      expect(changeValue[0].description).toBe(
        'Modified by validation handler'
      )
    })

    it('should allow setting removeLink on files with validation errors', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          removeLink: true,
        }))
      })

      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
        const fileNameElement = document.querySelector(
          '.dnb-upload__file-cell__text-container span'
        )
        expect(fileNameElement.tagName).toBe('SPAN')
        expect(fileNameElement).not.toHaveAttribute('href')
      })
    })

    it('should allow setting multiple custom properties on invalid files', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          removeLink: true,
          removeDeleteButton: true,
          description: 'This file cannot be uploaded',
        }))
      })

      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(
        () => {
          expect(onValidationError).toHaveBeenCalledTimes(1)
        },
        { timeout: 2000 }
      )

      await waitFor(
        () => {
          const fileCell = document.querySelector('.dnb-upload__file-cell')
          expect(fileCell).toBeInTheDocument()
          expect(fileCell).toHaveTextContent(
            'This file cannot be uploaded'
          )
        },
        { timeout: 2000 }
      )

      await waitFor(
        () => {
          const fileCell = document.querySelector('.dnb-upload__file-cell')
          const button = fileCell.querySelector('button')
          expect(button).not.toBeInTheDocument()
        },
        { timeout: 2000 }
      )
    })

    it('should work with both sync onValidationError and async fileHandler', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          removeLink: true,
        }))
      })

      const fileHandler = jest.fn((files) => {
        return Promise.resolve(
          files.map((file) => ({
            ...file,
            id: 'server-id',
          }))
        )
      })

      const validFile = createMockFile('valid.png', 100, 'image/png')
      const invalidFile = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          fileHandler={fileHandler}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [validFile, invalidFile],
        },
      })

      await waitFor(() => {
        expect(fileHandler).toHaveBeenCalledTimes(1)
        expect(onValidationError).toHaveBeenCalledTimes(1)

        // fileHandler should only receive valid files
        const validFiles = fileHandler.mock.calls[0][0]
        expect(validFiles).toHaveLength(1)
        expect(validFiles[0].file.name).toBe('valid.png')

        // onValidationError should only receive invalid files
        const invalidFiles = onValidationError.mock.calls[0][0]
        expect(invalidFiles).toHaveLength(1)
        expect(invalidFiles[0].file.name).toBe('large-file.png')

        // Both files should be displayed
        expect(
          document.querySelectorAll('.dnb-upload__file-cell')
        ).toHaveLength(2)
      })
    })

    it('should handle only invalid files without fileHandler', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          removeLink: true,
        }))
      })

      const invalidFile = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [invalidFile],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
        expect(
          document.querySelectorAll('.dnb-upload__file-cell')
        ).toHaveLength(1)
      })
    })

    it('should handle onValidationError returning void (undefined)', async () => {
      const onValidationError = jest.fn()

      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        // Should still display the file with original error
        const fileCell = document.querySelector('.dnb-upload__file-cell')
        expect(fileCell).toBeInTheDocument()
        expect(fileCell).toHaveTextContent('large-file.png')
        expect(fileCell).toHaveTextContent(
          nbShared.Upload.errorLargeFile.replace('%size', '5')
        )
      })
    })

    it('should not call onValidationError when all files are valid', async () => {
      const onValidationError = jest.fn((files) => files)
      const file = createMockFile('valid.png', 100, 'image/png')

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell')
        ).toHaveLength(1)
      })

      expect(onValidationError).not.toHaveBeenCalled()
    })

    it('should work with onFileDelete on files modified by onValidationError', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          removeLink: true,
          description: 'Cannot upload',
        }))
      })

      const onFileDelete = jest.fn()

      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
          onFileDelete={onFileDelete}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      // Delete the file
      const deleteButton = document.querySelector(
        '.dnb-upload__file-cell button'
      )
      fireEvent.click(deleteButton)

      await waitFor(() => {
        expect(onFileDelete).toHaveBeenCalledTimes(1)
        expect(
          document.querySelectorAll('.dnb-upload__file-cell')
        ).toHaveLength(0)
      })
    })

    it('should support deleteButtonProps on files with validation errors', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          deleteButtonProps: {
            icon: 'exclamation',
            text: 'Remove invalid file',
          },
        }))
      })

      const file = createMockFile(
        'large-file.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [file],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        const deleteButton = document.querySelector(
          '.dnb-upload__file-cell button'
        )
        expect(deleteButton).toBeInTheDocument()
        expect(deleteButton).toHaveTextContent('Remove invalid file')
        expect(
          deleteButton.querySelector('[data-testid="exclamation icon"]')
        ).toBeInTheDocument()
      })
    })

    it('should be mutually exclusive with fileHandler - only invalid files trigger onValidationError', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          description: 'Validation failed',
        }))
      })

      const fileHandler = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          id: `server_${file.file.name}`,
        }))
      })

      const validFile = createMockFile('valid.png', 100, 'image/png')
      const invalidFile = createMockFile(
        'invalid.png',
        10 * BYTES_IN_A_MEGA_BYTE,
        'image/png'
      )

      render(
        <Field.Upload
          fileMaxSize={5}
          onValidationError={onValidationError}
          fileHandler={fileHandler}
        />
      )

      const element = getRootElement()

      // Upload both valid and invalid files together
      fireEvent.drop(element, {
        dataTransfer: {
          files: [validFile, invalidFile],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
        expect(fileHandler).toHaveBeenCalledTimes(1)
      })

      // Verify onValidationError received only the invalid file
      expect(onValidationError).toHaveBeenCalledWith([
        expect.objectContaining({
          file: invalidFile,
          errorMessage: expect.any(String),
        }),
      ])

      // Verify fileHandler received only the valid file
      expect(fileHandler).toHaveBeenCalledWith([
        expect.objectContaining({
          file: validFile,
        }),
      ])
      // Verify the valid file has no errorMessage
      expect(fileHandler.mock.calls[0][0][0]).not.toHaveProperty(
        'errorMessage'
      )

      // Verify both files are displayed
      await waitFor(() => {
        expect(
          document.querySelectorAll('.dnb-upload__file-cell')
        ).toHaveLength(2)
        expect(screen.queryByText('valid.png')).toBeInTheDocument()
        expect(screen.queryByText('invalid.png')).toBeInTheDocument()
      })
    })

    it('should trigger onValidationError for files with errorMessage set via value prop', async () => {
      const onValidationError = jest.fn((files) => {
        return files.map((file) => ({
          ...file,
          description: 'Error handled by onValidationError',
        }))
      })

      const onChange = jest.fn()

      render(
        <Form.Handler>
          <Field.Upload
            path="/myFiles"
            onValidationError={onValidationError}
            onChange={onChange}
          />
        </Form.Handler>
      )

      const element = getRootElement()

      // Create a mock file with custom errorMessage using a custom validation approach
      // We'll use acceptedFileTypes to trigger a validation error
      const invalidTypeFile = createMockFile(
        'document.txt',
        100,
        'text/plain'
      )

      // Upload a file with wrong type
      fireEvent.drop(element, {
        dataTransfer: {
          files: [invalidTypeFile],
        },
      })

      await waitFor(() => {
        expect(onValidationError).toHaveBeenCalledTimes(1)
      })

      // Verify the callback received a file with errorMessage
      const receivedFiles = onValidationError.mock.calls[0][0]
      expect(receivedFiles[0]).toHaveProperty('errorMessage')
      expect(receivedFiles[0].errorMessage).toBeTruthy()

      await waitFor(() => {
        const fileCell = document.querySelector('.dnb-upload__file-cell')
        expect(fileCell).toBeInTheDocument()
        expect(fileCell).toHaveTextContent('document.txt')
        expect(fileCell).toHaveTextContent(
          'Error handled by onValidationError'
        )
      })
    })

    it('should NOT trigger onValidationError when fileHandler returns file with errorMessage', async () => {
      const onValidationError = jest.fn((files) => files)

      const fileHandler = jest.fn((files) => {
        // Simulate fileHandler returning file with error
        return files.map((file) => ({
          ...file,
          id: 'server-id',
          errorMessage: 'Server validation failed',
        }))
      })

      const validFile = createMockFile('valid.png', 100, 'image/png')

      render(
        <Field.Upload
          onValidationError={onValidationError}
          fileHandler={fileHandler}
        />
      )

      const element = getRootElement()

      fireEvent.drop(element, {
        dataTransfer: {
          files: [validFile],
        },
      })

      await waitFor(() => {
        expect(fileHandler).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        const fileCell = document.querySelector('.dnb-upload__file-cell')
        expect(fileCell).toBeInTheDocument()
        expect(fileCell).toHaveTextContent('Server validation failed')
      })

      // onValidationError should NOT be called because the file was valid when first uploaded
      // The errorMessage was added by fileHandler, but that file is now existing, not new
      expect(onValidationError).not.toHaveBeenCalled()
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(<Field.Upload required />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })
})
