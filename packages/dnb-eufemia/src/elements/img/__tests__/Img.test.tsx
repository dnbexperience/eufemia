import { fireEvent, render } from '@testing-library/react'
import Img from '../Img'

describe('Img', () => {
  it('renders with native figure and image semantics', () => {
    render(<Img src="image.png" alt="Image description" />)

    const figure = document.querySelector('figure')
    const image = document.querySelector('img')

    expect(figure).toContainElement(image)
    expect(figure).not.toHaveAttribute('role')
    expect(image).not.toHaveAttribute('role')
    expect(image).toHaveAttribute('src', 'image.png')
    expect(image).toHaveAttribute('alt', 'Image description')
  })

  it('renders a caption inside the figure', () => {
    render(
      <Img
        src="image.png"
        alt="Image description"
        caption="Caption text"
      />
    )

    const figure = document.querySelector('figure')
    const caption = document.querySelector('figcaption')

    expect(figure).toContainElement(caption)
    expect(caption).toHaveTextContent('Caption text')
  })

  it('forwards native image properties to the image element', () => {
    render(
      <Img
        src="image.png"
        alt="Image description"
        width={200}
        height={100}
        loading="lazy"
        data-testid="image"
      />
    )

    const image = document.querySelector('img')

    expect(image).toHaveAttribute('width', '200')
    expect(image).toHaveAttribute('height', '100')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('data-testid', 'image')
  })

  it('applies className to the figure and imgClass to the image', () => {
    render(
      <Img
        src="image.png"
        alt="Image description"
        className="figure-class"
        imgClass="image-class"
      />
    )

    expect(document.querySelector('figure')).toHaveClass('figure-class')
    expect(document.querySelector('img')).toHaveClass('image-class')
  })

  it('applies figureProps to the figure and imageClassName to the image', () => {
    render(
      <Img
        src="image.png"
        alt="Image description"
        className="figure-class"
        figureProps={{
          className: 'figure-props-class',
          title: 'Figure title',
        }}
        imageClassName="image-class"
        caption="Caption text"
      />
    )

    const figure = document.querySelector('figure')

    expect(figure).toHaveClass('figure-class', 'figure-props-class')
    expect(figure).toHaveAttribute('title', 'Figure title')
    expect(document.querySelector('img')).toHaveClass('image-class')
  })

  it('preserves internal error handling when onError is provided', () => {
    const onError = vi.fn()
    render(
      <Img src="invalid.png" alt="Image description" onError={onError} />
    )

    const image = document.querySelector('img')
    fireEvent.error(image)

    expect(onError).toHaveBeenCalledTimes(1)
    expect(image).toHaveClass('dnb-img--error')
  })
})
