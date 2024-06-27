import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { Field, Form } from '../../..'

import nbNOForms from '../../../constants/locales/nb-NO'
const nbForms = nbNOForms['nb-NO']

import nbNOShared from '../../../../../shared/locales/nb-NO'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'
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

  it('validation based on required-prop', async () => {
    render(
      <Form.Handler>
        <Field.Upload required />
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
        dataTransfer: { files: [file1] },
      })
    )

    fireEvent.submit(document.querySelector('form'))

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

  it('should emit data context based on required-prop', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Upload path="/myFiles" />
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

  it('should call onChange', async () => {
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
    const file2 = createMockFile('fileName-2.png', 100, 'image/png')

    await waitFor(() =>
      fireEvent.drop(element, {
        dataTransfer: { files: [file1, file2] },
      })
    )

    expect(onChangeContext).toHaveBeenCalledTimes(1)
    expect(onChangeContext).toHaveBeenLastCalledWith({
      myFiles: [
        {
          file: file1,
          exists: false,
          id: expect.anything(),
        },
        {
          file: file2,
          exists: false,
          id: expect.anything(),
        },
      ],
    })
    expect(onChangeField).toHaveBeenCalledTimes(1)
    expect(onChangeField).toHaveBeenLastCalledWith([
      {
        file: file1,
        exists: false,
        id: expect.anything(),
      },
      {
        file: file2,
        exists: false,
        id: expect.anything(),
      },
    ])
  })
})
