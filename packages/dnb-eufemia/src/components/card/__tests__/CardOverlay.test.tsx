import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Card from '../index'
import Button from '../../button/Button'

describe('Card.Info.Overlay', () => {
  it('provides decorative gradient and blur without hiding interactive content', async () => {
    const result = render(
      <Card.Info>
        <Card.Info.Overlay align="center">
          <p>Information</p>
          <Button>Action</Button>
        </Card.Info.Overlay>
      </Card.Info>
    )
    const overlay = document.querySelector('.dnb-card__overlay')
    expect(overlay).toHaveClass('dnb-card__overlay--gradient')
    expect(
      overlay.querySelector('.dnb-card__overlay-blur')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      overlay.querySelectorAll('.dnb-card__overlay-blur > span')
    ).toHaveLength(4)
    expect(overlay.querySelector('button')).toHaveClass(
      'dnb-button--surface-dark'
    )
    expect(overlay).not.toHaveAttribute('aria-hidden')
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('allows effects and layout defaults to be overridden', () => {
    render(
      <Card.Info.Overlay
        blur={false}
        gradient={false}
        innerSpace="small"
        gap="x-small"
        className="custom"
        style={{ marginTop: '3rem' }}
      >
        <p>Text</p>
      </Card.Info.Overlay>
    )
    const overlay = document.querySelector('.dnb-card__overlay')
    expect(overlay).toHaveClass('custom')
    expect(overlay).not.toHaveClass('dnb-card__overlay--gradient')
    expect(overlay.querySelector('.dnb-card__overlay-blur')).toBeNull()
    expect((overlay as HTMLElement).style.marginTop).toBe('3rem')
  })
})
