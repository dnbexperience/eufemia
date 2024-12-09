import UploadFileLink, { UploadFileLinkProps } from '../UploadFileListLink'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

global.URL.createObjectURL = jest.fn(() => 'url')

const defaultProps: UploadFileLinkProps = {
  text: 'text',
  href: 'href',
  download: false,
  onClick: undefined,
}

describe('UploadFileListLink', () => {
  describe('as an anchor', () => {
    it('renders the anchor', () => {
      render(<UploadFileLink {...defaultProps} />)
      expect(document.querySelector('.dnb-button')).not.toBeInTheDocument()
      expect(document.querySelector('.dnb-a')).toBeInTheDocument()
    })

    it('renders the anchor text', () => {
      const fileName = 'file.png'

      render(<UploadFileLink {...defaultProps} text={fileName} />)
      expect(screen.queryByText(fileName)).toBeInTheDocument()
    })

    it('renders the anchor href', () => {
      const fileName = 'file.png'

      const href = 'mock-url'

      render(
        <UploadFileLink {...defaultProps} text={fileName} href={href} />
      )

      const anchorElement = screen.queryByText(
        fileName
      ) as HTMLAnchorElement
      expect(anchorElement.href).toMatch(href)
    })

    it('renders the download attribute', () => {
      const fileName = 'file.png'

      render(
        <UploadFileLink
          {...defaultProps}
          text={fileName}
          download={true}
        />
      )

      const element = document.querySelector('.dnb-a')

      expect(element).toHaveAttribute('download', fileName)
    })

    it('supports spacing props', () => {
      render(<UploadFileLink {...defaultProps} top="large" />)

      const element = document.querySelector('.dnb-a')
      expect(element).toHaveClass('dnb-space__top--large')
    })
  })

  describe('as a button', () => {
    it('renders the button', () => {
      render(<UploadFileLink {...defaultProps} onClick={jest.fn()} />)
      expect(document.querySelector('.dnb-a')).not.toBeInTheDocument()
      expect(document.querySelector('.dnb-button')).toBeInTheDocument()
    })

    it('renders the button text', () => {
      const fileName = 'file.png'

      render(
        <UploadFileLink
          {...defaultProps}
          onClick={jest.fn()}
          text={fileName}
        />
      )
      expect(screen.queryByText(fileName)).toBeInTheDocument()
    })

    it('executes onClick event when button is clicked', () => {
      const onClick = jest.fn()

      render(<UploadFileLink {...defaultProps} onClick={onClick} />)
      const element = document.querySelector('.dnb-button')

      fireEvent.click(element)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('supports spacing props', () => {
      render(
        <UploadFileLink
          {...defaultProps}
          onClick={jest.fn()}
          top="large"
        />
      )

      const element = document.querySelector('.dnb-button')
      expect(element).toHaveClass('dnb-space__top--large')
    })
  })
})
