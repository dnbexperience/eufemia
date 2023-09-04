import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ErrorCard from '../ErrorCard'
import { axeComponent } from '../../../core/jest/jestSetup'
import { ErrorCardAllProps } from '../types'
import Provider from '../../../shared/Provider'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'

const nb = nbNO['nb-NO'].ErrorCard
const en = enGB['en-GB'].ErrorCard

const defaultProps: ErrorCardAllProps = {
  title: 'title',
  message: 'message',
}

describe('ErrorCard', () => {
  it('renders the component', () => {
    render(<ErrorCard {...defaultProps} />)

    expect(document.querySelector('.dnb-error-card')).toBeInTheDocument()
  })

  it('renders the title', () => {
    const title = 'this is the custom title'

    render(<ErrorCard {...defaultProps} title={title} />)

    expect(screen.queryByText(title)).not.toBeNull()
  })

  it('renders the message', () => {
    const message = 'this is the custom message'

    render(
      <ErrorCard
        {...defaultProps}
        message={message}
        onTryAgainClick={jest.fn()}
      />,
    )

    expect(screen.queryByText(message)).not.toBeNull()
  })

  describe('Button', () => {
    it('render the try again button', () => {
      render(<ErrorCard {...defaultProps} onTryAgainClick={jest.fn()} />)

      expect(
        document.querySelector('.dnb-error-card__buttons-container'),
      ).toBeInTheDocument()
    })

    it('render the try again button default nb-NO text', () => {
      render(
        <ErrorCard
          {...defaultProps}
          locale="nb-NO"
          onTryAgainClick={jest.fn()}
        />,
      )

      expect(screen.queryByText(nb.tryAgainButtonText)).toBeInTheDocument()
    })

    it('render the try again button default en-BG text', () => {
      render(
        <ErrorCard
          {...defaultProps}
          locale="en-GB"
          onTryAgainClick={jest.fn()}
        />,
      )

      expect(screen.queryByText(en.tryAgainButtonText)).toBeInTheDocument()
    })

    it('calls onTryAgainClick when clicking the button', () => {
      const mockOnClick = jest.fn()

      render(<ErrorCard {...defaultProps} onTryAgainClick={mockOnClick} />)

      fireEvent.click(screen.getByRole('button'))

      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('renders the custom actions', () => {
      const customAction = (
        <button data-testid="custom-action">button</button>
      )

      render(
        <ErrorCard
          {...defaultProps}
          onTryAgainClick={jest.fn()}
          customActions={customAction}
        />,
      )

      expect(screen.queryByTestId('custom-action')).not.toBeNull()
    })
  })

  it('should support locale from provider', () => {
    const { rerender } = render(
      <Provider>
        <ErrorCard {...defaultProps} onTryAgainClick={jest.fn()} />
      </Provider>,
    )

    expect(screen.queryByText(nb.tryAgainButtonText)).toBeInTheDocument()

    rerender(
      <Provider locale="en-GB">
        <ErrorCard {...defaultProps} onTryAgainClick={jest.fn()} />
      </Provider>,
    )

    expect(screen.queryByText(en.tryAgainButtonText)).toBeInTheDocument()

    rerender(
      <Provider locale="nb-NO">
        <ErrorCard {...defaultProps} onTryAgainClick={jest.fn()} />
      </Provider>,
    )

    expect(screen.queryByText(nb.tryAgainButtonText)).toBeInTheDocument()
  })
})

describe('ErrorCard aria', () => {
  it('should validate', async () => {
    const Component = render(
      <ErrorCard
        title={'title'}
        message={'message'}
        onTryAgainClick={jest.fn()}
      />,
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
