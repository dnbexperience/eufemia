import { verifyFiles, getFileTypeFromExtension } from '../UploadVerify'
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

  it('returns no file size error message when disabling fileMaxSize', () => {
    const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

    const fileMaxSize = false
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

  it('returns no error message when uploading a file of a "acceptedFileType" extension in lower case', () => {
    const file1 = createMockFile('fileName1.png', 100, 'image/png')

    const rawFiles = [{ file: file1 }]
    const acceptedFileTypes = ['png']

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

  it('returns no error message when uploading a file of a "acceptedFileType" extension in upper case', () => {
    const file1 = createMockFile('fileName1.PNG', 100, 'image/png')

    const rawFiles = [{ file: file1 }]
    const acceptedFileTypes = ['png']

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

  describe('when providing max size to file type', () => {
    it('returns file size error', () => {
      const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

      const fileMaxSize = 100000001
      const errorLargeFile = 'error message %size'

      const rawFiles = [{ file: file1 }]
      const fileMaxSizeForPng = 1
      const acceptedFileTypes = [
        {
          fileType: 'png',
          fileMaxSize: fileMaxSizeForPng,
        },
      ]

      const files = verifyFiles(rawFiles, {
        fileMaxSize,
        acceptedFileTypes,
        errorLargeFile,
        errorUnsupportedFile: '',
      })

      expect(files[0]).toEqual({
        file: file1,
        errorMessage: `error message ${fileMaxSizeForPng}`,
      })
    })

    it('returns file size error based on fileMaxSize of Upload as a fallback', () => {
      const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

      const fileMaxSize = 1
      const errorLargeFile = 'error message %size'

      const rawFiles = [{ file: file1 }]
      const acceptedFileTypes = [
        {
          fileType: 'png',
        },
      ]

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

    it('returns no file size error message when disabling fileMaxSize', () => {
      const file1 = createMockFile('fileName1.png', 100000000, 'image/png')

      const fileMaxSize = 10000
      const errorLargeFile = 'error message %size'

      const rawFiles = [{ file: file1 }]
      const acceptedFileTypes = [
        {
          fileType: 'png',
          fileMaxSize: 0,
        },
      ]

      const files = verifyFiles(rawFiles, {
        fileMaxSize,
        acceptedFileTypes,
        errorLargeFile,
        errorUnsupportedFile: '',
      })

      expect(files[0]).toEqual({
        file: file1,
      })
    })

    it('returns no error message when uploading a file of a "acceptedFileType" extension in lower case', () => {
      const file1 = createMockFile('fileName1.png', 100, 'image/png')

      const rawFiles = [{ file: file1 }]
      const acceptedFileTypes = [
        {
          fileType: 'png',
          fileMaxSize: 0,
        },
      ]

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

    it('returns no error message when uploading a file of a "acceptedFileType" file extension in upper case', () => {
      const file1 = createMockFile('fileName1.PNG', 100, 'image/png')

      const rawFiles = [{ file: file1 }]
      const acceptedFileTypes = [
        {
          fileType: 'png',
          fileMaxSize: 0,
        },
      ]

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
})

describe('getFileTypeFromExtension', () => {
  it('returns the file extension when given', () => {
    const file1 = createMockFile('fileName1.txt', 100, 'text/plain')
    expect(getFileTypeFromExtension(file1)).toBe('txt')

    const file2 = createMockFile('fileName1.test.txt', 100, 'text/plain')
    expect(getFileTypeFromExtension(file2)).toBe('txt')
  })

  it('returns the file type when given', () => {
    const file1 = createMockFile('fileName1', 100, 'text/plain')
    expect(getFileTypeFromExtension(file1)).toBe(null)
  })
})
