import { verifyFiles } from '../UploadVerify'
import { createMockFile } from './testHelpers'

describe('verifyFiles', () => {
  it('returns the file size error message', () => {
    const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

    const fileMaxSize = 1
    const errorLargeFile = 'error message %size'

    const rawFiles = [{ file: file1 }]
    const acceptedFileTypes = []

    const files = verifyFiles(rawFiles, {
      fileMaxSize,
      acceptedFileTypes,
      errorLargeFile,
      errorUnsupportedFile: '',
    })

    expect(files[0]).toEqual({
      file: file1,
      errorMessage: `error message ${fileMaxSize}`,
    })
  })

  it('returns the file type error message', () => {
    const file1 = createMockFile('fileName1.png', 100, 'image/png')

    const errorUnsupportedFile = 'error message'

    const rawFiles = [{ file: file1 }]
    const acceptedFileTypes = ['pdf']

    const files = verifyFiles(rawFiles, {
      fileMaxSize: 1000,
      acceptedFileTypes,
      errorUnsupportedFile,
      errorLargeFile: '',
    })

    expect(files[0]).toEqual({
      file: file1,
      errorMessage: 'error message',
    })
  })

  it('returns no error message if "acceptedFileTypes" is empty', () => {
    const file1 = createMockFile('fileName1.png', 100, 'image/png')

    const rawFiles = [{ file: file1 }]
    const acceptedFileTypes = []

    const files = verifyFiles(rawFiles, {
      fileMaxSize: 1000,
      acceptedFileTypes,
      errorUnsupportedFile: 'error 1',
      errorLargeFile: 'error 2',
    })

    expect(files[0]).toEqual({
      file: file1,
    })
  })
})
