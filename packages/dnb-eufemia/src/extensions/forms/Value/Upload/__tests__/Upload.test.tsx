import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Value, Form } from '../../..'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

global.URL.createObjectURL = jest.fn(() => 'url')

const files = [
  {
    file: createMockFile('foo.png', 1000000, 'image/png'),
    exists: false,
    id: '1',
  },
  {
    file: createMockFile('bar.png', 2000000, 'image/png'),
    exists: false,
    id: '2',
  },
  {
    file: createMockFile('baz.png', 3000000, 'image/png'),
    exists: false,
    id: '3',
  },
]

describe('Value.Upload', () => {
  it('renders file values', () => {
    render(<Value.Upload value={files} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('foo.png, bar.png og baz.png')
  })

  it('renders empty array of file values', () => {
    render(<Value.Upload value={[]} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('')
  })

  it('renders array of falsy values', () => {
    render(<Value.Upload value={[null, undefined]} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('')
  })

  it('renders custom format', () => {
    render(
      <Value.Upload
        value={files}
        format={{ style: 'short', type: 'disjunction' }}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('foo.png, bar.png eller baz.png')
  })

  it('should render different variants', () => {
    const { rerender } = render(
      <Value.Upload variant="ol" value={files} />
    )

    const valueBlock = document.querySelector(
      '.dnb-forms-value-upload .dnb-forms-value-block__content'
    )

    const ol = valueBlock.querySelector('.dnb-ol') as HTMLOListElement

    expect(ol).toBeInTheDocument()
    expect(ol.children.length).toBe(3)

    rerender(<Value.Upload variant="ul" value={files} />)

    const ul = valueBlock.querySelector('.dnb-ul') as HTMLUListElement

    expect(ol).not.toBeInTheDocument()
    expect(ul).toBeInTheDocument()
    expect(ul.children.length).toBe(3)

    rerender(<Value.Upload variant="text" value={files} />)

    expect(ol).not.toBeInTheDocument()
    expect(ul).not.toBeInTheDocument()
    expect(valueBlock).toHaveTextContent('foo.png, bar.png og baz.png')
  })

  it('should render different `listTypes`', () => {
    const { rerender } = render(
      <Value.Upload variant="ol" listType="a" value={files} />
    )

    const valueBlock = document.querySelector(
      '.dnb-forms-value-upload .dnb-forms-value-block__content'
    )

    const list = (type: 'ol' | 'ul') =>
      valueBlock.querySelector(`.dnb-${type}`)

    expect(list('ol')).toHaveAttribute('type', 'a')

    rerender(<Value.Upload variant="ol" listType="A" value={files} />)
    expect(list('ol')).toHaveAttribute('type', 'A')

    rerender(<Value.Upload variant="ol" listType="i" value={files} />)
    expect(list('ol')).toHaveAttribute('type', 'i')

    rerender(<Value.Upload variant="ol" listType="I" value={files} />)
    expect(list('ol')).toHaveAttribute('type', 'I')

    rerender(<Value.Upload variant="ul" listType="circle" value={files} />)
    expect(list('ul')).toHaveAttribute('type', 'circle')

    rerender(<Value.Upload variant="ul" listType="disc" value={files} />)
    expect(list('ul')).toHaveAttribute('type', 'disc')

    rerender(<Value.Upload variant="ul" listType="square" value={files} />)
    expect(list('ul')).toHaveAttribute('type', 'square')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.Upload showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(<Value.Upload label="My selections" value={files} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('foo.png, bar.png og baz.png')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.Upload label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Upload placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: files }}>
        <Value.Upload path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('foo.png, bar.png og baz.png')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler locale="en-GB" data={{ myPath: files }}>
        <Value.Upload path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-upload .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('foo.png, bar.png and baz.png')
  })

  describe('Icons', () => {
    it('renders the pdf icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.pdf', 100, 'application/pdf'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file pdf medium icon')
      ).toBeInTheDocument()
    })

    it('renders the xls icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.xls', 100, 'application/xls'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file xls medium icon')
      ).toBeInTheDocument()
    })

    it('renders the ppt icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.ppt', 100, 'application/ppt'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file ppt medium icon')
      ).toBeInTheDocument()
    })

    it('renders the csv icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.csv', 100, 'application/csv'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file csv medium icon')
      ).toBeInTheDocument()
    })

    it('renders the txt icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.txt', 100, 'text/txt'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file txt medium icon')
      ).toBeInTheDocument()
    })

    it('renders the xml icon', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile('file.xml', 100, 'application/xml'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(
        screen.queryByTestId('file xml medium icon')
      ).toBeInTheDocument()
    })

    it('renders the file icon as default', () => {
      render(
        <Value.Upload
          value={[
            {
              file: createMockFile(
                'file.custom',
                100,
                'application/custom'
              ),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(screen.queryByTestId('file medium icon')).toBeInTheDocument()
    })
  })

  describe('File Anchor', () => {
    it('renders the anchor', () => {
      const fileName = 'file.png'

      render(
        <Value.Upload
          value={[
            {
              file: createMockFile(fileName, 100, 'image/png'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )
      expect(screen.queryByText(fileName)).toBeInTheDocument()
    })

    it('executes onFileClick event when button is clicked', () => {
      const fileName = 'file.png'
      const onFileClick = jest.fn()

      render(
        <Value.Upload
          onFileClick={onFileClick}
          value={[
            {
              file: createMockFile(fileName, 100, 'image/png'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      const buttonElement = document.querySelector('.dnb-button')

      fireEvent.click(buttonElement)

      expect(onFileClick).toHaveBeenCalledTimes(1)
    })

    it('renders the anchor href', () => {
      const fileName = 'file.png'
      const mockUrl = 'mock-url'

      global.URL.createObjectURL = jest.fn().mockReturnValueOnce(mockUrl)

      render(
        <Value.Upload
          value={[
            {
              file: createMockFile(fileName, 100, 'image/png'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )
      const anchorElement = screen.queryByText(
        fileName
      ) as HTMLAnchorElement
      expect(anchorElement.href).toMatch(mockUrl)
    })

    it('renders the download attribute', () => {
      render(
        <Value.Upload
          download
          value={[
            {
              file: createMockFile('file.png', 100, 'image/png'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      const element = document.querySelector('a')

      expect(element).toHaveAttribute('download', 'file.png')
    })

    it('renders the file size', () => {
      const fileName = 'file.png'

      render(
        <Value.Upload
          displaySize
          value={[
            {
              file: createMockFile(fileName, 1000000, 'image/png'),
              exists: false,
              id: '1',
            },
          ]}
        />
      )

      expect(screen.queryByText(`${fileName} (1 MB)`)).toBeInTheDocument()
    })
  })
})
